'use client'

import Link from 'next/link'
import { Check, Clock3, Flame, Star, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { storage } from '@/lib/storage'
import { PlanItem, Workout } from '@/lib/types'
import { useToast } from './ToastProvider'

type SortKey = 'duration' | 'calories' | 'rating'

function PlanRow({ workout, done, onDone, onRemove }: { workout: Workout; done?: boolean; onDone?: () => void; onRemove: () => void }) {
  const { showToast } = useToast()
  return (
    <div className={`plan-row ${done ? 'done' : ''}`}>
      <img src={workout.image} alt={workout.name} />
      <div className="plan-row-info">
        <h3>{workout.name}</h3>
        <p>{workout.equipment}</p>
        <div className="stats-row"><span><Clock3 /> {workout.duration} min</span><span><Flame /> {workout.caloriesBurned} kcal</span><span><Star /> {workout.rating}</span></div>
      </div>
      <div className="plan-row-actions">
        <Link href={`/workouts/${workout.id}`} className="btn secondary small">View Details</Link>
        {onDone && <button className="btn primary small" onClick={() => { onDone(); showToast('Workout marked as done') }}><Check size={14} /> {done ? 'Done' : 'Mark as Done'}</button>}
        <button className="icon-button" onClick={() => { onRemove(); showToast('Removed from list', 'info') }} aria-label={`Remove ${workout.name}`}><X size={16} /></button>
      </div>
    </div>
  )
}

export default function MyPlanClient() {
  const [plan, setPlan] = useState<PlanItem[]>([])
  const [saved, setSaved] = useState<Workout[]>([])
  const [tab, setTab] = useState<'plan' | 'saved'>('plan')
  const [sort, setSort] = useState<SortKey>('duration')
  const [loading, setLoading] = useState(true)

  const refresh = () => { setPlan(storage.getPlan()); setSaved(storage.getSaved()); setLoading(false) }
  useEffect(() => {
    refresh()
    window.addEventListener('fitlog-storage', refresh)
    return () => window.removeEventListener('fitlog-storage', refresh)
  }, [])

  const sortedPlan = useMemo(() => [...plan].sort((a, b) => Number(a[sort === 'calories' ? 'caloriesBurned' : sort]) - Number(b[sort === 'calories' ? 'caloriesBurned' : sort])), [plan, sort])
  const sortedSaved = useMemo(() => [...saved].sort((a, b) => Number(a[sort === 'calories' ? 'caloriesBurned' : sort]) - Number(b[sort === 'calories' ? 'caloriesBurned' : sort])), [saved, sort])
  const minutes = plan.reduce((s, x) => s + x.duration, 0)
  const calories = plan.reduce((s, x) => s + x.caloriesBurned, 0)

  const removePlan = (id: number) => { storage.removePlan(id); refresh() }
  const removeSaved = (id: number) => { storage.removeSaved(id); refresh() }
  const markDone = (id: number) => { storage.markDone(id); refresh() }

  return (
    <main className="container plan-page">
      <section className="page-heading"><h1>MY PLAN</h1><p>Cap of five lifts for today. Finish them, then load more.</p></section>
      <section className="metrics">
        <div><span>Exercises</span><strong>{plan.length}</strong></div>
        <div><span>Minutes</span><strong>{minutes}</strong></div>
        <div><span>Calories</span><strong>{calories}</strong></div>
      </section>
      <div className="plan-toolbar">
        <div className="tabs"><button className={tab === 'plan' ? 'active' : ''} onClick={() => setTab('plan')}>Today's Plan</button><button className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')}>Saved</button></div>
        <label className="sort">Sort By <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></label>
      </div>
      {loading ? <div className="loading-panel"><span className="spinner" /> Loading workouts…</div> : tab === 'plan' ? (
        plan.length ? <div className="plan-list">{sortedPlan.map((item) => <PlanRow key={item.id} workout={item} done={item.done} onDone={item.done ? undefined : () => markDone(item.id)} onRemove={() => removePlan(item.id)} />)}</div> : <EmptyState />
      ) : (
        saved.length ? <div className="plan-list">{sortedSaved.map((item) => <PlanRow key={item.id} workout={item} onRemove={() => removeSaved(item.id)} />)}</div> : <EmptyState saved />
      )}
    </main>
  )
}

function EmptyState({ saved = false }: { saved?: boolean }) {
  return <div className="empty-state"><h2>NOTHING HERE YET</h2><p>{saved ? 'Save workouts from the library and find them here.' : 'Browse the library and add a lift to get today moving.'}</p><Link href="/" className="btn primary">Go to workouts</Link></div>
}
