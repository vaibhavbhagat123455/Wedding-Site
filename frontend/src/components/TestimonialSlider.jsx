import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const T = [
  { name:'Priya & Arjun Sharma', location:'Mumbai', service:'Full Wedding Package', avatar:'PS',
    text:"Eternally Yours made our dream wedding a reality. Every vendor was top-notch — the decorations were breathtaking and the food had our guests raving. We couldn't have done it without this platform!",
    img:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=80&h=80&fit=crop&crop=face' },
  { name:'Meera & Rahul Gupta', location:'Delhi', service:'Photography & Videography', avatar:'MG',
    text:"The photography team captured every magical moment of our wedding. Their creative vision truly made our album look like a fairy tale. We get compliments every time we show our photos!",
    img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name:'Sneha & Vikram Patel', location:'Pune', service:'Catering & Decor', avatar:'SP',
    text:"The catering team served over 500 guests flawlessly. From the live counters to the dessert station — everything was perfection. The decor transformed our venue into a fairytale setting.",
    img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { name:'Asha & Dev Malhotra', location:'Bangalore', service:'Bridal Services', avatar:'AM',
    text:"Finding the perfect mehendi artist and bridal makeup team was so easy. My entire look was exactly what I had envisioned for years. I felt like a queen on my wedding day!",
    img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
]

export default function TestimonialSlider() {
  const [cur, setCur]   = useState(0)
  const [dir, setDir]   = useState(1)
  const next = () => { setDir(1);  setCur(c => (c + 1) % T.length) }
  const prev = () => { setDir(-1); setCur(c => (c - 1 + T.length) % T.length) }
  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t) }, [])
  const t = T[cur]

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={cur} custom={dir}
          initial={{ opacity: 0, x: 60 * dir }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 * dir }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar & info */}
            <div className="flex flex-col items-center md:items-start shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gold-400 shadow-gold mb-3">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover"
                  onError={e => { e.target.style.display='none' }} />
              </div>
              <p className="font-serif font-bold text-white text-center md:text-left">{t.name}</p>
              <p className="text-xs text-gray-400 text-center md:text-left">{t.location}</p>
              <span className="mt-2 text-xs bg-gold-500/20 text-gold-300 px-3 py-1 rounded-full border border-gold-500/30">
                {t.service}
              </span>
              <div className="flex gap-1 mt-3">
                {Array.from({length:5}).map((_,i) => <Star key={i} size={12} className="text-gold-400 fill-gold-400"/>)}
              </div>
            </div>

            {/* Quote */}
            <div className="flex-1">
              <Quote className="text-gold-400/40 mb-4" size={40} />
              <p className="text-gray-200 text-lg leading-relaxed italic font-light">
                "{t.text}"
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                                          text-white hover:bg-gold-500 hover:border-gold-500 transition-all">
          <ChevronLeft size={18} />
        </button>
        {T.map((_, i) => (
          <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i) }}
            className={`rounded-full transition-all duration-300 ${i === cur ? 'w-8 h-2.5 bg-gold-400' : 'w-2.5 h-2.5 bg-white/30'}`} />
        ))}
        <button onClick={next} className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                                          text-white hover:bg-gold-500 hover:border-gold-500 transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
