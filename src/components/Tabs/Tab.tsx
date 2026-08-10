import { motion } from 'framer-motion'
import { FileText, X } from 'lucide-react'

interface TabProps {
  document: { id: string; name: string }
  isActive: boolean
  onSelect: (id: string) => void
  onClose: (id: string) => void
}

export function Tab({ document, isActive, onSelect, onClose }: TabProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(document.id)}
      className={`group flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
        isActive
          ? 'bg-[var(--color-accent)] text-white'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
      }`}
    >
      <FileText className="w-4 h-4" />
      <span className="max-w-[120px] truncate">{document.name}</span>
      <motion.span
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        onClick={(e) => {
          e.stopPropagation()
          onClose(document.id)
        }}
        className="ml-1 p-0.5 rounded hover:bg-black/20"
      >
        <X className="w-3 h-3" />
      </motion.span>
    </motion.button>
  )
}
