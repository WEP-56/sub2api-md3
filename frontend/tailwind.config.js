/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ============================================================
         * MD3 桥接层：原站色板全部改写为 --m3- 令牌引用。
         * 函数式颜色支持 /opacity 透明度修饰符（color-mix 包装）。
         * 原站页面使用 primary-50..900 阶，M3 无阶数概念，
         * 按「容器色/主色/表面混色」近似映射，实现不改模板换肤。
         * ============================================================ */
        primary: {
          50: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-primary) 8%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-primary) 8%, var(--m3-surface), transparent ${1 - opacityValue})`,
          100: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-primary-container)' : `color-mix(in srgb, var(--m3-primary-container) ${opacityValue}, transparent)`,
          200: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-primary) 30%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-primary) 30%, var(--m3-surface), transparent ${1 - opacityValue})`,
          300: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-primary) 55%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-primary) 55%, var(--m3-surface), transparent ${1 - opacityValue})`,
          400: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-primary) 78%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-primary) 78%, var(--m3-surface), transparent ${1 - opacityValue})`,
          500: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-primary)' : `color-mix(in srgb, var(--m3-primary) ${opacityValue}, transparent)`,
          600: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-primary)' : `color-mix(in srgb, var(--m3-primary) ${opacityValue}, transparent)`,
          700: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-primary-container)' : `color-mix(in srgb, var(--m3-on-primary-container) ${opacityValue}, transparent)`,
          800: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-primary-container)' : `color-mix(in srgb, var(--m3-on-primary-container) ${opacityValue}, transparent)`,
          900: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-primary-container)' : `color-mix(in srgb, var(--m3-on-primary-container) ${opacityValue}, transparent)`,
          950: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-primary-container)' : `color-mix(in srgb, var(--m3-on-primary-container) ${opacityValue}, transparent)`
        },
        /* gray-* → M3 中性表面阶（原站大量用于文本/边框/底色）
         * 全阶使用 color-mix 包装以支持 /opacity 透明度修饰符 */
        gray: {
          50: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface-container-low)' : `color-mix(in srgb, var(--m3-surface-container-low) ${opacityValue}, transparent)`,
          100: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface-container)' : `color-mix(in srgb, var(--m3-surface-container) ${opacityValue}, transparent)`,
          200: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-outline-variant)' : `color-mix(in srgb, var(--m3-outline-variant) ${opacityValue}, transparent)`,
          300: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-outline)' : `color-mix(in srgb, var(--m3-outline) ${opacityValue}, transparent)`,
          400: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface-variant)' : `color-mix(in srgb, var(--m3-on-surface-variant) ${opacityValue}, transparent)`,
          500: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface-variant)' : `color-mix(in srgb, var(--m3-on-surface-variant) ${opacityValue}, transparent)`,
          600: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface-variant)' : `color-mix(in srgb, var(--m3-on-surface-variant) ${opacityValue}, transparent)`,
          700: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface)' : `color-mix(in srgb, var(--m3-on-surface) ${opacityValue}, transparent)`,
          800: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface)' : `color-mix(in srgb, var(--m3-on-surface) ${opacityValue}, transparent)`,
          900: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface)' : `color-mix(in srgb, var(--m3-on-surface) ${opacityValue}, transparent)`,
          950: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface)' : `color-mix(in srgb, var(--m3-on-surface) ${opacityValue}, transparent)`
        },
        /* dark-*（暗色专属类）→ M3 暗色令牌 */
        dark: {
          50: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface)' : `color-mix(in srgb, var(--m3-on-surface) ${opacityValue}, transparent)`,
          100: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface-container-high)' : `color-mix(in srgb, var(--m3-surface-container-high) ${opacityValue}, transparent)`,
          200: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface-container-high)' : `color-mix(in srgb, var(--m3-surface-container-high) ${opacityValue}, transparent)`,
          300: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface-variant)' : `color-mix(in srgb, var(--m3-on-surface-variant) ${opacityValue}, transparent)`,
          400: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface-variant)' : `color-mix(in srgb, var(--m3-on-surface-variant) ${opacityValue}, transparent)`,
          500: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-surface-variant)' : `color-mix(in srgb, var(--m3-on-surface-variant) ${opacityValue}, transparent)`,
          600: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-outline)' : `color-mix(in srgb, var(--m3-outline) ${opacityValue}, transparent)`,
          700: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-outline-variant)' : `color-mix(in srgb, var(--m3-outline-variant) ${opacityValue}, transparent)`,
          800: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface-container)' : `color-mix(in srgb, var(--m3-surface-container) ${opacityValue}, transparent)`,
          900: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface-container-low)' : `color-mix(in srgb, var(--m3-surface-container-low) ${opacityValue}, transparent)`,
          950: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-surface)' : `color-mix(in srgb, var(--m3-surface) ${opacityValue}, transparent)`
        },
        /* accent-* → M3 tertiary */
        accent: {
          50: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-tertiary) 8%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-tertiary) 8%, var(--m3-surface), transparent ${1 - opacityValue})`,
          100: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-tertiary-container)' : `color-mix(in srgb, var(--m3-tertiary-container) ${opacityValue}, transparent)`,
          200: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-tertiary) 30%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-tertiary) 30%, var(--m3-surface), transparent ${1 - opacityValue})`,
          300: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-tertiary) 55%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-tertiary) 55%, var(--m3-surface), transparent ${1 - opacityValue})`,
          400: ({ opacityValue }) => opacityValue === undefined ? 'color-mix(in srgb, var(--m3-tertiary) 78%, var(--m3-surface))' : `color-mix(in srgb, var(--m3-tertiary) 78%, var(--m3-surface), transparent ${1 - opacityValue})`,
          500: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-tertiary)' : `color-mix(in srgb, var(--m3-tertiary) ${opacityValue}, transparent)`,
          600: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-tertiary)' : `color-mix(in srgb, var(--m3-tertiary) ${opacityValue}, transparent)`,
          700: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-tertiary-container)' : `color-mix(in srgb, var(--m3-on-tertiary-container) ${opacityValue}, transparent)`,
          800: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-tertiary-container)' : `color-mix(in srgb, var(--m3-on-tertiary-container) ${opacityValue}, transparent)`,
          900: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-tertiary-container)' : `color-mix(in srgb, var(--m3-on-tertiary-container) ${opacityValue}, transparent)`,
          950: ({ opacityValue }) => opacityValue === undefined ? 'var(--m3-on-tertiary-container)' : `color-mix(in srgb, var(--m3-on-tertiary-container) ${opacityValue}, transparent)`
        },
        /* M3 原生语义类（md3: 前缀场景下可直接用 m3-primary 等） */
        m3: {
          primary: 'var(--m3-primary)',
          'on-primary': 'var(--m3-on-primary)',
          'primary-container': 'var(--m3-primary-container)',
          'on-primary-container': 'var(--m3-on-primary-container)',
          secondary: 'var(--m3-secondary)',
          'on-secondary': 'var(--m3-on-secondary)',
          'secondary-container': 'var(--m3-secondary-container)',
          'on-secondary-container': 'var(--m3-on-secondary-container)',
          tertiary: 'var(--m3-tertiary)',
          'on-tertiary': 'var(--m3-on-tertiary)',
          'tertiary-container': 'var(--m3-tertiary-container)',
          'on-tertiary-container': 'var(--m3-on-tertiary-container)',
          error: 'var(--m3-error)',
          'on-error': 'var(--m3-on-error)',
          'error-container': 'var(--m3-error-container)',
          'on-error-container': 'var(--m3-on-error-container)',
          success: 'var(--m3-success)',
          'on-success': 'var(--m3-on-success)',
          'success-container': 'var(--m3-success-container)',
          'on-success-container': 'var(--m3-on-success-container)',
          warning: 'var(--m3-warning)',
          'on-warning': 'var(--m3-on-warning)',
          'warning-container': 'var(--m3-warning-container)',
          'on-warning-container': 'var(--m3-on-warning-container)',
          surface: 'var(--m3-surface)',
          'on-surface': 'var(--m3-on-surface)',
          'surface-variant': 'var(--m3-surface-variant)',
          'on-surface-variant': 'var(--m3-on-surface-variant)',
          'surface-dim': 'var(--m3-surface-dim)',
          'surface-bright': 'var(--m3-surface-bright)',
          'surface-container-lowest': 'var(--m3-surface-container-lowest)',
          'surface-container-low': 'var(--m3-surface-container-low)',
          'surface-container': 'var(--m3-surface-container)',
          'surface-container-high': 'var(--m3-surface-container-high)',
          'surface-container-highest': 'var(--m3-surface-container-highest)',
          'inverse-surface': 'var(--m3-inverse-surface)',
          'inverse-on-surface': 'var(--m3-inverse-on-surface)',
          outline: 'var(--m3-outline)',
          'outline-variant': 'var(--m3-outline-variant)'
        }
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif'
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-sm': '0 4px 16px rgba(0, 0, 0, 0.06)',
        glow: '0 0 20px rgba(20, 184, 166, 0.25)',
        'glow-lg': '0 0 40px rgba(20, 184, 166, 0.35)',
        card: '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, rgba(20, 184, 166, 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6, 182, 212, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(20, 184, 166, 0.08) 0px, transparent 50%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.25)' },
          '100%': { boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
