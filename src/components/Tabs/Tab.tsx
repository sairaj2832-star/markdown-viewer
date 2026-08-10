import { X } from 'lucide-react'

interface TabProps {
  name: string
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

export function Tab({ name, isActive, onSelect, onClose }: TabProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
    if (e.key === 'Delete') {
      onClose()
    }
  }

  return (
    <button
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`
        group flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t-lg
        border-b-2 transition-colors min-w-0 max-w-[200px]
        ${isActive
          ? 'bg-[var(--color-bg)] border-[var(--color-accent)] text-[var(--color-text-primary)]'
          : 'bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
        }
      `}
      aria-selected={isActive}
      role="tab"
      tabIndex={isActive ? 0 : -1}
    >
      <span className="truncate">{name}</span>
      <span
        onClick={handleClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClose()
          }
        }}
        className={`
          ml-1 p-0.5 rounded hover:bg-[var(--color-surface)] transition-colors
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}
        aria-label={`Close ${name}`}
        role="button"
        tabIndex={isActive ? 0 : -1}
      >
        <X className="w-3.5 h-3.5" />
      </span>
    </button>
  )
}
