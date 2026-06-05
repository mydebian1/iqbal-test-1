<template>
  <section class="px-4 py-6 sm:px-6">
    <div class="mx-auto w-full max-w-3xl">
      <div v-if="!checkedSession" class="portal-panel p-5">
        <p class="text-sm font-semibold uppercase text-primary-600">Driver onboarding</p>
        <h1 class="mt-2 text-2xl font-bold text-color">Checking your session</h1>
      </div>

      <div v-else-if="!sessionReady" class="portal-panel p-5">
        <p class="text-sm font-semibold uppercase text-primary-600">Driver onboarding</p>
        <h1 class="mt-2 text-2xl font-bold text-color">Link not found or expired</h1>
      </div>

      <div v-else-if="!currentDocument" class="portal-panel p-5">
        <Button label="Back" severity="secondary" text type="button" @click="goBack" />
        <h1 class="mt-3 text-2xl font-bold text-color">Document not found</h1>
      </div>

      <div v-else class="portal-panel p-5">
        <Button label="Back" severity="secondary" text type="button" @click="goBack" />

        <div class="mt-4 border-b border-surface pb-4">
          <p class="text-sm font-semibold uppercase text-primary-600">Upload document</p>
          <h1 class="mt-2 text-2xl font-bold text-color">{{ currentDocument.name }}</h1>
          <p class="mt-2 text-sm leading-6 text-muted-color">{{ currentDocument.detail }}</p>
          <div class="mt-3">
            <Tag :value="currentDocument.status" :severity="currentDocument.severity" />
          </div>
          <div
            v-if="currentDocument.driverVisibleNote"
            class="mt-4 border-l-2 px-3 py-2 text-sm"
            :class="currentDocument.statusCode === 'rejected'
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-surface bg-surface-50 text-muted-color'"
          >
            {{ currentDocument.driverVisibleNote }}
          </div>
        </div>

        <form class="mt-5 space-y-5" @submit.prevent="submitDocument">
          <div v-if="currentDocument.requiresReferenceNumber" class="space-y-1">
            <label class="block text-sm text-muted-color" for="reference-number">{{ currentDocument.referenceLabel }}</label>
            <InputText id="reference-number" v-model="form.referenceNumber" fluid />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div v-if="currentDocument.requiresIssueDate" class="space-y-1">
              <label class="block text-sm text-muted-color" for="issue-date">Start date</label>
              <InputText id="issue-date" v-model="form.issueDate" type="date" fluid />
            </div>

            <div v-if="currentDocument.requiresExpiryDate" class="space-y-1">
              <label class="block text-sm text-muted-color" for="expiry-date">{{ currentDocument.expiryLabel }}</label>
              <InputText id="expiry-date" v-model="form.expiryDate" type="date" fluid />
            </div>
          </div>

          <div v-if="currentDocument.requiresFile" class="portal-panel-muted p-4">
            <h2 class="text-base font-semibold text-color">Document file</h2>
            <p class="mt-1 text-sm text-muted-color">{{ currentDocument.uploadLabel }}</p>

            <div class="mt-4 flex flex-wrap gap-3">
              <Button label="Choose from gallery" type="button" @click="openGallery" />
              <Button label="Take photo" severity="secondary" type="button" @click="openCamera" />
            </div>

            <input
              ref="galleryInput"
              class="hidden"
              type="file"
              :accept="acceptedFileTypes"
              @change="handleGalleryFile"
            >

            <div v-if="selectedFile" class="mt-4 border border-surface bg-background-primary p-3">
              <p class="text-sm font-semibold text-color">{{ selectedFile.name }}</p>
              <p class="mt-1 text-xs text-muted-color">{{ selectedFile.type || 'Selected file' }}</p>
              <img
                v-if="previewUrl && selectedFile.type.startsWith('image/')"
                :src="previewUrl"
                alt="Selected document preview"
                class="mt-3 max-h-72 w-full object-contain"
              >
            </div>
          </div>

          <div v-if="errorMessage" class="border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {{ errorMessage }}
          </div>

          <Button
            :label="isSubmitting ? 'Uploading...' : 'Submit document'"
            type="submit"
            :loading="isSubmitting"
            :disabled="!canSubmit"
          />
        </form>
      </div>
    </div>

    <div v-if="cameraOpen" class="fixed inset-0 z-50 bg-black text-white">
      <video ref="videoEl" class="h-full w-full object-contain" autoplay playsinline muted></video>

      <div class="absolute left-0 right-0 top-0 flex items-center justify-between gap-3 p-4">
        <Button label="Close" severity="secondary" type="button" @click="closeCamera" />
        <Button v-if="torchSupported" :label="torchEnabled ? 'Flash off' : 'Flash on'" type="button" @click="toggleTorch" />
      </div>

      <div class="absolute bottom-0 left-0 right-0 space-y-4 bg-black/70 p-4">
        <div v-if="zoomSupported" class="space-y-2">
          <label class="block text-sm">Zoom</label>
          <input
            v-model.number="zoomValue"
            type="range"
            :min="zoomMin"
            :max="zoomMax"
            :step="zoomStep"
            @input="applyZoom"
          >
        </div>

        <div class="flex justify-center">
          <Button label="Capture" type="button" @click="capturePhoto" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Tag from 'primevue/tag'

const route = useRoute()
const router = useRouter()
const { loadMe } = useDriverAuth()
const { documents, loadDocuments } = useDriverDocuments()

