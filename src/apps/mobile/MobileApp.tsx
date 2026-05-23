import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Stethoscope, Pill, User } from 'lucide-react';
import MobileHome from './screens/Home';
import PetProfile from './screens/PetProfile';
import Triage from './screens/Triage';
import TriageHistory from './screens/TriageHistory';
import AddMedication from './screens/AddMedication';
import Profile from './screens/Profile';

export default function MobileApp() {
  const location = useLocation();
  const isTabBarVisible = !location.pathname.includes('/pet/') && !location.pathname.includes('/mobile/triage-history');

  return (
    <div className="flex flex-col h-full bg-slate-50 relative w-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-300">
      <div className="flex-1 overflow-y-auto pb-20">
        <Routes>
          <Route path="/" element={<MobileHome />} />
          <Route path="/pet/:id" element={<PetProfile />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/triage-history" element={<TriageHistory />} />
          <Route path="/add-medication" element={<AddMedication />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      
      {isTabBarVisible && (
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-20 pb-4">
          <TabButton to="/mobile" icon={<Home />} label="Início" />
          <TabButton to="/mobile/triage" icon={<Stethoscope />} label="Triagem" />
          <TabButton to="/mobile/add-medication" icon={<Pill />} label="Remédios" />
          <TabButton to="/mobile/profile" icon={<User />} label="Perfil" />
        </div>
      )}
    </div>
  );
}

function TabButton({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/mobile' && location.pathname === '/mobile/');
  return (
    <Link to={to} className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
      <div className="w-6 h-6">
        {icon}
      </div>
      <span className="text-[10px] font-bold">{label}</span>
    </Link>
  );
}
