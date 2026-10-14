import { MapPin, Clock, Mail, MessageCircle, Instagram, ExternalLink, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import mouraoFachadaImg from '../../assets/mourao_fachada.jpeg';

export function Contact() {
  const whatsappUrl = `https://wa.me/5592992905623?text=${encodeURIComponent('Olá! Gostaria de conversar com um especialista da Mourão Consultoria Econômica.')}`;
  const instagramUrl = 'https://www.instagram.com/mouraoconsultoriaeconomica/';
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+Jorge+Veiga+7+Parque+10+de+Novembro+Manaus+AM';

  return (
    <section id="contato" className="py-24 bg-primary text-primary-foreground relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-bold uppercase tracking-wider mb-2">Canais de Atendimento</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Entre em Contato</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Estamos prontos para analisar o cenário da sua empresa e propor as melhores soluções econômicas e tributárias.
          </p>
        </div>

        {/* Grid Principal - 2 Colunas com Alturas 100% Casadas */}
        {/* VERSÃO DESKTOP (100% INTACTA) */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Coluna 1: 4 Cards Ampliados com flex-1 (Mesma Altura Entre Si e com o Card da Direita) */}
          <div className="flex flex-col gap-4 h-full">
            
            {/* 1. WhatsApp */}
            <div className="bg-secondary rounded-2xl p-6 border border-border flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0 border border-border">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-bold text-white">WhatsApp</h3>
                    <span className="text-xs text-white/50 font-normal">• Resposta rápida</span>
                  </div>
                  <p className="text-accent font-mono font-bold text-base mb-1">(92) 99290-5623</p>
                  <p className="text-white/70 text-xs">Atendimento direto sobre incentivos fiscais e consultoria.</p>
                </div>
              </div>
              <button
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="w-full sm:w-auto px-5 py-2.5 bg-accent text-primary text-sm font-bold rounded-xl hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                Iniciar Chat
                <ArrowRight size={16} />
              </button>
            </div>

            {/* 2. E-mail */}
            <div className="bg-secondary rounded-2xl p-6 border border-border flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0 border border-border">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-bold text-white">E-mail Institucional</h3>
                    <span className="text-xs text-white/50 font-normal">• Retorno em até 24h</span>
                  </div>
                  <p className="text-accent font-semibold text-sm sm:text-base select-all mb-1">
                    atendimento@mouraoconsultores.com.br
                  </p>
                  <p className="text-white/70 text-xs">Envio de editais, pleitos formais e propostas.</p>
                </div>
              </div>
              <button
                onClick={() => window.open('mailto:atendimento@mouraoconsultores.com.br')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border hover:border-accent hover:text-accent text-white text-sm font-semibold transition-colors shrink-0 cursor-pointer text-center"
              >
                Enviar E-mail
              </button>
            </div>

            {/* 3. Instagram */}
            <div className="bg-secondary rounded-2xl p-6 border border-border flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0 border border-border">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-lg font-bold text-white">Instagram</h3>
                    <span className="text-xs text-white/50 font-normal">• Notícias e ZFM</span>
                  </div>
                  <p className="text-accent font-medium text-sm sm:text-base mb-1">
                    @mouraoconsultoriaeconomica
                  </p>
                  <p className="text-white/70 text-xs">Acompanhe novidades, eventos e o ecossistema da Amazônia.</p>
                </div>
              </div>
              <button
                onClick={() => window.open(instagramUrl, '_blank')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border hover:border-accent hover:text-accent text-white text-sm font-semibold transition-colors shrink-0 cursor-pointer text-center inline-flex items-center justify-center gap-2"
              >
                Seguir Perfil
                <ExternalLink size={15} />
              </button>
            </div>

            {/* 4. Horário de Funcionamento */}
            <div className="bg-secondary rounded-2xl p-6 border border-border flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0 border border-border">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-0.5">Horário de Funcionamento</h4>
                  <p className="text-accent font-semibold text-sm sm:text-base mb-1">
                    Segunda a Sexta-feira
                  </p>
                  <p className="text-white/70 text-xs">Atendimento presencial e remoto das 09:00 às 17:00.</p>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-primary/60 border border-border text-xs text-white/80 font-medium shrink-0 text-center">
                Horário de Manaus (UTC-4)
              </div>
            </div>

          </div>

          {/* Coluna 2: Bloco da Sede com Altura Alinhada */}
          <div className="bg-secondary rounded-2xl overflow-hidden border border-border flex flex-col justify-between h-full">
            
            {/* Foto da Fachada */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
              <ImageWithFallback
                src={mouraoFachadaImg}
                alt="Sede Mourão Consultoria Econômica"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Conteúdo da Sede */}
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Visite Nossa Sede</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Estrutura corporativa no Conjunto Eldorado, preparada para reuniões executivas, alinhamentos tributários e atendimento presencial com nossos consultores.
                </p>

                <div className="bg-primary/40 p-4 rounded-xl border border-border mb-6">
                  <div className="flex items-start gap-3.5 text-sm">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Rua Jorge Veiga, nº 7 — Conjunto Eldorado</p>
                      <p className="text-white/70 text-xs sm:text-sm mt-0.5">Bairro Parque 10 de Novembro</p>
                      <p className="text-white/50 text-xs mt-0.5">Manaus/AM — CEP: 69050-520</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => window.open(googleMapsUrl, '_blank')}
                className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-accent hover:text-primary text-white text-sm font-bold border border-border hover:border-accent transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ExternalLink size={16} />
                Abrir no Google Maps
              </button>
            </div>

          </div>

        </div>

        {/* VERSÃO MOBILE: Hub de Contato Rápido de 1 Toque */}
        <div className="md:hidden space-y-4">
          
          {/* Card WhatsApp - Ação Principal em Destaque */}
          <div 
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="bg-accent text-primary p-5 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center shrink-0 shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block opacity-90">Atendimento Imediato</span>
                <span className="text-lg font-bold font-mono leading-none">(92) 99290-5623</span>
                <span className="text-xs block opacity-85 mt-0.5">Toque para abrir no WhatsApp</span>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 shrink-0" />
          </div>

          {/* Card E-mail */}
          <div 
            onClick={() => window.open('mailto:atendimento@mouraoconsultores.com.br')}
            className="bg-secondary border border-border p-4 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0 border border-border">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-white/50 block font-medium">E-mail Institucional</span>
                <span className="text-xs font-semibold text-white break-all">atendimento@mouraoconsultores.com.br</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-accent shrink-0" />
          </div>

          {/* Card Instagram */}
          <div 
            onClick={() => window.open(instagramUrl, '_blank')}
            className="bg-secondary border border-border p-4 rounded-2xl flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-accent shrink-0 border border-border">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-white/50 block font-medium">Instagram Oficial</span>
                <span className="text-sm font-semibold text-white">@mouraoconsultoriaeconomica</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-accent shrink-0" />
          </div>

          {/* Card Sede & Rota GPS */}
          <div className="bg-secondary border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-40 w-full overflow-hidden">
              <ImageWithFallback
                src={mouraoFachadaImg}
                alt="Sede Mourão Consultoria"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 bg-primary/90 px-2.5 py-1 rounded-lg border border-accent/30 text-[10px] font-bold text-accent uppercase">
                Sede Própria
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-2.5 mb-3 text-xs text-white/90">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Rua Jorge Veiga, nº 7 — Conjunto Eldorado</p>
                  <p className="text-white/70">Parque 10 de Novembro, Manaus/AM</p>
                </div>
              </div>
              <button
                onClick={() => window.open(googleMapsUrl, '_blank')}
                className="w-full py-3 bg-primary hover:bg-accent hover:text-primary text-white text-xs font-bold rounded-xl border border-border transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink size={14} />
                Como Chegar (Google Maps / Waze)
              </button>
            </div>
          </div>

          {/* Horário */}
          <div className="bg-secondary/60 border border-white/5 p-3.5 rounded-xl flex items-center gap-3 text-xs text-white/70">
            <Clock className="w-4 h-4 text-accent shrink-0" />
            <span>Seg a Sex: 09:00 às 17:00 (Horário de Manaus)</span>
          </div>

        </div>

      </div>
    </section>
  );
}