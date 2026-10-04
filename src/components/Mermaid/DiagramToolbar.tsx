import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Download, Maximize2, MoveHorizontal, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'

interface DiagramToolbarProps {
  scale: number
  isFit: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  onToggleFit: () => void
  onExpand: () => void
  onCopySource: () => void
  onDownload: () => void
}

const BUTTON =
  'flex items-center justify-center w-7 h-7 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors'

export function DiagramToolbar({
  scale,
  isFit,
  onZoomIn,
  onZoomOut,
  onReset,
  onToggleFit,
  onExpand,
  onCopySource,
  onDownload,
}: DiagramToolbarProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleCopy = async () => {
    await onCopySource()
    setCopied(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mermaid-toolbar">
      <button className={BUTTON} onClick={onZoomOut} aria-label="Zoom out" title="Zoom out">
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <span className="mermaid-zoom-label" aria-live="polite">
        {Math.round(scale * 100)}%
      </span>

      <button className={BUTTON} onClick={onZoomIn} aria-label="Zoom in" title="Zoom in">
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      <button className={BUTTON} onClick={onReset} aria-label="Reset view" title="Reset view">
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <button
        className={BUTTON}
        onClick={onToggleFit}
        aria-label={isFit ? 'Disable fit to width' : 'Fit to width'}
        title={isFit ? 'Disable fit to width' : 'Fit to width'}
        aria-pressed={isFit}
      >
        <MoveHorizontal className={`w-3.5 h-3.5 ${isFit ? 'text-[var(--color-accent)]' : ''}`} />
      </button>

      <button className={BUTTON} onClick={handleCopy} aria-label="Copy diagram source" title="Copy source">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>

      <button className={BUTTON} onClick={onDownload} aria-label="Download diagram as SVG" title="Download SVG">
        <Download className="w-3.5 h-3.5" />
      </button>

      <button className={BUTTON} onClick={onExpand} aria-label="Open diagram in full screen" title="Full screen">
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
