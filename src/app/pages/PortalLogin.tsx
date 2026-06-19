import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight, UserCircle2, Briefcase, Loader2, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import fundoLogin from '../../assets/salinha_redacao.jpeg';
import logoConsultoria from '../../assets/logo_consultoria.png';
import { supabase } from '../lib/supabase';

export function PortalLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha,
      });

      if (error) throw error;

      const { data: profile } = await supabase
        .from('portal_profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      toast.success('Login realizado com sucesso!');
      
      const role = profile?.role || 'aluno';
      
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/portal');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao realizar login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Left Column - Image & Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-primary flex-col justify-between overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={fundoLogin}
            alt="Corporate Office"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent"></div>
        </div>

        <div className="relative z-10 p-16 flex flex-col h-full justify-between">
          <div>
            <img
              src={logoConsultoria}
              alt="Mourão Consultoria"
              className="h-16 w-auto mb-6 brightness-0 invert cursor-pointer"
              onClick={() => navigate('/')}
            />
            <p className="text-lg text-white/80 max-w-md">
              Acesso exclusivo aos materiais, certificados e histórico das suas aulas na Mourão Academy.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-white">Metodologia Prática</h4>
                <p className="text-sm">Aprenda ferramentas reais aplicadas ao mercado amazonense.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-white">Networking de Elite</h4>
                <p className="text-sm">Conecte-se com consultores e executivos do Polo Industrial.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative overflow-y-auto bg-white">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="w-full max-w-md relative z-10 py-8">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Bem-vindo de volta</h1>
            <p className="text-gray-500">Faça login para acessar sua área exclusiva.</p>
          </div>

          {/* Type Toggle */}
          <div className="flex p-1 bg-gray-100 border border-gray-200 rounded-xl mb-8 shadow-sm">
            <button
              onClick={() => navigate('/cadastro')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all text-gray-500 hover:bg-gray-200 cursor-pointer"
            >
              <UserCircle2 className="w-4 h-4" />
              Criar Conta
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all bg-primary text-white shadow-md cursor-default"
            >
              <Lock className="w-4 h-4" />
              Fazer Login
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary block">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  placeholder="seu@email.com.br"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-primary block">Senha</label>
                <button type="button" className="text-sm text-accent font-medium hover:text-primary transition-colors cursor-pointer">
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.senha}
                  onChange={(e) => setFormData({...formData, senha: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-accent/20 disabled:opacity-50 mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar no Portal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Ainda não tem acesso?{' '}
            <button onClick={() => navigate('/cadastro')} className="text-accent font-bold hover:text-primary transition-colors cursor-pointer">
              Faça sua matrícula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
