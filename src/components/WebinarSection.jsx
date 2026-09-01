import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getStoredVideos, getStoredLastSynced, syncYouTubeFeed } from '../services/youtubeService'

function WebinarCard({ webinar }) {
  const { isLoggedIn } = useAuth()
  return (
    <div className="flex flex-col group bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900">
        <iframe
          className="w-full h-full absolute inset-0 z-20"
          src={`https://www.youtube.com/embed/${webinar.youtubeId}`}
          title={webinar.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-primary mb-2">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          <span className="text-xs font-semibold">{webinar.date}</span>
        </div>
        <h3 className="text-slate-900 dark:text-slate-100 font-bold text-base mb-4 line-clamp-2">
          {webinar.title}
        </h3>
        <div className="mt-auto flex flex-col gap-2">
          <a
            href={`https://www.youtube.com/watch?v=${webinar.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 rounded-lg bg-primary/10 text-primary text-sm font-bold text-center hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            Tonton di YouTube
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
          {isLoggedIn && (
            <Link
              to={`/best-practice/create?webinarId=${webinar.id}`}
              className="w-full py-2 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm font-bold text-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              Tulis Praktik Baik
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function WebinarSection() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
  const [webinars, setWebinars] = useState(() => getStoredVideos().slice(0, 4))
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState(getStoredLastSynced)

  useEffect(() => {
    const handleSyncedEvent = (e) => {
      if (e.detail?.videos) {
        setWebinars(e.detail.videos.slice(0, 4))
        setLastSynced(e.detail.time)
      }
    }
    window.addEventListener('youtube_synced', handleSyncedEvent)
    return () => window.removeEventListener('youtube_synced', handleSyncedEvent)
  }, [])

  const handleSync = async () => {
    setIsSyncing(true)
    const result = await syncYouTubeFeed()
    if (result.success) {
      setWebinars(result.videos.slice(0, 4))
      setLastSynced(result.time)
    }
    setIsSyncing(false)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold">Webinar Terbaru</h2>
            {isAdmin && (
              <button
                onClick={handleSync}
                disabled={isSyncing}
                title="Sync data dari RSS Feed YouTube BBGTK"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>
                  sync
                </span>
                {isSyncing ? 'Syncing RSS...' : 'Sync YouTube'}
              </button>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm flex items-center gap-2">
            Update pengetahuan dari para ahli di bidang pendidikan
            {lastSynced && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                ✓ Sync jam {lastSynced}
              </span>
            )}
          </p>
        </div>
        <Link
          to="/webinar"
          id="webinar-view-all"
          className="hidden sm:flex items-center gap-1 text-primary font-semibold text-sm hover:underline shrink-0"
        >
          Lihat Semua (Katalog)
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {webinars.map((webinar) => (
          <WebinarCard key={webinar.id} webinar={webinar} />
        ))}
      </div>
      <div className="mt-8 text-center sm:hidden">
        <Link
          to="/webinar"
          className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
        >
          Lihat Semua (Katalog)
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
