import { useState, useEffect } from 'react'
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
  },
  {
    id: 4,
    title: 'Pojok Baca Kreatif: Upaya Menumbuhkan Minat Baca Anak Sejak Dini',
    category1: { label: 'Literasi', color: 'bg-primary/10 text-primary' },
    category2: { label: 'SD/MI', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    duration: '10:15',
    verified: true,
    image: 'https://img.youtube.com/vi/dgpI6QR8gQQ/maxresdefault.jpg',
    author: {
      name: 'Dewi Kartika, S.Pd.SD',
      role: 'Guru Kelas • SDN 2 Magelang',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyvDKF2YIgGuBJ4XZF5J3_wnuaL5GM3pNyXu27NeB39cS-WcLncyiJc5sR2Wy7TBXbvt12Km6hwa71A0El4j1-ud0PMGvYv3Zt_ctn7ThSHMLV9ML7WHicq48ssIlk_Up1Re3gljOlG5U2zh2u_Hh_lsOJPTcmu3x_nchSWdlATez2FTLjeO5iSDCXFdkkycbCya7BX2SRXAf1jl3PKk1v0SPnfrT1i3kuSX9bwtSZ_5_J0jp1c1OSoabN1dHYNo2hSbvGMyIksmlu'
    }
  },
  {
    id: 5,
    title: 'Loose Parts Play: Bermain Terbuka untuk Mengembangkan Kreativitas AUD',
    category1: { label: 'Kurikulum Merdeka', color: 'bg-primary/10 text-primary' },
    category2: { label: 'PAUD/TK', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    duration: '22:10',
    verified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxBtGHdvx841gTWHqWw12ZdOD6nniK7E9wbF6lwhD1mHWLsM4DOlz-EBvZ-8PMVK6uIBi6VIsxiAHiiW2dzWivo8jAvufKwPLtCO3tVc-2TAbNIV3g5tOBIjtLvZU5peTWsQoeCTIYEinUybGDgtD6fZzbGbY4aebP-iEHe0PwsCH9K6h6oPbr5U9koUuQp1vw0sAIOE5oG2c0bu4DKhNbCh_KJSPSHGWHxc3tJM5hofJOi8hQHVBko3GcomWt7C4f-rV4i1fXubEa',
    author: {
      name: 'Eka Puteri, S.Pd.AUD',
      role: 'Kepala Sekolah • TK Pertiwi Purwokerto',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjbdB5-jY_3wUYUhaCg0adOtLt4_1LzM9ZZXBMIGUHM8oaMuJPRG-pxF4fwiU0kY_Vy_GGOPwGAov2UwyK_lmBx0h1gs2N6Dbhtblj3n7qEHppk-K6exy-qNAxdd-qat78K5_GrwyrH3617mgp6J5inp8PLs93rTftrhg3LqANSg__AIChY7vhxuy_DEwQ8bqq0F5HMoVhMR7NCdEwlnx9k7CLUf0fFQ2HFyJJYpUYnqydrNuxiMtoIIi2oqRSbCFnUoawU1QZCqAo'
    }
  },
  {
    id: 6,
    title: 'Strategi Pembelajaran Berdiferensiasi di Kelas Inklusif',
    category1: { label: 'Pendidikan Inklusif', color: 'bg-primary/10 text-primary' },
    category2: { label: 'Semua Jenjang', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
    duration: '18:05',
    verified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW6GeFsLOGyPHOXUSvnaI1aeTaLS-Gm4CWT7mFDMgyh35TQpJHSdIlux0KzvAm8FfLdp6zDUACQ9qFqVJsK_0RTc_zbx9i8eZwM5BsOCMUg_F4bihuCqR07F_afRgGzHtjTs-mwAI8Pk3vqTgzYvFcq5LpHzTCU1OMJoHE893nveGwN9WGwqjWcEdz2N80Q36KP7vkZ5SuwVJ38lPq8b9vm_OKso7WexNEz0J6AA5SewSboTtNo6CgJsJav9PQsnX0RVm00zCcOcKo',
    author: {
      name: 'Dr. Wahyu Ningrum',
      role: 'Widyaprada • BBGTK Jawa Tengah',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPO0yLx6B66v8MdsyMzUDMmg_LZZJ-ThxkBg2Fys379HVTOhP6hf-5FZq445SnAMBZGg7lYh4igjp4Mkz7QpVxIh3FRspL5wFazTPuPV2wEvCefwKITEOwmnIuHlv8SvBN79H36fPDEA-QmQbhod_odBFtqixek5DRuFWv1OEEpN30Bx-qrIm793T87roIUL4Ku34843eZv3tSTKi4er59PiWFrNVe8Y57QrOOHs-hxzw_IfW1RdAZ9iLMMUtvAAprUwTF0C7kLeSe'
    }
  }
];

export default function BestPracticePage() {
  const [displayPractices, setDisplayPractices] = useState([]);

  useEffect(() => {
    // Load from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('bbgtk_best_practices') || '[]');
    
    // Filter only published ones and map to UI structure
    const approvedPosts = savedPosts
      .filter(p => p.status === 'published')
      .map(p => ({
        id: p.id,
        title: p.title,
        category1: { label: p.category || 'Best Practice', color: 'bg-primary/10 text-primary' },
        category2: { label: 'Kurikulum Merdeka', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' },
        duration: '10:00', // Default duration for new posts
        verified: true,
        image: p.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        author: {
          name: p.author,
          role: 'Pendidik • Jawa Tengah',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.author)}&background=random`
        }
      }));

    // Combine static featured practices with newly approved ones
    // We put approved ones first if they are newer
    setDisplayPractices([...approvedPosts, ...practices]);
  }, []);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full flex-grow">
      {/* Hero Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 mb-2">
          Unggulan Praktik Baik
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Kumpulan praktik pengajaran terbaik dari rekan-rekan pendidik di Jawa Tengah yang telah melalui proses kurasi dan moderasi oleh tim BBGTK.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-6 mb-8 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all outline-none"
              placeholder="Cari praktik baik, judul, atau nama guru..."
              type="text"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
              Filter
            </button>
            <Link to="/best-practice/create" className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 shadow-sm transition-colors cursor-pointer shrink-0">
              <span className="material-symbols-outlined text-sm">edit_document</span>
              Tulis Praktik Baik
            </Link>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Kategori:</span>
          <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-white border border-primary cursor-pointer">
            Semua
          </button>
          {['Kurikulum Merdeka', 'Pedagogi', 'Digital Learning', 'Literasi & Numerasi', 'Pendidikan Inklusif'].map((filter) => (
            <button
              key={filter}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors cursor-pointer"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayPractices.map((practice) => (
          <div key={practice.id} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="relative aspect-video overflow-hidden bg-slate-100">
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
              
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug grow">
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
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 mb-8 flex items-center justify-center gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm cursor-pointer">1</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary transition-all font-bold text-sm cursor-pointer">2</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary transition-all font-bold text-sm cursor-pointer">3</button>
        <span className="px-2 text-slate-400">...</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary transition-all font-bold text-sm cursor-pointer">12</button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary hover:border-primary transition-all cursor-pointer">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}
