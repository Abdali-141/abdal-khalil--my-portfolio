import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Work from '../components/Work';
import Process from '../components/Process';
import Stack from '../components/Stack';
import About from '../components/About';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Stack />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
