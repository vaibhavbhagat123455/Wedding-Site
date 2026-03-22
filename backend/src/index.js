import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { connectDB } from './db/index.js'
import { seedVendors } from './db/seed.js'
import authRoutes from './routes/auth.js'
import vendorRoutes from './routes/vendors.js'
import uploadRoutes from './routes/upload.js'
import { inquiryRouter, contactRouter } from './routes/inquiries.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(cors({
  origin: (origin, cb) => {
    const allowed = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:4173'].filter(Boolean)
    if (!origin || allowed.includes(origin) || origin.endsWith('.web.app') || origin.endsWith('.firebaseapp.com') || origin.endsWith('.vercel.app'))
      return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

const limiter     = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 })
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { message: 'Too many auth attempts' } })
app.use('/api', limiter)
app.use('/api/auth', authLimiter)
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth',      authRoutes)
app.use('/api/vendors',   vendorRoutes)
app.use('/api/inquiries', inquiryRouter)
app.use('/api/contact',   contactRouter)
app.use('/api/upload',    uploadRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok', db: 'mongodb', time: new Date().toISOString() }))
app.use((_, res) => res.status(404).json({ message: 'Route not found' }))
app.use((err, _, res, __) => { console.error(err); res.status(500).json({ message: err.message || 'Internal server error' }) })

async function start() {
  await connectDB()
  await seedVendors()
  app.listen(PORT, () => console.log(`🚀 Server on port ${PORT} | http://localhost:${PORT}/api/health`))
}
start()
