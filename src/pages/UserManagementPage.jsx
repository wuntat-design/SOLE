import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { syncYouTubeFeed } from '../services/youtubeService';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const defaultUsersList = [
  { id: 1, name: 'Budi Hartono', email: 'budi.h@edu.jateng.go.id', role: 'Super Admin', agency: 'SMAN 1 Semarang', city: 'Kota Semarang', active: true },
  { id: 2, name: 'Siti Aminah', email: 'siti.aminah@edu.jateng.go.id', role: 'Moderator', agency: 'SMPN 3 Solo', city: 'Surakarta', active: true },
  { id: 3, name: 'Eko Prasetyo', email: 'eko_p@edu.jateng.go.id', role: 'User', agency: 'SMKN 1 Magelang', city: 'Magelang', active: false },
  { id: 4, name: 'Dewi Anggraeni', email: 'dewi.ang@edu.jateng.go.id', role: 'User', agency: 'SDN 02 Brebes', city: 'Brebes', active: true }
];

export default function UserManagementPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('ROLES');
  const [roleFilter, setRoleFilter] = useState('All');
  const [auditLogs, setAuditLogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('bbgtk_users_list');
    return saved ? JSON.parse(saved) : defaultUsersList;
  });

  const saveUsersList = (newUsers) => {
    setUsersList(newUsers);
    localStorage.setItem('bbgtk_users_list', JSON.stringify(newUsers));
  };

  const handleRoleChange = (userId, newRole) => {
    const targetUser = usersList.find(u => u.id === userId);
    const updated = usersList.map(u => u.id === userId ? { ...u, role: newRole } : u);
    saveUsersList(updated);
    alert(`✅ Hak akses untuk "${targetUser?.name}" berhasil diubah menjadi ${newRole}!`);
  };

  const handleAdminSync = async () => {
    setIsSyncing(true);
    const result = await syncYouTubeFeed();
    if (result.success) {
      alert(`✅ Berhasil menyinkronkan ${result.count} video dari channel YouTube BBGTK!`);
    } else {
      alert('❌ Gagal melakukan sinkronisasi YouTube.');
    }
    setIsSyncing(false);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      id: Date.now(),
      name: `${form.nama_depan.value} ${form.nama_belakang.value}`,
      email: form.email.value,
      role: 'User',
      agency: form.sekolah.value,
      city: form.kota.value,
      active: true
    };
    saveUsersList([...usersList, newUser]);
    setShowAddModal(false);
    setShowPassword(false);
  };

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetTarget, setResetTarget] = useState(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPasswordInput.trim()) return;
    alert(`✅ Password untuk pengguna "${resetTarget.name}" berhasil di-reset!`);
    setShowResetModal(false);
    setResetTarget(null);
    setNewPasswordInput('');
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedUser = {
      ...editUser,
      name: form.nama_lengkap.value,
      email: form.edit_email.value,
      agency: form.edit_sekolah.value,
      city: form.edit_kota.value,
    };
    saveUsersList(usersList.map(u => u.id === editUser.id ? updatedUser : u));
    setShowEditModal(false);
    setEditUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      saveUsersList(usersList.filter(u => u.id !== id));
    }
  };

  useEffect(() => {
    // Generate/fetch Audit Logs
    const localLogs = JSON.parse(localStorage.getItem('auditLogs')) || [];
    setAuditLogs(localLogs);
  }, [activeTab]);

  // Mock Chart Data
  const trafficData = [
    { name: 'Sen', users: 120 }, { name: 'Sel', users: 200 }, { name: 'Rab', users: 150 },
    { name: 'Kam', users: 280 }, { name: 'Jum', users: 310 }, { name: 'Sab', users: 190 }, { name: 'Min', users: 90 },
  ];
  const jenjangData = [
    { name: 'TK/PAUD', value: 15 }, { name: 'SD', value: 45 }, { name: 'SMP', value: 25 }, { name: 'SMA/K', value: 15 }
  ];
  
  const webinarData = [
    { name: 'Literasi Digital', count: 120 },
    { name: 'Kurikulum Merdeka', count: 98 },
    { name: 'Asesmen Nasional', count: 86 },
    { name: 'Pembelajaran Hibrid', count: 45 }
  ];

  const cityData = [
    { city: 'Semarang', users: 320 },
    { city: 'Surakarta', users: 210 },
    { city: 'Magelang', users: 180 },
    { city: 'Banyumas', users: 150 },
    { city: 'Pekalongan', users: 130 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderDashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 font-medium mb-1">Total Pengguna</div>
          <div className="text-3xl font-black text-slate-900 dark:text-slate-100">1,284</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 font-medium mb-1">Total Praktik Baik</div>
          <div className="text-3xl font-black text-primary">452</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 font-medium mb-1">Praktik Tertunda (Pending)</div>
          <div className="text-3xl font-black text-amber-500">12</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="text-sm text-slate-500 font-medium mb-1">Total Webinar Tersedia</div>
            <div className="text-3xl font-black text-emerald-500">28</div>
          </div>
          <button
            onClick={handleAdminSync}
            disabled={isSyncing}
            className="mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow transition-all cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-sm ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
            {isSyncing ? 'Syncing...' : 'Sync YouTube'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-[350px]">
          <h3 className="text-lg font-bold mb-4">Trafik Pengguna (Mingguan)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="users" stroke="#0052cc" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-[350px]">
          <h3 className="text-lg font-bold mb-4">Distribusi Jenjang Sekolah</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jenjangData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {jenjangData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-[350px]">
          <h3 className="text-lg font-bold mb-4">Top 5 Kabupaten/Kota Terdaftar</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="city" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 h-[350px]">
          <h3 className="text-lg font-bold mb-4">Referensi Webinar untuk Praktik Baik</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={webinarData} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderRolesTab = () => {
    const displayedUsers = roleFilter === 'All' 
      ? usersList 
      : usersList.filter(u => u.role.toLowerCase().includes(roleFilter.toLowerCase()));

    return (
      <div className="space-y-6">
        {/* Advanced Filter Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-full p-2 flex flex-wrap items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex-1 flex items-center gap-4 px-4">
            <span className="material-symbols-outlined text-slate-400">filter_list</span>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Filter by:</span>
            <div className="flex gap-2">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border-none rounded-full text-sm font-medium px-4 py-1.5 focus:ring-primary/20 outline-none cursor-pointer"
              >
                <option value="All">Role: Semua</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator / Admin</option>
                <option value="User">User Biasa</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-slate-50 dark:bg-slate-700 text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            Tambah Pengguna
          </button>
        </div>

        {/* User Data Grid */}
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Profil Pengguna</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Pengaturan Role / Akses</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Asal Instansi / Sekolah</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Aksi SuperAdmin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {displayedUsers.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden text-sm">
                          {usr.name.charAt(0)}{usr.name.split(' ')[1]?.[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{usr.name}</div>
                          <div className="text-sm text-slate-500">{usr.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <select 
                        value={usr.role}
                        onChange={(e) => handleRoleChange(usr.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight border outline-none cursor-pointer transition-all ${
                          usr.role === 'Super Admin' ? 'bg-primary/10 text-primary border-primary/20' :
                          usr.role === 'Moderator' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <option value="Super Admin">⭐ SUPER ADMIN</option>
                        <option value="Moderator">🛡️ MODERATOR / ADMIN</option>
                        <option value="User">👤 USER BIASA</option>
                      </select>
                    </td>
                  <td className="px-6 py-6">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{usr.agency}</div>
                    <div className="text-xs text-slate-500 font-medium">{usr.city}</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${usr.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{usr.active ? 'Active' : 'Offline'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button onClick={() => { setEditUser(usr); setShowEditModal(true); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-primary transition-all cursor-pointer" title="Edit Profil">
                        <span className="material-symbols-outlined text-lg">edit_square</span>
                      </button>
                      <button onClick={() => { setResetTarget(usr); setNewPasswordInput(''); setShowResetModal(true); }} className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg text-amber-500 transition-all cursor-pointer" title="Reset Password">
                        <span className="material-symbols-outlined text-lg">key</span>
                      </button>
                      <button onClick={() => handleDeleteUser(usr.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-all cursor-pointer" title="Hapus Pengguna">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700/50 text-xs font-medium text-slate-500 flex justify-between items-center">
          <span>Menampilkan {usersList.length} pengguna terdaftar</span>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tambah Pengguna Baru</h2>
                <p className="text-sm text-slate-500 mt-1">Pengguna baru otomatis mendapat role <span className="font-bold text-primary">User</span></p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-6">
              {/* Nama Depan & Belakang */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Nama Depan</label>
                  <input name="nama_depan" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="Contoh: Budi" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Nama Belakang</label>
                  <input name="nama_belakang" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="Contoh: Santoso" />
                </div>
              </div>

              {/* NUPTK & Jenis Kelamin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">NUPTK</label>
                  <input name="nuptk" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="16 digit nomor unik" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Jenis Kelamin</label>
                  <div className="flex gap-6 mt-1.5">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" name="gender" type="radio" value="Laki-laki" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Laki-laki</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input className="w-4 h-4 text-primary border-slate-300 focus:ring-primary" name="gender" type="radio" value="Perempuan" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">Perempuan</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Email & No Telp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Alamat Email</label>
                  <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="nama@email.com" />
                  <p className="text-[10px] text-primary font-semibold mt-1 ml-1">Alamat email ini akan digunakan sebagai username untuk login</p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">No Telp / WhatsApp</label>
                  <input name="telp" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="08xx xxxx xxxx" />
                </div>
              </div>

              {/* Kata Sandi & Ulangi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Kata Sandi</label>
                  <div className="relative">
                    <input name="password" type={showPassword ? 'text' : 'password'} required className="w-full px-4 py-2.5 pr-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="Masukkan kata sandi baru" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary cursor-pointer">
                      <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 ml-1">12–16 karakter, kombinasi angka, huruf, dan simbol.</p>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Ulangi Kata Sandi</label>
                  <input name="confirm_password" type="password" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="Ketik ulang kata sandi" />
                </div>
              </div>

              {/* Jenjang & Kab/Kota */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Jenjang</label>
                  <select name="jenjang" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white cursor-pointer" defaultValue="">
                    <option disabled value="">Pilih Jenjang</option>
                    <option value="TK/PAUD">TK/PAUD</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                    <option value="SMK">SMK</option>
                    <option value="SLB">SLB</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Kabupaten / Kota</label>
                  <select name="kota" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white cursor-pointer" defaultValue="">
                    <option disabled value="">Pilih Kabupaten/Kota di Jawa Tengah</option>
                    {['Kabupaten Banjarnegara','Kabupaten Banyumas','Kabupaten Batang','Kabupaten Blora','Kabupaten Boyolali','Kabupaten Brebes','Kabupaten Cilacap','Kabupaten Demak','Kabupaten Grobogan','Kabupaten Jepara','Kabupaten Karanganyar','Kabupaten Kebumen','Kabupaten Kendal','Kabupaten Klaten','Kabupaten Kudus','Kabupaten Magelang','Kabupaten Pati','Kabupaten Pekalongan','Kabupaten Pemalang','Kabupaten Purbalingga','Kabupaten Purworejo','Kabupaten Rembang','Kabupaten Semarang','Kabupaten Sragen','Kabupaten Sukoharjo','Kabupaten Tegal','Kabupaten Temanggung','Kabupaten Wonogiri','Kabupaten Wonosobo','Kota Magelang','Kota Pekalongan','Kota Salatiga','Kota Semarang','Kota Surakarta','Kota Tegal'].map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Asal Sekolah & NPSN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Asal Sekolah</label>
                  <input name="sekolah" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="Nama sekolah saat ini" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">NPSN</label>
                  <input name="npsn" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" placeholder="Nomor Pokok Sekolah Nasional" />
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 flex items-center gap-3 border border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-amber-500">info</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">Pengguna baru akan otomatis mendapatkan role <strong>User</strong>. Hanya Super Admin yang dapat mengubah role.</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer dark:text-white">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Tambah Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setShowEditModal(false); setEditUser(null); }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Pengguna</h2>
                <p className="text-sm text-slate-500 mt-1">Ubah data pengguna <span className="font-bold text-primary">{editUser.name}</span></p>
              </div>
              <button onClick={() => { setShowEditModal(false); setEditUser(null); }} className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>
            <form onSubmit={handleEditUser} className="p-6 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Nama Lengkap</label>
                <input name="nama_lengkap" required defaultValue={editUser.name} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Alamat Email</label>
                <input name="edit_email" type="email" required defaultValue={editUser.email} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Asal Sekolah</label>
                  <input name="edit_sekolah" required defaultValue={editUser.agency} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Kabupaten / Kota</label>
                  <select name="edit_kota" required defaultValue={editUser.city} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white cursor-pointer">
                    <option value="">Pilih Kab/Kota...</option>
                    {['Kab. Banjarnegara','Kab. Banyumas','Kab. Batang','Kab. Blora','Kab. Boyolali','Kab. Brebes','Kab. Cilacap','Kab. Demak','Kab. Grobogan','Kab. Jepara','Kab. Karanganyar','Kab. Kebumen','Kab. Kendal','Kab. Klaten','Kab. Kudus','Kab. Magelang','Kab. Pati','Kab. Pekalongan','Kab. Pemalang','Kab. Purbalingga','Kab. Purworejo','Kab. Rembang','Kab. Semarang','Kab. Sragen','Kab. Sukoharjo','Kab. Tegal','Kab. Temanggung','Kab. Wonogiri','Kab. Wonosobo','Kota Magelang','Kota Pekalongan','Kota Salatiga','Kota Semarang','Kota Surakarta','Kota Tegal'].map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Role</label>
                <div className="px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500">
                  {editUser.role} <span className="text-[10px] text-slate-400 font-normal ml-2">(Ubah role di kolom tabel)</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowEditModal(false); setEditUser(null); }} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer dark:text-white">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">save</span>
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && resetTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setShowResetModal(false); setResetTarget(null); }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined">key</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Reset Password</h2>
                  <p className="text-xs text-slate-500">Pengguna: <span className="font-bold text-primary">{resetTarget.name}</span></p>
                </div>
              </div>
              <button onClick={() => { setShowResetModal(false); setResetTarget(null); }} className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>
            <form onSubmit={handleResetPasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1.5 block">Password Baru</label>
                <input
                  type="password"
                  required
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
                  placeholder="Masukkan password baru untuk pengguna"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowResetModal(false); setResetTarget(null); }} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer dark:text-white">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-lg bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-sm">key</span>
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

  const renderReportsTab = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Auth Audit Logs</h3>
          <button className="text-sm font-semibold text-primary hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Session ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">User Profile</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Log In Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Log Out Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {auditLogs.length > 0 ? auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20">
                  <td className="px-8 py-4 text-xs font-mono text-slate-400">{log.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-slate-200">{log.name}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">{log.role}</td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-medium">
                    {new Date(log.loginTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute:'2-digit' })} WIB
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {log.logoutTime ? `${new Date(log.logoutTime).toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })} WIB` : <span className="inline-flex items-center gap-1 text-amber-500"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Active</span>}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400">Tidak ada data login terekam dalam browser Anda saat ini.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl w-full mx-auto space-y-8 animate-fade-in pb-20">
      {/* Editorial Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Digital Curator System</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-100">User Management</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm md:text-lg font-medium leading-relaxed">
            Orchestrate educational permissions and monitor active curators across Central Java modules.
          </p>
        </div>
      </div>

      {/* Internal Navigation */}
      <div className="flex gap-6 border-b border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => setActiveTab('DASHBOARD')}
          className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'DASHBOARD' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('ROLES')}
          className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'ROLES' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Roles
        </button>
        <button 
          onClick={() => setActiveTab('REPORTS')}
          className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'REPORTS' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Reports
        </button>
      </div>

      {/* Tab Render */}
      {activeTab === 'DASHBOARD' && renderDashboardTab()}
      {activeTab === 'ROLES' && renderRolesTab()}
      {activeTab === 'REPORTS' && renderReportsTab()}
      
    </div>
  );
}
