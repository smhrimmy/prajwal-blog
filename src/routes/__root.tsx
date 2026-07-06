import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold font-serif tracking-tight">Prajwal's Notes</Link>
          <div className="flex items-center gap-6">
            <a href="http://localhost:5173" className="text-sm font-medium hover:text-black/60 dark:hover:text-white/60 transition-colors">Portfolio</a>
            <button onClick={toggleDark} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 my-12">
        <Outlet />
      </main>

      <footer className="border-t border-black/5 dark:border-white/5 py-8 mt-12 text-center text-sm text-black/40 dark:text-white/40">
        <p>&copy; {new Date().getFullYear()} Prajwal. All rights reserved.</p>
      </footer>
    </div>
  )
}
