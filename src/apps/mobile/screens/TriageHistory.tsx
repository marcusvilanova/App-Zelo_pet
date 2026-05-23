import React, { useEffect, useState } from 'react';
import { AsyncStorage } from '../../../packages/shared/async-storage';
import { ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../components/Skeleton';
import { Triage } from '../../../packages/shared/mock-data';

export default function TriageHistory() {
  const [history, setHistory] = useState<Triage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await AsyncStorage.getItem('@zelopet_triages');
        if (data) {
          setHistory(JSON.parse(data).reverse());
        }
      } catch (e) {
        console.error('Failed to load history', e);
      } finally {
        // Simulate network delay
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-slate-50 relative z-10">
      <header className="mb-8 flex items-center space-x-4">
        <Link to="/mobile/triage" className="p-2 bg-white rounded-lg border border-slate-200">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold font-sans text-slate-900">Suas Triagens</h1>
          <p className="text-xs text-slate-500 font-medium">Histórico de relatos enviados</p>
        </div>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full rounded-xl bg-white" />
          <Skeleton className="h-28 w-full rounded-xl bg-white" />
          <Skeleton className="h-28 w-full rounded-xl bg-white" />
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Nenhum histórico</h2>
            <p className="text-slate-500 text-sm mt-1">Você ainda não enviou nenhum relato.</p>
          </div>
          <Link to="/mobile/triage" className="px-6 py-2 mt-4 bg-blue-600 text-white font-bold rounded-lg shadow-sm">
            Fazer Nova Triagem
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((triage, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-900">{triage.petName}</h3>
                  <p className="text-xs text-slate-500 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(triage.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  triage.urgencyScore > 75 
                    ? 'bg-red-50 text-red-600' 
                    : triage.urgencyScore > 40 
                      ? 'bg-amber-50 text-amber-600' 
                      : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {triage.urgencyScore > 75 ? 'Urgente' : triage.urgencyScore > 40 ? 'Atenção' : 'Normal'}
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3 border-t border-slate-100 pt-3 opacity-90 line-clamp-2">
                "{triage.symptoms}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
