import { useEffect, useState } from 'react';
import { AsyncStorage } from '../../../packages/shared/async-storage';
import { User, Shield, Pill, LogOut, Settings, QrCode, ShoppingBag, Bell, ChevronRight, CreditCard, HelpCircle, Info, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';

export default function Profile() {
  const [meds, setMeds] = useState<{name: string; dosage: string}[]>([]);
  const { info } = useSystemFeedback();

  useEffect(() => {
    const loadMeds = async () => {
      const stored = await AsyncStorage.getItem('@zelopet_meds');
      if (stored) {
        setMeds(JSON.parse(stored));
      }
    };
    loadMeds();
  }, []);

  const handleAction = (msg: string) => {
    info(msg);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24">
      <header className="flex items-center justify-between p-6 bg-transparent">
        <div className="flex items-center space-x-3">
          <Link to="/mobile" className="p-2 bg-white rounded-lg border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <div className="w-12 h-12 rounded-full border border-slate-200 overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold font-sans text-slate-900">Configurações</h1>
        </div>
        <button onClick={() => handleAction('Nenhuma notificação nova no momento.')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 relative">
          <Bell className="w-5 h-5 text-slate-800" />
          <span className="absolute top-[10px] right-[10px] w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </header>

      <div className="px-6 space-y-6">
        
        {/* Premium Banner */}
        <section className="bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-900/10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
           
           <div className="relative z-10 flex flex-col items-center text-center">
             <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3">
               <Sparkles className="w-6 h-6 text-blue-400" />
             </div>
             <h2 className="text-xl font-bold text-white mb-2">Zelo Premium</h2>
             <p className="text-slate-400 text-sm mb-6 max-w-[240px]">
               Tenha acesso ao veterinário 24h e vacinas anuais garantidas.
             </p>
             <button onClick={() => handleAction('Iniciando fluxo de upgrade seguro...')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm">
               Fazer Upgrade
             </button>
           </div>
        </section>

        {/* Settings List */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div onClick={() => handleAction('Abrindo detalhes da conta...')} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[15px] font-bold text-slate-900">Minha Conta</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          <div onClick={() => handleAction('Abrindo histórico de pagamentos...')} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[15px] font-bold text-slate-900">Pagamentos e Notas</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          <div onClick={() => handleAction('Notificações atualizadas.')} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-[15px] font-bold text-slate-900">Notificações</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          <div onClick={() => handleAction('Iniciando chat com o suporte...')} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[15px] font-bold text-slate-900">Ajuda e Suporte</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>

          <div onClick={() => handleAction('Versão do Aplicativo: 1.0.4 (BETA)')} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
                <Info className="w-5 h-5" />
              </div>
              <span className="text-[15px] font-bold text-slate-900">Sobre o App</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </section>

        {/* Existing Medications logic visually adapted */}
        {meds.length > 0 && (
          <section>
            <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-4 px-2">Medicamentos (Local)</h2>
            <div className="space-y-3">
              {meds.map((m, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{m.name}</h3>
                    <p className="text-xs text-slate-500">{m.dosage}</p>
                  </div>
                  <Pill className="w-5 h-5 text-slate-300" />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
