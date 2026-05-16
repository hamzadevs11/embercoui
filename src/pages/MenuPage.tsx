import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Plus, Check, Search, ArrowLeft } from 'lucide-react';
import { categories, menuItems, MenuItem } from '../data/menu.ts';
import { useCart } from '../context/CartContext.tsx';

const filters = ['All', 'Vegan', 'Spicy', 'Gluten Free'];

// ─── Dietary tag helper (pure, defined outside component) ────────────────────
function getDietaryTags(item: MenuItem): string[] {
  const tags: string[] = [];
  const desc = item.description.toLowerCase();
  if (desc.includes('plant-based') || desc.includes('vegan') || item.id === 3 || item.id === 11) tags.push('Vegan');
  if (desc.includes('pepper') || item.id === 8) tags.push('Spicy');
  if (item.id === 12 || item.id === 15) tags.push('Gluten Free');
  return tags;
}

/* ─── Scroll reveal hook ─────────────────────────────────────────────────── */
import { useRef } from 'react';
function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let obs: IntersectionObserver;
    let raf2: number;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => el.classList.add('c-visible'), delay);
              obs.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        obs.observe(el);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      obs?.disconnect();
    };
  }, [delay]);
  return ref;
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
const SkeletonCard = memo(() => (
  <div className="overflow-hidden flex flex-col animate-pulse" style={{ background: '#1C2B1E' }}>
    <div className="h-52 flex-shrink-0" style={{ background: '#0D1A0E' }} />
    <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="flex justify-between gap-3">
        <div className="h-5 rounded w-2/3" style={{ background: 'rgba(245,240,232,0.1)' }} />
        <div className="h-5 rounded w-12" style={{ background: 'rgba(245,240,232,0.1)' }} />
      </div>
      <div className="space-y-2 flex-1">
        <div className="h-3 rounded w-full" style={{ background: 'rgba(245,240,232,0.05)' }} />
        <div className="h-3 rounded w-5/6" style={{ background: 'rgba(245,240,232,0.05)' }} />
        <div className="h-3 rounded w-3/4" style={{ background: 'rgba(245,240,232,0.05)' }} />
      </div>
      <div className="h-11 rounded-none mt-auto" style={{ background: 'rgba(245,240,232,0.1)' }} />
    </div>
  </div>
));

