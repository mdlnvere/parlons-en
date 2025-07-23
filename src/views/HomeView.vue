<template>
  <NavBar />
  <header>
    <div class="flex justify-center p-5 m-2 ">
      <h2 class="font-medium text-xl text-secondary w-96 text-center hover:text-accent">Pensées visuelles et digitales</h2>
    </div>
    <div class="flex justify-center mb-0 pb-0">
      <img alt="hand writing illustration" src="../assets/handrawn.png" class="w-80">
    </div>

      <div class="flex justify-center mb-0 ">
        <h1 class=" font-medium mt-2 mx-5 pt-5 pb-0" style="font-size: 6em">Parlons-en</h1>
      </div>
      <div class="flex flex-row gap-10 justify-center mb-10">
        <p class="hover:text-accent">DESIGN</p>
        <p>|</p>
        <p class="hover:text-accent">DEV</p>
        <p>|</p>
        <p class="hover:text-accent">AUTRE</p>
      </div>
  </header>

  <section class="bg-primary h-96 mx-0 my-32 py-10 px-20 text-white  text-center flex flex-col justify-around">
    <h3 class="font-medium text-xl"  >ENTRE NOUS</h3>
    <h2 class="text-4xl" style="font-weight: bolder">Installe toi, on va bien s'entendre</h2>
    <p class="text-left text-base  pb-6" style="font-weight: lighter">Bienvenue dans mon espace personnel, où j’écris sur une multitude de sujets.Tu trouveras ici mes derniers articles, et parfois des anecdotes plus légères. J’écris simplement sur ce qui m’inspire ou m’intrigue.Si tu aimes la programmation, le design ou simplement apprendre de nouvelles choses, tu es au bon endroit.</p>
  </section>

  <section class="py-10 pl-56">
    <h2 class="font-semibold text-xl">Mes sujets préférés</h2>
    <h3 class="text-secondary font-semibold text-xl">Et il se pourrait bien que tu y prennes goût aussi</h3>

    <div class="relative overflow-hidden">
      <button
          @click="scrollLeft"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 font-bold py-2 px-4 rounded shadow"
      >
        ←
      </button>
      <div ref="carousel" class="flex  gap-14 transition-transform duration-500 ease-in-out overflow-x-auto scroll-smooth no-scrollbar">
        <div  class=" my-10 rounded min-h-[450px] min-w-[310px] bg-[url(/images/designCover.jpg)] bg-cover bg-center flex flex-col-reverse text-start" style="border-radius: 19px;">
          <h4 class="text-4xl font-semibold m-5">Design</h4>
        </div>
        <div class="rounded min-h-[450px] min-w-[310px] bg-[url(/images/man-working-table.jpg)] bg-cover bg-center flex flex-col-reverse text-start my-10" style="border-radius: 19px;">
          <h4 class="text-4xl font-semibold m-5">Dev & Tech</h4>
        </div>
        <div class="rounded min-h-[450px] min-w-[310px] bg-[url(/images/colors.jpg)] bg-cover bg-right flex flex-col-reverse text-start my-10" style="border-radius: 19px;">
          <h4 class="text-4xl font-semibold m-5">Color</h4>
        </div>
        <div class="rounded min-h-[450px] min-w-[310px] bg-[url(/images/group.jpg)]  bg-cover bg-right-bottom flex flex-col-reverse text-start my-10" style="border-radius: 19px;">
          <h4 class="text-4xl font-semibold m-5">Autre</h4>
        </div>
        <div class="shrink-0 w-10"></div>
      </div>
      <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 font-bold py-2 px-4 rounded shadow"
          @click="scrollNext"
      >
        →
      </button>
    </div>


  </section>


<div >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="article in articles" :key="article.slug" class="border p-4 rounded shadow">
        <router-link :to="`/article/${article.slug}`" class="text-xl font-semibold text-accent hover:underline">
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
import NavBar from "../components/utils/NavBar.vue";

const articles = ref([])


const carousel = ref(null)
const items = Array.from({ length: 10 }) // 10 cartes

function scrollNext() {
  if (carousel.value) {
    carousel.value.scrollBy({ left: 320, behavior: 'smooth' })
  }
}

function scrollLeft() {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: -300, // décale vers la gauche
      behavior: 'smooth'
    })
  }
}

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
