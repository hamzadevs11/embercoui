export default function LiveStatus() {
  return (
    <section
      id="livestatus"
      className="bg-forest py-3 px-6"
      style={{ background: '#1C2B1E' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center">
        {/* Kitchen open */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: '#4ade80' }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: '#22c55e' }}
            />
          </span>
          <span
            className="text-white/90 text-xs tracking-widest uppercase"
            style={{ fontFamily: 'Jost, sans-serif', letterSpacing: '0.15em', fontSize: '0.7rem' }}
          >
            Kitchen Open
          </span>
        </div>

        <span className="hidden sm:block text-white/20 text-xs">|</span>

        {/* Wait time */}
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ember">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span
            className="text-white/70 text-xs tracking-wide"
            style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem' }}
          >
            Estimated wait: <span className="text-white font-medium">20–30 min</span>
          </span>
        </div>

        <span className="hidden sm:block text-white/20 text-xs">|</span>

        {/* Tables */}
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ember">
            <path d="M3 7h18M3 12h18M3 17h18" />
          </svg>
          <span
            className="text-white/70 text-xs tracking-wide"
            style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.72rem' }}
          >
            Tables available: <span className="text-white font-medium">4 remaining tonight</span>
          </span>
        </div>
      </div>
    </section>
  );
}
