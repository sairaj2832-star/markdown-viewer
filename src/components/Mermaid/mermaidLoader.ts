let mermaidPromise: Promise<typeof import('mermaid')> | null = null

export function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid')
  }
  return mermaidPromise
}

export function resolveMermaidTheme(resolvedTheme: 'light' | 'dark'): 'default' | 'dark' {
  return resolvedTheme === 'dark' ? 'dark' : 'default'
}

export function getChartFontFamily(element: Element): string {
  return getComputedStyle(element).getPropertyValue('--font-body').trim()
}