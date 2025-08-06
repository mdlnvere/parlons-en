
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

//Token and login
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT || 3001

const app = express()


app.use(cors())
app.use(bodyParser.json())

const articlesDir = path.join(__dirname, 'articles')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'))  // chemin vers /uploads
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({ storage: storage })


//Routes api
app.post('/api/articles', verifyToken, upload.single('image'), (req, res) => {
    const { title, slug, content, category, alt } = req.body
    const image = req.file ? req.file.filename : null

    if (!slug) {
        return res.status(400).json({ error: 'Slug manquant' })
    }

    const article = { title, slug, image, content, category }
    const filePath = path.join(__dirname, 'articles', `${slug}.json`)

    fs.writeFile(filePath, JSON.stringify(article, null, 2), (err) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erreur d\'enregistrement' })
        }
        res.json({ message: 'Article enregistré avec succès ✅', image })
    })
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.get('/', (req, res) => {
    res.send('API Express fonctionnelle')
})


app.get('/api/articles', (req, res) => {
    const articlesDir = path.join(__dirname, 'articles')
    fs.readdir(articlesDir, (err, files) => {
        if (err) {
            console.error('Erreur lecture dossier articles:', err)
            return res.status(500).json({ error: 'Erreur lecture articles' })
        }

        console.log('Fichiers trouvés:', files)  // Ajout log

        const articles = []

        files.forEach(file => {
            const filePath = path.join(articlesDir, file)
            const rawData = fs.readFileSync(filePath)
            const article = JSON.parse(rawData)
            articles.push(article)
        })

        console.log('Articles lus:', articles)  // Ajout log

        res.json(articles)
    })
})

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'Username et password requis' })
    }

    const users = readUsers()

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'Utilisateur déjà existant' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        users.push({ username, password: hashedPassword })
        saveUsers(users)
        res.json({ message: 'Utilisateur créé avec succès' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
})



function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // attend "Bearer mon-token"

    if (!token) {
        return res.status(401).json({ error: 'Token manquant' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalide' })
        }
        req.user = user // On stocke les infos du token (ex: username) dans req.user
        next()
    })
}



const usersFile = path.join(__dirname, 'users.json')

function readUsers() {
    if (!fs.existsSync(usersFile)) return []
    const data = fs.readFileSync(usersFile, 'utf-8')
    return JSON.parse(data)
}

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const users = readUsers()
    const user = users.find(u => u.username === username)

    if (!user) {
        return res.status(401).json({ error: 'Identifiants invalides' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Identifiants invalides' })
    }

    const token = jwt.sign(
        { username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
    )

    res.json({ token })
})

app.put('/api/articles/:slug', verifyToken, upload.single('image'), (req, res) => {
    const slug = req.params.slug
    const { title, content, category, alt } = req.body
    const image = req.file ? req.file.filename : req.body.image // soit nouvelle image uploadée, soit ancienne image passée en string

    if (!slug) return res.status(400).json({ error: 'Slug manquant' })

    const filePath = path.join(articlesDir, `${slug}.json`)

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Article non trouvé' })
    }

    const article = { title, slug, image, content, category, alt }

    fs.writeFile(filePath, JSON.stringify(article, null, 2), err => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erreur lors de la mise à jour' })
        }
        res.json({ message: 'Article mis à jour avec succès ✅' })
    })
})


app.get('/api/articles/:slug', verifyToken, (req, res) => {
    const slug = req.params.slug
    const filePath = path.join(articlesDir, `${slug}.json`)

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Article non trouvé' })
    }

    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const article = JSON.parse(fileContent)
        res.json(article)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Erreur lecture article' })
    }
})

app.listen(PORT, () => {
    console.log(`🟢 API démarrée sur http://localhost:${PORT}`)
})






