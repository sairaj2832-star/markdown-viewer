import { useState, useCallback, useEffect } from 'react'

interface Settings {
  fontSize: number
  readingWidth: number
  lineHeight: number
}

const STORAGE_KEY = 'markdown-viewer-settings'

const defaultSettings: Settings = {
  fontSize: 16,
  readingWidth: 720,
  lineHeight: 1.75,
}

function getStoredSettings(): Settings {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) }
      } catch {
        return defaultSettings
      }
    }
  }
  return defaultSettings
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(getStoredSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }, [])

  return { settings, updateSettings }
}
