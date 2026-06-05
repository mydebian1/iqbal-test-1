<template>
  <section class="px-4 py-6 sm:px-6">
    <div class="mx-auto w-full max-w-3xl">
      <div class="portal-panel p-5 sm:p-6">
        <p class="text-sm font-semibold uppercase tracking-wide text-primary-600">Support</p>
        <h1 class="mt-2 text-2xl font-bold leading-tight text-color">Onboarding Help</h1>
        <p class="mt-4 text-sm leading-6 text-muted-color">
          This portal will let invited drivers sign in, upload documents, and follow approval progress. The first themed version is ready; the next stage will connect invite, login, and document APIs.
        </p>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <div class="portal-panel-muted p-3">
            <p class="text-sm font-semibold text-color">Account access</p>
            <p class="mt-1 text-sm leading-6 text-muted-color">Use the credentials supplied in your invitation email.</p>
          </div>
          <div class="portal-panel-muted p-3">
            <p class="text-sm font-semibold text-color">Document review</p>
            <p class="mt-1 text-sm leading-6 text-muted-color">The driver team will review uploaded documents before approval.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
useSeoMeta({
  title: 'Cabline Driver Onboarding Support',
  ogTitle: 'Cabline Driver Onboarding Support',
  description: 'Support information for the Cabline driver onboarding portal.',
  ogDescription: 'Support information for the Cabline driver onboarding portal.',
})
</script>
