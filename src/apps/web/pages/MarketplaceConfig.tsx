import { useState, useEffect } from 'react';
import { Store, Plus, CheckCircle2, Factory, Link as LinkIcon, RefreshCcw, ShieldCheck, ArrowLeft, DownloadCloud, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';
import { Skeleton } from '../../../components/Skeleton';

const PROVIDERS = [
  { id: 1, name: 'Zoetis Connect', desc: 'Integração de vacinas (V10, Raiva) e linha dermatológica (Apoquel).', status: 'Ativo', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 2, name: 'Virbac Auto-Replenish', desc: 'Reposição automática de itens críticos de farmácia e odontologia.', status: 'Sincronizando', icon: RefreshCcw, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' },
  { id: 3, name: 'Elanco B2B Hub', desc: 'Catálogo completo de antiparasitários e terapêuticos.', status: 'Desconectado', icon: LinkIcon, color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-200' },
  { id: 4, name: 'MSD Saúde Animal API', desc: 'Linha Bravecto e biológicos com sincronização em tempo real.', status: 'Ativo', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
];

export default function MarketplaceConfig() {
  const [providers, setProviders] = useState(PROVIDERS);
  const [disconnectId, setDisconnectId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const feedback = useSystemFeedback();

  useEffect(() => {
    // Initial load simulation
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleConnection = (id: number) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        if (p.status === 'Desconectado') {
          // Trigger mock sync
          setTimeout(() => {
             // 10% chance error
             if (Math.random() > 0.9) {
               feedback.error(`Falha ao conectar com a API da ${p.name}.`);
               setProviders(current => current.map(currP => currP.id === id ? { ...currP, status: 'Desconectado', icon: LinkIcon, color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-200' } : currP));
             } else {
               feedback.success(`Sincronização com ${p.name} estabelecida com sucesso.`);
               setProviders(current => current.map(currP => currP.id === id ? { ...currP, status: 'Ativo', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' } : currP));
             }
          }, 2000);
          return { ...p, status: 'Sincronizando', icon: RefreshCcw, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
        } else {
          feedback.info(`Conexão com ${p.name} encerrada.`, () => {
             // Undo
             setProviders(current => current.map(currP => currP.id === id ? { ...currP, status: 'Ativo', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' } : currP));
             feedback.success(`Reconexão com ${p.name} restaurada.`);
          });
          return { ...p, status: 'Desconectado', icon: LinkIcon, color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-200' };
        }
      }
      return p;
    }));
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-8 space-y-6">
        <Skeleton className="h-8 w-1/4 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/web/estoque" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Marketplace B2B</h1>
          <p className="text-slate-500 text-sm mt-1">Conecte-se aos principais fornecedores para automação de compras direct-to-clinic.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map(provider => {
          const Icon = provider.icon;
          return (
            <div key={provider.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${provider.bg} ${provider.border} ${provider.color}`}>
                    <Store className="w-6 h-6" />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${provider.bg} ${provider.color} border ${provider.border}`}>
                    <Icon className={`w-3 h-3 mr-1.5 ${provider.status === 'Sincronizando' ? 'animate-spin' : ''}`} />
                    {provider.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{provider.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed min-h-[40px]">{provider.desc}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                {provider.status === 'Ativo' ? (
                  <div className="flex flex-col">
                    {disconnectId === provider.id ? (
                      <div className="flex items-center space-x-2 animate-in fade-in">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-2">Tem certeza?</span>
                        <button onClick={() => setDisconnectId(null)} className="text-slate-500 hover:text-slate-700 text-xs font-bold px-2 py-1 bg-slate-100 rounded">Cancelar</button>
                        <button onClick={() => { toggleConnection(provider.id); setDisconnectId(null); }} className="text-red-600 hover:text-white hover:bg-red-600 text-xs font-bold px-2 py-1 rounded transition-colors">Sim, Desconectar</button>
                      </div>
                    ) : (
                      <button onClick={() => setDisconnectId(provider.id)} className="text-slate-500 hover:text-red-600 text-xs font-bold transition">
                        Desconectar API
                      </button>
                    )}
                  </div>
                ) : provider.status === 'Sincronizando' ? (
                   <span className="text-amber-600 text-xs font-bold flex items-center">
                    Negociando chaves EDI...
                  </span>
                ) : (
                  <button onClick={() => toggleConnection(provider.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm w-full md:w-auto text-center">
                    Assinar & Conectar
                  </button>
                )}
                
                {provider.status === 'Ativo' && (
                  <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition shadow-sm flex items-center">
                    <DownloadCloud className="w-4 h-4 mr-2 text-slate-400" /> Baixar Catálogo 
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white mt-8 overflow-hidden relative shadow-lg">
         <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none text-white">
           <Factory className="w-64 h-64" />
         </div>
         <div className="relative z-10 max-w-xl">
           <h2 className="text-2xl font-bold tracking-tight mb-2">Acelerador de Reposição</h2>
           <p className="text-slate-300 text-sm mb-6 leading-relaxed">
             Nosso sistema de IA prevê a demanda de medicamentos da sua clínica com base no histórico de prescrições e sazonalidade de doenças, solicitando orçamentos automaticamente quando o estoque mínimo é atingido.
           </p>
           <button className="bg-white text-blue-900 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition shadow flex items-center">
             <Play className="w-4 h-4 mr-2" />
             Assistir Demo do Fluxo B2B
           </button>
         </div>
      </div>
    </div>
  );
}
