<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="font-bold">Espace Admin</div>
    <div class="flex gap-4">
      <RouterLink to="/admin" class="hover:underline">Accueil</RouterLink>
      <RouterLink to="/admin/articles/new" class="hover:underline">Nouvel Article</RouterLink>
      <RouterLink to="/" class="hover:underline">Voir mon site</RouterLink>
      <button @click="logout" class="text-red-400 hover:underline">Déconnexion</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()


function logout() {
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}
</script>
