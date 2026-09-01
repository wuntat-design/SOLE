import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40 pt-8 pb-12">
      <div className="flex flex-col items-center justify-center text-center gap-8 py-6">
        <img
          src="/logoAsset7.png"
          alt="Logo Kemendikdasmen BBGTK Jateng"
          className="h-20 md:h-28 object-contain drop-shadow-md"
        />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/best-practice"
            id="hero-cta-primary"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-primary text-white text-base md:text-lg font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/30 cursor-pointer"
          >
            Mulai Belajar Mandiri
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link
            to="/webinar"
            id="hero-cta-secondary"
            className="w-full sm:w-auto flex items-center justify-center rounded-xl h-14 px-8 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white text-base md:text-lg font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
          >
            Lihat Webinar
          </Link>
        </div>
      </div>
    </section>
  )
}
