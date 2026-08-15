import { useRef } from 'react'
import { Upload } from 'lucide-react'

interface FileUploadButtonProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FileUploadButton({ onFileSelect }: FileUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".md,.markdown,.mdown,.mkd,.txt,.text,.log,text/markdown,text/x-markdown,text/plain"
        multiple
        onChange={onFileSelect}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-all active:scale-[0.97]"
        style={{ borderRadius: 'var(--radius-button, 8px)' }}
      >
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline">Open file</span>
        <span className="sm:hidden">Open</span>
      </button>
    </>
  )
}
