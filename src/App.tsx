import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { I18nProvider, useI18n } from './i18n'
import { CartProvider } from './state/cart'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import { Contact, Faq, NotFound, Policy } from './pages/Static'

const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const CartPage = lazy(() => import('./pages/CartPage'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderDone = lazy(() => import('./pages/OrderDone'))
const Journal = lazy(() => import('./pages/Journal'))
const PostPage = lazy(() => import('./pages/PostPage'))
const About = lazy(() => import('./pages/About'))

function Loading() {
  const { t } = useI18n()
  return <p className="container center section" role="status">{t('status.loading')}</p>
}

export default function App() {
  return (
    <I18nProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="san-pham" element={<Products />} />
                <Route path="san-pham/:slug" element={<ProductDetail />} />
                <Route path="combo" element={<Navigate to="/san-pham#combo" replace />} />
                <Route path="gio-hang" element={<CartPage />} />
                <Route path="thanh-toan" element={<Checkout />} />
                <Route path="dat-hang-thanh-cong/:code" element={<OrderDone />} />
                <Route path="song-dep" element={<Journal />} />
                <Route path="song-dep/:slug" element={<PostPage />} />
                <Route path="gioi-thieu" element={<About />} />
                <Route path="lien-he" element={<Contact />} />
                <Route path="faq" element={<Faq />} />
                <Route path="chinh-sach/:id" element={<Policy />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </I18nProvider>
  )
}
