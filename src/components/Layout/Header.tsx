import { ThemeToggle } from '../Theme/ThemeToggle'
import { FileUploadButton } from '../Upload/FileUploadButton'
import { MotionButton } from '../ui/MotionButton'
import { FileText, Settings } from 'lucide-react'
import type { Theme } from '../../types'

interface HeaderProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSettingsClick: () => void
}

export function Header({ theme, onThemeChange, onFileSelect, onSettingsClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md border-b border-[var(--color-border)] sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--color-surface)] rounded-xl">
          <FileText className="w-5 h-5 text-[var(--color-accent)]" />
        </div>
        <span className="font-semibold text-sm tracking-wide text-[var(--color-text-primary)] hidden sm:inline">
          Markdown Viewer
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <FileUploadButton onFileSelect={onFileSelect} />
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        <MotionButton variant="ghost" onClick={onSettingsClick} className="p-2 rounded-xl hover:bg-[var(--color-surface)]">
          <Settings className="w-5 h-5" />
        </MotionButton>
      </div>
    </header>
  )
}
