<template>
  <section class="px-4 py-6 sm:px-6">
    <div v-if="!checkedSession" class="mx-auto w-full max-w-3xl">
      <div class="portal-panel p-6">
        <p class="text-sm font-semibold uppercase text-primary-600">Driver onboarding</p>
        <h1 class="mt-2 text-2xl font-bold text-color">Checking your session</h1>
      </div>
    </div>

    <div v-else-if="!sessionReady" class="mx-auto w-full max-w-3xl">
      <div class="portal-panel p-6">
        <p class="text-sm font-semibold uppercase text-primary-600">Driver onboarding</p>
        <h1 class="mt-2 text-2xl font-bold text-color">Link not found or expired</h1>
        <p class="mt-3 text-sm leading-6 text-muted-color">
          Please use the onboarding link from your invitation email. If the link still does not work, contact the driver team.
        </p>
      </div>
    </div>

    <div v-else class="mx-auto w-full max-w-5xl">
      <div class="portal-panel p-4 sm:p-6">
        <div class="flex flex-wrap items-start justify-between gap-4 border-b border-surface pb-5">
          <div>
            <p class="text-sm font-semibold uppercase text-primary-600">Driver recruitment</p>
            <h1 class="mt-2 max-w-2xl text-2xl font-bold leading-tight text-color sm:text-3xl">
              Welcome to your onboarding
            </h1>
            <p class="mt-3 max-w-2xl text-sm leading-6 text-muted-color">
              Upload each required document and track the review status from this page.
            </p>
          </div>
          <Tag value="Application pending" severity="warn" />
        </div>

        <div class="mt-5 portal-panel-muted p-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-base font-semibold text-color">Required Documents</h2>
              <p class="mt-1 text-sm text-muted-color">
                {{ reviewSummaryText }}
              </p>
            </div>
            <Tag :value="completionLabel" :severity="completionSeverity" />
          </div>

          <div class="mt-4 divide-y divide-surface border border-surface bg-background-primary">
            <div
              v-for="document in documents"
              :key="document.name"
              class="grid gap-3 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center"
            >
              <div>
                <p class="text-sm font-medium text-color">{{ document.name }}</p>
                <p class="text-xs text-muted-color">{{ document.detail }}</p>
                <p v-if="document.uploadedAt" class="mt-1 text-xs text-muted-color">
                  Uploaded {{ document.uploadedAt }}
                </p>
                <p
                  v-if="document.driverVisibleNote"
                  class="mt-2 border-l-2 px-3 py-2 text-xs"
                  :class="document.statusCode === 'rejected'
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : 'border-surface bg-surface-50 text-muted-color'"
                >
                  {{ document.driverVisibleNote }}
                </p>
              </div>
              <Tag :value="document.status" :severity="document.severity" />
              <NuxtLink v-if="canUploadDocument(document)" :to="`/documents/${document.code}`">
                <Button
                  :label="document.uploaded ? 'Replace' : 'Upload'"
                  :severity="document.uploaded ? 'secondary' : undefined"
                  :outlined="document.uploaded"
                  type="button"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const sessionReady = ref(false)
const checkedSession = ref(false)
const { user, loadMe } = useDriverAuth()
const {
  documents,
  summary: documentSummary,
  loadDocuments,
} = useDriverDocuments()

const uploadedCount = computed(() => documentSummary.value.uploaded_count)
const approvedCount = computed(() => documentSummary.value.approved_count || 0)
const rejectedCount = computed(() => documentSummary.value.rejected_count || 0)
const pendingCount = computed(() => documentSummary.value.pending_count || 0)
const requiredCount = computed(() => documentSummary.value.required_count || 0)
const actionRequiredCount = computed(() => documentSummary.value.action_required_count || 0)
const totalCount = computed(() => documentSummary.value.total_count || documents.value.length)
const completionLabel = computed(() => `${approvedCount.value} of ${totalCount.value} approved`)
const completionSeverity = computed(() => {
  if (totalCount.value > 0 && approvedCount.value === totalCount.value) return 'success'
  if (actionRequiredCount.value > 0) return 'danger'
  if (pendingCount.value > 0) return 'warn'
  return 'secondary'
})
const reviewSummaryText = computed(() => {
  const parts = [`${uploadedCount.value} of ${totalCount.value} uploaded`, `${approvedCount.value} approved`]
  if (rejectedCount.value) parts.push(`${rejectedCount.value} needs replacement`)
  if (requiredCount.value) parts.push(`${requiredCount.value} missing`)
  if (pendingCount.value) parts.push(`${pendingCount.value} awaiting review`)
  return parts.join(', ')
})
const canUploadDocument = (document) => {
  if (!document.uploaded) return true
  return ['pending', 'pending_review', 'submitted', 'rejected'].includes(document.statusCode)
}

onMounted(async () => {
  const meResult = await loadMe()
  if (!meResult.success) {
    checkedSession.value = true
    return
  }

  await loadDocuments()
  sessionReady.value = true
  checkedSession.value = true
})

useSeoMeta({
  title: 'Cabline Driver Onboarding',
  ogTitle: 'Cabline Driver Onboarding',
  description: 'Driver onboarding portal for Cabline recruitment.',
  ogDescription: 'Driver onboarding portal for Cabline recruitment.',
})
</script>
