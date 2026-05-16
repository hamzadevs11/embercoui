import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Reservation() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { ref, isInView } = useInView(0.1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '' });
  };

  const getLabelClass = (value: string) => `
    absolute left-0 pointer-events-none transition-all duration-[250ms] ease-in-out
    peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#C17A3A] 
    ${value ? 'top-0 text-[10px]' : 'top-6 text-[14px]'}
  `;

  const getRevealStyle = (delay: string) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`
  });

  return (
    <section id="reservations" className="py-24 lg:py-32" style={{ background: '#1C2B1E' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row w-full shadow-2xl" ref={ref}>
          {/* LEFT SIDE */}
          <div 
            className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-20"
            style={{ backgroundColor: '#0D1A0E' }}
          >
            <p
              className="text-[#C17A3A] uppercase tracking-[0.25em] text-xs mb-6"
              style={{ fontFamily: 'Jost, sans-serif', ...getRevealStyle('0s') }}
            >
              ✦ Reservations
            </p>
            
            <h2
              className="leading-[1.1] mb-8"
              style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: '48px', 
                color: '#F5F0E8',
                fontWeight: 300,
                ...getRevealStyle('0.1s')
              }}
            >
              Secure<br />
              Your<br />
              <i style={{ fontStyle: 'italic' }}>Table</i>
            </h2>

            <div 
              className="w-[40px] h-[1px] bg-[#C17A3A] mb-8"
              style={getRevealStyle('0.2s')}
            ></div>

            <p
              className="mb-12 max-w-sm"
              style={{ 
                color: 'rgba(245,240,232,0.5)', 
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '1.6',
                ...getRevealStyle('0.3s')
              }}
            >
              Join us for an unforgettable dining experience rooted in forest-to-table philosophy.
            </p>

            <div 
              className="space-y-3"
              style={{ 
                color: 'rgba(245,240,232,0.4)', 
                fontFamily: 'Jost, sans-serif',
                fontSize: '12px',
                fontWeight: 300,
                ...getRevealStyle('0.4s')
              }}
            >
              <p>📍 412 Heritage Lane, Portland</p>
              <p>📞 +1 (503) 555-1234</p>
              <p>🕐 Mon–Sun: 11am – 11pm</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div 
            className="w-full lg:w-1/2 flex flex-col justify-center p-12 lg:p-20"
            style={{ backgroundColor: '#1C2B1E' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px]" style={getRevealStyle('0.1s')}>
                <div className="text-[#C17A3A] text-4xl mb-6">✦</div>
                <h3
                  className="text-3xl mb-4"
                  style={{ fontFamily: 'Cormorant Garamond, serif', color: '#F5F0E8' }}
                >
                  Reservation Received
                </h3>
                <p
                  className="text-sm"
                  style={{ color: 'rgba(245,240,232,0.5)', fontFamily: 'Jost, sans-serif' }}
                >
                  We look forward to welcoming you. A confirmation email has been sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto lg:mx-0 space-y-10">
                {/* Full Name */}
                <div className="relative group pt-4" style={getRevealStyle('0.1s')}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] focus:border-[#C17A3A] py-2 text-[#F5F0E8] focus:outline-none transition-colors duration-[250ms]"
                    style={{ 
                      fontFamily: 'Jost, sans-serif', 
                      fontSize: '14px',
                    }}
                  />
                  <label 
                    htmlFor="name"
                    className={getLabelClass(form.name)}
                    style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,240,232,0.5)' }}
                  >
                    Full Name
                  </label>
                </div>

                {/* Email Address */}
                <div className="relative group pt-4" style={getRevealStyle('0.2s')}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] focus:border-[#C17A3A] py-2 text-[#F5F0E8] focus:outline-none transition-colors duration-[250ms]"
                    style={{ 
                      fontFamily: 'Jost, sans-serif', 
                      fontSize: '14px',
                    }}
                  />
                  <label 
                    htmlFor="email"
                    className={getLabelClass(form.email)}
                    style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,240,232,0.5)' }}
                  >
                    Email Address
                  </label>
                </div>

                {/* Phone Number */}
                <div className="relative group pt-4" style={getRevealStyle('0.3s')}>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] focus:border-[#C17A3A] py-2 text-[#F5F0E8] focus:outline-none transition-colors duration-[250ms]"
                    style={{ 
                      fontFamily: 'Jost, sans-serif', 
                      fontSize: '14px',
                    }}
                  />
                  <label 
                    htmlFor="phone"
                    className={getLabelClass(form.phone)}
                    style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,240,232,0.5)' }}
                  >
                    Phone Number
                  </label>
                </div>

                {/* Date */}
                <div className="relative group pt-4" style={getRevealStyle('0.4s')}>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    value={form.date}
                    onChange={handleChange}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => (e.target.type = form.date ? 'date' : 'text')}
                    required
                    className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] focus:border-[#C17A3A] py-2 text-[#F5F0E8] focus:outline-none transition-colors duration-[250ms] [color-scheme:dark] min-h-[36px]"
                    style={{ 
                      fontFamily: 'Jost, sans-serif', 
                      fontSize: '14px',
                    }}
                  />
                  <label 
                    htmlFor="date"
                    className={getLabelClass(form.date)}
                    style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,240,232,0.5)' }}
                  >
                    Date
                  </label>
                </div>

                {/* Time + Guests Side by Side */}
                <div className="grid grid-cols-2 gap-8" style={getRevealStyle('0.5s')}>
                  {/* Time */}
                  <div className="relative group pt-4">
                    <select
                      name="time"
                      id="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] focus:border-[#C17A3A] py-2 text-[#F5F0E8] focus:outline-none transition-colors duration-[250ms] appearance-none cursor-pointer min-h-[36px]"
                      style={{ 
                        fontFamily: 'Jost, sans-serif', 
                        fontSize: '14px',
                      }}
                    >
                      <option value="" disabled className="bg-[#1C2B1E] hidden"></option>
                      {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(t => (
                        <option key={t} value={t} className="bg-[#1C2B1E] text-[#F5F0E8]">{t}</option>
                      ))}
                    </select>
                    <label 
                      htmlFor="time"
                      className={getLabelClass(form.time)}
                      style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,240,232,0.5)' }}
                    >
                      Time
                    </label>
                  </div>

                  {/* Guests */}
                  <div className="relative group pt-4">
                    <select
                      name="guests"
                      id="guests"
                      value={form.guests}
                      onChange={handleChange}
                      required
                      className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.15)] focus:border-[#C17A3A] py-2 text-[#F5F0E8] focus:outline-none transition-colors duration-[250ms] appearance-none cursor-pointer min-h-[36px]"
                      style={{ 
                        fontFamily: 'Jost, sans-serif', 
                        fontSize: '14px',
                      }}
                    >
                      <option value="" disabled className="bg-[#1C2B1E] hidden"></option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n} className="bg-[#1C2B1E] text-[#F5F0E8]">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                    <label 
                      htmlFor="guests"
                      className={getLabelClass(form.guests)}
                      style={{ fontFamily: 'Jost, sans-serif', color: 'rgba(245,240,232,0.5)' }}
                    >
                      Guests
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4" style={getRevealStyle('0.6s')}>
                  <button
                    type="submit"
                    className="w-full bg-[#C17A3A] hover:bg-[#A66932] text-white py-4 px-6 flex items-center justify-between transition-all duration-[250ms] hover:shadow-[0_0_20px_rgba(193,122,58,0.4)] uppercase"
                    style={{ 
                      fontFamily: 'Jost, sans-serif', 
                      fontSize: '11px', 
                      letterSpacing: '0.2em', 
                    }}
                  >
                    <span>Submit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
