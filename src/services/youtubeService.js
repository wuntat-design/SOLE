import defaultVideos from '../data/youtubeVideos.json'

const BBGTK_CHANNEL_ID = 'UCbNmhYhCjf-PI_YzLeBnGgQ'

const categoryStyles = {
  Teknologi: 'text-primary bg-primary/10',
  Profil: 'text-emerald-600 bg-emerald-100',
  Pedagogi: 'text-amber-600 bg-amber-100',
  Inspirasi: 'text-violet-600 bg-violet-100',
  Penghargaan: 'text-sky-600 bg-sky-100',
  Tutorial: 'text-rose-600 bg-rose-100',
  PPG: 'text-indigo-600 bg-indigo-100',
  Umum: 'text-slate-600 bg-slate-100',
}

function detectCategory(title) {
  const lower = title.toLowerCase()
  if (lower.includes('ppg')) return 'PPG'
  if (lower.includes('profil')) return 'Profil'
  if (lower.includes('tutorial') || lower.includes('lms')) return 'Tutorial'
  if (lower.includes('workshop') || lower.includes('pembelajaran') || lower.includes('guru')) return 'Pedagogi'
  if (lower.includes('inspirasi') || lower.includes('merdeka')) return 'Inspirasi'
  if (lower.includes('digital') || lower.includes('teknologi') || lower.includes('pid')) return 'Teknologi'
  if (lower.includes('talkshow') || lower.includes('apresiasi') || lower.includes('penghargaan')) return 'Penghargaan'
  return 'Umum'
}

export async function fetchYouTubeFeedFromRSS(channelId = BBGTK_CHANNEL_ID) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`

  try {
    const res = await fetch(proxyUrl)
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    const xmlText = await res.text()

    const entries = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || []
    if (entries.length === 0) return defaultVideos

    const parsedVideos = entries.map((entry, idx) => {
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)
      const titleMatch = entry.match(/<title>(.*?)<\/title>/)
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/)

      const title = titleMatch ? titleMatch[1] : 'Video YouTube'
      const category = detectCategory(title)
      const pubDate = publishedMatch ? new Date(publishedMatch[1]) : new Date()

      const formattedDate = pubDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })

      return {
        id: idx + 1,
        title,
        category,
        categoryColor: categoryStyles[category] || categoryStyles.Umum,
        youtubeId: videoIdMatch ? videoIdMatch[1] : '',
        date: formattedDate,
        views: 'YouTube RSS',
      }
    })

    return parsedVideos
  } catch (err) {
    console.warn('Gagal mengambil RSS feed YouTube, menggunakan data default:', err)
    return defaultVideos
  }
}
