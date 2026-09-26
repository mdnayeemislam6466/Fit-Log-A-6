'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Workout } from '@/lib/types'
import { API_URL } from '@/lib/api'
import { WorkoutDetail } from '@/components/WorkoutDetail'

export default function WorkoutDetailsPage() {
  const params = useParams<{ id: string }>()
  const [workout, setWorkout] = useState<Workout | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const id = params.id
    if (!id) return
    fetch(`${API_URL}/${id}`).then((res) => {
      if (!res.ok) throw new Error('not found')
      return res.json()
    }).then(setWorkout).catch(() => setNotFound(true)).finally(() => setLoading(false))
  }, [params.id])

  if (loading) return <main className="container detail-page"><div className="loading-panel"><span className="spinner" /> Loading workout…</div></main>
  if (notFound || !workout) return <main className="container plan-page"><div className="empty-state"><h2>WORKOUT NOT FOUND</h2><p>This workout does not exist in the library.</p><Link href="/" className="btn primary">Back to workouts</Link></div></main>
  return <WorkoutDetail workout={workout} />
}
