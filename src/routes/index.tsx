import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { ArrowUpRight, Clock } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setArticles(data)
      }
      setLoading(false)
    }
    fetchArticles()
  }, [])

  if (loading) {
    return <div className="animate-pulse space-y-8">
      <div className="h-12 bg-black/5 dark:bg-white/5 rounded-lg w-1/3"></div>
      <div className="h-32 bg-black/5 dark:bg-white/5 rounded-lg w-full"></div>
      <div className="h-32 bg-black/5 dark:bg-white/5 rounded-lg w-full"></div>
    </div>
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight mb-4 leading-tight">Thoughts, essays, and notes on software craft.</h1>
        <p className="text-lg text-black/60 dark:text-white/60">Writing about frontend engineering, design systems, and building great products.</p>
      </div>

      <div className="flex flex-col gap-12">
        {articles.map(article => (
          <Link key={article.id} to={`/$slug`} params={{ slug: article.slug || article.id }} className="group block">
            <article className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-black/40 dark:text-white/40 font-medium">
                <span className="uppercase tracking-wider text-xs">{article.category || 'Engineering'}</span>
                <span>•</span>
                <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.read_time || '5 min'}</span>
              </div>
              <h2 className="text-2xl font-bold font-serif group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors flex items-center justify-between">
                {article.title}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0" />
              </h2>
              <p className="text-black/60 dark:text-white/60 leading-relaxed line-clamp-3">
                {article.excerpt || article.description || "Click to read the full article..."}
              </p>
            </article>
          </Link>
        ))}

        {articles.length === 0 && (
          <div className="py-12 text-center text-black/40 dark:text-white/40 border border-dashed border-black/10 dark:border-white/10 rounded-xl">
            No articles published yet.
          </div>
        )}
      </div>
    </div>
  )
}
