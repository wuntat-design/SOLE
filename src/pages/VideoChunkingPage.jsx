import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { emitXAPIStatement, XAPI_VERBS } from '../services/lrsService'
import youtubeData from '../data/youtubeVideos.json'

export default function VideoChunkingPage() {
  const { user } = useAuth()
  
  // Selected Video & Segment Mode States
  const [selectedVideo, setSelectedVideo] = useState(youtubeData[0])
  const [activeChunkIndex, setActiveChunkIndex] = useState(0)
  const [notes, setNotes] = useState('')
  const [userNotes, setUserNotes] = useState({})

  // Segmentation Mode: 'PRESET' (10-Min Standard) or 'CUSTOM' (Pilihan Pengguna)
  const [segmentMode, setSegmentMode] = useState('PRESET') // 'PRESET', 'CUSTOM'
  const [customChunkDuration, setCustomChunkDuration] = useState(10) // 5, 10, 15, 20

  // Custom User Segments Storage State
  const [customSegmentsList, setCustomSegmentsList] = useState(() => {
    const saved = localStorage.getItem('bbgtk_user_custom_segments')
    return saved ? JSON.parse(saved) : {}
  })

  // Custom Segment Creator Modal Form States
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customTitle, setCustomTitle] = useState('')
  const [customStartMin, setCustomStartMin] = useState(0)
  const [customEndMin, setCustomEndMin] = useState(10)
  const [customSummary, setCustomSummary] = useState('')

  // Video Picker Modal States
  const [showPickerModal, setShowPickerModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [pickerPage, setPickerPage] = useState(1)

  const itemsPerPage = 6
  const categories = ['Semua', 'Sekampadi', 'Sosialisasi', 'Teknologi', 'Pedagogi', 'Inspirasi']

  // Filter videos for picker modal
  const filteredVideos = youtubeData.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.category?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || v.category?.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  // Pagination for picker modal
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage)
  const paginatedVideos = filteredVideos.slice((pickerPage - 1) * itemsPerPage, pickerPage * itemsPerPage)

  // Format Helper Minutes to HH:MM:SS
  const formatTime = (min) => {
    const h = Math.floor(min / 60)
    const m = Math.floor(min % 60)
    return h > 0 ? `${h}:${m < 10 ? '0' : ''}${m}:00` : `${m < 10 ? '0' : ''}${m}:00`
  }

  // Generate Segments based on Mode
  let chunkSegments = []

  if (segmentMode === 'PRESET') {
    const duration = Number(customChunkDuration) || 10
    const totalChunks = Math.max(1, Math.ceil(60 / duration))

    chunkSegments = Array.from({ length: totalChunks }, (_, idx) => {
      const startMin = idx * duration
      const endMin = (idx + 1) * duration
      const titles = [
        'Orientasi & Konsep Dasar Pembelajaran',
        'Strategi Asesmen Formatif & Prompt AI',
        'Studi Kasus & Pembelajaran Terdiferensiasi',
        'Diskusi Interaktif & Tanya Jawab Pendidik',
        'Tantangan Lapangan & Penyusunan Rubrik',
        'Refleksi & Aksi Nyata Praktik Baik'
      ]

      return {
        index: idx,
        title: `Segmen ${idx + 1}: ${titles[idx % titles.length]} (${duration} Menit)`,
        startTime: startMin * 60,
        endTime: endMin * 60,
        displayTime: `${formatTime(startMin)} - ${formatTime(endMin)}`,
        summary: `Segmen durasi ${duration} menit mendalami ${titles[idx % titles.length]} secara terstruktur.`
      }
    })
  } else {
    // Mode CUSTOM: Segmen hasil buatan kustom pengguna
    const savedForVideo = customSegmentsList[selectedVideo.id] || [
      {
        index: 0,
        title: 'Segmen Kustom 1: Pembukaan & Paparan Utama',
        startTime: 0,
        endTime: 900, // 15 min
        displayTime: '00:00 - 15:00',
        summary: 'Segmen kustom durasi 15 menit awal hasil pilihan pengguna.'
      },
      {
        index: 1,
        title: 'Segmen Kustom 2: Sesi Tanya Jawab Pendidik',
        startTime: 900,
        endTime: 2100, // 35 min
        displayTime: '15:00 - 35:00',
        summary: 'Segmen kustom durasi 20 menit tanya jawab spesifik.'
      }
    ]
    chunkSegments = savedForVideo
  }

  // Add New Custom Segment
  const handleAddCustomSegment = (e) => {
    e.preventDefault()
    if (!customTitle.trim()) return

    const startSec = Number(customStartMin) * 60
    const endSec = Number(customEndMin) * 60

    const newSegment = {
      index: chunkSegments.length,
      title: customTitle.trim(),
      startTime: startSec,
      endTime: endSec,
      displayTime: `${formatTime(customStartMin)} - ${formatTime(customEndMin)}`,
      summary: customSummary.trim() || `Segmen kustom (${customStartMin}-${customEndMin} Menit)`
    }

    const updated = {
      ...customSegmentsList,
      [selectedVideo.id]: [...(customSegmentsList[selectedVideo.id] || []), newSegment]
    }

    setCustomSegmentsList(updated)
    localStorage.setItem('bbgtk_user_custom_segments', JSON.stringify(updated))

    setShowCustomModal(false)
    setCustomTitle('')
    setCustomStartMin(0)
    setCustomEndMin(10)
    setCustomSummary('')

    alert('✅ Segmen Kustom Pilihan Anda Berhasil Ditambahkan!')
  }

  // Handle Chunk Selection & xAPI Trace
  const handleSelectChunk = (chunk) => {
    setActiveChunkIndex(chunk.index)
    
    // Emit xAPI Statement to LRS
    emitXAPIStatement({
      user: user || { fullName: 'Pendidik Anonim', email: 'pendidik@guru.sd.belajar.id' },
      verb: XAPI_VERBS.WATCHED,
      objectName: `Micro-Learning Chunk ${chunk.index + 1}: ${selectedVideo.title}`,
      objectId: `https://sole.id/chunk/${selectedVideo.id}/${chunk.index + 1}`,
      result: {
        completion: true,
        extensions: {
          'https://sole.id/xapi/extensions/chunk_start': chunk.displayTime,
          'https://sole.id/xapi/extensions/segment_mode': segmentMode,
          'https://sole.id/xapi/extensions/video_id': selectedVideo.youtubeId
        }
      }
    })
  }

  const handleSaveNote = () => {
    if (!notes.trim()) return
    setUserNotes({
      ...userNotes,
      [`${selectedVideo.id}_${activeChunkIndex}`]: notes
    })
    alert('Catatan ringkasan segmen berhasil disimpan!')
  }

  const activeChunk = chunkSegments[activeChunkIndex] || chunkSegments[0]
  const videoSrc = `https://www.youtube.com/embed/${selectedVideo.youtubeId}?start=${activeChunk?.startTime || 0}&autoplay=1&rel=0`

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen p-6 lg:p-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <span className="material-symbols-outlined text-3xl">auto_videocam</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                Micro-Learning Feature
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                Segmentasi Pilihan Pengguna
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Reproduksi Video Chunking & Segmentasi Kustom
            </h1>
            <p className="text-xs text-slate-500">
              Pelajari webinar BBGTK dalam potongan topik 10-menit otomatis atau buat segmen durasi pilihan Anda sendiri.
            </p>
          </div>
        </div>

        {/* Modern Interactive Video Selector Button */}
        <button
          onClick={() => setShowPickerModal(true)}
          className="flex items-center gap-3 px-5 py-3 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-lg">search_hands_free</span>
          <div className="text-left">
            <div className="text-[10px] uppercase tracking-wider text-blue-200">Video Aktif:</div>
            <div className="font-bold truncate max-w-[200px] sm:max-w-[280px] text-white">{selectedVideo.title}</div>
          </div>
          <span className="material-symbols-outlined text-base text-blue-200">swap_horiz</span>
        </button>
      </div>

      {/* Segmentation Mode Switcher Menu Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-primary">tune</span>
            <span>Mode Segmentasi:</span>
          </span>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => { setSegmentMode('PRESET'); setActiveChunkIndex(0); }}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                segmentMode === 'PRESET'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Otomatis ({customChunkDuration} Menit)
            </button>

            <button
              onClick={() => { setSegmentMode('CUSTOM'); setActiveChunkIndex(0); }}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                segmentMode === 'CUSTOM'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Kustom Pilihan Pengguna
            </button>
          </div>
        </div>

        {/* Options based on mode */}
        {segmentMode === 'PRESET' ? (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-bold">Durasi per Segmen:</span>
            <div className="flex gap-1">
              {[5, 10, 15, 20].map(dur => (
                <button
                  key={dur}
                  onClick={() => setCustomChunkDuration(dur)}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    customChunkDuration === dur
                      ? 'bg-emerald-500 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dur}m
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCustomModal(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            <span>+ Buat Segmen Kustom Baru</span>
          </button>
        )}
      </div>

      {/* Main Video & Chunk Navigation Area */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left Column: Player & Current Chunk Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Video Player */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video relative border border-slate-800">
            <iframe
              key={videoSrc}
              className="w-full h-full"
              src={videoSrc}
              title={activeChunk?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Active Chunk Header & Summary Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-primary font-mono">{activeChunk?.displayTime}</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{activeChunk?.title}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                segmentMode === 'CUSTOM' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {segmentMode === 'CUSTOM' ? 'Segmen Kustom Pengguna' : `Segmen ${activeChunkIndex + 1} dari ${chunkSegments.length}`}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {activeChunk?.summary}
            </p>

            {/* Note Taking Box */}
            <div className="pt-2 space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-amber-500">edit_note</span>
                <span>Catatan Ringkasan Saya untuk Segmen Ini:</span>
              </label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan poin penting / inspirasi yang Anda dapatkan di segmen ini..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs shadow-md hover:bg-primary/90 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">save</span>
                  <span>Simpan Catatan</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Segments Navigation List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">segment</span>
              <span>{segmentMode === 'CUSTOM' ? 'Daftar Segmen Kustom Saya' : 'Daftar Segmen Otomatis'}</span>
            </h3>
            <span className="text-xs text-slate-400">{chunkSegments.length} Segmen Topik</span>
          </div>

          <div className="space-y-3">
            {chunkSegments.map((chunk) => {
              const isActive = chunk.index === activeChunkIndex
              const hasNote = userNotes[`${selectedVideo.id}_${chunk.index}`]

              return (
                <div
                  key={chunk.index}
                  onClick={() => handleSelectChunk(chunk)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isActive
                      ? segmentMode === 'CUSTOM' ? 'bg-purple-500/10 border-2 border-purple-600 shadow-sm' : 'bg-primary/10 border-2 border-primary shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                    isActive
                      ? segmentMode === 'CUSTOM' ? 'bg-purple-600 text-white shadow-md' : 'bg-primary text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {chunk.index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isActive ? segmentMode === 'CUSTOM' ? 'bg-purple-600 text-white' : 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {chunk.displayTime}
                      </span>
                      {hasNote && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                          Ada Catatan
                        </span>
                      )}
                    </div>
                    <h4 className={`text-xs font-bold leading-snug truncate ${
                      isActive ? segmentMode === 'CUSTOM' ? 'text-purple-600 dark:text-purple-400' : 'text-primary' : 'text-slate-900 dark:text-white'
                    }`}>
                      {chunk.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {chunk.summary}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>

      {/* Modal Custom Segment Creator */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in" onClick={() => setShowCustomModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-600 text-xl">add_circle</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Tambah Segmen Kustom Pilihan Anda</h3>
              </div>
              <button onClick={() => setShowCustomModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomSegment} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Judul Topik Segmen:</label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Misal: Sesi Tanya Jawab Pengalaman Lapangan Guru"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Waktu Mulai (Menit):</label>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    required
                    value={customStartMin}
                    onChange={(e) => setCustomStartMin(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-mono focus:ring-2 focus:ring-purple-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Waktu Selesai (Menit):</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    required
                    value={customEndMin}
                    onChange={(e) => setCustomEndMin(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none font-mono focus:ring-2 focus:ring-purple-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Ringkasan Topik Segmen:</label>
                <textarea
                  rows="2"
                  value={customSummary}
                  onChange={(e) => setCustomSummary(e.target.value)}
                  placeholder="Poin pembahasan singkat dalam rentang menit ini..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowCustomModal(false)} className="px-4 py-2 border rounded-xl font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md">Simpan Segmen</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modern Video Picker Modal */}
      {showPickerModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in" onClick={() => setShowPickerModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">video_library</span>
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">Cari & Pilih Video Webinar BBGTK</h3>
                  <p className="text-xs text-slate-500">Pencarian instan berkecepatan tinggi dari {youtubeData.length}+ video perpustakaan</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPickerModal(false)}
                className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Live Search & Filter Bar */}
            <div className="space-y-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPickerPage(1); }}
                  placeholder="Ketik kata kunci judul webinar, seri Sekampadi, topik PJOK, AI, dll..."
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary dark:text-white shadow-inner"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setPickerPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedVideos.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 space-y-2">
                  <span className="material-symbols-outlined text-4xl">search_off</span>
                  <p className="text-sm font-bold">Tidak ada video yang cocok dengan kata kunci "{searchQuery}"</p>
                </div>
              ) : (
                paginatedVideos.map(video => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video)
                      setActiveChunkIndex(0)
                      setShowPickerModal(false)
                    }}
                    className={`bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 border transition-all cursor-pointer group hover:scale-[1.02] flex flex-col justify-between space-y-3 ${
                      selectedVideo.id === video.id
                        ? 'border-2 border-primary ring-2 ring-primary/20 bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary/60'
                    }`}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded">
                        {video.category || 'Sekampadi'}
                      </span>
                    </div>

                    <div className="space-y-1 flex-1 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-200/40 dark:border-slate-700/40">
                        <span>{video.date || 'BBGTK Jateng'}</span>
                        <span className="font-bold text-primary">Pilih Video →</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Pagination Footer */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-500 font-medium">Halaman {pickerPage} dari {totalPages} ({filteredVideos.length} Video)</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={pickerPage === 1}
                    onClick={() => setPickerPage(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Sebelumnya
                  </button>
                  <button
                    disabled={pickerPage === totalPages}
                    onClick={() => setPickerPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold disabled:opacity-40 cursor-pointer"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
