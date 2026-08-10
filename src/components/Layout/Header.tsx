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
    <header className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-[var(--color-accent)]" />
        <span className="font-semibold text-[var(--color-text-primary)] hidden sm:inline">
          Markdown Viewer
        </span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <FileUploadButton onFileSelect={onFileSelect} />
        <ThemeToggle theme={theme} onThemeChange={onThemeChange} />
        <MotionButton variant="ghost" onClick={onSettingsClick}>
          <Settings className="w-5 h-5" />
        </MotionButton>
      </div>
    </header>
  )
}
