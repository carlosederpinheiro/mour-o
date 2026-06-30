import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  LogOut, 
  CreditCard, 
  BookOpen, 
  FileText, 
  Award, 
  Upload, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Download,
  CalendarDays,
  Calendar,
  MapPin,
  Lock,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  ChevronDown,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import logoConsultoria from '../../assets/logo_consultoria.png';
import { supabase } from '../lib/supabase';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export function PortalDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cursos');
  const [user, setUser] = useState<any>(null);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedPaymentCourseId, setSelectedPaymentCourseId] = useState<string | null>(null);
  const [selectedClassCourseId, setSelectedClassCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/portal/login');
        return;
      }
      
      let { data: profile } = await supabase
        .from('portal_profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();
        
      if (!profile) {
        // Tenta recriar o perfil caso tenha sido apagado sem querer no Supabase
        const { data: newProfile, error: insertError } = await supabase
          .from('portal_profiles')
          .insert({
            id: session.user.id,
            nome: session.user.user_metadata?.nome || 'Usuário',
            email: session.user.email,
            telefone: session.user.user_metadata?.telefone || '',
            role: session.user.user_metadata?.role || 'aluno'
          })
          .select()
          .maybeSingle();
          
        if (insertError || !newProfile) {
          toast.error('Erro ao recuperar perfil. Contate o suporte.');
          supabase.auth.signOut();
          navigate('/portal/login');
          return;
        }
        profile = newProfile;
      }

      await loadData(session.user.id, profile);
      setIsLoading(false);
    };

    initData();
  }, [navigate]);

  const loadData = async (userId: string, profile: any) => {
    const { data: coursesData } = await supabase.from('portal_courses').select('*').eq('status', 'Aberto');
    const { data: classesData } = await supabase.from('portal_classes').select('*').order('data', { ascending: true });
    
    if (coursesData) {
      const mappedCourses = coursesData.map((c: any) => ({
        ...c,
        aulas: (classesData || []).filter((cls: any) => cls.course_id === c.id)
      }));
      setAvailableCourses(mappedCourses);
    }

    const { data: enrollments } = await supabase.from('portal_enrollments').select('*').eq('user_id', userId);
    
    const matriculas = (enrollments || []).map(e => ({
      id: e.id,
      cursoId: e.course_id,
      status: e.status,
      progresso: e.progresso,
      comprovanteUrl: e.comprovante_url
    }));

    setUser({
      ...profile,
      matriculas
    });

    const hasConfirmed = matriculas.some(m => m.status === 'Confirmado');
    if (hasConfirmed && matriculas.length > 0) {
      setActiveTab('aulas');
    } else {
      setActiveTab('cursos');
    }
  };

  useEffect(() => {
    if (activeTab === 'aulas' && user) {
      const confirmedCourses = user.matriculas.filter((m: any) => m.status === 'Confirmado');
      if (confirmedCourses.length > 0 && !selectedClassCourseId) {
        setSelectedClassCourseId(confirmedCourses[0].cursoId);
      }
    }
  }, [activeTab, user, selectedClassCourseId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleEnroll = async (cursoId: string) => {
    if (!user) return;

    const { error } = await supabase.from('portal_enrollments').insert([
      { user_id: user.id, course_id: cursoId, status: 'Pendente', progresso: 0 }
    ]);

    if (error) {
      toast.error('Erro ao iniciar matrícula: ' + error.message);
      return;
    }

    await loadData(user.id, user);
    setSelectedPaymentCourseId(cursoId);
    toast.success('Matrícula iniciada! Realize o pagamento para confirmar.');
  };

  const handleUploadReceipt = async (e: React.ChangeEvent<HTMLInputElement>, cursoId: string) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      // Coloca dentro da pasta com o ID do usuário para respeitar a regra de segurança do Storage (RLS)
      const fileName = `${user.id}/${cursoId}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portal_receipts')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('portal_receipts')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase.from('portal_enrollments')
        .update({ status: 'Aguardando', comprovante_url: publicUrlData.publicUrl })
        .eq('user_id', user.id)
        .eq('course_id', cursoId);

      if (updateError) throw updateError;

      await loadData(user.id, user);
      toast.success('Comprovante enviado! Aguarde a confirmação em até 24h.');
    } catch (error: any) {
      toast.error('Erro no upload: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  const hasConfirmedCourses = user.matriculas.some((m: any) => m.status === 'Confirmado');
  const pendingNotifications = user.matriculas.filter((m: any) => m.status === 'Pendente' || m.status === 'Aguardando');

  const renderPaymentScreen = (courseId: string) => {
    const course = availableCourses.find(c => c.id === courseId);
    const matricula = user.matriculas.find((m: any) => m.cursoId === courseId);
    if (!course || !matricula) return null;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedPaymentCourseId(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Voltar para Cursos
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financeiro: {course.titulo}</h1>
        <p className="text-gray-500 mb-8">Conclua seu pagamento para liberar seu acesso às aulas deste curso.</p>

        {matricula.status === 'Aguardando' ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="text-yellow-600 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-800 mb-2">Comprovante em Análise</h3>
            <p className="text-yellow-700 max-w-md mx-auto">
              Recebemos o envio do seu comprovante com sucesso. Nossa equipe administrativa irá validar as informações e liberar seu acesso em até 24 horas úteis.
            </p>
          </div>
        ) : matricula.status === 'Confirmado' ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-600 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Pagamento Confirmado!</h3>
            <p className="text-green-700 max-w-md mx-auto">
              Sua matrícula para este curso está ativa. Acesse a aba "Minhas Aulas".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dados do Pix */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-accent" />
                <h3 className="text-xl font-bold text-gray-900">Dados para Pagamento</h3>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <p className="text-sm text-gray-500 mb-1">Valor da Inscrição</p>
                <p className="text-3xl font-bold text-gray-900 mb-6">R$ {Number(course.valor || 0).toFixed(2).replace('.', ',')}</p>
                
                <p className="text-sm text-gray-500 mb-1">Chave Pix (CNPJ)</p>
                <p className="text-lg font-mono text-gray-800 font-semibold mb-4 select-all">32.705.355/0001-72</p>
                
                <p className="text-sm text-gray-500 mb-1">Nome</p>
                <p className="text-gray-800 font-medium">Mourão Consultoria Econômica Ltda</p>
              </div>

              <p className="text-sm text-gray-500">
                Realize o pagamento através do app do seu banco e tire um print ou salve o comprovante para anexar na etapa ao lado.
              </p>
            </div>

            {/* Anexar Comprovante */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col justify-center shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Já pagou? Anexe aqui</h3>
              <p className="text-gray-500 text-sm mb-6">
                Envie a foto ou o PDF do seu comprovante de transferência Pix.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-accent hover:bg-accent/5 transition-colors bg-gray-50 group cursor-pointer relative">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*,.pdf"
                  onChange={(e) => handleUploadReceipt(e, course.id)}
                />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4 group-hover:text-accent transition-colors" />
                <p className="text-gray-700 font-medium mb-1 group-hover:text-accent transition-colors">
                  Clique ou arraste o arquivo aqui
                </p>
                <p className="text-xs text-gray-400">JPG, PNG ou PDF (Máx. 5MB)</p>
              </div>

              {isUploading && (
                <div className="mt-4 flex items-center justify-center gap-2 text-accent">
                  <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
                  <span className="text-sm font-medium">Enviando comprovante...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-slate-900/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={cn(
          "absolute lg:relative inset-y-0 left-0 z-50 bg-primary transform transition-all duration-300 ease-in-out flex flex-col shadow-xl border-r border-white/5",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isSidebarCollapsed ? "lg:w-20" : "w-64"
        )}>
           <button 
             onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
             className="hidden lg:flex absolute -right-3 top-5 z-[60] w-6 h-6 bg-accent text-primary rounded-full items-center justify-center border border-white/20 shadow-lg transition-all duration-200 cursor-pointer hover:scale-110"
           >
             {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
           </button>

           <div className="h-16 flex items-center px-6 mb-4 mt-4">
              <div onClick={() => navigate('/')} className="cursor-pointer flex items-center">
                {!isSidebarCollapsed ? (
                  <img 
                    src={logoConsultoria} 
                    alt="Mourão Consultoria" 
                    className="h-10 w-auto brightness-0 invert"
                  />
                ) : (
                  <BookOpen className="text-accent flex-shrink-0 mx-auto" size={24} />
                )}
              </div>
           </div>

           <div className="px-4 flex-1 overflow-y-auto overflow-x-hidden py-2 mt-4">
             {!isSidebarCollapsed && (
               <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-3">
                 Área do Aluno
               </h2>
             )}
             <nav className="space-y-1.5 mb-8">
                <button 
                  onClick={() => { setActiveTab('cursos'); setSelectedPaymentCourseId(null); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group relative cursor-pointer",
                    activeTab === 'cursos' 
                      ? "font-bold text-white bg-accent/20 border border-accent/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                    isSidebarCollapsed && "justify-center px-0 h-[42px]"
                  )}
                >
                  <BookOpen size={20} className={cn(activeTab === 'cursos' ? "text-accent" : "text-gray-500 group-hover:text-white")} />
                  {!isSidebarCollapsed && <span className="tracking-tight">Cursos Disponíveis</span>}
                  {!isSidebarCollapsed && activeTab === 'cursos' && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#FFD700]" />
                  )}
                </button>

                <button 
                  onClick={() => hasConfirmedCourses && setActiveTab('aulas')}
                  disabled={!hasConfirmedCourses}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group relative",
                    !hasConfirmedCourses ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                    activeTab === 'aulas' 
                      ? "font-bold text-white bg-accent/20 border border-accent/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                    isSidebarCollapsed && "justify-center px-0 h-[42px]"
                  )}
                >
                  <FileText size={20} className={cn(activeTab === 'aulas' ? "text-accent" : "text-gray-500 group-hover:text-white")} />
                  {!isSidebarCollapsed && <span className="tracking-tight">Minhas Aulas</span>}
                  {!isSidebarCollapsed && !hasConfirmedCourses && <Lock size={14} className="absolute right-3 text-gray-500" />}
                  {!isSidebarCollapsed && activeTab === 'aulas' && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#FFD700]" />
                  )}
                </button>

                <button 
                  onClick={() => hasConfirmedCourses && setActiveTab('certificados')}
                  disabled={!hasConfirmedCourses}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group relative",
                    !hasConfirmedCourses ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                    activeTab === 'certificados' 
                      ? "font-bold text-white bg-accent/20 border border-accent/20" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white",
                    isSidebarCollapsed && "justify-center px-0 h-[42px]"
                  )}
                >
                  <Award size={20} className={cn(activeTab === 'certificados' ? "text-accent" : "text-gray-500 group-hover:text-white")} />
                  {!isSidebarCollapsed && <span className="tracking-tight">Certificados</span>}
                  {!isSidebarCollapsed && !hasConfirmedCourses && <Lock size={14} className="absolute right-3 text-gray-500" />}
                  {!isSidebarCollapsed && activeTab === 'certificados' && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#FFD700]" />
                  )}
                </button>
             </nav>
           </div>
           
           {/* Sidebar Logout */}
           <div className="p-4 border-t border-white/5 flex flex-col gap-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group cursor-pointer"
              >
                <LogOut size={18} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                {!isSidebarCollapsed && <span className="font-medium">Sair do Portal</span>}
              </button>
           </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Nav */}
          <header className="h-16 bg-primary text-white flex items-center justify-between px-6 shrink-0 z-40 border-b border-white/5 shadow-md">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md hidden sm:block">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                  <Search size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="Buscar aulas, materiais..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-gray-500 transition-all font-medium text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer"
                >
                  <Bell size={20} />
                  {pendingNotifications.length > 0 && (
                    <span className="absolute top-1 right-1 min-w-[14px] h-[14px] px-1 bg-red-500 rounded-full border border-primary flex items-center justify-center text-[8px] font-bold text-white">
                      {pendingNotifications.length}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 text-gray-800">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                      <h3 className="text-sm font-bold text-gray-800">Notificações</h3>
                    </div>
                    {pendingNotifications.length > 0 ? (
                      <div className="flex flex-col">
                        {pendingNotifications.map((notif: any) => {
                          const course = availableCourses.find(c => c.id === notif.cursoId);
                          return (
                            <div key={notif.cursoId} className="p-4 flex gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0" onClick={() => {setActiveTab('cursos'); setSelectedPaymentCourseId(notif.cursoId); setIsNotificationsOpen(false);}}>
                              <div className="mt-1">
                                <AlertCircle size={16} className="text-yellow-500" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-1">Pagamento {notif.status}</p>
                                <p className="text-sm font-medium text-gray-700">{course?.titulo}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500 flex flex-col items-center">
                        <CheckCircle size={24} className="text-green-500 mb-2" />
                        <p className="text-sm font-medium">Tudo certo por aqui!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />

              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white group-hover:text-accent transition-colors leading-tight">{user.nome}</p>
                  <p className="text-xs text-gray-500 font-medium tracking-tight">
                    {hasConfirmedCourses ? 'Aluno(a) Ativo' : 'Visitante'}
                  </p>
                </div>
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-secondary border border-white/10 flex items-center justify-center font-black text-accent text-sm shadow-sm group-hover:scale-105 transition-all">
                    {user?.nome ? user.nome.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-primary ${
                    hasConfirmedCourses ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                </div>
                <ChevronDown size={14} className="text-gray-500 group-hover:text-white transition-colors" />
              </div>
              
              <button className="lg:hidden text-gray-300 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu size={20} />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
            <div className="max-w-4xl mx-auto">
              
              {/* Aba: Cursos */}
              {activeTab === 'cursos' && (
                selectedPaymentCourseId ? (
                  renderPaymentScreen(selectedPaymentCourseId)
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cursos Disponíveis</h1>
                    <p className="text-gray-500 mb-8">Escolha sua próxima formação e acelere sua carreira.</p>

                    {availableCourses.length === 0 && (
                      <p className="text-gray-500">Nenhum curso com inscrições abertas no momento.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {availableCourses.map(course => {
                        const matricula = user.matriculas.find((m: any) => m.cursoId === course.id);
                        
                        return (
                          <div key={course.id} className="bg-primary rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-xl">
                            <div 
                              className="h-48 p-8 flex flex-col justify-end relative overflow-hidden bg-cover bg-center"
                              style={{ backgroundImage: `url('${course.imagem}')` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30"></div>
                              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 w-max relative z-10">
                                TURMA ABERTA
                              </span>
                              <h2 className="text-2xl font-bold text-white relative z-10 drop-shadow-lg">{course.titulo}</h2>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col bg-primary">
                              <p className="text-gray-300 mb-6 flex-1 text-sm">
                                {course.descricao}
                              </p>
                              
                              <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                  <Calendar className="text-accent flex-shrink-0" size={18} />
                                  <span>{course.datas}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                  <Clock className="text-accent flex-shrink-0" size={18} />
                                  <span>{course.horario}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                  <MapPin className="text-accent flex-shrink-0" size={18} />
                                  <span>{course.local}</span>
                                </div>
                              </div>

                              <div className="mt-auto border-t border-white/10 pt-6">
                                <div className="mb-4">
                                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Investimento</p>
                                  <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold text-white">R$ {Number(course.valor || 0).toFixed(2).replace('.', ',')}</p>
                                  </div>
                                  <p className="text-xs text-accent mt-1 font-medium">{course.desconto}</p>
                                </div>
                                
                                {!matricula ? (
                                  <button 
                                    onClick={() => handleEnroll(course.id)}
                                    className="w-full py-3 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition-colors"
                                  >
                                    Fazer Matrícula
                                  </button>
                                ) : matricula.status === 'Confirmado' ? (
                                  <button 
                                    onClick={() => { setActiveTab('aulas'); setSelectedClassCourseId(course.id); }}
                                    className="w-full py-3 bg-green-500/20 text-green-400 border border-green-500/30 font-bold rounded-xl hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                                  >
                                    <CheckCircle size={18} /> Acessar Aulas
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => setSelectedPaymentCourseId(course.id)}
                                    className="w-full py-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold rounded-xl hover:bg-yellow-500/30 transition-colors flex items-center justify-center gap-2"
                                  >
                                    <Clock size={18} /> Ver Pagamento ({matricula.status})
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              {/* Aba: Aulas (Apenas Confirmados) */}
              {activeTab === 'aulas' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">Minhas Aulas</h1>
                      <p className="text-gray-500">Acompanhe seu cronograma e baixe seus materiais.</p>
                    </div>
                    
                    {user.matriculas.filter((m: any) => m.status === 'Confirmado').length > 1 && (
                      <select 
                        value={selectedClassCourseId || ''} 
                        onChange={(e) => setSelectedClassCourseId(e.target.value)}
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-accent focus:border-accent block p-2.5 shadow-sm"
                      >
                        {user.matriculas.filter((m: any) => m.status === 'Confirmado').map((m: any) => {
                          const course = availableCourses.find(c => c.id === m.cursoId);
                          return <option key={m.cursoId} value={m.cursoId}>{course?.titulo}</option>;
                        })}
                      </select>
                    )}
                  </div>

                  {selectedClassCourseId ? (() => {
                    const course = availableCourses.find(c => c.id === selectedClassCourseId);
                    if (!course) return null;
                    const aulas = course.aulas || []; // Se o BD não tiver 'aulas'
                    return (
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-sm">
                        <div className="p-6 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
                          <CalendarDays className="text-accent" />
                          <h3 className="text-xl font-bold text-gray-900">Cronograma: {course.titulo}</h3>
                        </div>
                        {aulas.length > 0 ? (
                          <div className="divide-y divide-gray-100">
                            {aulas.map((aula: any, idx: number) => (
                              <div key={idx} className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-gray-50 transition-colors">
                                <div>
                                  <p className="text-sm text-accent mb-1 font-mono font-medium">{aula.data}</p>
                                  <h4 className="text-lg font-bold text-gray-900">{aula.tema}</h4>
                                  <p className="text-sm text-gray-500">Professor: {aula.prof}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    aula.status === 'Concluído' ? 'bg-green-100 text-green-700' :
                                    aula.status === 'Próxima Aula' ? 'bg-accent/20 text-accent' :
                                    'bg-gray-100 text-gray-500'
                                  }`}>
                                    {aula.status}
                                  </span>
                                  {aula.material_url ? (
                                    <a href={aula.material_url.startsWith('http') ? aula.material_url : `https://${aula.material_url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer shadow-sm">
                                      <Download size={14} /> Material
                                    </a>
                                  ) : aula.status === 'Concluído' ? (
                                    <button disabled className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 cursor-not-allowed shadow-none">
                                      Indisponível
                                    </button>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-gray-500 text-center">Nenhum cronograma cadastrado.</div>
                        )}
                      </div>
                    );
                  })() : (
                    <p className="text-gray-500">Selecione um curso para ver as aulas.</p>
                  )}
                </div>
              )}

              {/* Aba: Certificados */}
              {activeTab === 'certificados' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Certificados</h1>
                  <p className="text-gray-500 mb-8">Evolução dos seus cursos e emissão de diplomas.</p>

                  <div className="grid grid-cols-1 gap-6">
                    {user.matriculas.filter((m: any) => m.status === 'Confirmado').map((m: any) => {
                      const course = availableCourses.find(c => c.id === m.cursoId);
                      if (!course) return null;
                      
                      const progress = m.progresso || 0;
                      return (
                        <div key={m.cursoId} className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left shadow-sm">
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className={`w-12 h-12 ${progress >= 100 ? 'text-accent' : 'text-gray-400'}`} />
                          </div>
                          <div className="flex-1 w-full">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{course.titulo}</h3>
                            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2 border border-gray-200">
                              <div className="bg-accent h-full transition-all" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="text-sm text-gray-500">
                              Progresso: <span className="text-accent font-bold">{progress}% concluído</span> 
                              {progress < 100 && ' (O certificado será liberado após 100% de conclusão).'}
                            </p>
                          </div>
                          <div className="flex-shrink-0 mt-4 sm:mt-0">
                            <button 
                              disabled={progress < 100}
                              className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 border transition-all ${
                                progress >= 100 
                                ? 'bg-accent text-primary border-accent hover:bg-accent/90 cursor-pointer' 
                                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              }`}
                            >
                              <Download size={18} /> Baixar PDF
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
