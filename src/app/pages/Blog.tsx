import { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { client, urlFor } from '../../lib/sanity';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  authorName: string;
  categories: string[];
  mainImage: any;
}

export function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          *[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            "authorName": author->name,
            "categories": categories[]->title,
            mainImage
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-bold text-secondary">Últimas Publicações</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-accent" />
            <span className="ml-3 text-secondary font-medium">Carregando matérias...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">Ainda não há nenhuma publicação no blog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <article key={post._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-300 group flex flex-col">
                <Link to={`/blog/${post.slug?.current}`} className="flex flex-col h-full">
                  <div className="relative h-60 overflow-hidden">
                    {post.mainImage ? (
                      <ImageWithFallback 
                        src={urlFor(post.mainImage).width(800).height(600).url()} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-muted-foreground">Sem imagem</span>
                      </div>
                    )}
                    {post.categories && post.categories.length > 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {post.categories[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      {post.authorName && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-accent" />
                          <span>{post.authorName}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-foreground/80 mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="text-primary font-bold flex items-center gap-2 group/btn self-start hover:text-accent transition-colors">
                      Ler artigo completo
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}