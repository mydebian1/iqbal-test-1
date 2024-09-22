<template>
    <div class="flex flex-col min-h-screen">
      <HeaderComponent />
      <main class="flex-grow">
        <slot />
      </main>
      <FooterComponent />
    </div>
  </template>
  
  <script setup lang="ts">
  import HeaderComponent from '~/components/HeaderComponent.vue';
  import FooterComponent from '~/components/FooterComponent.vue';
  </script>
  
  <style>
  body {
    font-family: 'Roboto', sans-serif;
  }
  
  .open-sans {
    font-family: 'Open Sans', sans-serif;
  }
  </style>