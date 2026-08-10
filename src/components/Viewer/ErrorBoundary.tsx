import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-lg bg-[var(--color-error)]/10 border border-[var(--color-error)]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[var(--color-error)] mt-0.5" />
            <div>
              <h3 className="font-medium text-[var(--color-error)]">
                Rendering Error
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {this.state.error?.message || 'Failed to render Markdown'}
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
