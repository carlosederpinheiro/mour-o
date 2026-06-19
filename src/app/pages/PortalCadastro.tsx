import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight, UserCircle2, Briefcase, Loader2, User, Phone, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import fundoLogin from '../../assets/salinha_redacao.jpeg';
import logoConsultoria from '../../assets/logo_consultoria.png';
import { supabase } from '../lib/supabase';

export function PortalCadastro() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.senha,
        options: {
          data: {
            nome: formData.nome,
            telefone: formData.telefone,
            role: 'aluno'
          }
        }
      });

      if (error) throw error;

      toast.success('Cadastro realizado com sucesso! Bem-vindo à Mourão Academy.');
      navigate('/portal');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta.');
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
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Bem-vindo à Academy</h1>
            <p className="text-gray-500">Preencha seus dados para criar sua conta.</p>
          </div>

          {/* Type Toggle */}
          <div className="flex p-1 bg-gray-100 border border-gray-200 rounded-xl mb-8 shadow-sm">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all bg-primary text-white shadow-md cursor-default"
            >
              <UserCircle2 className="w-4 h-4" />
              Criar Conta
            </button>
            <button
              onClick={() => navigate('/portal/login')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all text-gray-500 hover:bg-gray-200 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              Fazer Login
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-bold text-primary block">Nome Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div className="space-y-1">
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

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary block">WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-primary placeholder:text-gray-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none"
                  placeholder="(92) 99999-9999"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-primary block">Senha</label>
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
                  Criando conta...
                </>
              ) : (
                <>
                  Finalizar Cadastro
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-400">
            Ao criar sua conta você concorda com nossos termos e política de privacidade.
          </div>
        </div>
      </div>
    </div>
  );
}
