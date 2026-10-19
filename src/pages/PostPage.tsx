import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, Link2, Phone } from 'lucide-react'
import { useI18n } from '../i18n'
import { posts } from '../data/content'
import type { Post } from '../data/content'
import { contact, images } from '../data/catalog'
import { Facebook } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { useTitle } from '../useTitle'

const tagColor: Record<string, string> = { eatclean: '#1f8a3b', drinks: '#d9822b', nutrition: '#2f6fdb', habits: '#c2456b' }

function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="rp" aria-hidden><i style={{ width: `${p}%` }} /></div>
}

function Share({ title }: { title: string }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const url = typeof window === 'undefined' ? '' : window.location.href
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt(t('post.copy'), url)
    }
  }
  return (
    <div className="pp-share">
      <strong>{t('post.share')}</strong>
      <div>
        <a className="icon-btn pp-share__btn" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label={t('post.facebook')} title={`${t('post.facebook')}: ${title}`}>
          <Facebook size={18} />
        </a>
        <button className="icon-btn pp-share__btn" onClick={copy} aria-label={t('post.copy')} title={t('post.copy')}>
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>
      </div>
      <span className="small" aria-live="polite">{copied ? t('post.copied') : ''}</span>
    </div>
  )
}

function Toc({ post }: { post: Post }) {
  const { t, tr } = useI18n()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = post.sections.map((_, i) => document.getElementById(`s${i}`)).filter((e): e is HTMLElement => !!e)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(Number(visible.target.id.slice(1)))
      },
      { rootMargin: '-90px 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [post])

  return (
    <nav className="pp-toc" aria-label={t('journal.toc')}>
      <strong>{t('journal.toc')}</strong>
      <ol>
        {post.sections.map((s, i) => (
          <li key={i} className={i === active ? 'is-on' : ''}>
            <a href={`#s${i}`}>{tr(s.heading)}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default function PostPage() {
  const { slug = '' } = useParams()
  const { t, tr, date } = useI18n()
  const index = posts.findIndex((p) => p.slug === slug)
  const post = posts[index]
  useTitle(post ? tr(post.title) : t('notfound.title'), post ? tr(post.excerpt) : undefined)

  if (!post) {
    return (
      <section className="section"><div className="container empty">
        <h1>{t('notfound.title')}</h1>
        <Link className="btn btn--primary" to="/song-dep">{t('journal.back')}</Link>
      </div></section>
    )
  }

  const prev = posts[(index - 1 + posts.length) % posts.length]
  const next = posts[(index + 1) % posts.length]
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <ReadingProgress />

      <header className="pp-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.72)), url(${post.cover})` }}>
        <div className="container pp-hero__in">
          <nav className="pp-crumbs" aria-label="Breadcrumb">
            <Link to="/">{t('post.home')}</Link> / <Link to="/song-dep">{t('nav.journal')}</Link>
          </nav>
          <span className="j2-tag" style={{ background: tagColor[post.catId] }}>{tr(post.category)}</span>
          <h1>{tr(post.title)}</h1>
          <p className="pp-hero__meta">
            <span><CalendarDays size={14} aria-hidden /> <time dateTime={post.date}>{date(post.date)}</time></span>
            <span><Clock size={14} aria-hidden /> {t('journal.minRead', { n: post.minutes })}</span>
            <span className="pp-draft">{t('journal.draft')}</span>
          </p>
        </div>
      </header>

      <section className="pp">
        <div className="container pp__grid">
          <aside className="pp__side">
            <Toc post={post} />
            <Share title={tr(post.title)} />
          </aside>

          <article className="pp__body">
            <p className="pp__intro">{tr(post.intro)}</p>
            {post.sections.map((s, i) => (
              <section key={i} id={`s${i}`} className="pp__sec">
                <h2><span>{String(i + 1).padStart(2, '0')}</span>{tr(s.heading)}</h2>
                <p>{tr(s.body)}</p>
                {s.items && (
                  s.ordered
                    ? <ol className="pp__list">{s.items.map((it, k) => <li key={k}>{tr(it)}</li>)}</ol>
                    : <ul className="pp__list">{s.items.map((it, k) => <li key={k}>{tr(it)}</li>)}</ul>
                )}
                {i === 1 && <img className="pp__fig" src={post.cover === images.slimArch ? images.yodetoxStone : images.slimBox} alt="" width={1000} height={600} loading="lazy" />}
              </section>
            ))}
            <p className="pp__note">{t('story.note')}</p>

            <nav className="pp-pn" aria-label="Article navigation">
              <Link to={`/song-dep/${prev.slug}`} className="pp-pn__item">
                <small><ArrowLeft size={14} /> {t('post.prev')}</small>
                <strong>{tr(prev.title)}</strong>
              </Link>
              <Link to={`/song-dep/${next.slug}`} className="pp-pn__item pp-pn__item--next">
                <small>{t('post.next')} <ArrowRight size={14} /></small>
                <strong>{tr(next.title)}</strong>
              </Link>
            </nav>
          </article>
        </div>
      </section>

      <section className="pp-related">
        <div className="container">
          <h2>{t('journal.related')}</h2>
          <div className="pp-related__grid">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <Link to={`/song-dep/${p.slug}`} className="j2-item pp-card">
                  <img src={p.cover} alt={tr(p.coverAlt)} width={400} height={400} loading="lazy" />
                  <div>
                    <span className="j2-tag" style={{ background: tagColor[p.catId] }}>{tr(p.category)}</span>
                    <h3>{tr(p.title)}</h3>
                    <p className="j2-meta"><span><Clock size={13} aria-hidden /> {t('journal.minRead', { n: p.minutes })}</span></p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.68)), url(${images.heroBg})` }}>
        <Reveal className="container cta__in">
          <h2>{t('consult.title')}</h2>
          <p>{t('consult.desc')}</p>
          <div className="h-row">
            <a className="btn btn--leaf" href={`tel:${contact.tel}`}><Phone size={16} /> {contact.hotline}</a>
            <Link className="btn btn--outline-light" to="/san-pham">{t('hero.cta1')} <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
