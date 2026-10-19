import type { Localized } from '../i18n'
import { images } from './catalog'

export interface PostSection {
  heading: Localized
  body: Localized
  /** optional bullet / step list rendered under the paragraph */
  items?: Localized[]
  ordered?: boolean
}
export interface Post {
  slug: string
  category: Localized
  catId: string
  title: Localized
  excerpt: Localized
  intro: Localized
  date: string
  minutes: number
  cover: string
  coverAlt: Localized
  sections: PostSection[]
}

/**
 * TODO(admin): placeholder editorial drafts written in neutral wording (no health claims).
 * Review, edit or replace them before publishing; they are flagged as drafts in the UI.
 */
export const posts: Post[] = [
  {
    slug: 'thoi-quen-buoi-sang-nhe-nhang',
    catId: 'habits',
    category: { vi: 'Thói quen sống khỏe', en: 'Healthy habits' },
    title: { vi: 'Bắt đầu buổi sáng nhẹ nhàng hơn với ba thói quen nhỏ', en: 'Start the morning gently with three small habits' },
    excerpt: { vi: 'Không cần thay đổi lớn, chỉ cần vài lựa chọn nhỏ lặp lại mỗi ngày.', en: 'No big overhaul needed, just a few small choices repeated daily.' },
    intro: {
      vi: 'Một buổi sáng nhẹ nhàng không cần kế hoạch cầu kỳ. Chỉ cần vài thói quen đơn giản, lặp lại đều đặn, bạn đã có thể bắt đầu ngày mới với tâm thế thoải mái hơn.',
      en: 'A gentle morning does not need an elaborate plan. A few simple habits, repeated regularly, can help you start the day feeling more at ease.',
    },
    date: '2026-10-01',
    minutes: 4,
    cover: images.slimHero,
    coverAlt: { vi: 'Ánh sáng buổi sáng và lá cây xanh', en: 'Morning light and green leaves' },
    sections: [
      {
        heading: { vi: 'Một ly nước ấm', en: 'A glass of warm water' },
        body: { vi: 'Uống nước sau khi thức dậy là cách đơn giản để bắt đầu ngày mới. Hãy đặt sẵn một ly nước cạnh giường để dễ nhớ.', en: 'Drinking water after waking up is a simple way to begin the day. Keep a glass by your bed so it is easy to remember.' },
      },
      {
        heading: { vi: 'Vài phút vận động', en: 'A few minutes of movement' },
        body: { vi: 'Bạn không cần một buổi tập dài. Năm đến mười phút vận động nhẹ cũng giúp cơ thể thoải mái hơn.', en: 'You do not need a long workout. Five to ten minutes of light movement can help your body feel more comfortable.' },
        items: [
          { vi: 'Giãn cổ, vai và lưng', en: 'Stretch your neck, shoulders and back' },
          { vi: 'Xoay nhẹ các khớp tay, chân', en: 'Gently rotate your arm and leg joints' },
          { vi: 'Đi bộ chậm quanh nhà hoặc ngoài ban công', en: 'Take a slow walk around the house or on the balcony' },
        ],
      },
      {
        heading: { vi: 'Bữa sáng cân bằng', en: 'A balanced breakfast' },
        body: { vi: 'Kết hợp các nhóm thực phẩm theo khẩu vị và nhu cầu của bạn để bữa sáng đủ đầy mà không nặng nề.', en: 'Combine food groups to suit your taste and needs so breakfast feels satisfying without being heavy.' },
        items: [
          { vi: 'Tinh bột: bánh mì nguyên cám, yến mạch, cơm', en: 'Carbohydrates: wholegrain bread, oats, rice' },
          { vi: 'Đạm: trứng, sữa chua, đậu hũ', en: 'Protein: eggs, yoghurt, tofu' },
          { vi: 'Rau củ hoặc trái cây theo mùa', en: 'Vegetables or seasonal fruit' },
        ],
      },
      {
        heading: { vi: 'Giữ nhịp đều đặn', en: 'Keep a steady rhythm' },
        body: { vi: 'Điều quan trọng không phải là làm thật nhiều, mà là làm đều. Hãy bắt đầu với một thói quen, duy trì vài tuần rồi mới thêm thói quen tiếp theo.', en: 'What matters is not doing a lot but doing it consistently. Start with one habit, keep it up for a few weeks, then add the next.' },
      },
      {
        heading: { vi: 'Lưu ý nhỏ', en: 'A small note' },
        body: { vi: 'Nhu cầu của mỗi người khác nhau. Nếu bạn có vấn đề sức khỏe hoặc cần lời khuyên riêng, hãy tham khảo ý kiến chuyên gia y tế hoặc dinh dưỡng.', en: 'Everyone’s needs differ. If you have a health condition or need personal advice, please consult a medical or nutrition professional.' },
      },
    ],
  },
  {
    slug: 'eat-clean-cho-nguoi-ban-ron',
    catId: 'eatclean',
    category: { vi: 'Eat Clean', en: 'Eat Clean' },
    title: { vi: 'Eat clean cho người bận rộn: bắt đầu từ đâu?', en: 'Eat clean for busy people: where to start' },
    excerpt: { vi: 'Gợi ý chuẩn bị bữa ăn đơn giản, dễ duy trì trong tuần.', en: 'Simple meal-prep ideas that are easy to keep up through the week.' },
    intro: {
      vi: 'Eat clean không có nghĩa là phải ăn kiêng khắt khe. Với người bận rộn, đó đơn giản là ưu tiên thực phẩm tươi, ít chế biến và chuẩn bị trước để đỡ phải quyết định mỗi ngày.',
      en: 'Eating clean does not mean strict dieting. For busy people it simply means favouring fresh, minimally processed food and preparing ahead so there is less to decide each day.',
    },
    date: '2026-10-05',
    minutes: 5,
    cover: images.yodetoxStone,
    coverAlt: { vi: 'Bục đá giữa cây xanh', en: 'Stone podium among greenery' },
    sections: [
      {
        heading: { vi: 'Eat clean là gì?', en: 'What is eating clean?' },
        body: { vi: 'Hiểu đơn giản, eat clean là chọn thực phẩm gần với trạng thái tự nhiên nhất có thể: rau, trái cây, ngũ cốc nguyên hạt, nguồn đạm vừa đủ, và hạn chế đồ chế biến sẵn.', en: 'Put simply, eating clean is choosing food as close to its natural state as possible: vegetables, fruit, wholegrains, a fair amount of protein, and fewer ready-made products.' },
      },
      {
        heading: { vi: 'Lên kế hoạch trước', en: 'Plan ahead' },
        body: { vi: 'Chọn trước vài món quen thuộc để đỡ phải suy nghĩ mỗi ngày. Một danh sách đi chợ ngắn giúp bạn mua đúng và ít lãng phí hơn.', en: 'Pick a few familiar dishes so you do not have to decide every day. A short shopping list helps you buy what you need and waste less.' },
      },
      {
        heading: { vi: 'Ưu tiên nguyên liệu tươi', en: 'Favour fresh ingredients' },
        body: { vi: 'Rau xanh, trái cây theo mùa và nguồn đạm vừa đủ là nền tảng dễ áp dụng.', en: 'Leafy greens, seasonal fruit and a fair portion of protein are an easy base.' },
        items: [
          { vi: 'Mỗi bữa có ít nhất một loại rau', en: 'At least one vegetable at every meal' },
          { vi: 'Chọn trái cây theo mùa để ngon và dễ mua', en: 'Choose seasonal fruit for flavour and availability' },
          { vi: 'Thay dần đồ uống nhiều đường bằng nước lọc hoặc trà không đường', en: 'Gradually swap sugary drinks for water or unsweetened tea' },
        ],
      },
      {
        heading: { vi: 'Chuẩn bị theo lô', en: 'Prepare in batches' },
        body: { vi: 'Dành khoảng một giờ cuối tuần để sơ chế sẽ giúp bạn nấu nhanh hơn trong tuần.', en: 'Spending about an hour at the weekend on prep helps you cook faster during the week.' },
        ordered: true,
        items: [
          { vi: 'Rửa và cắt sẵn rau củ, bảo quản trong hộp kín', en: 'Wash and chop vegetables, store them in airtight boxes' },
          { vi: 'Luộc hoặc nướng sẵn nguồn đạm cho 2–3 bữa', en: 'Boil or bake protein for 2–3 meals' },
          { vi: 'Nấu một nồi ngũ cốc hoặc cơm để dùng dần', en: 'Cook a pot of grains or rice to use over several days' },
        ],
      },
      {
        heading: { vi: 'Đừng quá cầu toàn', en: 'Do not aim for perfect' },
        body: { vi: 'Sẽ có những ngày bạn ăn ngoài hoặc ăn vội. Điều đó hoàn toàn bình thường. Hãy quay lại nhịp quen thuộc ở bữa tiếp theo thay vì tự trách mình.', en: 'There will be days you eat out or eat in a hurry. That is perfectly normal. Return to your usual rhythm at the next meal instead of blaming yourself.' },
      },
    ],
  },
  {
    slug: 'cong-thuc-thuc-uong-thanh-mat',
    catId: 'drinks',
    category: { vi: 'Công thức đồ uống', en: 'Drink recipes' },
    title: { vi: 'Nước infused chanh bạc hà cho ngày nắng', en: 'Lemon-mint infused water for sunny days' },
    excerpt: { vi: 'Công thức ba nguyên liệu, làm trong năm phút.', en: 'A three-ingredient recipe ready in five minutes.' },
    intro: {
      vi: 'Nước infused là cách đơn giản để làm ly nước lọc thêm hương vị mà không cần thêm đường. Công thức chanh bạc hà dưới đây chỉ mất vài phút chuẩn bị.',
      en: 'Infused water is a simple way to add flavour to plain water without adding sugar. This lemon-mint recipe takes only a few minutes to prepare.',
    },
    date: '2026-10-09',
    minutes: 3,
    cover: images.yodetoxGift,
    coverAlt: { vi: 'Hộp quà xanh trên nền lụa', en: 'Green gift box on silk' },
    sections: [
      {
        heading: { vi: 'Nguyên liệu', en: 'Ingredients' },
        body: { vi: 'Công thức cho khoảng một lít nước:', en: 'Makes about one litre:' },
        items: [
          { vi: '1 quả chanh', en: '1 lemon' },
          { vi: '8–10 lá bạc hà tươi', en: '8–10 fresh mint leaves' },
          { vi: '1 lít nước lọc lạnh', en: '1 litre cold filtered water' },
          { vi: 'Đá viên (tùy thích)', en: 'Ice cubes (optional)' },
        ],
      },
      {
        heading: { vi: 'Cách làm', en: 'Method' },
        body: { vi: 'Chỉ cần bốn bước đơn giản:', en: 'Just four simple steps:' },
        ordered: true,
        items: [
          { vi: 'Rửa sạch chanh và bạc hà', en: 'Wash the lemon and mint' },
          { vi: 'Cắt chanh thành lát mỏng', en: 'Slice the lemon thinly' },
          { vi: 'Cho chanh và bạc hà vào bình, vò nhẹ lá bạc hà để tỏa hương', en: 'Add lemon and mint to a jug and lightly bruise the mint to release its aroma' },
          { vi: 'Rót nước lạnh, để trong tủ lạnh khoảng 30 phút rồi thưởng thức', en: 'Pour in cold water, chill for about 30 minutes, then enjoy' },
        ],
      },
      {
        heading: { vi: 'Biến tấu theo sở thích', en: 'Variations to try' },
        body: { vi: 'Bạn có thể thay đổi nguyên liệu để có hương vị mới:', en: 'Change the ingredients for a new flavour:' },
        items: [
          { vi: 'Dưa leo và bạc hà cho vị thanh mát', en: 'Cucumber and mint for a fresh taste' },
          { vi: 'Cam và vài lát gừng mỏng', en: 'Orange with a few thin slices of ginger' },
          { vi: 'Dâu hoặc việt quất cho màu sắc bắt mắt', en: 'Strawberries or blueberries for a pretty colour' },
        ],
      },
      {
        heading: { vi: 'Bảo quản', en: 'Storage' },
        body: { vi: 'Nên dùng trong ngày và giữ trong tủ lạnh. Nếu để quá lâu, bạn nên lọc bỏ phần chanh để nước không bị đắng.', en: 'Best enjoyed the same day and kept refrigerated. If left too long, strain out the lemon so the water does not turn bitter.' },
      },
      {
        heading: { vi: 'Lưu ý nhỏ', en: 'A small note' },
        body: { vi: 'Nếu bạn không hợp với một nguyên liệu nào đó, hãy bỏ qua hoặc thay thế bằng nguyên liệu khác.', en: 'If an ingredient does not agree with you, leave it out or swap it for another.' },
      },
    ],
  },
  {
    slug: 'dinh-duong-can-bang-moi-ngay',
    catId: 'nutrition',
    category: { vi: 'Dinh dưỡng cân bằng', en: 'Balanced nutrition' },
    title: { vi: 'Một đĩa ăn cân bằng trông như thế nào?', en: 'What does a balanced plate look like?' },
    excerpt: { vi: 'Cách hình dung khẩu phần ăn đơn giản, không cần cân đo phức tạp.', en: 'A simple way to picture a meal without complicated measuring.' },
    intro: {
      vi: 'Bạn không cần cân đo từng gram để ăn cân bằng. Chỉ cần hình dung chiếc đĩa của mình được chia thành các phần, bạn đã có một hướng dẫn dễ nhớ cho mỗi bữa ăn.',
      en: 'You do not need to weigh every gram to eat in a balanced way. Picture your plate divided into portions and you have an easy guide for every meal.',
    },
    date: '2026-10-12',
    minutes: 5,
    cover: images.slimArch,
    coverAlt: { vi: 'Bục trắng và nền xanh nhạt', en: 'White podium on a pale green backdrop' },
    sections: [
      {
        heading: { vi: 'Chia đĩa ăn', en: 'Divide the plate' },
        body: { vi: 'Một cách hình dung phổ biến: một nửa đĩa là rau và trái cây, một phần tư là nguồn đạm, một phần tư là tinh bột.', en: 'A popular way to picture it: half the plate vegetables and fruit, a quarter protein, a quarter carbohydrates.' },
      },
      {
        heading: { vi: 'Chọn nguồn đạm', en: 'Choose your protein' },
        body: { vi: 'Đạm có thể đến từ cả động vật và thực vật. Hãy đa dạng để bữa ăn thêm phong phú.', en: 'Protein can come from animals and plants alike. Vary it to keep meals interesting.' },
        items: [
          { vi: 'Cá, thịt nạc, trứng', en: 'Fish, lean meat, eggs' },
          { vi: 'Đậu hũ, đậu các loại', en: 'Tofu and legumes' },
          { vi: 'Sữa chua, phô mai ít béo', en: 'Yoghurt and lower-fat cheese' },
        ],
      },
      {
        heading: { vi: 'Chọn tinh bột', en: 'Choose your carbohydrates' },
        body: { vi: 'Ưu tiên các loại ngũ cốc nguyên hạt và khoai củ vì chúng thường giữ được nhiều chất xơ hơn.', en: 'Favour wholegrains and root vegetables as they usually keep more fibre.' },
      },
      {
        heading: { vi: 'Đừng quên rau và chất xơ', en: 'Do not forget vegetables and fibre' },
        body: { vi: 'Thêm rau nhiều màu sắc vào đĩa ăn để bữa ăn vừa đẹp mắt vừa đa dạng dưỡng chất. Rau sống, rau luộc hay xào nhẹ đều là lựa chọn tốt.', en: 'Add colourful vegetables to the plate so meals look good and offer a variety of nutrients. Raw, boiled or lightly stir-fried all work well.' },
      },
      {
        heading: { vi: 'Uống đủ nước', en: 'Stay hydrated' },
        body: { vi: 'Nước lọc, trà không đường hoặc nước infused là những lựa chọn đơn giản để bổ sung nước trong ngày.', en: 'Water, unsweetened tea or infused water are simple ways to keep up your fluids through the day.' },
      },
      {
        heading: { vi: 'Điều chỉnh theo bạn', en: 'Adjust to you' },
        body: { vi: 'Nhu cầu mỗi người khác nhau theo độ tuổi, mức độ vận động và tình trạng sức khỏe. Hãy hỏi chuyên gia dinh dưỡng nếu bạn cần lời khuyên riêng.', en: 'Needs vary with age, activity level and health. Ask a nutrition professional if you need personal advice.' },
      },
    ],
  },
]

