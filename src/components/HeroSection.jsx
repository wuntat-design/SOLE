import { Link } from 'react-router-dom';

const heroLogos = [
  { name: 'BerAKHLAK', src: '/logos/BERAKHLAK.png' },
  { name: 'Berani Jujur Hebat', src: '/logos/Berani Jujur Hebat.png' },
  { name: 'LOGO BBGTK', src: '/logos/LOGO BBGTKAsset 3.png' },
  { name: 'RAMAH', src: '/logos/RAMAH.png' },
  { name: 'ZI WBK 5', src: '/logos/ZI WBKAsset 5.png' },
  { name: 'ZI WBK 7', src: '/logos/ZI WBKAsset 7.png' },
  { name: 'Bangga Melayani', src: '/logos/bangga.png' },
  { name: 'Logo ZI WBK Baru', src: '/logos/logo ZI WBK baruAsset 5.png' },
  { name: 'Rumah Pendidikan', src: '/logos/rumah-pendidikan.png' },
];

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
              animation: marqueeForward 30s linear infinite;
            }
            .animate-marquee-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="animate-marquee-track items-center gap-8 md:gap-12">
            {[...heroLogos, ...heroLogos].map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.name}
                className="h-10 md:h-14 max-w-[130px] md:max-w-[170px] object-contain shrink-0 filter hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
