import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { syncYouTubeFeed } from '../services/youtubeService'

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()
  const path = location.pathname
  
  const { user, isLoggedIn, logout } = useAuth()
  
  // Read notifications
  const notifications = JSON.parse(localStorage.getItem('bbgtk_notifications') || '[]')
  
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
            
            {/* Dashboard Pengguna & Moderation Links - Restricted to Admin, Moderator, Super Admin */}
            {(userRole === 'admin' || userRole === 'superadmin' || userRole === 'moderator') && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path === '/admin/dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <span className={`material-symbols-outlined ${path === '/admin/dashboard' ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>admin_panel_settings</span>
                  <span className={`text-sm ${path === '/admin/dashboard' ? 'font-semibold' : 'font-medium'}`}>Dashboard Pengguna</span>
                </Link>
                <Link 
                  to="/moderation" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${path === '/moderation' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <span className={`material-symbols-outlined ${path === '/moderation' ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`} style={{ fontVariationSettings: path === '/moderation' ? "'FILL' 1" : undefined }}>security</span>
                  <span className={`text-sm ${path === '/moderation' ? 'font-semibold' : 'font-medium'}`}>Moderasi</span>
                </Link>
              </>
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
                <span className={`material-symbols-outlined ${path.startsWith('/settings') ? 'fill-1' : 'text-slate-500 group-hover:text-primary'}`}>manage_accounts</span>
                <span className={`text-sm ${path.startsWith('/settings') ? 'font-semibold' : 'font-medium'}`}>Kelola Role & Moderator</span>
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
              {path === '/admin/dashboard' ? 'Dashboard Pengguna & Log Aktivitas' : path === '/moderation' ? 'Moderasi Konten' : path.startsWith('/settings') ? 'Kelola Role & Moderator' : path.startsWith('/best-practice') ? 'Best Practice Gallery' : path === '/webinar' ? 'Perpustakaan Webinar' : 'Dashboard Utama'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer relative"
                  >
                    <span className="material-symbols-outlined">notifications</span>
                    {notifications.length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                    )}
                  </button>

                  {/* Notification Dropdown Drawer */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-base">notifications_active</span>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi Moderasi</h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {notifications.length} Pesan
                        </span>
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-slate-400 italic">
                            Tidak ada notifikasi baru saat ini.
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div key={notif.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                  notif.type === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'
                                }`}>
                                  <span className="material-symbols-outlined text-base">
                                    {notif.type === 'rejected' ? 'block' : 'check_circle'}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <h4 className={`text-xs font-bold ${notif.type === 'rejected' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                      {notif.type === 'rejected' ? '⚠️ Postingan Ditolak' : '✅ Postingan Disetujui'}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 font-mono">{notif.timestamp}</span>
                                  </div>
                                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">
                                    {notif.postTitle}
                                  </p>
                                  {notif.type === 'rejected' && notif.rejectNote && (
                                    <div className="mt-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 text-xs text-red-700 dark:text-red-300 font-medium">
                                      <span className="font-bold block mb-0.5">Alasan Penolakan:</span>
                                      "{notif.rejectNote}"
                                    </div>
                                  )}
                                  {notif.type === 'rejected' && (
                                    <Link
                                      to="/profile"
                                      onClick={() => setShowNotifications(false)}
                                      className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-primary hover:underline"
                                    >
                                      <span>Perbaiki & Ajukan Ulang</span>
                                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 text-center border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() => {
                              localStorage.removeItem('bbgtk_notifications')
                              setShowNotifications(false)
                            }}
                            className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer"
                          >
                            Hapus Semua Notifikasi
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

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
