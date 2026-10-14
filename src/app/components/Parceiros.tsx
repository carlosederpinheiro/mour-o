import coimpaLogo from '../../assets/logos/coimpa.png';
import beiraaltaLogo from '../../assets/logos/beiraalta.png';
import eternalLogo from '../../assets/logos/eternal.webp';
import metalFinoLogo from '../../assets/logos/metalfino.png';
import tgfoodsLogo from '../../assets/logos/tgfoods.png';
import naturalsaboresLogo from '../../assets/logos/naturalsabores.png';
import fruitsLogo from '../../assets/logos/fruits.png';
import cplLogo from '../../assets/logos/cpl.png';
import astemoLogo from '../../assets/logos/astemo.png';
import ardoLogo from '../../assets/logos/ardo.png';
import gasesLogo from '../../assets/logos/gases.png';
import ddwLogo from '../../assets/logos/ddw.png';
import adataLogo from '../../assets/logos/adata.png';
import transireLogo from '../../assets/logos/transire.png';
import tectoyLogo from '../../assets/logos/tectoy.png';
import cibeaLogo from '../../assets/logos/cibea.png';
import leleLogo from '../../assets/logos/lele.jpeg';
import tutiLogo from '../../assets/logos/tutiplast.png';
import densoLogo from '../../assets/logos/denso.jpg';
import itamLogo from '../../assets/logos/itam.jpeg';
import geraLogo from '../../assets/logos/gera.png';
import mdgLogo from '../../assets/logos/mdg.png';
import converLogo from '../../assets/logos/conver.webp';
import tpvLogo from '../../assets/logos/tpv.png';
import mitsubaLogo from '../../assets/logos/mitsuba.svg';
import compolLogo from '../../assets/logos/compol.png';

export function Parceiros() {
  // Aqui você pode adicionar as URLs (ou caminhos locais importados) para as imagens PNG dos seus parceiros
  const partners = [
    { name: 'Coimpa', logo: coimpaLogo },
    { name: 'Beira Alta', logo: beiraaltaLogo },
    { name: 'Eternal', logo: eternalLogo },
    { name: 'MetalFino', logo: metalFinoLogo },
    { name: 'TG Foods', logo: tgfoodsLogo },
    { name: 'Natural Sabores', logo: naturalsaboresLogo },
    { name: 'Fruits', logo: fruitsLogo },
    { name: 'CPL', logo: cplLogo },
    { name: 'Astemo', logo: astemoLogo },
    { name: 'Ardo', logo: ardoLogo },
    { name: 'Gases', logo: gasesLogo },
    { name: 'DDW', logo: ddwLogo },
    { name: 'Adata', logo: adataLogo },
    { name: 'Transire', logo: transireLogo },
    { name: 'Tectoy', logo: tectoyLogo },
    { name: 'Cibea', logo: cibeaLogo },
    { name: 'Lele', logo: leleLogo },
    { name: 'Tuti', logo: tutiLogo },
    { name: 'Denso', logo: densoLogo },
    { name: 'Itam', logo: itamLogo },
    { name: 'Gera', logo: geraLogo },
    {name: 'MDG', logo: mdgLogo },
    {name: 'Conver', logo: converLogo },
    {name: 'TPV', logo: tpvLogo },
    {name: 'Mitsuba', logo: mitsubaLogo },
    {name: 'Compol', logo: compolLogo }
  ];


  return (
    <section id="parceiros" className="py-16 bg-primary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-accent mb-4">Nossos Parceiros</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Empresas e instituições que confiam em nosso trabalho e caminham lado a lado com a Mourão Consultoria.
          </p>
        </div>
        
        {/* VERSÃO DESKTOP (100% INTACTA) */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="w-full max-w-[160px] h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              {partner.logo ? (
                <div className="w-full h-full bg-white rounded-lg p-4 flex items-center justify-center shadow-sm">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-white/5 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-xs text-white/40">
                  Sua logo aqui
                </div>
              )}
            </div>
          ))}
        </div>

        {/* VERSÃO MOBILE: Marquee Ticker Infinito (2 Faixas Contínuas) */}
        <div className="md:hidden relative overflow-hidden py-2 -mx-4">
          {/* Efeito de fade nas bordas */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-primary to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-primary to-transparent z-10"></div>

          {/* Linha 1 */}
          <div className="animate-marquee-infinite flex gap-3 mb-3">
            {[...partners.slice(0, 13), ...partners.slice(0, 13)].map((partner, index) => (
              <div 
                key={index}
                className="w-28 h-16 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-sm shrink-0"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Linha 2 (sentido reverso) */}
          <div className="animate-marquee-infinite-reverse flex gap-3">
            {[...partners.slice(13), ...partners.slice(13)].map((partner, index) => (
              <div 
                key={index}
                className="w-28 h-16 bg-white rounded-xl p-2.5 flex items-center justify-center shadow-sm shrink-0"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}