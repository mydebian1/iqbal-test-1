<template>
  <section class="w-full px-4 py-8 sm:px-6">
    <div class="mx-auto w-full max-w-2xl">
      <div class="portal-panel p-5 sm:p-6">
        <template v-if="!hasCompanyId">
          <p class="text-sm font-semibold uppercase text-primary-600">Driver onboarding</p>
          <h1 class="mt-2 text-2xl font-bold text-color">Link not found or expired</h1>
          <p class="mt-3 text-sm leading-6 text-muted-color">
            Please use the onboarding link from your invitation email. If the link still does not work, contact the driver team.
          </p>
        </template>

        <template v-else>
          <p class="text-sm font-semibold uppercase text-primary-600">Driver recruitment</p>
          <h1 class="mt-2 text-2xl font-bold leading-tight text-color sm:text-3xl">
            Sign in to your onboarding
          </h1>
          <p class="mt-3 text-sm leading-6 text-muted-color">
            Use the email and temporary password from your invitation email. Your company code is already included in this link.
          </p>

          <form class="mt-6 border border-surface bg-background-secondary p-4" @submit.prevent="handleLogin">
            <label class="block space-y-1">
              <span class="text-sm text-muted-color">Email</span>
              <InputText v-model="form.email" type="email" autocomplete="username" class="w-full" />
            </label>

            <label class="mt-4 block space-y-1">
              <span class="text-sm text-muted-color">Password</span>
              <Password
                v-model="form.password"
                autocomplete="current-password"
                :feedback="false"
                toggle-mask
                input-class="w-full"
                class="w-full"
              />
            </label>

            <div v-if="errorMessage" class="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {{ errorMessage }}
            </div>

            <Button
              :label="loading ? 'Signing in...' : 'Log in'"
              type="submit"
              class="mt-4 w-full"
              :disabled="!canSubmit"
              :loading="loading"
            />
          </form>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

definePageMeta({
  layout: 'login',
})

const route = useRoute()
const router = useRouter()
const { login, loading } = useDriverAuth()

const form = reactive({
  email: '',
  password: '',
})
const errorMessage = ref('')

const companyId = computed(() => String(route.params.companyId || '').trim())
const hasCompanyId = computed(() => /^[0-9A-Za-z_-]+$/.test(companyId.value))
const canSubmit = computed(() => hasCompanyId.value && form.email.trim() && form.password.trim() && !loading.value)

const handleLogin = async () => {
  errorMessage.value = ''
  if (!canSubmit.value) {
    errorMessage.value = 'Enter your email and password to continue.'
    return
  }

  const result = await login({
    tenantId: companyId.value,
    username: form.email.trim().toLowerCase(),
    password: form.password,
  })

  if (!result.success) {
    errorMessage.value = result.error || 'Login failed'
    return
  }

  await router.push(`/${companyId.value}`)
}

useSeoMeta({
  title: 'Cabline Driver Login',
  ogTitle: 'Cabline Driver Login',
  description: 'Sign in to the Cabline driver onboarding portal.',
  ogDescription: 'Sign in to the Cabline driver onboarding portal.',
})
</script>
