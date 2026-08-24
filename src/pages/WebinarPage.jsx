import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

const videos = [
  {
    id: 1,
    title: 'Stop Asal Matiin PID, Biar Gak Cepat Ngambek!',
    category: 'Teknologi',
    categoryColor: 'text-primary bg-primary/10',
    youtubeId: '9PlwkttZkt0',
    date: '2 Hari lalu',
    views: 'Youtube Video',
  },
  {
    id: 2,
    title: 'PROFIL BBGTK JAWA TENGAH',
    category: 'Profil',
    categoryColor: 'text-emerald-600 bg-emerald-100',
    youtubeId: 'Z2UtJTS-5J0',
    date: '1 Minggu lalu',
    views: 'Youtube Video',
  },
  {
    id: 3,
    title: 'WORKSHOP PEMBELAJARAN MENDALAM BAGI GURU BAHASA INGGRIS',
    category: 'Pedagogi',
    categoryColor: 'text-amber-600 bg-amber-100',
    youtubeId: '-JQB3p66r4o',
    date: '2 Minggu lalu',
    views: 'Youtube Video',
  },
  {
    id: 4,
    title: 'Seri Inspirasi Pendidikan (SIP) : Program Inovasi Litnum SDN Kemasan 1 Surakarta',
    category: 'Inspirasi',
    categoryColor: 'text-violet-600 bg-violet-100',
    youtubeId: 'dgpI6QR8gQQ',
    date: '3 Minggu lalu',
    views: 'Youtube Video',
  },
  {
    id: 5,
    title: 'Momen Talkshow Pendidikan & Pemberian Penghargaan Apresiasi GTK Jawa Tengah 2025',
    category: 'Penghargaan',
    categoryColor: 'text-sky-600 bg-sky-100',
    youtubeId: 'CgguFdiiNho',
    date: '1 Bulan lalu',
    views: 'Youtube Video',
  },
  {
    id: 6,
    title: 'Tutorial Masuk LMS BBGTK Jawa Tengah',
    category: 'Tutorial',
    categoryColor: 'text-rose-600 bg-rose-100',
    youtubeId: 'i4jNEeZbUag',
    date: '2 Bulan lalu',
    views: 'Youtube Video',
  }
]

export default function WebinarPage() {
  const { isLoggedIn } = useAuth()
  return (
    <div className="flex flex-col flex-1 w-full relative">
      <div className="flex flex-1 justify-center py-10 px-6 md:px-20 bg-background-light dark:bg-background-dark w-full">
        <div className="layout-content-container flex flex-col max-w-[1200px] w-full flex-1">
          {/* Hero Section */}
          <div className="flex flex-wrap justify-between gap-3 mb-8">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Perpustakaan Webinar
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-normal max-w-2xl">
                Akses kembali rekaman webinar pendidikan berkualitas dari kanal resmi BBGTK Jawa Tengah untuk peningkatan kompetensi berkelanjutan.
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
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-slate-900 h-full placeholder:text-slate-400 px-4 pl-2 text-base font-normal leading-normal"
                    placeholder="Cari judul webinar atau narasumber..."
                  />
                </div>
              </label>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-5 shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors cursor-pointer">
                <span className="text-sm font-semibold">Semua Kategori</span>
              </button>
              {['Kurikulum Merdeka', 'Pedagogi', 'Kepemimpinan', 'Teknologi Pendidikan'].map((filter) => (
                <button
                  key={filter}
                  className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary px-5 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                >
                  <span className="text-sm font-medium">{filter}</span>
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
              ))}
            </div>
          </div>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 w-full">
            {videos.map((video) => (
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
                        <span className="material-symbols-outlined text-sm">visibility</span>
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
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10 mb-8">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold cursor-pointer">
              1
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors font-medium cursor-pointer">
              2
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors font-medium cursor-pointer">
              3
            </button>
            <span className="text-slate-400 px-2">...</span>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
