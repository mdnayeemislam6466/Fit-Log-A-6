import { Workout } from './types'

export const API_URL = 'https://api.abcz.workers.dev/api/fitlog'

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, { cache: 'no-store' })
  if (!response.ok) throw new Error('Failed to load workouts')
  return response.json()
}
