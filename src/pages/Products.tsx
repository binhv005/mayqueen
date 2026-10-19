import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Localized } from '../i18n'
import { products } from '../data/catalog'
import type { Product } from '../data/catalog'
import { ShopCard } from '../components/ProductBits'
import { ComboSection } from './Combos'
import { Reveal } from '../components/Reveal'
import { useTitle } from '../useTitle'

type Line = Product['line']
type Bucket = 'all' | 'low' | 'mid' | 'high'
type Sort = 'default' | 'priceAsc' | 'priceDesc' | 'name'

const PAGE_SIZE = 9

const lines: { id: Line; label: Localized }[] = [
  { id: 'slim', label: { vi: 'Mayqueen Slim', en: 'Mayqueen Slim' } },
  { id: 'yodetox', label: { vi: 'Yodetox Extra', en: 'Yodetox Extra' } },
  { id: 'set', label: { vi: 'Hộp quà & bộ đôi', en: 'Gift boxes & pairs' } },
]
const buckets: { id: Bucket; label: Localized; test: (p: number) => boolean }[] = [
  { id: 'all', label: { vi: 'Tất cả mức giá', en: 'All prices' }, test: () => true },
  { id: 'low', label: { vi: 'Dưới 600.000 ₫', en: 'Under 600,000 ₫' }, test: (p) => p < 600000 },
  { id: 'mid', label: { vi: '600.000 – 1.200.000 ₫', en: '600,000 – 1,200,000 ₫' }, test: (p) => p >= 600000 && p <= 1200000 },
  { id: 'high', label: { vi: 'Trên 1.200.000 ₫', en: 'Over 1,200,000 ₫' }, test: (p) => p > 1200000 },
]
const sorts: { id: Sort; label: Localized }[] = [
  { id: 'default', label: { vi: 'Mặc định', en: 'Default' } },
  { id: 'priceAsc', label: { vi: 'Giá: thấp đến cao', en: 'Price: low to high' } },
  { id: 'priceDesc', label: { vi: 'Giá: cao đến thấp', en: 'Price: high to low' } },
  { id: 'name', label: { vi: 'Tên A → Z', en: 'Name A → Z' } },
]

function toggle<T>(arr: T[], v: T) {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}

export default function Products() {
  const { t, tr } = useI18n()
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const [lineSel, setLineSel] = useState<Line[]>([])
  const [bucket, setBucket] = useState<Bucket>('all')
  const [sort, setSort] = useState<Sort>('default')
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  useTitle(t('list.title'))

  const needle = q.trim().toLowerCase()
  const bucketDef = buckets.find((b) => b.id === bucket)!

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!needle || p.name.toLowerCase().includes(needle)) &&
        (!lineSel.length || lineSel.includes(p.line)) &&
        (bucket === 'all' || (p.price != null && bucketDef.test(p.price))),
    )
    if (sort === 'priceAsc') list = [...list].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
    if (sort === 'priceDesc') list = [...list].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [needle, lineSel, bucket, bucketDef, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
  const hasFilters = lineSel.length > 0 || bucket !== 'all' || !!needle

  const reset = () => {
    setLineSel([])
    setBucket('all')
    setPage(1)
    setParams({})
  }
  const lbl = (l: Localized) => tr(l)

  const filterPanel = (
    <div className="shop-filters">
      <h2>{lbl({ vi: 'Bộ lọc', en: 'Filters' })}</h2>
      <fieldset>
        <legend>{lbl({ vi: 'Dòng sản phẩm', en: 'Product line' })}</legend>
        {lines.map((l) => (
          <label key={l.id} className="check check--center">
            <input type="checkbox" checked={lineSel.includes(l.id)} onChange={() => { setLineSel((s) => toggle(s, l.id)); setPage(1) }} />
            <span>{lbl(l.label)} <small className="muted">({products.filter((p) => p.line === l.id).length})</small></span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>{lbl({ vi: 'Mức giá', en: 'Price' })}</legend>
        {buckets.map((b) => (
          <label key={b.id} className="check check--center">
            <input type="radio" name="price" checked={bucket === b.id} onChange={() => { setBucket(b.id); setPage(1) }} />
            <span>{lbl(b.label)}</span>
          </label>
        ))}
      </fieldset>
      {hasFilters && <button className="link" onClick={reset}>{lbl({ vi: 'Xóa tất cả bộ lọc', en: 'Clear all filters' })}</button>}
    </div>
  )

  return (
    <>
      <header className="shop-hero">
        <div className="container">
          <h1>{t('list.title')}</h1>
          <nav aria-label="Breadcrumb"><Link to="/">{t('post.home')}</Link> / <span>{t('list.title')}</span></nav>
        </div>
      </header>

      <section className="shop">
        <div className="container shop__grid">
          <aside className="shop__side">
            <button className="shop__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              <SlidersHorizontal size={16} /> {lbl({ vi: 'Bộ lọc', en: 'Filters' })} <ChevronDown size={16} />
            </button>
            <div className={`shop__panel${open ? ' is-open' : ''}`}>{filterPanel}</div>
          </aside>

          <div className="shop__main">
            <input
              className="search-input"
              type="search"
              value={q}
              onChange={(e) => { setPage(1); setParams(e.target.value ? { q: e.target.value } : {}, { replace: true }) }}
              placeholder={t('list.search')}
              aria-label={t('list.search')}
            />

            <div className="shop__bar">
              <p aria-live="polite">{lbl({ vi: `Hiển thị ${filtered.length} sản phẩm`, en: `Showing ${filtered.length} products` })}</p>
              <label className="shop__sort">
                <span>{lbl({ vi: 'Sắp xếp', en: 'Sort by' })}</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  {sorts.map((s) => <option key={s.id} value={s.id}>{lbl(s.label)}</option>)}
                </select>
              </label>
            </div>

            {hasFilters && (
              <div className="shop__chips">
                <span>{lbl({ vi: 'Đang lọc', en: 'Active filter' })}</span>
                {needle && <button onClick={() => setParams({})}>“{q}” <X size={13} /></button>}
                {lineSel.map((l) => <button key={l} onClick={() => setLineSel((s) => s.filter((x) => x !== l))}>{lbl(lines.find((x) => x.id === l)!.label)} <X size={13} /></button>)}
                {bucket !== 'all' && <button onClick={() => setBucket('all')}>{lbl(bucketDef.label)} <X size={13} /></button>}
                <button className="shop__clear" onClick={reset}>{lbl({ vi: 'Xóa tất cả', en: 'Clear all' })}</button>
              </div>
            )}

            {shown.length === 0 ? (
              <div className="empty">
                <p>{t('list.empty')}</p>
                <button className="btn btn--ghost" onClick={reset}>{t('list.clear')}</button>
              </div>
            ) : (
              <div className="shop__products">
                {shown.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 80}><ShopCard p={p} /></Reveal>
                ))}
              </div>
            )}

            {pages > 1 && (
              <nav className="shop__pager" aria-label="Pagination">
                <button disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Previous"><ChevronLeft size={16} /></button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button key={n} className={n === current ? 'is-on' : ''} aria-current={n === current} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button disabled={current === pages} onClick={() => setPage(current + 1)} aria-label="Next"><ChevronRight size={16} /></button>
              </nav>
            )}
          </div>
        </div>

      </section>

      {!needle && <ComboSection />}
    </>
  )
}
