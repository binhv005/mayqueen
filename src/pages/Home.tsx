import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Banknote, ChevronLeft, ChevronRight, Headset, Leaf, Phone, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Localized } from '../i18n'
import { contact, images, products } from '../data/catalog'
import type { Product } from '../data/catalog'
import { posts } from '../data/content'
import { AddButton, PriceTag } from '../components/ProductBits'
import { Reveal } from '../components/Reveal'
import { FeaturedPost, SidePost } from '../components/PostBlocks'
import { useTitle } from '../useTitle'

function Hero() {
  const { t } = useI18n()
  return (
    <section className="x-hero">
      <div className="x-hero__bg" role="img" aria-label={t('hero.bgAlt')} style={{ backgroundImage: `url(${images.heroBg})` }} />
      <div className="container x-hero__in">
        <div className="x-hero__left">
          <p className="x-hero__tag"><i aria-hidden />{t('hero.tag')}</p>
          <h1 className="x-hero__big">{t('hero.big1')}</h1>
          <p className="x-hero__desc">{t('hero.desc')}</p>
        </div>
        <p className="x-hero__big2" aria-hidden>{t('hero.big2')}</p>
      </div>
    </section>
  )
}

function Trust() {
  const { t } = useI18n()
  const items = [
    { icon: <Leaf />, a: 'trust.1', b: 'trust.1d' },
    { icon: <Banknote />, a: 'trust.2', b: 'trust.2d' },
    { icon: <Headset />, a: 'trust.3', b: 'trust.3d' },
    { icon: <ShieldCheck />, a: 'trust.4', b: 'trust.4d' },
  ] as const
  return (
    <section className="h-trust">
      <ul className="container">
        {items.map((x) => (
          <li key={x.a}>
            <span className="h-ico">{x.icon}</span>
            <span><strong>{t(x.a)}</strong><small>{t(x.b)}</small></span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function HProduct({ p }: { p: Product }) {
  const { t, tr } = useI18n()
  return (
    <article className="h-pcard">
      <Link to={`/san-pham/${p.slug}`} className="h-pcard__img">
        <img src={p.image} alt={tr(p.gallery[0].alt)} width={600} height={600} loading="lazy" />
      </Link>
      <div className="h-pcard__body">
        <h3>{p.name}</h3>
        <p>{tr(p.short)}</p>
        <dl>
          <div><dt>{t('product.priceLabel')}</dt><dd><PriceTag product={p} /></dd></div>
          <div><dt>{t('product.pack')}:</dt><dd>{tr(p.pack)}</dd></div>
        </dl>
        <div className="h-row">
          <Link className="btn btn--ghost btn--sm" to={`/san-pham/${p.slug}`}>{t('product.detail')}</Link>
          <AddButton productId={p.id} className="btn btn--primary btn--sm" iconOnly />
        </div>
      </div>
    </article>
  )
}

const audiences: { img: string; pos: string; title: Localized; text: Localized }[] = [
  {
    img: images.heroBg, pos: '50% 60%',
    title: { vi: 'Người trẻ năng động', en: 'Active young people' },
    text: { vi: 'Nhịp sống bận rộn, cần lựa chọn gọn nhẹ và dễ duy trì mỗi ngày.', en: 'Busy lives that call for compact choices that are easy to keep up.' },
  },
  {
    img: images.slimBox, pos: '20% 50%',
    title: { vi: 'Người yêu dinh dưỡng cân bằng', en: 'Balanced-nutrition lovers' },
    text: { vi: 'Quan tâm thói quen ăn uống lành mạnh và thông tin sản phẩm minh bạch.', en: 'Care about healthy eating and transparent product information.' },
  },
  {
    img: images.slimArch, pos: '45% 55%',
    title: { vi: 'Người chăm sóc bản thân', en: 'Self-care enthusiasts' },
    text: { vi: 'Xây dựng thói quen đều đặn, nhẹ nhàng, phù hợp nhu cầu riêng.', en: 'Building gentle, regular habits that fit their own needs.' },
  },
  {
    img: images.yodetoxGift, pos: '45% 55%',
    title: { vi: 'Người tìm món quà ý nghĩa', en: 'Thoughtful gift-givers' },
    text: { vi: 'Gửi gắm sự quan tâm đến người thân qua hộp quà chỉn chu.', en: 'Showing care for loved ones with a neatly packed gift box.' },
  },
  {
    img: images.yodetoxStone, pos: '35% 55%',
    title: { vi: 'Người bận rộn', en: 'Busy people' },
    text: { vi: 'Cần sản phẩm dạng gói tiện mang theo trong ngày dài.', en: 'Need easy sachets to carry through a long day.' },
  },
  {
    img: images.slimHero, pos: '70% 65%',
    title: { vi: 'Người bắt đầu thói quen mới', en: 'New-habit starters' },
    text: { vi: 'Muốn bắt đầu từ những lựa chọn nhỏ và được tư vấn tận tình.', en: 'Want to start with small choices and friendly guidance.' },
  },
]

function Audience() {
  const { t, tr } = useI18n()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      el.querySelectorAll<HTMLElement>('[data-card]').forEach((c) => {
        const cr = c.getBoundingClientRect()
        const off = Math.max(-1.3, Math.min(1.3, (cr.left + cr.width / 2 - cx) / (r.width / 2)))
        c.style.transform = `perspective(900px) rotateY(${(-off * 20).toFixed(1)}deg) translateY(${(Math.abs(off) ** 2 * 34).toFixed(1)}px) scale(${(1 - Math.abs(off) * 0.05).toFixed(3)})`
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const step = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.5), behavior: 'smooth' })
  }

  return (
    <section className="aud2">
      <Reveal className="container aud2__head">
        <span className="eyebrow">{tr({ vi: 'Đối tượng khách hàng', en: 'Who it is for' })}</span>
        <h2>{tr({ vi: 'Dành cho những ai yêu sống khỏe theo cách riêng', en: 'For everyone who loves living well in their own way' })}</h2>
        <p>{tr({ vi: 'MayqueenSlim đồng hành cùng người trẻ yêu thích chăm sóc bản thân, dinh dưỡng cân bằng và phong cách sống lành mạnh.', en: 'MayqueenSlim is for young people who love self-care, balanced nutrition and a healthy lifestyle.' })}</p>
        <Link className="btn btn--leaf" to="/san-pham">{t('hero.cta1')}</Link>
      </Reveal>

      <div className="aud2__strip" ref={ref} tabIndex={0} role="region" aria-label={tr({ vi: 'Đối tượng khách hàng, trượt ngang để xem', en: 'Customer groups, scroll sideways' })}>
        {audiences.map((a) => (
          <figure key={a.title.en} className="aud2__card" data-card>
            <img src={a.img} alt="" style={{ objectPosition: a.pos }} width={600} height={800} loading="lazy" draggable={false} />
            <figcaption>
              <strong>{tr(a.title)}</strong>
              <span>{tr(a.text)}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="aud2__nav">
        <button onClick={() => step(-1)} aria-label="Previous"><ChevronLeft size={20} /></button>
        <button onClick={() => step(1)} aria-label="Next"><ChevronRight size={20} /></button>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useI18n()
  useTitle(t('brand.name'), t('hero.desc'))

  return (
    <>
      <Hero />
      <Trust />

      {/* Essentials */}
      <section className="h-section">
        <div className="container">
          <Reveal className="h-title">
            <h2>{t('ess.title')}</h2>
            <p>{t('ess.desc')}</p>
          </Reveal>
          <div className="h-pgrid">
            {products.slice(0, 2).map((p, i) => (
              <Reveal key={p.id} variant={i ? 'right' : 'left'} delay={i * 120}><HProduct p={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story band */}
      <section className="h-band">
        <Reveal className="container h-band__copy" variant="left">
          <h2>{t('story.title')}</h2>
          <p>{t('story.p')}</p>
          <Link className="btn btn--primary" to="/san-pham">{t('story.cta')} <ArrowRight size={16} /></Link>
        </Reveal>
        <img className="h-band__img" src={images.slimArch} alt="" width={1000} height={1000} loading="lazy" />
      </section>

      <Audience />

      {/* Journal */}
      <section className="h-section h-section--tight">
        <div className="container">
          <Reveal className="h-journal-head">
            <div>
              <h2>{t('journal.title')}</h2>
              <p className="muted">{t('journal.desc')}</p>
            </div>
            <Link className="link" to="/song-dep">{t('journal.all')} →</Link>
          </Reveal>
          <div className="j2">
            <Reveal variant="left"><FeaturedPost post={posts[0]} /></Reveal>
            <div className="j2-side">
              {posts.slice(1, 4).map((p, i) => (
                <Reveal key={p.slug} variant="right" delay={i * 110}><SidePost post={p} /></Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="tu-van" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.68)), url(${images.heroBg})` }}>
        <Reveal className="container cta__in">
          <Leaf size={36} aria-hidden />
          <h2>{t('consult.title')}</h2>
          <p>{t('consult.desc')}</p>
          <div className="h-row">
            <a className="btn btn--leaf" href={`tel:${contact.tel}`}><Phone size={16} /> {contact.hotline}</a>
            <Link className="btn btn--outline-light" to="/lien-he">{t('consult.submit')} <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
