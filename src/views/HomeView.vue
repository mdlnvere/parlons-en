<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Derniers articles</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="article in articles" :key="article.slug" class="border p-4 rounded shadow">
        <router-link :to="`/article/${article.slug}`" class="text-xl font-semibold text-blue-600 hover:underline">
          {{ article.title }}
        </router-link>
        <img v-if="article.imageUrl" :src="article.imageUrl" class="w-full my-2 rounded" />

        <!-- ✅ Rendu HTML depuis Markdown -->
        <div class="prose max-w-none text-sm" v-html="article.preview"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { API_BASE, API_VITE } from '/config'

const articles = ref([])

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/articles`)
    const data = await res.json()


    // ✅ Génère un aperçu HTML Markdown pour chaque article
    articles.value = data.map(article => ({
      ...article,
      imageUrl: article.image ? `${API_VITE}/uploads/${article.image}` : null,
      preview: marked.parse(article.content.substring(0, 200) + '...')  // Limite à 200 caractères par exemple
    }))
  } catch (err) {
    console.error('Erreur chargement articles', err)
  }
})
</script>
