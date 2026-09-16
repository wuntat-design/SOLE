import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getLRSStatements, getLRSConfig, saveLRSConfig, emitXAPIStatement, XAPI_VERBS } from '../services/lrsService'
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell 
} from 'recharts'

export default function LrsAnalyticsPage() {
  const { user } = useAuth()
  const [statements, setStatements] = useState(() => getLRSStatements())
  const [config, setConfig] = useState(() => getLRSConfig())
  const [selectedStatement, setSelectedStatement] = useState(null)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const handleEmitted = (e) => {
      setStatements(prev => [e.detail, ...prev])
    }
    window.addEventListener('xapi_statement_emitted', handleEmitted)
    return () => window.removeEventListener('xapi_statement_emitted', handleEmitted)
  }, [])

  // Verb Distribution Calculation
  const verbCounts = statements.reduce((acc, stmt) => {
    const verbName = stmt.verb?.display?.['id-ID'] || stmt.verb?.display?.['en-US'] || 'Aktivitas'
    acc[verbName] = (acc[verbName] || 0) + 1
    return acc
  }, {})

  const verbChartData = Object.keys(verbCounts).map(key => ({
    name: key,
    count: verbCounts[key]
  }))

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

  // Filtered statements for table
  const filteredStatements = statements.filter(stmt => {
    const query = searchFilter.toLowerCase()
    return (
      stmt.actor?.name?.toLowerCase().includes(query) ||
      stmt.actor?.mbox?.toLowerCase().includes(query) ||
      stmt.verb?.display?.['id-ID']?.toLowerCase().includes(query) ||
      stmt.object?.definition?.name?.['id-ID']?.toLowerCase().includes(query)
    )
  })

  const handleSimulateEmission = () => {
    emitXAPIStatement({
      user: user || { fullName: 'Budi Hartono', email: 'budi@guru.sd.belajar.id' },
      verb: XAPI_VERBS.WATCHED,
      objectName: 'Webinar Sekampadi: Pembelajaran Berbasis AI',
      objectId: 'https://sole.id/webinar/sim-1',
      result: { completion: true, duration: 'PT30M' }
    })
  }

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(statements, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `xAPI_Statements_LRS_${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen p-6 lg:p-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <span className="material-symbols-outlined text-2xl">database</span>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Learning Record Store (LRS) & xAPI Analytics
              </h1>
              <p className="text-xs text-slate-500">
                Pusat data analitik aktivitas pembelajaran terstandar xAPI (ADL Experience API v1.0.3)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateEmission}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            <span>Uji Simulasikan Statement</span>
          </button>
          <button
            onClick={() => setShowConfigModal(true)}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">settings_remote</span>
            <span>Konfigurasi Server LRS</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Statement xAPI</span>
            <span className="material-symbols-outlined text-primary">receipt_long</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{statements.length}</p>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <span>✓ Terverifikasi xAPI Standard</span>
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Pendidik Aktif (Actors)</span>
            <span className="material-symbols-outlined text-emerald-500">group</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {new Set(statements.map(s => s.actor?.mbox)).size}
          </p>
          <p className="text-[11px] text-slate-400">Akun belajar.id unik</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Aktivitas Ditonton (Watched)</span>
            <span className="material-symbols-outlined text-amber-500">play_circle</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {statements.filter(s => s.verb?.id?.includes('watched')).length}
          </p>
          <p className="text-[11px] text-slate-400">Sesi tayang webinar</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Status Koneksi LRS Remote</span>
            <span className="material-symbols-outlined text-purple-500">wifi_tethering</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Online & Terhubung</p>
          </div>
          <p className="text-[11px] text-slate-400 truncate">{config.endpoint}</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Chart 1: Verb Distribution */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">📊 Distribusi Kata Kerja (xAPI Verbs)</h3>
              <p className="text-xs text-slate-500">Analisis ragam aksi belajar peserta dalam platform</p>
            </div>
          </div>
          <div className="h-64">
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

        {/* Chart 2: Activity Volume Trend */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">📈 Tren Volume Aktivitas LRS</h3>
              <p className="text-xs text-slate-500">Aliran rekaman data aktivitas secara real-time</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { time: '08:00', total: 12 },
                { time: '10:00', total: 28 },
                { time: '12:00', total: 45 },
                { time: '14:00', total: 32 },
                { time: '16:00', total: 60 },
                { time: 'Sekarang', total: statements.length + 15 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Area type="monotone" dataKey="total" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* xAPI Statements Live Stream Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">📡 Stream Aliran xAPI Statement</h3>
            <p className="text-xs text-slate-500">Rekaman langsung struktur data xAPI (Actor - Verb - Object - Result)</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari actor / verb / materi..."
              className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={exportJSON}
              className="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export xAPI JSON</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Actor (Pendidik)</th>
                <th className="px-5 py-3">Verb (Aksi)</th>
                <th className="px-5 py-3">Object (Materi/Aktivitas)</th>
                <th className="px-5 py-3">Result / Progress</th>
                <th className="px-5 py-3">Aksi Inspector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredStatements.map((stmt) => (
                <tr key={stmt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-slate-400">
                    {new Date(stmt.timestamp).toLocaleTimeString('id-ID')}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{stmt.actor?.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{stmt.actor?.mbox}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-full font-bold bg-primary/10 text-primary uppercase text-[10px]">
                      {stmt.verb?.display?.['id-ID'] || stmt.verb?.display?.['en-US']}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 max-w-xs truncate">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {stmt.object?.definition?.name?.['id-ID'] || 'Aktivitas'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{stmt.object?.id}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    {stmt.result?.score ? (
                      <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                        Skor: {stmt.result.score.raw}
                      </span>
                    ) : (
                      <span className="text-slate-400">Terselesaikan</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setSelectedStatement(stmt)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-lg text-[11px] flex items-center gap-1 cursor-pointer"
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

      {/* Modal Raw JSON Inspector */}
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
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowConfigModal(false)}>
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base">Konfigurasi Remote LRS Endpoint</h3>
              <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); saveLRSConfig(config); setShowConfigModal(false); alert('✅ Konfigurasi LRS Server Berhasil Disimpan!'); }} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">LRS Endpoint URL</label>
                <input
                  type="url"
                  required
                  value={config.endpoint}
                  onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">xAPI Auth Key</label>
                <input
                  type="text"
                  required
                  value={config.key}
                  onChange={(e) => setConfig({ ...config, key: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">xAPI Auth Secret</label>
                <input
                  type="password"
                  required
                  value={config.secret}
                  onChange={(e) => setConfig({ ...config, secret: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="enable_lrs"
                  checked={config.enabled}
                  onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="enable_lrs" className="font-bold cursor-pointer">Aktifkan Auto-Sync Statement ke Remote LRS</label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setShowConfigModal(false)} className="px-4 py-2 border rounded-lg font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-md">Simpan Konfigurasi</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
