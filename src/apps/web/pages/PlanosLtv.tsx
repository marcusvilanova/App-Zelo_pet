import { ShieldCheck, TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_PETS } from '../../../packages/shared/mock-data';

const mrrData = [
  { name: 'Jan', mrr: 95 }, { name: 'Fev', mrr: 108 }, { name: 'Mar', mrr: 120 }, { name: 'Abr', mrr: 135 }, { name: 'Mai', mrr: 151 }
];

export default function PlanosLtv() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Planos & LTV</h1>
        <p className="text-slate-500 text-sm mt-1">Gestão de assinaturas Zelo Premium e Lifetime Value dos pacientes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+12%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">MRR (Receita Recorrente)</p>
          <h3 className="text-2xl font-bold text-slate-900">R$ 151k</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+24</span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Assinantes Ativos</p>
          <h3 className="text-2xl font-bold text-slate-900">842</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">+8%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">LTV Médio (Por Pet)</p>
          <h3 className="text-2xl font-bold text-slate-900">R$ 2.450</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-rose-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">-1.2%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Taxa de Churn</p>
          <h3 className="text-2xl font-bold text-slate-900">2.4%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-6">Crescimento do MRR (R$ Milhares)</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrData}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4">Top LTV - Pacientes</h2>
          <div className="space-y-4">
            {MOCK_PETS.map(pet => (
              <div key={pet.id} className="flex justify-between items-center border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-slate-900">{pet.name}</p>
                  <p className="text-xs text-slate-500">{pet.plan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">R$ {pet.ltv?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
