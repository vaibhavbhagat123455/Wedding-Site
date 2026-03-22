import { Router } from 'express'
import { Inquiry, Contact } from '../models/Inquiry.js'
import { authMiddleware, optionalAuth } from '../middleware/auth.js'

const inquiryRouter = Router()
const contactRouter = Router()

// POST /api/inquiries
inquiryRouter.post('/', optionalAuth, async (req, res) => {
  const { vendor_id, name, email, phone, message, event_date } = req.body
  if (!vendor_id || !name || !email || !message)
    return res.status(400).json({ message: 'Missing required fields' })

  try {
    const inq = await Inquiry.create({
      userId:    req.user?.id || null,
      vendorId:  vendor_id,
      name, email,
      phone:     phone || '',
      message,
      eventDate: event_date || null,
    })
    res.status(201).json(inq)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/inquiries/my  (protected)
inquiryRouter.get('/my', authMiddleware, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ userId: req.user.id })
      .populate('vendorId', 'name category')
      .sort({ createdAt: -1 })
      .lean()

    const mapped = inquiries.map(i => ({
      ...i,
      id:           i._id,
      vendor_name:  i.vendorId?.name,
      vendor_category: i.vendorId?.category,
      vendor_id:    i.vendorId?._id,
      event_date:   i.eventDate,
    }))
    res.json(mapped)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/contact
contactRouter.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body
  if (!name || !email || !message)
    return res.status(400).json({ message: 'Missing required fields' })

  try {
    await Contact.create({ name, email, phone: phone || '', subject: subject || '', message })
    res.status(201).json({ message: 'Message received!' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export { inquiryRouter, contactRouter }
