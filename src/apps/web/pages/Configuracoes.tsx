import { useState } from 'react';
import { Database, Lock, Bot, Link as LinkIcon, ToggleRight, ToggleLeft } from 'lucide-react';

export default function Configuracoes() {
  const [autoRemanejamento, setAutoRemanejamento] = useState(true);
  const [visaoComp, setVisaoComp] = useState(false);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Configurações do ERP</h1>
        <p className="text-slate-500 text-sm mt-1">Gestão de acessos, regras de Handoff (IA) e integrações corporativas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center bg-blue-50 text-blue-700 px-4 py-3 rounded-xl font-bold text-sm text-left">
            <Bot className="w-5 h-5 mr-3 shrink-0" /> Regras de Handoff (IA)
          </button>
          <button className="w-full flex items-center bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-xl font-medium text-sm text-left transition border border-transparent hover:border-slate-200">
            <Database className="w-5 h-5 mr-3 shrink-0" /> Open Health Vet (Blockchain)
          </button>
          <button className="w-full flex items-center bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-xl font-medium text-sm text-left transition border border-transparent hover:border-slate-200">
            <LinkIcon className="w-5 h-5 mr-3 shrink-0" /> APIs Fornecedores B2B
          </button>
          <button className="w-full flex items-center bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-xl font-medium text-sm text-left transition border border-transparent hover:border-slate-200">
            <Lock className="w-5 h-5 mr-3 shrink-0" /> Controle de Acessos
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center mb-6">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                 <Bot className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                 <h2 className="text-lg font-bold text-slate-900">Motor de Triagem Preditiva (Zelo IA)</h2>
                 <p className="text-sm text-slate-500">Configure a sensibilidade e diretrizes clínicas para a IA.</p>
               </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-slate-900 flex justify-between items-end mb-2">
                  Limiar de Urgência (Urgency Score)
                  <span className="text-blue-600">Alta Prevenção (40/100)</span>
                </label>
                <input type="range" min="0" max="100" defaultValue="40" className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                <p className="text-xs text-slate-500 mt-2">Valores mais baixos acionam a equipe clínica mais rapidamente com sintomas leves, aumentando a fila de triagem mas reduzindo casos crônicos no longo prazo.</p>
              </div>

              <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Auto-Remanejamento de Agenda</p>
                  <p className="text-xs text-slate-500 max-w-sm">A IA pode bloquear e remanejar salas para casos críticos triados automaticamente pelo App.</p>
                </div>
                <button onClick={() => setAutoRemanejamento(!autoRemanejamento)} className="focus:outline-none">
                  {autoRemanejamento ? <ToggleRight className="w-10 h-10 text-blue-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                </button>
              </div>

              <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">Visão Computacional no Handoff</p>
                  <p className="text-xs text-slate-500 max-w-sm">Exibir diagnóstico provável e % de chance nas imagens antes da revisão humana na Triagem.</p>
                </div>
                <button onClick={() => setVisaoComp(!visaoComp)} className="focus:outline-none">
                  {visaoComp ? <ToggleRight className="w-10 h-10 text-blue-600" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 transition">Descartar Alterações</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm">Salvar Parâmetros</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
