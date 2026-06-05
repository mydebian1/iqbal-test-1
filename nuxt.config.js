import { CablinePreset } from './theme/index.js'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  experimental: {
    appManifest: false,
  },
  css: ['~/assets/css/main.css'],
  image: {
    quality: 80,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [
      {
        name: 'cabline-app-manifest-stub',
        enforce: 'pre',
        resolveId(id) {
          if (id === '#app-manifest') {
            return '\0cabline-app-manifest-stub'
          }
        },
        load(id) {
          if (id === '\0cabline-app-manifest-stub') {
            return 'export default { prerendered: [], timestamp: 0 }'
          }
        },
      },
    ],
  },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
  ],
  googleFonts: {
    families: {
      Manrope: {
        wght: [400, 500, 600, 700],
      },
    },
    display: 'swap',
    download: false,
    preload: false,
  },
  primevue: {
    usePrimeVue: true,
    components: {
      include: ['Button', 'InputText', 'Password', 'Tag']
    },
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: CablinePreset,
        options: {
          prefix: 'p',
          darkModeSelector: 'none',
          cssLayer: false
        }
      }
    }
  },
  site: {
    url: 'https://recruitments.cabline.com',
    name: 'Cabline Driver Onboarding',
    description: 'Cabline driver onboarding portal',
    defaultLocale: 'en'
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  runtimeConfig: {
    cablineBaseUrl: process.env.CABLINE_BASE_URL || 'https://local-gateway.cabline.com',
    driverDocumentTypesOperation: process.env.CABLINE_DRIVER_DOCUMENT_TYPES_OPERATION || 'DRIVER_GET_DOCUMENT_TYPES',
    driverDocumentsOperation: process.env.CABLINE_DRIVER_DOCUMENTS_OPERATION || 'DRIVER_GET_MY_DOCUMENTS',
    driverDocumentUploadOperation: process.env.CABLINE_DRIVER_DOCUMENT_UPLOAD_OPERATION || 'DRIVER_CREATE_MY_DOCUMENT',
  }
});
