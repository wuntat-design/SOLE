import { useState, useEffect } from 'react';
import { syncYouTubeFeed, getStoredLastSynced } from '../services/youtubeService';

const initialPosts = [
  {
    id: 1,
    title: 'Implementasi Project-Based Learning pada Mata Pelajaran IPA Kelas 5',
    excerpt: 'Penerapan metode PBL untuk meningkatkan pemahaman siswa tentang ekosistem melalui proyek mini di lingkungan sekolah...',
    category: 'Best Practice',
    author: 'User Biasa',
    authorHandle: '@user_biasa',
    authorAvatar: null,
    time: '2 menit lalu',
    reports: 0,
    aiScore: 98,
    status: 'pending',
    rejectNote: '',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ9FHXWKXcGyNvneVhWHprBhJINVq8nCEID9LA1_ktyUKJlvPG6xWKzsPfBLHQeZ6YdoZZGwLrPjQGp2f1QzMaSrre_NS4wGhtumSvn9UsCeet7UAE6ql0cKRUl72wFPUnsM1PX6d84-VqjR6HDIh2EwfnoNV93ni8Bo4Oi_uaVZnDz-HTEm8zDgG2rb1G-NP_7gS1a6TmYeMgbD7Y8MoctNBHsICrIi2Uwb91S8_CilTpy8Q8ELzbH-cIwiJQmdX5ii-EBHJxq4JK',
    webinar: 'Strategi PBL di Kelas'
  },
  {
    id: 2,
    title: 'Pemanfaatan Media Digital dalam Pembelajaran Bahasa Inggris SMP',
    excerpt: 'Menggunakan platform interaktif dan video pendek berbahasa Inggris untuk meningkatkan kemampuan speaking siswa kelas 7...',
    category: 'Best Practice',
    author: 'Siti Aminah',
    authorHandle: '@siti_aminah',
    authorAvatar: null,
    time: '15 menit lalu',
    reports: 1,
    aiScore: 62,
    status: 'pending',
    rejectNote: '',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6lmXkI4JgQw3TsE3N7EiWnwvfe4o8i_leZEPGWS6xbRczyFhNHo4h_0d78oBvTuQf7jDq5xLoa4eA_k-iTa1tFK7AhoqaGqW_pUq8fnJW6X53nuyi8Pi58TYhKtuj8RPG2zN6Atbmamgl-DAT6Xyl9ez5WK0O3bzRq6VOk8oIsvikjjFm3nrHkanGOKAvCboUwthSHvsF7rE3fxOHO3SLwCJY5r3_UcWd1-CuEhLkG5KHZ8qwfL6JgeJkZDAPwxWWTeujOSR76Bt9',
    webinar: 'Digital Literacy untuk Guru'
  },
  {
    id: 3,
    title: 'Penerapan Metode SOLE untuk Meningkatkan Kemandirian Belajar Siswa',
    excerpt: 'Self-Organized Learning Environment diterapkan pada kelas 4 SD untuk mendorong rasa ingin tahu dan kolaborasi antar siswa...',
    category: 'Best Practice',
    author: 'Eko Prasetyo',
    authorHandle: '@eko_prasetyo',
    authorAvatar: null,
    time: '45 menit lalu',
    reports: 0,
    aiScore: 95,
    status: 'pending',
    rejectNote: '',
    thumbnail: null,
    webinar: 'SOLE Method Workshop'
  },
  {
    id: 4,
    title: 'Pembelajaran Diferensiasi di Kelas Inklusif',
    excerpt: 'Strategi pembelajaran yang mengakomodasi kebutuhan berbagai tingkat kemampuan siswa dalam satu kelas...',
    category: 'Best Practice',
    author: 'Dewi Anggraeni',
    authorHandle: '@dewi_ang',
    authorAvatar: null,
    time: '1 jam lalu',
    reports: 0,
    aiScore: 88,
    status: 'draft',
    rejectNote: '',
    thumbnail: null,
    webinar: 'Inclusive Education'
  },
  {
    id: 5,
    title: 'Gamifikasi dalam Matematika SD Kelas 3',
    excerpt: 'Menggunakan game-based learning untuk mengajarkan perkalian dan pembagian dasar kepada siswa sekolah dasar...',
    category: 'Best Practice',
    author: 'Budi Hartono',
    authorHandle: '@budi_h',
    authorAvatar: null,
    time: '2 jam lalu',
    reports: 0,
    aiScore: 91,
    status: 'published',
    rejectNote: '',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPf2_Awu5DixjaORKVYq7BM19seZ1AwG5ks7j2HgK3DB2erhNPpCApI0R9z3ajr3X90kb8WjyDzwOiJ2SQIAFlOhrJ6qEyn5KfDAgmA0nxOSNPgjYrXpGogab7oa-_Fe-j3rq9Ii5tflFGYKmP5FuKriX8D2HH_RLMrtR1myBsEcLKie-xJjWq1Z1SmQponH4Nl7N6oo3-MT2p81iYxo5iEpkGSmVtAjBM2UdF58TN2pyFMCUpDF6HiJJc_fOYAUktqXrVDXePRkTk',
    webinar: 'Gamification Strategy'
  }
];

