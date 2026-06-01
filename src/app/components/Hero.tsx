import { ArrowRight, MessageCircle } from 'lucide-react';
import fachadaImg from '../../assets/mourao_fachada.jpeg';

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5592992905623', '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002626] via-[#102c37] to-[#002626] text-white pt-16">
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${fachadaImg})` }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Maximizamos a rentabilidade e a segurança tributária da sua empresa
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Especialistas em consultoria econômica, assessoria tributária e viabilização de incentivos fiscais na Zona Franca de Manaus com foco em conformidade e alta performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection('servicos')}
              className="group px-8 py-4 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Conheça nossos serviços
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-primary transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Fale conosco
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-semibold mb-2">20+</div>
              <div className="text-white/80">Anos de experiência</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-semibold mb-2">TOP 10</div>
              <div className="text-white/80">CORECON/AM 2022, 2023 e 2025</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-semibold mb-2">300+</div>
              <div className="text-white/80">Projetos Aprovados</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
