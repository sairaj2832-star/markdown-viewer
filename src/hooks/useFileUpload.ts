import { useCallback, useState } from 'react'
import { readMarkdownFiles } from '../lib/fileUtils'
import { useDocuments } from './useDocuments'

export function useFileUpload() {
  const { addDocuments } = useDocuments()
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setErrors([])
    const results = await readMarkdownFiles(files)
    const successful = results.filter(r => !r.error && r.content)
    const failed = results.filter(r => r.error)

    if (failed.length > 0) {
      setErrors(failed.map(r => r.error!))
    }

    if (successful.length > 0) {
      addDocuments(successful.map(r => ({ file: r.file, content: r.content })))
    }
  }, [addDocuments])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragging(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }, [processFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
      e.target.value = ''
    }
  }, [processFiles])

  return {
    isDragging,
    errors,
    processFiles,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
  }
}
