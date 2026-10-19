import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n'
import type { Localized } from '../i18n'
import { contact, images, products } from '../data/catalog'
import { Facebook } from '../components/Icons'
import logo from '../assets/img/logo.png'
import { Reveal } from '../components/Reveal'
import { useTitle } from '../useTitle'

const promises: Localized[] = [
  { vi: 'Không cam kết giảm cân cấp tốc hay kết quả cụ thể trong một khoảng thời gian.', en: 'No promises of rapid weight loss or specific results within a set time.' },
  { vi: 'Sản phẩm là thực phẩm bảo vệ sức khỏe / thực phẩm bổ sung, không phải là thuốc và không thay thế thuốc chữa bệnh.', en: 'Our products are health / food supplements, not medicines, and do not replace medical treatment.' },
  { vi: 'Không dùng lời chứng thực, số liệu bán hàng hay đánh giá không có thật.', en: 'No made-up testimonials, sales figures or reviews.' },
  { vi: 'Thành phần, hướng dẫn sử dụng, cảnh báo và giấy công bố chỉ được đăng sau khi đối chiếu hồ sơ chính thức.', en: 'Ingredients, directions, warnings and registrations are published only after checking official documents.' },
]

export default function About() {
  const { t, tr } = useI18n()
  useTitle(t('about.title'), t('brand.tagline'))

  return (
    <>
      <section className="ab-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.6)), url(${images.slimHero})` }}>
        <div className="container">
          <span className="eyebrow">MayqueenSlim Official</span>
          <h1>{t('about.title')}</h1>
          <p>“{t('brand.tagline')}”</p>
        </div>
      </section>

      <section className="ab-section">
        <div className="container ab-split">
          <Reveal variant="left">
            <h2>{tr({ vi: 'Câu chuyện thương hiệu', en: 'Our story' })}</h2>
            <p>{tr({
              vi: 'MayqueenSlim Official là thương hiệu D2C Wellness dành cho người trẻ yêu thích chăm sóc bản thân, dinh dưỡng cân bằng và phong cách sống lành mạnh.',
              en: 'MayqueenSlim Official is a D2C wellness brand for young people who love self-care, balanced nutrition and a healthy lifestyle.',
            })}</p>
            <p>{tr({
              vi: 'Chúng tôi tin rằng chăm sóc bản thân không cần những thay đổi quá lớn. Đó có thể bắt đầu từ những lựa chọn nhỏ mỗi ngày: một bữa ăn cân bằng hơn, một buổi vận động nhẹ nhàng, hay một sản phẩm đồng hành phù hợp.',
              en: 'We believe self-care does not need big changes. It can begin with small daily choices: a more balanced meal, a gentle workout, or a companion product that suits you.',
            })}</p>
            <p>{tr({
              vi: 'Giọng điệu của chúng tôi tích cực, gần gũi và tinh tế. Chúng tôi truyền cảm hứng nhưng không phóng đại công dụng sản phẩm.',
              en: 'Our voice is positive, warm and refined. We inspire without overstating what our products can do.',
            })}</p>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <img className="ab-img" src={images.slimBox} alt={tr({ vi: 'Hộp Mayqueen Slim dưới nắng và lá cây', en: 'Mayqueen Slim box in sunlight with leaves' })} width={900} height={900} loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="ab-section">
        <div className="container">
          <Reveal className="ab-head">
            <h2>{tr({ vi: 'Sản phẩm của chúng tôi', en: 'Our products' })}</h2>
            <p>{tr({ vi: 'Hai dòng sản phẩm hiện có tại MayqueenSlim Official.', en: 'The two product lines currently offered by MayqueenSlim Official.' })}</p>
          </Reveal>
          <div className="ab-products">
            {products.slice(0, 2).map((p, i) => (
              <Reveal key={p.id} variant={i ? 'right' : 'left'} className="ab-product">
                <img src={p.image} alt={tr(p.gallery[0].alt)} width={600} height={600} loading="lazy" />
                <div>
                  <span className="eyebrow">{tr(p.type)}</span>
                  <h3>{p.name}</h3>
                  <p>{tr(p.short)}</p>
                  <p className="muted small">{t('product.pack')}: {tr(p.pack)}</p>
                  <Link className="btn btn--ghost btn--sm" to={`/san-pham/${p.slug}`}>{t('product.detail')} <ArrowRight size={14} /></Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-section ab-section--green">
        <div className="container">
          <Reveal className="ab-pledge__head">
            <ShieldCheck size={34} aria-hidden />
            <h2>{tr({ vi: 'Cam kết về thông tin', en: 'Our commitment to honesty' })}</h2>
            <p>{tr({
              vi: 'Vì sản phẩm liên quan đến vóc dáng và sức khỏe, chúng tôi đặt sự trung thực lên hàng đầu.',
              en: 'Because our products relate to figure and health, we put honesty first.',
            })}</p>
          </Reveal>
          <ol className="ab-pledge">
            {promises.map((p, i) => (
              <Reveal as="li" key={p.en} delay={i * 90}>
                <img className="ab-pledge__logo" src={logo} alt="" width={44} height={44} />
                <p>{tr(p)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="ab-section">
        <Reveal className="container ab-contact">
          <div>
            <h2>{tr({ vi: 'Kết nối với chúng tôi', en: 'Get in touch' })}</h2>
            <p>{tr({ vi: 'Bạn cần hỗ trợ chọn sản phẩm hoặc tìm hiểu thêm về thương hiệu? Hãy liên hệ, chúng tôi luôn sẵn lòng lắng nghe.', en: 'Need help choosing a product or want to know more about the brand? Reach out, we are happy to listen.' })}</p>
            <ul className="ab-contact__list">
              <li><Phone size={16} /> <a href={`tel:${contact.tel}`}>{contact.hotline}</a> <span className="muted">({contact.person})</span></li>
              <li><MapPin size={16} /> {t('contact.addressVal')}</li>
              <li><Facebook size={16} /> <a href={contact.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
          <div className="h-row">
            <Link className="btn btn--primary" to="/lien-he">{t('nav.contact')} <ArrowRight size={16} /></Link>
            <Link className="btn btn--ghost" to="/san-pham">{t('hero.cta1')}</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
