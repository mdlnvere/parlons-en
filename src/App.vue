<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow pt-8">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "./components/utils/NavBar.vue";
import Footer from "./components/utils/Footer.vue";
</script>
