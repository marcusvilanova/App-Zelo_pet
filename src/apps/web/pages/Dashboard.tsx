import { useState, useEffect } from 'react';
import { MOCK_TRIAGES } from '../../../packages/shared/mock-data';
import { HeartPulse, Star, AlertTriangle, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../components/Skeleton';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { info } = useSystemFeedback();

  useEffect(() => {
    // Simulate initial network fetch
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterClick = () => {
    info('Filtros atualizados.');
  };

  const pendingTriages = MOCK_TRIAGES.filter(t => t.status === 'Pendente');
  
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
        <Skeleton className="h-10 w-1/4 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl bg-slate-800" />
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
        <p className="text-slate-500 text-sm mt-1">Desempenho da clínica em tempo real e alertas de triagem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Retention KPI */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">RETENÇÃO DE PACIENTES</span>
               <span className="text-4xl font-bold tracking-tight text-slate-900">94.2%</span>
             </div>
             <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
               <HeartPulse className="w-5 h-5" />
             </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
            <span className="text-blue-600 font-bold mr-1">+2.4%</span> vs mês anterior
          </div>
        </div>

        {/* NPS KPI */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">NPS DA CLÍNICA</span>
               <span className="text-4xl font-bold tracking-tight text-slate-900">78</span>
             </div>
             <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
               <Star className="w-5 h-5" />
             </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
            <span className="text-blue-600 font-bold mr-1">+4 pts</span> vs mês anterior
          </div>
        </div>

        {/* Active Triage Alerts */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <AlertTriangle className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-800 opacity-50" />
          <div className="relative z-10 flex justify-between items-start">
             <div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">ALERTAS DE TRIAGEM ATIVOS</span>
               <span className="text-4xl font-bold tracking-tight text-white">{pendingTriages.length || 12}</span>
             </div>
          </div>
          <div className="relative z-10 mt-4 flex items-center text-xs text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-white font-bold mr-1">3</span> Prioridade Alta
          </div>
        </div>
      </div>

      <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-lg font-bold tracking-tight text-slate-900">Caixa de Entrada de Triagem</h2>
             <p className="text-sm text-slate-500 mt-1">Alertas de pacientes analisados por IA que requerem atenção.</p>
           </div>
           <button onClick={handleFilterClick} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
             <Filter className="w-4 h-4 mr-2" />
             Filtrar
           </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl border border-slate-100 shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="py-4 px-6">Paciente</th>
                <th className="py-4 px-6">Tipo de Alerta</th>
                <th className="py-4 px-6">Tempo</th>
                <th className="py-4 px-6">Prioridade</th>
                <th className="py-4 px-6 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mr-3">
                      <span className="font-bold text-slate-900 text-xs">Be</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Bella</p>
                      <p className="text-xs text-slate-500">Golden Retriever</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-700">Frequência Cardíaca<br/><span className="text-slate-500">Anormal</span></td>
                <td className="py-4 px-6 text-slate-600">10 min atrás</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600">
                    Alta
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex flex-col items-end">
                    <Link to="/web/triagens" className="text-blue-600 font-bold hover:underline mb-1 whitespace-nowrap">
                      Iniciar Teleconsulta
                    </Link>
                    <Link to="/web/triagens" className="text-blue-600 font-bold hover:underline">
                      Revisar
                    </Link>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mr-3">
                      <span className="font-bold text-slate-900 text-xs">Ma</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Max</p>
                      <p className="text-xs text-slate-500">French Bulldog</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-700">Letargia Detectada</td>
                <td className="py-4 px-6 text-slate-600">45 min atrás</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600">
                    Média
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex flex-col items-end">
                    <Link to="/web/triagens" className="text-blue-600 font-bold hover:underline mb-1 whitespace-nowrap">
                      Iniciar Teleconsulta
                    </Link>
                    <Link to="/web/triagens" className="text-blue-600 font-bold hover:underline">
                      Revisar
                    </Link>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mr-3">
                      <span className="font-bold text-slate-900 text-xs">Lu</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">Luna</p>
                      <p className="text-xs text-slate-500">Siamese Cat</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-700">Medicação Perdida</td>
                <td className="py-4 px-6 text-slate-600">2 h atrás</td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                    Baixa
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex flex-col items-end">
                    <Link to="/web/triagens" className="text-blue-600 font-bold hover:underline mb-1 whitespace-nowrap">
                      Iniciar Teleconsulta
                    </Link>
                    <Link to="/web/triagens" className="text-blue-600 font-bold hover:underline">
                      Revisar
                    </Link>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
