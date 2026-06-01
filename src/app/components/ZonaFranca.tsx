import { Shield, Percent, TrendingUp, Banknote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ZonaFranca() {
  const benefits = [
    {
      icon: <Percent className="w-8 h-8 text-accent" />,
      image: "https://www.gov.br/suframa/pt-br/assuntos/noticias/suframa-vai-esclarecer-mudancas-nos-projetos-industriais/suframasite.jpg",
      title: 'Projeto SUFRAMA',
      description: 'Elaboração de projetos técnicos e econômicos para implantação de indústrias e concessão de incentivos federais chaves na Superintendência da Zona Franca de Manaus.',
      highlights: ['Isenção ou redução do II (Imposto de Importação)', 'Isenção total do IPI (Imposto sobre Prod. Industrial)', 'Desoneração e redução de PIS/COFINS', 'Aprovação de pleito para até 2 produtos']
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      image: "https://amazonasnews.com.br/wp-content/uploads/2026/01/Sedecti_PCCR-Foto_BrunoLeao-1024x576-1-860x484.jpg",
      title: 'Projeto SEDECTI',
      description: 'Projetos de viabilidade para obtenção e aprovação de incentivos fiscais estaduais junto à Secretaria de Estado do Amazonas (SEDECTI) com segurança jurídica.',
      highlights: ['Redução significativa do ICMS do Livro de Apuração', 'Projetos técnicos e econômicos estruturados', 'Apoio e aprovação oficial junto à SEDECTI', 'Benefício aplicável para até 2 produtos']
    },
    {
      icon: <Banknote className="w-8 h-8 text-accent" />,
      image: "https://amazonasatual.com.br/wp-content/uploads/2024/06/Fabricas.jpeg",
      title: 'Projeto SUDAM e SUDENE',
      description: 'Elaboração de projetos de viabilidade técnica, econômica e financeira para obtenção de benefícios federais de desenvolvimento regional na Amazônia e Nordeste.',
      highlights: ['Redução de 75% do IRPJ (Imposto de Renda P. Jurídica)', 'Reinvestimento de 30% do IRPJ para compra de maquinário', 'Aquisição de novas máquinas e equipamentos industriais', 'Benefício aplicável para até 2 produtos']
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbXBsaWFuY2UlMjBoYW5kc2hha2V8ZW58MXx8fHwxNzc4NjE0ODM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: 'Estudo de Competitividade',
      description: 'Desenvolvimento de Estudos de Competitividade para obtenção de incentivo fiscal estadual adicional concedido pelo Governo do Estado do Amazonas.',
      highlights: ['Isenção de FTI e UEA por 9 exercícios fiscais', 'Economia de 1,5% sobre crédito estímulo de 100% ICMS', 'Economia de 1% sobre valor de Insumos Nacionais', 'Economia de 2% sobre valor de Insumos Importados']
    }
  ];

  return (
    <section id="zona-franca" className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://revistaoe.com.br/wp-content/uploads/2026/04/Sedecti-Importacao-PrimeiroLugar-FotoDivulgacaoChibatao-1-1024x768-1.jpg')] bg-cover bg-center opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4 font-bold text-accent">Zona Franca de Manaus</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Transforme os benefícios da Zona Franca em vantagem competitiva sólida para o seu negócio através da nossa metodologia comprovada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl overflow-hidden shadow-xl border border-accent/10 flex flex-col group hover:border-accent/40 transition-colors duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <ImageWithFallback
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-primary p-3 rounded-xl shadow-lg border border-accent/20 backdrop-blur-md">
                  {benefit.icon}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-white min-h-[4rem]">{benefit.title}</h3>
                <p className="text-white/80 leading-relaxed mb-8 flex-grow">
                  {benefit.description}
                </p>
                
                <div className="bg-primary/40 rounded-xl p-5 border border-white/5">
                  <h4 className="text-accent text-sm font-bold mb-2 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Diferenciais e Benefícios
                  </h4>
                  <ul className="space-y-3">
                    {benefit.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                        <div className="bg-accent/10 p-1 rounded-full mt-0.5">
                          <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-secondary border border-accent/20 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Pronto para aproveitar os benefícios?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Nossa equipe de especialistas está preparada para estruturar o seu projeto e ajudar sua empresa a maximizar todos os incentivos fiscais da Zona Franca de Manaus.
            </p>
            <button
              onClick={() => window.open('https://wa.me/5592992905623', '_blank')}
              className="px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 inline-flex items-center gap-3 shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1"
            >
              Falar com um Consultor Especialista
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
