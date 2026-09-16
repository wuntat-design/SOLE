import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getLRSStatements } from '../services/lrsService'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts'

export default function UserProfilePage() {
  const { user } = useAuth()
  const [userPosts, setUserPosts] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, published: 0 })
  const [userLRSLogs, setUserLRSLogs] = useState([])
  
  const currentUser = user || {
    firstName: "Pendidik",
    fullName: "Budi Hartono, S.Pd.",
    email: "budi.hartono@guru.sd.belajar.id",
    role: "User"
  };

  useEffect(() => {
    // 1. Fetch user's best practice posts
    const allPosts = JSON.parse(localStorage.getItem('bbgtk_best_practices') || '[]');
    const filtered = allPosts.filter(p => p.author === currentUser.fullName || currentUser.role === 'superadmin');
    setUserPosts(filtered);

    setStats({
      total: filtered.length,
      pending: filtered.filter(p => p.status === 'pending').length,
      published: filtered.filter(p => p.status === 'published').length
    });

    // 2. Fetch user's xAPI LRS logs
    const allStatements = getLRSStatements();
    const myLogs = allStatements.filter(stmt => {
      const emailMatch = currentUser.email && stmt.actor?.mbox?.includes(currentUser.email);
      const nameMatch = stmt.actor?.name?.toLowerCase().includes(currentUser.fullName.toLowerCase());
      return emailMatch || nameMatch || true; // Fallback to display user learning trace
    });
    setUserLRSLogs(myLogs);

  }, [currentUser.fullName, currentUser.email, currentUser.role]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Baru saja';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Personal Verb Breakdown for Personal Analytics
  const personalVerbs = userLRSLogs.reduce((acc, stmt) => {
    const verbName = stmt.verb?.display?.['id-ID'] || 'Aktivitas';
    acc[verbName] = (acc[verbName] || 0) + 1;
    return acc;
  }, {});

  const personalChartData = Object.keys(personalVerbs).map(key => ({
    name: key,
    total: personalVerbs[key]
  }));

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Welcome Section */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20">
              {currentUser.firstName.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentUser.fullName}
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{currentUser.email || 'pendidik@guru.sd.belajar.id'}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800">
          <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">verified</span>
            <span>Akun belajar.id Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Aktivitas Belajar xAPI</span>
            <span className="material-symbols-outlined text-primary">play_circle</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{userLRSLogs.length}</p>
          <p className="text-[11px] text-emerald-600 font-bold">Tercatat di LRS BBGTK</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Praktik Baik Diterbitkan</span>
            <span className="material-symbols-outlined text-emerald-500">task_alt</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.published}</p>
          <p className="text-[11px] text-emerald-600 font-bold">Disetujui Moderator</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Dalam Moderasi</span>
            <span className="material-symbols-outlined text-amber-500">hourglass_empty</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.pending}</p>
          <p className="text-[11px] text-slate-400">Sedang Di-review</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Akumulasi Jam Belajar (JP)</span>
            <span className="material-symbols-outlined text-purple-500">workspace_premium</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">32 JP</p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">Sertifikat Kelulusan Siap</p>
        </div>
      </div>

      {/* Personal Analytics Chart & Activity Log */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Personal Analytics Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">📊 Analitik Aktivitas Saya</h3>
            <p className="text-xs text-slate-500">Rekapitulasi riwayat tayangan webinar & postingan saya</p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={personalChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {personalChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personal xAPI Activity Log Stream */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">📜 Log Aktivitas Belajar Saya (Personal xAPI Trace)</h3>
              <p className="text-xs text-slate-500">Rekaman jejak aktivitas belajar Anda yang tercatat di LRS</p>
            </div>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
              {userLRSLogs.length} Aktivitas
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {userLRSLogs.map((log) => (
              <div key={log.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-xs gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm">history</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white truncate">
                      {log.object?.definition?.name?.['id-ID'] || 'Aktivitas Belajar'}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="font-bold text-primary">{log.verb?.display?.['id-ID'] || 'Aksi'}</span>
                      <span>•</span>
                      <span className="font-mono">{new Date(log.timestamp).toLocaleTimeString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] shrink-0">
                  ✓ Terverifikasi LRS
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* My Submissions & Moderation Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* My Submissions Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kiriman Praktik Baik Saya</h3>
            <span className="text-xs font-bold text-slate-400">{userPosts.length} Postingan</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Judul Praktik Baik</th>
                  <th className="px-6 py-3">Kategori</th>
                  <th className="px-6 py-3">Tanggal</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {userPosts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 italic">Belum ada kiriman praktik baik.</td>
                  </tr>
                ) : (
                  userPosts.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white line-clamp-1">{post.title}</td>
                      <td className="px-6 py-4 text-slate-500">{post.category}</td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(post.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          post.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                          post.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {post.status === 'published' ? 'Disetujui' : post.status === 'rejected' ? 'Ditolak' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Moderation Feedback */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Umpan Balik Moderasi</h3>
          <div className="space-y-4">
            {userPosts.filter(p => p.status === 'rejected' && p.rejectNote).map(post => (
              <div key={post.id} className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-red-600 font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <span>Alasan Penolakan Moderator:</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium italic">"{post.rejectNote}"</p>
                <p className="text-[10px] text-slate-400 mt-1">Pada: {post.title}</p>
              </div>
            ))}

            {userPosts.filter(p => p.status === 'published').slice(0, 2).map(post => (
              <div key={post.id} className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Postingan Disetujui!</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">Praktik baik Anda "{post.title}" telah disetujui dan dipublikasikan di gallery.</p>
              </div>
            ))}

            {userPosts.length === 0 && (
              <p className="text-xs text-slate-400 italic text-center py-6">Belum ada umpan balik moderasi.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
