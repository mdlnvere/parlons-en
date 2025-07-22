<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Articles récents</h1>
    <div v-for="article in articles" :key="article.slug" class="mb-6">
      <h2 class="text-xl font-semibold text-blue-700 underline">
        <router-link :to="'/article/' + article.slug">{{ article.title }}</router-link>
      </h2>
      <p class="text-gray-600">{{ article.content.substring(0, 100) }}...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const articles = ref([])

onMounted(async () => {
  const files = import.meta.glob('../articles/*.json')
  for (const path in files) {
    const mod = await files[path]()
    articles.value.push(mod)
  }
})
</script>
