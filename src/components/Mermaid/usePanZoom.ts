import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type React from 'react'

export const MIN_SCALE = 0.2
export const MAX_SCALE = 5
export const ZOOM_STEP = 1.25
export const DRAG_THRESHOLD = 3

export interface PanZoom {
  scale: number
  x: number
  y: number
  fitScale: number
  isFit: boolean
}

export interface UsePanZoomOptions {
  naturalWidth: number
  initial?: { scale: number; x: number; y: number }
}

export interface UsePanZoomResult extends PanZoom {
  viewportRef: React.RefObject<HTMLDivElement | null>
  isDragging: boolean
  canPan: boolean
  setIsFit: (fit: boolean) => void
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
  toggleFit: () => void
}

function clampScale(value: number) {
  if (!Number.isFinite(value)) return 1
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))
}

function finiteOr(value: number | undefined, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

export function usePanZoom({ naturalWidth, initial }: UsePanZoomOptions): UsePanZoomResult {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(() => clampScale(initial?.scale ?? 1))
  const [offset, setOffset] = useState(() => ({
    x: finiteOr(initial?.x, 0),
    y: finiteOr(initial?.y, 0),
  }))
  const [fitScale, setFitScale] = useState(1)
  const [isFit, setIsFitState] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const panZoom = useRef({ x: offset.x, y: offset.y, scale })
  panZoom.current = { x: offset.x, y: offset.y, scale }

  const fitState = useRef({ isFit, fitScale })
  useLayoutEffect(() => {
    fitState.current = { isFit, fitScale }
  }, [isFit, fitScale])

  const measureFit = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport || !naturalWidth) return 1
    const available = viewport.clientWidth - 32
    if (available <= 0) return 1
    return clampScale(Math.min(1, available / naturalWidth))
  }, [naturalWidth])

  useLayoutEffect(() => {
    setFitScale(measureFit())
  }, [measureFit])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const observer = new ResizeObserver(() => setFitScale(measureFit()))
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [measureFit])

  const reset = useCallback(() => {
    setScale(fitState.current.isFit ? fitState.current.fitScale : 1)
    setOffset({ x: 0, y: 0 })
  }, [])

  // Anchor maths assumes the consumer sizes the transformed element to the diagram's natural size, centres it in the viewport, and uses transform-origin center center.
  const zoomAbout = useCallback((factor: number, clientX?: number, clientY?: number) => {
    const viewport = viewportRef.current
    const base = panZoom.current
    const next = clampScale(base.scale * factor)
    if (next === base.scale) return

    if (viewport && clientX !== undefined && clientY !== undefined) {
      const rect = viewport.getBoundingClientRect()
      const px = clientX - rect.left - rect.width / 2
      const py = clientY - rect.top - rect.height / 2
      const ratio = next / base.scale
      setOffset({
        x: px - (px - base.x) * ratio,
        y: py - (py - base.y) * ratio,
      })
    }
    setScale(next)
  }, [])

  const zoomIn = useCallback(() => zoomAbout(ZOOM_STEP), [zoomAbout])

  const zoomOut = useCallback(() => zoomAbout(1 / ZOOM_STEP), [zoomAbout])

  const applyFit = useCallback((fit: boolean) => {
    fitState.current = { isFit: fit, fitScale: fitState.current.fitScale }
    setIsFitState(fit)
    setScale(fit ? fitState.current.fitScale : 1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const toggleFit = useCallback(() => applyFit(!fitState.current.isFit), [applyFit])

  const setIsFit = useCallback((fit: boolean) => applyFit(fit), [applyFit])

  useEffect(() => {
    const viewport = viewportRef.current
    // Contract: the viewport element must render unconditionally on first commit and never remount, or these listeners never attach.
    if (!viewport) return

    const activePointers = new Map<number, { x: number; y: number }>()
    let startX = 0
    let startY = 0
    let originX = 0
    let originY = 0
    let started = false
    let pinchDistance = 0
    let pinchScale = 1

    const distance = () => {
      const points = Array.from(activePointers.values())
      return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
    }

    const onPointerDown = (event: PointerEvent) => {
      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

      if (activePointers.size === 2) {
        pinchDistance = distance()
        pinchScale = panZoom.current.scale
        return
      }

      startX = event.clientX
      startY = event.clientY
      originX = panZoom.current.x
      originY = panZoom.current.y
      started = false
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!activePointers.has(event.pointerId)) return

      activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

      if (activePointers.size === 2) {
        const next = distance()
        if (pinchDistance > 0) {
          const target = clampScale(pinchScale * (next / pinchDistance))
          zoomAbout(target / panZoom.current.scale)
        }
        return
      }

      const deltaX = event.clientX - startX
      const deltaY = event.clientY - startY

      if (!started && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return

      started = true
      setIsDragging(true)
      viewport.setPointerCapture(event.pointerId)
      setOffset({ x: originX + deltaX, y: originY + deltaY })
    }

    const endPointer = (event: PointerEvent) => {
      activePointers.delete(event.pointerId)
      if (activePointers.size < 2) pinchDistance = 0
      if (activePointers.size === 1) {
        const remaining = activePointers.values().next().value
        if (remaining) {
          startX = remaining.x
          startY = remaining.y
          originX = panZoom.current.x
          originY = panZoom.current.y
        }
        started = false
      }
      if (activePointers.size === 0) {
        started = false
        setIsDragging(false)
      }
    }

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      zoomAbout(event.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP, event.clientX, event.clientY)
    }

    const onDoubleClick = () => {
      reset()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const step = event.shiftKey ? 160 : 40
      const current = panZoom.current

      switch (event.key) {
        case 'ArrowLeft':
          setOffset({ x: current.x + step, y: current.y })
          break
        case 'ArrowRight':
          setOffset({ x: current.x - step, y: current.y })
          break
        case 'ArrowUp':
          setOffset({ x: current.x, y: current.y + step })
          break
        case 'ArrowDown':
          setOffset({ x: current.x, y: current.y - step })
          break
        case '+':
        case '=':
          zoomIn()
          break
        case '-':
        case '_':
          zoomOut()
          break
        case '0':
          reset()
          break
        default:
          return
      }
      event.preventDefault()
    }

    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove)
    viewport.addEventListener('pointerup', endPointer)
    viewport.addEventListener('pointercancel', endPointer)
    viewport.addEventListener('wheel', onWheel, { passive: false })
    viewport.addEventListener('dblclick', onDoubleClick)
    viewport.addEventListener('keydown', onKeyDown)

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', endPointer)
      viewport.removeEventListener('pointercancel', endPointer)
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('dblclick', onDoubleClick)
      viewport.removeEventListener('keydown', onKeyDown)
    }
  }, [zoomAbout, zoomIn, zoomOut, reset])

  return {
    scale,
    x: offset.x,
    y: offset.y,
    fitScale,
    isFit,
    isDragging,
    canPan: scale > fitScale,
    viewportRef,
    setIsFit,
    zoomIn,
    zoomOut,
    reset,
    toggleFit,
  }
}