import { useState, useEffect, useCallback } from 'react'
import type { Theme } from '../types'

const STORAGE_KEY = 'markdown-viewer-theme'

const DARK_THEMES = ['dark', 'midnight', 'nord', 'solarized', 'rose-pine', 'mocha', 'high-contrast']
const LIGHT_THEMES = ['light', 'sepia', 'matcha', 'e-ink']
const ALL_THEME_CLASSES = ['system', ...DARK_THEMES, ...LIGHT_THEMES]

// Each theme's personality attributes — these drive the markdown.css variations
const THEME_PERSONALITY: Record<string, Record<string, string>> = {
  light: {
    'data-heading-decoration': 'none',
    'data-blockquote-style': 'border-left',
    'data-link-style': 'underline',
    'data-content-spacing': 'normal',
    'data-heading-transform': 'none',
    'data-surface-texture': 'flat',
  },
  dark: {
    'data-heading-decoration': 'accent-bar',
    'data-blockquote-style': 'border-left',
    'data-link-style': 'color-only',
    'data-content-spacing': 'normal',
    'data-heading-transform': 'none',
    'data-surface-texture': 'flat',
  },
  midnight: {
    'data-heading-decoration': 'accent-bar',
    'data-blockquote-style': 'border-left',
    'data-link-style': 'underline',
    'data-content-spacing': 'compact',
    'data-heading-transform': 'none',
    'data-surface-texture': 'flat',
  },
  nord: {
    'data-heading-decoration': 'none',
    'data-blockquote-style': 'accent-bg',
    'data-link-style': 'dotted',
    'data-content-spacing': 'spacious',
    'data-heading-transform': 'none',
    'data-surface-texture': 'subtle-noise',
  },
  solarized: {
    'data-heading-decoration': 'underline',
    'data-blockquote-style': 'quote-mark',
    'data-link-style': 'underline',
    'data-content-spacing': 'spacious',
    'data-heading-transform': 'none',
    'data-surface-texture': 'flat',
  },
  sepia: {
    'data-heading-decoration': 'double-line',
    'data-blockquote-style': 'quote-mark',
    'data-link-style': 'underline',
    'data-content-spacing': 'spacious',
    'data-heading-transform': 'none',
    'data-surface-texture': 'paper',
  },
  'rose-pine': {
    'data-heading-decoration': 'none',
    'data-blockquote-style': 'full-border',
    'data-link-style': 'dotted',
    'data-content-spacing': 'spacious',
    'data-heading-transform': 'none',
    'data-surface-texture': 'subtle-noise',
  },
  matcha: {
    'data-heading-decoration': 'none',
    'data-blockquote-style': 'accent-bg',
    'data-link-style': 'color-only',
    'data-content-spacing': 'spacious',
    'data-heading-transform': 'small-caps',
    'data-surface-texture': 'subtle-noise',
  },
  mocha: {
    'data-heading-decoration': 'accent-bar',
    'data-blockquote-style': 'border-left',
    'data-link-style': 'highlight',
    'data-content-spacing': 'normal',
    'data-heading-transform': 'none',
    'data-surface-texture': 'subtle-noise',
  },
  'e-ink': {
    'data-heading-decoration': 'underline',
    'data-blockquote-style': 'border-left',
    'data-link-style': 'underline',
    'data-content-spacing': 'normal',
    'data-heading-transform': 'uppercase',
    'data-surface-texture': 'flat',
  },
  'high-contrast': {
    'data-heading-decoration': 'accent-bar',
    'data-blockquote-style': 'full-border',
    'data-link-style': 'underline',
    'data-content-spacing': 'spacious',
    'data-heading-transform': 'none',
    'data-surface-texture': 'flat',
  },
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

function getStoredTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && ALL_THEME_CLASSES.includes(stored)) {
      return stored as Theme
    }
  }
  return 'system'
}

function isDarkTheme(theme: Theme): boolean {
  if (theme === 'system') {
    return getSystemTheme() === 'dark'
  }
  return DARK_THEMES.includes(theme)
}

function getEffectiveTheme(theme: Theme): string {
  if (theme === 'system') {
    return getSystemTheme()
  }
  return theme
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    return isDarkTheme(theme) ? 'dark' : 'light'
  })

  const applyTheme = useCallback((currentTheme: Theme) => {
    const root = document.documentElement
    const effective = getEffectiveTheme(currentTheme)
    const isDark = isDarkTheme(currentTheme)

    // Remove all possible theme classes
    root.classList.remove(...ALL_THEME_CLASSES, 'dark', 'light')

    // Add the specific theme class
    if (currentTheme === 'system') {
      root.classList.add(isDark ? 'dark' : 'light')
    } else {
      root.classList.add(currentTheme)
      // Also add dark/light base class for hljs and scrollbar styling
      if (currentTheme !== 'dark' && currentTheme !== 'light') {
        root.classList.add(isDark ? 'dark' : 'light')
      }
    }

    // Apply theme personality data attributes
    const personality = THEME_PERSONALITY[effective] || THEME_PERSONALITY.light
    // First remove all data attributes from other themes
    const allAttrs = new Set<string>()
    Object.values(THEME_PERSONALITY).forEach(p => {
      Object.keys(p).forEach(k => allAttrs.add(k))
    })
    allAttrs.forEach(attr => root.removeAttribute(attr))
    // Now set the current theme's attributes
    Object.entries(personality).forEach(([key, value]) => {
      root.setAttribute(key, value)
    })

    setResolvedTheme(isDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      applyTheme('system')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }, [])

  return { theme, resolvedTheme, setTheme }
}
