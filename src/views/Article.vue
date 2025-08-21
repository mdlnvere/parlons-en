
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { API_BASE, API_VITE } from '/config'

const route = useRoute()
const article = ref(null)
const htmlContent = ref('')

onMounted(async () => {
  const slug = route.params.slug



  try {
    const response = await fetch(`${API_BASE}/articles`)
    const articles = await response.json()

    // Trouve l’article par slug
    const found = articles.find(a => a.slug === slug)

    if (found) {
      // Ajoute imageUrl si image présente
      article.value = {
        ...found,
        imageUrl: found.image ? `${API_VITE}/uploads/${found.image}` : null
      }

      htmlContent.value = marked.parse(found.content)
    } else {
      console.warn('Article non trouvé')
    }
  } catch (err) {
    console.error('Erreur lors de la récupération de l’article :', err)
  }
})


</script>


<template>
  <div v-if="article" class="prose max-w-none p-6">
    <h1 class="text-3xl font-bold mt-2 mx-3 md:mx-5 md:pt-5 pb-2">{{ article.title }}</h1>


    <span class="rounded-full m-3 py-1 px-3 border border-black text-black"
          >{{ article.category }}</span>
    <p>{{ article.readingTime }} de lecture</p>
    <img v-if="article.imageUrl" :src="article.imageUrl" :alt="article.alt" class="mb-4 max-w-full rounded" />

    <div v-html="htmlContent"></div>
  </div>
  <div v-else class="p-6 text-gray-500">Chargement de l'article...</div>
</template>
