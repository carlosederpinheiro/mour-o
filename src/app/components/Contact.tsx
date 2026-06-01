import { useState } from 'react';
import { MapPin, Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    segment: 'Industria',
    challenge: 'ZFM',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8 text-accent" />,
      title: 'Endereço',
      info: 'Rua Jorge Veiga, nº 7, Cj Eldorado',
      subInfo: 'Parque 10 de Novembro, Manaus/AM - CEP: 69050-520',
      onClick: undefined
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: 'Horário de Atendimento',
      info: 'Segunda a Sexta-feira',
      subInfo: '09:00 - 17:00',
      onClick: undefined
    },
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: 'Email',
      info: 'atendimento@mouraoconsultores.com.br',
      subInfo: 'Respondemos em até 24h',
      onClick: () => window.open('mailto:atendimento@mouraoconsultores.com.br')
    },
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: 'WhatsApp',
      info: 'Clique para falar conosco',
      subInfo: 'Atendimento rápido e personalizado',
      onClick: () => window.open('https://wa.me/5592992905623', '_blank')
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular o envio do lead B2B
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Diagnóstico solicitado com sucesso! Nossa equipe entrará em contato em breve.');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        segment: 'Industria',
        challenge: 'ZFM',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="contato" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl mb-4 font-bold text-accent">Entre em Contato</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Estamos prontos para transformar os desafios da sua empresa em soluções econômicas eficientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contactInfo.map((contact, index) => (
            <div
              key={index}
              onClick={contact.onClick}
              className={`bg-secondary border border-border rounded-xl p-8 text-center hover:shadow-2xl transition-all duration-300 ${contact.onClick ? 'cursor-pointer hover:border-accent/30' : ''}`}
            >
              <div className="inline-block p-4 bg-accent/10 rounded-full mb-6 transition-colors">
                {contact.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">{contact.title}</h3>
              <p className="text-secondary-foreground/90 mb-1 break-all sm:break-words">{contact.info}</p>
              <p className="text-sm text-secondary-foreground/70">{contact.subInfo}</p>
            </div>
          ))}
        </div>

        {/* Lead Capture Form & WhatsApp Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-secondary rounded-2xl shadow-xl border border-border overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#002626] to-[#102c37] opacity-50 pointer-events-none"></div>
          
          {/* Form Side */}
          <div className="lg:col-span-7 p-8 md:p-12 relative z-10 border-b lg:border-b-0 lg:border-r border-border">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-left">Solicite um Diagnóstico</h3>
            <p className="text-secondary-foreground/80 mb-8 text-left text-sm sm:text-base">
              Preencha os campos abaixo e um de nossos especialistas tributários e econômicos entrará em contato.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Seu Nome</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">E-mail Corporativo</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors"
                    placeholder="Ex: joao@empresa.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Nome da Empresa</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors"
                    placeholder="Ex: Indústria XYZ"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Telefone Corporativo</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors"
                    placeholder="Ex: (92) 99999-9999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Segmento</label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors"
                  >
                    <option value="Industria">Indústria / Polo Industrial</option>
                    <option value="Comercio">Comércio / Varejo</option>
                    <option value="Servicos">Prestação de Serviços</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Maior Desafio</label>
                  <select
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors"
                  >
                    <option value="ZFM">Incentivos Fiscais (SUFRAMA/ZFM)</option>
                    <option value="BASA">Projetos de Financiamento (BASA/SUDAM)</option>
                    <option value="Tributario">Assessoria e Planejamento Tributário</option>
                    <option value="Coworking">Locação de Espaço / Coworking</option>
                    <option value="Consultoria">Consultoria Econômica Geral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-accent mb-2">Mensagem (Opcional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-primary border border-border rounded-xl text-white outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Descreva brevemente sua necessidade..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-accent text-primary rounded-xl font-bold hover:bg-accent/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 cursor-pointer disabled:opacity-55"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Solicitação de Diagnóstico'}
              </button>
            </form>
          </div>
          
          {/* Quick WhatsApp & Info Side */}
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center items-center text-center relative z-10 bg-primary/20">
            <MessageCircle className="w-16 h-16 mb-4 text-accent animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-4">Contato Imediato</h3>
            <p className="text-white/80 mb-8 max-w-sm text-sm sm:text-base">
              Precisa de ajuda urgente? Fale diretamente com um economista de nossa equipe pelo WhatsApp para um retorno instantâneo.
            </p>
            
            <button
              onClick={() => window.open('https://wa.me/5592992905623', '_blank')}
              className="w-full sm:w-auto px-8 py-4 bg-accent text-primary rounded-xl hover:bg-accent/90 transition-all duration-300 inline-flex items-center justify-center gap-3 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle size={24} />
              Iniciar Chat WhatsApp
            </button>
            
            <div className="mt-8 text-xs text-white/50 space-y-1">
              <p>Mourão Consultoria Econômica Ltda.</p>
              <p>Manaus, Amazonas, Brasil</p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-secondary border border-border rounded-xl p-10 shadow-lg text-center">
          <h3 className="text-2xl mb-4 font-bold text-accent">Espaços Disponíveis para Locação</h3>
          <p className="text-secondary-foreground/90 max-w-3xl mx-auto text-lg">
            Além de nossos serviços de consultoria, oferecemos salas de aula e espaços de coworking modernos e bem equipados. Entre em contato para saber mais sobre disponibilidade e valores.
          </p>
        </div>
      </div>
    </section>
  );
}