export const postCategories: { id: string; label: Localized }[] = [
  { id: 'eatclean', label: { vi: 'Eat Clean', en: 'Eat Clean' } },
  { id: 'drinks', label: { vi: 'Công thức đồ uống', en: 'Drink recipes' } },
  { id: 'nutrition', label: { vi: 'Dinh dưỡng cân bằng', en: 'Balanced nutrition' } },
  { id: 'habits', label: { vi: 'Thói quen sống khỏe', en: 'Healthy habits' } },
]

export const faqs: { q: Localized; a: Localized }[] = [
  {
    q: { vi: 'Sản phẩm có phải là thuốc không?', en: 'Are the products medicines?' },
    a: { vi: 'Không. Đây là thực phẩm bảo vệ sức khỏe / thực phẩm bổ sung, không có tác dụng thay thế thuốc chữa bệnh.', en: 'No. They are health / food supplements and do not replace medical treatment.' },
  },
  {
    q: { vi: 'Tôi đặt hàng như thế nào?', en: 'How do I order?' },
    a: { vi: 'Thêm sản phẩm vào giỏ, vào trang thanh toán, điền thông tin nhận hàng. Chúng tôi sẽ liên hệ để xác nhận đơn.', en: 'Add products to the cart, go to checkout and fill in delivery details. We will contact you to confirm.' },
  },
  {
    q: { vi: 'Thanh toán bằng cách nào?', en: 'How can I pay?' },
    a: { vi: 'Hiện hỗ trợ thanh toán khi nhận hàng (COD). Các phương thức khác sẽ được thông báo khi sẵn sàng.', en: 'Currently cash on delivery (COD). Other methods will be announced when available.' },
  },
  {
    q: { vi: 'Tôi cần tư vấn thêm về sản phẩm?', en: 'I need more advice about a product.' },
    a: { vi: 'Gọi hotline 039 5057 364 hoặc gửi yêu cầu tư vấn trên trang chủ.', en: 'Call the hotline 039 5057 364 or send a consultation request from the home page.' },
  },
]

export const policies: Record<string, { title: Localized; body?: Localized }> = {
  'privacy': { title: { vi: 'Chính sách quyền riêng tư', en: 'Privacy policy' } },
  'terms': { title: { vi: 'Điều khoản sử dụng', en: 'Terms of use' } },
  'shipping': { title: { vi: 'Chính sách giao hàng', en: 'Shipping policy' } },
  'returns': { title: { vi: 'Chính sách đổi trả', en: 'Return policy' } },
  'payment': { title: { vi: 'Chính sách thanh toán', en: 'Payment policy' } },
  'how-to-order': { title: { vi: 'Hướng dẫn đặt hàng', en: 'How to order' } },
  'responsible-entity': { title: { vi: 'Thông tin đơn vị chịu trách nhiệm', en: 'Responsible entity' } },
  'disclosures': { title: { vi: 'Thông tin công bố sản phẩm', en: 'Product disclosures' } },
}
