import { motion } from 'framer-motion'
import type { Theme } from '../../types'

interface ThemePickerProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

const themes: { id: Theme; name: string; colors: string[] }[] = [
  { id: 'light', name: 'Light', colors: ['#ffffff', '#f9fafb', '#2563eb'] },
  { id: 'dark', name: 'Dark', colors: ['#0f172a', '#1e293b', '#3b82f6'] },
  { id: 'midnight', name: 'Midnight', colors: ['#0d1117', '#161b22', '#58a6ff'] },
  { id: 'nord', name: 'Nord', colors: ['#2e3440', '#3b4252', '#88c0d0'] },
  { id: 'solarized', name: 'Solarized', colors: ['#002b36', '#073642', '#268bd2'] },
]

export function ThemePicker({ currentTheme, onThemeChange }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {themes.map(theme => (
        <motion.button
          key={theme.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onThemeChange(theme.id)}
          className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-colors ${
            currentTheme === theme.id
              ? 'border-[var(--color-accent)]'
              : 'border-transparent hover:border-[var(--color-border)]'
          }`}
        >
          <div className="flex gap-1">
            {theme.colors.map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="text-xs text-[var(--color-text-secondary)]">{theme.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
