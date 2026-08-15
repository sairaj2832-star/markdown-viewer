import { motion, AnimatePresence } from 'framer-motion'
import { Upload } from 'lucide-react'

interface DropZoneProps {
  isDragging: boolean
  onDragEnter: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}

export function DropZone({
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  children,
}: DropZoneProps) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="flex flex-col flex-1 min-h-0 relative"
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-4 p-10 rounded-2xl border-2 border-dashed border-[var(--color-accent)] bg-[var(--color-surface)]"
            >
              <div className="p-4 rounded-full bg-[var(--color-accent)]/10">
                <Upload className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <div className="text-center">
                <p className="font-medium text-[var(--color-text-primary)]">Drop your files</p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Markdown and text files supported
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  )
}
