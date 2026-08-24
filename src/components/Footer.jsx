import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Katalog Webinar', href: '/webinar' },
  { label: 'Direktori Best Practice', href: '/best-practice' },
  { label: 'Portal Belajar Mandiri', href: '/belajar' },
]

const supportLinks = [
  { label: 'Pusat Bantuan', href: '#' },
  { label: 'Panduan Pengguna', href: '#' },
  { label: 'Syarat & Ketentuan', href: '#' },
  { label: 'Kebijakan Privasi', href: '#' },
]

const socialLinks = [
  { icon: 'public', href: '#', label: 'Website' },
  { icon: 'mail', href: '#', label: 'Email' },
  { icon: 'phone', href: '#', label: 'Phone' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-6 md:px-10 lg:px-40 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center p-2 rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold">Educorner BBGTK</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
            Unit Pelaksana Teknis di bawah Kemendikdasmen yang berfokus pada pengembangan dan pemberdayaan guru di Jawa Tengah.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors"
                href={social.href}
                aria-label={social.label}
              >
                <span className="material-symbols-outlined text-sm">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Menu Cepat</h4>
          <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Dukungan</h4>
          <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
            {supportLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Lokasi Kami</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Kp. Dadapan Rt. 06/Rw. 07 Jatikuwung, Gondangrejo, Kabupaten Karanganyar, Jawa Tengah 57188
          </p>
          <div className="h-48 w-full rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <iframe
              src="https://maps.google.com/maps?q=Kp.%20Dadapan%20Rt.%2006/Rw.%2007%20Jatikuwung,%20Gondangrejo,%20Kabupaten%20Karanganyar,%20Jawa%20Tengah&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps BBGTK Jawa Tengah"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-xs">© 2026 BBGTK Provinsi Jawa Tengah. Hak Cipta Dilindungi Undang-Undang.</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Platform Status: Online</p>
        </div>
      </div>
    </footer>
  )
}
