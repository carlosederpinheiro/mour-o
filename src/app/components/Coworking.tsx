import { Users, BookOpen, MonitorPlay, Wifi, Coffee } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import salinhaRedacaoImg from '../../assets/salinha_redacao.jpeg';
import MouraoFachadaImg from '../../assets/mourao_fachada.jpeg';

export function Coworking() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      title: 'Sala de Aula e Cursos',
      description: 'Espaço projetado para o compartilhamento de conhecimento, treinamentos e workshops.'
    },
    {
      icon: <Users className="w-6 h-6 text-accent" />,
      title: 'Ambiente de Coworking',
      description: 'Estações de trabalho propícias para networking, colaboração e alta produtividade.'
    },
    {
      icon: <MonitorPlay className="w-6 h-6 text-accent" />,
      title: 'Estrutura Completa',
      description: 'Equipamentos modernos e recursos audiovisuais para apresentações de alto nível.'
    },
    {
      icon: <Wifi className="w-6 h-6 text-accent" />,
      title: 'Conforto e Conectividade',
      description: 'Internet de alta velocidade, ambiente climatizado e infraestrutura profissional.'
    }
  ];

  return (
    <section id="coworking" className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-primary/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-accent text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Coffee className="w-4 h-4" /> Nosso Espaço
              </h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Hub de Conhecimento <br/> e Negócios
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Mais do que uma consultoria, oferecemos um ecossistema completo. Nossa sede conta com um moderno <strong>Espaço de Coworking e Sala de Aula</strong>, ideal para a aplicação de cursos, grupos de estudos, treinamentos e fomento ao networking profissional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-primary/60 border border-white/5 p-6 rounded-2xl hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white">{feature.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => window.open('https://wa.me/5592992905623', '_blank')}
                className="px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center gap-3 shadow-lg shadow-accent/20 hover:shadow-accent/40"
              >
                Agendar Utilização do Espaço
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Images Grid */}
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column of Images */}
              <div className="space-y-4 translate-y-8">
                <div className="rounded-2xl overflow-hidden h-64 border border-white/10 shadow-2xl relative group">
                  <ImageWithFallback 
                    src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit/18423895/499611_952364.jpg" 
                    alt="Espaço Coworking" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="rounded-2xl overflow-hidden h-48 border border-white/10 shadow-2xl relative group">
                  <ImageWithFallback 
                    src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1920,f_auto,q_auto/18423895/659698_359379.jpeg" 
                    alt="Networking e Estudos" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              
              {/* Right Column of Images */}
              <div className="space-y-4 -translate-y-4">
                <div className="rounded-2xl overflow-hidden h-48 border border-white/10 shadow-2xl relative group">
                  <ImageWithFallback 
                    src={MouraoFachadaImg} 
                    alt="Sala de Aula e Treinamento" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                {/* Decorative Box */}
                <div className="bg-primary rounded-2xl p-8 border border-accent/20 shadow-2xl flex flex-col justify-center items-center text-center h-64 relative overflow-hidden group hover:border-accent/50 transition-colors duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-primary to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 relative z-10">Comunidade</h4>
                  <p className="text-sm text-white/70 relative z-10">
                    Conecte-se com outros profissionais e expanda sua rede de contatos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
