import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/check-email');
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed w-full min-h-screen">
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side: Brand Identity */}
        <section className="relative w-full md:w-1/2 flex flex-col justify-between p-12 overflow-hidden bg-primary-container text-on-primary">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover mix-blend-soft-light opacity-30" alt="Modern minimalist library interior" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQxhvoS3FuDqCrFGzNhUn87ZQjeGZ-M4v-D0uJQcUEWNoxu4UkUETzwM77Jtw3_jIeKkpD67OBkdc2OvEpJH80zJdOQY-8fjbCb1_t2-hYwprW_dZTHUYrRwKvmuwYyspqSjSw42da-zVWCPpkwVacGOlXpXjXlPzU5V0f8RNaSKYSrAn_0J4nYXWKeQZzPaKbHgD-_0wH4DWjiTTeTaeSOV29d6R8NIg1zsITQxl2I73ljUxVNJmna07fhMoKHLgSsQvj0cCaGQgC" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-container/90"></div>
          </div>
          
          {/* Content Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Educorner</span>
            </div>
          </div>
          
          {/* Content Body */}
          <div className="relative z-10 mt-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight mb-6">
              Pulihkan Akses Belajar Anda.
            </h1>
            <p className="text-lg md:text-xl text-primary-fixed leading-relaxed max-w-md">
              Masukkan email yang terdaftar untuk mengatur ulang kata sandi dan melanjutkan perjalanan edukasi Anda bersama BBGTK Provinsi Jawa Tengah.
            </p>
          </div>
          
          {/* Brand Logo BBGTK */}
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed/60 mb-4">Dikelola Oleh</p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-auto bg-white/10 backdrop-blur-sm rounded-lg p-2 px-4 flex items-center">
                <span className="text-white font-bold tracking-tight">BBGTK PROVINSI JAWA TENGAH</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Right Side: Form Content */}
        <section className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-surface relative">
          <div className="w-full max-w-md">
            {/* Form Card */}
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-sm transition-all duration-300">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-on-surface tracking-tight mb-3">Lupa Kata Sandi?</h2>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk membuat kata sandi baru.
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-sm font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                    Alamat Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">mail</span>
                    </div>
                    <input className="block w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent rounded-full text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none" placeholder="nama@email.com" required type="email" />
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-full text-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer" type="submit">
                  <span>Kirim Instruksi</span>
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <Link className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-colors group" to="/login">
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  <span>Kembali ke Halaman Login</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Footer Minimalis */}
          <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8 text-center">
            <p className="text-sm text-outline font-medium">
              © 2026 BBGTK Provinsi Jawa Tengah - Educorner. The Academic Atelier.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
