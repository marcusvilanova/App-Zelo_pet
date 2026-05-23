import { useParams, Link } from 'react-router-dom';
import { MOCK_PETS } from '../../../packages/shared/mock-data';
import { ArrowLeft, Activity, Heart, Info, Clock, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';

const mockHealthData = [
  { day: 'Seg', score: 85 },
  { day: 'Ter', score: 88 },
  { day: 'Qua', score: 92 },
  { day: 'Qui', score: 81 },
  { day: 'Sex', score: 95 },
  { day: 'Sáb', score: 98 },
  { day: 'Dom', score: 99 },
];

export default function PetProfile() {
  const { id } = useParams();
  const pet = MOCK_PETS.find(p => p.id === id) || MOCK_PETS[0];
  const { info } = useSystemFeedback();

  const handleViewAll = () => {
    info('Carregando histórico completo...');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-8">
      {/* Header */}
      <header className="flex items-center p-6 bg-transparent">
        <Link to="/mobile" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mr-4 border border-slate-100 text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold font-sans text-slate-900 leading-tight">Olá, Maria!</h1>
          <p className="text-sm text-slate-500 font-medium">Informações de {pet.name}</p>
        </div>
      </header>

      {/* Main Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-blue-900/5 relative overflow-hidden border border-slate-50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
          
          <div className="flex space-x-5 items-center mb-6 relative z-10">
            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-sm border border-slate-100 shrink-0">
               <img src={pet.image || "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300"} alt={pet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{pet.name}</h2>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500 mb-3">
                <span className="bg-slate-100 px-2 py-1 rounded-md">{pet.age}</span>
                <span className="bg-slate-100 px-2 py-1 rounded-md">{pet.species === 'Canine' ? 'Macho' : 'Fêmea'}</span>
                <span className="bg-slate-100 px-2 py-1 rounded-md">{pet.weight}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-4 flex items-center relative z-10 border border-slate-200">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 mr-3 shadow-sm shrink-0">
               <Clock className="w-5 h-5" />
             </div>
             <p className="text-sm font-bold text-slate-700 leading-tight">
               Você passeou <span className="text-blue-600">40min</span> hoje. A meta é <span className="text-slate-900">60min</span>.
             </p>
          </div>
        </div>
      </div>

      {/* Tiles */}
      <div className="px-6 grid grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-[1.5rem] p-4 flex flex-col justify-center items-center text-center shadow-sm border border-slate-100">
           <div className="w-10 h-10 rounded-full bg-[#d1fae5] flex items-center justify-center text-[#065f46] mb-2">
             <Activity className="w-5 h-5" />
           </div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Status</span>
           <span className="text-[13px] font-bold text-slate-900">Saudável</span>
        </div>
        
        <div className="bg-white rounded-[1.5rem] p-4 flex flex-col justify-center items-center text-center shadow-sm border border-slate-100">
           <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
             <Heart className="w-5 h-5" />
           </div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">BPM</span>
           <span className="text-[13px] font-bold text-slate-900">112</span>
        </div>

        <div className="bg-white rounded-[1.5rem] p-4 flex flex-col justify-center items-center text-center shadow-sm border border-slate-100">
           <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
             <ArrowLeft className="w-5 h-5 rotate-45" />
           </div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Atividade</span>
           <span className="text-[13px] font-bold text-slate-900">1H/dia</span>
        </div>
      </div>

      {/* Health Chart */}
      <div className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-slate-900">Histórico de Saúde</h3>
          <button onClick={handleViewAll} className="text-xs font-bold text-blue-600 uppercase tracking-widest">Ver Tudo</button>
        </div>
        
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-64">
           {/* Recharts Area Chart */}
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={mockHealthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f52d9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0f52d9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold', color: '#0f52d9' }}
                />
                <Area type="monotone" dataKey="score" stroke="#0f52d9" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
