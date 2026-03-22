import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Instagram, Facebook } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import api from '../api/client'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form,setForm]             = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [submitting,setSubmitting] = useState(false)
  const [submitted,setSubmitted]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/contact', form)
      setSubmitted(true)
      toast.success("Message sent! We'll be in touch soon.")
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally { setSubmitting(false) }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-burgundy-dark via-burgundy to-burgundy-light pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=600&fit=crop&q=80"
            alt="Contact" className="w-full h-full object-cover opacity-20"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/90 to-burgundy-dark/90"/>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <p className="font-script text-2xl text-gold-400 mb-2">We're Here For You</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Our wedding consultants are ready to help you plan the perfect day. Reach out anytime.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">

          {/* Info */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <h2 className="font-serif text-3xl font-bold text-burgundy mb-4">Let's Talk</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Whether you're just starting your wedding journey or looking for a specific vendor,
              our expert team is here every step of the way.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { Icon:Mail,   label:'Email Us',  value:'hello@eternallyyours.in', href:'mailto:hello@eternallyyours.in', bg:'bg-gold-50 border-gold-200', ico:'text-gold-600' },
                { Icon:Phone,  label:'Call Us',   value:'+91 98765 43210',          href:'tel:+919876543210',             bg:'bg-green-50 border-green-200',ico:'text-green-600' },
                { Icon:MapPin, label:'Visit Us',  value:'Pune, Maharashtra, India', href:'#',                            bg:'bg-blue-50 border-blue-200',  ico:'text-blue-600' },
                { Icon:Clock,  label:'Hours',     value:'Mon–Sat, 9AM–8PM IST',     href:'#',                            bg:'bg-purple-50 border-purple-200',ico:'text-purple-600' },
              ].map(({Icon,label,value,href,bg,ico})=>(
                <a key={label} href={href}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${bg} hover:shadow-sm transition-all duration-300`}>
                  <div className={`w-11 h-11 rounded-xl ${bg} border flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={ico}/>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="font-semibold text-gray-800 text-sm">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-3">Follow our journey</p>
              <div className="flex gap-3">
                {[{Icon:Instagram,color:'hover:bg-pink-500'},{Icon:Facebook,color:'hover:bg-blue-600'}].map(({Icon,color},i)=>(
                  <a key={i} href="#" className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 ${color} hover:text-white hover:border-transparent transition-all duration-300`}>
                    <Icon size={16}/>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="right" className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-card border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:200}}>
                    <CheckCircle className="text-green-500 mx-auto mb-5" size={64}/>
                  </motion.div>
                  <h3 className="font-serif text-2xl font-bold text-burgundy mb-3">Thank You!</h3>
                  <p className="text-gray-500 mb-6">We've received your message and will respond within 24 hours.</p>
                  <button onClick={()=>{setSubmitted(false);setForm({name:'',email:'',phone:'',subject:'',message:''})}}
                    className="btn-outline-gold text-sm">Send Another Message</button>
                </div>
              ):(
                <>
                  <h3 className="font-serif text-2xl font-bold text-burgundy mb-7">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name *</label>
                        <input required className="input-field" placeholder="Your name"
                          value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
                        <input type="tel" className="input-field" placeholder="+91 98765 43210"
                          value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Email *</label>
                      <input type="email" required className="input-field" placeholder="you@email.com"
                        value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject *</label>
                      <select required className="input-field cursor-pointer"
                        value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
                        <option value="">Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Vendor Registration</option>
                        <option>Wedding Planning Help</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>Media & Press</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
                      <textarea required rows={5} className="input-field resize-none"
                        placeholder="Tell us how we can help you plan your perfect day..."
                        value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/>
                    </div>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                      type="submit" disabled={submitting}
                      className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60">
                      <Send size={16}/> {submitting?'Sending...':'Send Message'}
                    </motion.button>
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
