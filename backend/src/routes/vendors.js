import { Router } from 'express'
import Vendor from '../models/Vendor.js'

const router = Router()

// GET /api/vendors  — search, filter, sort, paginate
router.get('/', async (req, res) => {
  const { search, category, sort = 'rating', page = 1, limit = 9, price_min, price_max } = req.query

  const filter = {}

  if (search) {
    filter.$or = [
      { name:        { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location:    { $regex: search, $options: 'i' } },
    ]
  }
  if (category && category !== 'All') filter.category = category
  if (price_min) filter.priceRangeMin = { $gte: parseInt(price_min) }
  if (price_max) filter.priceRangeMax = { $lte: parseInt(price_max) }

  const sortMap = {
    rating:     { rating: -1 },
    price_asc:  { priceRangeMin: 1 },
    price_desc: { priceRangeMin: -1 },
    newest:     { createdAt: -1 },
  }
  const sortObj  = sortMap[sort] || { rating: -1 }
  const skip     = (parseInt(page) - 1) * parseInt(limit)

  try {
    const [vendors, total] = await Promise.all([
      Vendor.find(filter).sort(sortObj).skip(skip).limit(parseInt(limit)).lean(),
      Vendor.countDocuments(filter),
    ])

    // Map _id → id for frontend consistency
    const mapped = vendors.map(v => ({ ...v, id: v._id }))
    res.json({ vendors: mapped, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/vendors/:id
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).lean()
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' })
    res.json({ ...vendor, id: vendor._id })
  } catch {
    res.status(404).json({ message: 'Vendor not found' })
  }
})

export default router
