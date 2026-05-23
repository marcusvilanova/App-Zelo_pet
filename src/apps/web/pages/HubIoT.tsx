import { ActivitySquare, Watch, HeartPulse, Moon, Zap, AlertCircle } from 'lucide-react';
import { MOCK_PETS } from '../../../packages/shared/mock-data';
import { Link } from 'react-router-dom';

export default function HubIoT() {
  const petsComIoT = MOCK_PETS.filter(p => p.wearableData);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hub IoT / Wearables</h1>
        <p className="text-slate-500 text-sm mt-1">Telemetria em tempo real das Coleiras Inteligentes Zelo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 flex justify-end items-start opacity-20">
             <Watch className="w-16 h-16" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <Watch className="w-6 h-6 text-blue-400" />
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1 relative z-10">Dispositivos Conectados (Live)</p>
          <h3 className="text-2xl font-bold relative z-10">142</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Alertas Preditivos (Hoje)</p>
          <h3 className="text-2xl font-bold text-slate-900">3 <span className="text-sm font-normal text-slate-500">Casos</span></h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <ActivitySquare className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Acurácia da IA nas Previsões</p>
          <h3 className="text-2xl font-bold text-slate-900">92.4%</h3>
        </div>
      </div>

      <h2 className="text-sm font-bold text-slate-900 mb-4 mt-8">Monitoramento Contínuo (Pacientes)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {petsComIoT.map(pet => (
          <div key={pet.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden flex flex-col h-full">
            {pet.wearableData?.avgHeartRate && pet.wearableData.avgHeartRate > 100 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg animate-pulse z-10">
                Alerta
              </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0 border border-slate-200">
                  <span className="text-xl font-bold text-slate-600">{pet.name[0]}</span>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900 truncate">{pet.name}</h3>
                  <p className="text-[10px] font-mono text-slate-400">SYNC: {pet.wearableData?.lastSync}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 p-2 text-center rounded-xl border border-slate-100">
                <HeartPulse className="w-4 h-4 text-rose-500 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">{pet.wearableData?.avgHeartRate}</span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase">BPM</span>
              </div>
              
              <div className="bg-slate-50 p-2 text-center rounded-xl border border-slate-100">
                <Zap className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900">{pet.wearableData?.dailyActivityCurrent}<span className="text-[9px] text-slate-400">m</span></span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase">Ativ.</span>
              </div>

              <div className="bg-slate-50 p-2 text-center rounded-xl border border-slate-100">
                <Moon className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="block text-xs font-bold text-slate-900 truncate px-1" title={pet.wearableData?.sleepQuality}>{pet.wearableData?.sleepQuality}</span>
                <span className="block text-[8px] font-bold text-slate-400 uppercase">Sono</span>
              </div>
            </div>

            <div className="mt-auto">
               <Link to={`/web/pacientes/${pet.id}`} className="w-full flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition">
                 Consultar Histórico
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
