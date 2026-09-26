'use client'

import { CalendarPlus, Bookmark, Check, Clock3, Flame, Star } from 'lucide-react'
import { Workout } from '@/lib/types'
import { storage } from '@/lib/storage'
import { useToast } from './ToastProvider'
import { useState } from 'react'

export function WorkoutDetail({ workout }: { workout: Workout }) {
  const { showToast } = useToast()
  const [planAdded, setPlanAdded] = useState(false)
  const [saved, setSaved] = useState(false)

  const addPlan = () => {
    const ok = storage.addPlan(workout)
    if (ok) { setPlanAdded(true); showToast("Added to today's plan") }
    else if (storage.getPlan().some((x) => x.id === workout.id)) showToast('Already in today\'s plan', 'info')
    else showToast('Today\'s plan is full (5 lifts)', 'info')
  }
  const save = () => {
    const ok = storage.addSaved(workout)
    if (ok) { setSaved(true); showToast('Saved for later') }
    else showToast('Already saved', 'info')
  }

  return (
    <main className="detail-page container">
      <section className="detail-grid">
        <div className="detail-image-wrap"><img src={workout.image} alt={workout.name} className="detail-image" /></div>
        <div className="detail-content">
          <h1>{workout.name}</h1>
          <p className="detail-description">{workout.description}</p>
          <div className="tag-row detail-tags">{workout.muscleGroups.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>

          <div className="spec-panel">
            {[
              ['EQUIPMENT', workout.equipment], ['DIFFICULTY', workout.difficulty], ['SETS', String(workout.sets)], ['REPS', workout.reps],
              ['DURATION', `${workout.duration} min`], ['CALORIES', `${workout.caloriesBurned} kcal`], ['RATING', String(workout.rating)]
            ].map(([label, value]) => <div className="spec-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>

          <h2 className="section-kicker">INSTRUCTIONS</h2>
          <ol className="instructions">{workout.instructions.map((instruction, i) => <li key={instruction}><span>{i + 1}.</span>{instruction}</li>)}</ol>

          <div className="detail-actions">
            <button className="btn primary" onClick={addPlan}><CalendarPlus size={15} />{planAdded ? 'Added to plan' : "Add to today's plan"}</button>
            <button className="btn secondary" onClick={save}><Bookmark size={15} />{saved ? 'Saved' : 'Save for later'}</button>
          </div>
        </div>
      </section>
    </main>
  )
}
