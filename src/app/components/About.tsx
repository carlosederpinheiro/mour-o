import { Award, Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export function About() {
  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: 'TOP 10 CORECON/AM',
      description: 'Reconhecida oficialmente como uma das 10 melhores empresas de consultoria econômica do Amazonas nos anos de 2022, 2023 e 2025.',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/62391_588852.png'
    },
    {
      icon: <Target className="w-8 h-8 text-accent" />,
      title: 'Desde 2004',
      description: 'Mais de duas décadas de atuação sólida ajudando indústrias e empresas de diversos setores a crescerem na região amazônica.',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/762200_959241.jpg'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: 'Expertise no Setor Público',
      description: 'Sócios com histórico de atuação em cargos de liderança pública municipal e no Conselho Regional de Economia (CORECON/AM).',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/226358_142612.jpg'
    }
  ];

  const differentials = [
    '20+ anos de experiência consolidada no mercado econômico',
    'TOP 10 consultorias econômicas pelo CORECON/AM (2022, 2023 e 2025)',
    '100% Empresa Amazonense com profundo conhecimento regional',
    'Mais de 300 projetos econômico-tributários elaborados e aprovados',
    'Mais de 25 indústrias implantadas com sucesso no Polo Industrial (PIM)',
    'Passagem consolidada e orientação no relacionamento Governo-Empresa',
    'Foco em segurança jurídica total nos pleitos de benefícios fiscais',
    'Sede moderna equipada com coworking e sala de aula para treinamentos'
  ];

  return (
    <section id="sobre" className="py-24 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl mb-6 font-bold text-accent">Sobre a Mourão Consultoria</h2>
            <p className="text-lg opacity-90 mb-6 font-medium text-white">
              Atuamos no mercado desde 2004 na elaboração de projetos de incentivos fiscais, financiamento bancário e assessoria econômica tributária para Diretorias Executivas na Zona Franca de Manaus.
            </p>
            <p className="opacity-80 mb-6">
              Nossa trajetória é caracterizada pelo profundo conhecimento regulatório e técnico. No setor público, nossa liderança ocupou cargos como a Secretaria Municipal de Administração, Planejamento e Finanças de Parintins (2005-2006) e a Conselharia Titular do CORECON/AM em múltiplos mandatos (2012-2014; 2017-2019).
            </p>
            <p className="opacity-80">
              Ao longo desses anos de dedicação, acumulamos mais de 300 projetos aprovados e fomos responsáveis diretos pela implantação de mais de 25 indústrias no Polo Industrial de Manaus. Garantimos que sua empresa usufrua de todas as vantagens fiscais locais em conformidade absoluta com as legislações municipal, estadual e federal.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-border">
              <img
                src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/822372_511121.jpg"
                alt="Equipe em reunião"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent text-primary p-6 rounded-lg shadow-xl hidden lg:block border border-accent/20">
              <div className="text-4xl font-bold mb-1">300+</div>
              <div className="text-sm font-medium">Projetos Aprovados</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-primary border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {achievement.image ? (
                <>
                  <div className="relative h-68 overflow-hidden bg-black/20">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90"></div>
                    <div className="absolute bottom-4 left-6 bg-accent/10 p-2 rounded-xl backdrop-blur-md border border-accent/20">
                      {achievement.icon}
                    </div>
                  </div>
                  <div className="p-6 pt-4 text-left flex-grow flex flex-col bg-primary">
                    <h3 className="mb-2 text-xl font-semibold text-white">{achievement.title}</h3>
                    <p className="text-sm text-secondary-foreground/80 leading-relaxed">{achievement.description}</p>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center flex-grow flex flex-col justify-center items-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
                    {achievement.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{achievement.title}</h3>
                  <p className="text-sm text-secondary-foreground/80">{achievement.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-primary rounded-xl p-10 border border-border shadow-lg">
          <h3 className="text-2xl mb-8 text-center font-bold text-accent">Nossos Diferenciais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {differentials.map((differential, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="text-secondary-foreground/90">{differential}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}