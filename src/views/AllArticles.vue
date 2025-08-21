<script setup>
import {ref, onMounted, computed} from 'vue'
import { marked } from 'marked'
import { API_BASE, API_VITE } from '/config'

const hoveredCard = ref(null)

const articles = ref([])

const activeCategory = ref('Tous')

const categories = ['Tous', 'Design', 'Dev', 'Couleur', 'Autre']

const categoryColors = {
  Design: 'bg-pink-500',
  Dev: 'bg-blue-500',
  Couleur: 'bg-yellow-500',
  Autre: 'bg-purple-900',
}

const filteredArticles = computed(() => {
  if (activeCategory.value === 'Tous') return articles.value
  return articles.value.filter(article => article.category === activeCategory.value)
})

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/articles`)
    const data = await res.json()


    // ✅ Génère un aperçu HTML Markdown pour chaque article
    articles.value = data.map(article => ({
      ...article,
      imageUrl: article.image ? `${API_VITE}/uploads/${article.image}` : null,
    }))
  } catch (err) {
    console.error('Erreur chargement articles', err)
  }


})

</script>

<template>
  <header class="md:m-10  md:py-2">
    <div class="flex justify-center mb-0 ">
      <h1 class=" font-medium mt-2 mx-3 md:mx-5 md:pt-5 pb-2 md:text-8xl text-4xl " >Blog</h1>
    </div>

  </header>
  <section class="px-10 py-5 md:px-52 md:py-24">
    <p class="text-base font-regular text-left">Ici, je partage ce que j’apprends, ce que j’expérimente et ce que je découvre. Design d’interfaces, développement web, expérience utilisateur, couleurs, outils… Un espace vivant entre réflexion, pratique et curiosité.</p>
  </section>
  <section class="px-10 py-5 md:px-52 ">
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
      <div class="grid grid-cols-2 md:grid-cols-3 gap-8 my-10">
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
                  class="rounded-t-md md:h-[191px] bg-center bg-cover bg-no-repeat transition duration-300"
                  v-if="article.imageUrl"
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
                  :class="categoryColors[article.category]"
              >
                {{ article.category }}
              </span>
                </div>
              </div>
              <h6 class="m-4 text-sm font-semibold">{{ article.title }}</h6>
            </router-link>
          </div>
        </div>
      </div>
  </section>
</template>


