import { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Heart, Mail, Lock } from 'lucide-react'
import api from '../api/client'
import useAuthStore from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const { login }             = useAuthStore()
  const router                = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      login(data.user, data.token)
      toast.success(`Welcome back, ${data.user.name?.split(' ')[0]}!`)
      router.navigate({ to: '/dashboard' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 pt-20">
      <div className="w-full max-w-md">
        {/* Logo */}
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
          <h1 className="font-serif text-3xl font-bold text-burgundy">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue planning your perfect day</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-card border border-gold-100/50"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="email" required className="input-field pl-11"
                  placeholder="you@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type={show ? 'text' : 'password'} required className="input-field pl-11 pr-11"
                  placeholder="Your password"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="btn-gold w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-400">
              <span className="bg-white px-3">New here?</span>
            </div>
          </div>

          <Link to="/signup">
            <button className="btn-outline-gold w-full">Create Free Account</button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