// ─── Memoised menu card ───────────────────────────────────────────────────────
const MenuCard = memo(({ item, isAdded, onAdd, index }: {
  item: MenuItem;
  isAdded: boolean;
  onAdd: (item: MenuItem) => void;
  index: number;
}) => {
  const tags = useMemo(() => getDietaryTags(item), [item]);
  const ref = useReveal<HTMLDivElement>((index % 3) * 100);

  return (
    <div ref={ref} className="c-hidden group overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1" style={{ background: '#1C2B1E', border: '1px solid rgba(245,240,232,0.05)' }}>
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="text-[#F5F0E8] text-xl leading-tight tracking-wide"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            {item.name}
          </h3>
          <span
            className="text-[#C17A3A] font-medium text-base flex-shrink-0"
            style={{ fontFamily: 'Jost, sans-serif' }}
          >
            ${item.price}
          </span>
        </div>
        <p
          className="text-[#F5F0E8]/60 text-[0.85rem] leading-relaxed mb-6 flex-1 font-light"
          style={{ fontFamily: 'Jost, sans-serif' }}
        >
          {item.description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#0D1A0E] text-[#C17A3A] text-[9px] uppercase tracking-[0.2em] font-medium border border-[#C17A3A]/20"
                style={{ fontFamily: 'Jost, sans-serif' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => onAdd(item)}
          className={`mt-auto w-full flex items-center justify-center gap-[8px] px-[20px] py-[14px] rounded-none uppercase transition-all duration-300 ease-out border ${
            isAdded
              ? 'bg-[#2E7D32] border-[#2E7D32] text-[#F5F0E8]'
              : 'bg-transparent text-[#C17A3A] border-[#C17A3A]/30 hover:bg-[#C17A3A] hover:border-[#C17A3A] hover:text-white'
          }`}
          style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.15em', fontSize: '10px' }}
        >
          {isAdded ? (
            <><Check size={14} /> Added</>
          ) : (
            <><Plus size={14} /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
});

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [added, setAdded] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate a brief loading state so skeletons are visible on page mount
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleAdd = useCallback((item: MenuItem) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1500);
  }, [addItem]);

  const handleNavigateHome = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  }, []);

  // ── Memoised filter ─────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) {
          return false;
        }
      }

      if (activeFilter !== 'All') {
        const tags = getDietaryTags(item);
        if (!tags.includes(activeFilter)) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, activeFilter]);

  return (
    <>
      <style>{`
        .c-hidden {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1),
                      transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .c-visible { opacity: 1 !important; transform: none !important; }
      `}</style>
      <div className="min-h-screen bg-[#0D1A0E] pt-[80px]">
        
        {/* HEADER */}
      <header className="bg-[#1C2B1E] w-full pt-20 pb-24 relative px-6 border-b border-[#C17A3A]/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <a
            href="/"
            onClick={handleNavigateHome}
            className="inline-flex items-center gap-2 text-[#C17A3A] hover:text-[#A66932] transition-colors mb-8 text-sm font-medium tracking-wider uppercase"
            style={{ fontFamily: 'Jost, sans-serif' }}
          >
            <ArrowLeft size={16} /> Back to Home
          </a>

          <div className="flex flex-col">
            <span
              className="text-[#C17A3A] text-xs tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: 'Jost, sans-serif' }}
            >
              ✦ Our Menu
            </span>
            <h1
              className="text-[#F5F0E8] text-5xl md:text-[56px] leading-tight mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
            >
              Seasonal Creations
            </h1>
            <div className="w-16 h-[1px] bg-[#C17A3A] mb-6" />
            <p
              className="text-[#F5F0E8]/70 text-lg font-light max-w-md"
              style={{ fontFamily: 'Jost, sans-serif' }}
            >
              Crafted from nature's finest ingredients
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">

        {/* SIDEBAR (Desktop) */}
        <aside className="hidden md:block w-[240px] flex-shrink-0">
          <div className="sticky top-[120px] bg-[#1C2B1E] p-8 border border-white/[0.03]">
            <h3 className="text-[#C17A3A] text-[10px] tracking-[0.2em] uppercase mb-8 font-medium" style={{ fontFamily: 'Jost, sans-serif' }}>
              Categories
            </h3>
            <ul className="flex flex-col gap-1">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left w-full py-3 pl-4 transition-all duration-[300ms] ${
                      activeCategory === cat
                        ? 'text-[#C17A3A] border-l-[3px] border-[#C17A3A] bg-white/[0.02]'
                        : 'text-[#F5F0E8]/50 border-l-[3px] border-transparent hover:text-[#F5F0E8] hover:bg-white/[0.01]'
                    }`}
                    style={{ fontFamily: 'Jost, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MOBILE PILLS */}
        <div className="md:hidden flex gap-3 overflow-x-auto no-scrollbar pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-6 py-2.5 rounded-none text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#C17A3A] text-white border-[#C17A3A]'
                  : 'bg-transparent text-[#F5F0E8]/60 border-white/10 hover:border-[#C17A3A]/50 hover:text-[#C17A3A]'
              }`}
              style={{ fontFamily: 'Jost, sans-serif' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MAIN MENU GRID */}
        <div className="flex-1 flex flex-col">

          {/* Breadcrumb & Filters Bar */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#F5F0E8]/40" style={{ fontFamily: 'Jost, sans-serif' }}>
              <a href="/" onClick={handleNavigateHome} className="hover:text-[#C17A3A] transition-colors">Home</a>
              <span className="text-[#C17A3A]/40">/</span>
              <span className="text-[#F5F0E8]/60">Menu</span>
              <span className="text-[#C17A3A]/40">/</span>
              <span className="text-[#C17A3A] font-medium">{activeCategory}</span>
            </div>

            {/* Search and Dietary Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full xl:w-auto">
              
              {/* Search */}
              <div className="relative w-full sm:w-[260px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F5F0E8]/30" size={14} />
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#1C2B1E] border border-white/5 focus:border-[#C17A3A]/50 outline-none text-[13px] text-[#F5F0E8] placeholder-[#F5F0E8]/30 transition-colors rounded-none"
                  style={{ fontFamily: 'Jost, sans-serif' }}
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {filters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`flex-shrink-0 px-5 py-3 text-[10px] uppercase tracking-[0.15em] border transition-all duration-300 ${
                      activeFilter === filter
                        ? 'bg-[#C17A3A] text-white border-[#C17A3A]'
                        : 'bg-[#1C2B1E] text-[#F5F0E8]/50 border-white/5 hover:border-[#C17A3A]/30 hover:text-[#F5F0E8]'
                    }`}
                    style={{ fontFamily: 'Jost, sans-serif' }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            /* Skeleton loading state — 3 placeholder cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center text-[#1C2B1E]/50" style={{ fontFamily: 'Jost, sans-serif' }}>
              No dishes found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  isAdded={added === item.id}
                  onAdd={handleAdd}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
