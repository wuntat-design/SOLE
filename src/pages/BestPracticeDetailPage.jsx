import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function BestPracticeDetailPage() {
  const { user, isLoggedIn } = useAuth();
  const userRole = user?.role || 'user';
  const handleDeleteComment = (commentId) => {
    // Placeholder: In real app, call API to delete comment
    console.log('Delete comment', commentId);
    // For demo, you could remove from local state if implemented
  };
  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8">
          <section className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex gap-5 items-center">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 border-2 border-primary/20 shrink-0"
                  data-alt="Siti Aminah, S.Pd."
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-8xpplCSu57mY2vHJ97ASVWoeuqps0qQWLj2bArLxQM499bqv0_hE2Dlnhxg1YYwNn4OQcyDd5d8X21bRQC3Ok8TcM47hmdJjpSG9WBo3ZPt7ylfU3pQwW3eVlVfI-Rm5bdmlDb0OrhSbaz4wRfY6Iio9wNuz7JkIilhn0Vl3FkznpHECxWa9R62F7UsCRp1Pl8Hvw4itNDyPBy4zaZLf0CJ7lTZnJyQtJ8jjVT_-XcQ0wUNFmo68p8osvnneyx50h8iYmBJN_dcB")'
                  }}
                ></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded">Praktik Pilihan</span>
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">KURIKULUM MERDEKA • SD/MI</span>
                  </div>
                  <h1 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                    Implementasi Project-Based Learning pada Mata Pelajaran IPA Kelas 5
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-base">
                    Oleh <span className="font-semibold text-slate-800 dark:text-slate-200">Siti Aminah, S.Pd.</span> • Guru Penggerak di SDN 01 Semarang
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                  Simpan
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                  Bagikan
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Media Player (YouTube) */}
              <section className="bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 aspect-video relative group">
                <iframe
                  className="w-full h-full absolute inset-0 z-20"
                  src={`https://www.youtube.com/embed/9PlwkttZkt0`}
                  title="Webinar Source Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </section>

              {/* STAR Narrative Tab */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                  <nav className="flex gap-8 overflow-x-auto hide-scrollbar">
                    <button className="text-primary font-bold text-sm border-b-2 border-primary pb-4 whitespace-nowrap cursor-pointer">Tentang &amp; STAR Narrative</button>
                  </nav>
                </div>
                
                <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                  
                  {/* Tentang Best Practice */}
                  <div className="mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-primary">description</span> Tentang Praktik Baik
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-justify">
                      Praktik baik ini dirancang berdasarkan inspirasi dari webinar BBGTK seri "Stop Asal Matiin PID" yang membahas pendekatan diferensiasi instruksional. Saya mendapati bahwa anak-anak di kelas 5 sangat kurang antusias terhadap teori perpindahan panas dalam pelajaran IPA. Dengan mengadopsi struktur Project-Based Learning yang saya pelajari dari webinar tersebut, saya merancang sebuah ekosistem belajar di mana para siswa merancang prototipe "Termos Ramah Lingkungan". Deskripsi lengkap dari alur yang saya ciptakan disajikan menggunakan format STAR di bawah ini.
                    </p>
                  </div>

                  {/* STAR Method */}
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-sm">S</div> Situasi
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-justify">
                        Pada semester awal 2023, keterlibatan belajar siswa pada mapel IPA materi perpindahan kalor turun drastis. Penyampaian materi yang terlalu berpusat pada buku teks dan ceramah membuat konsep kalor yang abstrak menjadi sulit dicerna. Akibatnya, pada pre-test materi ini, hanya 35% siswa yang berhasil mencapai Kriteria Ketuntasan Minimal (KKM).
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-bold text-amber-600 flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-amber-500/10 flex items-center justify-center text-sm">T</div> Tantangan
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-justify">
                        Tantangan terbesar adalah bagaimana merancang pembelajaran yang tidak hanya mengubah teori abstrak menjadi suatu yang konkrit, tapi juga memaksa siswa untuk berpikir kritis tanpa merasa terbebani oleh menghafal rumus. Keterbatasan alat peraga laboratorium di sekolah dasar juga menjadi hambatan fisik yang harus diatasi.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center text-sm">A</div> Aksi
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 mb-4 text-justify">Langkah-langkah konkrit yang saya jalankan dalam kerangka Project-Based Learning antara lain:</p>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                        <li>Mengadakan diskusi pemantik dengan menunjukkan es yang mencair di berbagai material wadah yang berbeda untuk merangsang rasa ingin tahu.</li>
                        <li>Membagi siswa ke dalam kelompok heterogen berskala kecil (4 orang) untuk bekerja sebagai "Insinyur Cilik".</li>
                        <li>Siswa merancang bangun "Termos Sederhana" menggunakan campuran bahan bekas bernilai ekonomis (serbuk kayu, botol plastik, aluminium foil kap).</li>
                        <li>Mengintegrasikan asesmen interaktif di tengah proyek menggunakan platform gamifikasi digital.</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-lg font-bold text-emerald-600 flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center text-sm">R</div> Refleksi &amp; Hasil
                      </h3>
                      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border-l-4 border-emerald-500">
                        <p className="italic text-slate-700 dark:text-slate-300 text-justify">
                          "Hasil evaluasi pasca-proyek sangat menakjubkan. Tingkat ketuntasan siswa melonjak menjadi 88%. Tidak hanya itu, pada kuesioner akhir, anak-anak mengaku lebih memahami konsep konduktor dan isolator karena mereka dapat melihat dan merasakan langsung bagaimana material hasil pilihan mereka sukses mempertahankan suhu air di dalam termos buatan mereka sendiri. Otonomi siswa memang fondasi keaktifan dalam merdeka belajar."
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </section>

              {/* Discussion & Comments */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-800" id="discussion">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">forum</span>
                  Diskusi &amp; Komentar
                  <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">2</span>
                </h3>
                
                {isLoggedIn ? (
                  <div className="flex gap-4 mb-10">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                      data-alt="Current user avatar"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRKZZ6nwweb-lICGinb8T_t9zy91aHTqsyaG8kq6a3Y1VmVsx1vsMrqXfTBOglxODSQohyFSjsCoY8VxeN6TWL8DwkuiqL-VjGd-a1KshUTOnN_lAR_KOcr1x3OyDKandoZPeDsLCPsUxjT199zwXSTpBqIx53HYc7GGp-HRavyFQ76tXtiDZhovyk4PPXbAkIJBYe66ARg3IOQaWzMRs-T6iIokdhYRsUDt2E89pXstYw847WWzBleugSoVtBMKnugutrb34wctYG")'
                      }}
                    ></div>
                    <div className="flex-1">
                      <textarea
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary p-3 text-sm min-h-[100px]"
                        placeholder="Tambahkan komentar atau tanyakan sesuatu kepada penulis..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
                          Kirim Komentar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 text-center mb-10 border border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">lock</span>
                    <h4 className="text-slate-900 dark:text-slate-100 font-bold mb-1">Area Komentar Terkunci</h4>
                    <p className="text-sm text-slate-500 mb-4">Silakan masuk (Login) ke akun Anda untuk mengirimkan diskusi dan bertukar praktik baik.</p>
                    <Link to="/login" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm tracking-wide hover:bg-blue-700 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-sm">login</span>
                      Login untuk Berkomentar
                    </Link>
                  </div>
                )}

                <div className="space-y-8">
                  {/* Comment 1 */}
                  <div className="flex gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 border border-slate-200"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbvmGznlnRZsC5Sdc7teZR-6dLaX_fKGceJadPDthWYprUOK5X9T2qJBYjHVjIb1km3gP1JZ-uBf4XIr66-Zr4IdjKhn5YHtB7CPFCQFQx0KiIUHNQHLrQdGbVuBibOFnl9uE7WjykcU-ejZAby5Rckq9rvJS7bvJsaM077Eq7zPyxkh32MGoorUyBMzHC-DRLUOBwFUUF-pf3xcR7dA5gpILmUDhMuOtuWvImuqmPHz04Fmep_d3r0glBzsG6XyxAiwmYsAm76jo4")'
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Prof. Michael Chen</span>
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] px-1.5 py-0.5 rounded font-bold border border-slate-200 dark:border-slate-700 uppercase">
                          Pengawas
                        </span>
                        <span className="text-xs text-slate-500 ml-auto w-full sm:w-auto">2 jam yang lalu</span>
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Pemaparan kerangka STAR yang sangat inspiratif. Bagaimana cara Ibu mengatasi perbedaan minat di masing-masing siswa yang berada dalam satu kelompok heterogen?
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary cursor-pointer">
                          <span className="material-symbols-outlined text-sm">thumb_up</span> 12
                        </button>
                        <button className="text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-wider cursor-pointer">Balas</button>
                        {/* Admin/SuperAdmin: bisa hapus komentar siapapun */}
                        {(userRole === 'admin' || userRole === 'superadmin') && (
                          <button className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDeleteComment(1)}>
                            <span className="material-symbols-outlined text-sm">delete</span> Hapus
                          </button>
                        )}
                      </div>

                      {/* Threaded Replies */}
                      <div className="mt-6 space-y-6 border-l-2 border-slate-100 dark:border-slate-800 pl-4 sm:pl-6">
                        <div className="flex gap-3">
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0"
                            style={{
                              backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-8xpplCSu57mY2vHJ97ASVWoeuqps0qQWLj2bArLxQM499bqv0_hE2Dlnhxg1YYwNn4OQcyDd5d8X21bRQC3Ok8TcM47hmdJjpSG9WBo3ZPt7ylfU3pQwW3eVlVfI-Rm5bdmlDb0OrhSbaz4wRfY6Iio9wNuz7JkIilhn0Vl3FkznpHECxWa9R62F7UsCRp1Pl8Hvw4itNDyPBy4zaZLf0CJ7lTZnJyQtJ8jjVT_-XcQ0wUNFmo68p8osvnneyx50h8iYmBJN_dcB")'
                            }}
                          ></div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Siti Aminah, S.Pd.</span>
                              <span className="bg-primary/10 text-primary text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Guru (Penulis)</span>
                              <span className="text-xs text-slate-500 ml-auto w-full sm:w-auto">1 jam yang lalu</span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              Terima kasih Bapak. Saya menerapkan rotasi peran di dalam kelompok (sebagai perancang bahan, pencatat data percobaan, dan juru pelapor), sehingga mereka semua terpacu berkontribusi di bidang yang mereka kuasai bergantian.
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary cursor-pointer">
                                <span className="material-symbols-outlined text-sm">thumb_up</span> 5
                              </button>
                              <button className="text-xs font-bold text-slate-500 hover:text-primary uppercase cursor-pointer">Balas</button>
                              {/* Simulasi: komentar ini milik user yang sedang login */}
                              {isLoggedIn && (
                                <>
                                  <button className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => console.log('Edit comment 2')}>
                                    <span className="material-symbols-outlined text-sm">edit</span> Edit
                                  </button>
                                  <button className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDeleteComment(2)}>
                                    <span className="material-symbols-outlined text-sm">delete</span> Hapus
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <aside className="flex flex-col gap-8">
              {/* Resources */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 ring-2 ring-primary/5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">folder_zip</span>
                  Bukti &amp; Lampiran
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-red-100 dark:bg-red-900/30 text-red-600 rounded flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined fill-1">picture_as_pdf</span>
                      </div>
                      <div className="flex flex-col overflow-hidden max-w-[140px] sm:max-w-xs">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">ModulAjar_TermosKelas5.pdf</span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase">PDF • 2.4 MB</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">download</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined fill-1">description</span>
                      </div>
                      <div className="flex flex-col overflow-hidden max-w-[140px] sm:max-w-xs">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">Rubrik_Penilaian_PBL.pdf</span>
                        <span className="text-[10px] text-slate-500 font-medium uppercase">PDF • 1.8 MB</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">download</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg border-2 border-primary/10 transition-colors font-bold cursor-pointer">
                  Unduh Semua Lampiran (.zip)
                </button>
              </section>

              {/* Promo Section */}
              <section className="bg-gradient-to-br from-primary to-blue-700 rounded-xl p-6 text-white shadow-lg">
                <h4 className="text-base font-bold mb-2">Tertarik membuat Praktik Terbaik Anda sendiri?</h4>
                <p className="text-xs opacity-90 mb-5">Bagikan inovasi pembelajaran Anda dan jadilah inspirasi bagi sesama pendidik di seluruh Jawa Tengah.</p>
                <Link to="/best-practice/create" className="block text-center w-full bg-white text-primary py-2.5 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm cursor-pointer">
                  Tulis Praktik Baik
                </Link>
              </section>

              {/* Related Practices */}
              <section className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">PRAKTIK TERKAIT LAINNYA</h3>
                <div className="space-y-4">
                  <Link to="/best-practice/2" className="block group">
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-2">
                      Pemanfataan Gamifikasi Quizizz untuk Meningkatkan Motivasi Belajar Matematika
                    </h5>
                    <span className="text-[11px] text-slate-500">Oleh Andi Hermawan, M.Pd.</span>
                  </Link>
                  <Link to="/best-practice/3" className="block group">
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-2">
                      Metode Flipped Classroom dalam Pembelajaran Sejarah di Era Digital
                    </h5>
                    <span className="text-[11px] text-slate-500">Oleh Rina Wijayanti, S.Pd.</span>
                  </Link>
                </div>
              </section>
            </aside>
          </div>
    </div>
  );
}
