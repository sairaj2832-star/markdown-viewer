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
        accept=".md,.markdown,.mdown,.mkd,text/markdown,text/x-markdown"
        multiple
        onChange={onFileSelect}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-colors font-medium"
      >
        <Upload className="w-4 h-4" />
        Choose Files
      </button>
    </>
  )
}
