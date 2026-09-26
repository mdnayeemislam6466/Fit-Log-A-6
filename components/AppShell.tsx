'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { storage } from '@/lib/storage'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [counts, setCounts] = useState({ plan: 0, saved: 0 })

  const sync = () => setCounts({ plan: storage.getPlan().length, saved: storage.getSaved().length })
  useEffect(() => {
    sync()
    const handler = () => sync()
    window.addEventListener('fitlog-storage', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('fitlog-storage', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  const isPlan = pathname.startsWith('/my-plan')
  return (
    <div className="site-shell">
      <header className="navbar">
        <Link href="/" className="brand"><img src="/logo.png" alt="FitLog" /><span>FITLOG</span></Link>
        <nav className="nav-links">
          <Link href="/" className={!isPlan ? 'active' : ''}>Workouts</Link>
          <Link href="/my-plan" className={isPlan ? 'active' : ''}>My Plan</Link>
        </nav>
        <div className="nav-status">
          <Link href="/my-plan" className="status-link">Plan <b className="status-count plan-count">{counts.plan}</b></Link>
          <Link href="/my-plan" className="status-link">Saved <b className="status-count saved-count">{counts.saved}</b></Link>
        </div>
      </header>
      {children}
      <footer className="footer">
        <Link href="/" className="brand"><Dumbbell size={17} strokeWidth={3} /><span>FITLOG</span></Link>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </footer>
    </div>
  )
}
