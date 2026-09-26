'use client'

import { Check, Info, X } from 'lucide-react'
import { useEffect } from 'react'

type ToastProps = { message: string; type?: 'success' | 'info'; onClose: () => void }

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 2600)
    return () => window.clearTimeout(timer)
  }, [onClose])

  return (
    <div className="toast" role="status">
      <span className="toast-icon">{type === 'success' ? <Check size={15} /> : <Info size={15} />}</span>
      <span>{message}</span>
      <button onClick={onClose} aria-label="Close notification"><X size={14} /></button>
    </div>
  )
}
