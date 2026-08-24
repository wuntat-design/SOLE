import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const webinars = [
  {
    id: 1,
    title: 'Stop Asal Matiin PID, Biar Gak Cepat Ngambek!',
    date: '2 Hari lalu',
    youtubeId: '9PlwkttZkt0',
  },
  {
    id: 2,
    title: 'PROFIL BBGTK JAWA TENGAH',
    date: '1 Minggu lalu',
    youtubeId: 'Z2UtJTS-5J0',
  },
  {
    id: 3,
    title: 'WORKSHOP PEMBELAJARAN MENDALAM BAGI GURU BAHASA INGGRIS',
    date: '2 Minggu lalu',
    youtubeId: '-JQB3p66r4o',
  },
  {
    id: 4,
    title: 'Seri Inspirasi Pendidikan (SIP) : Program Inovasi Litnum SDN Kemasan 1 Surakarta',
    date: '3 Minggu lalu',
    youtubeId: 'dgpI6QR8gQQ',
  },
]

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
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold">Webinar Terbaru</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Update pengetahuan dari para ahli di bidang pendidikan</p>
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
