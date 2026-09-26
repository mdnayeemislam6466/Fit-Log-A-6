import './globals.css'
import { AppShell } from '@/components/AppShell'
import { ToastProvider } from '@/components/ToastProvider'

export const metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, no-nonsense workout library and daily training log.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><ToastProvider><AppShell>{children}</AppShell></ToastProvider></body></html>
}
