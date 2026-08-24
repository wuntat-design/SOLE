import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function UserProfilePage() {
  const { user } = useAuth()
  const [userPosts, setUserPosts] = useState([])
  const [stats, setStats] = useState({ total: 0, pending: 0, published: 0 })
  
  const currentUser = user || {
    firstName: "Anonim",
    fullName: "Pengguna Anonim",
    role: "Pengunjung"
  };

  useEffect(() => {
    const allPosts = JSON.parse(localStorage.getItem('bbgtk_best_practices') || '[]');
    // Filter posts by this user. Since we use mock user often, we'll match by name.
    const filtered = allPosts.filter(p => p.author === currentUser.fullName);
    setUserPosts(filtered);

    setStats({
      total: filtered.length,
      pending: filtered.filter(p => p.status === 'pending').length,
      published: filtered.filter(p => p.status === 'published').length
    });
  }, [currentUser.fullName]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Baru saja';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Selamat Datang, {currentUser.firstName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here is a summary of your educator activities and community impact today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Submissions</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{stats.total}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
              <span className="material-symbols-outlined">hourglass_empty</span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">In Review</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Moderation</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{stats.pending}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">Published</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Approved Posts</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{stats.published}</h3>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Submissions Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold">My Submissions</h3>
            <button className="text-primary text-sm font-semibold hover:underline cursor-pointer">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Resource Title</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {userPosts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500 italic">Belum ada kiriman praktik baik.</td>
                  </tr>
                ) : (
                  userPosts.map(post => (
                    <tr key={post.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{post.title}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{post.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(post.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          post.status === 'published' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                          post.status === 'rejected' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                          post.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                          'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {post.status === 'published' ? 'Approved' : post.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Moderation Status / Feedback */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold">Moderation Feedback</h3>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {userPosts.filter(p => p.status === 'rejected' && p.rejectNote).map(post => (
              <div key={post.id} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                  <span className="material-symbols-outlined">feedback</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Moderator Feedback</p>
                  <p className="text-xs text-slate-500 mb-1">On: {post.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 bg-red-50/50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100/50 dark:border-red-900/30 italic">
                    "{post.rejectNote}"
                  </p>
                </div>
              </div>
            ))}

            {userPosts.filter(p => p.status === 'published').slice(0, 2).map(post => (
              <div key={post.id} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p className="text-sm font-bold">System Notification</p>
                  <p className="text-xs text-slate-500 mb-2">Approved</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your post <span className="font-semibold text-slate-900 dark:text-white">{post.title}</span> has been approved and published.
                  </p>
                </div>
              </div>
            ))}

            {userPosts.length === 0 && (
              <p className="text-sm text-slate-500 italic text-center py-4">Belum ada umpan balik moderasi.</p>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Webinars Section */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recommended for You</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Webinar Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
            <div className="relative h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-blue-900 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white opacity-50">video_library</span>
              </div>
              <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider">Webinar</span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">Digital Transformation in Schools</h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>Nov 28, 09:00 AM</span>
              </div>
              <button className="w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold rounded-lg cursor-pointer">Register Now</button>
            </div>
          </div>

          {/* Resource Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
            <div className="relative h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/80 to-teal-900 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white opacity-50">auto_stories</span>
              </div>
              <span className="absolute top-3 left-3 px-2 py-1 bg-teal-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">Guide</span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm mb-2 group-hover:text-teal-600 transition-colors">Kurikulum Merdeka 2024 FAQ</h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>2.4k Views</span>
              </div>
              <button className="w-full py-2 bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white transition-all text-xs font-bold rounded-lg cursor-pointer">Download PDF</button>
            </div>
          </div>

          {/* Community Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
            <div className="relative h-40">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/80 to-indigo-900 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white opacity-50">forum</span>
              </div>
              <span className="absolute top-3 left-3 px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">Community</span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm mb-2 group-hover:text-indigo-600 transition-colors">Jawa Tengah Math Teachers</h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <span className="material-symbols-outlined text-sm">person</span>
                <span>840 Members</span>
              </div>
              <button className="w-full py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold rounded-lg cursor-pointer">Join Discussion</button>
            </div>
          </div>

          {/* Add New Card */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all mb-3">
              <span className="material-symbols-outlined">add</span>
            </div>
            <p className="text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">Submit New Resource</p>
          </div>
        </div>
      </div>
    </div>
  );
}
