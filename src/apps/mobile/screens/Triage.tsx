import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MOCK_PETS, addTriage } from '../../../packages/shared/mock-data';
import { AlertCircle, AlertTriangle, CheckCircle2, Camera, History } from 'lucide-react';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';
import { AsyncStorage } from '../../../packages/shared/async-storage';

export default function Triage() {
  const [symptoms, setSymptoms] = useState('');
  const [petId, setPetId] = useState(MOCK_PETS[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hasPhoto, setHasPhoto] = useState(false);
  const navigate = useNavigate();
  const feedback = useSystemFeedback();

  const handlePhotoUpload = () => {
    // Simulates an image upload and basic Computer Vision pre-analysis.
    setHasPhoto(true);
    setSymptoms(prev => prev + (prev.length > 0 ? '\n\n' : '') + '[Análise Visão Computacional]: Detectada possível irritação ocular/cutânea moderada (Confiança 72%).');
    feedback.info('Análise de IA concluída e adicionada aos sintomas.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms) {
      feedback.error('Por favor, informe os sintomas para triagem.');
      return;
    }

    // Regra de Negócio Crítica (Clyvo Vet - Handoff IA):
    // A IA (mock) intercepta termos sensíveis relatados pelo tutor. 
    // Se palavras-chave de alto risco (ex: vômito, sangue, desmaio) forem detectadas,
    // o Urgency Score (0-100) é imediatamente elevado para priorizar a fila da clínica.
    // Isso garante a prevenção de agravamentos crônicos (da saúde reativa para preditiva).
    const isHighRisk = symptoms.toLowerCase().includes('vômito') || 
                       symptoms.toLowerCase().includes('sangue') || 
                       symptoms.toLowerCase().includes('desmaio');
    const mockUrgencyScore = isHighRisk ? 85 : hasPhoto ? 60 : 40;
    
    // Classificação de Manchester adaptada para a Clínica Veterinária
    const risk = mockUrgencyScore > 75 ? 'Alto' : mockUrgencyScore > 40 ? 'Médio' : 'Baixo';
    
    const pet = MOCK_PETS.find(p => p.id === petId);

    const newTriage = {
      petId,
      petName: pet?.name || 'Desconhecido',
      tutorName: 'Mock Tutor', // Em um app real viria do perfil/auth
      symptoms,
      urgencyScore: mockUrgencyScore,
      risk,
      status: 'Pendente',
      date: new Date().toISOString()
    };

    addTriage(newTriage as any); // Sync with web dashboard mock

    // Save locally for mobile triage history
    const existing = await AsyncStorage.getItem('@zelopet_triages');
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(newTriage);
    await AsyncStorage.setItem('@zelopet_triages', JSON.stringify(parsed));

    setScore(mockUrgencyScore);
    setSubmitted(true);
    feedback.success('Triagem enviada com sucesso para análise.');
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center space-y-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-8 ${score > 75 ? 'bg-red-100 border-red-50 text-red-600' : 'bg-emerald-100 border-emerald-50 text-emerald-600'}`}>
          {score > 75 ? <AlertTriangle className="w-10 h-10" /> : <CheckCircle2 className="w-10 h-10" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Triagem Enviada</h2>
          <p className="text-slate-500">Score de Urgência estimado: <span className="font-bold text-slate-900">{score}</span>/100</p>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            {score > 75 
              ? 'A clínica foi notificada e classificou este caso como alta prioridade. Dirija-se à unidade mais próxima.' 
              : 'O relato foi salvo no prontuário. Um veterinário irá avaliar em breve.'}
          </p>
        </div>
        <button onClick={() => { setSubmitted(false); setSymptoms(''); setHasPhoto(false); }} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform">
          Nova Triagem
        </button>
        <button onClick={() => navigate('/mobile/triage-history')} className="w-full bg-white text-blue-600 border border-blue-600 font-bold py-4 rounded-xl shadow-sm active:scale-95 transition-transform">
          Ver Histórico de Triagens
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 bg-slate-50">
      <header className="mb-8 flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <Link to="/mobile" className="p-2 bg-white rounded-lg border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-sans text-slate-900">Triagem Inteligente</h1>
            <p className="text-sm text-slate-500 font-medium">Relate os sintomas para análise imediata</p>
          </div>
        </div>
        <Link to="/mobile/triage-history" className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-400 hover:text-blue-600 transition-colors" title="Histórico de Triagens">
          <History className="w-5 h-5" />
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-900">Pet</label>
          <select 
            value={petId} 
            onChange={e => setPetId(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {MOCK_PETS.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 flex-1">
          <label className="text-sm font-bold text-slate-900 flex justify-between items-center">
            O que está acontecendo?
            <button 
              type="button"
              onClick={handlePhotoUpload}
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 flex items-center rounded-md ${hasPhoto ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Camera className="w-3 h-3 mr-1" />
              {hasPhoto ? 'Análise IA Ativa' : 'Adicionar Foto (IA)'}
            </button>
          </label>
          <textarea 
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
            placeholder="Ex: Ele vomitou 3 vezes nas últimas horas e não quer beber água..."
            className="w-full h-40 bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 font-medium leading-relaxed">
            Nossa IA analisa seu relato e notifica a clínica imediatamente. Casos urgentes ganham prioridade na fila.
          </p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-md active:scale-95 transition-transform">
          Analisar Sintomas
        </button>
      </form>
    </div>
  );
}
