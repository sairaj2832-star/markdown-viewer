import { motion } from 'framer-motion'
import type { Theme } from '../../types'

interface ThemePickerProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

interface ThemeGroup {
  name: string
  themes: { id: Theme; name: string; colors: string[] }[]
}

const themeGroups: ThemeGroup[] = [
  {
    name: 'Standard',
    themes: [
      { id: 'light', name: 'Light', colors: ['#ffffff', '#f3f4f6', '#2563eb'] },
      { id: 'dark', name: 'Dark', colors: ['#0f172a', '#1e293b', '#3b82f6'] },
      { id: 'system', name: 'System', colors: ['#9ca3af', '#6b7280', '#4b5563'] },
    ]
  },
  {
    name: 'Calm & Natural',
    themes: [
      { id: 'sepia', name: 'Sepia', colors: ['#f4ecd8', '#eaddc5', '#d97736'] },
      { id: 'matcha', name: 'Matcha', colors: ['#f4f6f0', '#e9ece1', '#658252'] },
      { id: 'rose-pine', name: 'Rosé Pine', colors: ['#191724', '#1f1d2e', '#c4a7e7'] },
      { id: 'mocha', name: 'Mocha', colors: ['#1e1b19', '#2a2522', '#d4a373'] },
    ]
  },
  {
    name: 'Classic Developer',
    themes: [
      { id: 'midnight', name: 'Midnight', colors: ['#0d1117', '#161b22', '#58a6ff'] },
      { id: 'nord', name: 'Nord', colors: ['#2e3440', '#3b4252', '#88c0d0'] },
      { id: 'solarized', name: 'Solarized', colors: ['#002b36', '#073642', '#268bd2'] },
    ]
  },
  {
    name: 'Minimal & Contrast',
    themes: [
      { id: 'e-ink', name: 'E-Ink', colors: ['#ffffff', '#f0f0f0', '#000000'] },
      { id: 'high-contrast', name: 'High Contrast', colors: ['#000000', '#111111', '#ffff00'] },
    ]
  }
]

export function ThemePicker({ currentTheme, onThemeChange }: ThemePickerProps) {
  return (
    <div className="space-y-6">
      {themeGroups.map(group => (
        <div key={group.name} className="space-y-2">
          <h4 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">{group.name}</h4>
          <div className="grid grid-cols-3 gap-2">
            {group.themes.map(theme => (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onThemeChange(theme.id)}
                className={`flex flex-col items-start p-3 gap-3 rounded-xl border-2 transition-all ${
                  currentTheme === theme.id
                    ? 'border-[var(--color-accent)] bg-[var(--color-surface)] shadow-sm'
                    : 'border-transparent bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div className="flex -space-x-1">
                  {theme.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border-2 border-[var(--color-bg-secondary)]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-[var(--color-text-primary)] w-full text-left truncate">{theme.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
