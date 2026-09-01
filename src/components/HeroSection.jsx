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

        {/* Moving Banner Slider Below Navigation Buttons */}
        <div className="w-full overflow-hidden mt-6 py-4 relative group">
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-surface dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-surface dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

          <style>{`
            @keyframes marqueeForward {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-track {
              display: flex;
              width: max-content;
              animation: marqueeForward 25s linear infinite;
            }
            .animate-marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="animate-marquee-track items-center gap-8 md:gap-12">
            <div className="flex items-center gap-8 md:gap-12 shrink-0">
              <img src="/bannerLogo1.png" alt="Banner Logo Kemendikdasmen 1" className="h-10 md:h-14 object-contain" />
              <img src="/bannerLogo2.png" alt="Banner Logo Kemendikdasmen 2" className="h-10 md:h-14 object-contain" />
            </div>
            <div className="flex items-center gap-8 md:gap-12 shrink-0">
              <img src="/bannerLogo1.png" alt="Banner Logo Kemendikdasmen 1" className="h-10 md:h-14 object-contain" />
              <img src="/bannerLogo2.png" alt="Banner Logo Kemendikdasmen 2" className="h-10 md:h-14 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
