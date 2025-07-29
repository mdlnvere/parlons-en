<template>
  <div class="max-w-md mx-auto mt-20 p-4 border rounded shadow">
    <h2 class="text-2xl mb-4">Connexion Admin</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Nom d'utilisateur" class="w-full p-2 border mb-3 rounded" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full p-2 border mb-3 rounded" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Se connecter</button>
    </form>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''
  try {
    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    })

    const data = await res.json()

    if (!res.ok) {
      error.value = data.error || 'Erreur inconnue'
      return
    }

    localStorage.setItem('token', data.token) // ✅ Stocke bien le token JWT
    router.push('/admin')                     // ✅ Redirige vers l’admin

  } catch (e) {
    error.value = 'Erreur réseau'
  }
}
</script>
