import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MotionButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function MotionButton({ children, variant = 'secondary', className = '', ...props }: MotionButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors"
  const variants = {
    primary: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]",
    secondary: "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)]",
    ghost: "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}