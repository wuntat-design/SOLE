import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CheckEmailPage() {
  const [countdown, setCountdown] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    if (countdown > 0) return;
    // Simulate API call for resending email here...
    setCountdown(300);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen">
      <main className="flex min-h-screen w-full">
        {/* Left Side: Brand Identity */}
        <div className="hidden lg:flex w-1/2 bg-[linear-gradient(135deg,#003d9b_0%,#0052cc_100%)] relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20" title="minimalist architectural geometric patterns">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full border-[40px] border-white/10"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-white/5"></div>
          </div>
          <div className="relative z-10 max-w-lg">
            <h1 className="text-white text-6xl font-extrabold tracking-tighter leading-none mb-6">
              Cek Email Anda
            </h1>
            <p className="text-on-primary-container text-xl font-light leading-relaxed">
              Kami di The Academic Atelier sedang menyiapkan jalan kembali Anda ke kurasi pengetahuan premium kami.
            </p>
          </div>
        </div>
        
        {/* Right Side: Form / Status Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-24 bg-surface">
          <div className="w-full max-w-md">
            <div className="bg-surface-container-lowest rounded-xl p-10 lg:p-14 transition-all shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-8 p-6 rounded-full bg-surface-container-low text-primary relative">
                  <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'wght' 200" }}>
                    mark_email_read
                  </span>
                  <div className="absolute -top-1 -right-1 bg-tertiary text-white rounded-full p-2 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check
                    </span>
                  </div>
                </div>
                
                <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-4 leading-tight">
                  Instruksi Terkirim!
                </h2>
                
                <p className="text-on-surface-variant text-base mb-10 leading-relaxed font-medium">
                  Kami telah mengirimkan tautan pemulihan kata sandi ke alamat email Anda. Silakan periksa kotak masuk (atau folder spam) dan ikuti petunjuknya.
                </p>
                
                <a className="bg-[linear-gradient(135deg,#003d9b_0%,#0052cc_100%)] text-white w-full py-4 px-6 rounded-full font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 duration-200" href="#">
                  Buka Email Saya
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                </a>
                
                <div className="mt-12 space-y-6 flex flex-col items-center">
                  <p className="text-sm text-on-surface-variant font-medium">
                    Tidak menerima email?  
                    <button 
                      onClick={handleResend}
                      disabled={countdown > 0}
                      className={`font-bold ml-1 transition-colors ${countdown > 0 ? 'text-outline cursor-not-allowed' : 'text-primary hover:underline cursor-pointer'}`}
                    >
                      Kirim ulang {countdown > 0 && `(${formatTime(countdown)})`}
                    </button>
                  </p>
                  <Link className="flex items-center justify-center gap-2 text-on-secondary-fixed-variant font-semibold text-sm hover:text-primary transition-colors cursor-pointer" to="/login">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Kembali ke Halaman Login
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center opacity-50">
              <div className="flex justify-center gap-6 mb-4">
                <span className="material-symbols-outlined text-xl">school</span>
                <span className="material-symbols-outlined text-xl">architecture</span>
                <span className="material-symbols-outlined text-xl">menu_book</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                The Academic Atelier © 2026
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Minimalis */}
      <footer className="fixed bottom-0 left-0 w-full z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="hidden md:block">
            <span className="text-[10px] font-inter uppercase tracking-widest text-slate-400">
              Curating Knowledge
            </span>
          </div>
          <div className="pointer-events-auto flex gap-8">
            <a className="text-xs font-inter uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors duration-200" href="#">Privacy Policy</a>
            <a className="text-xs font-inter uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors duration-200" href="#">Terms of Service</a>
            <a className="text-xs font-inter uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors duration-200" href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
