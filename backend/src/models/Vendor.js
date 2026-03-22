import mongoose from 'mongoose'

const vendorSchema = new mongoose.Schema({
  name:            { type: String, required: true, trim: true },
  category:        { type: String, required: true, enum: ['Photography','Catering','Decoration','Venue','Music','Makeup','Mehendi','Invitations'] },
  description:     { type: String, default: '' },
  location:        { type: String, default: '' },
  phone:           { type: String, default: '' },
  email:           { type: String, default: '' },
  rating:          { type: Number, default: 4.5, min: 1, max: 5 },
  priceRangeMin:   { type: Number, default: 10000 },
  priceRangeMax:   { type: Number, default: 100000 },
  imageUrl:        { type: String, default: '' },
  features:        [{ type: String }],
  isFeatured:      { type: Boolean, default: false },
}, { timestamps: true })

vendorSchema.index({ name: 'text', description: 'text', location: 'text' })

export default mongoose.model('Vendor', vendorSchema)
