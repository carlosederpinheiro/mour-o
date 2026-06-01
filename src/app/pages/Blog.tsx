import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Blog() {
  const posts = [
    {
      id: 1,
      title: 'Perspectivas Econômicas para o Próximo Trimestre e o Impacto na Zona Franca',
      excerpt: 'Uma análise detalhada das tendências do mercado e como as recentes decisões governamentais afetam os incentivos da ZFM.',
      author: 'Dr. Roberto Mourão',
      date: '12 Maio 2026',
      category: 'Economia',
      image: 'https://images.unsplash.com/photo-1712640183722-ec59693f7c82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29ub215JTIwY2hhcnQlMjBvZmZpY2V8ZW58MXx8fHwxNzc4Njk2MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Como Estruturar sua Empresa para Maximizar Incentivos Fiscais',
      excerpt: 'Entenda os passos fundamentais para adequar seu modelo de negócio às exigências da SUFRAMA e garantir conformidade fiscal.',
      author: 'Carla Silva',
      date: '05 Maio 2026',
      category: 'Incentivos',
      image: 'https://images.unsplash.com/photo-1765020553734-2c050ddb9494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0aW5nJTIwbWVldGluZyUyMGRpc2N1c3Npb258ZW58MXx8fHwxNzc4Njk2MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Sustentabilidade Corporativa na Amazônia',
      excerpt: 'Por que investimentos ESG na região amazônica não apenas geram benefícios fiscais, mas atraem capital estrangeiro.',
      author: 'Carlos Andrade',
      date: '28 Abril 2026',
      category: 'Sustentabilidade',
      image: 'https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGZpbmFuY2UlMjBuZXdzcGFwZXJ8ZW58MXx8fHwxNzc4Njk2MDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    }
  ];

  return (
    <div className="pt-16 pb-16 bg-background min-h-screen">
      
      {/* Blog Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1712640183722-ec59693f7c82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Blog & Insights</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Artigos, análises de mercado, entrevistas exclusivas e o conhecimento técnico dos nossos consultores para o sucesso do seu negócio.
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-bold text-secondary">Últimas Publicações</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['Todos', 'Economia', 'Incentivos', 'Sustentabilidade'].map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${cat === 'Todos' ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-accent/20 hover:text-primary'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-300 group flex flex-col">
              <div className="relative h-60 overflow-hidden">
                <ImageWithFallback 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-accent" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-foreground/80 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="text-primary font-bold flex items-center gap-2 group/btn self-start hover:text-accent transition-colors">
                  Ler artigo completo
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-3 bg-secondary text-white font-medium rounded-xl hover:bg-primary transition-colors shadow-md">
            Carregar Mais Artigos
          </button>
        </div>
      </section>
    </div>
  );
}