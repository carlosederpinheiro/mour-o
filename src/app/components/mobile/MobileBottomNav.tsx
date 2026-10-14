import { useState, useEffect } from 'react';
import { Home, Briefcase, Building2, MessageCircle, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

export function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const whatsappUrl = `https://wa.me/5592992905623?text=${encodeURIComponent('Olá! Gostaria de conversar com um especialista da Mourão Consultoria Econômica.')}`;

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'servicos', 'zona-franca', 'sobre', 'contato'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNav = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Navegação Rápida Mobile"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary/95 backdrop-blur-xl border-t border-accent/20 px-2 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 1. Início */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'home' ? 'text-accent scale-105' : 'text-white/60 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold tracking-tight">Início</span>
        </button>

        {/* 2. Soluções */}
        <button
          onClick={() => handleNav('servicos')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'servicos' ? 'text-accent scale-105' : 'text-white/60 hover:text-white'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold tracking-tight">Serviços</span>
        </button>

        {/* 3. Zona Franca */}
        <button
          onClick={() => handleNav('zona-franca')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'zona-franca' ? 'text-accent scale-105' : 'text-white/60 hover:text-white'
          }`}
        >
          <Building2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold tracking-tight">ZFM</span>
        </button>

        {/* 4. Sobre Nós */}
        <button
          onClick={() => handleNav('sobre')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
            activeTab === 'sobre' ? 'text-accent scale-105' : 'text-white/60 hover:text-white'
          }`}
        >
          <Info className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-semibold tracking-tight">Sobre</span>
        </button>

        {/* 5. WhatsApp (Destaque Dourado com Ação Instantânea) */}
        <button
          onClick={() => window.open(whatsappUrl, '_blank')}
          className="flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-transform active:scale-95 text-accent"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center shadow-md shadow-accent/30 mb-0.5">
              <MessageCircle className="w-4 h-4 fill-primary stroke-accent" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-[10px] font-bold text-accent tracking-tight">Contato</span>
        </button>

      </div>
    </nav>
  );
}
