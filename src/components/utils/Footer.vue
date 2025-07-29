<template>
  <footer class="bg-primary text-white p-5 font-light mt-10  ">
    <h4 class="text-sm mx-10 my-8"><span class="font-semibold">Vere Anne-Sophie</span> • Freelance design & dev </h4>
    <div class=" md:w-9/12 flex flex-row md:m-10 m-5 gap-10 md:gap-40 ">
      <div class="flex flex-col gap-4">
        <h5 class="font-medium">Parlons-en</h5>
        <ul class="flex flex-col gap-2 text-xs">
          <li><RouterLink to="">Articles</RouterLink></li>
          <li><RouterLink to="">A propos</RouterLink></li>
          <li><RouterLink to="">Collaborer</RouterLink></li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h5 class="font-medium">Sujets</h5>
        <ul class="flex flex-col gap-2 text-xs">
          <li>Accessiblité</li>
          <li>Design</li>
          <li>Web</li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h5 class="font-medium">Liens & contacts </h5>
        <p class="text-xs">vereannesophie@gmail.com</p>
        <div class="flex flex-row gap-3 justify-center">
          <a href="https://www.linkedin.com/in/anne-sophie-vere" >
            <img src="/src/assets/icons/mdi_linkedin.png" alt="link to LinkedIn" />
          </a>
          <a href="https://www.behance.net/mdlnvere" >
            <img src="/src/assets/icons/mage_behance.png" alt="link to Behance" />
          </a>
          <a href="https://github.com/mdlnvere" >
            <img src="/src/assets/icons/mdi_github.png" alt="link to Github" />
          </a>
          <a href="https://atelierrecolorer.etsy.com" >
            <img src="/src/assets/icons/bxl_etsy.png" alt="link to Etsy shop" />
          </a>
        </div>

      </div>

    </div>
    <div class="flex flex-row gap-4 justify-end mx-20">
      <h4 class="text-sm font-normal mx-10 my-5"><span class="font-semibold">2025 </span>Parlons-en</h4>
      <ul class="flex flex-row gap-3 text-sm my-5">
        <li><RouterLink to="">Mentions légales</RouterLink></li>
        <li>|</li>
        <li><RouterLink to="">RGPD</RouterLink></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
</script>
