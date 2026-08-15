interface FontSizeSliderProps {
  value: number
  onChange: (value: number) => void
}

export function FontSizeSlider({ value, onChange }: FontSizeSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-[var(--color-text-secondary)]">Font Size</label>
        <span className="text-sm font-medium text-[var(--color-text-primary)] tabular-nums">{value}px</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-[var(--color-text-muted)]" style={{ fontSize: '12px' }}>A</span>
        <input
          type="range"
          min="13"
          max="24"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs text-[var(--color-text-muted)]" style={{ fontSize: '18px' }}>A</span>
      </div>
    </div>
  )
}
