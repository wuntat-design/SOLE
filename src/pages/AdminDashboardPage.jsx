import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { syncYouTubeFeed } from '../services/youtubeService';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const defaultLoginLogs = [
  { id: 101, timestamp: '2026-09-01 10:45:12', userName: 'Budi Hartono', email: 'budi.h@edu.jateng.go.id', role: 'Super Admin', method: 'Google (belajar.id)', ip: '182.253.14.88', status: 'Berhasil' },
  { id: 102, timestamp: '2026-09-01 09:30:45', userName: 'Siti Aminah', email: 'siti.aminah@edu.jateng.go.id', role: 'Moderator', method: 'Google (belajar.id)', ip: '180.252.61.12', status: 'Berhasil' },
  { id: 103, timestamp: '2026-09-01 08:15:22', userName: 'Eko Prasetyo', email: 'eko_p@edu.jateng.go.id', role: 'User', method: 'Password', ip: '114.124.200.41', status: 'Berhasil' },
  { id: 104, timestamp: '2026-08-31 16:20:10', userName: 'Dewi Anggraeni', email: 'dewi.ang@edu.jateng.go.id', role: 'User', method: 'Google (belajar.id)', ip: '36.85.12.99', status: 'Berhasil' },
  { id: 105, timestamp: '2026-08-31 14:10:05', userName: 'Pengguna Tidak Dikenal', email: 'salah.email@gmail.com', role: 'Guest', method: 'Password', ip: '182.253.90.11', status: 'Gagal (Password Salah)' }
];

const defaultPostingLogs = [
  { id: 201, timestamp: '2026-09-01 11:15:00', userName: 'Budi Hartono', role: 'Super Admin', action: 'Posting Praktik Baik Baru', title: 'Pemanfaatan AI untuk Pembelajaran Interaktif di SMAN 1 Semarang', category: 'Teknologi', status: 'Disetujui' },
  { id: 202, timestamp: '2026-09-01 08:45:30', userName: 'Eko Prasetyo', role: 'User', action: 'Posting Praktik Baik Baru', title: 'Metode Pembelajaran Berbasis Proyek di SMKN 1 Magelang', category: 'Pedagogi', status: 'Pending Moderasi' },
  { id: 203, timestamp: '2026-08-31 15:30:12', userName: 'Dewi Anggraeni', role: 'User', action: 'Edit Praktik Baik', title: 'Penguatan Literasi Melalui Pojok Baca SDN 02 Brebes', category: 'Inspirasi', status: 'Disetujui' },
  { id: 204, timestamp: '2026-08-31 11:20:40', userName: 'Siti Aminah', role: 'Moderator', action: 'Moderasi (Setujui)', title: 'Strategi Asesmen Formatif Berbasis Game di SMPN 3 Solo', category: 'Teknologi', status: 'Disetujui' }
];

const defaultRegisterLogs = [
  { id: 301, timestamp: '2026-09-01 08:10:00', userName: 'Eko Prasetyo', email: 'eko_p@edu.jateng.go.id', school: 'SMKN 1 Magelang', city: 'Kabupaten Magelang', method: 'Formulir Manual', status: 'Aktif (Terverifikasi)' },
  { id: 302, timestamp: '2026-08-31 14:00:15', userName: 'Dewi Anggraeni', email: 'dewi.ang@edu.jateng.go.id', school: 'SDN 02 Brebes', city: 'Kabupaten Brebes', method: 'Google (belajar.id)', status: 'Aktif (Terverifikasi)' },
  { id: 303, timestamp: '2026-08-30 09:25:50', userName: 'Rina Kusuma', email: 'rina.k@guru.smp.belajar.id', school: 'SMPN 1 Salatiga', city: 'Kota Salatiga', method: 'Google (belajar.id)', status: 'Aktif (Terverifikasi)' },
  { id: 304, timestamp: '2026-08-29 13:40:00', userName: 'Ahmad Fauzi', email: 'ahmad.fauzi@guru.sma.belajar.id', school: 'SMAN 2 Surakarta', city: 'Kota Surakarta', method: 'Google (belajar.id)', status: 'Aktif (Terverifikasi)' }
];

