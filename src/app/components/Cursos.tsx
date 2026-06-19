import { useNavigate } from 'react-router';
import { BookOpen, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

export function Cursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<any[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data } = await supabase.from('portal_courses').select('*').eq('status', 'Aberto');
      if (data) setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <section id="cursos" className="py-20 bg-primary relative overflow-hidden text-white">
      {/* Background Decorativo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6 border border-accent/20">
            <BookOpen size={18} />
            <span>Mourão Academy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Especialize-se com quem <span className="text-accent">faz acontecer</span>
          </h1>
          <p className="text-lg text-gray-400">
            Aprenda na prática com os mesmos consultores que estruturam os projetos das maiores indústrias da Zona Franca de Manaus.
          </p>
        </div>

        {/* Lista de Cursos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {cursos.map(curso => (
            <div key={curso.id} className="bg-secondary rounded-3xl border border-border overflow-hidden flex flex-col hover:border-accent/50 transition-colors group">
              <div 
                className="h-48 p-8 flex flex-col justify-end relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${curso.imagem}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30"></div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 w-max relative z-10">
                  TURMA ABERTA
                </span>
                <h2 className="text-2xl font-bold text-white relative z-10 drop-shadow-lg">{curso.titulo}</h2>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-gray-300 mb-6 flex-1">
                  {curso.descricao}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar className="text-accent flex-shrink-0" size={18} />
                    <span>{curso.datas}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Clock className="text-accent flex-shrink-0" size={18} />
                    <span>{curso.horario}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <MapPin className="text-accent flex-shrink-0" size={18} />
                    <span>{curso.local}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Investimento</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-white">R$ {Number(curso.valor || 0).toFixed(2).replace('.', ',')}</p>
                    </div>
                    <p className="text-xs text-accent mt-1 font-medium">{curso.desconto}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigate('/cadastro');
                      window.scrollTo(0, 0);
                    }}
                    className="px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    Matricular <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
