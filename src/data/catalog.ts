import type { Localized } from '../i18n'
import slimHero from '../assets/img/slim-hero.jpg'
import slimArch from '../assets/img/slim-arch.jpg'
import slimBox from '../assets/img/slim-box.jpg'
import yodetoxGift from '../assets/img/yodetox-gift.jpg'
import yodetoxStone from '../assets/img/yodetox-stone.jpg'
import heroBg from '../assets/img/hero-bg.jpg'
import pSlim2 from '../assets/img/p-slim-2.jpg'
import pSlim3 from '../assets/img/p-slim-3.jpg'
import pYo2 from '../assets/img/p-yodetox-2.jpg'
import pYo3 from '../assets/img/p-yodetox-3.jpg'
import pYoGift from '../assets/img/p-yodetox-gift.jpg'
import pFamily from '../assets/img/p-family.jpg'

export const images = { slimHero, slimArch, slimBox, yodetoxGift, yodetoxStone, heroBg, pSlim2, pSlim3, pYo2, pYo3, pYoGift, pFamily }

/**
 * TODO(admin): prices, ingredients, directions and warnings are NOT provided yet.
 * `price: null` makes the UI show "contact for price" and keeps cart totals as "to be confirmed".
 * Fill these in from official documents before going live.
 */
export interface Product {
  id: string
  slug: string
  name: string
  category: 'supplement'
  /** product line used by the shop filters */
  line: 'slim' | 'yodetox' | 'set'
  price: number | null
  image: string
  gallery: { src: string; alt: Localized }[]
  type: Localized
  pack: Localized
  short: Localized
  long: Localized
  packText?: Localized
}

