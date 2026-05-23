import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Inbox, Users, Settings, LogOut, PackageSearch, ShieldCheck, ActivitySquare, Bell, User as UserIcon, Moon, ChevronDown, Wrench, Search, HelpCircle, ChevronRight, Keyboard, X } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import TriageInbox from './pages/TriageInbox';
import PatientsDirectory from './pages/PatientsDirectory';
import PatientRecord from './pages/PatientRecord';
import PlanosLtv from './pages/PlanosLtv';
import PharmacyInventoryManagement from './pages/PharmacyInventoryManagement';
import HubIoT from './pages/HubIoT';
import HubIoTConfig from './pages/HubIoTConfig';
import Configuracoes from './pages/Configuracoes';
import MarketplaceConfig from './pages/MarketplaceConfig';
import PracticeProfitability from './pages/PracticeProfitability';
import { Store, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useSystemFeedback } from '../../contexts/FeedbackContext';
import { Logo } from '../../components/Logo';

export default function WebApp() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [attentionBadge, setAttentionBadge] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { info } = useSystemFeedback();

  // Background service simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate checking for low-stock or missed meds for high-risk patients
      setAttentionBadge(prev => !prev);
    }, 60000);
    
    setTimeout(() => {
      setAttentionBadge(true);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      
      // Shift+? for shortcuts
      if (e.shiftKey && e.key === '?') {
        setShortcutsOpen(prev => !prev);
      }
      
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShortcutsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNewAdmission = () => {
    info('Iniciando fluxo de nova admissão.');
    // could navigate to /web/pacientes ideally
  };

  const handleHelpClick = () => {
    info('Abrindo central de ajuda e suporte.');
  };

  const handleNotificationsClick = () => {
    setAttentionBadge(false);
    info('Todas as notificações marcadas como lidas.');
  };

  const handleProfileOption = (msg: string) => {
    setProfileOpen(false);
    info(msg);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-100 flex flex-col hidden md:flex border-r border-slate-200">
        <div className="p-6">
           <div className="flex items-center space-x-3 mb-6 text-slate-900">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl">
              <Logo className="w-8 h-8 text-slate-800" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-tight">Zelo Pet</span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-wide">Clinical Admin</span>
            </div>
          </div>
          <button onClick={handleNewAdmission} className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm mb-2">
            <span className="text-lg leading-none">+</span>
            <span>New Admission</span>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-2">
          <NavItem to="/web" icon={<LayoutDashboard />} label="Dashboard" active={location.pathname === '/web' || location.pathname === '/web/'} />
          <NavItem to="/web/triagens" icon={<Inbox />} label="Fila de Triagem" active={location.pathname.includes('/triagens')} />
          <NavItem to="/web/pacientes" icon={<Users />} label="Pacientes" active={location.pathname.includes('/pacientes')} />
          
          <div className="pt-6 pb-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Business & Tech</p>
          </div>
          <NavItem to="/web/planos" icon={<ShieldCheck />} label="Planos & LTV" active={location.pathname.includes('/planos')} />
          <NavItem to="/web/profitability" icon={<TrendingUp />} label="Rentabilidade" active={location.pathname.includes('/profitability')} />
          
          <div className="space-y-0.5">
            <NavItem to="/web/estoque" icon={<PackageSearch />} label="Farma & Estoque" active={location.pathname === '/web/estoque'} />
            <NavItem to="/web/estoque/marketplace" icon={<Store />} label="Marketplace B2B" active={location.pathname.includes('/estoque/marketplace')} indent />
          </div>
          
          <div className="space-y-0.5">
            <NavItem to="/web/iot" icon={<ActivitySquare />} label="Hub IoT" active={location.pathname === '/web/iot'} />
            <NavItem to="/web/iot/config" icon={<Wrench />} label="Ajustes Wearables" active={location.pathname.includes('/iot/config')} indent />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200 mt-auto">
          <div className="flex items-center pl-4 mb-4">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Doctor" className="w-8 h-8 rounded-full border border-slate-200 mr-3 object-cover shadow-sm" />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">Dra. Maria Silva</p>
              <p className="text-[10px] font-medium text-slate-500">Cirurgiã Chefe</p>
            </div>
          </div>
          <NavItem to="/web/config" icon={<Settings />} label="Configurações" active={location.pathname.includes('/web/config')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 shrink-0 relative z-20 shadow-sm">
          <div className="flex items-center space-x-6">
            
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-sm font-medium transition-colors border border-slate-200"
            >
              <Search className="w-4 h-4 mr-2" />
              Busca Rápida
              <span className="ml-3 text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-bold text-slate-500">⌘K</span>
            </button>

            <button 
              onClick={handleHelpClick}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              title="Central de Ajuda e Documentação"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            <button 
              onClick={handleNotificationsClick}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              title="Notificações e Alertas"
            >
              <Bell className="w-5 h-5" />
              {attentionBadge && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-white"></span>
              )}
            </button>

            <div className="relative">
               <button 
                 onClick={() => setProfileOpen(!profileOpen)}
                 className="flex items-center space-x-3 focus:outline-none p-1 rounded-lg hover:bg-slate-50 transition-colors"
               >
                 <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-slate-700 leading-none">Dr. Arquiteto Zelo</p>
                   <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Admin / Clyvo</p>
                 </div>
                 <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm border border-blue-200 ring-2 ring-white shadow-sm overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Doctor" className="w-full h-full object-cover" />
                 </div>
                 <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
               </button>

               {profileOpen && (
                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                   <div className="px-4 py-2 border-b border-slate-50 mb-2">
                     <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Menu da Conta</p>
                   </div>
                   <button onClick={() => handleProfileOption('Acesso ao perfil do usuário')} className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                     <UserIcon className="w-4 h-4 mr-3" /> Meu Perfil
                   </button>
                   <button onClick={() => handleProfileOption('Acesso às configurações')} className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                     <Settings className="w-4 h-4 mr-3" /> Configurações Pessoais
                   </button>
                   <button onClick={() => handleProfileOption('Tema atualizado para escuro')} className="w-full flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                     <Moon className="w-4 h-4 mr-3" /> Tema Escuro (Em breve)
                   </button>
                   <div className="border-t border-slate-100 my-2"></div>
                   <button onClick={() => handleProfileOption('Sessão encerrada')} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors">
                     <LogOut className="w-4 h-4 mr-3" /> Sair
                   </button>
                 </div>
               )}
            </div>

          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 relative scroll-smooth bg-slate-50/50">
           <Breadcrumbs />
           <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/triagens" element={<TriageInbox />} />
            <Route path="/pacientes" element={<PatientsDirectory />} />
            <Route path="/pacientes/:id" element={<PatientRecord />} />
            <Route path="/planos" element={<PlanosLtv />} />
            <Route path="/profitability" element={<PracticeProfitability />} />
            <Route path="/estoque" element={<PharmacyInventoryManagement />} />
            <Route path="/estoque/marketplace" element={<MarketplaceConfig />} />
            <Route path="/iot" element={<HubIoT />} />
            <Route path="/iot/config" element={<HubIoTConfig />} />
            <Route path="/config" element={<Configuracoes />} />
          </Routes>
        </div>
      </main>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-slate-900/50 backdrop-blur-sm px-4">
          <div 
            className="fixed inset-0" 
            onClick={() => setSearchOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-200">
             <div className="flex items-center px-4 py-4 border-b border-slate-100">
               <Search className="w-5 h-5 text-slate-400 mr-3" />
               <input 
                 type="text" 
                 placeholder="Pesquisar por pacientes, inventário ou triagem..."
                 className="flex-1 text-lg bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
                 autoFocus
                 onKeyDown={(e) => {
                   if (e.key === 'Escape') setSearchOpen(false);
                 }}
               />
               <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">ESC</div>
             </div>
             
             <div className="max-h-[60vh] overflow-y-auto p-2">
               <div className="p-2">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Sugestões (Recentes)</p>
                 <Link onClick={() => setSearchOpen(false)} to="/web/pacientes/pt-001" className="flex items-center px-3 py-3 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700">
                     <Users className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Luna (Golden Retriever)</p>
                     <p className="text-xs text-slate-500">Prontuário e Preventivo</p>
                   </div>
                 </Link>
                 <Link onClick={() => setSearchOpen(false)} to="/web/triagens" className="flex items-center px-3 py-3 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 text-red-700">
                     <Inbox className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Alerta de Arritmia - Thor</p>
                     <p className="text-xs text-slate-500">Fila de Triagem / Urgência</p>
                   </div>
                 </Link>
                 <Link onClick={() => setSearchOpen(false)} to="/web/estoque" className="flex items-center px-3 py-3 hover:bg-slate-50 rounded-xl transition cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-emerald-700">
                     <PackageSearch className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Simparic 20mg</p>
                     <p className="text-xs text-slate-500">Inventário B2B</p>
                   </div>
                 </Link>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* Shortcuts Manual Modal */}
      {shortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="fixed inset-0" onClick={() => setShortcutsOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center">
                <Keyboard className="w-5 h-5 mr-2 text-blue-500" />
                Atalhos do Sistema
              </h2>
              <button 
                onClick={() => setShortcutsOpen(false)} 
                className="p-1 text-slate-400 hover:text-slate-600 rounded bg-slate-100 transition-colors"
                title="Fechar (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <span className="text-sm font-medium text-slate-600">Busca Rápida Central</span>
                 <span className="flex space-x-1">
                   <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-500 shadow-sm">⌘ / Ctrl</kbd>
                   <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-500 shadow-sm">K</kbd>
                 </span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-100">
                 <span className="text-sm font-medium text-slate-600">Mostrar Atalhos</span>
                 <span className="flex space-x-1">
                   <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-500 shadow-sm">Shift</kbd>
                   <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-500 shadow-sm">?</kbd>
                 </span>
               </div>
               <div className="flex justify-between items-center py-2">
                 <span className="text-sm font-medium text-slate-600">Fechar Menus e Modais</span>
                 <span className="flex space-x-1">
                   <kbd className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-500 shadow-sm">ESC</kbd>
                 </span>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  if (paths.length <= 1) return null;

  const pathNames: Record<string, string> = {
    web: 'Dashboard',
    triagens: 'Fila de Triagem',
    pacientes: 'Pacientes',
    planos: 'Planos & LTV',
    profitability: 'Rentabilidade',
    estoque: 'Farma & Estoque',
    marketplace: 'Marketplace B2B',
    iot: 'Hub IoT',
    config: 'Ajustes',
  };

  return (
    <div className="flex items-center space-x-2 text-[11px] font-bold text-slate-400 mb-6 w-full animate-in fade-in" aria-label="Breadcrumb">
      {paths.map((path, index) => {
        const routeTo = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const name = pathNames[path] || (path.length > 10 ? 'Detalhes do Registro' : path.charAt(0).toUpperCase() + path.slice(1));

        return (
          <span key={path} className="flex items-center">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1 opacity-50" />}
            {isLast ? (
              <span className="text-slate-600 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">{name}</span>
            ) : (
              <Link to={routeTo} className="hover:text-blue-600 transition-colors uppercase tracking-wider px-1">
                {name}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

function NavItem({ to, icon, label, active, indent = false }: { to: string; icon: React.ReactNode; label: string; active: boolean; indent?: boolean }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-blue-600 text-white shadow-sm' 
          : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
      } ${indent ? 'ml-6' : ''}`}
    >
      <div className={`w-5 h-5 mr-3 shrink-0 ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`}>
        {icon}
      </div>
      {label}
    </Link>
  );
}
