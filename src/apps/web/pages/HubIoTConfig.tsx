import { useState, useEffect } from 'react';
import { Watch, Wifi, Battery, AlertTriangle, ShieldCheck, Bluetooth, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';
import { Skeleton } from '../../../components/Skeleton';

export default function HubIoTConfig() {
  const [isLoading, setIsLoading] = useState(true);
  const [pairingStatus, setPairingStatus] = useState<'idle' | 'searching' | 'pairing' | 'success'>('idle');
  const [batteryThreshold, setBatteryThreshold] = useState(15);
  const [heartRateAlert, setHeartRateAlert] = useState(true);
  const feedback = useSystemFeedback();

  useEffect(() => {
    // Simulate initial network fetch
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const startPairing = () => {
    setPairingStatus('searching');
    setTimeout(() => {
      setPairingStatus('pairing');
      setTimeout(() => {
        // Simulation error chance
        if (Math.random() > 0.9) {
           feedback.error('Falha durante o protocolo de pareamento Bluetooth.');
           setPairingStatus('idle');
           return;
        }
        setPairingStatus('success');
        feedback.success('Novo dispositivo IoT conectado e autenticado!', () => {
             // Undo
             feedback.info('Dispositivo desconectado.');
             setPairingStatus('idle');
        });
        setTimeout(() => {
          setPairingStatus('idle');
        }, 3000);
      }, 2500);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
          <Skeleton className="h-48 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/web/iot" className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Configuração de Wearables</h1>
          <p className="text-slate-500 text-sm mt-1">Acople novos dispositivos Zelo Smart Collar e ajuste limiares de alerta.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pareamento */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center mb-2">
            <Bluetooth className="w-5 h-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-bold text-slate-900">Pareamento de Dispositivo</h2>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            Certifique-se de que a Zelo Smart Collar esteja ligada e piscando em azul. Mantenha o dispositivo a menos de 1 metro do hub central.
          </p>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            {pairingStatus === 'idle' && (
              <>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200">
                  <Watch className="w-8 h-8 text-slate-400" />
                </div>
                <button 
                  onClick={startPairing}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" /> Localizar Dispositivo
                </button>
              </>
            )}

            {pairingStatus === 'searching' && (
              <>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-blue-200 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20"></span>
                  <Wifi className="w-8 h-8 text-blue-500 animate-pulse" />
                </div>
                <p className="text-sm font-bold text-blue-600">Buscando dispositivos próximos...</p>
              </>
            )}

            {pairingStatus === 'pairing' && (
              <>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-amber-200 relative">
                  <Watch className="w-8 h-8 text-amber-500 animate-pulse" />
                </div>
                <p className="text-sm font-bold text-amber-600">Negociando chaves seguras...</p>
              </>
            )}

            {pairingStatus === 'success' && (
              <>
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-200">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-emerald-600">Dispositivo pareado com sucesso!</p>
                <p className="text-xs text-slate-500 mt-1">Zelo Collar_A9B4</p>
              </>
            )}
          </div>
        </div>

        {/* Limites e Alertas */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
            <h2 className="text-lg font-bold text-slate-900">Parâmetros de Alerta Global</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-900 flex justify-between items-center mb-3">
                <span className="flex items-center"><Battery className="w-4 h-4 mr-2 text-slate-500"/> Limiar de Bateria Baixa</span>
                <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs">{batteryThreshold}%</span>
              </label>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="5"
                value={batteryThreshold}
                onChange={(e) => setBatteryThreshold(parseInt(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
              />
              <p className="text-xs text-slate-500 mt-2">Um alerta será disparado no app do tutor e na central quando a bateria atingir este limite.</p>
            </div>

            <div className="border-t border-slate-100 pt-6">
               <label className="flex items-start cursor-pointer hover:bg-slate-50 p-2 rounded-lg -mx-2 transition">
                <input 
                  type="checkbox" 
                  checked={heartRateAlert}
                  onChange={(e) => setHeartRateAlert(e.target.checked)}
                  className="mt-1 mr-3 w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 cursor-pointer" 
                />
                <div>
                  <span className="block text-sm font-bold text-slate-900" title="Alerta disparado na fila de handoff caso a IA preditiva identifique anomalias cardíacas. (Prevenção de Erro)">Alerta de BPM Anômalo (IA)</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Utiliza aprendizado de máquina contínuo para detectar fibrilações ou letargia severa e adiciona à fila de triagem.</span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100">
             <button className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-sm">
                Salvar Configurações
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
