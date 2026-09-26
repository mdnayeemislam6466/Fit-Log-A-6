'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Toast } from './toast'

type ToastContextValue = { showToast: (message: string, type?: 'success' | 'info') => void }
const ToastContext = createContext<ToastContextValue>({ showToast: () => {} })

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' } | null>(null)
  const showToast = useCallback((message: string, type?: 'success' | 'info') => setToast({ message, type }), [])
  const value = useMemo(() => ({ showToast }), [showToast])
  return <ToastContext.Provider value={value}>{children}{toast && <Toast {...toast} onClose={() => setToast(null)} />}</ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext)
