import { useState, useEffect } from 'react'
import { useParams, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Star, MapPin, Phone, Mail, ArrowLeft, Heart, Share2, CheckCircle, BadgeCheck, Calendar } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import api from '../api/client'
import toast from 'react-hot-toast'
import useAuthStore from '../hooks/useAuth'

const CAT_IMAGES = {
  Photography: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&h=600&fit=crop&q=90',
  Catering:    'https://images.unsplash.com/photo-1555244162-803834f70033?w=1400&h=600&fit=crop&q=90',
  Decoration:  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&h=600&fit=crop&q=90',
  Venue:       'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&h=600&fit=crop&q=90',
  Music:       'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&h=600&fit=crop&q=90',
  Makeup:      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&h=600&fit=crop&q=90',
  Mehendi:     'https://images.unsplash.com/photo-1593489062665-9f26fa627d73?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Invitations: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1400&h=600&fit=crop&q=90',
}

export default function VendorDetails() {
  const { id }     = useParams({ from: '/vendors/$id' })
  const { user }   = useAuthStore()
  const [vendor,setVendor]         = useState(null)
  const [loading,setLoading]       = useState(true)
  const [form,setForm]             = useState({ name:'', email:'', phone:'', message:'', event_date:'' })
  const [submitting,setSubmitting] = useState(false)
  const [submitted,setSubmitted]   = useState(false)
  const [liked,setLiked]           = useState(false)

  useEffect(() => {
    api.get(`/vendors/${id}`)
      .then(r => setVendor(r.data))
      .catch(() => toast.error('Vendor not found'))
      .finally(() => setLoading(false))
  }, [id])

  const handleInquiry = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/inquiries', { ...form, vendor_id: id })
      setSubmitted(true)
      toast.success('Inquiry sent! The vendor will contact you soon.')
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally { setSubmitting(false) }
  }

  if (loading) return (
    <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"/>
        <p className="text-gray-500 font-serif">Loading vendor details...</p>
      </div>
    </div>
  )

  if (!vendor) return (
    <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
      <div className="text-center">
        <span className="text-6xl mb-4 block">😔</span>
        <h2 className="font-serif text-2xl text-burgundy mb-4">Vendor Not Found</h2>
        <Link to="/vendors"><button className="btn-gold">Back to Vendors</button></Link>
      </div>
    </div>
  )

  const stars   = Math.round(parseFloat(vendor.rating) || 4)
  const imgSrc  = vendor.imageUrl || vendor.image_url || CAT_IMAGES[vendor.category] || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&h=600&fit=crop'
  const heroImg = CAT_IMAGES[vendor.category] || imgSrc

  return (
    <div className="min-h-screen bg-cream">
      {/* Full-width hero */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img src={heroImg} alt={vendor.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"/>
        <div className="absolute top-6 left-6">
          <Link to="/vendors">
            <button className="flex items-center gap-2 text-white text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
              <ArrowLeft size={15}/> Back to Vendors
            </button>
          </Link>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-flex items-center gap-1">
              {(vendor.isFeatured || vendor.is_featured) && <BadgeCheck size={11}/>} {vendor.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mt-1">{vendor.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              {Array.from({length:5}).map((_,i) => (
                <Star key={i} size={14} className={i<stars?'text-gold-400 fill-gold-400':'text-gray-400 fill-gray-400'}/>
              ))}
              <span className="text-white/80 text-sm">({vendor.rating || '4.5'})</span>
              <span className="text-white/60 text-sm flex items-center gap-1"><MapPin size={12}/>{vendor.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setLiked(!liked)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Heart size={16} className={liked?'fill-red-400 text-red-400':''}/>
            </button>
            <button onClick={()=>navigator.share?.({title:vendor.name,url:window.location.href})||toast.success('Link copied!')}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <Share2 size={16}/>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-burgundy mb-4">About {vendor.name}</h2>
              <p className="text-gray-600 leading-relaxed text-base">{vendor.description || 'Premium wedding services crafted to make your special day truly unforgettable and magical.'}</p>
            </div>
          </AnimatedSection>

          {/* Pricing */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-burgundy mb-5">Pricing</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream rounded-2xl p-5 text-center border border-gold-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Starting From</p>
                  <p className="font-serif text-3xl font-bold text-burgundy">
                    ₹{Number(vendor.priceRangeMin||vendor.price_range_min||15000).toLocaleString()}
                  </p>
                </div>
                <div className="bg-gold-50 rounded-2xl p-5 text-center border border-gold-200">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Premium Package</p>
                  <p className="font-serif text-3xl font-bold text-gold-600">
                    ₹{Number(vendor.priceRangeMax||vendor.price_range_max||150000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Features */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-burgundy mb-5">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(vendor.features||['Professional Team','HD Delivery','On-time Service','Custom Packages','Prior Consultation','Post-event Support','Multiple Packages','Quick Response']).map((f,i)=>(
                  <div key={i} className="flex items-center gap-3 text-gray-600 text-sm p-2.5 rounded-xl hover:bg-gold-50 transition-colors">
                    <CheckCircle size={16} className="text-gold-500 shrink-0 fill-gold-100"/>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact info */}
          {(vendor.phone || vendor.email) && (
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <h2 className="font-serif text-2xl font-bold text-burgundy mb-5">Contact</h2>
                <div className="flex flex-wrap gap-4">
                  {vendor.phone && (
                    <a href={`tel:${vendor.phone}`} className="flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2.5 rounded-xl text-green-700 text-sm hover:bg-green-100 transition-colors">
                      <Phone size={15}/> {vendor.phone}
                    </a>
                  )}
                  {vendor.email && (
                    <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2.5 rounded-xl text-blue-700 text-sm hover:bg-blue-100 transition-colors">
                      <Mail size={15}/> {vendor.email}
                    </a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* Right: Inquiry Form */}
        <div className="lg:col-span-1">
          <AnimatedSection direction="right" className="sticky top-24">
            <div className="bg-white rounded-3xl p-6 shadow-card border border-gray-100">
              {submitted ? (
                <div className="text-center py-10">
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200}}>
                    <CheckCircle className="text-green-500 mx-auto mb-4" size={56}/>
                  </motion.div>
                  <h3 className="font-serif text-xl font-bold text-burgundy mb-2">Inquiry Sent!</h3>
                  <p className="text-gray-500 text-sm mb-5">The vendor will get back to you within 24 hours.</p>
                  <button onClick={()=>{setSubmitted(false);setForm({name:'',email:'',phone:'',message:'',event_date:''})}}
                    className="btn-outline-gold text-sm">Send Another</button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-xl font-bold text-burgundy">Send Inquiry</h3>
                    <p className="text-xs text-gray-400 mt-1">Get a personalised quote — free & instant</p>
                  </div>
                  <form onSubmit={handleInquiry} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Your Name *</label>
                      <input required className="input-field text-sm" placeholder="Full name"
                        value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Email *</label>
                      <input type="email" required className="input-field text-sm" placeholder="you@email.com"
                        value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
                      <input type="tel" className="input-field text-sm" placeholder="+91 98765 43210"
                        value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        <Calendar size={11} className="inline mr-1"/> Wedding Date
                      </label>
                      <input type="date" className="input-field text-sm"
                        value={form.event_date} onChange={e=>setForm({...form,event_date:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
                      <textarea rows={3} required className="input-field text-sm resize-none"
                        placeholder="Describe your requirements..."
                        value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                    </div>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                      type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">
                      {submitting ? 'Sending...' : '✉️ Send Inquiry'}
                    </motion.button>
                    {!user && (
                      <p className="text-xs text-center text-gray-400">
                        <Link to="/login" className="text-gold-600 underline">Login</Link> for faster responses
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
