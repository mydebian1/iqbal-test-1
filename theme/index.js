import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const CablinePreset = definePreset(Aura, {
  components: {
    button: {
      root: {
        borderRadius: '0',
      },
    },
    dialog: {
      root: {
        borderRadius: '0',
        borderColor: '{primary.color}',
      },
    },
    tag: {
      root: {
        borderRadius: '0',
      },
    },
  },

  semantic: {
    primary: {
      50: '#f5f1fa',
      100: '#e9e0f4',
      200: '#d4c2e9',
      300: '#bda0db',
      400: '#a585cd',
      500: '#8d68bf',
      600: '#7551a3',
      700: '#5e4084',
      800: '#483166',
      900: '#33234a',
      950: '#211630',
    },
    formField: {
      borderRadius: '0',
    },
  },

  extend: {
    appColor: {
      white: '#FFFFFF',
      danger: '#DC2626',
    },
    dangerLight: {
      background: '#ffeded',
      border: '#FEE2E2',
      hoverBackground: '#fbabab',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    typography: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '0.9375rem',
        lg: '1rem',
        xl: '1.0625rem',
        '2xl': '1.125rem',
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.625',
      },
      letterSpacing: {
        normal: '0',
        wide: '0.025em',
      },
    },
  },
})

export default CablinePreset