export const products: Product[] = [
  {
    id: 'mayqueen-slim',
    slug: 'mayqueen-slim',
    name: 'Mayqueen Slim',
    category: 'supplement',
    line: 'slim',
    price: 590000,
    image: images.slimBox,
    gallery: [
      { src: images.slimBox, alt: { vi: 'Hộp Mayqueen Slim trên nền nắng và lá cây', en: 'Mayqueen Slim box in dappled sunlight with leaves' } },
      { src: images.slimArch, alt: { vi: 'Lọ và hộp Mayqueen Slim trên bục trắng', en: 'Mayqueen Slim bottle and box on a white podium' } },
      { src: images.slimHero, alt: { vi: 'Mayqueen Slim trên bục tròn, nền kính xanh nhạt', en: 'Mayqueen Slim on a round podium with pale green glass backdrop' } },
    ],
    type: { vi: 'Thực phẩm bảo vệ sức khỏe', en: 'Health supplement' },
    pack: { vi: '1 lọ 30 viên', en: '1 bottle, 30 capsules' },
    short: {
      vi: 'Sản phẩm đồng hành cùng thói quen sống cân bằng, đóng lọ 30 viên.',
      en: 'A companion to a balanced lifestyle, packed as a 30-capsule bottle.',
    },
    long: {
      vi: 'Mayqueen Slim là thực phẩm bảo vệ sức khỏe dành cho người quan tâm đến vóc dáng và lối sống cân bằng. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Hãy kết hợp chế độ ăn uống, vận động hợp lý và tham khảo ý kiến chuyên gia y tế khi cần.',
      en: 'Mayqueen Slim is a health supplement for people who care about their figure and a balanced lifestyle. It is not a medicine and is not a substitute for medical treatment. Combine it with sensible eating and exercise, and consult a health professional when needed.',
    },
    packText: {
      vi: 'Thực phẩm bảo vệ sức khỏe · Hỗ trợ tăng cường chuyển hóa chất béo & hỗ trợ giảm béo · 1 lọ 30 viên',
      en: 'Health supplement · "Supports fat metabolism & supports fat reduction" (as printed, Vietnamese) · 1 bottle, 30 capsules',
    },
  },
  {
    id: 'yodetox',
    slug: 'yodetox',
    name: 'Yodetox Extra',
    category: 'supplement',
    line: 'yodetox',
    price: 390000,
    image: images.yodetoxStone,
    gallery: [
      { src: images.yodetoxStone, alt: { vi: 'Hai hộp Yo Detox Extra trên đá giữa cây xanh', en: 'Two Yo Detox Extra boxes on stone among greenery' } },
      { src: images.yodetoxGift, alt: { vi: 'Hai hộp Yo Detox Extra trong hộp quà xanh', en: 'Two Yo Detox Extra boxes in a green gift box' } },
    ],
    type: { vi: 'Thực phẩm bổ sung', en: 'Food supplement' },
    pack: { vi: 'Hộp 20 gói', en: 'Box of 20 sachets' },
    short: {
      vi: 'Thức uống dạng gói tiện lợi, hộp 20 gói, dành cho nhịp sống bận rộn.',
      en: 'A convenient sachet drink in a 20-sachet box for busy days.',
    },
    long: {
      vi: 'Yo Detox Extra là thực phẩm bổ sung dạng gói, đóng hộp 20 gói. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Thông tin thành phần và hướng dẫn sử dụng sẽ được cập nhật theo nhãn sản phẩm chính thức.',
      en: 'Yo Detox Extra is a food supplement in sachets, packed as a box of 20. It is not a medicine and is not a substitute for medical treatment. Ingredient and usage information will be added from the official product label.',
    },
    packText: {
      vi: 'Thực phẩm bổ sung · Hộp 20 gói',
      en: 'Food supplement · Box of 20 sachets',
    },
  },
  {
    id: 'mayqueen-slim-combo-2',
    slug: 'mayqueen-slim-combo-2',
    name: 'Mayqueen Slim – Combo 2 lọ',
    category: 'supplement',
    line: 'slim',
    price: 1120000,
    image: images.pSlim2,
    gallery: [{ src: images.pSlim2, alt: { vi: 'Lọ và hộp Mayqueen Slim trên bục trắng', en: 'Mayqueen Slim bottle and box on a white podium' } }],
    type: { vi: 'Thực phẩm bảo vệ sức khỏe', en: 'Health supplement' },
    pack: { vi: '2 lọ × 30 viên', en: '2 bottles × 30 capsules' },
    short: { vi: 'Hai lọ Mayqueen Slim trong một lần đặt hàng, tiện cho người dùng đều đặn.', en: 'Two bottles of Mayqueen Slim in a single order, handy for regular use.' },
    long: {
      vi: 'Thực phẩm bảo vệ sức khỏe, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Hãy kết hợp chế độ ăn uống, vận động hợp lý và tham khảo ý kiến chuyên gia y tế khi cần.',
      en: 'A health supplement, not a medicine and not a substitute for medical treatment. Combine it with sensible eating and exercise, and consult a health professional when needed.',
    },
  },
  {
    id: 'mayqueen-slim-combo-3',
    slug: 'mayqueen-slim-combo-3',
    name: 'Mayqueen Slim – Combo 3 lọ',
    category: 'supplement',
    line: 'slim',
    price: 1650000,
    image: images.pSlim3,
    gallery: [{ src: images.pSlim3, alt: { vi: 'Hộp Mayqueen Slim cận cảnh', en: 'Close-up of the Mayqueen Slim box' } }],
    type: { vi: 'Thực phẩm bảo vệ sức khỏe', en: 'Health supplement' },
    pack: { vi: '3 lọ × 30 viên', en: '3 bottles × 30 capsules' },
    short: { vi: 'Ba lọ Mayqueen Slim, phù hợp khi bạn muốn chuẩn bị sẵn cho cả quý.', en: 'Three bottles of Mayqueen Slim for when you want to stock up.' },
    long: {
      vi: 'Thực phẩm bảo vệ sức khỏe, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Hãy kết hợp chế độ ăn uống, vận động hợp lý và tham khảo ý kiến chuyên gia y tế khi cần.',
      en: 'A health supplement, not a medicine and not a substitute for medical treatment. Combine it with sensible eating and exercise, and consult a health professional when needed.',
    },
  },
  {
    id: 'yodetox-combo-2',
    slug: 'yodetox-combo-2',
    name: 'Yodetox Extra – Combo 2 hộp',
    category: 'supplement',
    line: 'yodetox',
    price: 760000,
    image: images.pYo2,
    gallery: [{ src: images.pYo2, alt: { vi: 'Hộp Yo Detox Extra trên bục đá', en: 'Yo Detox Extra box on a stone podium' } }],
    type: { vi: 'Thực phẩm bổ sung', en: 'Food supplement' },
    pack: { vi: '2 hộp × 20 gói', en: '2 boxes × 20 sachets' },
    short: { vi: 'Hai hộp Yodetox Extra dạng gói, tiện mang theo cho nhịp sống bận rộn.', en: 'Two boxes of Yodetox Extra sachets, easy to carry on busy days.' },
    long: {
      vi: 'Thực phẩm bổ sung, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Thông tin thành phần và hướng dẫn sử dụng theo nhãn sản phẩm chính thức.',
      en: 'A food supplement, not a medicine and not a substitute for medical treatment. Ingredient and usage information follow the official product label.',
    },
  },
  {
    id: 'yodetox-combo-3',
    slug: 'yodetox-combo-3',
    name: 'Yodetox Extra – Combo 3 hộp',
    category: 'supplement',
    line: 'yodetox',
    price: 1120000,
    image: images.pYo3,
    gallery: [{ src: images.pYo3, alt: { vi: 'Hộp Yo Detox Extra cận cảnh', en: 'Close-up of the Yo Detox Extra box' } }],
    type: { vi: 'Thực phẩm bổ sung', en: 'Food supplement' },
    pack: { vi: '3 hộp × 20 gói', en: '3 boxes × 20 sachets' },
    short: { vi: 'Ba hộp Yodetox Extra dạng gói cho nhu cầu dùng lâu dài.', en: 'Three boxes of Yodetox Extra sachets for longer-term use.' },
    long: {
      vi: 'Thực phẩm bổ sung, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Thông tin thành phần và hướng dẫn sử dụng theo nhãn sản phẩm chính thức.',
      en: 'A food supplement, not a medicine and not a substitute for medical treatment. Ingredient and usage information follow the official product label.',
    },
  },
  {
    id: 'hop-qua-yodetox',
    slug: 'hop-qua-yodetox',
    name: 'Hộp quà Yodetox Extra',
    category: 'supplement',
    line: 'set',
    price: 820000,
    image: images.pYoGift,
    gallery: [{ src: images.pYoGift, alt: { vi: 'Yo Detox Extra trong hộp quà xanh', en: 'Yo Detox Extra in a green gift box' } }],
    type: { vi: 'Thực phẩm bổ sung', en: 'Food supplement' },
    pack: { vi: '2 hộp × 20 gói trong hộp quà', en: '2 boxes × 20 sachets in a gift box' },
    short: { vi: 'Hai hộp Yodetox Extra trong hộp quà màu xanh, phù hợp để tặng người thân.', en: 'Two boxes of Yodetox Extra in a green gift box, ideal as a present.' },
    long: {
      vi: 'Thực phẩm bổ sung, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Thông tin thành phần và hướng dẫn sử dụng theo nhãn sản phẩm chính thức.',
      en: 'A food supplement, not a medicine and not a substitute for medical treatment. Ingredient and usage information follow the official product label.',
    },
  },
  {
    id: 'bo-doi-gia-dinh',
    slug: 'bo-doi-gia-dinh',
    name: 'Bộ đôi gia đình Mayqueen',
    category: 'supplement',
    line: 'set',
    price: 1850000,
    image: images.pFamily,
    gallery: [{ src: images.pFamily, alt: { vi: 'Lọ Mayqueen Slim và hộp trên bục rêu giữa đồi xanh', en: 'Mayqueen Slim bottle and box on a mossy stone among green hills' } }],
    type: { vi: 'Thực phẩm bảo vệ sức khỏe', en: 'Health supplement' },
    pack: { vi: '2 lọ Mayqueen Slim + 2 hộp Yodetox Extra', en: '2 bottles Mayqueen Slim + 2 boxes Yodetox Extra' },
    short: { vi: 'Bộ đôi Mayqueen Slim và Yodetox Extra gấp đôi số lượng, dành cho cả gia đình.', en: 'Double the Mayqueen Slim and Yodetox Extra pairing, made for the whole family.' },
    long: {
      vi: 'Thực phẩm bảo vệ sức khỏe, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Hãy kết hợp chế độ ăn uống, vận động hợp lý và tham khảo ý kiến chuyên gia y tế khi cần.',
      en: 'A health supplement, not a medicine and not a substitute for medical treatment. Combine it with sensible eating and exercise, and consult a health professional when needed.',
    },
  },
]

export interface Combo {
  id: string
  name: Localized
  items: { productId: string; qty: number }[]
  price: number | null
  image: string
}

export const combos: Combo[] = [
  {
    id: 'combo-slim-yodetox',
    name: { vi: 'Combo Mayqueen Slim + Yodetox', en: 'Mayqueen Slim + Yodetox Combo' },
    items: [
      { productId: 'mayqueen-slim', qty: 1 },
      { productId: 'yodetox', qty: 1 },
    ],
    price: 930000,
    image: images.yodetoxGift,
  },
]

export const getProduct = (idOrSlug: string) => products.find((p) => p.id === idOrSlug || p.slug === idOrSlug)

export const contact = {
  brand: 'MayqueenSlim Official',
  person: 'Phan Tiến Đại',
  hotline: '039 5057 364',
  tel: '+84395057364',
  facebook: 'https://www.facebook.com/profile.php?id=61586783311362',
  messenger: 'https://m.me/61586783311362',
  maps: 'https://maps.app.goo.gl/eoVXPYNVaPmcASwV8',
}
