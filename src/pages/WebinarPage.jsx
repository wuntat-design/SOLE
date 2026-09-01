import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'
import { getStoredVideos, getStoredLastSynced, syncYouTubeFeed } from '../services/youtubeService'

export default function WebinarPage() {
  const { user, isLoggedIn } = useAuth()
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
  const [videoList, setVideoList] = useState(getStoredVideos)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState(getStoredLastSynced)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const VIDEOS_PER_PAGE = 30

  useEffect(() => {
    const handleSyncedEvent = (e) => {
      if (e.detail?.videos) {
        setVideoList(e.detail.videos)
        setLastSynced(e.detail.time)
      }
    }
    window.addEventListener('youtube_synced', handleSyncedEvent)
    return () => window.removeEventListener('youtube_synced', handleSyncedEvent)
  }, [])

  // Reset page when search or category filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  const handleSync = async () => {
    setIsSyncing(true)
    const result = await syncYouTubeFeed()
    if (result.success) {
      setVideoList(result.videos)
      setLastSynced(result.time)
    }
    setIsSyncing(false)
  }

  const filteredVideos = videoList.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE) || 1
  const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE
  const currentVideos = filteredVideos.slice(startIndex, startIndex + VIDEOS_PER_PAGE)

  return (
    <div className="flex flex-col flex-1 w-full relative">
      <div className="flex flex-1 justify-center py-10 px-6 md:px-20 bg-background-light dark:bg-background-dark w-full">
        <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1">
          {/* Hero Section */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div className="flex min-w-72 flex-col gap-3">
              <div className="flex items-center gap-4">
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Perpustakaan Webinar
                </h1>
                {isAdmin && (
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-red-600 text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-base ${isSyncing ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                    {isSyncing ? 'Syncing...' : 'Sync Data YouTube'}
                  </button>
                )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-normal max-w-2xl">
                Akses kembali rekaman webinar pendidikan berkualitas dari kanal resmi BBGTK Jawa Tengah untuk peningkatan kompetensi berkelanjutan.
                {lastSynced && (
                  <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    ✓ Tersinkronisasi RSS jam {lastSynced}
                  </span>
                )}
              </p>
            </div>
          </div>
          {/* Search and Filters Section */}
          <div className="flex flex-col gap-6 sticky top-0 z-10 bg-background-light dark:bg-background-dark py-4">
            <div className="w-full">
              <label className="flex flex-col min-w-40 h-14 w-full group">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <div className="text-slate-400 bg-white dark:bg-slate-900 flex items-center justify-center pl-5 rounded-l-xl border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-slate-900 h-full placeholder:text-slate-400 px-4 pl-2 text-base font-normal leading-normal"
                    placeholder="Cari judul webinar atau narasumber..."
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {['Semua', 'Sekampadi', 'PPG', 'Pedagogi', 'Teknologi', 'Inspirasi', 'Profil', 'Tutorial'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{category === 'Semua' ? 'Semua Kategori' : category}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 w-full">
            {currentVideos.map((video) => (
              <div
                key={video.id}
                className="flex flex-col gap-4 group cursor-pointer bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-lg">
                  <iframe
                    className="w-full h-full absolute inset-0 z-20"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="flex gap-2 mb-2">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${video.categoryColor}`}>
                      {video.category}
                    </span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        {video.date}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-sm">rss_feed</span>
                        {video.views}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
                      >
                        Buka di YouTube
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </a>
                      {isLoggedIn && (
                        <Link
                          to={`/best-practice/create?webinarId=${video.id}`}
                          className="bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">edit_note</span>
                          Tulis Praktik Baik
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {filteredVideos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Menampilkan <span className="font-bold text-slate-900 dark:text-white">{startIndex + 1}</span> - <span className="font-bold text-slate-900 dark:text-white">{Math.min(startIndex + VIDEOS_PER_PAGE, filteredVideos.length)}</span> dari <span className="font-bold text-slate-900 dark:text-white">{filteredVideos.length}</span> Video Webinar
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                    Sebelumnya
                  </button>

                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Selanjutnya
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
