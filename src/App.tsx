import { Routes, Route, Link, Navigate } from 'react-router-dom';
import MobileApp from './apps/mobile/MobileApp';
import WebApp from './apps/web/WebApp';
import { Smartphone, LayoutDashboard } from 'lucide-react';

import { Logo } from './components/Logo';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeSelector />} />
      <Route path="/mobile/*" element={<MobileApp />} />
      <Route path="/web/*" element={<WebApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function WelcomeSelector() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="max-w-xl w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center mb-4">
            <Logo className="w-24 h-24 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Zelo Pet MVP</h1>
          <p className="text-slate-400 text-lg">Solução HealthTech (Challenge FIAP 2026)</p>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Por limitações do ambiente de preview AI Studio, unificamos a arquitetura do <strong className="text-slate-300">Next.js</strong> e do <strong className="text-slate-300">Expo React Native</strong> em uma mesma aplicação Vite para viabilizar os testes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/mobile" className="group bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:ring-2 hover:ring-blue-500 transition-all text-left">
            <Smartphone className="w-10 h-10 text-emerald-400 mb-6" />
            <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">App do Tutor</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">Engajamento, triagem preditiva e visão preventiva.</p>
            <span className="text-emerald-400 font-bold text-sm">Visualizar Mobile (Simulado)</span>
          </Link>

          <Link to="/web" className="group bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 hover:ring-2 hover:ring-blue-500 transition-all text-left">
            <LayoutDashboard className="w-10 h-10 text-blue-400 mb-6" />
            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">Dashboard da Clínica</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">Recepção de insights (Handoff), analytics e prontuários globais.</p>
            <span className="text-blue-400 font-bold text-sm">Visualizar Painel Clínico</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
