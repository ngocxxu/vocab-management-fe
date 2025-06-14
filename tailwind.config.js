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
          'vc-100': 'var(--success-vc-100)',
          'vc-200': 'var(--success-vc-200)',
          'vc-300': 'var(--success-vc-300)',
          'vc-400': 'var(--success-vc-400)',
          'vc-500': 'var(--success-vc-500)',
          'vc-600': 'var(--success-vc-600)',
          'vc-700': 'var(--success-vc-700)',
          'vc-800': 'var(--success-vc-800)',
          'vc-900': 'var(--success-vc-900)'
        },
        gray: {
          'vc-100': 'var(--gray-vc-100)',
          'vc-200': 'var(--gray-vc-200)',
          'vc-300': 'var(--gray-vc-300)',
          'vc-400': 'var(--gray-vc-400)',
          'vc-500': 'var(--gray-vc-500)',
          'vc-600': 'var(--gray-vc-600)',
          'vc-700': 'var(--gray-vc-700)',
          'vc-800': 'var(--gray-vc-800)',
          'vc-900': 'var(--gray-vc-900)'
        },
        neutral: {
          'vc-100': 'var(--neutral-vc-100)',
          'vc-200': 'var(--neutral-vc-200)',
          'vc-300': 'var(--neutral-vc-300)',
          'vc-400': 'var(--neutral-vc-400)',
          'vc-500': 'var(--neutral-vc-500)',
          'vc-600': 'var(--neutral-vc-600)',
          'vc-700': 'var(--neutral-vc-700)',
          'vc-800': 'var(--neutral-vc-800)',
          'vc-900': 'var(--neutral-vc-900)'
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          'vc-100': 'var(--warning-vc-100)',
          'vc-200': 'var(--warning-vc-200)',
          'vc-300': 'var(--warning-vc-300)',
          'vc-400': 'var(--warning-vc-400)',
          'vc-500': 'var(--warning-vc-500)',
          'vc-600': 'var(--warning-vc-600)',
          'vc-700': 'var(--warning-vc-700)',
          'vc-800': 'var(--warning-vc-800)',
          'vc-900': 'var(--warning-vc-900)'
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          'vc-100': 'var(--error-vc-100)',
          'vc-200': 'var(--error-vc-200)',
          'vc-300': 'var(--error-vc-300)',
          'vc-400': 'var(--error-vc-400)',
          'vc-500': 'var(--error-vc-500)',
          'vc-600': 'var(--error-vc-600)',
          'vc-700': 'var(--error-vc-700)',
          'vc-800': 'var(--error-vc-800)',
          'vc-900': 'var(--error-vc-900)'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          'vc-100': 'var(--primary-vc-100)',
          'vc-200': 'var(--primary-vc-200)',
          'vc-300': 'var(--primary-vc-300)',
          'vc-400': 'var(--primary-vc-400)',
          'vc-500': 'var(--primary-vc-500)',
          'vc-600': 'var(--primary-vc-600)',
          'vc-700': 'var(--primary-vc-700)',
          'vc-800': 'var(--primary-vc-800)',
          'vc-900': 'var(--primary-vc-900)'
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
