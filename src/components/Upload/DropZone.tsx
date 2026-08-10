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
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="relative min-h-screen"
    >
      {children}
      {isDragging && (
        <div className="absolute inset-0 bg-[var(--color-accent)]/10 border-2 border-dashed border-[var(--color-accent)] rounded-lg z-50 flex items-center justify-center">
          <div className="text-center">
            <FileUploadButton onFileSelect={onFileSelect} />
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Drop Markdown files here
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
