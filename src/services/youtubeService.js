import defaultVideos from '../data/youtubeVideos.json'

const BBGTK_CHANNEL_ID = 'UCbNmhYhCjf-PI_YzLeBnGgQ'

const categoryStyles = {
  Sekampadi: 'text-amber-700 bg-amber-100',
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
  if (lower.includes('sekampadi')) return 'Sekampadi'
  if (lower.includes('ppg')) return 'PPG'
  if (lower.includes('profil')) return 'Profil'
  if (lower.includes('tutorial') || lower.includes('lms')) return 'Tutorial'
  if (lower.includes('workshop') || lower.includes('pembelajaran') || lower.includes('guru')) return 'Pedagogi'
  if (lower.includes('inspirasi') || lower.includes('merdeka')) return 'Inspirasi'
  if (lower.includes('digital') || lower.includes('teknologi') || lower.includes('pid')) return 'Teknologi'
  if (lower.includes('talkshow') || lower.includes('apresiasi') || lower.includes('penghargaan')) return 'Penghargaan'
  return 'Umum'
}

export function getStoredVideos() {
  const saved = localStorage.getItem('bbgtk_youtube_videos')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      const isUpToDate = parsed && parsed.length === defaultVideos.length && parsed[0]?.youtubeId === defaultVideos[0]?.youtubeId
      if (isUpToDate) {
        return parsed
      }
    } catch {
      // Fallback jika parse error
    }
  }
  localStorage.setItem('bbgtk_youtube_videos', JSON.stringify(defaultVideos))
  return defaultVideos
}

export function getStoredLastSynced() {
  return localStorage.getItem('bbgtk_youtube_last_synced') || null
}

export async function fetchYouTubeFeedFromRSS(channelId = BBGTK_CHANNEL_ID) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`
  ]

  for (const proxyUrl of proxies) {
    try {
      const res = await fetch(proxyUrl)
      if (!res.ok) continue
      const xmlText = await res.text()

      const entries = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || []
      if (entries.length === 0) continue

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

      // Gabungkan hasil fetch RSS dengan defaultVideos agar episode Sekampadi & video curated tidak hilang
      const existingIds = new Set(parsedVideos.map(v => v.youtubeId))
      const extraVideos = defaultVideos.filter(v => !existingIds.has(v.youtubeId))
      const combined = [...parsedVideos, ...extraVideos].map((v, i) => ({ ...v, id: i + 1 }))

      return combined
    } catch {
      continue
    }
  }

  // Jika proxy tidak merespon, kembalikan defaultVideos terbaru
  return defaultVideos
}

export async function syncYouTubeFeed() {
  const freshVideos = await fetchYouTubeFeedFromRSS()
  const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  if (freshVideos && freshVideos.length > 0) {
    localStorage.setItem('bbgtk_youtube_videos', JSON.stringify(freshVideos))
    localStorage.setItem('bbgtk_youtube_last_synced', now)
    window.dispatchEvent(new CustomEvent('youtube_synced', { detail: { videos: freshVideos, time: now } }))
    return { success: true, count: freshVideos.length, time: now, videos: freshVideos }
  }
  return { success: false, count: 0, time: now, videos: [] }
}

