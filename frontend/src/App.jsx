import { Outlet } from '@tanstack/react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Inter', background: '#fff', color: '#1a0a0f' },
          success: { iconTheme: { primary: '#d4a820', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
