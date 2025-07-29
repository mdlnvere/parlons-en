<template>

  <nav class="flex flex-row justify-between px-8 pt-8">
    <RouterLink to="/" class="  hover:text-accent " >Accueil</RouterLink>
    <div class="flex flex-row  gap-20">
      <RouterLink to="/blog"
                  class=" hover:text-accent " >Blog</RouterLink>
      <RouterLink to="/about"
                  class=" hover:text-accent ">A propos</RouterLink>
      <RouterLink to="/contact" class=" hover:text-accent ">Contact</RouterLink>
    </div>
  </nav>

</template>

<script setup>

</script>
