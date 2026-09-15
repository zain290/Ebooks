import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import FixedCTA from './components/FixedCTA';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function MainRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [routeLoading, setRouteLoading] = useState(false);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'theme-light', 'theme-dark');
    root.classList.add(theme);
    root.classList.add(`theme-${theme}`);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      setRouteLoading(false);
      return;
    }
    setRouteLoading(true);
    const timer = window.setTimeout(() => { setRouteLoading(false); }, 150);
    return () => window.clearTimeout(timer);
  }, [routeKey]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const showPageLoader = routeLoading;

  return (
    <>
      <PageLoader visible={showPageLoader} theme={theme} />
      <ScrollToTop />
      <div className="bg-background text-text min-h-screen transition-colors duration-500 selection:bg-primary selection:text-white w-full">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <main className="w-full">
          <MainRoutes />
        </main>
        {!isMobile && <Footer theme={theme} />}
        <FixedCTA />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;