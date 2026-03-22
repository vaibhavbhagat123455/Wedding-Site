import { useState, useEffect } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, LogOut, User, ChevronDown } from 'lucide-react'
import useAuthStore from '../hooks/useAuth'
import toast from 'react-hot-toast'

const NAV = [
  { label: 'Home',    to: '/' },
  { label: 'Vendors', to: '/vendors' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout }      = useAuthStore()
  const router                = useRouter()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    router.navigate({ to: '/' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            <Heart className="text-gold-500 fill-gold-400" size={22} />
          </motion.div>
          <span className={`font-serif text-xl font-bold transition-colors duration-300 ${scrolled ? 'text-burgundy' : 'text-white'}`}>
            Eternally <span className="text-gold-400">Yours</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(link => (
            <Link key={link.to} to={link.to}
              className={`text-sm font-medium transition-colors duration-300 relative group
                ${scrolled ? 'text-gray-700 hover:text-gold-600' : 'text-white/90 hover:text-gold-300'}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard">
                <button className={`flex items-center gap-2 text-sm font-medium transition-colors ${scrolled ? 'text-burgundy hover:text-gold-600' : 'text-white hover:text-gold-300'}`}>
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center">
                    <User size={14} className={scrolled ? 'text-burgundy' : 'text-white'} />
                  </div>
                  {user.name?.split(' ')[0]}
                </button>
              </Link>
              <button onClick={handleLogout}
                className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${scrolled ? 'text-gray-500 hover:text-red-500' : 'text-white/70 hover:text-red-300'}`}>
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={`text-sm font-medium transition-colors px-4 py-2 ${scrolled ? 'text-gray-700 hover:text-gold-600' : 'text-white/90 hover:text-gold-300'}`}>
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="btn-gold text-sm py-2 px-6">
                  Get Started
                </motion.button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden transition-colors ${scrolled ? 'text-burgundy' : 'text-white'}`}
          onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-gold-100"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                  className="text-gray-700 font-medium py-1 hover:text-gold-600 transition-colors">
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="text-gray-700 font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-left text-red-400 font-medium text-sm">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-gray-700 font-medium">Login</Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <button className="btn-gold text-sm w-full">Get Started</button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
