import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ThemePicker } from './ThemePicker'
import { FontSizeSlider } from './FontSizeSlider'
import { ReadingWidthSlider } from './ReadingWidthSlider'
import type { Theme } from '../../types'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
  fontSize: number
  onFontSizeChange: (size: number) => void
  readingWidth: number
  onReadingWidthChange: (width: number) => void
}

export function SettingsPanel({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  readingWidth,
  onReadingWidthChange,
}: SettingsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] z-50 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Settings</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">Theme</h3>
                <ThemePicker currentTheme={theme} onThemeChange={onThemeChange} />
              </div>

              <FontSizeSlider value={fontSize} onChange={onFontSizeChange} />
              <ReadingWidthSlider value={readingWidth} onChange={onReadingWidthChange} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
