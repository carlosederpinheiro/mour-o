import { Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export function Team() {
  const teamMembers = [
    {
      name: 'Bianca Mourão',
      role: 'Diretora Operacional',
      description: 'Bacharel em Economia pela Universidade Federal do Amazonas, com pós-Graduação em Direito Tributário e Contabilidade pela IPOG e Mestranda pelo Instituto Brasileiro de Ensino, Desenvolvimento e Pesquisa (IDP).',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/37289_518571.jpg'
    },
    {
      name: 'Assis Mourão',
      role: 'Consultor Sênior',
      description: 'Graduado em Ciências Econômicas pela Universidade Candido Mendes do Rio de Janeiro (1968) e Mestrado em Desenvolvimento Regional na área de concentração em Desenvolvimento Regional na Amazônia.',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/145096_771248.jpg'
    },
    {
      name: 'Assis Mourão Junior',
      role: 'Consultor Sênior',
      description: 'Graduado em Economia pelo Centro Universitário do Norte, Mestre em Engenharia de Processos pela Universidade Federal do Pará (UFPA) e Doutorando em Administração pela Pontifícia Universidade Católica do Paraná (PUC-PR).',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/224862_69242.jpg'
    },
    {
      name: 'Paulo Mourão',
      role: 'Associado Junior',
      description: 'Estudante de Economia pela X',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/582091_127750.jpg'
    },
    {
      name: 'Igo Viana',
      role: 'Gerente de Projetos Industriais/Tributários',
      description: 'Economista pela Universidade Federal do Amazonas (UFAM), especializado em incentisvos fiscais na ZFM, com mais de 10 anos de experiência e mais de 200 projetos aprovados entre os órgãos Sudam, Sedecti e Suframa.',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/889188_109413.jpg'
    },
    {
      name: 'Lucimere Amorim',
      role: 'Gerente Fiscal Contábil',
      description: 'Apoio técnico e administrativo aos projetos da consultoria',
      image: 'https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/18423895/960900_252755.jpg'
    },
    {
      name: 'Carlos Eder',
      role: 'Arquiteto de Sistemas',
      description: 'Estudante de Engenharia da Computação pela Faculdade Matias Machline',
      image: ''
    },
    {
      name: 'Paula Marinho',
      role: 'Associada Junior',
      description: 'Estudante de Economia pela X',
      image: ''
    },
    {
      name: 'Scarllet',
      role: 'Estagiária de Contabilidade',
      description: 'Estudante de Ciências Contábeis pela X',
      image: ''
    }
  ];

  return (
    <section id="equipe" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4 font-bold text-accent">Nossa Equipe</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Profissionais especializados dedicados ao sucesso do seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col border border-border"
            >
              <div className="h-[320px] w-full relative overflow-hidden bg-primary/40 flex items-center justify-center">
                {member.image ? (
                  <ImageWithFallback 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-accent/15 border-2 border-accent/30 flex items-center justify-center text-accent text-3xl font-extrabold shadow-inner select-none transition-transform duration-500 group-hover:scale-110">
                    {getInitials(member.name)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-80 pointer-events-none"></div>
              </div>
              <div className="p-6 relative -mt-16 flex-grow flex flex-col">
                <div className="mb-4 min-h-[5.5rem]">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30">
                    {member.role}
                  </div>
                </div>
                <p className="text-secondary-foreground/80 text-sm">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-secondary border border-border rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl mb-4 font-semibold text-white">Experiência e Dedicação</h3>
          <p className="text-secondary-foreground/90 max-w-2xl mx-auto">
            Nossa equipe multidisciplinar combina anos de experiência no setor público e privado para oferecer soluções personalizadas e resultados mensuráveis para cada cliente.
          </p>
        </div>
      </div>
    </section>
  );
}