import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const webinars = [
  {
    id: 1,
    title: 'Stop Asal Matiin PID, Biar Gak Cepat Ngambek!',
    date: '2 Hari lalu',
    duration: '45:12',
    youtubeId: '9PlwkttZkt0',
  },
  {
    id: 2,
    title: 'PROFIL BBGTK JAWA TENGAH',
    date: '1 Minggu lalu',
    duration: '12:05',
    youtubeId: 'Z2UtJTS-5J0',
  },
  {
    id: 3,
    title: 'WORKSHOP PEMBELAJARAN MENDALAM BAGI GURU BAHASA INGGRIS',
    date: '2 Minggu lalu',
    duration: '1:15:20',
    youtubeId: '-JQB3p66r4o',
  },
  {
    id: 4,
    title: 'Seri Inspirasi Pendidikan (SIP) : Program Inovasi Litnum SDN Kemasan 1 Surakarta',
    date: '3 Minggu lalu',
    duration: '50:30',
    youtubeId: 'dgpI6QR8gQQ',
  },
]

export default function CreateBestPracticePage() {
  const [step, setStep] = useState(1)
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [situation, setSituation] = useState('')
  const [task, setTask] = useState('')
  const [action, setAction] = useState('')
  const [result, setResult] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isLoggedIn, user } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Auto-select webinar from URL param
  useEffect(() => {
    const webinarId = searchParams.get('webinarId')
    if (webinarId) {
      const found = webinars.find(w => w.id === parseInt(webinarId))
      if (found) {
        setSelectedWebinar(found)
        setStep(2)
      }
    }
  }, [searchParams])

  // Prevent flashing logic before redirect (optional but good practice)
  if (!isLoggedIn) return null;

  const handleNext = () => {
    if (selectedWebinar) {
      setStep(2)
    }
  }

  const handlePublish = () => {
    if (!title) {
      alert('Mohon isi judul praktik baik Anda.');
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      excerpt: description.substring(0, 150) + (description.length > 150 ? '...' : ''),
      description,
      situation,
      task,
      action,
      result,
      category: 'Best Practice',
      author: user?.fullName || 'User Biasa',
      authorHandle: `@${(user?.fullName || 'user').toLowerCase().replace(/\s/g, '_')}`,
      authorAvatar: null,
      time: 'Baru saja',
      reports: 0,
      aiScore: 90 + Math.floor(Math.random() * 10), // Simulated AI score
      status: 'pending',
      rejectNote: '',
      thumbnail: videoUrl && /youtube\.com|youtu\.be/.test(videoUrl) 
        ? `https://img.youtube.com/vi/${videoUrl.includes('v=') ? videoUrl.split('v=')[1]?.split('&')[0] : videoUrl.split('/').pop()}/mqdefault.jpg`
        : null,
      webinar: selectedWebinar.title,
      webinarId: selectedWebinar.id,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingPosts = JSON.parse(localStorage.getItem('bbgtk_best_practices') || '[]');
    localStorage.setItem('bbgtk_best_practices', JSON.stringify([newPost, ...existingPosts]));

    navigate('/profile');
  }

  return (
    <div className="flex-1 max-w-[1400px] mx-auto w-full p-4 md:p-8">
      {/* Top Header representing Wizard Status */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm mb-4">
          <Link to="/best-practice" className="text-slate-400 hover:text-primary transition-colors">
            Semua Praktik Baik
          </Link>
          <span className="material-symbols-outlined text-xs text-slate-300">chevron_right</span>
          <span className="font-semibold text-primary">Tulis Baru</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Tulis Praktik Baik Baru
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Gunakan pendekatan STAR untuk membagikan kisah sukses pembelajaran Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Progress */}
        <aside className="lg:col-span-1">
          <div className="sticky top-[100px] flex flex-col gap-1">
            <div className="mb-6 hidden lg:block">
              <h2 className="text-lg font-bold dark:text-white">Progres</h2>
              <p className="text-slate-500 text-sm">Metode STAR</p>
            </div>
            
            {/* Step Indicators */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 hide-scrollbar">
              <div 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg flex-shrink-0 transition-colors ${
                  step === 1 ? 'bg-primary text-white shadow-md' : 'hover:bg-primary/10 text-slate-600 dark:text-slate-400 cursor-pointer'
                }`}
                onClick={() => setStep(1)}
              >
                <span className="material-symbols-outlined text-xl">video_library</span>
                <span className="text-sm font-semibold whitespace-nowrap">1. Pilih Sumber Webinar</span>
              </div>
              <div 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg flex-shrink-0 transition-colors ${
                  step === 2 ? 'bg-primary text-white shadow-md' : 'hover:bg-primary/10 text-slate-600 dark:text-slate-400'
                } ${!selectedWebinar ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => selectedWebinar && setStep(2)}
              >
                <span className="material-symbols-outlined text-xl">edit_document</span>
                <span className="text-sm font-semibold whitespace-nowrap">2. Penulisan STAR</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 hidden lg:block">
              <button 
                onClick={() => {setStep(1); setSelectedWebinar(null)}}
                className="w-full text-left px-4 py-2 text-primary font-medium hover:underline flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
                Mulai Ulang
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-bold dark:text-white">Pilih Sumber Webinar</h2>
                <p className="text-slate-500 text-sm md:text-base">
                  Pilihlah video webinar dari BBGTK Jawa Tengah yang menginspirasi praktik baik Anda.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                  <button className="flex-1 flex items-center justify-center gap-2 py-4 border-b-2 border-primary bg-primary/5 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-primary">folder_open</span>
                    <span className="text-sm font-bold">Katalog Webinar</span>
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Search bar */}
                  <div className="mb-6 flex gap-3">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                      <input 
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none dark:text-white" 
                        placeholder="Cari judul webinar..." 
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Webinar Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {webinars.map(webinar => (
                      <div 
                        key={webinar.id}
                        onClick={() => setSelectedWebinar(webinar)}
                        className={`group relative rounded-xl p-3 cursor-pointer transition-all border-2 ${
                          selectedWebinar?.id === webinar.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-transparent hover:border-primary/30 bg-slate-50 dark:bg-slate-800/50'
                        }`}
                      >
                        <div className="aspect-video rounded-lg bg-slate-200 dark:bg-slate-900 mb-3 relative overflow-hidden">
                          <iframe
                            className="w-full h-full absolute inset-0 pointer-events-none"
                            src={`https://www.youtube.com/embed/${webinar.youtubeId}?controls=0`}
                            title={webinar.title}
                            frameBorder="0"
                          ></iframe>
                          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
                            {webinar.duration}
                          </div>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="font-bold text-sm leading-tight text-slate-900 dark:text-white line-clamp-2">
                              {webinar.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">{webinar.date}</p>
                          </div>
                          {selectedWebinar?.id === webinar.id && (
                            <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">check_circle</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end pt-4">
                <button 
                  onClick={handleNext}
                  disabled={!selectedWebinar}
                  className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    selectedWebinar 
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 cursor-pointer' 
                      : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Lanjut Penulisan STAR
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Selected Video Summary */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-6">
                 <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden flex-shrink-0 relative">
                   <iframe
                      className="w-full h-full absolute inset-0"
                      src={`https://www.youtube.com/embed/${selectedWebinar.youtubeId}`}
                      title={selectedWebinar.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                 </div>
                 <div className="flex flex-col justify-center">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Webinar Terpilih</span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug mb-2">
                      {selectedWebinar.title}
                    </h3>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      Berdurasi {selectedWebinar.duration}
                    </p>
                    <button 
                      onClick={() => setStep(1)}
                      className="mt-4 text-primary text-sm font-semibold hover:underline self-start cursor-pointer"
                    >
                      Ubah Webinar
                    </button>
                 </div>
              </div>
              {/* Judul Praktik Baik */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">title</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Judul Praktik Baik</h3>
                    <p className="text-xs text-slate-500">Berikan judul yang menarik dan deskriptif.</p>
                  </div>
                </div>
                <div className="p-6">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary outline-none dark:text-white text-base font-semibold"
                    placeholder='Contoh: "Implementasi Project-Based Learning pada Mata Pelajaran IPA Kelas 5"'
                  />
                </div>
              </div>

              {/* Informasi Penulis */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Informasi Penulis</h3>
                    <p className="text-xs text-slate-500">Data diambil dari akun Anda.</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Nama Lengkap</label>
                      <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white">
                        {user?.fullName || 'Belum login'}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Asal Sekolah</label>
                      <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white">
                        {user?.school || '-'}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">Email</label>
                      <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white truncate">
                        {user?.email || '-'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* STAR Form */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">description</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Tentang Best Practice</h3>
                    <p className="text-xs text-slate-500">Deskripsi singkat mengenai praktik baik yang dihasilkan (Maks. 10.000 kata).</p>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full min-h-[160px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm"
                    placeholder="Deskripsikan gambaran umum mengenai praktik baik Anda di sini..."
                  ></textarea>
... (omitting video section lines for brevity, actually I need to check if multi_replace can handle nested content or if I should just replace the textareas individually) ...

                  {/* Video Embed / Upload */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary">videocam</span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Video Dokumentasi Praktik Baik</h4>
                      <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">Opsional</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">Sematkan link YouTube atau unggah video dokumentasi pelaksanaan praktik baik Anda.</p>
                    
                    <div className="space-y-3">
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">link</span>
                        <input
                          type="text"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                          placeholder="Tempel link YouTube, misal: https://youtube.com/watch?v=..."
                        />
                      </div>

                      {videoUrl && /youtube\.com|youtu\.be/.test(videoUrl) && (
                        <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${videoUrl.includes('v=') ? videoUrl.split('v=')[1]?.split('&')[0] : videoUrl.split('/').pop()}`}
                            title="Video Preview"
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                        <span className="text-xs font-semibold text-slate-400 uppercase">atau</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                      </div>

                      <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <input type="file" accept="video/*" className="hidden" onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setVideoFile(file);
                            setVideoUrl('');
                          }
                        }} />
                        <span className="material-symbols-outlined text-primary text-2xl mb-1">upload</span>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Unggah file video</p>
                        <p className="text-xs text-slate-500 mt-0.5">MP4, MOV, AVI — Maks. 100 MB</p>
                      </label>

                      {videoFile && (
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                          <span className="material-symbols-outlined text-emerald-600">movie</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 truncate">{videoFile.name}</p>
                            <p className="text-xs text-emerald-600/70">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                          </div>
                          <button onClick={() => setVideoFile(null)} className="text-red-500 hover:text-red-700 cursor-pointer">
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">S</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Situasi (Situation)</h3>
                    <p className="text-xs text-slate-500">Kondisi yang melatarbelakangi masalah.</p>
                  </div>
                </div>
                <div className="p-6">
                  <textarea 
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm"
                    placeholder="Ceritakan kondisi awal kelas atau sekolah Anda sebelum mengimplementasikan solusi yang dipelajari dari webinar..."
                  ></textarea>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-500 flex items-center justify-center font-bold">T</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Tantangan (Task/Tantangan)</h3>
                    <p className="text-xs text-slate-500">Apa yang harus diselesaikan.</p>
                  </div>
                </div>
                <div className="p-6">
                  <textarea 
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm"
                    placeholder="Sebutkan tantangan utama yang dihadapi oleh siswa atau Anda sendiri untuk mencapai tujuan pembelajaran..."
                  ></textarea>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">A</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Aksi (Action)</h3>
                    <p className="text-xs text-slate-500">Langkah-langkah penyelesaian berdasarkan webinar.</p>
                  </div>
                </div>
                <div className="p-6">
                  <textarea 
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full min-h-[160px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm"
                    placeholder="Jabarkan langkah-langkah nyata yang Anda lakukan berdasarkan wawasan dari webinar. Bagaimana cara memecahkan tantangannya?"
                  ></textarea>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center font-bold">R</div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Refleksi (Result/Refleksi)</h3>
                    <p className="text-xs text-slate-500">Dampak nyata dan pembelajaran.</p>
                  </div>
                </div>
                <div className="p-6">
                  <textarea 
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-primary outline-none dark:text-white text-sm"
                    placeholder="Apa hasil akhir yang didapatkan dari aksi tersebut? Bagaimana refleksinya terhadap perkembangan siswa?"
                  ></textarea>
                </div>
              </div>

              {/* Upload Bukti */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 overflow-hidden">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Unggah Bukti Pendukung (Opsional)</h3>
                <p className="text-xs text-slate-500 mb-4">Tambahkan file PDF, RPP, gambar, atau modul ajar pendukung.</p>
                <label className="block border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors mb-4">
                  <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    setUploadedFiles(prev => [...prev, ...newFiles]);
                  }} />
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <span className="material-symbols-outlined text-primary">upload_file</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Klik untuk mengunggah file</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOC, JPG, PNG — Maks. 10 MB per file.</p>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File Terunggah ({uploadedFiles.length})</p>
                    {uploadedFiles.map((file, idx) => {
                      const ext = file.name.split('.').pop().toUpperCase();
                      const iconColor = ext === 'PDF' ? 'text-red-600 bg-red-100 dark:bg-red-900/30' : ext === 'DOC' || ext === 'DOCX' ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' : 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-lg group hover:border-primary/50 transition-colors">
                          <div className={`size-10 rounded flex items-center justify-center shrink-0 ${iconColor}`}>
                            <span className="material-symbols-outlined fill-1 text-sm">{ext === 'PDF' ? 'picture_as_pdf' : ext === 'JPG' || ext === 'JPEG' || ext === 'PNG' ? 'image' : 'article'}</span>
                          </div>
                          <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{file.name}</span>
                            <span className="text-[10px] text-slate-500 font-medium uppercase">{ext} • {(file.size / 1024 / 1024).toFixed(1)} MB</span>
                          </div>
                          <button onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-200 dark:border-slate-800">
                <button 
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white cursor-pointer"
                >
                  Kembali
                </button>
                <button 
                  onClick={handlePublish}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  Publikasikan Praktik Baik
                  <span className="material-symbols-outlined text-xl">send</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}
