<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchArticleBySlug } from '../services/api.js'
import { API_WP } from '/config'

const route = useRoute()
const article = ref(null)
const isLoading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    article.value = await fetchArticleBySlug(route.params.slug)
  } catch (err) {
    console.error("Erreur lors de la récupération de l'article :", err)
    error.value = 'Article introuvable ou erreur serveur.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <!-- Chargement -->
  <div v-if="isLoading" class="p-6 text-gray-500">Chargement de l'article…</div>

  <!-- Erreur -->
  <div v-else-if="error" class="p-6 text-red-500">{{ error }}</div>

  <!-- Article -->
  <div v-else-if="article" class="prose max-w-none p-6">
    <h1 class="text-3xl font-bold mt-2 mx-3 md:mx-5 md:pt-5 pb-2" v-html="article.title" />

    <span class="rounded-full m-3 py-1 px-3 border border-black text-black">
      {{ article.category }}
    </span>

    <img
      v-if="article.imageUrl"
      :src="article.imageUrl"
      :alt="article.title"
      class="mb-4 max-w-full rounded"
    />

    <!-- Le contenu WP est déjà du HTML, pas besoin de marked() -->
    <div v-html="article.content" />
  </div>
</template>