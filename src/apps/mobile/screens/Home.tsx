import { useState } from 'react';
import { MOCK_PETS } from '../../../packages/shared/mock-data';
import { Link } from 'react-router-dom';
import { Bell, MoreVertical, Plus, CheckCircle2, Syringe, X, Stethoscope, Pill } from 'lucide-react';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';
import { Logo } from '../../../components/Logo';
import maxImage from '../../../assets/images/regenerated_image_1779482883479.jpg';

export default function Home() {
  const luna = MOCK_PETS[0];
  const max = MOCK_PETS[1];
  const { info } = useSystemFeedback();
  const [showFabMenu, setShowFabMenu] = useState(false);

  const handleNotifications = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    info('Todas as notificações foram lidas.');
  };

  const handleOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    info('Abrindo opções do pet...');
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFabMenu(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 relative pb-28">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden shadow-sm">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-xl font-bold font-sans text-slate-900 tracking-tight flex items-center">
          <Logo className="w-6 h-6 mr-2 text-slate-900" />
          <span className="text-2xl font-bold tracking-tight text-slate-900 block leading-tight mr-1">Zelo Pet</span>
        </h1>
        <button onClick={handleNotifications} className="w-10 h-10 bg-transparent flex items-center justify-center relative">
          <Bell className="w-6 h-6 text-slate-800" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-50"></span>
        </button>
      </header>

      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Meus Pets</h2>
        <p className="text-slate-600 text-[15px] mt-1">Gerencie a saúde dos seus companheiros.</p>
      </div>

      {/* Pet List */}
      <div className="space-y-4 relative z-10 w-full flex-grow">
        
        {/* Card Luna */}
        <Link to={`/mobile/pet/${luna.id}`} className="block bg-slate-100 rounded-[1.5rem] p-4 shadow-sm border border-slate-100">
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200" alt="Luna" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-900">{luna.name}</h3>
                <button onClick={handleOptions} className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-2">{luna.breed} • {luna.age}</p>
              <div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Saudável
                </span>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Card Max */}
        <Link to={`/mobile/pet/${max.id}`} className="block bg-slate-100 rounded-[1.5rem] p-4 shadow-sm border border-slate-100">
          <div className="flex space-x-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <img src={maxImage} alt="Max" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-slate-900">{max.name}</h3>
                <button onClick={handleOptions} className="text-slate-400 hover:text-slate-600 p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-2">{max.breed} • {max.age}</p>
              <div>
                <span className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold w-fit">
                  <Syringe className="w-3.5 h-3.5 mr-1" /> Próxima Vacina em 5 dias
                </span>
              </div>
            </div>
          </div>
        </Link>

      </div>

      {/* FAB Menu */}
      {showFabMenu && (
        <>
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity" onClick={() => setShowFabMenu(false)} />
          <div className="fixed bottom-[180px] right-6 z-50 flex flex-col space-y-4 items-end animate-in slide-in-from-bottom flex">
            <Link to="/mobile/triage" className="flex items-center space-x-3 group" onClick={() => setShowFabMenu(false)}>
              <span className="bg-white text-slate-700 px-3 py-1.5 rounded-lg shadow-sm font-bold text-sm">Nova Triagem</span>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl border border-slate-100">
                <Stethoscope className="w-5 h-5" />
              </div>
            </Link>
            <Link to="/mobile/add-medication" className="flex items-center space-x-3 group" onClick={() => setShowFabMenu(false)}>
              <span className="bg-white text-slate-700 px-3 py-1.5 rounded-lg shadow-sm font-bold text-sm">Adicionar Medicação</span>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-xl border border-slate-100">
                <Pill className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </>
      )}

      {/* FAB - Adjusted z-index and position */}
      <div className="fixed bottom-[100px] right-6 z-50">
        <button onClick={showFabMenu ? () => setShowFabMenu(false) : handleAction} className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 active:scale-95 transition-transform">
          {showFabMenu ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
        </button>
      </div>

    </div>
  );
}
