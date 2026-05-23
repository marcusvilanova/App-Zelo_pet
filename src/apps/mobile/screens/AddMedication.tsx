import React, { useState } from 'react';
import { AsyncStorage } from '../../../packages/shared/async-storage';
import { Pill, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';

export default function AddMedication() {
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const feedback = useSystemFeedback();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !dosage) {
      feedback.error('Preencha os campos obrigatórios.');
      return;
    }

    const medData = { name: medName, dosage, date: new Date().toISOString() };
    
    // Requirement: Save data in local device storage using AsyncStorage mock
    const existing = await AsyncStorage.getItem('@zelopet_meds');
    const parsed = existing ? JSON.parse(existing) : [];
    
    parsed.push(medData);
    await AsyncStorage.setItem('@zelopet_meds', JSON.stringify(parsed));
    
    feedback.success('Medicamento salvo no dispositivo com sucesso!');
    setMedName('');
    setDosage('');
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-slate-50">
      <header className="mb-8 flex items-center space-x-3">
        <Link to="/mobile" className="p-2 bg-white rounded-lg border border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-sans text-slate-900">Novo Tratamento</h1>
          <p className="text-sm text-slate-500 font-medium">Adicione medicamentos para controle</p>
        </div>
      </header>

      <form onSubmit={handleSave} className="flex-1 flex flex-col space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900">Nome do Medicamento</label>
          <div className="relative">
            <Pill className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input 
              type="text"
              value={medName}
              onChange={e => setMedName(e.target.value)}
              placeholder="Ex: Bravecto"
              className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900">Dosagem e Frequência</label>
          <input 
            type="text"
            value={dosage}
            onChange={e => setDosage(e.target.value)}
            placeholder="Ex: 1 comprimido a cada 12h"
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform">
            Salvar Tratamento
          </button>
        </div>
      </form>
    </div>
  );
}
