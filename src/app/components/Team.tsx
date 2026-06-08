import { Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import paula from '../../assets/equipe/paula.png';
import carlos from '../../assets/equipe/carlos.png';
import scarllet from '../../assets/equipe/scarllet.png';
import bianca from '../../assets/equipe/bianca.png';
import mourao from '../../assets/equipe/mourao.png';
import mouraojr from '../../assets/equipe/mouraojr.png';
import igo from '../../assets/equipe/igo.png';
import meire from '../../assets/equipe/meire.png';
import paulo from '../../assets/equipe/paulo.png';



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
      image: bianca
    },
    {
      name: 'Assis Mourão',
      role: 'Consultor Sênior',
      description: 'Graduado em Ciências Econômicas pela Universidade Candido Mendes do Rio de Janeiro (1968) e Mestrado em Desenvolvimento Regional na área de concentração em Desenvolvimento Regional na Amazônia.',
      image: mourao
    },
    {
      name: 'Assis Mourão Junior',
      role: 'Consultor Sênior',
      description: 'Graduado em Economia pelo Centro Universitário do Norte, Mestre em Engenharia de Processos pela Universidade Federal do Pará (UFPA) e Doutorando em Administração pela Pontifícia Universidade Católica do Paraná (PUC-PR).',
      image: mouraojr
    },    
    {
      name: 'Igo Viana',
      role: 'Gerente de Projetos Industriais/Tributários',
      description: 'Economista pela Universidade Federal do Amazonas (UFAM), especializado em incentisvos fiscais na ZFM, com mais de 10 anos de experiência e mais de 200 projetos aprovados entre os órgãos Sudam, Sedecti e Suframa.',
      image: igo
    },
    {
      name: 'Lucimere Amorim',
      role: 'Gerente Fiscal Contábil',
      description: 'Apoio técnico e administrativo aos projetos da consultoria',
      image: meire
    },
    {
      name: 'Carlos Eder',
      role: 'Arquiteto de Sistemas',
      description: 'Técnico pela Fundação Matias Machline, Licenciando em Letras, Língua e Literatura Portuguesa pela Universidade Federal do Amazonas e Bacharelando em Engenharia da Computação pela Faculdade Matias Machline.',
      image: carlos
    },
    {
      name: 'Paulo Mourão',
      role: 'Associado Junior',
      description: 'Bacharelando em Economia pela Universidade Estácio de Sá.',
      image: paulo
    },
    {
      name: 'Paula Marinho',
      role: 'Associada Junior',
      description: 'Bacharelanda em Economia pela Universidade Estácio de Sá.',
      image: paula
    },
    {
      name: 'Scarlett Silva',
      role: 'Estagiária de Contabilidade',
      description: 'Bacharelanda em Contabilidade pela Universidade Nilton Lins.',
      image: scarllet
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
                <div className="mb-3 flex flex-col items-start gap-1">
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <div className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30 mt-1">
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