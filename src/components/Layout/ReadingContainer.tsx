import { useRef, useState, useEffect, useLayoutEffect } from 'react'

interface ReadingContainerProps {
  children: React.ReactNode
  documentId?: string | null
}

export function ReadingContainer({ children, documentId }: ReadingContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const scrollPositions = useRef(new Map<string, number>())
  const activeIdRef = useRef<string | null>(documentId ?? null)

  useEffect(() => {
    activeIdRef.current = documentId ?? null
  }, [documentId])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const id = documentId ?? null
    const saved = id ? (scrollPositions.current.get(id) ?? 0) : 0
    const max = Math.max(0, container.scrollHeight - container.clientHeight)

    container.scrollTop = Math.min(saved, max)
    setScrollProgress(max > 0 ? container.scrollTop / max : 0)
  }, [documentId])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container

      const id = activeIdRef.current
      if (id) scrollPositions.current.set(id, scrollTop)

      const progress = scrollHeight > clientHeight
        ? scrollTop / (scrollHeight - clientHeight)
        : 0
      setScrollProgress(Math.min(progress, 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Reading progress bar */}
      <div className="h-[2px] bg-transparent relative z-20">
        <div
          key={documentId ?? 'empty'}
          className="h-full bg-[var(--color-accent)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <main
        ref={containerRef}
        id="main-content"
        className="flex-1 overflow-y-auto bg-[var(--color-bg)] transition-colors duration-300 ease-in-out reading-scroll"
      >
        {children}
      </main>
    </>
  )
}
