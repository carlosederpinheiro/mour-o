import { useNavigate } from 'react-router';
import { Shield, ArrowRight, LayoutDashboard, FileText, CheckSquare, Bell } from 'lucide-react';

export function PortalCallout() {
  const navigate = useNavigate();

  const handlePortalClick = () => {
    navigate('/portal');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden border-t border-b border-border">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 text-accent rounded-full text-xs font-semibold border border-accent/20">
              <Shield className="w-3.5 h-3.5" /> Diferencial Tecnológico Mourão
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
              Seus projetos e relatórios fiscais em tempo real
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed">
              Trazemos transparência total para a consultoria econômica tradicional. Através do nosso **Portal do Cliente exclusivo**, sua empresa acompanha o andamento de cada laudo SUFRAMA, projeto BASA e auditoria tributária.
            </p>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start gap-3">
                <div className="bg-accent/10 p-1.5 rounded-lg mt-0.5 border border-accent/20">
                  <LayoutDashboard className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Dashboard de KPIs Fiscais</h4>
                  <p className="text-sm text-white/70">Monitore sua economia tributária e o status dos incentivos da Zona Franca.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-accent/10 p-1.5 rounded-lg mt-0.5 border border-accent/20">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Repositório Seguro de Documentos</h4>
                  <p className="text-sm text-white/70">Acesse laudos, pareceres fiscais e relatórios gerenciais a qualquer momento.</p>
                </div>
              </li>
            </ul>

            <div className="pt-6">
              <button
                onClick={handlePortalClick}
                className="group px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 flex items-center gap-3 shadow-lg shadow-accent/10 hover:shadow-xl cursor-pointer"
              >
                Conhecer o Portal do Cliente
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>

          {/* Interactive Mockup Layout */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none bg-[#102c37]/80 rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl backdrop-blur-md">
              {/* Window Controls */}
              <div className="flex items-center gap-1.5 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                <div className="ml-4 text-xs text-white/40 font-mono">portal.mouraoconsultoria.com</div>
              </div>

              {/* Mock Dashboard UI */}
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex justify-between items-center bg-primary/40 rounded-xl p-4 border border-white/5">
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Empresa Conectada</p>
                    <p className="text-sm font-bold text-white">Indústria Eletroeletrônica S.A.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs text-white/60">Acesso Ativo</span>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/40 rounded-xl p-3 border border-white/5 text-left">
                    <p className="text-xs text-white/50">Economia Acumulada</p>
                    <p className="text-lg font-bold text-accent">R$ 2.4M</p>
                  </div>
                  <div className="bg-primary/40 rounded-xl p-3 border border-white/5 text-left">
                    <p className="text-xs text-white/50">Projetos SUFRAMA</p>
                    <p className="text-lg font-bold text-white">4 Ativos</p>
                  </div>
                </div>

                {/* Simulated Chart Container */}
                <div className="bg-primary/40 rounded-xl p-4 border border-white/5 text-left">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-semibold text-white">Evolução Faturamento Incentivado</p>
                    <span className="text-[10px] text-accent font-bold font-mono">+18.4%</span>
                  </div>
                  {/* Decorative chart SVG */}
                  <div className="h-24 w-full flex items-end gap-1">
                    <div className="w-full bg-accent/20 rounded-t h-[40%] transition-all hover:bg-accent/40"></div>
                    <div className="w-full bg-accent/20 rounded-t h-[60%] transition-all hover:bg-accent/40"></div>
                    <div className="w-full bg-accent/20 rounded-t h-[50%] transition-all hover:bg-accent/40"></div>
                    <div className="w-full bg-accent/20 rounded-t h-[80%] transition-all hover:bg-accent/40"></div>
                    <div className="w-full bg-accent/20 rounded-t h-[70%] transition-all hover:bg-accent/40"></div>
                    <div className="w-full bg-accent rounded-t h-[95%]"></div>
                  </div>
                </div>

                {/* Active processes list */}
                <div className="bg-primary/40 rounded-xl p-4 border border-white/5 text-left space-y-2.5">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-white">Status de Processos Fiscais</p>
                    <Bell className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                    <span className="text-white/80">Homologação Suframa Polo II</span>
                    <span className="px-2 py-0.5 bg-accent/15 text-accent rounded-full font-bold">Em Análise</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Recuperação ICMS Crédito Acumulado</span>
                    <span className="px-2 py-0.5 bg-green-500/15 text-green-400 rounded-full font-bold">Concluído</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual glow element behind mockup */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-[#102c37] rounded-2xl opacity-10 blur-xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
