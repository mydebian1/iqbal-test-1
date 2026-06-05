<template>
  <header class="border-b border-surface bg-background-primary">
    <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
      <NuxtLink :to="homePath" class="flex items-center gap-3 text-color">
        <span class="flex h-10 w-10 items-center justify-center bg-primary-100 text-sm font-bold text-primary-600">CL</span>
        <span>
          <span class="block text-base font-semibold leading-tight">Cabline</span>
          <span class="block text-xs text-muted-color">Driver Onboarding</span>
        </span>
      </NuxtLink>

      <div v-if="user" class="min-w-0 text-right">
        <p class="truncate text-sm font-semibold text-color">Welcome</p>
        <p class="truncate text-xs text-muted-color">{{ driverEmail }}</p>
      </div>
    </div>
  </header>
</template>

<script setup>
const { user } = useDriverAuth()
const route = useRoute()

const driverName = computed(() => user.value?.name || user.value?.username || 'Driver')
const driverEmail = computed(() => user.value?.email || user.value?.username || '')
const companyId = computed(() => String(route.params.companyId || '').trim())
const homePath = computed(() => companyId.value ? `/${companyId.value}` : '/')
</script>
