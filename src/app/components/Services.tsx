import { TrendingUp, FileText, Building2, Briefcase, Award, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from './figma/ImageWithFallback';

const NextArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary hover:bg-accent text-accent hover:text-primary rounded-full flex items-center justify-center border border-accent/30 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
      aria-label="Próximo Serviço"
    >
      <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
};

const PrevArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary hover:bg-accent text-accent hover:text-primary rounded-full flex items-center justify-center border border-accent/30 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
      aria-label="Serviço Anterior"
    >
      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
    </button>
  );
};

export function Services() {
  const services = [
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: 'Estudos de Viabilidade & PPB',
      description: 'Elaboração de estudos econômicos para implantação de plantas fabris na Zona Franca de Manaus e fixação/alteração de Processo Produtivo Básico (PPB) junto a órgãos competentes.',
      features: ['Estudo de viabilidade de implantação', 'Fixação e alteração de PPB', 'Análise comparativa de tributação', 'Aprovação de portarias interministeriais'],
      image: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/503030_235359.jpg"
    },
    {
      icon: <Building2 className="w-8 h-8 text-accent" />,
      title: 'Incentivos Estaduais e Federais',
      description: 'Elaboração de projetos e acompanhamento completo de pleitos para viabilização e concessão de incentivos fiscais da ZFM junto a superintendências e governos.',
      features: ['Projeto SUFRAMA (II, IPI, PIS/COFINS)', 'Projeto SEDECTI (Redução de ICMS)', 'Projetos SUDAM e SUDENE (Redução de 75% IRPJ)', 'Reinvestimento de 30% do IRPJ'],
      image: "https://www.gov.br/suframa/pt-br/assuntos/noticias/suframa-vai-esclarecer-mudancas-nos-projetos-industriais/suframasite.jpg"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-accent" />,
      title: 'Consultoria Econômica Permanente',
      description: 'Suporte contínuo para manter sua empresa em conformidade com as legislações vigentes, prevenção de riscos e acompanhamento sistemático de pleitos.',
      features: ['Alterações cadastrais e insumos', 'Elaboração de pareceres e laudos', 'Obrigações acessórias (RDAP, RADI, CEIPIM, SIAV)', 'Representação em reuniões e vistorias'],
      image: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/315676_173733.jpeg"
    },
    {
      icon: <FileText className="w-8 h-8 text-accent" />,
      title: 'Auditoria e Consultoria Contábil',
      description: 'Garantimos a conformidade com as normas regulatórias na escrituração, apuração e conciliação de tributos atrelados aos incentivos da Zona Franca de Manaus.',
      features: ['Escrituração contábil para indústrias', 'Apuração de tributos incentivados', 'Suporte no atendimento a fiscalizações', 'Conciliação e recuperação de créditos'],
      image: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/230524_268667.jpg"
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: 'Projetos de PD&I e Lei de Informática',
      description: 'Ideação, assessoria de conformidade e validação de elegibilidade de dispêndios para projetos de Pesquisa, Desenvolvimento e Inovação na Amazônia.',
      features: ['Criação e validação de projetos PD&I', 'Análise de elegibilidade de gastos', 'Adequação às diretrizes SUFRAMA/CAPDA', 'Cooperação com ICTs e fundações de apoio'],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlY2hub2xvZ3klMjByZXNlYXJjaHxlbnwxfHx8fDE3Nzg2MTQ4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-accent" />,
      title: 'Cursos e Treinamentos Fiscais',
      description: 'Capacitações voltadas para as rotinas corporativas fiscais e administrativas na Zona Franca, preparando profissionais para relacionamento e pleitos em órgãos regionais.',
      features: ['Treinamentos em incentivos fiscais ZFM', 'Curso de parametrização de insumos e NCMs', 'Capacitação em processos SUFRAMA/SEDECTI', 'Workshop prático em conformidade regulatória'],
      image: "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1920,f_auto,q_auto/18423895/659698_359379.jpeg"
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section id="servicos" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-2">Nossas Soluções</h2>
          <h3 className="text-3xl sm:text-5xl font-bold text-white mb-6">Expertise que Impulsiona</h3>
          <p className="text-lg max-w-2xl mx-auto text-white/80">
            Conheça nossos serviços especializados em consultoria econômica e assessoria tributária para alavancar a competitividade da sua indústria.
          </p>
        </div>

        <div className="mx-auto slider-container pb-12">
          <style>{`
            .slider-container .slick-dots {
              bottom: -20px;
            }
            .slider-container .slick-dots li button:before {
              color: var(--accent);
              opacity: 0.3;
              font-size: 10px;
              transition: all 0.3s ease;
            }
            .slider-container .slick-dots li.slick-active button:before {
              color: var(--accent);
              opacity: 1;
              transform: scale(1.3);
            }
            .slider-container .slick-slide > div {
              height: 100%;
            }
            .slider-container .slick-track {
              display: flex;
            }
            .slider-container .slick-slide {
              float: none;
              height: auto;
            }
          `}</style>
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index} className="outline-none h-full">
                <div className="bg-secondary rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row border border-border group mx-4 lg:mx-8 my-4 h-full">
                  
                  {/* Lado Esquerdo - Imagem */}
                  <div className="lg:w-2/5 relative h-72 lg:h-auto overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-secondary"></div>
                  </div>
                  
                  {/* Lado Direito - Conteúdo */}
                  <div className="lg:w-3/5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-secondary relative grow">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6 relative z-10">
                      <div className="bg-accent/10 p-4 rounded-2xl border border-accent/20 w-fit shrink-0">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-secondary-foreground/80 mb-8 leading-relaxed relative z-10">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 relative z-10">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-primary/30 p-3 rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
                          <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-sm text-white/90 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="relative z-10 pt-6 border-t border-border">
                      <button
                        onClick={() => window.open(`https://wa.me/5592992905623?text=${encodeURIComponent('Olá, gostaria de saber mais sobre o serviço de ' + service.title)}`, '_blank')}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 group/btn"
                      >
                        Falar com Especialista
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}