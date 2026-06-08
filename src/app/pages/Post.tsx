import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../../lib/sanity';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface PostData {
  title: string;
  publishedAt: string;
  authorName: string;
  categories: string[];
  mainImage: any;
  body: any[];
}

// Customizes how PortableText renders standard elements
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || ' Imagem do artigo '}
          loading="lazy"
          src={urlFor(value).width(800).fit('max').auto('format').url()}
          className="rounded-xl my-8 mx-auto shadow-lg max-h-[500px] object-cover"
        />
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-accent underline hover:text-accent/80 transition-colors">
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-10 mb-4 text-secondary">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-10 mb-4 text-secondary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-8 mb-4 text-secondary">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-8 mb-4 text-secondary">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent pl-4 italic my-6 text-foreground/80 bg-accent/5 p-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-foreground/90 text-lg">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
};

export function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `
          *[_type == "post" && slug.current == $slug][0] {
            title,
            publishedAt,
            "authorName": author->name,
            "categories": categories[]->title,
            mainImage,
            body
          }
        `;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-background flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
        <h2 className="text-xl text-secondary font-medium">Carregando matéria...</h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-background flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-secondary mb-4">Matéria não encontrada</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
          A publicação que você está tentando acessar não existe ou foi removida.
        </p>
        <Link to="/blog" className="px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Voltar para o Blog
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
        {post.mainImage && (
          <div className="absolute inset-0">
            <ImageWithFallback 
              src={urlFor(post.mainImage).width(1920).height(1080).url()} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay" 
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Blog
          </Link>
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.categories.map((cat, idx) => (
                <span key={idx} className="bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {cat}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            {post.authorName && (
              <div className="flex items-center gap-2">
                <div className="bg-secondary/50 p-2 rounded-full">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium">{post.authorName}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="bg-secondary/50 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-border">
          <div className="prose prose-lg prose-blue max-w-none">
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p className="text-center italic text-muted-foreground">Conteúdo vazio.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
