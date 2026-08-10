import { FileText } from 'lucide-react'
import { FileUploadButton } from './FileUploadButton'

interface EmptyStateProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function EmptyState({ onFileSelect }: EmptyStateProps) {
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
    </div>
  )
}
