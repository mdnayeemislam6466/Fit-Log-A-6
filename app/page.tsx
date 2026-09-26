'use client'

import { useEffect, useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { Workout } from '@/lib/types'
import { API_URL } from '@/lib/api'
import { WorkoutCard } from '@/components/WorkoutCard'

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    fetch(API_URL)
      .then((res) => { if (!res.ok) throw new Error('Could not load workouts'); return res.json() })
      .then((data) => { if (alive) setWorkouts(data) })
      .catch(() => { if (alive) setError('Could not load workouts right now. Please refresh the page.') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  return <>
    <main className="container">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">WORKOUT LIBRARY</p>
          <h1>TRAIN WITH INTENT. LOG EVERY SET.</h1>
          <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work add up.</p>
          <a href="#library" className="btn primary"><Dumbbell size={13} /> BROWSE WORKOUTS</a>
        </div>
        <img src="/banner.png" alt="Workout illustration" className="hero-art" />
      </section>
      <section id="library" className="library">
        <div className="section-heading"><h2>THE LIBRARY</h2><p>Twelve lifts covering every major muscle group.</p></div>
        {loading ? <div className="loading-panel"><span className="spinner" /> Loading workouts…</div> : error ? <div className="empty-state"><h2>COULD NOT LOAD WORKOUTS</h2><p>{error}</p><button className="btn primary" onClick={() => window.location.reload()}>Try again</button></div> : <div className="library-grid">{workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>}
      </section>
    </main>
  </>
}
