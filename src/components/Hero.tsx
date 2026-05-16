import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current || !overlayRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.4}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Background layer (parallax) */}
      <div
        ref={heroRef}
        className="absolute inset-0 scale-100 will-change-transform"
        style={{ top: '0', height: '100%' }}
      >
        {isMobile ? (
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85&auto=format&fit=crop"
            alt="Fine dining"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85&auto=format&fit=crop"
          >
            <source
              src="https://vamwyouzculrmxlxqkwe.supabase.co/storage/v1/object/public/hero-portfolio-video/hero-video.mp4"
              type="video/mp4"
            />
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85&auto=format&fit=crop"
              alt="Fine dining"
              className="w-full h-full object-cover"
            />
          </video>
        )}
      </div>

      {/* Top gradient for navbar readability */}
      <div
        className="absolute top-0 left-0 right-0 h-full pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,18,10,0.7) 0%, transparent 40%)',
        }}
      />

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(12,19,13,0.25) 0%, rgba(12,19,13,0.35) 60%, rgba(12,19,13,0.55) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Headline */}
        <h1
          className="text-white mb-6 leading-none"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}
        >
          Crafted for
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>the Senses</em>
        </h1>

        {/* Sub */}
        <p
          className="text-white/90 max-w-md mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300, fontSize: '1rem' }}
        >
          A seasonal kitchen rooted in forest-to-table philosophy,<br className="hidden md:block" />
          where every dish tells the story of the land.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            className="group relative overflow-hidden border border-white text-white px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
            style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.2em', fontSize: '0.72rem' }}
          >
            <span className="relative z-10">View Our Menu</span>
          </a>
          <a
            href="#reservations"
            className="group relative overflow-hidden bg-[#C17A3A] hover:bg-[#A66932] text-white px-8 py-3.5 text-xs tracking-widest uppercase transition-all duration-300 w-full sm:w-auto text-center hover:shadow-xl hover:shadow-[#C17A3A]/30"
            style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.2em', fontSize: '0.72rem' }}
          >
            Reserve a Table
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
