export default {
  content: [
    "./components/**/*.{js,vue}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.js",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: 'var(--p-primary-50)',
          100: 'var(--p-primary-100)',
          200: 'var(--p-primary-200)',
          300: 'var(--p-primary-300)',
          400: 'var(--p-primary-400)',
          500: 'var(--p-primary-500)',
          600: 'var(--p-primary-600)',
          700: 'var(--p-primary-700)',
          800: 'var(--p-primary-800)',
          900: 'var(--p-primary-900)',
          950: 'var(--p-primary-950)',
          DEFAULT: 'var(--p-primary-color)',
          contrast: 'var(--p-primary-contrast-color)',
        },
        surface: 'var(--p-content-border-color)',
        color: 'var(--p-text-color)',
        'muted-color': 'var(--p-text-muted-color)',
        'background-primary': 'var(--p-background-primary)',
        'background-secondary': 'var(--p-background-secondary)',
        'background-tertiary': 'var(--p-background-tertiary)',
      },
      fontSize: {
        xs: 'var(--p-typography-font-size-xs)',
        sm: 'var(--p-typography-font-size-sm)',
        base: 'var(--p-typography-font-size-base)',
        lg: 'var(--p-typography-font-size-lg)',
        xl: 'var(--p-typography-font-size-xl)',
        '2xl': 'var(--p-typography-font-size-2xl)',
      },
      lineHeight: {
        tight: 'var(--p-typography-line-height-tight)',
        normal: 'var(--p-typography-line-height-normal)',
        relaxed: 'var(--p-typography-line-height-relaxed)',
      },
      letterSpacing: {
        normal: 'var(--p-typography-letter-spacing-normal)',
        wide: 'var(--p-typography-letter-spacing-wide)',
      },
    },
  },
  plugins: [],
}
