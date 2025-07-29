<template>

  <header class="md:m-10  md:py-2">
    <div class="flex justify-center mb-0 ">
      <h1 class=" font-medium mt-2 mx-3 md:mx-5 md:pt-5 pb-2 md:text-8xl text-4xl " >A mon tour</h1>
    </div>
    <div class="flex flex-row gap-10 justify-center mb-10">
      <p class="hover:text-accent">CREER</p>
      <p>|</p>
      <p class="hover:text-accent">CODER</p>
      <p>|</p>
      <p class="hover:text-accent">PARTAGER</p>
    </div>
  </header>

  <div class="px-10 py-5 md:px-52 md:py-24">


      <div>
        <h2 class="text-2xl w-9/12 text-accent font-medium text-left mb-8">Ici j’écris, là-bas je crée. Et entre les deux, j’aide des projets à prendre forme.</h2>
        <p class="text-base font-regular text-left">
          Mon parcours est une aventure à la croisée du design, du développement et de la recherche. Chaque étape m’a permis d’affiner ma vision, d’acquérir de nouvelles compétences et surtout de nourrir ma curiosité. Ce mélange d’expériences me permet aujourd’hui d’accompagner les projets de manière globale, en alliant créativité et technique.
        </p>
      </div>
    <section>
      <div class="my-4  md:my-28 flex md:flex-row flex-col gap-16">
        <div class="flex flex-col gap-5 py-3">
          <h3 class="text-2xl font-medium  ">Profil express</h3>
          <p class="text-base font-regular text-left">Anne-Sophie, développeuse et UX designer indépendante en Ariège. J’accompagne les entreprises dans leur digitalisation, avec une approche sur-mesure mêlant design, dev et couleur. Et quand je décroche un peu, je lis, je dessine, et j’imagine des visuels pour ma boutique Etsy.</p>
          <div><p>Curieux/se de découvrir d'autres facettes de mon travail ? C'est par ici : </p>
          <div class="flex flex-row gap-4 pt-3">
            <a href="https://www.linkedin.com/in/anne-sophie-vere" ><img src="/src/assets/icons/black_linkedin.svg" alt="accès linkedin"/></a>
            <a href="https://www.behance.net/mdlnvere" ><img src="/src/assets/icons/black_behance.svg" alt="accès behance"/></a>
            <a href="https://github.com/mdlnvere" ><img src="/src/assets/icons/black_github.svg" alt="accès github"/></a>
            <a href="https://atelierrecolorer.etsy.com" ><img src="/src/assets/icons/black_etsy.svg" alt="accès boutique estsy"/></a>
          </div>
          </div>
        </div>
        <img class="max-w-[450px] "  src="../assets/me.png" alt="Drawing : portrait of the author" />
      </div>

      <div class="my-4">
        <h3 class="text-2xl font-medium my-6 ">Inspirations</h3>
          <ul class="flex flex-col md:flex-row gap-10 md:text-center  text-sm">
            <li >
              <img src="../assets/couleur-pratique.png" alt="Working with color" />
              <p class="text-center">Pratiquer la couleur dans tout ses états</p>
            </li>
            <li>
              <img src="../assets/lire.png" alt="Opened books" />
              <p class="text-center">Lire entre les lignes </p>
            </li>
            <li>
              <img src="../assets/emerveiller.png" alt="vitraux de Conques exposition" />
              <p class="text-center">Observer,comprendre, m'émerveiller </p>
            </li>
          </ul>
      </div>
    </section>

    <section class="my-40">
      <h3 class="text-2xl font-medium text-accent ">Le coeur de mon métier</h3>
      <h5 class="text-xl font-medium text-secondary my-2">Parce que bloguer, c’est bien. Créer pour les autres, c’est pas mal non plus.</h5>
      <p class="my-5 text-lg font-regular ">J’accompagne les entreprises dans leur <strong>transformation digitale </strong>avec une approche centrée sur <strong>l’expérience utilisateur </strong> et l’impact visuel. Mon expertise croise <strong> identité de marque, UX/UI design, couleur et développement web sur mesure </strong>, pour imaginer des solutions à la fois cohérentes, esthétiques et fonctionnelles. De l’audit stratégique à la création de fonctionnalités adaptées, je conçois des parcours clairs, engageants, et alignés avec les usages de leurs utilisateurs.
      </p>
    </section>

    <section  class="my-40">
      <h3 class="text-2xl font-medium text-accent ">Trajectoires clés</h3>
      <h5 class="text-xl font-medium text-secondary my-2">Un fil rouge : créer, toujours. Peu importe l’outil.</h5>
      <div class="flex flex-col w-full md:flex-row gap-4">
        <div  class="flex flex-col  py-5  rounded-xl w-full md:w-1/2">
          <img src="../assets/working.png" alt="The author woriking on her computer">
          <div class="flex flex-col justify-between px-2">
            <p class="text-sm text-secondary font-medium px-2">Depuis 2025</p>
            <p class="text-2xl font-semibold px-2 py-2">WEBDESIGN & DIGITALISATION</p>
            <h6 class="text-base font-semibold px-2">Quand le design rencontre le code</h6>
            <p class="text-sm text-left px-2">Aujourd’hui, j’accompagne les entreprises dans leur transformation digitale en alliant design graphique, développement web et sens de l’expérience utilisateur.<br>Mon approche hybride me permet de concevoir des outils sur-mesure, aussi beaux qu’efficaces : du branding à la mise en ligne.</p>
          </div>
        </div>

        <div class="flex flex-col py-4 w-full md:w-1/2">
          <div
              class="flex flex-col  md:flex-row items-start my-2"
          >
            <img src="../assets/dev.png" class="w-2/5" alt="computer components" />
            <div class="flex flex-col my-3 gap-2">
              <h6 class="font-semibold text-sm">CONCEPTION & DEVELOPPEMENT D’APPLICATION <span class="text-xs text-secondary">- Titre professionnel</span> </h6>
              <p class="font-medium text-sm">Penser en dehors du cadre</p>
              <p class="font-regular text-xs" >Le dev s’est imposé comme une suite logique, presque inévitable, pour aller plus loin dans la conception — et donner forme à mes idées.</p>
            </div>
          </div>
          <div
              class="flex flex-col md:flex-row md:items-start my-2"
          >
            <img src="../assets/cric.png" alt="computer components" class="w-2/5"/>
            <div class="flex flex-col my-3 gap-2">
              <h6 class="font-semibold text-sm">CREATION RECHERCHE COULEUR & MATIERE <span class="text-xs text-secondary">- Master</span> </h6>
              <p class="font-medium text-sm">La couleur, bien plus que des pigments</p>
              <p class="font-regular text-xs" >Comprendre la couleur et la matière, c’est penser l’impact visuel dès la conception. J’utilise cette expertise pour enrichir les identités et les expériences utilisateurs.</p>
            </div>
          </div>
          <div
              class="flex flex-col md:flex-row md:items-start my-2"
          >
            <img src="../assets/product.png" alt="computer components" class="w-2/5"/>
            <div class="flex flex-col my-3 gap-2">
              <h6 class="font-semibold text-sm">DESIGN PRODUIT<span class="text-xs text-secondary">- Licence</span> </h6>
              <p class="font-medium text-sm">Créer des produits qui ne laissent personne de côté</p>
              <p class="font-regular text-xs" >Concevoir un bon produit, c’est trouver l’équilibre entre fonctionnalité, durabilité et désirabilité.  Mon approche du design produit place l’humain au cœur du processus, sans jamais négliger l’impact.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
    <section class="my-40">
      <h3 class="text-2xl font-medium text-accent ">Une idée, un besoin, un projet ?
        <br>Je vous accompagne →</h3>
      <div class="my-8 flex flex-col md:flex-row shadow-md rounded-3xl">
        <img class="md:max-w-[55%]" src="/src/assets/picture-ensemble.png" alt="let's work together" />
        <div class=" bg-white  py-5 px-8 md:rounded-r-3xl">
          <h5 class="text-black text-2xl font-medium">Imaginons votre projet, ensemble </h5>
          <p class="py-4">Je vous accompagne dans la conception d’expériences digitales cohérentes et sur-mesure — de l’identité visuelle au développement, en passant par le design d’interfaces qui font sens.</p>
          <router-link to="/contact" class="text-sm py-1 px-3 border font-medium border-black rounded-xl hover:bg-black hover:text-white w-max" >Parlons-en</router-link>
        </div>
      </div>
    </section>

  </div>

</template>

<script setup>

</script>
