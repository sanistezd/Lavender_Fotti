import Hero from '@/components/Hero/Hero';
import Services from '@/components/Services/Services';
import HowItWorks from '@/components/HowItWorks/HowItWorks';
import Portfolio from '@/components/Portfolio/Portfolio';
import Advantages from '@/components/Advantages/Advantages';
import Reviews from '@/components/Reviews/Reviews';
import FAQ from '@/components/FAQ/FAQ';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <HowItWorks />
      <Portfolio />
      <Advantages />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}
