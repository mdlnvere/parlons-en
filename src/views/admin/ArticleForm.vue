<template>
  <AdminNavbar />
  <div class="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Modifier l\'article' : 'Nouvel article' }}
      </h1>

      <form @submit.prevent="submitArticle" enctype="multipart/form-data" class="space-y-4">
        <input
            v-model="title"
            placeholder="Titre"
            class="w-full p-2 border rounded"
            required
        />

        <input
            v-model="slug"
            :disabled="isEdit"
            placeholder="Slug (ex: mon-article)"
            class="w-full p-2 border rounded"
            required
        />

        <input
            type="file"
            @change="handleFileChange"
            class="w-full p-2 border rounded"
            accept="image/*"
        />

        <div v-if="imagePreview">
          <p class="text-sm text-gray-500">Aperçu :</p>
          <img :src="imagePreview" alt="Aperçu" class="max-w-xs rounded border" />
        </div>
        <input
            v-model="alt"
            placeholder="Texte alternatif"
            class="w-full p-2 border rounded"
            required
        />

        <textarea
            v-model="content"
            placeholder="Contenu Markdown"
            rows="10"
            class="w-full p-2 border rounded"
            required
        ></textarea>

        <select v-model="selected">
          <option v-for="option in options" :value="option.value">
            {{ option.text }}
          </option>
        </select>

        <div>Selected: {{ selected }}</div>

        <button
            type="submit"
            :class="isEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'"
            class="text-white px-4 py-2 rounded"
        >
          {{ isEdit ? 'Mettre à jour' : 'Enregistrer' }}
        </button>
      </form>

      <p v-if="success" class="text-green-600 mt-4">
        ✅ Article {{ isEdit ? 'mis à jour' : 'créé' }} avec succès.
      </p>

      <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4">Aperçu Markdown</h2>
      <div class="prose max-w-none border p-4 rounded min-h-[300px]" v-html="htmlPreview"></div>
    </div>
  </div>
</template>

<script setup>
import AdminNavbar from '/src/components/admin/AdminNavBar.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { API_BASE } from '/config'

const token = localStorage.getItem('token') || ''
const route = useRoute()
const router = useRouter()

const title = ref('')
const slug = ref('')
const content = ref('')
const imageFile = ref(null)
const imagePreview = ref('')
const alt = ref('')
const success = ref(false)
const error = ref('')

const selected = ref('Design')

const options = ref([
  { text: 'Design', value: 'Design' },
  { text: 'Dev', value: 'Dev' },
  { text: 'Couleur', value: 'Couleur' },
  { text: 'Autre', value: 'Autre' }
])

const isEdit = computed(() => !!route.params.slug)
const htmlPreview = computed(() => marked.parse(content.value))

function handleFileChange(event) {
  imageFile.value = event.target.files[0]
  imagePreview.value = imageFile.value ? URL.createObjectURL(imageFile.value) : ''
}

onMounted(async () => {
  if (isEdit.value) {
    try {
      const articleSlug = route.params.slug
      console.log(`${API_BASE}/admin/articles/${articleSlug}`)
      const response = await fetch(`${API_BASE}/articles/${articleSlug}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Article non trouvé')
      const file = await response.json()
      title.value = file.title
      alt.value = file.alt
      slug.value = file.slug
      content.value = file.content

      imagePreview.value = file.image ? `/api/uploads/${file.image}` : ''
    } catch (e) {
      error.value = "Impossible de charger l'article."
    }
  }
})

async function submitArticle() {
  success.value = false
  error.value = ''

  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('slug', slug.value)
  formData.append('content', content.value)
  formData.append('category', selected.value)
  formData.append('alt', alt.value)
  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }

  try {
    const method = isEdit.value ? 'PUT' : 'POST'
    const url = isEdit.value
        ? `http://localhost:3001/api/articles/${slug.value}`
        : 'http://localhost:3001/api/articles'

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!res.ok) {
      const data = await res.json()
      error.value = data.error || 'Erreur lors de la sauvegarde.'
      return
    }

    success.value = true
    await router.push('/admin')
  } catch (e) {
    error.value = 'Erreur réseau : ' + e.message
  }
}
</script>

<style scoped>
.prose img {
  max-width: 100%;
  height: auto;
}
</style>
