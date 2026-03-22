import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Heart, Mail, Lock, User } from 'lucide-react'
import api from '../api/client'
import useAuthStore from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Signup() {
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' })
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const { login }             = useAuthStore()
  const router                = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6)      { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const { data } = await api.post('/auth/signup', { name: form.name, email: form.email, password: form.password })
      login(data.user, data.token)
      toast.success(`Welcome, ${data.user.name?.split(' ')[0]}! 🎉`)
      router.navigate({ to: '/dashboard' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-28">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="text-gold-500" size={28} fill="currentColor" />
            <span className="font-serif text-2xl font-bold text-burgundy">
              Eternally <span className="text-gold-500">Yours</span>
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-burgundy">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join thousands of couples planning their perfect wedding</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-card border border-gold-100/50"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input required className="input-field pl-11" placeholder="Your full name"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="email" required className="input-field pl-11" placeholder="you@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type={show ? 'text' : 'password'} required className="input-field pl-11 pr-11"
                  placeholder="Min. 6 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type={show ? 'text' : 'password'} required className="input-field pl-11"
                  placeholder="Repeat your password"
                  value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="btn-gold w-full disabled:opacity-60"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-white px-3">Already have an account?</span>
            </div>
          </div>

          <Link to="/login">
            <button className="btn-outline-gold w-full">Sign In Instead</button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
