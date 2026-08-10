const ACCEPTED_EXTENSIONS = ['.md', '.markdown', '.mdown', '.mkd']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function isMarkdownFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some(ext => name.endsWith(ext)) ||
    file.type === 'text/markdown' ||
    file.type === 'text/x-markdown'
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!isMarkdownFile(file)) {
    return { valid: false, error: `Unsupported file type: ${file.name}` }
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File too large: ${file.name} (max 10MB)` }
  }
  return { valid: true }
}

export async function readMarkdownFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error(`Failed to read ${file.name}`))
    reader.readAsText(file)
  })
}

export async function readMarkdownFiles(
  files: FileList | File[]
): Promise<{ file: File; content: string; error?: string }[]> {
  const results = await Promise.all(
    Array.from(files).map(async (file) => {
      const validation = validateFile(file)
      if (!validation.valid) {
        return { file, content: '', error: validation.error }
      }
      try {
        const content = await readMarkdownFile(file)
        return { file, content }
      } catch {
        return { file, content: '', error: `Failed to read ${file.name}` }
      }
    })
  )
  return results
}
