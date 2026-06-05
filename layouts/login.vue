<template>
  <div class="flex min-h-screen flex-col bg-background-secondary text-color">
    <main class="flex flex-1 items-center">
      <slot />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from '~/components/FooterComponent.vue'
</script>
