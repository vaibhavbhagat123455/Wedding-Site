import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X, ChevronDown, Grid, List } from 'lucide-react'
import VendorCard from '../components/VendorCard'
import AnimatedSection from '../components/AnimatedSection'
import api from '../api/client'

const CATEGORIES = ['All','Photography','Catering','Decoration','Venue','Music','Makeup','Mehendi','Invitations']
const SORTS = [
  {label:'Most Popular', value:'rating'},
  {label:'Price: Low → High', value:'price_asc'},
  {label:'Price: High → Low', value:'price_desc'},
  {label:'Newest First', value:'newest'},
]

const CAT_ICONS = {
  Photography:'📸', Catering:'🍽️', Decoration:'🌸', Venue:'🏛️',
  Music:'🎵', Makeup:'💄', Mehendi:'✋', Invitations:'✉️'
}

export default function VendorListing() {
  const [vendors,setVendors]   = useState([])
  const [loading,setLoading]   = useState(true)
  const [query,setQuery]       = useState('')
  const [category,setCategory] = useState('All')
  const [sort,setSort]         = useState('rating')
  const [page,setPage]         = useState(1)
  const [total,setTotal]       = useState(0)
  const [filtersOpen,setFiltersOpen] = useState(false)
  const [priceMin,setPriceMin] = useState('')
  const [priceMax,setPriceMax] = useState('')

  const fetchVendors = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page, limit:9, sort,
        ...(query && {search:query}),
        ...(category!=='All' && {category}),
        ...(priceMin && {price_min:priceMin}),
        ...(priceMax && {price_max:priceMax}),
      })
      const {data} = await api.get(`/vendors?${params}`)
      setVendors(data.vendors||[])
      setTotal(data.total||0)
    } catch { setVendors([]) }
    finally  { setLoading(false) }
  }, [query,category,sort,page,priceMin,priceMax])

  useEffect(()=>{ fetchVendors() },[fetchVendors])

  const pages = Math.ceil(total/9)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero header */}
      <div className="relative bg-gradient-to-br from-burgundy-dark via-burgundy to-burgundy-light pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=600&fit=crop&q=80"
            alt="Vendors" className="w-full h-full object-cover opacity-20"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/90 to-burgundy-dark/90"/>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <p className="font-script text-2xl text-gold-400 mb-2">Discover</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Wedding Vendors</h1>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Find the perfect professionals to make your special day unforgettable</p>
          {/* Inline search */}
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={16}/>
              <input type="text" value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}}
                placeholder="Search vendors, services, locations..."
                className="w-full bg-transparent text-white placeholder-white/50 pl-11 pr-4 py-3 text-sm focus:outline-none"/>
            </div>
            <button className="btn-gold text-sm px-6 py-3" onClick={fetchVendors}>Search</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category pills */}
        <AnimatedSection className="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>{setCategory(cat);setPage(1)}}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${category===cat
                  ? 'bg-burgundy text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-400 hover:text-gold-600'}`}>
              {CAT_ICONS[cat] || ''} {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Filters row */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <button onClick={()=>setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gold-400 text-gold-600 font-medium hover:bg-gold-50 transition-colors text-sm">
            <SlidersHorizontal size={16}/> Filters
            <ChevronDown size={14} className={`transition-transform ${filtersOpen?'rotate-180':''}`}/>
          </button>
          <select value={sort} onChange={e=>setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer">
            {SORTS.map(s=><option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          {!loading && (
            <p className="text-sm text-gray-400 flex items-center ml-auto">
              {total>0 ? `${total} vendors found` : 'No vendors found'}
            </p>
          )}
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {filtersOpen&&(
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden mb-6">
              <div className="p-5 bg-white rounded-2xl border border-gold-100 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">Min Price (₹)</label>
                  <input type="number" value={priceMin} onChange={e=>setPriceMin(e.target.value)} placeholder="0"
                    className="w-28 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"/>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">Max Price (₹)</label>
                  <input type="number" value={priceMax} onChange={e=>setPriceMax(e.target.value)} placeholder="500000"
                    className="w-28 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"/>
                </div>
                <button onClick={()=>{setPriceMin('');setPriceMax('')}} className="text-sm text-red-400 hover:text-red-600 font-medium">Clear</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({length:9}).map((_,i)=>(
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card">
                <div className="h-52 shimmer-bg"/>
                <div className="p-5 space-y-3">
                  <div className="h-5 shimmer-bg rounded w-3/4"/>
                  <div className="h-4 shimmer-bg rounded w-1/2"/>
                  <div className="h-4 shimmer-bg rounded w-full"/>
                </div>
              </div>
            ))}
          </div>
        ) : vendors.length===0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="font-serif text-2xl text-burgundy mb-2">No Vendors Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
            <button onClick={()=>{setQuery('');setCategory('All');setPriceMin('');setPriceMax('')}} className="btn-gold">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {vendors.map((v,i)=><VendorCard key={v._id||v.id} vendor={v} index={i}/>)}
          </div>
        )}

        {/* Pagination */}
        {pages>1&&(
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({length:pages}).map((_,i)=>(
              <button key={i} onClick={()=>setPage(i+1)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all
                  ${page===i+1 ? 'bg-burgundy text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gold-400'}`}>
                {i+1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
