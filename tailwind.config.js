/* eslint-disable no-restricted-imports */
import { heroui } from '@heroui/theme'
import { commonColors } from '@heroui/theme'
import { colors } from './genie-ui/theme/colors'
import containerQueries from '@tailwindcss/container-queries'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './genie-ui/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s step-end infinite',
        loadingBar: 'loadingBar 0.5s infinite',
        'float-1': 'float-1 5s ease-in-out infinite',
        'float-2': 'float-2 5s ease-in-out infinite',
        'text-wave': 'text-wave 2s linear infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        },
        loadingBar: {
          '0%': { left: '0%', right: '100%', width: '0%' },
          '30%': { left: '0%', right: '75%', width: '25%' },
          '50%': { left: '30%', right: '70%', width: '50%' },
          '70%': { left: '75%', right: '0%', width: '25%' },
          '100%': { left: '100%', right: '0%', width: '0%' }
        },
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: 0.5 },
          '50%': {
            transform: 'translate(-10px, -10px) scale(1.05)',
            opacity: 1
          }
        },
        'float-2': {
          '0%, 100%': {
            transform: 'translate(10px, 10px) scale(1.05)',
            opacity: 0.5
          },
          '50%': { transform: 'translate(0, 0) scale(1)', opacity: 1 }
        },
        'text-wave': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' }
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)']
      },
      fontSize: {
        '2xs': 'var(--typography-font-size-text-size-1)',
        'size-1': 'var(--typography-font-size-text-size-1)',
        'size-2': 'var(--typography-font-size-text-size-2)',
        'size-3': 'var(--typography-font-size-text-size-3)',
        'size-4': 'var(--typography-font-size-text-size-4)',
        'size-5': 'var(--typography-font-size-text-size-5)',
        'size-6': 'var(--typography-font-size-text-size-6)',
        'size-7': 'var(--typography-font-size-text-size-7)',
        'size-8': 'var(--typography-font-size-text-size-8)',
        'size-9': 'var(--typography-font-size-text-size-9)',
        'size-10': 'var(--typography-font-size-text-size-10)'
      },
      lineHeight: {
        1: 'var(--typography-line-height-leading-size-1)',
        2: 'var(--typography-line-height-leading-size-2)',
        3: 'var(--typography-line-height-leading-size-3)',
        4: 'var(--typography-line-height-leading-size-4)',
        5: 'var(--typography-line-height-leading-size-5)',
        6: 'var(--typography-line-height-leading-size-6)',
        7: 'var(--typography-line-height-leading-size-7)',
        8: 'var(--typography-line-height-leading-size-8)'
      },
      tracking: {
        1: 'var(--typography-letter-spacing-letter-spacing-size-1)',
        2: 'var(--typography-letter-spacing-letter-spacing-size-2)',
        3: 'var(--typography-letter-spacing-letter-spacing-size-3)',
        4: 'var(--typography-letter-spacing-letter-spacing-size-4)',
        5: 'var(--typography-letter-spacing-letter-spacing-size-5)',
        6: 'var(--typography-letter-spacing-letter-spacing-size-6)',
        7: 'var(--typography-letter-spacing-letter-spacing-size-7)'
      },
      boxShadow: {
        solid: '0px 4px 10px 0px rgba(0, 0, 0, 0.3)',
        bordered: '0px 4px 10px 0px #E5DBF0'
      },
      backgroundImage: {
        gradient:
          'linear-gradient(90deg, rgba(100, 0, 240, 1) 0%, rgba(251, 78, 255, 1) 100%)'
      },
      background: {
        'gradient-border':
          'radial-gradient(circle at 100% 100%, #ffffff 0, #ffffff 3px, transparent 3px) 0% 0%/8px 8px no-repeat, radial-gradient(circle at 0 100%, #ffffff 0, #ffffff 3px, transparent 3px) 100% 0%/8px 8px no-repeat, radial-gradient(circle at 100% 0, #ffffff 0, #ffffff 3px, transparent 3px) 0% 100%/8px 8px no-repeat, radial-gradient(circle at 0 0, #ffffff 0, #ffffff 3px, transparent 3px) 100% 100%/8px 8px no-repeat, linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 10px) calc(100% - 16px) no-repeat, linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 16px) calc(100% - 10px) no-repeat, linear-gradient(90deg, #6400f0 0%, #FB4EFF 100%)'
      },
      width: {
        18: '4.5rem'
      },
      borderRadius: {
        '4xl': '2.625rem'
      },
      colors,
      typography: {
        DEFAULT: {
          css: [
            {
              maxWidth: 'initial'
            }
          ]
        },
        sm: {
          css: {
            lineHeight: '1.5em',
            h1: {
              fontSize: '1.4em',
              marginTop: '0',
              marginBottom: '0.3em',
              lineHeight: '1.5em'
            },
            h2: {
              fontSize: '1.3em',
              marginTop: '0.6em',
              marginBottom: '0.2em',
              lineHeight: '1.5em'
            },
            h3: {
              fontSize: '1.2em',
              marginTop: '0.5em',
              marginBottom: '0.1em',
              lineHeight: '1.4em'
            },
            h4: {
              fontSize: '1.1em',
              marginTop: '0.4em',
              marginBottom: '0.1em',
              lineHeight: '1.2em'
            }
          }
        },
        zinc: {
          css: {
            '--tw-prose-body': colors.zinc[900],
            '--tw-prose-links': colors.purple[500]
          }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    containerQueries,
    typography,
    heroui({
      themes: {
        light: {
          colors: {
            background: commonColors.white,
            foreground: { ...colors.zinc, DEFAULT: colors.zinc[900] },
            primary: { ...colors.purple, DEFAULT: colors.purple[500] },
            danger: { ...commonColors.red, DEFAULT: commonColors.red[500] },
            success: {
              ...commonColors.green,
              DEFAULT: commonColors.green[500],
              foreground: commonColors.white
            },
            default: colors.zinc
          }
        }
      }
    })
  ]
}
