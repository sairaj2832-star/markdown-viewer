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
    <Sun className="w-[18px] h-[18px]" />
  ) : theme === 'dark' ? (
    <Moon className="w-[18px] h-[18px]" />
  ) : (
    <Monitor className="w-[18px] h-[18px]" />
  )

  const label = `Current theme: ${theme}. Click to change.`

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors"
      aria-label={label}
    >
      {icon}
    </button>
  )
}
