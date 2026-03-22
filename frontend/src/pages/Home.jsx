import { useState, useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Camera, Utensils, Flower2, Music, Palette,
  Sparkles, Star, Users, Award, TrendingUp, Heart, Check, Search
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import TestimonialSlider from '../components/TestimonialSlider'
import VendorCard from '../components/VendorCard'
import api from '../api/client'

const CATS = [
  { icon:Camera,   label:'Photography', img:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop', count:'240+' },
  { icon:Utensils, label:'Catering',    img:'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop', count:'180+' },
  { icon:Flower2,  label:'Decoration',  img:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop', count:'320+' },
  { icon:Music,    label:'Music & DJ',  img:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop', count:'95+'  },
  { icon:Palette,  label:'Makeup',      img:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop', count:'150+' },
  { icon:Sparkles, label:'Mehendi',     img:'https://images.unsplash.com/photo-1595409026720-a5c764b64837?w=400&h=300&fit=crop', count:'120+' },
]

const STATS = [
  { icon:Users,      value:'10,000+', label:'Happy Couples' },
  { icon:Award,      value:'1,200+',  label:'Premium Vendors' },
  { icon:Star,       value:'4.9',     label:'Avg Rating' },
  { icon:TrendingUp, value:'98%',     label:'Satisfaction' },
]

const HOW = [
  { step:'01', icon:'🔍', title:'Browse Vendors',   desc:'Explore hundreds of curated professionals across every category.' },
  { step:'02', icon:'💬', title:'Connect Directly', desc:'View portfolios, read reviews and send inquiries in seconds.' },
  { step:'03', icon:'💍', title:'Book & Celebrate', desc:'Confirm your dream team and enjoy the perfect wedding day.' },
]

const GALLERY = [
  { src:'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=85', label:'Wedding Ceremony' },
  { src:'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=500&fit=crop&q=85', label:'Photography' },
  { src:'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=500&fit=crop&q=85', label:'Grand Venue' },
  { src:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=500&fit=crop&q=85', label:'Floral Decor' },
  { src:'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=500&fit=crop&q=85', label:'Gourmet Catering' },
  { src:'https://images.unsplash.com/photo-1610173826014-d131b02d69ca?w=800&h=600&fit=crop&q=85', label:'Bridal Portrait' },
  { src:'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop&q=85', label:'Music & Celebration' },
  { src:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=500&fit=crop&q=85', label:'Bridal Makeup' },
]

function Counter({ target }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOk(true) }, { threshold: 0.5 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  useEffect(() => {
    if (!ok) return
    const n = parseInt(target.replace(/\D/g, ''))
    let c = 0; const s = Math.ceil(n / 60)
    const t = setInterval(() => { c = Math.min(c + s, n); setCount(c); if (c >= n) clearInterval(t) }, 25)
    return () => clearInterval(t)
  }, [ok, target])
  const d = target.includes('+') ? `${count.toLocaleString()}+` : target.includes('%') ? `${count}%` : count.toString()
  return <span ref={ref}>{d}</span>
}

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    api.get('/vendors?limit=6&sort=rating').then(r => setFeatured(r.data.vendors || [])).catch(() => {})
  }, [])

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — clean split layout inspired by modern wedding design
          Left: text + search + CTA  |  Right: 3 arch-shaped photos
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen bg-[#f8f5f0] flex items-center pt-2 overflow-hidden">
        {/* Subtle floral SVG watermark */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04]" viewBox="0 0 600 800" fill="none">
            <circle cx="500" cy="150" r="280" stroke="#6b1a3a" strokeWidth="1"/>
            <circle cx="500" cy="150" r="220" stroke="#6b1a3a" strokeWidth="0.5"/>
            <circle cx="100" cy="700" r="200" stroke="#d4a820" strokeWidth="0.8"/>
            <path d="M300 0 Q350 100 300 200 Q250 300 300 400" stroke="#6b1a3a" strokeWidth="0.8"/>
            <path d="M400 100 Q450 200 400 350" stroke="#d4a820" strokeWidth="0.6"/>
          </svg>
        </div>

        <div className="max-w-7xl  mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

          {/* ── LEFT: Text content ─────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-px bg-gold-500" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold-600">
                India's Premier Wedding Platform
              </span>
              <span className="w-8 h-px bg-gold-500" />
            </motion.div>

            {/* Main headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            >
              <h1 className="font-serif font-bold leading-[1.08] mb-3 text-gray-900"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
                Plan Your
              </h1>
              <h1 className="font-serif font-bold leading-[1.08] mb-3"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
                <span className="text-burgundy">Perfect</span>{' '}
                <span className="italic text-gold-500">Wedding</span>
              </h1>
              <h1 className="font-serif font-bold leading-[1.08] mb-6 text-gray-900"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
                With the Best
              </h1>
            </motion.div>

            {/* Script tagline */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="font-script text-xl text-gold-500/80 mb-5"
            >
              — Eternally Yours —
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="text-gray-500 text-base leading-relaxed mb-8 max-w-md"
            >
              Discover verified photographers, decorators, caterers, and more —
              all in one place. Every detail crafted with love for your special day.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="mb-7"
            >
              <div className="flex items-center bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <Search size={16} className="text-gray-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && searchVal.trim()) window.location.href = `/vendors?search=${encodeURIComponent(searchVal.trim())}` }}
                  placeholder="Search photographers, venues, caterers..."
                  className="flex-1 px-3 py-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                />
                <Link to={`/vendors${searchVal ? `?search=${encodeURIComponent(searchVal)}` : ''}`}>
                  <button className="m-2 bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                    Search
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link to="/vendors">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-gold px-8 py-3.5 text-sm flex items-center gap-2">
                  Explore Vendors <ArrowRight size={15} />
                </motion.button>
              </Link>
              <Link to="/signup">
                <button className="btn-outline-gold px-8 py-3.5 text-sm">
                  Join Free
                </button>
              </Link>
            </motion.div>

            {/* Mini stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="flex items-center gap-6"
            >
              {[
                { value: '10K+', label: 'Happy Couples' },
                { value: '1200+', label: 'Vendors' },
                { value: '4.9★', label: 'Rating' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-lg font-bold text-burgundy">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Three arch-shaped photos ───────────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center items-end gap-4 h-[520px] relative">

            {/* Decorative circle behind */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border border-gold-200/60" />
              <div className="absolute w-64 h-64 rounded-full border border-burgundy/10" />
            </div>

            {/* Arch 1 — tall, left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
              className="relative shrink-0"
              style={{ width: '155px', height: '260px' }}
            >
              <div className="w-full h-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                style={{ borderRadius: '9999px 9999px 24px 24px' }}>
                <img
                  src="../../img/image.png"
                  alt="Bride"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop' }}
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-1.5 shadow-md whitespace-nowrap">
                <p className="text-xs font-medium text-gray-600">📸 Photography</p>
              </div>
            </motion.div>

            {/* Arch 2 — tallest, center (elevated) */}
            <motion.div
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
              className="relative shrink-0 -mt-12"
              style={{ width: '155px', height: '320px' }}
            >
              <div className="w-full h-full overflow-hidden shadow-[0_24px_80px_rgba(107,26,58,0.2)]"
                style={{ borderRadius: '9999px 9999px 24px 24px' }}>
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=700&fit=crop&q=85"
                  alt="Ceremony"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Gold ring badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-gold">
                <Heart size={16} className="text-white fill-white" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-burgundy text-white rounded-xl px-3 py-1.5 shadow-md whitespace-nowrap">
                <p className="text-xs font-medium">💍 Ceremony</p>
              </div>
            </motion.div>

            {/* Arch 3 — medium, right */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
              className="relative shrink-0"
              style={{ width: '155px', height: '260px' }}
            >
              <div className="w-full h-full overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                style={{ borderRadius: '9999px 9999px 24px 24px' }}>
                <img
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=600&fit=crop&q=85"
                  alt="Venue"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-3 py-1.5 shadow-md whitespace-nowrap">
                <p className="text-xs font-medium text-gray-600">🏛️ Venue</p>
              </div>
            </motion.div>

            {/* Floating tag — top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }}
              className="absolute top-6 left-2 bg-white rounded-2xl px-4 py-3 shadow-card flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                <Star className="text-gold-500 fill-gold-500" size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">4.9 / 5 Rating</p>
                <p className="text-[10px] text-gray-400">10,000+ reviews</p>
              </div>
            </motion.div>

            {/* Floating tag — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3 }}
              className="absolute bottom-8 right-0 bg-burgundy text-white rounded-2xl px-4 py-3 shadow-card"
            >
              <p className="text-[10px] text-burgundy-light/80 mb-0.5">Verified Vendors</p>
              <p className="text-sm font-bold">1,200+ Experts</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-burgundy to-burgundy-light py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <AnimatedSection key={i} delay={i * 0.1} direction="scale">
              <Icon className="mx-auto text-gold-400 mb-2" size={24} />
              <p className="font-serif text-3xl font-bold text-gold-300"><Counter target={value} /></p>
              <p className="text-xs text-gray-300 mt-1">{label}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ══ CATEGORIES ═════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="section-subtitle">Browse By</p>
            <h2 className="section-title">Wedding Services</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">Everything you need for your perfect wedding, all in one place</p>
            <hr className="gold-divider" />
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATS.map(({ icon: Icon, label, img, count }, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <Link to={`/vendors?category=${label}`}>
                  <motion.div whileHover={{ y: -8 }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md"
                    style={{ height: '200px' }}>
                    <img src={img} alt={label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 px-2 text-white text-center">
                      <div className="w-9 h-9 rounded-full bg-gold-500/80 flex items-center justify-center mb-2">
                        <Icon size={16} />
                      </div>
                      <p className="font-serif font-bold text-sm">{label}</p>
                      <p className="text-xs text-gold-300 mt-0.5">{count} vendors</p>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="section-subtitle">A Glimpse Of</p>
            <h2 className="section-title">Real Weddings</h2>
            <hr className="gold-divider" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {GALLERY.slice(0, 3).map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-card h-64">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <span className="text-white font-serif font-semibold text-sm">{img.label}</span>
                    <Heart size={10} className="text-white fill-white" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {GALLERY.slice(3, 6).map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-card h-64">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <span className="text-white font-serif font-semibold text-sm">{img.label}</span>
                    <Heart size={10} className="text-white fill-white" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatedSection delay={0.1} className="md:col-span-2">
              <motion.div whileHover={{ scale: 1.01 }} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-card h-64">
                <img src={GALLERY[6].src} alt={GALLERY[6].label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                  <span className="text-white font-serif font-semibold text-sm">{GALLERY[6].label}</span>
                  <Heart size={10} className="text-white fill-white" />
                </div>
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-card h-64">
                <img src={GALLERY[7].src} alt={GALLERY[7].label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=500&fit=crop' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                  <span className="text-white font-serif font-semibold text-sm">{GALLERY[7].label}</span>
                  <Heart size={10} className="text-white fill-white" />
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
          <div className="text-center mt-10">
            <Link to="/vendors"><button className="btn-outline-gold">Explore All Vendors <ArrowRight className="inline ml-2" size={15} /></button></Link>
          </div>
        </div>
      </section>

      {/* ══ FEATURED VENDORS ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle">Handpicked For You</p>
            <h2 className="section-title">Featured Vendors</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Our top-rated professionals, trusted by thousands of couples</p>
            <hr className="gold-divider" />
          </AnimatedSection>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featured.map((v, i) => <VendorCard key={v._id || v.id} vendor={v} index={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card">
                  <div className="h-52 shimmer-bg" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 shimmer-bg rounded w-3/4" /><div className="h-4 shimmer-bg rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/vendors"><button className="btn-gold px-10">Browse All Vendors <ArrowRight className="inline ml-2" size={16} /></button></Link>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-50 -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-rose-50 translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <hr className="gold-divider" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-14 left-[37%] right-[37%] h-px bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200" />
            {HOW.map(({ step, icon, title, desc }, i) => (
              <AnimatedSection key={i} delay={i * 0.2}>
                <motion.div whileHover={{ y: -6 }} className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-4xl shadow-gold">{icon}</div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-burgundy text-white text-xs font-bold flex items-center justify-center font-serif">{step}</div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-burgundy mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARALLAX BANNER ════════════════════════════════════════════════════ */}
      <section className="relative h-[420px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&h=800&fit=crop&q=90" alt="Venue" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy/85 via-black/55 to-burgundy/85" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <AnimatedSection direction="scale">
            <p className="font-script text-2xl text-gold-300 mb-3">Begin Your Journey</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">Every Love Story<br />Deserves a Perfect Setting</h2>
            <Link to="/vendors"><button className="btn-gold px-10 py-4 text-sm">Start Planning Today</button></Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <img src="../../img/image.png" alt="Bride" className="rounded-3xl shadow-card w-full"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=700&h=900&fit=crop&q=85' }} />
                <div className="absolute -bottom-6 -right-6 w-44 h-44 rounded-2xl overflow-hidden border-4 border-white shadow-card hidden md:block">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSL_iZuifQIQ5TLtFaocBnuh7os5feVfuoHA&s" alt="Decor" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-5 -left-5 bg-white rounded-2xl p-4 shadow-card hidden md:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center"><Star className="text-gold-500 fill-gold-500" size={16} /></div>
                  <div><p className="font-bold text-sm text-burgundy">4.9 Rating</p><p className="text-xs text-gray-400">10,000+ reviews</p></div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <p className="section-subtitle">Why Couples Trust Us</p>
              <h2 className="section-title mb-5">The Eternally Yours Difference</h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm">We go beyond a simple directory. Every vendor is personally vetted to ensure they meet our gold standard of quality, reliability and excellence.</p>
              <div className="space-y-4">
                {[
                  { title:'Verified & Vetted Vendors', desc:'Every professional is background-checked and portfolio-reviewed' },
                  { title:'Transparent Pricing',       desc:'Clear price ranges with no hidden fees or surprises' },
                  { title:'Dedicated Support',         desc:'24/7 assistance from our wedding planning experts' },
                  { title:'Secure Inquiries',          desc:'Your data is protected with enterprise-grade security' },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 5 }} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gold-100 border border-gold-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} className="text-gold-600" />
                    </div>
                    <div><p className="font-semibold text-sm text-burgundy">{item.title}</p><p className="text-xs text-gray-500 mt-0.5">{item.desc}</p></div>
                  </motion.div>
                ))}
              </div>
              <Link to="/signup"><button className="btn-gold mt-8 text-sm">Join Free Today</button></Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-burgundy relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <p className="font-script text-2xl text-gold-400 mb-2">Real Stories</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">What Couples Say</h2>
            <hr className="gold-divider" />
          </AnimatedSection>
          <TestimonialSlider />
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <AnimatedSection direction="scale">
            <Heart className="mx-auto mb-4 fill-white/30 text-white/60" size={36} />
            <p className="font-script text-2xl mb-3 text-white/90">Ready to Begin?</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">Your Perfect Wedding Awaits</h2>
            <p className="text-gold-100 mb-10 max-w-lg mx-auto text-base">Join over 10,000 happy couples who found their dream team through Eternally Yours.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup"><button className="bg-white text-gold-600 font-bold px-12 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm">Create Free Account</button></Link>
              <Link to="/vendors"><button className="border-2 border-white/80 text-white font-semibold px-12 py-4 rounded-full hover:bg-white hover:text-gold-600 transition-all duration-300 text-sm">Browse Vendors</button></Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  )
}