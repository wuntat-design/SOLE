export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 lg:px-40 py-16">
      <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
        {/* Abstract Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-6">
            Siap untuk Mulai Berbagi &amp; Belajar?
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Bergabunglah dengan ribuan pendidik di Jawa Tengah untuk terus meningkatkan kualitas pendidikan di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              id="cta-register-btn"
              className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              Daftar Sekarang
            </button>
            <button
              id="cta-contact-btn"
              className="bg-primary/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/30 transition-all cursor-pointer"
            >
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
