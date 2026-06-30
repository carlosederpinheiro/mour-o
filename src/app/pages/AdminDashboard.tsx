import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  LogOut, 
  Users, 
  BookOpen, 
  DollarSign, 
  LayoutDashboard, 
  Menu,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Award,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import logoConsultoria from '../../assets/logo_consultoria.png';
import { supabase } from '../lib/supabase';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminUser, setAdminUser] = useState<any>(null);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State para formulário de curso
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>({});

  useEffect(() => {
    const checkAuth = async () => {
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
        // Tenta recriar o perfil
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
        
      if (profile.role !== 'admin') {
        navigate('/portal');
        return;
      }
      
      setAdminUser({
        id: profile.id,
        nome: profile.nome,
        email: profile.email,
        role: profile.role,
      });
      
      await loadData();
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const loadData = async () => {
    const { data: coursesData } = await supabase.from('portal_courses').select('*').order('created_at', { ascending: false });
    const { data: classesData } = await supabase.from('portal_classes').select('*').order('data', { ascending: true });
    
    if (coursesData) {
      const mappedCourses = coursesData.map((c: any) => ({
        ...c,
        aulas: (classesData || []).filter((cls: any) => cls.course_id === c.id)
      }));
      setCourses(mappedCourses);
    }

    const { data: profilesData } = await supabase.from('portal_profiles').select('*');
    const { data: enrollmentsData } = await supabase.from('portal_enrollments').select('*');

    if (profilesData && enrollmentsData) {
      const mappedUsers = profilesData.map((p: any) => ({
        id: p.id,
        nome: p.nome,
        email: p.email,
        telefone: p.telefone,
        role: p.role,
        matriculas: enrollmentsData.filter((e: any) => e.user_id === p.id).map((e: any) => ({
          enrollment_id: e.id,
          cursoId: e.course_id,
          status: e.status,
          progresso: e.progresso,
          comprovanteUrl: e.comprovante_url
        }))
      }));
      setUsers(mappedUsers);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // --- Funções de Curso ---
  const handleSaveCourse = async () => {
    if (!currentCourse.titulo || !currentCourse.valor) {
      toast.error('Preencha os campos obrigatórios (Título e Valor).');
      return;
    }

    const courseData = {
      titulo: currentCourse.titulo,
      prof: currentCourse.prof || '',
      valor: Number(currentCourse.valor) || 0,
      imagem: currentCourse.imagem || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
      descricao: currentCourse.descricao || '',
      datas: currentCourse.datas || '',
      horario: currentCourse.horario || '',
      local: currentCourse.local || '',
      desconto: currentCourse.desconto || '',
      status: currentCourse.status || 'Rascunho',
    };

    let finalCourseId = currentCourse.id;

    if (currentCourse.id) {
      const { error } = await supabase.from('portal_courses').update(courseData).eq('id', currentCourse.id);
      if (error) { toast.error('Erro ao atualizar curso: ' + error.message); return; }
    } else {
      const { data, error } = await supabase.from('portal_courses').insert([courseData]).select().single();
      if (error) { toast.error('Erro ao criar curso: ' + error.message); return; }
      finalCourseId = data.id;
    }

    if (finalCourseId && currentCourse.aulas) {
      await supabase.from('portal_classes').delete().eq('course_id', finalCourseId);
      
      const classesToInsert = currentCourse.aulas.map((a: any) => ({
        course_id: finalCourseId,
        tema: a.tema || '',
        data: a.data || '',
        prof: a.prof || '',
        status: a.status || 'Agendado',
        material_url: a.material_url || null
      }));
      
      if (classesToInsert.length > 0) {
        const { error: classesError } = await supabase.from('portal_classes').insert(classesToInsert);
        if (classesError) {
          toast.error('Curso salvo, mas erro ao salvar aulas: ' + classesError.message);
          return;
        }
      }
    }
    
    toast.success('Curso salvo com sucesso!');

    await loadData();
    setIsEditingCourse(false);
    setCurrentCourse({});
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return;
    const { error } = await supabase.from('portal_courses').delete().eq('id', id);
    if (error) toast.error('Erro ao excluir: ' + error.message);
    else {
      toast.success('Curso excluído.');
      loadData();
    }
  };

  const handleToggleCourseStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('portal_courses').update({ status: newStatus }).eq('id', id);
    if (error) toast.error('Erro ao alterar status.');
    else {
      toast.success(`Curso alterado para ${newStatus}.`);
      loadData();
    }
  };

  // --- Funções Financeiras ---
  const handleApprovePayment = async (enrollmentId: string) => {
    const { error } = await supabase.from('portal_enrollments').update({ status: 'Confirmado' }).eq('id', enrollmentId);
    if (error) toast.error('Erro ao aprovar: ' + error.message);
    else {
      toast.success('Pagamento aprovado. Área do aluno liberada!');
      loadData();
    }
  };

  const handleRejectPayment = async (enrollmentId: string) => {
    const { error } = await supabase.from('portal_enrollments').update({ status: 'Pendente', comprovante_url: null }).eq('id', enrollmentId);
    if (error) toast.error('Erro ao recusar: ' + error.message);
    else {
      toast.info('Comprovante recusado. O aluno deverá enviar novamente.');
      loadData();
    }
  };

  const handleIssueCertificate = async (enrollmentId: string) => {
    const { error } = await supabase.from('portal_enrollments').update({ progresso: 100 }).eq('id', enrollmentId);
    if (error) toast.error('Erro ao emitir certificado: ' + error.message);
    else {
      toast.success('Certificado liberado para o aluno!');
      loadData();
    }
  };

  // --- Funções de Aluno ---
  const handleResetPassword = async (userId: string) => {
    // O Supabase Admin API seria necessário para redefinir a senha de outro usuário.
    // Como alternativa, podemos enviar um email de redefinição de senha.
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;
    
    const { error } = await supabase.auth.resetPasswordForEmail(userToUpdate.email);
    if (error) {
      toast.error('Erro ao solicitar reset: ' + error.message);
    } else {
      toast.success(`E-mail de recuperação enviado para ${userToUpdate.email}`);
    }
  };

  if (isLoading || !adminUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  // Calculos de dashboard
  const pendingPayments = users.flatMap(u => 
    u.matriculas.filter((m: any) => m.status === 'Aguardando').map((m: any) => ({ user: u, matricula: m }))
  );
  
  const totalRevenue = users.reduce((acc, u) => {
    const confirmedCount = u.matriculas.filter((m: any) => m.status === 'Confirmado').length;
    return acc + (confirmedCount * 200); // Simplificação de valor
  }, 0);

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
             className="hidden lg:flex absolute -right-3 top-5 z-[60] w-6 h-6 bg-accent text-primary rounded-full items-center justify-center border border-white/20 shadow-lg cursor-pointer hover:scale-110 transition-transform"
           >
             {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
           </button>

           <div className="h-16 flex items-center px-6 mb-4 mt-4">
              <div onClick={() => navigate('/')} className="cursor-pointer flex items-center w-full">
                {!isSidebarCollapsed ? (
                  <img src={logoConsultoria} alt="Mourão" className="h-10 w-auto brightness-0 invert" />
                ) : (
                  <Settings className="text-accent flex-shrink-0 mx-auto" size={24} />
                )}
              </div>
           </div>

           <div className="px-4 flex-1 overflow-y-auto py-2 mt-4">
             {!isSidebarCollapsed && (
               <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-3">
                 Administração
               </h2>
             )}
             <nav className="space-y-1.5 mb-8">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Visão Geral' },
                  { id: 'cursos', icon: BookOpen, label: 'Gestão de Cursos' },
                  { id: 'financeiro', icon: DollarSign, label: 'Financeiro', badge: pendingPayments.length },
                  { id: 'alunos', icon: Users, label: 'Alunos & Perfis' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group relative cursor-pointer",
                      activeTab === item.id 
                        ? "font-bold text-white bg-accent/20 border border-accent/20" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                      isSidebarCollapsed && "justify-center px-0 h-[42px]"
                    )}
                  >
                    <item.icon size={20} className={cn(activeTab === item.id ? "text-accent" : "text-gray-500 group-hover:text-white")} />
                    {!isSidebarCollapsed && <span className="tracking-tight">{item.label}</span>}
                    {!isSidebarCollapsed && item.badge > 0 && (
                      <span className="absolute right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
             </nav>
           </div>
           
           <div className="p-4 border-t border-white/5 flex flex-col gap-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all group cursor-pointer"
              >
                <LogOut size={18} className="text-gray-500 group-hover:text-red-400" />
                {!isSidebarCollapsed && <span className="font-medium">Sair do Admin</span>}
              </button>
           </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="h-16 bg-white text-gray-800 flex items-center justify-between px-6 shrink-0 z-40 border-b border-gray-200 shadow-sm">
            <h1 className="text-lg font-bold">Portal do Funcionário</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-500">{adminUser.nome} (Admin)</span>
              <button className="lg:hidden text-gray-500" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu size={20} />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 md:p-10 relative bg-slate-50">
            <div className="max-w-6xl mx-auto">
              
              {/* --- DASHBOARD --- */}
              {activeTab === 'dashboard' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Visão Geral</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Users size={24} />
                      </div>
                      <p className="text-sm text-gray-500 font-medium">Total de Alunos</p>
                      <p className="text-3xl font-bold text-gray-900">{users.filter(u => u.role === 'aluno').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                        <DollarSign size={24} />
                      </div>
                      <p className="text-sm text-gray-500 font-medium">Receita Estimada</p>
                      <p className="text-3xl font-bold text-gray-900">R$ {totalRevenue.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
                        <CheckCircle size={24} />
                      </div>
                      <p className="text-sm text-gray-500 font-medium">Comprovantes p/ Analisar</p>
                      <p className="text-3xl font-bold text-gray-900">{pendingPayments.length}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* --- GESTÃO DE CURSOS --- */}
              {activeTab === 'cursos' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gestão de Cursos</h1>
                    {!isEditingCourse && (
                      <button 
                        onClick={() => { setCurrentCourse({ status: 'Rascunho' }); setIsEditingCourse(true); }}
                        className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary/90"
                      >
                        <Plus size={18} /> Novo Curso
                      </button>
                    )}
                  </div>

                  {isEditingCourse ? (
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                      <h2 className="text-xl font-bold mb-6">{currentCourse.id ? 'Editar Curso' : 'Criar Novo Curso'}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Título do Curso</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.titulo || ''} onChange={e => setCurrentCourse({...currentCourse, titulo: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Professor</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.prof || ''} onChange={e => setCurrentCourse({...currentCourse, prof: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Valor (R$)</label>
                          <input type="number" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.valor || ''} onChange={e => setCurrentCourse({...currentCourse, valor: Number(e.target.value)})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">URL da Imagem</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.imagem || ''} onChange={e => setCurrentCourse({...currentCourse, imagem: e.target.value})} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-1">Descrição Curta</label>
                          <textarea className="w-full border border-gray-300 rounded-lg p-2" rows={3} value={currentCourse.descricao || ''} onChange={e => setCurrentCourse({...currentCourse, descricao: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Local do Curso</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.local || ''} onChange={e => setCurrentCourse({...currentCourse, local: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Data(s) do Curso</label>
                          <input type="text" placeholder="Ex: 27 a 29 de Julho" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.datas || ''} onChange={e => setCurrentCourse({...currentCourse, datas: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Horário do Curso</label>
                          <input type="text" placeholder="Ex: 18h às 21h" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.horario || ''} onChange={e => setCurrentCourse({...currentCourse, horario: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Informações de Desconto</label>
                          <input type="text" placeholder="Ex: R$ 100 para estudantes" className="w-full border border-gray-300 rounded-lg p-2" value={currentCourse.desconto || ''} onChange={e => setCurrentCourse({...currentCourse, desconto: e.target.value})} />
                        </div>
                        
                        <div className="md:col-span-2 mt-6 border-t border-gray-200 pt-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Cronograma de Aulas</h3>
                            <button 
                              onClick={() => {
                                const newAula = { id: 'temp-' + Date.now(), tema: '', data: '', prof: currentCourse.prof || '', status: 'Agendado', material_url: '' };
                                setCurrentCourse({ ...currentCourse, aulas: [...(currentCourse.aulas || []), newAula] });
                              }}
                              className="text-sm bg-accent/20 text-accent px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 hover:bg-accent/30"
                            >
                              <Plus size={16} /> Adicionar Aula
                            </button>
                          </div>
                          
                          {(currentCourse.aulas || []).length === 0 ? (
                            <p className="text-sm text-gray-500 mb-4">Nenhuma aula cadastrada. Adicione aulas para que os alunos vejam o cronograma detalhado.</p>
                          ) : (
                            <div className="space-y-4 mb-4">
                              {(currentCourse.aulas || []).map((aula: any, index: number) => (
                                <div key={aula.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-3">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-sm text-gray-700">Aula {index + 1}</h4>
                                    <button 
                                      onClick={() => {
                                        const newAulas = [...currentCourse.aulas];
                                        newAulas.splice(index, 1);
                                        setCurrentCourse({ ...currentCourse, aulas: newAulas });
                                      }}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash size={16} />
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div>
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Tema / Assunto</label>
                                      <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm" value={aula.tema} onChange={e => { const a = [...currentCourse.aulas]; a[index].tema = e.target.value; setCurrentCourse({...currentCourse, aulas: a}); }} />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Data e Hora</label>
                                      <input type="text" placeholder="Ex: 27 de Julho, 18h" className="w-full border border-gray-300 rounded-lg p-2 text-sm" value={aula.data} onChange={e => { const a = [...currentCourse.aulas]; a[index].data = e.target.value; setCurrentCourse({...currentCourse, aulas: a}); }} />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Professor</label>
                                      <input type="text" className="w-full border border-gray-300 rounded-lg p-2 text-sm" value={aula.prof} onChange={e => { const a = [...currentCourse.aulas]; a[index].prof = e.target.value; setCurrentCourse({...currentCourse, aulas: a}); }} />
                                    </div>
                                    <div>
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                                      <select className="w-full border border-gray-300 rounded-lg p-2 text-sm" value={aula.status} onChange={e => { const a = [...currentCourse.aulas]; a[index].status = e.target.value; setCurrentCourse({...currentCourse, aulas: a}); }}>
                                        <option value="Agendado">Agendado</option>
                                        <option value="Concluído">Concluído</option>
                                      </select>
                                    </div>
                                    <div className="lg:col-span-4">
                                      <label className="block text-xs font-bold text-gray-500 mb-1">Link do Material (Google Drive)</label>
                                      <input type="text" placeholder="https://drive.google.com/..." className="w-full border border-gray-300 rounded-lg p-2 text-sm" value={aula.material_url || ''} onChange={e => { const a = [...currentCourse.aulas]; a[index].material_url = e.target.value; setCurrentCourse({...currentCourse, aulas: a}); }} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={handleSaveCourse} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">Salvar Curso</button>
                        <button onClick={() => setIsEditingCourse(false)} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                          <tr>
                            <th className="p-4 font-bold">Curso</th>
                            <th className="p-4 font-bold">Professor</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {courses.map(course => (
                            <tr key={course.id} className="hover:bg-gray-50">
                              <td className="p-4">
                                <p className="font-bold text-gray-900">{course.titulo}</p>
                                <p className="text-xs text-gray-500">R$ {course.valor}</p>
                              </td>
                              <td className="p-4 text-sm">{course.prof}</td>
                              <td className="p-4">
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-xs font-bold",
                                  course.status === 'Aberto' ? 'bg-green-100 text-green-700' :
                                  course.status === 'Encerrado' ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                                )}>
                                  {course.status}
                                </span>
                              </td>
                              <td className="p-4 flex items-center gap-2">
                                <button onClick={() => { setCurrentCourse(course); setIsEditingCourse(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar">
                                  <Edit size={18} />
                                </button>
                                {course.status === 'Rascunho' && (
                                  <button onClick={() => handleToggleCourseStatus(course.id, 'Aberto')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Abrir Turma">
                                    <CheckCircle size={18} />
                                  </button>
                                )}
                                {course.status === 'Aberto' && (
                                  <button onClick={() => handleToggleCourseStatus(course.id, 'Encerrado')} className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg" title="Encerrar Turma">
                                    <XCircle size={18} />
                                  </button>
                                )}
                                <button onClick={() => handleDeleteCourse(course.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir">
                                  <Trash size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* --- FINANCEIRO --- */}
              {activeTab === 'financeiro' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Aprovações Financeiras</h1>
                  <p className="text-gray-500 mb-8">Comprovantes de Pix enviados pelos alunos aguardando liberação.</p>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                        <tr>
                          <th className="p-4 font-bold">Aluno</th>
                          <th className="p-4 font-bold">Curso</th>
                          <th className="p-4 font-bold">Comprovante</th>
                          <th className="p-4 font-bold">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {pendingPayments.length === 0 ? (
                          <tr><td colSpan={4} className="p-8 text-center text-gray-500">Nenhum pagamento pendente de análise.</td></tr>
                        ) : (
                          pendingPayments.map(({ user, matricula }, idx) => {
                            const course = courses.find(c => c.id === matricula.cursoId);
                            return (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="p-4">
                                  <p className="font-bold text-gray-900">{user.nome}</p>
                                  <p className="text-xs text-gray-500">{user.email}</p>
                                </td>
                                <td className="p-4 text-sm font-medium">{course?.titulo}</td>
                                <td className="p-4">
                                  {matricula.comprovanteUrl ? (
                                    <a href={matricula.comprovanteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-accent font-bold hover:underline">
                                      <Eye size={16} /> Ver Arquivo
                                    </a>
                                  ) : (
                                    <span className="text-sm text-gray-400">Sem anexo</span>
                                  )}
                                </td>
                                <td className="p-4 flex gap-2">
                                  <button onClick={() => handleApprovePayment(matricula.enrollment_id)} className="px-3 py-1 bg-green-100 text-green-700 font-bold text-sm rounded-lg hover:bg-green-200">Aprovar e Liberar</button>
                                  <button onClick={() => handleRejectPayment(matricula.enrollment_id)} className="px-3 py-1 bg-red-100 text-red-700 font-bold text-sm rounded-lg hover:bg-red-200">Recusar</button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- ALUNOS --- */}
              {activeTab === 'alunos' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Alunos</h1>
                  <p className="text-gray-500 mb-8">Administre os perfis e emita os certificados.</p>

                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                        <tr>
                          <th className="p-4 font-bold">Aluno</th>
                          <th className="p-4 font-bold">Cursos Matriculados</th>
                          <th className="p-4 font-bold">Ações da Conta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {users.filter(u => u.role === 'aluno').map(user => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="p-4">
                              <p className="font-bold text-gray-900">{user.nome}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </td>
                            <td className="p-4">
                              {user.matriculas.length === 0 ? <span className="text-sm text-gray-400">Nenhum</span> : (
                                <div className="space-y-2">
                                  {user.matriculas.map((m: any, idx: number) => {
                                    const course = courses.find(c => c.id === m.cursoId);
                                    return (
                                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100">
                                        <div className="text-xs">
                                          <p className="font-bold text-gray-800">{course?.titulo}</p>
                                          <p className="text-gray-500">Status: {m.status} | Progresso: {m.progresso || 0}%</p>
                                        </div>
                                        {m.status === 'Confirmado' && (m.progresso || 0) < 100 && (
                                          <button onClick={() => handleIssueCertificate(m.enrollment_id)} className="p-1.5 bg-accent/20 text-accent rounded hover:bg-accent hover:text-primary transition-colors" title="Liberar Certificado (100%)">
                                            <Award size={14} />
                                          </button>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </td>
                            <td className="p-4 align-top">
                              <button onClick={() => handleResetPassword(user.id)} className="text-sm font-bold text-primary bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200">
                                Enviar Link de Reset
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
