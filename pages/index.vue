<template>
  <div class="container mx-auto px-4 py-10 w-3/6">
    <h1 class="text-4xl mb-6 text-center open-sans">Welcome to Nuxt Skeleton</h1>
    
    <div class="flex flex-col items-center mb-8">
      <NuxtImg src="/images/Nuxt-logo.png" class="w-64 h-auto mb-6" alt="Nuxt Logo" />
      
      <div class="w-full">
        <p class="text-lg mb-4">
          This skeleton is designed to do most of the work for Website development. It's built using Nuxt with Vite for better CLI and development experience.
        </p>
        <p class="text-lg mb-4">
          We've integrated PrimeVue components like buttons, datatable, and form inputs. Tailwind CSS is used for fast styling, and Iconify is included to use most open-source icons. Nuxt Fonts allows you to use open-source fonts directly, and the Nuxt Image module is integrated for better image optimization.
        </p>
        <p class="text-lg mb-4">
          SEO meta tags can be added directly into each route using the <code>useSeoMeta</code> composable, as demonstrated in this page's setup. This allows for easy customization of title, description, and other SEO-related information for each page.
        </p>
        <NuxtLink to="/about" class="p-button p-component open-sans flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors duration-200">
            <span class="p-button-icon p-button-icon-left mr-2">
                <Icon icon="ic:baseline-info" class="w-5 h-5" />
            </span>
            <span class="p-button-label">Read More</span>
        </NuxtLink>
      </div>

      <h2 class="text-3xl font-semibold mb-6 mt-8 open-sans text-center">Integrated Technologies</h2>
      <div class="space-y-4">
        <a href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <img src="https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue" class="mr-4" />
          <span class="text-sm">A progressive framework for building user interfaces.</span>
        </a>
        <a href="https://nuxt.com/docs" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <img src="https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white" alt="Nuxt" class="mr-4" />
          <span class="text-sm">The Intuitive Vue Framework for building your next web application.</span>
        </a>
        <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" class="mr-4" />
          <span class="text-sm">Next Generation Frontend Tooling for faster development.</span>
        </a>
        <a href="https://primevue.org/introduction/" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <img src="https://img.shields.io/badge/PrimeVue-4a9885?style=for-the-badge&logo=vue.js&logoColor=white" alt="PrimeVue" class="mr-4" />
          <span class="text-sm">A rich set of open source UI Components for Vue.</span>
        </a>
        <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" class="mr-4" />
          <span class="text-sm">A utility-first CSS framework for rapid UI development.</span>
        </a>
        <a href="https://icon-sets.iconify.design/ic/" target="_blank" rel="noopener noreferrer" class="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <img src="https://img.shields.io/badge/Iconify-1769AA?style=for-the-badge&logo=iconify&logoColor=white" alt="Iconify" class="mr-4" />
          <span class="text-sm">All popular icon sets, one framework. Over 100,000 open source vector icons.</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';

useSeoMeta({
  title: 'Nuxt Skeleton - Modern Web Development',
  ogTitle: 'Nuxt Skeleton - Modern Web Development',
  description: 'A powerful Nuxt-based skeleton for efficient website development with integrated PrimeVue, Tailwind CSS, and more.',
  ogDescription: 'A powerful Nuxt-based skeleton for efficient website development with integrated PrimeVue, Tailwind CSS, and more.',
})
</script>
<style scoped>
.open-sans {
  font-family: 'Open Sans', sans-serif;
}
</style>