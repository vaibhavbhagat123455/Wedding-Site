import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Star, MapPin, Heart, ArrowRight, BadgeCheck } from 'lucide-react'

const CAT_COLORS = {
  Photography: 'bg-rose-100 text-rose-700',
  Catering:    'bg-amber-100 text-amber-700',
  Decoration:  'bg-purple-100 text-purple-700',
  Venue:       'bg-blue-100 text-blue-700',
  Music:       'bg-green-100 text-green-700',
  Makeup:      'bg-pink-100 text-pink-700',
  Mehendi:     'bg-orange-100 text-orange-700',
  Invitations: 'bg-indigo-100 text-indigo-700',
}

// Curated Unsplash images per category
const CAT_FALLBACKS = {
  Photography: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop&q=80',
  Catering:    'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop&q=80',
  Decoration:  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop&q=80',
  Venue:       'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&q=80',
  Music:       'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop&q=80',
  Makeup:      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=400&fit=crop&q=80',
  Mehendi:     'https://www.marriagecolours.com/wp-content/uploads/2025/06/shriya-jack-mehndi-sheraton-grand-1.png',
  Invitations: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=600&h=400&fit=crop&q=80',
}

export default function VendorCard({ vendor, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const cat    = CAT_COLORS[vendor.category] || 'bg-gray-100 text-gray-700'
  const stars  = Math.round(parseFloat(vendor.rating) || 4)
  const imgSrc = vendor.imageUrl || vendor.image_url || CAT_FALLBACKS[vendor.category] || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop'
  const id     = vendor._id || vendor.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 group"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img src={imgSrc} alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={e => { e.target.src = CAT_FALLBACKS[vendor.category] || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Like */}
        <button onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm
                     flex items-center justify-center shadow-md hover:scale-110 transition-transform">
          <Heart size={15} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
        </button>

        {/* Featured badge */}
        {(vendor.isFeatured || vendor.is_featured) && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-gold-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            <BadgeCheck size={11} /> Featured
          </div>
        )}

        {/* Category */}
        <span className={`absolute bottom-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${cat}`}>
          {vendor.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-burgundy mb-1.5 line-clamp-1">
          {vendor.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12}
              className={i < stars ? 'text-gold-500 fill-gold-500' : 'text-gray-200 fill-gray-200'} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({vendor.rating || '4.5'})</span>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={12} className="text-gold-500 shrink-0" />
          <span className="line-clamp-1 text-xs">{vendor.location || 'India'}</span>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {vendor.description || 'Premium wedding services crafted to make your special day unforgettable.'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="font-bold text-burgundy font-serif text-base">
              ₹{Number(vendor.priceRangeMin || vendor.price_range_min || 15000).toLocaleString()}
            </p>
          </div>
          <Link to={`/vendors/${id}`}>
            <motion.button whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-gold-700 bg-gold-50 px-3 py-1.5 rounded-full hover:bg-gold-100 transition-colors">
              View <ArrowRight size={13} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
