import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

// POST /api/auth/signup
router.post('/signup',
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg })

    const { name, email, password } = req.body
    try {
      const exists = await User.findOne({ email })
      if (exists) return res.status(409).json({ message: 'Email already registered' })

      const hash = await bcrypt.hash(password, 12)
      const user = await User.create({ name, email, password: hash })

      const { password: _, ...safeUser } = user.toObject()
      res.status(201).json({ user: safeUser, token: signToken(user) })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
)

// POST /api/auth/login
router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid input' })

    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(401).json({ message: 'Invalid email or password' })

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) return res.status(401).json({ message: 'Invalid email or password' })

      const { password: _, ...safeUser } = user.toObject()
      res.json({ user: safeUser, token: signToken(user) })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
)

// PUT /api/auth/profile  (protected)
router.put('/profile', authMiddleware, async (req, res) => {
  const { name, phone } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true, select: '-password' }
    )
    res.json(user)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/auth/me  (protected)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
