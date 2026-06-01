import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'servicos', 'zona-franca', 'equipe', 'sobre', 'contato'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, [location.pathname]);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Need a timeout to allow the DOM to render the home page before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleBlogNavigation = () => {
    navigate('/blog');
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-border shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img 
              src="/icon192_white.png" 
              alt="Logo Mourão" 
              className="w-12 h-12 cursor-pointer" 
              onClick={() => handleNavigation('home')} 
            />
            <h1 className="text-xl font-bold tracking-wide cursor-pointer" onClick={() => handleNavigation('home')}>              
              <span className="text-white">Mourão</span>{' '}
              <span className="text-accent">Consultoria Econômica</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavigation('home')}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/' && activeSection === 'home' ? 'text-accent' : ''}`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/' && activeSection === 'home' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => handleNavigation('servicos')}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/' && activeSection === 'servicos' ? 'text-accent' : ''}`}
            >
              Serviços
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/' && activeSection === 'servicos' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => handleNavigation('zona-franca')}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/' && activeSection === 'zona-franca' ? 'text-accent' : ''}`}
            >
              Zona Franca
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/' && activeSection === 'zona-franca' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => handleNavigation('equipe')}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/' && activeSection === 'equipe' ? 'text-accent' : ''}`}
            >
              Equipe
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/' && activeSection === 'equipe' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => handleNavigation('sobre')}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/' && activeSection === 'sobre' ? 'text-accent' : ''}`}
            >
              Sobre
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/' && activeSection === 'sobre' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={handleBlogNavigation}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/blog' ? 'text-accent' : ''}`}
            >
              Blog
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/blog' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => handleNavigation('contato')}
              className={`text-white hover:text-accent transition-colors relative group font-medium ${location.pathname === '/' && activeSection === 'contato' ? 'text-accent' : ''}`}
            >
              Contato
              <span className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all group-hover:w-full ${location.pathname === '/' && activeSection === 'contato' ? 'w-full' : 'w-0'}`}></span>
            </button>
            <button
              onClick={() => {
                navigate('/portal');
                window.scrollTo(0, 0);
                setIsMenuOpen(false);
              }}
              className="px-5 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-colors"
            >
              Portal
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:text-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-secondary/95 backdrop-blur-md rounded-b-lg border-x border-b border-border mt-2 px-2 pb-4 shadow-xl">
            <button
              onClick={() => handleNavigation('home')}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/' && activeSection === 'home' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('servicos')}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/' && activeSection === 'servicos' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Serviços
            </button>
            <button
              onClick={() => handleNavigation('zona-franca')}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/' && activeSection === 'zona-franca' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Zona Franca
            </button>
            <button
              onClick={() => handleNavigation('equipe')}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/' && activeSection === 'equipe' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Equipe
            </button>
            <button
              onClick={() => handleNavigation('sobre')}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/' && activeSection === 'sobre' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Sobre
            </button>
            <button
              onClick={handleBlogNavigation}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/blog' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Blog
            </button>
            <button
              onClick={() => handleNavigation('contato')}
              className={`block w-full text-left px-4 py-3 rounded-md transition-colors font-medium ${location.pathname === '/' && activeSection === 'contato' ? 'bg-accent/15 text-accent font-semibold' : 'text-white hover:bg-accent/20 hover:text-accent'}`}
            >
              Contato
            </button>
            <button
              onClick={() => {
                navigate('/portal');
                window.scrollTo(0, 0);
                setIsMenuOpen(false);
              }}
              className="block w-full text-center px-4 py-3 mt-2 bg-accent text-primary font-bold rounded-md hover:bg-white transition-colors"
            >
              Acessar Portal
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}