export default function ModerationPage() {
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectNote, setRejectNote] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState(null);
  const [lastSynced, setLastSynced] = useState(getStoredLastSynced);

  const handleYouTubeSync = async () => {
    setIsSyncing(true);
    setSyncNotice(null);
    const result = await syncYouTubeFeed();
    if (result.success) {
      setLastSynced(result.time);
      setSyncNotice(`✅ Berhasil menyinkronkan ${result.count} video dari channel YouTube BBGTK!`);
    } else {
      setSyncNotice('❌ Gagal melakukan sinkronisasi dengan channel YouTube.');
    }
    setIsSyncing(false);
  };

  // Synchronize with localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('bbgtk_best_practices');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
      localStorage.setItem('bbgtk_best_practices', JSON.stringify(initialPosts));
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('bbgtk_best_practices', JSON.stringify(newPosts));
  };

  const filteredPosts = posts.filter(p => p.status === activeFilter);

  const statusCounts = {
    pending: posts.filter(p => p.status === 'pending').length,
    draft: posts.filter(p => p.status === 'draft').length,
    published: posts.filter(p => p.status === 'published').length,
    rejected: posts.filter(p => p.status === 'rejected').length,
  };

  const handleApprove = (id) => {
    const newPosts = posts.map(p => p.id === id ? { ...p, status: 'published', rejectNote: '' } : p);
    savePosts(newPosts);
  };

  const openRejectModal = (post) => {
    setRejectTarget(post);
    setRejectNote('');
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!rejectNote.trim()) return;
    const newPosts = posts.map(p => p.id === rejectTarget.id ? { ...p, status: 'rejected', rejectNote: rejectNote.trim() } : p);
    savePosts(newPosts);
    setShowRejectModal(false);
    setRejectTarget(null);
    setRejectNote('');
  };

  const handleRestore = (id) => {
    const newPosts = posts.map(p => p.id === id ? { ...p, status: 'pending', rejectNote: '' } : p);
    savePosts(newPosts);
  };

  const statusConfig = {
    pending: { label: 'Pending Review', icon: 'hourglass_empty', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', dot: 'bg-amber-500' },
    draft: { label: 'Draft', icon: 'edit_note', color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', dot: 'bg-slate-400' },
    published: { label: 'Published', icon: 'check_circle', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', dot: 'bg-emerald-500' },
    rejected: { label: 'Rejected', icon: 'block', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', dot: 'bg-red-500' },
  };

  const filterButtons = [
    { key: 'pending', label: 'Pending Review', icon: 'hourglass_empty' },
    { key: 'draft', label: 'Draft', icon: 'edit_note' },
    { key: 'published', label: 'Published', icon: 'check_circle' },
    { key: 'rejected', label: 'Rejected', icon: 'block' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Search */}
      <div className="flex items-center gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none dark:text-white"
            placeholder="Cari judul, penulis, atau kata kunci..."
            type="text"
          />
        </div>
      </div>

      {/* Page Title */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">Moderasi Konten</h1>
              <button
                onClick={handleYouTubeSync}
                disabled={isSyncing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50"
                title="Sinkronkan video dari channel YouTube BBGTK Jawa Tengah"
              >
                <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>
                  sync
                </span>
                {isSyncing ? 'Syncing RSS...' : 'Sync YouTube'}
              </button>
            </div>
            <p className="text-slate-500 mt-1">
              Tinjau dan kelola kiriman praktik baik dari pengguna.
              {lastSynced && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  ✓ RSS Synced: {lastSynced}
                </span>
              )}
            </p>
          </div>
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto hide-scrollbar">
            <button className="px-6 py-2 rounded-lg bg-white dark:bg-slate-700 shadow-sm text-sm font-bold text-primary whitespace-nowrap cursor-pointer">Verifikasi Postingan</button>
            <button className="px-6 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 whitespace-nowrap cursor-pointer">Verifikasi Komentar</button>
          </div>
        </div>

        {syncNotice && (
          <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <span>{syncNotice}</span>
            <button onClick={() => setSyncNotice(null)} className="text-emerald-600 hover:text-emerald-800 font-bold ml-4">✕</button>
          </div>
        )}

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
          {filterButtons.map(fb => (
            <button
              key={fb.key}
              onClick={() => setActiveFilter(fb.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                activeFilter === fb.key
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{fb.icon}</span>
              {fb.label}
              {statusCounts[fb.key] > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${activeFilter === fb.key ? 'bg-white/20' : 'bg-slate-300 dark:bg-slate-700'}`}>
                  {statusCounts[fb.key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-3 block">inbox</span>
            <p className="text-slate-500 font-medium">Tidak ada postingan dengan status <strong>{statusConfig[activeFilter].label}</strong></p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className={`bg-white dark:bg-slate-900 rounded-xl border p-4 md:p-6 shadow-sm hover:shadow-md transition-all ${
              post.status === 'published' ? 'border-emerald-200 dark:border-emerald-800/50' :
              post.status === 'rejected' ? 'border-red-200 dark:border-red-800/50' :
              'border-slate-200 dark:border-slate-800'
            }`}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Thumbnail */}
                <div className="w-full md:w-48 aspect-video md:h-32 rounded-lg bg-slate-100 dark:bg-slate-800/50 overflow-hidden shrink-0">
                  {post.thumbnail ? (
                    <img alt="Thumbnail" className="w-full h-full object-cover" src={post.thumbnail} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                      <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600">article</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">{post.category}</span>
                        <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                        <span className="text-xs text-slate-500">{post.time}</span>
                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusConfig[post.status].color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[post.status].dot}`}></span>
                          {statusConfig[post.status].label}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{post.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mt-1">{post.excerpt}</p>
                      {post.webinar && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="material-symbols-outlined text-primary text-sm">play_circle</span>
                          <span className="text-xs text-primary font-semibold">Ref: {post.webinar}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 self-start shrink-0">
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold dark:text-slate-300">{post.authorHandle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className={`material-symbols-outlined text-lg ${post.reports > 0 ? 'text-amber-600' : ''}`}>flag</span>
                        <span className={`text-xs font-medium ${post.reports > 0 ? 'text-amber-600' : ''}`}>
                          {post.reports} Report{post.reports !== 1 ? 's' : ''}
                          {post.reports > 0 && ' (Suspected Spam)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`material-symbols-outlined text-lg ${post.aiScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>policy</span>
                        <span className={`text-xs font-medium ${post.aiScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>AI Score: {post.aiScore}% Safe</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      {post.status === 'rejected' && post.rejectNote && (
                        <div className="flex-1 sm:flex-none flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                          <span className="material-symbols-outlined text-red-500 text-sm">info</span>
                          <span className="text-xs text-red-600 dark:text-red-400 font-medium line-clamp-1">"{post.rejectNote}"</span>
                        </div>
                      )}

                      {post.status === 'rejected' && (
                        <button
                          onClick={() => handleRestore(post.id)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg text-sm font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-lg">undo</span> Kembalikan
                        </button>
                      )}

                      {post.status === 'published' && (
                        <div className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-bold border border-emerald-200 dark:border-emerald-800">
                          <span className="material-symbols-outlined text-lg">verified</span> Disetujui
                        </div>
                      )}

                      {(post.status === 'pending' || post.status === 'draft') && (
                        <>
                          <button
                            onClick={() => openRejectModal(post)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-lg">block</span> Reject with Note
                          </button>
                          <button
                            onClick={() => handleApprove(post.id)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-lg shadow-emerald-600/20"
                          >
                            <span className="material-symbols-outlined text-lg">check_circle</span> Approve Post
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-sm">
        <p className="text-slate-500 text-center sm:text-left">
          Menampilkan <span className="font-bold text-slate-900 dark:text-slate-100">{filteredPosts.length}</span> postingan dengan status <span className="font-bold text-slate-900 dark:text-slate-100">{statusConfig[activeFilter].label}</span>
        </p>
        <div className="flex items-center gap-3 text-xs">
          {Object.entries(statusCounts).map(([key, count]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${statusConfig[key].dot}`}></span>
              <span className="text-slate-500 font-medium">{statusConfig[key].label}: <strong className="text-slate-700 dark:text-slate-300">{count}</strong></span>
            </div>
          ))}
        </div>
      </div>

      {/* Reject with Note Modal */}
      {showRejectModal && rejectTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowRejectModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-red-600">block</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tolak Postingan</h2>
                  <p className="text-xs text-slate-500">Berikan alasan penolakan kepada penulis</p>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-500 mb-0.5">Postingan yang akan ditolak:</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{rejectTarget.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">oleh {rejectTarget.author}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2 block">Alasan Penolakan *</label>
              <textarea
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-red-500 outline-none dark:text-white text-sm resize-none"
                placeholder="Contoh: Konten belum sesuai format STAR, mohon lengkapi bagian Refleksi..."
                autoFocus
              ></textarea>
              <p className="text-[10px] text-slate-400 mt-1.5 ml-1">Catatan ini akan ditampilkan kepada penulis di halaman profilnya.</p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex justify-end gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer dark:text-white"
              >
                Batal
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectNote.trim()}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  rejectNote.trim()
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-sm">block</span>
                Tolak Postingan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