const checkedSession = ref(false)
const sessionReady = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const selectedFile = ref(null)
const previewUrl = ref('')
const galleryInput = ref(null)
const videoEl = ref(null)
const cameraOpen = ref(false)
const mediaStream = ref(null)
const cameraTrack = ref(null)
const torchSupported = ref(false)
const torchEnabled = ref(false)
const zoomSupported = ref(false)
const zoomMin = ref(1)
const zoomMax = ref(1)
const zoomStep = ref(0.1)
const zoomValue = ref(1)

const form = reactive({
  referenceNumber: '',
  issueDate: '',
  expiryDate: '',
})

const companyId = computed(() => String(route.params.companyId || '').trim())
const documentCode = computed(() => String(route.params.documentCode || '').replace(/-/g, '_'))
const currentDocument = computed(() => documents.value.find((item) => item.code === documentCode.value))
const acceptedFileTypes = computed(() => {
  const extensions = currentDocument.value?.allowedFileTypes || ['jpg', 'jpeg', 'png', 'pdf']
  const mimeTypes = extensions.flatMap((extension) => {
    const value = String(extension).toLowerCase().replace(/^\./, '')
    if (value === 'jpg' || value === 'jpeg') return ['image/jpeg']
    if (value === 'png') return ['image/png']
    if (value === 'webp') return ['image/webp']
    if (value === 'pdf') return ['application/pdf']
    return [`.${value}`]
  })
  return [...new Set(mimeTypes)].join(',')
})
const requiredFieldsReady = computed(() => {
  if (!currentDocument.value) return false
  if (currentDocument.value.requiresReferenceNumber && !form.referenceNumber.trim()) return false
  if (currentDocument.value.requiresIssueDate && !form.issueDate) return false
  if (currentDocument.value.requiresExpiryDate && !form.expiryDate) return false
  if (currentDocument.value.requiresFile && !selectedFile.value) return false
  return true
})
const canSubmit = computed(() => Boolean(currentDocument.value && requiredFieldsReady.value && !isSubmitting.value))

const goBack = () => router.push(`/${companyId.value}`)

const clearPreview = () => {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = ''
}

const setSelectedFile = (file) => {
  clearPreview()
  selectedFile.value = file
  if (file?.type?.startsWith('image/')) {
    previewUrl.value = URL.createObjectURL(file)
  }
}

const openGallery = () => {
  galleryInput.value?.click()
}

const handleGalleryFile = (event) => {
  const file = event.target.files?.[0]
  if (file) setSelectedFile(file)
  event.target.value = ''
}

const openCamera = async () => {
  errorMessage.value = ''
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false,
    })
    mediaStream.value = stream
    cameraTrack.value = stream.getVideoTracks()[0]
    const capabilities = cameraTrack.value.getCapabilities?.() || {}
    torchSupported.value = Boolean(capabilities.torch)
    zoomSupported.value = Boolean(capabilities.zoom)
    if (zoomSupported.value) {
      zoomMin.value = capabilities.zoom.min || 1
      zoomMax.value = capabilities.zoom.max || 1
      zoomStep.value = capabilities.zoom.step || 0.1
      zoomValue.value = zoomMin.value
    }
    cameraOpen.value = true
    await nextTick()
    if (videoEl.value) videoEl.value.srcObject = stream
  } catch {
    errorMessage.value = 'Camera could not be opened. Please choose a file from gallery.'
  }
}

const closeCamera = () => {
  mediaStream.value?.getTracks().forEach((track) => track.stop())
  mediaStream.value = null
  cameraTrack.value = null
  cameraOpen.value = false
  torchSupported.value = false
  torchEnabled.value = false
  zoomSupported.value = false
}

const toggleTorch = async () => {
  if (!cameraTrack.value || !torchSupported.value) return
  torchEnabled.value = !torchEnabled.value
  await cameraTrack.value.applyConstraints({ advanced: [{ torch: torchEnabled.value }] })
}

const applyZoom = async () => {
  if (!cameraTrack.value || !zoomSupported.value) return
  await cameraTrack.value.applyConstraints({ advanced: [{ zoom: zoomValue.value }] })
}

const capturePhoto = async () => {
  if (!videoEl.value) return
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.value.videoWidth
  canvas.height = videoEl.value.videoHeight
  canvas.getContext('2d').drawImage(videoEl.value, 0, 0)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9))
  if (blob) {
    setSelectedFile(new File([blob], `${documentCode.value}.jpg`, { type: 'image/jpeg' }))
  }
  closeCamera()
}

const submitDocument = async () => {
  if (currentDocument.value?.requiresFile && !selectedFile.value) {
    errorMessage.value = 'Choose a file or take a photo first.'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  const payload = new FormData()
  if (currentDocument.value.documentTypeId) {
    payload.append('document_type_id', String(currentDocument.value.documentTypeId))
  }
  payload.append('document_code', currentDocument.value.code)
  if (selectedFile.value) payload.append('file', selectedFile.value)
  if (form.referenceNumber) payload.append('reference_number', form.referenceNumber)
  if (form.issueDate) payload.append('issue_date', form.issueDate)
  if (form.expiryDate) payload.append('expiry_date', form.expiryDate)

  try {
    await $fetch(`/api/onboarding/documents/${currentDocument.value.code}`, {
      method: 'POST',
      body: payload,
    })
    await router.push(`/${companyId.value}`)
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.statusMessage || error?.data?.message || 'Document upload failed'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  const meResult = await loadMe()
  if (!meResult.success) {
    await router.replace(`/${companyId.value}/login`)
    return
  }
  await loadDocuments()
  sessionReady.value = true
  checkedSession.value = true
})

onBeforeUnmount(() => {
  closeCamera()
  clearPreview()
})
</script>
