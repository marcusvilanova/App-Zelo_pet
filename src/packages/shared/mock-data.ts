import maxImage from '../../assets/images/regenerated_image_1779482883479.jpg';

export interface Pet {
  id: string;
  name: string;
  species: 'Canine' | 'Feline';
  breed: string;
  age: string;
  weight: string;
  status: 'Em dia' | 'Atrasado';
  healthScore: number;
  medicationAdherence: number;
  history: MedicalEvent[];
  medications: Medication[];
  image?: string;
  upcomingReturns?: { id: string; date: string; reason: string; }[];
  healthScoreHistory?: { month: string; score: number; }[];
  plan?: 'Zelo Basic' | 'Zelo Premium' | 'Avulso';
  ltv?: number; // Lifetime Value in local currency
  wearableData?: {
    lastSync: string;
    battery: number;
    dailyActivityGoal: number; // minutes
    dailyActivityCurrent: number; // minutes
    sleepQuality: 'Excelente' | 'Boa' | 'Irregular';
    avgHeartRate: number; // bpm
  }
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  startDate: string;
  endDate: string;
  status: 'Ativo' | 'Concluído';
}

export interface MedicalEvent {
  id: string;
  date: string;
  type: 'Preventivo' | 'Terapêutico' | 'Bem-estar';
  title: string;
  description: string;
}

export interface Triage {
  id: string;
  petId: string;
  petName: string;
  tutorName: string;
  date: string;
  symptoms: string;
  urgencyScore: number;
  risk: 'Alto' | 'Médio' | 'Baixo';
  status: 'Pendente' | 'Analisado';
}

export const MOCK_PETS: Pet[] = [
  {
    id: '1',
    name: 'Rex',
    species: 'Canine',
    breed: 'Golden Retriever',
    age: '3 anos',
    weight: '30 kg',
    status: 'Em dia',
    healthScore: 92,
    medicationAdherence: 95,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300',
    history: [
      { id: 'e1', date: '2024-05-10', type: 'Preventivo', title: 'Vacina V10', description: 'Reforço anual aplicado.' },
      { id: 'e2', date: '2024-04-15', type: 'Terapêutico', title: 'Tratamento Otite', description: 'Ouvido esquerdo, gotas por 7 dias.' },
      { id: 'e3', date: '2024-02-20', type: 'Bem-estar', title: 'Banho e Tosa', description: 'Pacote premium regular.' },
    ],
    medications: [
      { id: 'm1', name: 'Simparic 20mg', dosage: '1 comprimido a cada 35 dias', startDate: '2024-05-15', endDate: 'Contínuo', status: 'Ativo' },
      { id: 'm2', name: 'Otomax', dosage: '3 gotas ouvido esquerdo 2x ao dia', startDate: '2024-04-15', endDate: '2024-04-22', status: 'Concluído' }
    ],
    upcomingReturns: [
      { id: 'u1', date: '2024-06-15', reason: 'Retorno Otite' },
      { id: 'u2', date: '2024-11-10', reason: 'Vacina Antirrábica' }
    ],
    healthScoreHistory: [
      { month: 'Dez', score: 85 },
      { month: 'Jan', score: 86 },
      { month: 'Fev', score: 87 },
      { month: 'Mar', score: 89 },
      { month: 'Abr', score: 91 },
      { month: 'Mai', score: 92 }
    ],
    plan: 'Zelo Premium',
    ltv: 2450.00,
    wearableData: {
      lastSync: 'Alguns minutos atrás',
      battery: 84,
      dailyActivityGoal: 120,
      dailyActivityCurrent: 95,
      sleepQuality: 'Excelente',
      avgHeartRate: 72
    }
  },
  {
    id: '2',
    name: 'Luna',
    species: 'Feline',
    breed: 'Siamês',
    age: '2 anos',
    weight: '4 kg',
    status: 'Atrasado',
    healthScore: 78,
    medicationAdherence: 60,
    image: maxImage,
    history: [
      { id: 'e4', date: '2023-11-10', type: 'Preventivo', title: 'Vacina Quíntupla', description: 'Atrasada para renovação.' }
    ],
    medications: [
      { id: 'm3', name: 'Bravecto Gatos', dosage: '1 pipeta a cada 12 semanas', startDate: '2023-11-10', endDate: '2024-02-10', status: 'Concluído' }
    ],
    upcomingReturns: [
      { id: 'u3', date: '2024-05-25', reason: 'Vacina Quíntupla (Atrasada)' }
    ],
    healthScoreHistory: [
      { month: 'Dez', score: 95 },
      { month: 'Jan', score: 92 },
      { month: 'Fev', score: 90 },
      { month: 'Mar', score: 85 },
      { month: 'Abr', score: 80 },
      { month: 'Mai', score: 78 }
    ],
    plan: 'Avulso',
    ltv: 450.00,
    wearableData: {
      lastSync: 'Há 2 horas',
      battery: 15,
      dailyActivityGoal: 90,
      dailyActivityCurrent: 30,
      sleepQuality: 'Irregular',
      avgHeartRate: 110
    }
  }
];

// Let since we will mutate during the session for mock reactivity
export let MOCK_TRIAGES: Triage[] = [
  { id: 't1', petId: '2', petName: 'Luna', tutorName: 'Maria Silva', date: '2024-05-22T08:30:00Z', symptoms: 'Vômito contínuo há 2 horas, não come nada.', urgencyScore: 85, risk: 'Alto', status: 'Pendente' },
  { id: 't2', petId: '1', petName: 'Rex', tutorName: 'João Souza', date: '2024-05-21T14:00:00Z', symptoms: 'Coceira leve nas orelhas.', urgencyScore: 30, risk: 'Baixo', status: 'Pendente' }
];

export const addTriage = (triage: Omit<Triage, 'id' | 'date'>) => {
  const newTriage: Triage = {
    ...triage,
    id: `t${Date.now()}`,
    date: new Date().toISOString(),
  };
  MOCK_TRIAGES = [newTriage, ...MOCK_TRIAGES];
  return newTriage;
};
