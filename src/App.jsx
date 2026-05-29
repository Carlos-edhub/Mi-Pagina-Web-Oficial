import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

import Header from './components/Header';
import Footer from './components/Footer';
import PromotionalBar from './components/PromotionalBar';
import Home from './pages/Home';

const ShopPage = lazy(() => import('./pages/ShopPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const LoyaltyPage = lazy(() => import('./pages/LoyaltyPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div className="page-loading" />}>{children}</Suspense>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <ToastProvider>
          <PromotionalBar />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<SuspenseWrapper><ShopPage /></SuspenseWrapper>} />
            <Route path="/categoria/:slug" element={<SuspenseWrapper><CategoryPage /></SuspenseWrapper>} />
            <Route path="/producto/:id" element={<SuspenseWrapper><ProductDetailPage /></SuspenseWrapper>} />
            <Route path="/carrito" element={<SuspenseWrapper><CartPage /></SuspenseWrapper>} />
            <Route path="/nosotros" element={<SuspenseWrapper><AboutPage /></SuspenseWrapper>} />
            <Route path="/contacto" element={<SuspenseWrapper><ContactPage /></SuspenseWrapper>} />
            <Route path="/servicios" element={<SuspenseWrapper><ServicesPage /></SuspenseWrapper>} />
            <Route path="/blog" element={<SuspenseWrapper><BlogPage /></SuspenseWrapper>} />
            <Route path="/blog/:id" element={<SuspenseWrapper><BlogArticlePage /></SuspenseWrapper>} />
            <Route path="/fidelidad" element={<SuspenseWrapper><LoyaltyPage /></SuspenseWrapper>} />
          </Routes>
          <Footer />
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
