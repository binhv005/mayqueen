import { Link } from 'react-router-dom'
import { CalendarDays, Clock } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Post } from '../data/content'

export const tagColor: Record<string, string> = { eatclean: '#1f8a3b', drinks: '#d9822b', nutrition: '#2f6fdb', habits: '#c2456b' }

function PostMeta({ post }: { post: Post }) {
  const { t, date } = useI18n()
  return (
    <p className="j2-meta">
      <span><CalendarDays size={13} aria-hidden /> <time dateTime={post.date}>{date(post.date)}</time></span>
      <span><Clock size={13} aria-hidden /> {t('journal.minRead', { n: post.minutes })}</span>
    </p>
  )
}

export function FeaturedPost({ post }: { post: Post }) {
  const { tr } = useI18n()
  return (
    <Link to={`/song-dep/${post.slug}`} className="j2-main">
      <img src={post.cover} alt={tr(post.coverAlt)} width={1000} height={1000} loading="lazy" />
      <div className="j2-main__body">
        <span className="j2-tag" style={{ background: tagColor[post.catId] }}>{tr(post.category)}</span>
        <h3>{tr(post.title)}</h3>
        <p>{tr(post.excerpt)}</p>
        <PostMeta post={post} />
      </div>
    </Link>
  )
}

export function SidePost({ post }: { post: Post }) {
  const { tr } = useI18n()
  return (
    <Link to={`/song-dep/${post.slug}`} className="j2-item">
      <img src={post.cover} alt={tr(post.coverAlt)} width={400} height={400} loading="lazy" />
      <div>
        <span className="j2-tag" style={{ background: tagColor[post.catId] }}>{tr(post.category)}</span>
        <h3>{tr(post.title)}</h3>
        <PostMeta post={post} />
      </div>
    </Link>
  )
}

