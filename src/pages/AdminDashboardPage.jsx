import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { syncYouTubeFeed } from '../services/youtubeService';
import { getLRSStatements, getLRSConfig, saveLRSConfig, emitXAPIStatement, XAPI_VERBS } from '../services/lrsService';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
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
  const [activeLogTab, setActiveLogTab] = useState('LOGIN'); // 'LOGIN', 'POSTING', 'REGISTER', 'LRS'
  const [searchLog, setSearchLog] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  // LRS States
  const [xAPIStatements, setXAPIStatements] = useState(() => getLRSStatements());
  const [lrsConfig, setLRSConfig] = useState(() => getLRSConfig());
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [showLrsModal, setShowLrsModal] = useState(false);

  useEffect(() => {
    const handleEmitted = (e) => {
      setXAPIStatements(prev => [e.detail, ...prev]);
    };
    window.addEventListener('xapi_statement_emitted', handleEmitted);
    return () => window.removeEventListener('xapi_statement_emitted', handleEmitted);
  }, []);

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
    link.setAttribute('download', `${filename}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJSON = (data, filename) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${filename}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Verb Distribution Calculation
  const verbCounts = xAPIStatements.reduce((acc, stmt) => {
    const verbName = stmt.verb?.display?.['id-ID'] || stmt.verb?.display?.['en-US'] || 'Aktivitas';
    acc[verbName] = (acc[verbName] || 0) + 1;
    return acc;
  }, {});

  const verbChartData = Object.keys(verbCounts).map(key => ({
    name: key,
    count: verbCounts[key]
  }));

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  // Filtering
  const filteredLoginLogs = loginLogs.filter(log =>
    log.userName.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.email.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.method.toLowerCase().includes(searchLog.toLowerCase())
  );

  const filteredPostingLogs = postingLogs.filter(log =>
    log.userName.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.title.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.category.toLowerCase().includes(searchLog.toLowerCase())
  );

  const filteredRegisterLogs = registerLogs.filter(log =>
    log.userName.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.school.toLowerCase().includes(searchLog.toLowerCase()) ||
    log.city.toLowerCase().includes(searchLog.toLowerCase())
  );

  const filteredXAPI = xAPIStatements.filter(stmt =>
    stmt.actor?.name?.toLowerCase().includes(searchLog.toLowerCase()) ||
    stmt.actor?.mbox?.toLowerCase().includes(searchLog.toLowerCase()) ||
    stmt.verb?.display?.['id-ID']?.toLowerCase().includes(searchLog.toLowerCase()) ||
    stmt.object?.definition?.name?.['id-ID']?.toLowerCase().includes(searchLog.toLowerCase())
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen p-6 lg:p-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Dashboard Pengguna & Analitik LRS (xAPI)
              </h1>
              <p className="text-xs text-slate-500">
                Pusat kontrol terpadu untuk audit log pengguna, postingan, pendaftaran, dan data analitik e-learning terstandar xAPI.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAdminSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 font-bold text-xs hover:bg-red-500 hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-base ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
            <span>{isSyncing ? 'Syncing...' : 'Sync YouTube'}</span>
          </button>

          <button
            onClick={() => setShowLrsModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 font-bold text-xs hover:bg-purple-600 hover:text-white transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">settings_remote</span>
            <span>Server LRS</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Log Masuk (Login)</span>
            <span className="material-symbols-outlined text-primary">login</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{loginLogs.length}</p>
          <p className="text-[11px] text-emerald-600 font-bold">100% Autentikasi Terverifikasi</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Log Posting Praktik Baik</span>
            <span className="material-symbols-outlined text-amber-500">post_add</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{postingLogs.length}</p>
          <p className="text-[11px] text-slate-400">Konten Pembelajaran Baru</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Pendaftaran Baru</span>
            <span className="material-symbols-outlined text-emerald-500">person_add</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{registerLogs.length}</p>
          <p className="text-[11px] text-emerald-600 font-bold">+12% Minggu Ini</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>xAPI LRS Statements</span>
            <span className="material-symbols-outlined text-purple-500">database</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{xAPIStatements.length}</p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">Standard ADL xAPI v1.0.3</p>
        </div>
      </div>

      {/* Visual Analytics Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">📈 Tren Aktivitas Pengguna & Pendaftaran</h3>
            <p className="text-xs text-slate-500">Grafik perbandingan riwayat masuk harian dan akun terdaftar</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span> Log Masuk</span>
            <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Pendaftaran Baru</span>
          </div>
        </div>
        <div className="h-[240px]">
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

      {/* Unified Log Section Tabs & Actions */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Tab Selection Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveLogTab('LOGIN')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
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
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeLogTab === 'REGISTER'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>3. Log Register</span>
            </button>

            <button
              onClick={() => setActiveLogTab('LRS')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeLogTab === 'LRS'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">database</span>
              <span>4. Log xAPI & LRS Analytics</span>
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
                placeholder="Cari kata kunci..."
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20 w-44 md:w-60"
              />
            </div>
            <button
              onClick={() => {
                if (activeLogTab === 'LOGIN') exportCSV(loginLogs, 'Log_Masuk_Educorner');
                else if (activeLogTab === 'POSTING') exportCSV(postingLogs, 'Log_Posting_Educorner');
                else if (activeLogTab === 'REGISTER') exportCSV(registerLogs, 'Log_Register_Educorner');
                else exportJSON(xAPIStatements, 'xAPI_LRS_Statements');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export {activeLogTab === 'LRS' ? 'JSON' : 'CSV'}</span>
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
              <table className="w-full text-left border-collapse min-w-[750px]">
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
              <table className="w-full text-left border-collapse min-w-[750px]">
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
                      <td className="px-6 py-4 text-xs font-semibold">{log.action}</td>
                      <td className="px-6 py-4 max-w-xs truncate text-slate-800 dark:text-slate-200 font-medium">{log.title}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {log.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                          log.status.includes('Disetujui') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'
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

        {/* Tab 3: Log Register (Register Logs) */}
        {activeLogTab === 'REGISTER' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">👤 Log Pendaftaran Pengguna Baru</h3>
                <p className="text-xs text-slate-500">Mencatat data akun guru & tenaga kependidikan yang baru terdaftar</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                {filteredRegisterLogs.length} Entri Log
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Waktu Daftar</th>
                    <th className="px-6 py-4">Nama Lengkap</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Instansi Sekolah</th>
                    <th className="px-6 py-4">Kab/Kota</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredRegisterLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.timestamp}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{log.userName}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{log.email}</td>
                      <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{log.school}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{log.city}</td>
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

        {/* Tab 4: Unified Log xAPI & LRS Analytics */}
        {activeLogTab === 'LRS' && (
          <div className="space-y-6">
            {/* Verb Chart Sub-section */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">📊 Distribusi Aksi Belajar (xAPI Verbs)</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={verbChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={130} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {verbChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* xAPI Stream Table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">📡 Aliran Rekaman Data xAPI (LRS Stream)</h3>
                  <p className="text-xs text-slate-500">Struktur data standar xAPI (Actor - Verb - Object - Result)</p>
                </div>
                <button
                  onClick={() => {
                    emitXAPIStatement({
                      user: user || { fullName: 'Budi Hartono', email: 'budi@guru.sd.belajar.id' },
                      verb: XAPI_VERBS.WATCHED,
                      objectName: 'Webinar Sekampadi: Pembelajaran Berbasis AI',
                      objectId: 'https://sole.id/webinar/sim-1',
                      result: { completion: true, duration: 'PT30M' }
                    });
                    setXAPIStatements(getLRSStatements());
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">send</span>
                  <span>Uji Statement</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-3">Timestamp</th>
                      <th className="px-5 py-3">Actor (Pendidik)</th>
                      <th className="px-5 py-3">Verb (Aksi)</th>
                      <th className="px-5 py-3">Object (Materi)</th>
                      <th className="px-5 py-3">Result / Progress</th>
                      <th className="px-5 py-3">Inspector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {filteredXAPI.map((stmt) => (
                      <tr key={stmt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-3 font-mono text-slate-400">
                          {new Date(stmt.timestamp).toLocaleTimeString('id-ID')}
                        </td>
                        <td className="px-5 py-3">
                          <div className="font-bold text-slate-900 dark:text-white">{stmt.actor?.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{stmt.actor?.mbox}</div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="px-2.5 py-1 rounded-full font-bold bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300 uppercase text-[10px]">
                            {stmt.verb?.display?.['id-ID'] || stmt.verb?.display?.['en-US']}
                          </span>
                        </td>
                        <td className="px-5 py-3 max-w-xs truncate">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">
                            {stmt.object?.definition?.name?.['id-ID'] || 'Aktivitas'}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">{stmt.object?.id}</div>
                        </td>
                        <td className="px-5 py-3">
                          {stmt.result?.score ? (
                            <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                              Skor: {stmt.result.score.raw}
                            </span>
                          ) : (
                            <span className="text-slate-400">Terselesaikan</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <button
                            onClick={() => setSelectedStatement(stmt)}
                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-xs">code</span>
                            <span>Raw JSON</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Raw JSON Inspector Modal */}
      {selectedStatement && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStatement(null)}>
          <div className="bg-slate-900 text-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">data_object</span>
                <h3 className="font-mono text-sm font-bold">xAPI Statement Payload Inspector</h3>
              </div>
              <button onClick={() => setSelectedStatement(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed">
              {JSON.stringify(selectedStatement, null, 2)}
            </pre>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedStatement(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs cursor-pointer"
              >
                Tutup Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal LRS Configuration */}
      {showLrsModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowLrsModal(false)}>
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base">Konfigurasi Remote LRS Endpoint</h3>
              <button onClick={() => setShowLrsModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); saveLRSConfig(lrsConfig); setShowLrsModal(false); alert('✅ Konfigurasi LRS Server Berhasil Disimpan!'); }} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">LRS Endpoint URL</label>
                <input
                  type="url"
                  required
                  value={lrsConfig.endpoint}
                  onChange={(e) => setLRSConfig({ ...lrsConfig, endpoint: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">xAPI Auth Key</label>
                <input
                  type="text"
                  required
                  value={lrsConfig.key}
                  onChange={(e) => setLRSConfig({ ...lrsConfig, key: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">xAPI Auth Secret</label>
                <input
                  type="password"
                  required
                  value={lrsConfig.secret}
                  onChange={(e) => setLRSConfig({ ...lrsConfig, secret: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowLrsModal(false)} className="px-4 py-2 border rounded-lg font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-md">Simpan Konfigurasi</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}