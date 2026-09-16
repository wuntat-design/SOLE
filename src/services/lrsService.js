/**
 * Learning Record Store (LRS) & xAPI (Experience API / Tin Can API) Service
 * Standard: ADL xAPI v1.0.3 Specification
 * BBGTK Provinsi Jawa Tengah - SOLE Educorner
 */

const STORAGE_KEY = 'bbgtk_xapi_lrs_statements'
const CONFIG_KEY = 'bbgtk_lrs_config'

// Default Standard Verbs
export const XAPI_VERBS = {
  INITIALIZED: {
    id: 'http://adlnet.gov/expapi/verbs/initialized',
    display: { 'id-ID': 'memulai', 'en-US': 'initialized' }
  },
  WATCHED: {
    id: 'https://w3id.org/xapi/video/verbs/watched',
    display: { 'id-ID': 'menonton video', 'en-US': 'watched' }
  },
  COMPLETED: {
    id: 'http://adlnet.gov/expapi/verbs/completed',
    display: { 'id-ID': 'menyelesaikan', 'en-US': 'completed' }
  },
  PASSED: {
    id: 'http://adlnet.gov/expapi/verbs/passed',
    display: { 'id-ID': 'lulus kuis', 'en-US': 'passed' }
  },
  SUBMITTED: {
    id: 'http://adlnet.gov/expapi/verbs/submitted',
    display: { 'id-ID': 'mengirimkan praktik baik', 'en-US': 'submitted' }
  },
  SEARCHED: {
    id: 'http://activitystrea.ms/schema/1.0/search',
    display: { 'id-ID': 'mencari materi', 'en-US': 'searched' }
  }
}

// Initial Sample xAPI Statements if empty
const sampleStatements = [
  {
    id: 'e28a914b-57f1-4a11-b842-178831901001',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actor: {
      name: 'Budi Hartono, S.Pd.',
      mbox: 'mailto:budi.hartono@guru.sd.belajar.id',
      objectType: 'Agent'
    },
    verb: XAPI_VERBS.WATCHED,
    object: {
      id: 'https://sole.id/webinar/1',
      objectType: 'Activity',
      definition: {
        name: { 'id-ID': 'Sekampadi PJOK: Optimalisasi Asesmen Pembelajaran' },
        description: { 'id-ID': 'Webinar praktik baik asesmen PJOK Sekolah Dasar' },
        type: 'http://adlnet.gov/expapi/activities/media'
      }
    },
    result: {
      completion: true,
      duration: 'PT45M',
      extensions: { 'https://sole.id/xapi/extensions/progress': 100 }
    },
    context: {
      platform: 'BBGTK SOLE Educorner',
      language: 'id-ID'
    }
  },
  {
    id: 'c49b821a-12d4-4f99-a931-178831901002',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    actor: {
      name: 'Siti Aminah, M.Pd.',
      mbox: 'mailto:siti.aminah@guru.smp.belajar.id',
      objectType: 'Agent'
    },
    verb: XAPI_VERBS.SUBMITTED,
    object: {
      id: 'https://sole.id/best-practice/201',
      objectType: 'Activity',
      definition: {
        name: { 'id-ID': 'Implementasi Project-Based Learning IPA' },
        description: { 'id-ID': 'Dokumentasi Praktik Baik Pembelajaran Berbasis Proyek' },
        type: 'http://adlnet.gov/expapi/activities/assessment'
      }
    },
    result: {
      completion: true,
      success: true
    },
    context: {
      platform: 'BBGTK SOLE Educorner',
      language: 'id-ID'
    }
  },
  {
    id: 'f91a034d-88e2-4b22-a114-178831901003',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    actor: {
      name: 'Eko Prasetyo, S.Kom.',
      mbox: 'mailto:eko.p@guru.smk.belajar.id',
      objectType: 'Agent'
    },
    verb: XAPI_VERBS.PASSED,
    object: {
      id: 'https://sole.id/course/1/post-test',
      objectType: 'Activity',
      definition: {
        name: { 'id-ID': 'Post-Test Asesmen Pembelajaran' },
        type: 'http://adlnet.gov/expapi/activities/cmi.interaction'
      }
    },
    result: {
      score: { scaled: 1.0, raw: 100, min: 0, max: 100 },
      success: true,
      completion: true
    },
    context: {
      platform: 'BBGTK SOLE Educorner',
      language: 'id-ID'
    }
  }
]

/**
 * Fetch all stored xAPI statements from Local LRS
 */
export function getLRSStatements() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleStatements))
    return sampleStatements
  }
  return JSON.parse(saved)
}

/**
 * Emit a new standard xAPI Statement to LRS
 */
export function emitXAPIStatement({ user, verb, objectName, objectId, objectType = 'Activity', result = {}, context = {} }) {
  const statements = getLRSStatements()
  
  const newStatement = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'stmt-' + Date.now(),
    timestamp: new Date().toISOString(),
    actor: {
      name: user?.fullName || user?.firstName || 'Pendidik Anonim',
      mbox: `mailto:${user?.email || 'pendidik@guru.sd.belajar.id'}`,
      objectType: 'Agent'
    },
    verb: verb,
    object: {
      id: objectId || `https://sole.id/activity/${Date.now()}`,
      objectType: objectType,
      definition: {
        name: { 'id-ID': objectName || 'Aktivitas Belajar' },
        type: 'http://adlnet.gov/expapi/activities/module'
      }
    },
    result: {
      completion: true,
      ...result
    },
    context: {
      platform: 'BBGTK SOLE Educorner',
      language: 'id-ID',
      ...context
    }
  }

  const updated = [newStatement, ...statements]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  
  // Trigger custom browser event for live analytics listener
  window.dispatchEvent(new CustomEvent('xapi_statement_emitted', { detail: newStatement }))
  
  return newStatement
}

/**
 * Save Remote LRS Server Connection Config
 */
export function getLRSConfig() {
  const saved = localStorage.getItem(CONFIG_KEY)
  return saved ? JSON.parse(saved) : {
    endpoint: 'https://lrs.bbgtkjateng.go.id/xAPI/',
    key: 'bbgtk_key_89213',
    secret: 'bbgtk_secret_77192',
    enabled: true
  }
}

export function saveLRSConfig(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}
