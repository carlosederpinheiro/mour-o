import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Cursos } from '../components/Cursos';
import { ZonaFranca } from '../components/ZonaFranca';
import { Coworking } from '../components/Coworking';
import { Team } from '../components/Team';
import { Parceiros } from '../components/Parceiros';
import { About } from '../components/About';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Cursos />
      <ZonaFranca />
      <Coworking />
      <Team />
      <Parceiros />
      <About />
      <Contact />
    </>
  );
}