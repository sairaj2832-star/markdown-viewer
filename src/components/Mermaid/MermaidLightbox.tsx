import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Copy, Download, X } from 'lucide-react'
import { DRAG_THRESHOLD, usePanZoom } from './usePanZoom'

interface MermaidLightboxProps {
  svg: string
  initial: { scale: number; x: number; y: number }
  onClose: () => void
  onCopySource: () => void | Promise<void>
  onDownload: () => void
}

const LIGHTBOX_BUTTON =
  'flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors'

export function MermaidLightbox({
  svg,
  initial,
  onClose,
  onCopySource,
  onDownload,
}: MermaidLightboxProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const downAtRef = useRef<{ x: number; y: number } | null>(null)
  const onCloseRef = useRef(onClose)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [copied, setCopied] = useState(false)

  // Zero disables fit measurement: measureFit short-circuits before reading clientWidth.
  const { viewportRef, scale, x, y, isDragging } = usePanZoom({ naturalWidth: 0, initial })

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])

  const handleBackdropPointerDown = (event: React.PointerEvent) => {
    downAtRef.current = { x: event.clientX, y: event.clientY }
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target !== event.currentTarget) return

    const down = downAtRef.current
    downAtRef.current = null
    if (!down) return

    const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y)
    if (moved < DRAG_THRESHOLD) onClose()
  }

  const handleCopy = async () => {
    await onCopySource()
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Full screen diagram"
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'rgb(0 0 0 / 0.7)', backdropFilter: 'blur(4px)' }}
      onPointerDown={handleBackdropPointerDown}
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        <span className="text-xs uppercase tracking-wider text-white/70">mermaid</span>

        <div className="flex items-center gap-1">
          <button
            className={LIGHTBOX_BUTTON}
            style={{ color: copied ? '#4ade80' : 'rgb(255 255 255 / 0.7)' }}
            onClick={handleCopy}
            aria-label="Copy diagram source"
          >
            <Copy className="w-4 h-4" />
          </button>

          <button
            className={LIGHTBOX_BUTTON}
            style={{ color: 'rgb(255 255 255 / 0.7)' }}
            onClick={onDownload}
            aria-label="Download diagram as SVG"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            ref={closeRef}
            className={LIGHTBOX_BUTTON}
            style={{ color: 'rgb(255 255 255 / 0.9)' }}
            onClick={onClose}
            aria-label="Close full screen diagram"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        tabIndex={0}
        role="img"
        aria-label={`Diagram, zoom ${Math.round(scale * 100)} percent. Use arrow keys to pan, plus and minus to zoom, zero to reset, f to fit.`}
        className="flex-1 flex items-center justify-center overflow-hidden outline-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
      >
        <div
          className="mermaid-svg"
          style={{
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            transformOrigin: 'center center',
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <div className="px-4 py-3 text-center shrink-0">
        <span className="text-xs font-mono text-white/60" aria-live="polite">
          {`${Math.round(scale * 100)}% | Esc to close | arrows to pan | +/- to zoom | 0 to reset | f to fit`}
        </span>
      </div>
    </div>,
    document.body,
  )
}