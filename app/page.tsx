'use client'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../components/App').then(m => m.default ?? m), { ssr: false })

export default function Page() {
  return <App />
}
