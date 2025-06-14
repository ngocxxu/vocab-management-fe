/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        success: {
          DEFAULT: 'hsl(var(--success))',
          'vc-100': 'var(--vc-success-100)',
          'vc-200': 'var(--vc-success-200)',
          'vc-300': 'var(--vc-success-300)',
          'vc-400': 'var(--vc-success-400)',
          'vc-500': 'var(--vc-success-500)',
          'vc-600': 'var(--vc-success-600)',
          'vc-700': 'var(--vc-success-700)',
          'vc-800': 'var(--vc-success-800)',
          'vc-900': 'var(--vc-success-900)'
        },
        gray: {
          'vc-100': 'var(--vc-gray-100)',
          'vc-200': 'var(--vc-gray-200)',
          'vc-300': 'var(--vc-gray-300)',
          'vc-400': 'var(--vc-gray-400)',
          'vc-500': 'var(--vc-gray-500)',
          'vc-600': 'var(--vc-gray-600)',
          'vc-700': 'var(--vc-gray-700)',
          'vc-800': 'var(--vc-gray-800)',
          'vc-900': 'var(--vc-gray-900)'
        },
        neutral: {
          'vc-100': 'var(--vc-neutral-100)',
          'vc-200': 'var(--vc-neutral-200)',
          'vc-300': 'var(--vc-neutral-300)',
          'vc-400': 'var(--vc-neutral-400)',
          'vc-500': 'var(--vc-neutral-500)',
          'vc-600': 'var(--vc-neutral-600)',
          'vc-700': 'var(--vc-neutral-700)',
          'vc-800': 'var(--vc-neutral-800)',
          'vc-900': 'var(--vc-neutral-900)'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          'vc-100': 'var(--vc-warning-100)',
          'vc-200': 'var(--vc-warning-200)',
          'vc-300': 'var(--vc-warning-300)',
          'vc-400': 'var(--vc-warning-400)',
          'vc-500': 'var(--vc-warning-500)',
          'vc-600': 'var(--vc-warning-600)',
          'vc-700': 'var(--vc-warning-700)',
          'vc-800': 'var(--vc-warning-800)',
          'vc-900': 'var(--vc-warning-900)'
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          'vc-100': 'var(--vc-error-100)',
          'vc-200': 'var(--vc-error-200)',
          'vc-300': 'var(--vc-error-300)',
          'vc-400': 'var(--vc-error-400)',
          'vc-500': 'var(--vc-error-500)',
          'vc-600': 'var(--vc-error-600)',
          'vc-700': 'var(--vc-error-700)',
          'vc-800': 'var(--vc-error-800)',
          'vc-900': 'var(--vc-error-900)'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          'vc-100': 'var(--vc-primary-100)',
          'vc-200': 'var(--vc-primary-200)',
          'vc-300': 'var(--vc-primary-300)',
          'vc-400': 'var(--vc-primary-400)',
          'vc-500': 'var(--vc-primary-500)',
          'vc-600': 'var(--vc-primary-600)',
          'vc-700': 'var(--vc-primary-700)',
          'vc-800': 'var(--vc-primary-800)',
          'vc-900': 'var(--vc-primary-900)'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      width: {
        'vertical-menu': 'var(--vertical-menu-width)',
        'vertical-menu-md': 'var(--vertical-menu-width-md)',
        'vertical-menu-sm': 'var(--vertical-menu-width-sm)'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animate')]
}
