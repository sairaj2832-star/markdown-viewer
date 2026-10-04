import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react'
import { loadMermaid, resolveMermaidTheme, getChartFontFamily } from './mermaidLoader'
import { sanitizeSvg } from '../../lib/sanitize'
import { usePanZoom } from './usePanZoom'
import { DiagramToolbar } from './DiagramToolbar'
import { MermaidLightbox } from './MermaidLightbox'

interface MermaidDiagramProps {
  code: string
  resolvedTheme: 'light' | 'dark'
}

type Status = 'loading' | 'ready' | 'error'

interface Dimensions {
  width: number
  height: number
}

// With useMaxWidth the root svg carries width="100%" and no height, so the numeric
// size only exists in viewBox (set by every diagram family) and in an inline max-width.
function readDimensions(svg: string): Dimensions {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)
  const parts = viewBox ? viewBox[1].trim().split(/\s+/) : null
  return {
    width: parts ? parseFloat(parts[2]) : 0,
    height: parts ? parseFloat(parts[3]) : 0,
  }
}

export function MermaidDiagram({ code, resolvedTheme }: MermaidDiagramProps) {
  const renderId = `mermaid-${useId().replace(/:/g, '')}`

  const [status, setStatus] = useState<Status>('loading')
  const [svg, setSvg] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSource, setShowSource] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  const tokenRef = useRef(0)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const panZoom = usePanZoom({ naturalWidth: dimensions.width })
  const { viewportRef, scale, x, y, isFit, canPan } = panZoom

  useEffect(() => {
    const token = ++tokenRef.current
    let cancelled = false

    const run = async () => {
      setStatus('loading')

      try {
        // mermaid v12 ships only a default export; initialize/render live on the default object.
        const { default: mermaid } = await loadMermaid()
        if (cancelled || token !== tokenRef.current) return

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          logLevel: 1,
          htmlLabels: false,
          // Read as getConfig().journey/.timeline.textPlacement, not root-level; both default to "fo".
          journey: { textPlacement: 'byTspan' },
          timeline: { textPlacement: 'byTspan' },
          theme: resolveMermaidTheme(resolvedTheme),
          themeVariables: { background: 'transparent' },
          fontFamily: (cardRef.current && getChartFontFamily(cardRef.current)) || undefined,
        })

        const { svg: rendered } = await mermaid.render(renderId, code)
        if (cancelled || token !== tokenRef.current) return

        setDimensions(readDimensions(rendered))
        setSvg(sanitizeSvg(rendered))
        setStatus('ready')
      } catch (error) {
        if (cancelled || token !== tokenRef.current) return

        document.getElementById(`d${renderId}`)?.remove()

        const raw = error instanceof Error ? error.message : String(error)
        setErrorMessage(raw.split('\n').slice(0, 4).join('\n'))
        setStatus('error')
      }
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [code, resolvedTheme, renderId])

  const handleCopySource = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Consumers await this and immediately confirm success, so neither path may reject.
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      try {
        textarea.select()
        document.execCommand('copy')
      } catch {
        // No clipboard and no execCommand: the confirmation is the best we can offer.
      } finally {
        textarea.remove()
      }
    }
  }, [code])

  const handleDownload = useCallback(() => {
    if (!svg) return
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${renderId}.svg`
    anchor.click()
    URL.revokeObjectURL(url)
  }, [svg, renderId])

  const zoomPercent = Math.round(scale * 100)

  return (
    <div ref={cardRef} className="mermaid-card group">
      <div className="mermaid-header">
        <span className="mermaid-header-label">mermaid</span>
      </div>

      <div
        ref={viewportRef}
        tabIndex={0}
        role="img"
        aria-label={`Diagram, zoom ${zoomPercent} percent. Use arrow keys to pan, plus and minus to zoom, zero to reset.`}
        className="mermaid-viewport"
        data-can-pan={canPan ? 'true' : 'false'}
        data-dragging={panZoom.isDragging ? 'true' : 'false'}
      >
        {status === 'loading' && <div className="mermaid-loading">Rendering diagram...</div>}

        {status === 'error' && (
          <div className="mermaid-error">
            <div className="mermaid-error-head">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Diagram could not be rendered</span>
            </div>

            <pre className="mermaid-error-message">{errorMessage}</pre>

            <div className="mermaid-error-actions">
              <button className="mermaid-error-button" onClick={() => setShowSource((v) => !v)}>
                {showSource ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
                {showSource ? 'Hide source' : 'Show source'}
              </button>

              <button className="mermaid-error-button" onClick={handleCopySource}>
                Copy source
              </button>
            </div>

            {showSource && <pre className="mermaid-source">{code}</pre>}
          </div>
        )}

        {status === 'ready' && (
          <div
            className="mermaid-canvas"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              transformOrigin: 'center center',
              width: dimensions.width || undefined,
              height: dimensions.height || undefined,
            }}
          >
            <div className="mermaid-svg" dangerouslySetInnerHTML={{ __html: svg }} />
          </div>
        )}
      </div>

      {status !== 'error' && (
        <div className="mermaid-toolbar-dock">
          <DiagramToolbar
            scale={scale}
            isFit={isFit}
            onZoomIn={panZoom.zoomIn}
            onZoomOut={panZoom.zoomOut}
            onReset={panZoom.reset}
            onToggleFit={panZoom.toggleFit}
            onExpand={() => setIsLightboxOpen(true)}
            onCopySource={handleCopySource}
            onDownload={handleDownload}
          />
        </div>
      )}

      {isLightboxOpen && status === 'ready' && (
        <MermaidLightbox
          svg={svg}
          initial={{ scale, x, y }}
          onClose={() => setIsLightboxOpen(false)}
          onCopySource={handleCopySource}
          onDownload={handleDownload}
        />
      )}
    </div>
  )
}