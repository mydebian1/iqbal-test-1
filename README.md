# Welcome to Nuxt Skeleton

![Nuxt.js Logo](https://nuxt.com/assets/design-kit/logo/icon-green.svg)

This repository is created for our team to quickly build websites without the worry of installing all the dependencies manually. It provides a solid foundation with pre-installed and configured essential tools and libraries.

## Included Dependencies

<div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="https://primefaces.org/cdn/primevue/images/primevue-logo-dark.svg" alt="PrimeVue Logo" height="50">
    <p>PrimeVue v4.0.7</p>
  </div>
  <div style="text-align: center;">
    <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg" alt="Tailwind CSS Logo" height="50">
    <p>Tailwind CSS v3.4.12</p>
  </div>
  <div style="text-align: center;">
    <img src="https://api.iconify.design/logos:iconify-icon.svg" alt="Iconify Logo" height="50">
    <p>Iconify v4.1.2</p>
  </div>
  <div style="text-align: center;">
    <img src="https://nuxt.com/assets/design-kit/logo/icon-green.svg" alt="Nuxt Fonts Module Logo" height="50">
    <p>Nuxt Fonts v0.8.0</p>
  </div>
  <div style="text-align: center;">
    <img src="https://nuxt.com/assets/design-kit/logo/icon-green.svg" alt="Nuxt Image Module Logo" height="50">
    <p>Nuxt Image v1.8.0</p>
  </div>
</div>

## Core Dependencies

- Nuxt v3.13.2
- Vue v3.5.7
- Vue Router v4.4.5

## Dependencies Installation

### PrimeVue v4.0.7

PrimeVue is a rich set of open source UI Components for Vue.

```bash
npm install primevue@4.0.7
npm install --save-dev @primevue/nuxt-module@4.0.7
npm install @primevue/themes@4.0.7
```

#### Basic Usage Example

```vue
<template>
  <Button label="Click me!" />
</template>

<script setup>
import { Button } from 'primevue/button'
</script>
```

### Tailwind CSS v3.4.12

Tailwind CSS is a utility-first CSS framework.

```bash
npm install -D tailwindcss@3.4.12 postcss@8.4.47 autoprefixer@10.4.20
```

#### Basic Usage Example

```vue
<template>
  <div class="bg-blue-500 text-white p-4 rounded">
    This is a Tailwind styled div
  </div>
</template>
```

### Iconify v4.1.2

Iconify is a unified icon framework.

```bash
npm install --save-dev @iconify/vue@4.1.2
```

#### Basic Usage Example

```vue
<template>
  <Icon icon="mdi-light:home" />
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>
```

### Nuxt Fonts Module v0.8.0

The Nuxt Fonts module provides easy font integration for Nuxt projects.

```bash
npx nuxi@latest module add fonts
```

#### Basic Usage Example

In your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/fonts'],
  fonts: {
    google: {
      families: ['Roboto']
    }
  }
})
```

### Nuxt Image Module v1.8.0

The Nuxt Image module is a plugin for optimizing images in Nuxt applications.

```bash
npx nuxi@latest module add image
```

#### Basic Usage Example

```vue
<template>
  <nuxt-img src="/path/to/image.jpg" width="300" height="200" />
</template>
```

This README now includes installation instructions and basic usage examples for all the mentioned dependencies. Remember to adjust the examples according to your specific project structure and needs.

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

Happy coding!