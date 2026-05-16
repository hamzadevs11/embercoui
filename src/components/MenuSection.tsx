import { useState, useRef, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { categories, menuItems } from '../data/menu.ts';
import { useCart } from '../context/CartContext.tsx';
import { useInView } from '../hooks/useInView.ts';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('All');
  const [added, setAdded] = useState<number | null>(null);
  const { addItem } = useCart();

  const filtered = activeTab === 'All' ? menuItems : menuItems.filter(i => i.category === activeTab);

  const handleAdd = (item: typeof menuItems[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1500);
  };

  const { ref: headingRef, isInView: headingInView } = useInView();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardVisible, setCardVisible] = useState<boolean[]>([]);

  useEffect(() => {
    setCardVisible(new Array(filtered.length).fill(false));
    const observers: IntersectionObserver[] = [];
    let raf1: number;
    let raf2: number;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        filtered.forEach((_, i) => {
          const el = cardRefs.current[i];
          if (!el) return;
          const obs = new IntersectionObserver(([entry]) => {
            setCardVisible(prev => {
              const next = [...prev];
              next[i] = entry.isIntersecting;
              return next;
            });
          }, { threshold: 0.1 });
          obs.observe(el);
          observers.push(obs);
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observers.forEach(o => o.disconnect());
    };
  }, [activeTab, filtered.length]);

  return (
    <section id="menu" className="py-24 bg-cream-200" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-14 reveal ${headingInView ? 'visible' : ''}`}
        >
          <p
            className="text-ember text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.25em', fontSize: '0.7rem' }}
          >
            ✦ &nbsp; Seasonal Selection
          </p>
          <h2
            className="text-forest text-5xl md:text-6xl font-light leading-none"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
          >
            Our Menu
          </h2>
          <div className="w-12 h-px bg-ember mx-auto mt-5" />
        </div>

        {/* Desktop pill tabs */}
        <div className="hidden md:flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-[250ms] border rounded-full ${
                activeTab === cat
                  ? 'bg-[#1C2B1E] text-[#F5F0E8] border-[#1C2B1E]'
                  : 'bg-transparent text-[#1C2B1E]/50 border-[rgba(28,43,30,0.2)] hover:border-[#C17A3A] hover:text-[#C17A3A]'
              }`}
              style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.15em', fontSize: '0.72rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile scrollable pill tabs */}
        <div className="flex md:hidden gap-2.5 overflow-x-auto no-scrollbar pb-4 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-[250ms] border ${
                activeTab === cat
                  ? 'bg-[#1C2B1E] text-[#F5F0E8] border-[#1C2B1E]'
                  : 'bg-transparent text-[#1C2B1E]/50 border-[rgba(28,43,30,0.2)] hover:border-[#C17A3A] hover:text-[#C17A3A]'
              }`}
              style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.75rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              ref={el => { cardRefs.current[i] = el; }}
              className={`group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 reveal ${cardVisible[i] ? 'visible' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="text-forest text-xl leading-tight"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-ember font-semibold text-base flex-shrink-0"
                    style={{ fontFamily: 'Jost, sans-serif' }}
                  >
                    ${item.price}
                  </span>
                </div>
                <p
                  className="text-forest/60 text-sm leading-relaxed mb-5"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 300 }}
                >
                  {item.description}
                </p>
                <button
                  onClick={() => handleAdd(item)}
                  className={`w-full flex items-center justify-center gap-[8px] px-[20px] py-[12px] rounded-none uppercase border transition-all duration-300 ease-out ${
                    added === item.id
                      ? 'bg-[#2E7D32] border-[#2E7D32] text-[#F5F0E8]'
                      : 'bg-[#1C2B1E] text-[#F5F0E8] border-white/10 hover:bg-[#C17A3A] hover:border-[#C17A3A] hover:-translate-y-[1px] hover:shadow-[0_4px_20px_rgba(193,122,58,0.3)]'
                  }`}
                  style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.12em', fontSize: '11px' }}
                >
                  {added === item.id ? (
                    <><Check size={14} /> Added</>
                  ) : (
                    <><Plus size={14} /> Add to Cart</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
