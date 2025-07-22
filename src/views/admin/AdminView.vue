<template>
  <AdminNavbar />
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Espace Admin - Gestion des articles</h1>

    <button @click="goToNewArticle"
            class="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      + Nouvel article
    </button>

    <table class="w-full border-collapse">
      <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">Titre</th>
        <th class="border px-4 py-2">Slug</th>
        <th class="border px-4 py-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="article in articles" :key="article.slug">
        <td class="border px-4 py-2">{{ article.title }}</td>
        <td class="border px-4 py-2">{{ article.slug }}</td>
        <td class="border px-4 py-2 space-x-2">
          <button @click="goToEditArticle(article.slug)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
            Modifier
          </button>
          <button @click="deleteArticle(article.slug)"
                  class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
            Supprimer
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <p v-if="loading" class="mt-4">Chargement...</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<script setup>
import AdminNavbar from '/src/components/admin/AdminNavBar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const articles = ref([])
const loading = ref(false)
const error = ref('')

function goToNewArticle() {
  router.push({ name: 'new-article' })
}

function goToEditArticle(slug) {
  router.push({ name: 'edit-article', params: { slug } })
}

async function fetchArticles() {
  loading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:3001/api/articles', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Erreur lors du chargement des articles')
    articles.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function deleteArticle(slug) {
  if (!confirm(`Supprimer l'article "${slug}" ?`)) return
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:3001/api/articles/${slug}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error('Erreur suppression article')
    articles.value = articles.value.filter(a => a.slug !== slug)
  } catch (e) {
    alert(e.message)
  }
}

onMounted(fetchArticles)
</script>
