import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const youtubeIds = [
  'A2DTYJ4dDf0', 'Mx-umVtjghY', 'iK9jQCgQTmI', 'OajRyxBVaK8', 'YI3AmfzVIv4',
  'HCUQFggdnmc', 'HjJmws0qCkM', 'EwBu2OPRaEQ', 'LwVUK2Z49Ks', 'xmZtWosS7oM',
  'C2xg_Whzcdk', 'vQicmc0tbyA', 'ejeqM-icI_U', 'm5aRstvKOLY', 'xXRktqcaQAA'
]

const categoryColors = {
  Sekampadi: 'text-amber-700 bg-amber-100',
  PPG: 'text-indigo-600 bg-indigo-100',
  Pedagogi: 'text-amber-600 bg-amber-100',
  Teknologi: 'text-primary bg-primary/10',
  Inspirasi: 'text-violet-600 bg-violet-100',
  Tutorial: 'text-rose-600 bg-rose-100',
  Umum: 'text-slate-600 bg-slate-100'
}

const baseTitles = [
  'SEKAMPADI "YUK BEDAH MISKONSEPSI PJOK"',
  'Sosialisasi Pengisian Instrumen Pemetaan Kebutuhan Belajar GTK',
  'Bagaimana Mengintegrasikan TPACK dengan Pembelajaran Mendalam ?',
  'Menjadi Pembelajar Kritis Kreatif dengan Revolusi Literasi',
  'E-Learning for Interdisciplinary Learning',
  'Menjadi Guru Inklusif Inspiratif dengan 7 Jurus BK Hebat',
  'Coaching Clinic Pendaftaran PPG Guru Tertentu Pasca-Keberminatan',
  'Dari Guru Kelas, Siap Mengajar Bahasa Inggris',
  'MERDEKA VERSI PEGAWAI BBGTK JATENG',
  'TANDUR 3 : Kompetensi Digital Dunia Pendidikan'
]

function generateFullDatabase() {
  const videos = []
  let idCounter = 1

  baseTitles.forEach((t, i) => {
    const isSekampadi = t.includes('SEKAMPADI') || t.includes('TPACK') || t.includes('Revolusi') || t.includes('E-Learning') || t.includes('Guru Inklusif')
    const cat = isSekampadi ? 'Sekampadi' : (t.includes('PPG') ? 'PPG' : 'Pedagogi')
    videos.push({
      id: idCounter++,
      title: t,
      category: cat,
      categoryColor: categoryColors[cat] || categoryColors.Umum,
      youtubeId: youtubeIds[i % youtubeIds.length],
      date: `2026-08-${String(30 - i).padStart(2, '0')}`,
      views: `${(1.5 + i * 0.4).toFixed(1)}K views`
    })
  })

  for (let ep = 58; ep >= 1; ep--) {
    const topics = [
      'Strategi Ciptakan Kelas Interaktif', 'Media Pembelajaran Digital', 'Asesmen Diagnostik Pembelajaran',
      'Manajemen Kelas Kreatif', 'Pengembangan Kurikulum Merdeka', 'Inovasi Pembelajaran Matematika',
      'Penguatan Literasi & Numerasi', 'Pendidikan Inklusif Berkelanjutan', 'Kepemimpinan Pembelajaran Kepala Sekolah',
      'Optimalisasi Platform Merdeka Mengajar'
    ]
    const topic = topics[ep % topics.length]
    const cat = 'Sekampadi'
    videos.push({
      id: idCounter++,
      title: `SEKAMPADI EPISODE ${ep} : ${topic.toUpperCase()}`,
      category: cat,
      categoryColor: categoryColors[cat],
      youtubeId: youtubeIds[(ep + idCounter) % youtubeIds.length],
      date: `2026-07-${String((ep % 28) + 1).padStart(2, '0')}`,
      views: `${(0.8 + (ep % 5) * 0.6).toFixed(1)}K views`
    })
  }

  const targetPath = path.join(__dirname, '..', 'src', 'data', 'youtubeVideos.json')
  fs.writeFileSync(targetPath, JSON.stringify(videos, null, 2), 'utf-8')
  console.log(`✅ Berhasil membuat ${videos.length} data video webinar lengkap di src/data/youtubeVideos.json!`)
}

generateFullDatabase()
