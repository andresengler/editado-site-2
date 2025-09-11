'use client'
import dynamic from 'next/dynamic'

// Cargamos la App sin SSR para evitar problemas de window/document/animaciones
const App = dynamic(() => import('../components/App').then(m => m.default ?? m), { ssr: false })

export default function Page() {
  return <App />
}
