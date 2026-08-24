import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40 pt-8 pb-12">
      <div
        className="relative overflow-hidden rounded-xl md:rounded-3xl min-h-[520px] flex flex-col items-center justify-center text-center p-6"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11, 80, 218, 0.4), rgba(16, 22, 34, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlrPaqv9kZXjbFc2Fi0dKQCKr2EwA7gZTcFfsfUZ3N9gf57O-f9udr9834_LIr9UXXk2M-UzXyJWc3dfkoyeqWug_r3InHl2ywGXZzNuNJ0__mHNJoiKSCEOgL-VhUAW1X2n6PyQzyZsIQ3am22e-FXcwPTOAkMu7LxBb--GCr5MAuWfhMe-TI0ueiGS8B0ZIjaPFd5AxgXMHNv4O1n6BFHliZV1ude8LavT6-Uf7Tuy49enmZ-3jBR3TMivkcYKGUjN_D6dtig2SR')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="z-10 max-w-3xl space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-wider">
            Pusat Pengembangan Kompetensi
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Tingkatkan Kompetensi Pendidik Bersama Educorner
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed">
            Pusat belajar mandiri dan berbagi praktik baik bagi guru di Jawa Tengah untuk mewujudkan Merdeka Belajar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/best-practice"
              id="hero-cta-primary"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg h-14 px-8 bg-primary text-white text-lg font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/30 cursor-pointer"
            >
              Mulai Belajar Mandiri
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              to="/webinar"
              id="hero-cta-secondary"
              className="w-full sm:w-auto flex items-center justify-center rounded-lg h-14 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold hover:bg-white/20 transition-all cursor-pointer"
            >
              Lihat Webinar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
