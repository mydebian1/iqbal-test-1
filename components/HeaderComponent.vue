<template>
  <header class="bg-gray-800 text-white p-4">
    <div class="w-3/6 mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold open-sans hover:text-gray-300 transition-colors duration-200">Nuxt Skeleton</NuxtLink>
      <nav>
        <ul class="flex space-x-4">
          <li v-for="link in links" :key="link.path">
            <NuxtLink
              :to="link.path"
              class="hover:text-gray-300 transition-colors duration-200"
              :class="{ 'border-b-2 border-white': $route.path === link.path }"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];
</script>
