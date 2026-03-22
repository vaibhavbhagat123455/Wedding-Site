import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  vendorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, default: '' },
  message:    { type: String, required: true },
  eventDate:  { type: Date, default: null },
  status:     { type: String, enum: ['pending', 'replied', 'closed'], default: 'pending' },
}, { timestamps: true })

const contactSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  phone:    { type: String, default: '' },
  subject:  { type: String, default: '' },
  message:  { type: String, required: true },
}, { timestamps: true })

export const Inquiry = mongoose.model('Inquiry', inquirySchema)
export const Contact = mongoose.model('Contact', contactSchema)
