import { FileText, AlertCircle } from 'lucide-react'
import { FileUploadButton } from './FileUploadButton'

interface EmptyStateProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: string[]
}

export function EmptyState({ onFileSelect, errors }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-4">
      <div className="mb-6 p-4 rounded-full bg-[var(--color-surface)]">
        <FileText className="w-12 h-12 text-[var(--color-text-muted)]" />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
        Markdown Viewer
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-6 max-w-md">
        Your documents, beautifully rendered. Drop Markdown files here or click to browse.
      </p>
      <FileUploadButton onFileSelect={onFileSelect} />
      {errors && errors.length > 0 && (
        <div className="mt-6 p-3 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 max-w-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[var(--color-error)] mt-0.5 flex-shrink-0" />
            <div className="text-sm text-[var(--color-error)]">
              {errors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
