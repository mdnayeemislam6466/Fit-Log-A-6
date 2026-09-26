import Link from 'next/link'
export default function NotFound(){return <main className="container plan-page"><div className="empty-state"><h2>404 — PAGE NOT FOUND</h2><p>The page you are looking for does not exist.</p><Link href="/" className="btn primary">Go to workouts</Link></div></main>}
