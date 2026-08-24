import HeroSection from '../components/HeroSection'
import WebinarSection from '../components/WebinarSection'
import BestPracticeSection from '../components/BestPracticeSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col flex-1 w-full w-full max-w-full">
        <HeroSection />
        <WebinarSection />
        <BestPracticeSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
