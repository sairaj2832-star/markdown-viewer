import { Sun, Moon, Monitor } from 'lucide-react'
import type { Theme } from '../../types'

interface ThemeToggleProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const cycleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    onThemeChange(next)
  }

  const icon = theme === 'light' ? (
    <Sun className="w-5 h-5" />
  ) : theme === 'dark' ? (
    <Moon className="w-5 h-5" />
  ) : (
    <Monitor className="w-5 h-5" />
  )

  const label = `Current theme: ${theme}. Click to change to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'}.`

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
      aria-label={label}
    >
      {icon}
    </button>
  )
}
