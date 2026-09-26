'use client'

import Link from 'next/link'
import { Clock3, Flame, Star } from 'lucide-react'
import { Workout } from '@/lib/types'

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workouts/${workout.id}`} className="workout-card">
      <div className="card-image-wrap"><img src={workout.image} alt={workout.name} className="card-image" loading="lazy" /></div>
      <div className="card-body">
        <div className="tag-row">{workout.muscleGroups.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
        <h3>{workout.name}</h3>
        <p className="equipment">{workout.equipment}</p>
        <div className="stats-row">
          <span><Clock3 /> {workout.duration} min</span>
          <span><Flame /> {workout.caloriesBurned} kcal</span>
          <span><Star /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  )
}
