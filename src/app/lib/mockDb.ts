export type UserStatus = 'Pendente' | 'Aguardando' | 'Confirmado';

export interface Matricula {
  cursoId: string;
  status: UserStatus;
  progresso: number; // 0 a 100
  comprovanteUrl?: string; // Para o admin ver que o arquivo foi enviado
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  senha?: string;
  matriculas: Matricula[];
  role: 'aluno' | 'admin';
}

export interface Aula {
  id: string;
  data: string;
  tema: string;
  status: string; // 'Agendado' | 'Concluído' | 'Próxima Aula'
  prof: string;
}

export interface Course {
  id: string;
  titulo: string;
  prof: string;
  valor: number;
  imagem: string;
  descricao: string;
  datas: string;
  horario: string;
  local: string;
  desconto: string;
  status: 'Rascunho' | 'Aberto' | 'Encerrado';
  aulas: Aula[];
}

const INITIAL_COURSES: Course[] = [
  {
    id: 'microeconomia',
    titulo: 'MICROECONOMIA NA PRODUÇÃO',
    prof: 'Assis Mourão',
    valor: 200,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhD-mLaC_qoL8mhNEBXf0XgxJmyXXYdrqz8Y2LTXAh475j8ApehD1u9BeI&s=10',
    descricao: 'Professor Assis Mourão traz uma metodologia aplicada à realidade de Manaus. Transforme conceitos econômicos em ferramentas vitais para a tomada de decisão empresarial.',
    datas: 'Sábados contínuos: 04 e 11 de julho',
    horario: '08h às 15h (intervalo para almoço de 11h às 13h)',
    local: 'Prédio Mourão, Rua Jorge Veiga, 7, Cj. Eldorado - Manaus',
    desconto: 'Desconto: R$ 100,00 p/ Economistas/Universitários',
    status: 'Aberto',
    aulas: [
      { id: '1', data: '04 de Julho, 08:00 - 15:00', tema: 'Introdução e Conceitos', status: 'Agendado', prof: 'Assis Mourão' },
      { id: '2', data: '11 de Julho, 08:00 - 15:00', tema: 'Aplicações no Polo', status: 'Agendado', prof: 'Assis Mourão' }
    ]
  },
  {
    id: 'custos',
    titulo: 'CUSTOS INDUSTRIAIS APLICADOS AO CHÃO DE FÁBRICA',
    prof: 'Marcelo Miranda',
    valor: 200,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlRVJmZ9xEwVvOWU_Y4LVWCgVLod4Vd4TuilnGNpkFvg&s=10',
    descricao: 'Ministrado por Marcelo Miranda. Aprenda na prática como estruturar, calcular e otimizar os custos reais dentro do ambiente produtivo industrial.',
    datas: '27 de julho (seg) à 29 de julho (qua)',
    horario: '18h às 21h',
    local: 'Prédio Mourão, Rua Jorge Veiga, 7, Cj. Eldorado - Manaus',
    desconto: 'Desconto: R$ 100,00 p/ Estudantes/Economistas',
    status: 'Aberto',
    aulas: [
      { id: '1', data: '27 de Julho, 18:00 - 21:00', tema: 'Fundamentos de Custos', status: 'Agendado', prof: 'Marcelo Miranda' },
      { id: '2', data: '28 de Julho, 18:00 - 21:00', tema: 'Aplicação na Indústria', status: 'Agendado', prof: 'Marcelo Miranda' },
      { id: '3', data: '29 de Julho, 18:00 - 21:00', tema: 'Casos Práticos', status: 'Agendado', prof: 'Marcelo Miranda' }
    ]
  }
];

export const mockDb = {
  initialize: () => {
    if (!localStorage.getItem('mourao_courses')) {
      localStorage.setItem('mourao_courses', JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem('mourao_users')) {
      localStorage.setItem('mourao_users', JSON.stringify([{
        id: 'admin-1',
        nome: 'Administrador Mourão',
        email: 'admin@mourao.com',
        telefone: '',
        senha: '123456',
        role: 'admin',
        matriculas: []
      }]));
    }
  },

  getCourses: (): Course[] => {
    return JSON.parse(localStorage.getItem('mourao_courses') || '[]');
  },

  saveCourses: (courses: Course[]) => {
    localStorage.setItem('mourao_courses', JSON.stringify(courses));
  },

  getUsers: (): User[] => {
    return JSON.parse(localStorage.getItem('mourao_users') || '[]');
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem('mourao_users', JSON.stringify(users));
  },

  getUserByEmail: (email: string): User | undefined => {
    const users = mockDb.getUsers();
    return users.find(u => u.email === email);
  },

  saveUser: (user: User) => {
    const users = mockDb.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    mockDb.saveUsers(users);
  }
};
