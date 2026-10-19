import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { useI18n } from '../i18n'
import { postCategories, posts } from '../data/content'
import { images } from '../data/catalog'
import { Reveal } from '../components/Reveal'
import { tagColor } from '../components/PostBlocks'
import { useTitle } from '../useTitle'

export default function Journal() {
  const { t, tr, lang } = useI18n()
  const [cat, setCat] = useState('all')
  useTitle(t('journal.title'), t('journal.desc'))
  const list = cat === 'all' ? posts : posts.filter((p) => p.catId === cat)
  const locale = lang === 'vi' ? 'vi-VN' : 'en-US'
  const tabs = [{ id: 'all', label: { vi: t('journal.allCats'), en: t('journal.allCats') } }, ...postCategories]

  return (
    <>
      <header className="bl-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.68)), url(${images.heroBg})` }}>
        <div className="container">
          <h1>{t('journal.title')}</h1>
          <p>{t('journal.desc')}</p>
        </div>
      </header>

      <section className="bl">
        <div className="container">
          <div className="bl-bar">
            <h2>{t('journal.latest')}</h2>
            <div className="bl-tabs" role="group" aria-label={t('journal.title')}>
              {tabs.map((c) => (
                <button key={c.id} className={cat === c.id ? 'is-on' : ''} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                  {tr(c.label)}
                </button>
              ))}
            </div>
          </div>

          {list.length === 0 ? (
            <div className="empty"><p>{t('journal.empty')}</p></div>
          ) : (
            <ul className="bl-list">
              {list.map((p, i) => {
                const d = new Date(p.date)
                return (
                  <Reveal as="li" key={p.slug} delay={i * 70} className="bl-row">
                    <time className="bl-date" dateTime={p.date}>
                      <span>{new Intl.DateTimeFormat(locale, { month: 'short' }).format(d)}</span>
                      <i aria-hidden />
                      <strong>{String(d.getDate()).padStart(2, '0')}</strong>
                    </time>
                    <Link to={`/song-dep/${p.slug}`} className="bl-img" tabIndex={-1} aria-hidden>
                      <img src={p.cover} alt="" width={900} height={600} loading="lazy" />
                    </Link>
                    <div className="bl-body">
                      <span className="bl-cat" style={{ color: tagColor[p.catId] }}>{tr(p.category)}</span>
                      <h3><Link to={`/song-dep/${p.slug}`}>{tr(p.title)}</Link></h3>
                      <p className="bl-meta"><Clock size={14} aria-hidden /> {t('journal.minRead', { n: p.minutes })}</p>
                      <p className="bl-excerpt">{tr(p.excerpt)}</p>
                      <Link className="bl-more" to={`/song-dep/${p.slug}`}>{t('journal.read')} <ArrowRight size={18} aria-hidden /></Link>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="cta bl-quote" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.72)), url(${images.heroBg})` }}>
        <Reveal className="container cta__in">
          <h2>“{t('brand.tagline')}”</h2>
          <div className="h-row">
            <Link className="btn btn--outline-light" to="/san-pham">{t('hero.cta1')} <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
