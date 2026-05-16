import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import LiveStatus from './components/LiveStatus.tsx';
import MenuSection from './components/MenuSection.tsx';
import Gallery from './components/Gallery.tsx';
import Testimonials from './components/Testimonials.tsx';
import Reservation from './components/Reservation.tsx';
import Newsletter from './components/Newsletter.tsx';
import Footer from './components/Footer.tsx';
import FloatingButtons from './components/FloatingButtons.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import LoginModal from './components/auth/LoginModal.tsx';
import SignupModal from './components/auth/SignupModal.tsx';
import ForgotPasswordModal from './components/auth/ForgotPasswordModal.tsx';
import MenuPage from './pages/MenuPage.tsx';
import OurStory from './pages/OurStory.tsx';
import Contact from './pages/Contact.tsx';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <CartProvider>
      <div className="min-h-screen" style={{ background: '#F5F0E8' }}>
        <Navbar forceDark={currentPath === '/menu' || currentPath === '/our-story' || currentPath === '/contact'} />
        
        {currentPath === '/' && (
          <>
            <Hero />
            <LiveStatus />
            <MenuSection />
            <Gallery />
            <Testimonials />
            <Reservation />
            <Newsletter />
          </>
        )}
        
        {currentPath === '/menu' && <MenuPage />}
        {currentPath === '/our-story' && <OurStory />}
        {currentPath === '/contact' && <Contact />}
        
        <Footer />
        <FloatingButtons />
        <CartSidebar />
        
        {currentPath === '/login' && (
          <LoginModal onClose={() => navigate('/')} onNavigate={navigate} />
        )}
        {currentPath === '/signup' && (
          <SignupModal onClose={() => navigate('/')} onNavigate={navigate} />
        )}
        {currentPath === '/forgot-password' && (
          <ForgotPasswordModal onClose={() => navigate('/')} onNavigate={navigate} />
        )}
      </div>
    </CartProvider>
  );
}

export default App;
