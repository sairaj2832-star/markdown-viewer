import { AlignJustify, Maximize2 } from 'lucide-react'

interface ReadingWidthSliderProps {
  value: number
  onChange: (value: number) => void
}

export function ReadingWidthSlider({ value, onChange }: ReadingWidthSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--color-text-secondary)]">Reading Width</label>
        <span className="text-sm font-medium text-[var(--color-text-primary)] tabular-nums">{value}px</span>
      </div>
      <div className="flex items-center gap-3">
        <AlignJustify className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
        <input
          type="range"
          min="520"
          max="960"
          step="40"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <Maximize2 className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
      </div>
    </div>
  )
}
