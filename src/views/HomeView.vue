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


  <section class="bg-primary h-96 mx-0 my-32 px-5 text-white  text-left flex flex-row justify-around">
    <div class="flex flex-col justify-around py-10 px-28">
      <h3 class="font-medium text-xl"  > DERRIERE L'ECRAN</h3>
      <h2 class="text-4xl" style="font-weight: bolder">Ravie de te rencontrer</h2>
      <p class="text-base  pb-6 w-96 " style="font-weight: lighter">Moi, c’est Anne-Sophie Vere, freelance passionnée par le design, le développement, et tout ce qui nourrit mon univers créatif.  Ici, je partage projets, idées et inspirations qui me passionnent au quotidien.</p>
      <p class="text-2xl font-bold">Assieds toi, le meilleur reste à venir</p>
    </div>
    <img class="pr-3 " alt="Portait d'Anne-Sophie Vere" src="/public/images/pic.png" />
  </section>

  <section class="py-4 px-4 md:py-10 md:px-40">
    <div class="my-3">
      <h2 class="font-semibold text-xl">Mes derniers articles</h2>
      <div class="flex flex-row gap-5">
        <h3 class="text-secondary font-semibold text-xl">Tu risques d'y rester un moment</h3>
        <RouterLink to="" class="text-accent text-base flex flex-row items-center" >Voir tout les articles <img  alt="arrow icon" src="/public/icons/arrow.svg"></RouterLink>
      </div>
    </div>
      <div class="flex flex-col w-full md:flex-row gap-4">
        <div v-if="articles.length" class="flex flex-col gap-5 px-1 py-5 mr-3 rounded-xl w-full md:w-1/2">
          <div
              v-if="articles[0].imageUrl"
              class="w-full aspect-[4/3] bg-center bg-cover bg-no-repeat rounded-lg shadow-xl"
              :style="{ backgroundImage: `url(${articles[0].imageUrl})` }"
          ></div>
          <div class="flex flex-col justify-between p-2">
            <div class="prose text-xs md:text-xs font-medium mb-5" v-html="articles[0].mainPreview"></div>
            <div class="flex  justify-end ">
              <router-link :to="`/article/${articles[0].slug}`" class="text-sm py-1 px-3 border font-medium border-black rounded-xl hover:bg-black hover:text-white w-max mt-2">
                Lire l'article
              </router-link>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-7 px-5 py-1 w-full md:w-1/2">
          <div
              v-for="article in articles.slice(1, 4)"
              :key="article.slug"
              class="flex flex-col md:flex-row md:items-start my-2"
          >
            <div
                v-if="article.imageUrl"
                class="w-full md:w-[120px] md:h-[120px] aspect-square rounded shadow-xl bg-center bg-cover bg-no-repeat mb-2 md:mb-0 md:mr-5 shrink-0"
                :style="{ backgroundImage: `url(${article.imageUrl})` }"
            ></div>
            <div class="flex flex-col">
              <div class="prose prose-smaller text-xs md:text-sm mb-2" v-html="article.preview"></div>
              <div class="flex justify-end mt-2">
                <router-link :to="`/article/${article.slug}`" class="text-sm py-1 px-3 border font-medium border-black rounded-xl hover:bg-black hover:text-white w-max">
                  Lire l'article
                </router-link>
              </div>
            </div>
          </div>
        </div>

      </div>


  </section>

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
      preview: marked.parse(article.content.substring(0, 100) + '...'),// Limite à 200 caractères par exemple
      mainPreview: marked.parse(article.content.substring(0, 500) + '...')
    }))
  } catch (err) {
    console.error('Erreur chargement articles', err)
  }
})
</script>
