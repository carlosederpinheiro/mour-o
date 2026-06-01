import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  LayoutDashboard, Users, FileText, Settings, Bell,
  Search, LogOut, TrendingUp, Clock, CheckCircle2,
  Briefcase, ChevronDown, Menu, X, AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', emAndamento: 4, concluidos: 3 },
  { name: 'Fev', emAndamento: 7, concluidos: 5 },
  { name: 'Mar', emAndamento: 5, concluidos: 8 },
  { name: 'Abr', emAndamento: 12, concluidos: 6 },
  { name: 'Mai', emAndamento: 9, concluidos: 10 },
  { name: 'Jun', emAndamento: 15, concluidos: 12 },
];

const recentTasks = [
  { id: 1, title: 'Análise de Viabilidade - Indústria X', status: 'Em progresso', time: 'Há 2 horas', icon: <Clock className="w-4 h-4 text-accent" /> },
  { id: 2, title: 'Aprovação de Laudo SUFRAMA', status: 'Concluído', time: 'Há 5 horas', icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
  { id: 3, title: 'Revisão Tributária - Cliente Y', status: 'Pendente', time: 'Ontem', icon: <AlertCircle className="w-4 h-4 text-yellow-400" /> },
  { id: 4, title: 'Reunião de Alinhamento de Projetos', status: 'Concluído', time: 'Ontem', icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    navigate('/portal');
  };

  return (
    <div className="min-h-screen bg-secondary flex font-sans text-white overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary border-r border-white/5 transition-transform duration-300 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold whitespace-nowrap">
              Mourão <span className="text-accent">Dash</span>
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-accent mx-auto">M</h1>
          )}
          <button 
            className="lg:hidden text-white/50 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Visão Geral" active isOpen={isSidebarOpen} />
          <NavItem icon={<Briefcase />} label="Projetos Fiscais" isOpen={isSidebarOpen} />
          <NavItem icon={<Users />} label="Clientes" isOpen={isSidebarOpen} />
          <NavItem icon={<FileText />} label="Relatórios" isOpen={isSidebarOpen} />
          <NavItem icon={<Settings />} label="Configurações" isOpen={isSidebarOpen} />
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className={`flex items-center gap-3 text-white/50 hover:text-accent transition-colors w-full p-2 rounded-lg hover:bg-white/5 ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-primary/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 sm:px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 -ml-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black/20 border border-white/5 rounded-xl">
              <Search className="w-4 h-4 text-white/50" />
              <input 
                type="text" 
                placeholder="Buscar projetos, clientes..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative p-2 text-white/70 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-primary"></span>
            </button>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">Carlos Mendes</p>
                <p className="text-xs text-white/50">Consultor Sênior</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent font-bold">
                CM
              </div>
              <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-accent transition-colors" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Welcome Message */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Olá, Carlos! 👋</h2>
              <p className="text-white/70">Aqui está o resumo das suas atividades e projetos de consultoria hoje.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <KpiCard 
                title="Projetos Ativos" 
                value="24" 
                trend="+12%" 
                trendUp={true}
                icon={<Briefcase className="w-6 h-6 text-accent" />}
              />
              <div className="bg-primary/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                  <FileText className="w-16 h-16 text-accent" />
                </div>
                <div className="relative z-10">
                  <p className="text-white/60 text-sm font-medium mb-1">Laudos em Análise</p>
                  <h3 className="text-3xl font-bold text-white mb-2">8</h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-400">
                    <Clock className="w-4 h-4" />
                    <span>Aguardando SUFRAMA</span>
                  </div>
                </div>
              </div>
              <KpiCard 
                title="Novos Clientes (Mês)" 
                value="5" 
                trend="+2" 
                trendUp={true}
                icon={<Users className="w-6 h-6 text-accent" />}
              />
              <KpiCard 
                title="Taxa de Aprovação" 
                value="98%" 
                trend="+1%" 
                trendUp={true}
                icon={<TrendingUp className="w-6 h-6 text-accent" />}
              />
            </div>

            {/* Charts & Lists Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Chart */}
              <div className="lg:col-span-2 bg-primary/40 border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Evolução de Projetos</h3>
                    <p className="text-sm text-white/50">Andamento vs. Concluídos nos últimos 6 meses</p>
                  </div>
                  <select className="bg-black/20 border border-white/10 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-accent">
                    <option>Este Ano</option>
                    <option>Ano Passado</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorEmAndamento" x1="0" y1="0" x2="0" y2="1">
                          <stop key="emAndamento-start" offset="5%" stopColor="#6adad9" stopOpacity={0.3}/>
                          <stop key="emAndamento-end" offset="95%" stopColor="#6adad9" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorConcluidos" x1="0" y1="0" x2="0" y2="1">
                          <stop key="concluidos-start" offset="5%" stopColor="#102c37" stopOpacity={0.5}/>
                          <stop key="concluidos-end" offset="95%" stopColor="#102c37" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                      <XAxis key="xaxis" dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis key="yaxis" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        key="tooltip"
                        contentStyle={{ backgroundColor: '#002626', borderColor: '#ffffff20', color: '#fff', borderRadius: '8px' }}
                        itemStyle={{ color: '#6adad9' }}
                      />
                      <Area key="area-emAndamento" type="monotone" dataKey="emAndamento" name="Em Andamento" stroke="#6adad9" strokeWidth={3} fillOpacity={1} fill="url(#colorEmAndamento)" />
                      <Area key="area-concluidos" type="monotone" dataKey="concluidos" name="Concluídos" stroke="#4a8c8c" strokeWidth={2} fillOpacity={1} fill="url(#colorConcluidos)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-primary/40 border border-white/5 rounded-2xl p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Atividades Recentes</h3>
                  <button className="text-accent text-sm hover:underline">Ver todas</button>
                </div>
                
                <div className="flex-1 space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                      <div className="mt-1 bg-black/20 p-2 rounded-lg">
                        {task.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-white/50">{task.status}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span className="text-xs text-white/50">{task.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-3 border border-white/10 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                  Adicionar Nova Tarefa
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Components Helpers

function NavItem({ icon, label, active = false, isOpen = true }: { icon: React.ReactNode, label: string, active?: boolean, isOpen?: boolean }) {
  return (
    <a href="#" className={`
      flex items-center gap-3 p-3 rounded-xl transition-all
      ${active ? 'bg-accent/10 text-accent font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}
      ${!isOpen && 'justify-center'}
    `}>
      <div className={`${active ? 'text-accent' : ''}`}>
        {icon}
      </div>
      {isOpen && <span>{label}</span>}
      {isOpen && active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"></div>
      )}
    </a>
  );
}

function KpiCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-primary/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-accent/30 transition-colors">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-lg ${trendUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          <TrendingUp className={`w-3 h-3 ${!trendUp && 'rotate-180'}`} />
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-white/60 text-sm font-medium">{title}</p>
      </div>
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
    </div>
  );
}