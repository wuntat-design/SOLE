import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const depan = e.target.elements.nama_depan?.value || "Pengguna";
    const belakang = e.target.elements.nama_belakang?.value || "Baru";
    
    // Auto login
    login({
      firstName: depan,
      fullName: `${depan} ${belakang}`,
      role: 'user'
    });
    navigate('/');
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row min-h-screen">
        
        {/* Editorial Side Panel */}
        <div className="hidden lg:flex lg:w-2/5 bg-primary relative overflow-hidden flex-col justify-between p-12 text-on-primary">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="text-xl font-bold tracking-tight">BBGTK Provinsi Jawa Tengah</span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter leading-tight mb-6">
              Membangun Masa Depan <br /> Pendidikan Unggul.
            </h1>
            <p className="text-lg text-on-primary-container max-w-md font-light leading-relaxed">
              Bergabunglah dengan komunitas pendidik terbesar di Jawa Tengah. Mari berkolaborasi dalam ekosistem Educorner untuk meningkatkan kompetensi dan kualitas pembelajaran.
            </p>
          </div>
          

          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-container rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-tertiary-container rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90"></div>
        </div>

        {/* Form Canvas */}
        <div className="flex-grow bg-surface p-6 lg:p-20 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-surface-container-low rounded-xl p-8 lg:p-12 transition-all duration-300">
            
            <div className="mb-8 text-center lg:text-left">
              <div className="lg:hidden flex justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">school</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Formulir Registrasi</h2>
              <p className="text-on-surface-variant font-medium">Lengkapi data diri Anda untuk memulai perjalanan di Educorner.</p>
            </div>

            {/* Quick Registration Recommendation with Google belajar.id */}
            <div className="mb-8 p-5 bg-primary/5 dark:bg-slate-800/80 rounded-2xl border border-primary/20 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">verified</span>
                <span>Rekomendasi Utama untuk Guru & Pendidik</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Gunakan **Akun Pembelajaran (belajar.id)** untuk pendaftaran instan tanpa mengisi formulir manual. Akun Anda otomatis terverifikasi.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#2264d1] hover:bg-[#1b53b2] text-white rounded-full font-bold text-sm shadow-md transition-all cursor-pointer mt-1"
              >
                <svg className="w-5 h-5 bg-white rounded-full p-0.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Daftar / Masuk Cepat dengan Akun belajar.id</span>
              </button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-slate-400 bg-surface-container-low px-4">
                Atau Isi Formulir Manual
              </div>
            </div>
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Section: Personal Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama Depan */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="nama_depan">Nama Depan</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="nama_depan" name="nama_depan" placeholder="Contoh: Budi" type="text" />
                  </div>
                  {/* Nama Belakang */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="nama_belakang">Nama Belakang</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="nama_belakang" name="nama_belakang" placeholder="Contoh: Santoso" type="text" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NUPTK */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="nuptk">NUPTK</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="nuptk" name="nuptk" placeholder="16 digit nomor unik" type="text" />
                  </div>
                  {/* Jenis Kelamin */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-3 ml-1">Jenis Kelamin</label>
                    <div className="flex gap-6 mt-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary bg-surface-container-lowest" name="gender" type="radio" value="Laki-laki" />
                        <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Laki-laki</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-5 h-5 text-primary border-outline-variant focus:ring-primary bg-surface-container-lowest" name="gender" type="radio" value="Perempuan" />
                        <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Perempuan</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Alamat Email */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="email">Alamat Email</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="email" name="email" placeholder="nama@email.com" type="email" />
                    <p className="text-[10px] text-primary font-semibold mt-1.5 ml-1">Alamat email ini akan digunakan sebagai username untuk login</p>
                  </div>
                  {/* No Telp */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="telp">No Telp / WhatsApp</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="telp" name="telp" placeholder="08xx xxxx xxxx" type="tel" />
                  </div>
                </div>
                
                {/* Password Field with Toggle */}
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="password">Kata Sandi</label>
                  <div className="relative">
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 pr-12 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="password" name="password" placeholder="Masukkan kata sandi baru" type="password" />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" type="button">
                      <span className="material-symbols-outlined text-xl">visibility</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-1.5 ml-1 leading-relaxed">Kata sandi harus terdiri dari 12–16 karakter, kombinasi angka, huruf, dan simbol.</p>
                </div>
                
                {/* Confirm Password Field with Error State */}
                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="confirm_password">Ulangi Kata Sandi</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="confirm_password" name="confirm_password" placeholder="Ketik ulang kata sandi" type="password" />
                  {/* 
                  To show error state, we would conditionally use 'border-2 border-error text-error'
                  <div className="flex items-center gap-1 mt-1.5 ml-1 text-error">
                    <span className="material-symbols-outlined text-sm">error</span>
                    <p className="text-[10px] font-bold">Kata sandi tidak sesuai</p>
                  </div> 
                  */}
                </div>
              </div>

              {/* Section: Professional Context */}
              <div className="pt-6 border-t border-outline-variant/15 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Jenjang Sekolah */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="jenjang">Jenjang</label>
                    <select className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface appearance-none transition-all" id="jenjang" name="jenjang" defaultValue="">
                      <option disabled value="">Pilih Jenjang</option>
                      <option value="TK/PAUD">TK/PAUD</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="SMA">SMA</option>
                      <option value="SMK">SMK</option>
                      <option value="SLB">SLB</option>
                    </select>
                  </div>
                  {/* Kab/Kota */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="lokasi">Kabupaten / Kota</label>
                    <select className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface appearance-none transition-all" id="lokasi" name="lokasi" defaultValue="">
                      <option disabled value="">Pilih Kabupaten/Kota di Jawa Tengah</option>
                      <option value="Kabupaten Banjarnegara">Kabupaten Banjarnegara</option>
                      <option value="Kabupaten Banyumas">Kabupaten Banyumas</option>
                      <option value="Kabupaten Batang">Kabupaten Batang</option>
                      <option value="Kabupaten Blora">Kabupaten Blora</option>
                      <option value="Kabupaten Boyolali">Kabupaten Boyolali</option>
                      <option value="Kabupaten Brebes">Kabupaten Brebes</option>
                      <option value="Kabupaten Cilacap">Kabupaten Cilacap</option>
                      <option value="Kabupaten Demak">Kabupaten Demak</option>
                      <option value="Kabupaten Grobogan">Kabupaten Grobogan</option>
                      <option value="Kabupaten Jepara">Kabupaten Jepara</option>
                      <option value="Kabupaten Karanganyar">Kabupaten Karanganyar</option>
                      <option value="Kabupaten Kebumen">Kabupaten Kebumen</option>
                      <option value="Kabupaten Kendal">Kabupaten Kendal</option>
                      <option value="Kabupaten Klaten">Kabupaten Klaten</option>
                      <option value="Kabupaten Kudus">Kabupaten Kudus</option>
                      <option value="Kabupaten Magelang">Kabupaten Magelang</option>
                      <option value="Kabupaten Pati">Kabupaten Pati</option>
                      <option value="Kabupaten Pekalongan">Kabupaten Pekalongan</option>
                      <option value="Kabupaten Pemalang">Kabupaten Pemalang</option>
                      <option value="Kabupaten Purbalingga">Kabupaten Purbalingga</option>
                      <option value="Kabupaten Purworejo">Kabupaten Purworejo</option>
                      <option value="Kabupaten Rembang">Kabupaten Rembang</option>
                      <option value="Kabupaten Semarang">Kabupaten Semarang</option>
                      <option value="Kabupaten Sragen">Kabupaten Sragen</option>
                      <option value="Kabupaten Sukoharjo">Kabupaten Sukoharjo</option>
                      <option value="Kabupaten Tegal">Kabupaten Tegal</option>
                      <option value="Kabupaten Temanggung">Kabupaten Temanggung</option>
                      <option value="Kabupaten Wonogiri">Kabupaten Wonogiri</option>
                      <option value="Kabupaten Wonosobo">Kabupaten Wonosobo</option>
                      <option value="Kota Magelang">Kota Magelang</option>
                      <option value="Kota Pekalongan">Kota Pekalongan</option>
                      <option value="Kota Salatiga">Kota Salatiga</option>
                      <option value="Kota Semarang">Kota Semarang</option>
                      <option value="Kota Surakarta">Kota Surakarta</option>
                      <option value="Kota Tegal">Kota Tegal</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Asal Sekolah */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="asal_sekolah">Asal Sekolah</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="asal_sekolah" name="asal_sekolah" placeholder="Nama sekolah saat ini" type="text" />
                  </div>
                  {/* NPSN */}
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-wider font-bold text-on-surface-variant mb-2 ml-1" htmlFor="npsn">NPSN</label>
                    <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline-variant transition-all" id="npsn" name="npsn" placeholder="Nomor Pokok Sekolah Nasional" type="text" />
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-xl">info</span>
                  <span className="text-xs font-medium">Data Anda aman dan dilindungi sistem enkripsi.</span>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Link className="text-primary font-bold hover:underline text-sm uppercase tracking-widest px-4" to="/login">Batal</Link>
                  <button className="w-full md:w-auto bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-primary/20 transition-all active:scale-95 text-sm uppercase tracking-widest cursor-pointer" type="submit">
                    Daftar
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Contextual Branding for Mobile */}
          <div className="mt-8 lg:hidden text-center">
            <p className="text-sm font-semibold text-primary">BBGTK Provinsi Jawa Tengah</p>
            <p className="text-xs text-on-surface-variant">© 2026 Educorner</p>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center mt-auto bg-surface-container-low border-t border-outline-variant/15">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-4 md:mb-0">
          © 2026 BBGTK Provinsi Jawa Tengah. All Rights Reserved.
        </div>
        <div className="flex gap-8">
          <a className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Privacy Policy</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Terms of Service</a>
          <a className="text-slate-400 hover:text-primary transition-colors text-sm font-medium" href="#">Technical Support</a>
        </div>
      </footer>
    </div>
  );
}
