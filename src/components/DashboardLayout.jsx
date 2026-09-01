import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { syncYouTubeFeed } from '../services/youtubeService'

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const location = useLocation()
  const path = location.pathname
  
  const { user, isLoggedIn, logout } = useAuth()
  
  // Mock role untuk simulasi. 
  const userRole = user?.role || 'user'

  const handleAdminSync = async () => {
    setIsSyncing(true)
    const result = await syncYouTubeFeed()
    if (result.success) {
      alert(`✅ Berhasil menyinkronkan ${result.count} video dari YouTube!`)
    } else {
      alert('❌ Gagal melakukan sinkronisasi YouTube.')
    }
    setIsSyncing(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      {/* Side Navigation */}
      <aside className={`border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden border-r-0'}`}>
        <div className="p-6 flex flex-col gap-8 h-full min-w-[256px]">
          {/* Brand Profile */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 bg-white dark:bg-slate-800 p-2 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
              <img
                alt="Logo"
                className="h-full object-contain"
                src="/logoAsset7.png"
              />
            </div>
          </Link>

          {/* Nav Menu */}
          <nav className="flex flex-col gap-1.5 grow">
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path === '/' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <span className={`material-symbols-outlined ${path === '/' ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>grid_view</span>
              <span className={`text-sm ${path === '/' ? 'font-semibold' : 'font-medium'}`}>Dashboard</span>
            </Link>
            <Link 
              to="/webinar" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path === '/webinar' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <span className={`material-symbols-outlined ${path === '/webinar' ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>video_library</span>
              <span className={`text-sm ${path === '/webinar' ? 'font-semibold' : 'font-medium'}`}>Webinars</span>
            </Link>
            <Link 
              to="/best-practice" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path.startsWith('/best-practice') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <span className={`material-symbols-outlined ${path.startsWith('/best-practice') ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>verified</span>
              <span className={`text-sm ${path.startsWith('/best-practice') ? 'font-semibold' : 'font-medium'}`}>Best Practices</span>
            </Link>
            
            {/* Moderation Link - Conditional on Role */}
            {(userRole === 'admin' || userRole === 'superadmin') && (
              <Link 
                to="/moderation" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path === '/moderation' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <span className={`material-symbols-outlined ${path === '/moderation' ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`} style={{ fontVariationSettings: path === '/moderation' ? "'FILL' 1" : undefined }}>security</span>
                <span className={`text-sm ${path === '/moderation' ? 'font-semibold' : 'font-medium'}`}>Moderasi</span>
              </Link>
            )}
            
            {isLoggedIn && (
              <Link 
                to="/profile" 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path === '/profile' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <span className={`material-symbols-outlined ${path === '/profile' ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>account_circle</span>
                <span className={`text-sm ${path === '/profile' ? 'font-semibold' : 'font-medium'}`}>User Profil</span>
              </Link>
            )}
            {(userRole === 'admin' || userRole === 'superadmin') && (
              <>
                <button 
                  onClick={handleAdminSync}
                  disabled={isSyncing}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group cursor-pointer disabled:opacity-50 text-left"
                >
                  <span className={`material-symbols-outlined text-red-600 dark:text-red-400 ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
                  <span className="text-sm font-semibold">{isSyncing ? 'Syncing...' : 'Sync YouTube'}</span>
                </button>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">folder_open</span>
                  <span className="text-sm font-medium">Resources</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                  <span className="material-symbols-outlined text-slate-500 group-hover:text-primary">groups</span>
                  <span className="text-sm font-medium">Community</span>
                </a>
              </>
            )}
          </nav>

          {/* Footer Nav */}
          {userRole === 'superadmin' && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link to="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path.startsWith('/settings') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                <span className={`material-symbols-outlined ${path.startsWith('/settings') ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>settings</span>
                <span className={`text-sm ${path.startsWith('/settings') ? 'font-semibold' : 'font-medium'}`}>Settings</span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark overflow-y-auto">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shrink-0 transition-all">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {path.startsWith('/settings') ? 'Admin Settings' : path.startsWith('/best-practice') ? 'Best Practice Gallery' : path === '/webinar' ? 'Perpustakaan Webinar' : 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user?.fullName || 'User'}</p>
                    <p className="text-xs text-slate-500">{user?.role || 'Guest'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1gviX_nqby5f_71RuatWPDf2bbdUQPKSkr1aWwR3z4OTZyj9IAUGsV5Mbh6MaYWDPOxHHn-QcIWn8O70T-MqGw888i7kfYd3Mawmkvx-9RniQ5faoUttJkUdEffJxRH79Qy7smr55yDR-0fTgn7v_tjTFfh0HNb7E8ku77c8KxcwLZxAtukXfNdxlJHkbrSsnQzE7T1QfbbnuCXKPVJdVRjLxzg90zXzOoZ1lRpM_z9K8Ix6FHbhGkZpKkdeYlEXaJjWCQy9j-jhu"
                    />
                  </div>
                  <button onClick={logout} className="ml-2 w-8 h-8 flex items-center justify-center rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer" title="Keluar">
                    <span className="material-symbols-outlined text-xl">logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="px-6 py-2 bg-[linear-gradient(135deg,#003d9b_0%,#0052cc_100%)] text-white text-sm font-bold rounded-full hover:opacity-90 transition-opacity">
                Login
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        {children}

        {/* Generic Footer if you still want it inside the layout, otherwise children can render it */}
      </main>
    </div>
  )
}
