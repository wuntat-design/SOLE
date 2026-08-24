import { Link } from 'react-router-dom'

const practices = [
  {
    id: 1,
    title: 'Implementasi Project-Based Learning pada Mata Pelajaran IPA Kelas 5',
    category1: { label: 'Kurikulum Merdeka', color: 'bg-primary/10 text-primary' },
    category2: { label: 'SD/MI', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    duration: '12:45',
    verified: true,
    image: 'https://img.youtube.com/vi/9PlwkttZkt0/maxresdefault.jpg',
    author: {
      name: 'Siti Aminah, S.Pd.',
      role: 'Guru Penggerak • SDN 01 Semarang',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-8xpplCSu57mY2vHJ97ASVWoeuqps0qQWLj2bArLxQM499bqv0_hE2Dlnhxg1YYwNn4OQcyDd5d8X21bRQC3Ok8TcM47hmdJjpSG9WBo3ZPt7ylfU3pQwW3eVlVfI-Rm5bdmlDb0OrhSbaz4wRfY6Iio9wNuz7JkIilhn0Vl3FkznpHECxWa9R62F7UsCRp1Pl8Hvw4itNDyPBy4zaZLf0CJ7lTZnJyQtJ8jjVT_-XcQ0wUNFmo68p8osvnneyx50h8iYmBJN_dcB'
    }
  },
  {
    id: 2,
    title: 'Pemanfataan Gamifikasi Quizizz untuk Meningkatkan Motivasi Belajar Matematika',
    category1: { label: 'Digital Learning', color: 'bg-primary/10 text-primary' },
    category2: { label: 'SMP/MTs', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    duration: '08:30',
    verified: true,
    image: 'https://img.youtube.com/vi/Z2UtJTS-5J0/maxresdefault.jpg',
    author: {
      name: 'Andi Hermawan, M.Pd.',
      role: 'Guru TIK • SMPN 4 Surakarta',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfb2Jdeu8e8ePIMvJ9B2riLgwTF_tf031ptGYeHdIBjSSEHawnQowpkro0wfYAtR62L6cP4B-R7u2ehEnc0-eQi-TJkL_KajDi0Y8JhtSxCE9EKM-Wz8a6V2MvTJwPQDJxxcUh7WGI6H8ds9cDKxcow1U2N2MOvowR8Cd-h6tI7XFE3ZOg0ZkEurpXak9vF5-pNzYnMci0gZgYoqSX4jSbBSBruwknlRjCVGBhU-rT0jw0eq-Ge0iG8Aqb0PWH8Xk6KMT-130eSkLF'
    }
  },
  {
    id: 3,
    title: 'Metode Flipped Classroom dalam Pembelajaran Sejarah di Era Digital',
    category1: { label: 'Pedagogi', color: 'bg-primary/10 text-primary' },
    category2: { label: 'SMA/MA/SMK', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    duration: '15:20',
    verified: true,
    image: 'https://img.youtube.com/vi/-JQB3p66r4o/maxresdefault.jpg',
    author: {
      name: 'Rina Wijayanti, S.Pd.',
      role: 'Penilik • Disdikbud Jateng',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBxMF01Vk9If6-0K_UYKbmdu4JoUKQAyYPIKzuI4tyM1jQJfPTNVxdD9ec7Syya-DRs81PhQw0Os1572pH6ozUIy-6quHvtQrL1dR3TiF-2Du0dBNDKBzIbFmwc0i3DLZrB2rNmlwRxW6KSde1ANZvg3l6z3jFPhaDrKdzcb8tbzv0hchFqOZAyaG2sXZOFSYUVLTbB72zkY0Zwf5H7IqWVGA8hb8mde98AHzeI7shn1WPzAl_2QQ-_LNPsl8yWwTlpLqZ0sJRTr0'
    }
  }
];

function PracticeCard({ practice }) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col text-left text-slate-900 dark:text-slate-100">
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          alt={practice.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={practice.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="flex items-center gap-2">
            {practice.verified && (
              <span className="px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase">
                Terverifikasi
              </span>
            )}
            <span className="flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-xs">play_circle</span> {practice.duration}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col grow">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-[10px] font-bold py-0.5 px-2 rounded-md uppercase ${practice.category1.color}`}>
            {practice.category1.label}
          </span>
          <span className={`text-[10px] font-bold py-0.5 px-2 rounded-md uppercase ${practice.category2.color}`}>
            {practice.category2.label}
          </span>
        </div>
        
        <h3 className="text-base font-bold mb-2 leading-snug grow line-clamp-2">
          {practice.title}
        </h3>
        
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <img alt={practice.author.name} className="w-full h-full object-cover" src={practice.author.avatar} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{practice.author.name}</p>
            <p className="text-[10px] text-slate-500 font-medium">{practice.author.role}</p>
          </div>
        </div>
        
        <Link to={`/best-practice/${practice.id}`} className="mt-4 w-full py-2.5 bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 cursor-pointer">
          Lihat Detail <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  )
}

export default function BestPracticeSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40 py-16 bg-white dark:bg-slate-900/50 rounded-2xl md:rounded-[2.5rem] my-8 shadow-sm">
      <div className="mb-12 text-center">
        <h2 className="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-extrabold tracking-tight">
          Best Practice Pilihan
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">
          Inspirasi praktik baik dari rekan-rekan pendidik hebat di wilayah Jawa Tengah
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {practices.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/best-practice"
          id="explore-best-practice-btn"
          className="px-8 py-3 shrink-0 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all cursor-pointer inline-flex items-center justify-center"
        >
          Eksplorasi Praktik Baik Lainnya
        </Link>
      </div>
    </section>
  )
}
