import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, PieChart as PieIcon, Activity, ArrowUpRight, ArrowDownRight, Users, CreditCard } from 'lucide-react';

const REVENUE_DATA = [
  { name: 'Jan', revenue: 120000, overhead: 70000 },
  { name: 'Fev', revenue: 135000, overhead: 72000 },
  { name: 'Mar', revenue: 142000, overhead: 71000 },
  { name: 'Abr', revenue: 155000, overhead: 75000 },
  { name: 'Mai', revenue: 168000, overhead: 78000 },
  { name: 'Jun', revenue: 185000, overhead: 80000 },
];

const REVENUE_BREAKDOWN = [
  { name: 'Planos Preventivos', value: 45, color: '#4f46e5' }, // blue-600
  { name: 'Consultas (Avulso)', value: 20, color: '#0ea5e9' }, // sky-500
  { name: 'Exames & Imagem', value: 25, color: '#10b981' }, // emerald-500
  { name: 'Farmácia B2C', value: 10, color: '#f59e0b' }, // amber-500
];

export default function PracticeProfitability() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Indicadores de Negócio & ERP</h1>
        <p className="text-slate-500 text-sm mt-1">Gestão de margens, break-even e análise de categorias de serviços.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm" title="Valor total de vendas de produtos e serviços no mês vigente.">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Receita Bruta (Mês)</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">R$ 185.000</div>
          <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +10.1% vs prev.
          </p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm" title="Porcentagem de lucro após dedução de todos os custos variáveis e fixos (Opex).">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Margem Líquida</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">56.7%</div>
           <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +2.4% vs prev.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm" title="Despesas operacionais da clínica (Operational Expenditure) como aluguel, folha base e infraestrutura.">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custo Opex</span>
            <TrendingUp className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">R$ 80.000</div>
           <p className="text-xs font-bold text-red-600 mt-2 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +2.5% vs prev.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm" title="Lifetime Value: valor médio que um tutor gasta ao longo do tempo como cliente ativo.">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ticket Médio (LTV)</span>
            <CreditCard className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">R$ 380</div>
           <p className="text-xs font-bold text-emerald-600 mt-2 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12.0% vs prev.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-6 flex items-center">
            <TrendingUp className="w-4 h-4 text-slate-400 mr-2" /> Evolução de Receita vs Custos
          </h2>
          <div className="w-full h-72 hidden md:block">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(val) => `R$${val/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Receita" />
                <Bar dataKey="overhead" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Custos / Overhead" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full h-48 md:hidden flex items-center justify-center bg-slate-50 rounded-lg text-slate-400 text-sm">
            Gráfico disponível em telas maiores
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
             <h2 className="text-sm font-bold text-slate-900 flex items-center">
               <PieIcon className="w-4 h-4 text-slate-400 mr-2" /> Distribuição YoY
             </h2>
          </div>
          
          <div className="relative w-48 h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={REVENUE_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {REVENUE_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900">45%</span>
              <span className="text-[10px] uppercase font-bold text-slate-500">Planos</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            {REVENUE_BREAKDOWN.map(item => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
