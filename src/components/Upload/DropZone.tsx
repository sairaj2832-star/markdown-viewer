import { motion, AnimatePresence } from 'framer-motion'
import { FileUploadButton } from './FileUploadButton'

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
  onFileSelect,
  children,
}: DropZoneProps) {
  return (
    <motion.div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      animate={{
        backgroundColor: isDragging ? 'var(--color-accent)' : 'var(--color-bg)',
      }}
      transition={{ duration: 0.2 }}
      className="min-h-screen relative"
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--color-accent)]/10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="text-center"
            >
              <FileUploadButton onFileSelect={onFileSelect} />
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Drop files here
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  )
}
