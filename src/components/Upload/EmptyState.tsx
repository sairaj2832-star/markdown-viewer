import { motion } from 'framer-motion'
import { BookOpen, FileText, ArrowDown } from 'lucide-react'
import { FileUploadButton } from './FileUploadButton'

interface EmptyStateProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

export function EmptyState({ onFileSelect, errors }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[70vh] text-center px-6">
      {/* Animated icon */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center">
            <BookOpen className="w-9 h-9 text-[var(--color-accent)]" />
          </div>
          {/* Floating document icon */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-2 -right-3 w-8 h-8 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center shadow-sm"
          >
            <FileText className="w-4 h-4 text-[var(--color-text-muted)]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl font-bold mb-3 text-[var(--color-text-primary)] tracking-tight"
        style={{ fontFamily: 'var(--font-heading, var(--font-body, Inter, system-ui, sans-serif))' }}
      >
        Start reading
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[var(--color-text-muted)] mb-8 max-w-sm leading-relaxed text-[15px]"
      >
        Drop your Markdown or text files here for a calm, distraction-free reading experience.
      </motion.p>

      {/* Upload button */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FileUploadButton onFileSelect={onFileSelect} />
      </motion.div>

      {/* Drop hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8 flex items-center gap-2 text-xs text-[var(--color-text-muted)]"
      >
        <ArrowDown className="w-3 h-3" />
        <span>or drag and drop files anywhere</span>
      </motion.div>

      {/* Errors */}
      {errors && errors.length > 0 && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-6 p-4 rounded-xl bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 max-w-sm text-left"
        >
          <div className="text-sm text-[var(--color-error)] space-y-1">
            {errors.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
