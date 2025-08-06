<script setup>

</script>

<template>

  <header class="md:m-10  md:py-2">
    <div class="flex justify-center mb-0 ">
      <h1 class=" font-medium mt-2 mx-3 md:mx-5 md:pt-5 pb-2 md:text-8xl text-4xl " >Me contacter</h1>
    </div>

  </header>
  <div class="ml-10 my-36   pl-10 py-2 md:py-10 bg-white rounded-l-3xl flex md:flex-row justify-between">
    <div class="mx-5">

        <h2 class="text-black text-4xl font-semibold ">A votre écoute</h2>
        <p class="font-normal text-secondary text-base my-5">Réagir à un article, proposer une idée, poser une question ou démarrer un projet : tout commence ici</p>
    <form class="flex flex-col justify-around gap-6 my-6 mr-5">
      <div class="flex flex-row  gap-6">
        <div class="flex flex-col w-2/4">
          <label for="lastname">Nom</label>
          <input
              id="lastname"
              name="lastname"
              placeholder="Doe"
              class="bg-form p-2 my-2 rounded">
        </div>
        <div class="flex flex-col  w-2/4" >
          <label for="firstname">Prénom</label>
          <input
              id="firstname"
              name="firstname"
              placeholder="John"
              class="bg-form p-2 my-2 rounded">
        </div>
      </div>
      <div class="flex flex-col">
        <label for="email">Mail</label>
        <input
            id="email"
            name="email"
            type="email"
            placeholder="exemple@mail.com"
            class="bg-form p-2 my-2 rounded">
      </div>
      <div class="flex flex-col">
        <label for="subject">A quel sujet ?</label>
        <select
            id="subject" name="subject"
            class="bg-form p-2 my-2   rounded">
          <option value="idee-article">Proposer une idée d'article</option>
          <option value="question">Poser une question</option>
          <option value="projet-pro">Parler d'un projet professionnel</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label for="message">Votre message</label>
        <textarea
            id="message"
            name="message"
            rows="10"
            class="bg-form p-2 my-2   rounded"
            placeholder="Partager votre idée, votre quesiton ou votre projet..."></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class=" text-sm  text-white py-1 px-3 border font-medium bg-primary hover:bg-black rounded-xl w-max mt-2" >Envoyer</button>
      </div>
    </form>
    </div>
    <img alt="laptop image" class="max-h-50p w-6/12 "  src="/src/assets/contact.png" />
  </div>

</template>

