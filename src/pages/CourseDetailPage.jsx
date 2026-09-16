import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import youtubeData from '../data/youtubeVideos.json'

export default function CourseDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  
  // Find course/video by ID or fallback to first video
  const video = youtubeData.find(v => v.id === id) || youtubeData[0]
  
  // Tab State
  const [activeTab, setActiveTab] = useState('curriculum') // 'overview', 'objectives', 'curriculum', 'quiz', 'certificate'
  
  // Quiz & Progress States
  const [preTestSubmitted, setPreTestSubmitted] = useState(false)
  const [preTestScore, setPreTestScore] = useState(0)
  const [preTestAnswers, setPreTestAnswers] = useState({})
  
  const [postTestSubmitted, setPostTestSubmitted] = useState(false)
  const [postTestScore, setPostTestScore] = useState(0)
  const [postTestAnswers, setPostTestAnswers] = useState({})
  
  const [completedModules, setCompletedModules] = useState([1]) // Default modul 1 open
  const [activeVideoId, setActiveVideoId] = useState(video.videoId || 'A2DTYJ4dDf0')

  // Pre-Test Questions
  const preTestQuestions = [
    {
      id: 1,
      question: "Apa tujuan utama dari Asesmen Awal (Diagnostic Assessment) dalam Pembelajaran Bermakna?",
      options: [
        "A. Menentukan nilai rapor akhir semester siswa",
        "B. Memetakan kemampuan awal, minat, dan gaya belajar peserta didik",
        "C. Membandingkan prestasi antar sekolah",
        "D. Menghukum siswa yang belum menguasai materi"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Manakah strategi terbaik dalam merancang prompt AI untuk kurasi modul ajar?",
      options: [
        "A. Menulis perintah singkat tanpa konteks",
        "B. Memberikan instruksi spesifik dengan peranan (role), konteks kelas, dan format keluaran yang jelas",
        "C. Menggunakan istilah teknis yang ambigu",
        "D. Meminta AI membuat soal tanpa pemeriksaan ulang"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Prinsip utama pendekatan Pembelajaran Terdiferensiasi (Differentiated Learning) adalah...",
      options: [
        "A. Memberikan materi yang persis sama untuk semua siswa",
        "B. Mengakomodasi kebutuhan belajar individu melalui diferensiasi konten, proses, atau produk",
        "C. Mengurangi bobot materi bagi siswa laki-laki",
        "D. Menghilangkan evaluasi pembelajaran"
      ],
      correct: 1
    }
  ]

  // Post-Test Questions
  const postTestQuestions = [
    {
      id: 1,
      question: "Dalam siklus Sekampadi BBGTK, bagaimana tahap Berbagi Praktik Baik berkontribusi pada komunitas?",
      options: [
        "A. Menyimpan dokumentasi secara pribadi",
        "B. Mempublikasikan pengalaman nyata di kelas agar terinspirasi dan direplikasi oleh guru lain",
        "C. Menggantikan peran kepala sekolah",
        "D. Menambah beban administrasi guru"
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Bagaimana cara mengevaluasi efektivitas asesmen formatif yang telah dilaksanakan?",
      options: [
        "A. Hanya melihat angka hasil tes sumatif",
        "B. Menganalisis umpan balik berkala dari siswa dan refleksi ketercapaian tujuan pembelajaran",
        "C. Menunggu inspeksi dinas pendidikan",
        "D. Mengulang materi dari awal tanpa revisi"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "Fitur manakah yang menjadi bukti karya validasi peserta dalam platform Educorner SOLE?",
      options: [
        "A. Jumlah pengikut di media sosial",
        "B. Laporan Praktik Baik yang telah disetujui oleh Moderator/Widyaiswara BBGTK",
        "C. Foto profil pengguna",
        "D. Komentar di forum umum"
      ],
      correct: 1
    }
  ]

  // Handle Pre-Test Submit
  const handlePreTestSubmit = (e) => {
    e.preventDefault()
    let score = 0
    preTestQuestions.forEach(q => {
      if (preTestAnswers[q.id] === q.correct) {
        score += 33.3
      }
    })
    const finalScore = Math.round(score)
    setPreTestScore(finalScore)
    setPreTestSubmitted(true)
    if (!completedModules.includes(2)) {
      setCompletedModules([...completedModules, 2])
    }
  }

  // Handle Post-Test Submit
  const handlePostTestSubmit = (e) => {
    e.preventDefault()
    let score = 0
    postTestQuestions.forEach(q => {
      if (postTestAnswers[q.id] === q.correct) {
        score += 33.3
      }
    })
    const finalScore = Math.round(score)
    setPostTestScore(finalScore)
    setPostTestSubmitted(true)
    if (finalScore >= 60 && !completedModules.includes(5)) {
      setCompletedModules([...completedModules, 3, 4, 5])
    }
  }

  const progressPercent = Math.min(100, Math.round((completedModules.length / 5) * 100))

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[linear-gradient(135deg,#003d9b_0%,#0052cc_100%)] text-white py-12 px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
                {video.category || 'Sekampadi BBGTK'}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-300/30 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300">
                Sertifikat 32 JP
              </span>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-300/30 rounded-full text-xs font-bold uppercase tracking-wider text-amber-300">
                Tingkat Menengah
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-black leading-tight tracking-tight">
              {video.title}
            </h1>

            <p className="text-blue-100 text-sm lg:text-base max-w-3xl leading-relaxed opacity-95">
              Program Diklat Mandiri Pendidik BBGTK Jawa Tengah. Pelajari strategi implementasi berbasis bukti, ikuti tes asesmen mandiri, dan dapatkan sertifikat resmi.
            </p>

            <div className="flex items-center gap-6 pt-2 text-xs lg:text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">person</span>
                <span>Widyaiswara BBGTK Jawa Tengah</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span>Durasi: {video.duration || '1 Jam 15 Menit'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">group</span>
                <span>1,420 Peserta Pendidik</span>
              </div>
            </div>
          </div>

          {/* Progress Box Card */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center text-sm font-bold">
              <span>Progres Kelulusan</span>
              <span className="text-emerald-400 font-mono text-base">{progressPercent}%</span>
            </div>

            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="space-y-2 text-xs text-blue-100">
              <div className="flex justify-between">
                <span>Pre-Test:</span>
                <span className="font-bold">{preTestSubmitted ? `Selesai (${preTestScore} Poin)` : 'Belum'}</span>
              </div>
              <div className="flex justify-between">
                <span>Post-Test:</span>
                <span className="font-bold">{postTestSubmitted ? `Selesai (${postTestScore} Poin)` : 'Belum'}</span>
              </div>
              <div className="flex justify-between">
                <span>Sertifikat Digital:</span>
                <span className="font-bold text-emerald-300">{progressPercent === 100 ? 'Siap Diunduh' : 'Terkunci'}</span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('quiz')}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">play_circle</span>
              <span>{preTestSubmitted ? 'Lanjutkan Pembelajaran' : 'Mulai Pre-Test Sekarang'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'curriculum'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">menu_book</span>
            <span>Kurikulum Modul</span>
          </button>

          <button
            onClick={() => setActiveTab('objectives')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'objectives'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">target</span>
            <span>Tujuan Pembelajaran (Learning Objectives)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">quiz</span>
            <span>Pre-Test & Post-Test</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-primary text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-base">workspace_premium</span>
            <span>Sertifikat Kelulusan</span>
          </button>
        </div>

        {/* Tab 1: Kurikulum Modul */}
        {activeTab === 'curriculum' && (
          <div className="grid lg:grid-cols-12 gap-8 mt-8">
            
            {/* Video Player */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative border border-slate-800">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Deskripsi & Pokok Bahasan Modul</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {video.snippet?.description || 'Modul diklat mandiri ini membahas implementasi strategi pembelajaran kontekstual untuk meningkatkan kompetensi guru di era transformasi digital. Peserta diajak menyusun rancangan asesmen dan membagikan pengalaman terbaik di kelas.'}
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/logoAsset7.png" alt="BBGTK Logo" className="h-8 object-contain" />
                    <div>
                      <h4 className="text-xs font-bold">BBGTK Provinsi Jawa Tengah</h4>
                      <p className="text-[11px] text-slate-400">Pusat Pengembang dan Pemberdayaan Pendidik</p>
                    </div>
                  </div>
                  <Link 
                    to="/best-practice/create" 
                    className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">edit_note</span>
                    <span>Tulis Praktik Baik</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar Module List */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Daftar Modul Belajar</span>
                <span className="text-xs font-normal text-slate-500">{completedModules.length} / 5 Modul</span>
              </h3>

              <div className="space-y-3">
                {/* Modul 1 */}
                <div 
                  onClick={() => setActiveTab('quiz')}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary transition-all cursor-pointer flex items-start gap-3"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    preTestSubmitted ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-primary/10 text-primary'
                  }`}>
                    {preTestSubmitted ? '✓' : '1'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold truncate">Modul 1: Pre-Test Asesmen Awal</h4>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-mono">5 Min</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Uji pengetahuan awal sebelum mempelajari materi.</p>
                  </div>
                </div>

                {/* Modul 2 */}
                <div 
                  onClick={() => setActiveVideoId(video.videoId || 'A2DTYJ4dDf0')}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border-2 border-primary shadow-sm transition-all cursor-pointer flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold truncate text-primary">Modul 2: Video Utama & Paparan</h4>
                      <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded text-primary font-mono">Sedang Diputar</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Paparan materi webinar oleh Widyaiswara BBGTK Jateng.</p>
                  </div>
                </div>

                {/* Modul 3 */}
                <div 
                  onClick={() => setActiveTab('quiz')}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary transition-all cursor-pointer flex items-start gap-3 opacity-90"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0 font-bold text-xs">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold truncate">Modul 3: Tugas Refleksi Praktik Baik</h4>
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-mono">Tugas</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Unggah rancangan asesmen atau dokumen aksi nyata di kelas.</p>
                  </div>
                </div>

                {/* Modul 4 */}
                <div 
                  onClick={() => setActiveTab('quiz')}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary transition-all cursor-pointer flex items-start gap-3 opacity-90"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    postTestSubmitted ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {postTestSubmitted ? '✓' : '4'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold truncate">Modul 4: Post-Test & Evaluasi</h4>
                      <span className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-mono">Kuis Lulus</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Kuis kelulusan (minimal skor 60 untuk klaim sertifikat).</p>
                  </div>
                </div>

                {/* Modul 5 */}
                <div 
                  onClick={() => setActiveTab('certificate')}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all cursor-pointer flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    📜
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold truncate text-emerald-600 dark:text-emerald-400">Modul 5: Unduh Sertifikat 32 JP</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">Sertifikat</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Cetak Sertifikat Kelulusan resmi BBGTK Jateng.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Tujuan Pembelajaran (Learning Objectives) */}
        {activeTab === 'objectives' && (
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">target</span>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Capaian & Tujuan Pembelajaran</h2>
                <p className="text-sm text-slate-500">Kompetensi yang akan dikuasai guru setelah menyelesaikan kursus ini.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 space-y-3">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold">1</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Pemetaan Kebutuhan Belajar</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Peserta mampu merancang dan melaksanakan asesmen awal (diferensiasi) untuk mengenali gaya belajar dan karakteristik murid.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 space-y-3">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold">2</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Pengembangan Instumen Asesmen</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Peserta dapat memanfaatkan kecerdasan buatan (AI) untuk membuat rubrik penilaian formatif dan soal adaptif berkualitas tinggi.
                </p>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 space-y-3">
                <div className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center font-bold">3</div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Publikasi Aksi Nyata</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Peserta mampu mendokumentasikan refleksi serta mempublikasikan Praktik Baik di platform Educorner SOLE untuk menginspirasi sesama pendidik.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Pre-Test & Post-Test */}
        {activeTab === 'quiz' && (
          <div className="mt-8 space-y-8">
            {/* Pre-Test Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pre-Test: Asesmen Diagnostik Awal</h3>
                    <p className="text-xs text-slate-500">Uji kemampuan awal Anda sebelum mengikuti sesi webinar.</p>
                  </div>
                </div>
                {preTestSubmitted && (
                  <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold rounded-full text-xs">
                    Selesai - Skor: {preTestScore} Poin
                  </span>
                )}
              </div>

              {!preTestSubmitted ? (
                <form onSubmit={handlePreTestSubmit} className="space-y-6">
                  {preTestQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3 border border-slate-200/50 dark:border-slate-700/50">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{idx + 1}. {q.question}</h4>
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                          <label key={oIdx} className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                            <input
                              type="radio"
                              name={`pre_q_${q.id}`}
                              required
                              onChange={() => setPreTestAnswers({ ...preTestAnswers, [q.id]: oIdx })}
                              className="text-primary focus:ring-primary"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-xl text-sm hover:bg-primary/90 shadow-md cursor-pointer">
                    Kirim Jawaban Pre-Test
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>✅ Pre-Test Berhasil Diselesaikan. Silakan lanjut menonton video paparan pada Kurikulum Modul!</span>
                  <button onClick={() => setActiveTab('curriculum')} className="font-bold underline cursor-pointer">Buka Modul Video</button>
                </div>
              )}
            </div>

            {/* Post-Test Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Post-Test: Kuis Kelulusan Modul</h3>
                    <p className="text-xs text-slate-500">Nilai minimal 60 Poin untuk berhak mengklaim Sertifikat Resmi 32 JP.</p>
                  </div>
                </div>
                {postTestSubmitted && (
                  <span className={`px-4 py-1.5 font-bold rounded-full text-xs ${
                    postTestScore >= 60 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-100 text-red-700'
                  }`}>
                    {postTestScore >= 60 ? `LULUS - Skor: ${postTestScore} Poin` : `TIDAK LULUS - Skor: ${postTestScore} Poin`}
                  </span>
                )}
              </div>

              {!postTestSubmitted ? (
                <form onSubmit={handlePostTestSubmit} className="space-y-6">
                  {postTestQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3 border border-slate-200/50 dark:border-slate-700/50">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{idx + 1}. {q.question}</h4>
                      <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                          <label key={oIdx} className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                            <input
                              type="radio"
                              name={`post_q_${q.id}`}
                              required
                              onChange={() => setPostTestAnswers({ ...postTestAnswers, [q.id]: oIdx })}
                              className="text-primary focus:ring-primary"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md cursor-pointer">
                    Kirim Post-Test & Evaluasi
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>🎉 Selamat! Anda telah memenuhi syarat kelulusan. Sertifikat 32 JP kini dapat diunduh.</span>
                  <button onClick={() => setActiveTab('certificate')} className="font-bold underline cursor-pointer">Lihat Sertifikat</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Unduh Sertifikat */}
        {activeTab === 'certificate' && (
          <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
            
            <div className="max-w-xl mx-auto border-4 border-amber-400 p-8 rounded-2xl bg-amber-50/30 dark:bg-slate-800/40 relative">
              <div className="flex justify-center mb-4">
                <img src="/logoAsset7.png" alt="BBGTK Logo" className="h-14 object-contain" />
              </div>
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400">BALAI BESAR GURU PENGGERAK PROVINSI JAWA TENGAH</span>
              <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white my-2">SERTIFIKAT KELULUSAN</h2>
              <p className="text-xs text-slate-500">Nomor: 893/BBGTK-JATENG/SO-LE/2026</p>
              
              <div className="my-6 space-y-1">
                <p className="text-xs text-slate-500">Diberikan Kepada:</p>
                <h3 className="text-xl font-bold text-primary">{user?.fullName || 'Budi Widiyanto, S.Pd.'}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Atas Kelulusan Pelatihan Mandiri (32 JP):</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 italic mt-1">"{video.title}"</p>
              </div>

              <div className="flex justify-between items-end pt-4 border-t border-amber-200 dark:border-slate-700 text-xs text-slate-500">
                <div className="text-left">
                  <p>Tanggal: 16 September 2026</p>
                  <p>Verifikasi: BBGTK-JATENG-VALIDATED</p>
                </div>
                <div className="w-14 h-14 bg-white p-1 border border-slate-300 rounded flex items-center justify-center text-[10px] font-mono text-center font-bold">
                  QR VERIFIED
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined">download</span>
                <span>Cetak / Unduh Sertifikat (PDF)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
