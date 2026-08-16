import { ThemeToggle } from '../Theme/ThemeToggle'
import { FileUploadButton } from '../Upload/FileUploadButton'
import { Settings } from 'lucide-react'
import type { Theme } from '../../types'

interface HeaderProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSettingsClick: () => void
}

export function Header({ theme, onThemeChange, onFileSelect, onSettingsClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 h-14 bg-[var(--color-bg-secondary)]/85 backdrop-blur-lg border-b border-[var(--color-border)] sticky top-0 z-30">
      <div className="flex items-center gap-2.5">
        <span className="text-xl leading-none" role="img" aria-label="Markdown logo">
          📝
        </span>
        <span
          className="font-semibold text-sm tracking-tight text-[var(--color-text-primary)] hidden sm:inline"
          style={{ fontFamily: 'var(--font-heading, var(--font-body, Inter, system-ui, sans-serif))' }}
        >
          Markdown Viewer
        </span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <FileUploadButton onFileSelect={onFileSelect} />
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors"
          aria-label="Open settings"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  )
}
