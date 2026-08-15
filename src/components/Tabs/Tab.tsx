import { motion } from 'framer-motion'
import { FileText, FileCode, X } from 'lucide-react'
import type { DocumentFileType } from '../../types'

interface TabProps {
  document: { id: string; name: string; fileType: DocumentFileType }
  isActive: boolean
  onSelect: (id: string) => void
  onClose: (id: string) => void
}

export function Tab({ document, isActive, onSelect, onClose }: TabProps) {
  const Icon = document.fileType === 'text' ? FileCode : FileText

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(document.id)}
      className={`group flex items-center gap-2 px-3 py-1.5 text-[13px] transition-all relative ${
        isActive
          ? 'text-[var(--color-text-primary)] font-medium'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
      }`}
      style={{ borderRadius: 'var(--radius-button, 6px)' }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute inset-0 bg-[var(--color-surface)]"
          style={{ borderRadius: 'var(--radius-button, 6px)' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="max-w-[120px] truncate">{document.name}</span>
        <span
          onClick={(e) => {
            e.stopPropagation()
            onClose(document.id)
          }}
          className="p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-[var(--color-border)] transition-all"
        >
          <X className="w-3 h-3" />
        </span>
      </span>
    </motion.button>
  )
}
