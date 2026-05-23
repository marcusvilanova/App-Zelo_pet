import { useState } from 'react';
import { MOCK_TRIAGES } from '../../../packages/shared/mock-data';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function TriageInbox() {
  const [triages, setTriages] = useState(MOCK_TRIAGES);

  const markAsReviewed = (id: string) => {
    setTriages(prev => prev.map(t => t.id === id ? { ...t, status: 'Analisado' } : t));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inbox de Triagem</h1>
        <p className="text-slate-500 text-sm mt-1">Handoff em tempo real do App Zelo Pet.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 space-x-2">
           <button className="px-4 py-2 text-sm font-bold text-slate-900 bg-white rounded-lg shadow-sm border border-slate-200">
             Pendentes ({triages.filter(t => t.status === 'Pendente').length})
           </button>
           <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 rounded-lg">
             Analisados ({triages.filter(t => t.status === 'Analisado').length})
           </button>
        </div>

        <div className="divide-y divide-slate-100">
          {triages.map(triage => (
            <div key={triage.id} className={`p-6 flex items-start space-x-6 ${triage.status === 'Analisado' ? 'opacity-60 saturate-50' : 'bg-white'}`}>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-slate-900">{triage.petName} <span className="text-sm font-normal text-slate-500">Tutor: {triage.tutorName}</span></h3>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${triage.risk === 'Alto' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                      Score AI: {triage.urgencyScore}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{new Date(triage.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                
                <p className="text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-100 font-medium mb-4">
                  "{triage.symptoms}"
                </p>

                {triage.status === 'Pendente' && (
                  <div className="flex space-x-3">
                    <button onClick={() => markAsReviewed(triage.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Marcar Revisado
                    </button>
                    <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                      Iniciar Teleorientação
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