const registrationTrendData = [
  { day: 'Senin', pendaftaran: 12, login: 45 },
  { day: 'Selasa', pendaftaran: 19, login: 58 },
  { day: 'Rabu', pendaftaran: 15, login: 52 },
  { day: 'Kamis', pendaftaran: 22, login: 70 },
  { day: 'Jumat', pendaftaran: 28, login: 85 },
  { day: 'Sabtu', pendaftaran: 34, login: 92 },
  { day: 'Minggu', pendaftaran: 20, login: 64 }
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [activeLogTab, setActiveLogTab] = useState('LOGIN'); // 'LOGIN', 'POSTING', 'REGISTER'
  const [searchLog, setSearchLog] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const [loginLogs] = useState(() => {
    const saved = localStorage.getItem('bbgtk_log_masuk');
    return saved ? JSON.parse(saved) : defaultLoginLogs;
  });

  const [postingLogs] = useState(() => {
    const saved = localStorage.getItem('bbgtk_log_posting');
    return saved ? JSON.parse(saved) : defaultPostingLogs;
  });

  const [registerLogs] = useState(() => {
    const saved = localStorage.getItem('bbgtk_log_register');
    return saved ? JSON.parse(saved) : defaultRegisterLogs;
  });

  const handleAdminSync = async () => {
    setIsSyncing(true);
    const result = await syncYouTubeFeed();
    if (result.success) {
      alert(`✅ Berhasil menyinkronkan ${result.count} video terbaru dari YouTube!`);
    } else {
      alert('❌ Gagal melakukan sinkronisasi YouTube.');
    }
    setIsSyncing(false);
  };

  const exportCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('Tidak ada data log untuk di-export.');
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLoginLogs = loginLogs.filter(item => 
    item.userName.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.email.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.method.toLowerCase().includes(searchLog.toLowerCase())
  );

  const filteredPostingLogs = postingLogs.filter(item => 
    item.userName.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.title.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.category.toLowerCase().includes(searchLog.toLowerCase())
  );

  const filteredRegisterLogs = registerLogs.filter(item => 
    item.userName.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.email.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.school.toLowerCase().includes(searchLog.toLowerCase()) ||
    item.city.toLowerCase().includes(searchLog.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-primary via-blue-700 to-indigo-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
              <span className="material-symbols-outlined text-sm">shield</span>
              <span>Hak Akses Terproteksi ({user?.role?.toUpperCase() || 'ADMIN'})</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dashboard Pengguna & Log Aktivitas</h1>
            <p className="text-white/80 text-base mt-2 max-w-2xl">
              Pusat pemantauan aktivitas pengguna, log masuk, log pendaftaran, dan audit postingan praktik baik di ekosistem Educorner.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAdminSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-lg ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
              <span>{isSyncing ? 'Syncing RSS...' : 'Sync YouTube'}</span>
            </button>
            {user?.role === 'superadmin' && (
              <Link
                to="/settings"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-md transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">manage_accounts</span>
                <span>Kelola Role</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Summary Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">login</span>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Log Masuk Hari Ini</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">{loginLogs.length}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">↑ 100% Berhasil</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">person_add</span>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Log Pendaftaran</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">{registerLogs.length}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">Otomatis Terverifikasi</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">post_add</span>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Log Posting Praktik Baik</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">{postingLogs.length}</div>
            <div className="text-xs text-amber-600 font-semibold mt-0.5">1 Pending Moderasi</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">groups</span>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Komunitas Guru</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">5,420</div>
            <div className="text-xs text-slate-400 font-semibold mt-0.5">Jawa Tengah</div>
          </div>
        </div>
      </div>

      {/* Analytics Chart Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tren Aktivitas Pengguna (Mingguan)</h3>
            <p className="text-xs text-slate-500">Statistik jumlah pendaftaran dan log masuk pengguna Educorner</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Log Masuk</span>
            <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Pendaftaran Baru</span>
          </div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={registrationTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="login" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="pendaftaran" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Log Section Tabs & Actions */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Tab Selection Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveLogTab('LOGIN')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeLogTab === 'LOGIN'
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">login</span>
              <span>1. Log Masuk (Login)</span>
            </button>

            <button
              onClick={() => setActiveLogTab('POSTING')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeLogTab === 'POSTING'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">post_add</span>
              <span>2. Log Posting</span>
            </button>

            <button
              onClick={() => setActiveLogTab('REGISTER')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeLogTab === 'REGISTER'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>3. Log Register</span>
            </button>
          </div>

          {/* Search & Export Buttons */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input
                type="text"
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                placeholder="Cari log pengguna..."
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20 w-48 md:w-64"
              />
            </div>
            <button
              onClick={() => {
                if (activeLogTab === 'LOGIN') exportCSV(loginLogs, 'Log_Masuk_Educorner');
                else if (activeLogTab === 'POSTING') exportCSV(postingLogs, 'Log_Posting_Educorner');
                else exportCSV(registerLogs, 'Log_Register_Educorner');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Log Masuk (Login Logs) */}
        {activeLogTab === 'LOGIN' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">🔑 Log Riwayat Masuk (Login Logs)</h3>
                <p className="text-xs text-slate-500">Mencatat setiap sesi login pengguna beserta metode & IP address</p>
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {filteredLoginLogs.length} Entri Log
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Waktu Login</th>
                    <th className="px-6 py-4">Nama Pengguna</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Metode Login</th>
                    <th className="px-6 py-4">Alamat IP</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredLoginLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.timestamp}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{log.userName}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{log.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          log.method.includes('Google') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400">{log.ip}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          log.status.includes('Berhasil') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400'
                        }`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Log Posting (Posting Logs) */}
        {activeLogTab === 'POSTING' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">📝 Log Aktivitas Posting Praktik Baik</h3>
                <p className="text-xs text-slate-500">Mencatat riwayat pembuatan, penyuntingan, dan moderasi postingan</p>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full">
                {filteredPostingLogs.length} Entri Log
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Waktu Aktivitas</th>
                    <th className="px-6 py-4">Penulis / User</th>
                    <th className="px-6 py-4">Aksi</th>
                    <th className="px-6 py-4">Judul Praktik Baik</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Status Moderasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredPostingLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.timestamp}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{log.userName}</td>
                      <td className="px-6 py-4 font-semibold text-xs text-slate-700 dark:text-slate-300">{log.action}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100 max-w-xs truncate">{log.title}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          {log.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          log.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Log Register (Registration Logs) */}
        {activeLogTab === 'REGISTER' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">👤 Log Riwayat Pendaftaran Pengguna</h3>
                <p className="text-xs text-slate-500">Mencatat riwayat registrasi akun baru pendidik & asal instansi</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                {filteredRegisterLogs.length} Entri Log
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Waktu Daftar</th>
                    <th className="px-6 py-4">Nama Lengkap</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Asal Sekolah</th>
                    <th className="px-6 py-4">Kab/Kota</th>
                    <th className="px-6 py-4">Metode Daftar</th>
                    <th className="px-6 py-4">Status Akun</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredRegisterLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.timestamp}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{log.userName}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{log.email}</td>
                      <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">{log.school}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{log.city}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          log.method.includes('Google') ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}