import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [googleError, setGoogleError] = useState('');

  // Validasi format email domain @*.belajar.id
  const isBelajarIdEmail = (email) => {
    const belajarIdRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*belajar\.id$/i;
    return belajarIdRegex.test(email);
  };

  const handleGoogleLoginSubmit = (e) => {
    e.preventDefault();
    const email = googleEmailInput.trim();
    if (!isBelajarIdEmail(email)) {
      setGoogleError('Email harus menggunakan akun resmi belajar.id (contoh: nama@sd.belajar.id, nama@dikbud.belajar.id)');
      return;
    }

    setGoogleError('');
    setShowGoogleModal(false);

    // Tentukan role berdasarkan kata kunci di email
    let role = "user";
    let fullName = email.split('@')[0].replace(/[._]/g, ' ');
    fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
    
    if (email.includes("superadmin")) {
      role = "superadmin";
    } else if (email.includes("admin")) {
      role = "admin";
    }

    login({
      firstName: fullName.split(' ')[0],
      fullName: `${fullName} (akun belajar.id)`,
      email: email,
      school: 'Akun Pembelajaran (belajar.id)',
      role: role
    });

    navigate("/");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailInput = e.target.elements[0]?.value || '';
    
    // Auto role assign for demonstration
    let role = "user";
    let fullName = "User Biasa";
    let school = "SDN 01 Semarang";
    if (emailInput.includes("superadmin")) {
      role = "superadmin";
      fullName = "Budi (Super Admin)";
      school = "SMAN 1 Semarang";
    } else if (emailInput.includes("admin")) {
      role = "admin";
      fullName = "Siti (Admin)";
      school = "SMPN 3 Surakarta";
    }

    login({
      firstName: fullName.split(' ')[0],
      fullName: fullName,
      email: emailInput,
      school: school,
      role: role
    });
    navigate("/");
  };
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center selection:bg-primary-container selection:text-on-primary-container w-full">
      {/* Auth Layout Wrapper */}
      <main className="w-full max-w-[1200px] grid lg:grid-cols-12 min-h-[870px] lg:min-h-[700px] gap-0 overflow-hidden lg:rounded-[1.5rem] bg-surface-container-low shadow-sm lg:shadow-xl mt-8">

        {/* Branding Section (Asymmetric Editorial Block) */}
        <section className="hidden lg:flex lg:col-span-5 bg-[linear-gradient(135deg,#003d9b_0%,#0052cc_100%)] relative flex-col justify-between p-12 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-12 w-48 h-48 bg-tertiary/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="h-14 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                <img src="/logoAsset7.png" alt="Logo" className="h-full object-contain" />
              </div>
            </div>
            <h1 className="text-white text-5xl font-black leading-tight tracking-tighter mb-6">
              Selamat datang di Educorner
            </h1>
            <p className="text-on-primary-container text-lg max-w-sm font-medium opacity-90 leading-relaxed">
              SOLE: Wadah Kolaborasi Guru untuk Pembelajaran Bermakna.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex -space-x-4 mb-4">
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="professional portrait of a female educator" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkiwSuAnzkgj3TmfSptaVKSifJYhNI-E9XkQZGk8Y__QJIhAeN86kjgWk_zrYA4K6n35EatxMSHI6FFfsDcMXIMl4IwZy8PiCjkEO2dPH3jhnw2BV2d6eemK_4TlDIBeXznrpfcvMciy5wn2osKZ8qJnUa9GJ00lKV-QoY1Exsvuhqr9yrKO3NrfL6uRM8eZnFGwhhVQixrrY_asLm98YLBw-M6aYosJeYh4mPfP1SE6kG5FMfUUDrIXeW3A83xmUYDtffh_um2CkK" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="smiling male teacher in a modern library" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg0hh-VdWk3aHjFbTtvKy6lwNfVrhsoc53m0d0WqX_8vohahWrKUVeBJgxNngV_MAhnhAEvtkWxSnkzo3isW4r_alm6kw5aPX-JYQywE4TSQybNOykIeKplkidxv7Mh1itdeWyG7bya77mR_Wiz0DLk4k5IgcRW3ToNtxWWnYZnkTPmEcUhfqElHAWS-F3keJ0UL761WzQGH9jVQ65db8WjAM921N2KCNQbsJGFFXc0Y8HAIag3vyqcwAOg5swyQ_AwJdC5Tx6fPHr" />
              <img className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="thoughtful young woman educator" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4LD_G7GlQZW6OK1M5O3KxhxKWdtozpoiUnav8gYbzLGVgOhX8p-CZtF0ighQuz02FKqOsIEJNoJEwFb1hZNK8Mes9OcmTLhCrNJnvLRvKtU6hG3tGHVnI8GejLf0MWBs3X7fHMqgucsoNC9rryI4Lpq_SfnujAE-4Nyz4Q1QSAmme_wv0z7ArSDJOTeJsJj6-qNhI9idMbwhDsFg05IaKSNaamr66H6UFYcgCFCRGtIzQ500s6Eb-L4IUt_b7gy53oSguELA9V906" />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-secondary-container flex items-center justify-center text-on-secondary-container text-xs font-bold">+5k</div>
            </div>
            <p className="text-white/80 text-sm font-medium tracking-wide uppercase">Bergabung dengan Ribuan Guru dan Tenaga Kependidikan</p>
          </div>

          {/* Background Image Integration */}
          <div className="absolute inset-0 z-0 opacity-10">
            <img className="w-full h-full object-cover" alt="high-angle shot of a bright modern classroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA38tvROZHOoZAALC3VQclWY8ukfGOw5bDVx6F7fhA1V7-PBRNCgT3KX3CY9H_or1RVojNnmOgxIuQnbPJ73dXntFnAmjKyR4XaNk4B_Xevnxa7H0hesZVt2bDrz6SAPUhiusgrxP3KNCXiuquQGuE7hyZJt_J6v6n6V90e5CKLr1urtxpO4HSUSSA9ZKWyc2dq53FMfk-Mx3OpWzxQ4CFVJwtuKm2_SgWwdSgR08uIYVaReNV1Db_xmNh4keYqx2TLOf7YZpeY62Df" />
          </div>
        </section>

        {/* Form Section */}
        <section className="col-span-12 lg:col-span-7 bg-surface-container-lowest flex flex-col justify-center px-6 py-12 lg:px-24">
          <div className="max-w-md mx-auto w-full">

            {/* Mobile Branding (Hidden on Desktop) */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <span className="material-symbols-outlined text-white text-4xl">school</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">BBGTK Provinsi Jawa Tengah</h2>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h3 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Login Educorner</h3>
              <p className="text-on-surface-variant font-medium">Akses dashboard kurasi Anda</p>
            </div>

            {/* Main Form */}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Email</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">mail</span>
                  <input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-xl font-medium text-on-surface transition-all placeholder:text-outline-variant outline-none" placeholder="nama@instansi.sch.id" required type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block">Password</label>
                  <Link className="text-xs font-bold text-primary hover:text-primary-container transition-colors tracking-tight uppercase" to="/forgot-password">Lupa Password</Link>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">lock</span>
                  <input className="w-full pl-12 pr-12 py-4 bg-surface-container-low border-transparent focus:border-primary focus:ring-0 rounded-xl font-medium text-on-surface transition-all placeholder:text-outline-variant outline-none" placeholder="••••••••" required type={showPassword ? 'text' : 'password'} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer" type="button">
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <input className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary cursor-pointer" id="remember" type="checkbox" />
                <label className="text-sm font-medium text-on-surface-variant cursor-pointer" htmlFor="remember">Ingat saya di perangkat ini</label>
              </div>

              <button className="w-full bg-[linear-gradient(135deg,#003d9b_0%,#0052cc_100%)] text-white py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer" type="submit">
                Masuk Sekarang
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-black tracking-[0.2em] text-outline text-slate-500 bg-surface-container-lowest px-4">
                Atau Masuk Dengan
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-1 gap-3">
              <button 
                type="button"
                onClick={() => { setGoogleEmailInput(''); setGoogleError(''); setShowGoogleModal(true); }}
                className="flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container-low hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
              >
                <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZMOgvgBuGOGQH-f_whxhn9F6yzANEWJWvpJw2Ptagb0tnizCvUBVgsGAagtq4o8jJHBJhcqA1m95rW7G1wJ3pUxGyJrLzQ5o-l6yZvfVASmOweAqZJ7-UDXQdy6ihU7L29gDKywvmfNseJdfHvMF9QhLIWthDCs3pYF_PF0vAywx6NGh_by9wiKtgmqWwY1LEsAkD53tS4deF4cwf1RjkPh1OVNtLUK-e3TcQmd-eKkSk3g7vj-a6uUFHvoV5Y38SCMyscU7pdqor" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Masuk dengan Akun Google (@*.belajar.id)</span>
              </button>
            </div>

            <div className="mt-12 text-center">
              <p className="text-on-surface-variant font-medium">
                Belum punya akun?
                <Link className="text-primary font-bold hover:underline ml-1 cursor-pointer" to="/register">Daftar Sekarang</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Google belajar.id Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowGoogleModal(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img alt="Google Logo" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZMOgvgBuGOGQH-f_whxhn9F6yzANEWJWvpJw2Ptagb0tnizCvUBVgsGAagtq4o8jJHBJhcqA1m95rW7G1wJ3pUxGyJrLzQ5o-l6yZvfVASmOweAqZJ7-UDXQdy6ihU7L29gDKywvmfNseJdfHvMF9QhLIWthDCs3pYF_PF0vAywx6NGh_by9wiKtgmqWwY1LEsAkD53tS4deF4cwf1RjkPh1OVNtLUK-e3TcQmd-eKkSk3g7vj-a6uUFHvoV5Y38SCMyscU7pdqor" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sign in with Google</h3>
                  <p className="text-xs text-slate-500">Gunakan Akun Pembelajaran (belajar.id)</p>
                </div>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
                <span className="material-symbols-outlined text-slate-400">close</span>
              </button>
            </div>

            <form onSubmit={handleGoogleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Email Google belajar.id</label>
                <input
                  type="email"
                  required
                  value={googleEmailInput}
                  onChange={(e) => { setGoogleEmailInput(e.target.value); setGoogleError(''); }}
                  placeholder="contoh: ahmad@guru.sd.belajar.id"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary dark:text-white"
                  autoFocus
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Mendukung domain: <code className="text-primary font-mono">@dikbud.belajar.id</code>, <code className="text-primary font-mono">@sd.belajar.id</code>, <code className="text-primary font-mono">@smp.belajar.id</code>, <code className="text-primary font-mono">@sma.belajar.id</code>, <code className="text-primary font-mono">@smk.belajar.id</code>, dll.
                </p>
              </div>

              {googleError && (
                <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3 rounded-xl text-xs text-red-600 dark:text-red-400">
                  {googleError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer dark:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 shadow-md cursor-pointer"
                >
                  Lanjutkan Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-center py-8 px-6 text-outline font-medium text-sm mt-auto">
        <div className="mb-4 md:mb-0">© 2026 BBGTK Provinsi Jawa Tengah. All Rights Reserved.</div>
        <div className="flex gap-8">
          <a className="hover:text-primary transition-colors" href="#">Syarat &amp; Ketentuan</a>
          <a className="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
          <a className="hover:text-primary transition-colors" href="#">Bantuan</a>
        </div>
      </footer>
    </div>
  );
}
