import { useRef, useState, useEffect } from 'react'

interface ReadingContainerProps {
  children: React.ReactNode
}

export function ReadingContainer({ children }: ReadingContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
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
