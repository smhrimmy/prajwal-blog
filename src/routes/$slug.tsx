import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

import { ArrowLeft, Clock } from 'lucide-react'

export const Route = createFileRoute('/$slug')({
  component: Article,
})

function Article() {
  const { slug } = Route.useParams()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      // First try to match by slug, if not found try by ID
      let { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()
        
      if (error || !data) {
        const res = await supabase
          .from('articles')
          .select('*')
          .eq('id', slug)
          .eq('status', 'published')
          .single()
        data = res.data
        error = res.error
      }

      if (error || !data) {
        setError(true)
      } else {
        setArticle(data)
      }
      setLoading(false)
    }
    fetchArticle()
  }, [slug])

  if (loading) {
    return <div className="animate-pulse space-y-8">
      <div className="h-12 bg-black/5 dark:bg-white/5 rounded-lg w-2/3"></div>
      <div className="h-64 bg-black/5 dark:bg-white/5 rounded-lg w-full"></div>
    </div>
  }

  if (error || !article) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-black/60 dark:text-white/60 mb-8">This article might have been moved or unpublished.</p>
        <Link to="/" className="text-sm font-medium border-b border-black/20 dark:border-white/20 pb-1">Return Home</Link>
      </div>
    )
  }

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to posts
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 text-sm text-black/40 dark:text-white/40 font-medium mb-6">
          <span className="uppercase tracking-wider text-xs">{article.category || 'Engineering'}</span>
          <span>•</span>
          <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.read_time || '5 min'}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight leading-tight mb-6">
          {article.title}
        </h1>
        {(article.excerpt || article.description) && (
          <p className="text-xl text-black/60 dark:text-white/60 leading-relaxed font-serif">
            {article.excerpt || article.description}
          </p>
        )}
      </header>

      {article.image_url && (
        <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-2xl relative">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div 
        className="prose prose-zinc dark:prose-invert prose-lg prose-p:leading-relaxed prose-headings:font-serif max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content_html || '<p>No content provided.</p>' }}
      />
    </article>
  )
}
