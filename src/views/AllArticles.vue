<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchArticles } from '../services/api.js'

const articles = ref([])
const hoveredCard = ref(null)
const activeCategory = ref('Tous')
const isLoading = ref(true)
const error = ref(null)

const categories = ['Tous', 'Design', 'Tech', 'Couleur', 'Autre']

const categoryColors = {
  Design:  'bg-pink-500',
  Tech:     'bg-blue-500',
  Couleur: 'bg-yellow-500',
  Autre:   'bg-purple-900',
}

const filteredArticles = computed(() => {
  if (activeCategory.value === 'Tous') return articles.value
  return articles.value.filter(a => a.category === activeCategory.value)
})

onMounted(async () => {
  try {
    articles.value = await fetchArticles()
  } catch (err) {
    console.error('Erreur chargement articles', err)
    error.value = 'Impossible de charger les articles.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <header class="md:m-10 md:py-2">
    <div class="flex justify-center mb-0">
      <h1 class="font-medium mt-2 mx-3 md:mx-5 md:pt-5 pb-2 md:text-8xl text-4xl">Blog</h1>
    </div>
  </header>

  <section class="px-10 py-5 md:px-52 md:py-24">
    <p class="text-base font-regular text-left">
      Ici, je partage ce que j'apprends, ce que j'expérimente et ce que je découvre.
      Design d'interfaces, développement web, expérience utilisateur, couleurs, outils…
      Un espace vivant entre réflexion, pratique et curiosité.
    </p>
  </section>

  <section class="px-10 py-5 md:px-52">
    <div class="flex flex-row justify-between">
      <div>
        <h5 class="font-normal text-base">Explorer par thème</h5>
        <ul class="flex flex-row gap-4 my-8">
          <li v-for="category in categories" :key="category">
            <button
              @click="activeCategory = category"
              :class="[
                'filter-btn rounded-full py-1 px-3 transition',
                activeCategory === category
                  ? 'bg-white drop-shadow-lg border-none'
                  : 'border border-black hover:bg-white hover:drop-shadow-xl hover:border-none'
              ]"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </div>
      <p class="font-normal text-base">{{ filteredArticles.length }} articles trouvés</p>
    </div>

    <!-- État de chargement -->
    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-3 gap-8 my-10">
      <div
        v-for="n in 6" :key="n"
        class="rounded-lg bg-white shadow-xl shadow-neutral-800/10 h-52 animate-pulse"
      />
    </div>

    <!-- Erreur -->
    <p v-else-if="error" class="text-red-500 my-10">{{ error }}</p>

    <!-- Articles -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-8 my-10">
      <div
        v-for="article in filteredArticles"
        :key="article.slug"
        @mouseenter="hoveredCard = article.slug"
        @mouseleave="hoveredCard = null"
        class="transition duration-300"
      >
        <div class="rounded-lg bg-white shadow-xl shadow-neutral-800/10 flex flex-col h-full">
          <router-link :to="`/article/${article.slug}`" class="block h-full">
            <div
              v-if="article.imageUrl"
              class="rounded-t-md md:h-[191px] bg-center bg-cover bg-no-repeat transition duration-300"
              :style="{ backgroundImage: `url(${article.imageUrl})` }"
              :class="[
                hoveredCard === article.slug ? 'grayscale-0 opacity-100 saturate-150' :
                hoveredCard ? 'grayscale opacity-60' :
                'grayscale-0 opacity-100'
              ]"
            >
              <div class="flex justify-end">
                <span
                  class="rounded-full m-3 py-1 px-3 text-white"
                  :class="categoryColors[article.category] ?? 'bg-purple-900'"
                >
                  {{ article.category }}
                </span>
              </div>
            </div>

            <!-- Fallback si pas d'image -->
            <div
              v-else
              class="rounded-t-md md:h-[191px] bg-neutral-100 flex items-center justify-center"
            >
              <span
                class="rounded-full py-1 px-3 text-white"
                :class="categoryColors[article.category] ?? 'bg-purple-900'"
              >
                {{ article.category }}
              </span>
            </div>

            <h6 class="m-4 text-sm font-semibold" v-html="article.title" />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>