import { useState, useEffect } from 'react'
import { Link, useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { User, Heart, MessageSquare, Calendar, LogOut, Settings, ChevronRight, Sparkles, Bell } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import useAuthStore from '../hooks/useAuth'
import api from '../api/client'
import toast from 'react-hot-toast'

const TABS = [
  { id:'overview',  label:'Overview',  icon:Sparkles },
  { id:'inquiries', label:'Inquiries', icon:MessageSquare },
  { id:'saved',     label:'Saved',     icon:Heart },
  { id:'profile',   label:'Profile',   icon:Settings },
]

export default function Dashboard() {
  const { user, logout }   = useAuthStore()
  const router             = useRouter()
  const [tab,setTab]       = useState('overview')
  const [inquiries,setInquiries] = useState([])
  const [loading,setLoading]     = useState(true)
  const [profile,setProfile]     = useState({ name:'', email:'', phone:'' })
  const [saving,setSaving]       = useState(false)

  useEffect(()=>{
    if (!user) { router.navigate({to:'/login'}); return }
    setProfile({ name:user.name||'', email:user.email||'', phone:user.phone||'' })
    api.get('/inquiries/my').then(r=>setInquiries(r.data||[])).catch(()=>{}).finally(()=>setLoading(false))
  },[user,router])

  const handleLogout = () => { logout(); toast.success('Logged out!'); router.navigate({to:'/'}) }
  const handleSave   = async (e) => {
    e.preventDefault(); setSaving(true)
    try { await api.put('/auth/profile',profile); toast.success('Profile updated!') }
    catch { toast.error('Failed to update') }
    finally { setSaving(false) }
  }

  if (!user) return null
  const initials = user.name?.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)||'U'

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-burgundy to-burgundy-light text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center font-serif text-xl font-bold shadow-md">
              {initials}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">Welcome back, {user.name?.split(' ')[0]}! 👋</h1>
              <p className="text-gray-300 text-sm">Member since {new Date(user.createdAt||user.created_at||Date.now()).toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="hidden md:flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <LogOut size={15}/> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 space-y-1">
            {TABS.map(({id,label,icon:Icon})=>(
              <button key={id} onClick={()=>setTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${tab===id ? 'bg-burgundy text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-burgundy'}`}>
                <Icon size={15}/> {label}
              </button>
            ))}
            <hr className="my-1 border-gray-100"/>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition-all">
              <LogOut size={15}/> Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Overview */}
          {tab==='overview' && (
            <AnimatedSection className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  {label:'Inquiries Sent', value:inquiries.length, icon:MessageSquare, color:'bg-blue-50 text-blue-500', border:'border-blue-100'},
                  {label:'Vendors Saved',  value:0,                icon:Heart,         color:'bg-rose-50 text-rose-500',  border:'border-rose-100'},
                  {label:'Upcoming Events',value:inquiries.filter(i=>i.eventDate&&new Date(i.eventDate)>new Date()).length, icon:Calendar, color:'bg-gold-50 text-gold-600', border:'border-gold-100'},
                ].map(({label,value,icon:Icon,color,border})=>(
                  <div key={label} className={`bg-white rounded-2xl p-6 shadow-sm border ${border} flex items-center gap-4`}>
                    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}><Icon size={20}/></div>
                    <div><p className="font-serif text-2xl font-bold text-gray-800">{value}</p><p className="text-xs text-gray-500">{label}</p></div>
                  </div>
                ))}
              </div>

              {/* Recent inquiries */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-serif text-lg font-bold text-burgundy">Recent Inquiries</h3>
                  <button onClick={()=>setTab('inquiries')} className="text-xs text-gold-600 hover:underline flex items-center gap-1">
                    View all <ChevronRight size={12}/>
                  </button>
                </div>
                {loading ? (
                  <div className="space-y-3">{[1,2,3].map(i=><div key={i} className="h-14 shimmer-bg rounded-xl"/>)}</div>
                ) : inquiries.length===0 ? (
                  <div className="text-center py-10">
                    <MessageSquare className="text-gray-200 mx-auto mb-3" size={40}/>
                    <p className="text-gray-400 text-sm mb-4">No inquiries yet.</p>
                    <Link to="/vendors"><button className="btn-gold text-sm py-2 px-6">Browse Vendors</button></Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0,3).map(inq=>(
                      <div key={inq._id||inq.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-sm text-burgundy">{inq.vendor_name||'Vendor'}</p>
                          <p className="text-xs text-gray-400 line-clamp-1">{inq.message?.slice(0,60)}...</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ml-3
                          ${inq.status==='replied'?'bg-green-100 text-green-700':'bg-amber-100 text-amber-700'}`}>
                          {inq.status||'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick actions */}
              <div className="bg-gradient-to-r from-burgundy to-burgundy-light rounded-2xl p-6 text-white">
                <h3 className="font-serif text-lg font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/vendors"><button className="bg-white/15 hover:bg-white/25 transition-colors text-sm font-medium px-4 py-3 rounded-xl text-left">🔍 Browse Vendors</button></Link>
                  <Link to="/contact"><button className="bg-white/15 hover:bg-white/25 transition-colors text-sm font-medium px-4 py-3 rounded-xl text-left">📞 Get Consultation</button></Link>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Inquiries */}
          {tab==='inquiries' && (
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-serif text-xl font-bold text-burgundy mb-6">All Inquiries</h3>
                {inquiries.length===0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="text-gray-200 mx-auto mb-3" size={48}/>
                    <p className="text-gray-400 mb-4">You haven't sent any inquiries yet.</p>
                    <Link to="/vendors"><button className="btn-gold text-sm py-2 px-6">Browse Vendors</button></Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map(inq=>(
                      <motion.div key={inq._id||inq.id} whileHover={{x:4}}
                        className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-serif font-semibold text-burgundy">{inq.vendor_name||'Vendor'}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0
                              ${inq.status==='replied'?'bg-green-100 text-green-700':'bg-amber-100 text-amber-700'}`}>
                              {inq.status||'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">{inq.message}</p>
                          {(inq.eventDate||inq.event_date) && (
                            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                              <Calendar size={11}/> {new Date(inq.eventDate||inq.event_date).toLocaleDateString('en-IN')}
                            </p>
                          )}
                        </div>
                        <Link to={`/vendors/${inq.vendorId||inq.vendor_id}`}>
                          <ChevronRight size={18} className="text-gray-300 ml-3 shrink-0"/>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* Saved */}
          {tab==='saved' && (
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center py-16">
                <Heart className="text-gray-200 mx-auto mb-3" size={48}/>
                <h3 className="font-serif text-xl text-burgundy mb-2">No Saved Vendors</h3>
                <p className="text-gray-400 mb-5 text-sm">Click the heart icon on any vendor to save them here.</p>
                <Link to="/vendors"><button className="btn-gold text-sm py-2.5 px-8">Browse Vendors</button></Link>
              </div>
            </AnimatedSection>
          )}

          {/* Profile */}
          {tab==='profile' && (
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-serif text-xl font-bold text-burgundy mb-7">Edit Profile</h3>
                <form onSubmit={handleSave} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
                    <input className="input-field" value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})}/>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email</label>
                    <input className="input-field bg-gray-50 cursor-not-allowed" value={profile.email} readOnly/>
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
                    <input type="tel" className="input-field" value={profile.phone} onChange={e=>setProfile({...profile,phone:e.target.value})}/>
                  </div>
                  <button type="submit" disabled={saving} className="btn-gold disabled:opacity-60">
                    {saving?'Saving...':'Save Changes'}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          )}
        </main>
      </div>
    </div>
  )
}
