import { Link } from '@tanstack/react-router'
import { Heart, Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-gold-400 fill-gold-400" size={20} />
            <span className="font-serif text-xl font-bold">Eternally <span className="text-gold-400">Yours</span></span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            India's most trusted wedding planning platform. Making your dream wedding a stunning reality.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: '#' },
              { Icon: Facebook,  href: '#' },
              { Icon: Twitter,   href: '#' },
              { Icon: Youtube,   href: '#' },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                           hover:bg-gold-500 hover:border-gold-500 transition-all duration-300 text-gray-400 hover:text-white">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-gold-400 text-base mb-5 font-semibold">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {[['Home','/'],['Browse Vendors','/vendors'],['Contact Us','/contact'],['Dashboard','/dashboard'],['Sign Up Free','/signup']].map(([l,h])=>(
              <li key={h}>
                <Link to={h} className="hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-serif text-gold-400 text-base mb-5 font-semibold">Services</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {['Photography & Video','Catering & Food','Decoration & Floral','Wedding Venues','Bridal Makeup','Mehendi Artists','Music & Entertainment','Invitations'].map(s=>(
              <li key={s}>
                <Link to="/vendors" className="hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h4 className="font-serif text-gold-400 text-base mb-5 font-semibold">Contact</h4>
          <div className="space-y-3 text-sm text-gray-400 mb-6">
            {[
              { Icon: Mail,   text: 'hello@eternallyyours.in', href: 'mailto:hello@eternallyyours.in' },
              { Icon: Phone,  text: '+91 98765 43210',         href: 'tel:+919876543210' },
              { Icon: MapPin, text: 'Pune, Maharashtra, India',href: '#' },
            ].map(({ Icon, text, href }) => (
              <a key={text} href={href} className="flex items-start gap-3 hover:text-gold-300 transition-colors">
                <Icon size={14} className="text-gold-500 mt-0.5 shrink-0" /> {text}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">Get wedding tips & deals</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors" />
              <button className="bg-gold-500 hover:bg-gold-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Eternally Yours. Made with <Heart size={10} className="inline text-red-500 fill-red-500" /> for love stories.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
