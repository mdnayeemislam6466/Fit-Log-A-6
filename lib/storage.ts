import { PlanItem, Workout } from './types'

const PLAN_KEY = 'fitlog-plan-v1'
const SAVED_KEY = 'fitlog-saved-v1'

function read<T>(key: string): T[] {
  if (typeof window === 'undefined') return []
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

function write<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent('fitlog-storage'))
}

export const storage = {
  getPlan: () => read<PlanItem>(PLAN_KEY),
  getSaved: () => read<Workout>(SAVED_KEY),
  addPlan(workout: Workout) {
    const items = read<PlanItem>(PLAN_KEY)
    if (items.some((item) => item.id === workout.id)) return false
    if (items.length >= 5) return false
    write(PLAN_KEY, [...items, { ...workout, done: false }])
    return true
  },
  removePlan(id: number) {
    write(PLAN_KEY, read<PlanItem>(PLAN_KEY).filter((item) => item.id !== id))
  },
  markDone(id: number) {
    write(PLAN_KEY, read<PlanItem>(PLAN_KEY).map((item) => item.id === id ? { ...item, done: true } : item))
  },
  addSaved(workout: Workout) {
    const items = read<Workout>(SAVED_KEY)
    if (items.some((item) => item.id === workout.id)) return false
    write(SAVED_KEY, [...items, workout])
    return true
  },
  removeSaved(id: number) {
    write(SAVED_KEY, read<Workout>(SAVED_KEY).filter((item) => item.id !== id))
  },
}
