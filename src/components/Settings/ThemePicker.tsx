import { motion } from 'framer-motion'
import { Check, Monitor } from 'lucide-react'
import type { Theme } from '../../types'

interface ThemePickerProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

interface ThemeOption {
  id: Theme
  name: string
  description: string
  bgColor: string
  textColor: string
  accentColor: string
  fontPreview: string
  isDark: boolean
}

const themeGroups: { name: string; themes: ThemeOption[] }[] = [
  {
    name: 'Standard',
    themes: [
      {
        id: 'system',
        name: 'System',
        description: 'Follow your OS',
        bgColor: '#6b7280',
        textColor: '#ffffff',
        accentColor: '#9ca3af',
        fontPreview: 'Aa',
        isDark: false,
      },
      {
        id: 'light',
        name: 'Light',
        description: 'Clean & modern',
        bgColor: '#ffffff',
        textColor: '#111827',
        accentColor: '#2563eb',
        fontPreview: 'Aa',
        isDark: false,
      },
      {
        id: 'dark',
        name: 'Dark',
        description: 'Sleek developer',
        bgColor: '#0f172a',
        textColor: '#f1f5f9',
        accentColor: '#3b82f6',
        fontPreview: 'Aa',
        isDark: true,
      },
    ],
  },
  {
    name: 'Warm & Natural',
    themes: [
      {
        id: 'sepia',
        name: 'Sepia',
        description: 'Old book warmth',
        bgColor: '#f4ecd8',
        textColor: '#433422',
        accentColor: '#d97736',
        fontPreview: 'Aa',
        isDark: false,
      },
      {
        id: 'matcha',
        name: 'Matcha',
        description: 'Zen garden calm',
        bgColor: '#f4f6f0',
        textColor: '#2d382d',
        accentColor: '#658252',
        fontPreview: 'Aa',
        isDark: false,
      },
      {
        id: 'mocha',
        name: 'Mocha',
        description: 'Coffee house',
        bgColor: '#1e1b19',
        textColor: '#f2e9e4',
        accentColor: '#d4a373',
        fontPreview: 'Aa',
        isDark: true,
      },
    ],
  },
  {
    name: 'Developer',
    themes: [
      {
        id: 'midnight',
        name: 'Midnight',
        description: 'GitHub coding',
        bgColor: '#0d1117',
        textColor: '#e6edf3',
        accentColor: '#58a6ff',
        fontPreview: 'Aa',
        isDark: true,
      },
      {
        id: 'nord',
        name: 'Nord',
        description: 'Scandinavian calm',
        bgColor: '#2e3440',
        textColor: '#eceff4',
        accentColor: '#88c0d0',
        fontPreview: 'Aa',
        isDark: true,
      },
      {
        id: 'solarized',
        name: 'Solarized',
        description: 'Warm academia',
        bgColor: '#002b36',
        textColor: '#fdf6e3',
        accentColor: '#268bd2',
        fontPreview: 'Aa',
        isDark: true,
      },
      {
        id: 'rose-pine',
        name: 'Rosé Pine',
        description: 'Dreamy pastel',
        bgColor: '#191724',
        textColor: '#e0def4',
        accentColor: '#c4a7e7',
        fontPreview: 'Aa',
        isDark: true,
      },
    ],
  },
  {
    name: 'Accessibility',
    themes: [
      {
        id: 'e-ink',
        name: 'E-Ink',
        description: 'Pure readability',
        bgColor: '#ffffff',
        textColor: '#000000',
        accentColor: '#000000',
        fontPreview: 'Aa',
        isDark: false,
      },
      {
        id: 'high-contrast',
        name: 'High Contrast',
        description: 'Maximum clarity',
        bgColor: '#000000',
        textColor: '#ffffff',
        accentColor: '#ffff00',
        fontPreview: 'Aa',
        isDark: true,
      },
    ],
  },
]

export function ThemePicker({ currentTheme, onThemeChange }: ThemePickerProps) {
  return (
    <div className="space-y-5">
      {themeGroups.map((group) => (
        <div key={group.name}>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-2.5 pl-0.5">
            {group.name}
          </h4>
          <div className="space-y-1.5">
            {group.themes.map((theme) => {
              const isActive = currentTheme === theme.id
              return (
                <motion.button
                  key={theme.id}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onThemeChange(theme.id)}
                  className={`
                    w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'ring-2 ring-[var(--color-accent)] bg-[var(--color-surface)]'
                      : 'hover:bg-[var(--color-surface)] ring-1 ring-transparent'
                    }
                  `}
                >
                  {/* Theme preview swatch */}
                  <div
                    className="relative w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundColor: theme.bgColor,
                      border: `1px solid ${theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    }}
                  >
                    {theme.id === 'system' ? (
                      <Monitor className="w-4 h-4" style={{ color: theme.textColor }} />
                    ) : (
                      <>
                        {/* Mini text lines preview */}
                        <div className="flex flex-col gap-[3px] items-start px-2 w-full">
                          <div
                            className="h-[3px] w-full rounded-full"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          <div
                            className="h-[2px] w-[85%] rounded-full opacity-60"
                            style={{ backgroundColor: theme.textColor }}
                          />
                          <div
                            className="h-[2px] w-[70%] rounded-full opacity-40"
                            style={{ backgroundColor: theme.textColor }}
                          />
                          <div
                            className="h-[2px] w-[50%] rounded-full opacity-30"
                            style={{ backgroundColor: theme.textColor }}
                          />
                        </div>
                      </>
                    )}
                    {/* Active checkmark */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                      >
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* Theme info */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                      {theme.name}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] truncate">
                      {theme.description}
                    </div>
                  </div>

                  {/* Accent dot */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
