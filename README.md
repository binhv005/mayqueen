# MayqueenSlim Official – frontend

React + Vite + TypeScript. Chạy: `npm install && npm run dev` (build: `npm run build`).

- Dữ liệu sản phẩm/combo/liên hệ: `src/data/catalog.ts` — **giá đang để `null`**, điền giá thật khi có.
- Bài viết (bản nháp trung tính), FAQ, chính sách: `src/data/content.ts`.
- Chuỗi giao diện VI/EN: `src/i18n/vi.ts`, `src/i18n/en.ts`.
- Ảnh: `src/assets/img` (5 ảnh gốc độ phân giải cao từ thư mục AnhSanPham).
- Đơn hàng và form tư vấn: nếu chưa đặt `VITE_API_URL` (xem `.env.example`) thì chỉ lưu localStorage (chế độ demo). Backend (Express/MongoDB, dashboard) chưa được xây dựng.
