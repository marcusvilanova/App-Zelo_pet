import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PETS } from '../../../packages/shared/mock-data';
import { ArrowLeft, Activity, ShieldAlert, Video, Phone, X, Printer, CalendarClock, Download, QrCode, Sparkles, BellRing, Package, ToggleLeft, ToggleRight, LayoutDashboard, MessageSquare, Paperclip, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';
import { Skeleton } from '../../../components/Skeleton';

const mockChartData = [
  { name: 'Jan', adherence: 40 },
  { name: 'Fev', adherence: 55 },
  { name: 'Mar', adherence: 45 },
  { name: 'Abr', adherence: 70 },
  { name: 'Mai', adherence: 95 },
];

export default function PatientRecord() {
  const { id } = useParams();
  const pet = MOCK_PETS.find(p => p.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [notifyBpm, setNotifyBpm] = useState(true);
  const [notifyMed, setNotifyMed] = useState(false);
  const [noteStatus, setNoteStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [noteText, setNoteText] = useState('');
  const feedback = useSystemFeedback();

  const [showProtocol, setShowProtocol] = useState(true);

  const handleAcceptProtocol = () => {
    setShowProtocol(false);
    feedback.info('Protocolo V2 adicionado ao prontuário.');
  };

  const handleDismissProtocol = () => {
    setShowProtocol(false);
    feedback.info('Sugestão clínica dispensada.');
  };

  const handleB2BOrder = () => {
    feedback.info('Pedido encaminhado ao distribuidor (Marketplace B2B).');
  };

  const handleAttachment = () => {
    feedback.info('Abrindo seletor de arquivos do dispositivo...');
  };

  const handleVideoCall = () => {
    setShowVideoCall(true);
    feedback.info('Iniciando conexão de videochamada segura...');
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (!pet && !isLoading) return <p>Paciente não encontrado.</p>;

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    setNoteStatus('saving');
    setTimeout(() => {
      // Chance of error simulation
      if (Math.random() > 0.9) {
        feedback.error('Erro ao salvar a nota. Tente novamente.');
        setNoteStatus('idle');
        return;
      }
      setNoteStatus('saved');
      
      const textCache = noteText;
      let undoDone = false;

      feedback.success('Nota clínica salva com sucesso.', () => {
          undoDone = true;
          setNoteText(textCache);
          setNoteStatus('idle');
          feedback.info('Ação desfeita. A nota não foi salva e o texto foi restaurado.');
      });
      if(!undoDone) setNoteText('');
      setTimeout(() => setNoteStatus('idle'), 2500);
    }, 1000);
  };

  const isHighRisk = pet?.status === 'Atrasado' || (pet?.healthScore ?? 100) < 80;

  const handleExport = () => {
    window.print();
  };

  const handleExportJson = () => {
    if (!pet) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pet, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", pet.name + "_open_health_record.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 pb-24 p-8">
        <Skeleton className="h-8 w-1/4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/web/pacientes" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition-colors" title="Voltar para a Lista de Pacientes">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 mb-1">
               <Link to="/web/pacientes" className="hover:text-blue-600 transition-colors">Pacientes</Link>
               <span>/</span>
               <span className="text-slate-600">{pet.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Prontuário: {pet.name}</h1>
              {isHighRisk && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-red-100 text-red-700">
                  <ShieldAlert className="w-3 h-3 mr-1" />
                  Risco Alto
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-1">{pet.breed} • {pet.age} • Tutor Principal</p>
          </div>
        </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleExportJson}
              className="flex items-center px-4 py-2 bg-slate-900 border border-slate-700 text-white font-bold text-sm rounded-lg hover:bg-slate-800 shadow-sm"
              title="Open Health Vet JSON"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Exportar Blockchain (JSON)
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-lg hover:bg-slate-50 shadow-sm"
            >
              <Printer className="w-4 h-4 mr-2" />
              PDF
            </button>
          </div>
      </div>

      {/* AI Clinical Suggestion */}
      {showProtocol && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 shadow-sm flex items-start space-x-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white p-3 rounded-xl shadow-sm shrink-0">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Sugestão Clínica da IA Zelo</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Considerando o histórico de <strong>{pet.breed}</strong> e o health score atual de <strong>{pet.healthScore}</strong>, há uma correlação preditiva com o declínio do painel metabólico nesta idade preventiva.
              <br/>
              <strong>Plano de Ação (Protocolo V2):</strong> Sugerimos antecipar ultrassonografia abdominal e exame SDMA (Renal) no próximo check-up.
            </p>
            <div className="flex space-x-3">
              <button onClick={handleAcceptProtocol} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm">Adicionar ao Protocolo Prescritivo</button>
              <button onClick={handleDismissProtocol} className="bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-50 transition shadow-sm">Dispensar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4">Negócio & Métricas Vitais</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Cobertura (Plano Zelo)</span>
                <span className="text-sm font-bold text-slate-900 bg-blue-50 text-blue-700 px-2 py-1 rounded">{pet.plan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Health Score da IA</span>
                <span className="text-xl font-bold text-slate-900">{pet.healthScore}/100</span>
              </div>
              
              {pet.wearableData && (
                <>
                  <div className="border-t border-slate-100 my-4 pt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Dados IoT (Smart Collar)
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">BPM Médio</span>
                    <span className="text-sm font-bold text-slate-900">{pet.wearableData.avgHeartRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Padrão de Sono</span>
                    <span className="text-sm font-bold text-slate-900">{pet.wearableData.sleepQuality}</span>
                  </div>
                </>
              )}
            </div>
            {pet.status === 'Atrasado' && (
              <div className="mt-6 bg-red-50 border border-red-100 rounded-lg p-3 flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 font-medium">Paciente em risco. Protocolos preventivos estão atrasados.</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4 flex items-center justify-between">
              Evolução: Health Score
              <Activity className="w-4 h-4 text-blue-500" />
            </h2>
            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pet.healthScoreHistory || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4 flex items-center justify-between">
              Aderência Medicamentosa
              <Activity className="w-4 h-4 text-emerald-500" />
            </h2>
            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip />
                  <Line type="monotone" dataKey="adherence" stroke="#0d9488" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4 flex items-center">
              <BellRing className="w-4 h-4 mr-2 text-amber-500" /> Preferências de Notificação (Mobile)
            </h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-slate-900">BPM Baixo (Smart Collar)</p>
                  <p className="text-xs text-slate-500">Alerta iminente na fila de Triagem</p>
                </div>
                <button onClick={() => setNotifyBpm(!notifyBpm)} className="focus:outline-none">
                  {notifyBpm ? <ToggleRight className="w-8 h-8 text-blue-500" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-slate-900">Omissão Medicamentosa</p>
                  <p className="text-xs text-slate-500">Janela de 12h estourada pelo tutor</p>
                </div>
                <button onClick={() => setNotifyMed(!notifyMed)} className="focus:outline-none">
                  {notifyMed ? <ToggleRight className="w-8 h-8 text-blue-500" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4 flex items-center">
              <Package className="w-4 h-4 mr-2 text-blue-500" /> ERP Estoque Farmácia
            </h2>
            <div className="space-y-4">
              {pet.medications?.filter(m => m.status === 'Ativo').length === 0 && (
                <p className="text-xs text-slate-500">Nenhum controle de estoque necessário.</p>
              )}
              {pet.medications?.filter(m => m.status === 'Ativo').map(med => (
                <div key={med.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{med.name}</p>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Situação Base</p>
                      {med.name.toLowerCase().includes('simparic') ? (
                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-md text-[10px] font-bold inline-block">Crítico (2 un)</span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md text-[10px] font-bold inline-block">Estável (15+ un)</span>
                      )}
                    </div>
                    {med.name.toLowerCase().includes('simparic') && (
                      <button onClick={handleB2BOrder} className="text-[10px] font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition">
                        Order Now (B2B)
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4 flex items-center">
              <LayoutDashboard className="w-4 h-4 mr-2 text-rose-500" /> Heatmap de Recursos
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Consultório Preventivo</span>
                  <span className="font-bold text-amber-600">80%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
                  <div className="bg-amber-500 w-4/5 h-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Bloco Cirúrgico</span>
                  <span className="font-bold text-emerald-600">Livre</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
                  <div className="bg-emerald-500 w-1/4 h-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700">Leitos / Internação</span>
                  <span className="font-bold text-rose-600">95% (Alerta)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 flex overflow-hidden">
                  <div className="bg-rose-500 w-[95%] h-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
              <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-6">Timeline Clínica Consolidada</h2>
              
              <div className="space-y-6 flex-1">
                {pet.history.map(event => (
                  <div key={event.id} className="flex space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" />
                      <div className="w-px h-full bg-slate-200 mt-2" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl flex-1 border border-slate-200">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{event.type}</span>
                        <span className="text-xs font-medium text-slate-400">{event.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900">{event.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col">
              <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-6 flex items-center">
                <CalendarClock className="w-4 h-4 mr-2" /> Agendamentos Futuros
              </h2>
              
              <div className="space-y-4 flex-1">
                {pet.upcomingReturns && pet.upcomingReturns.length > 0 ? (
                  pet.upcomingReturns.map(ret => (
                    <div key={ret.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start space-x-4">
                      <div className="bg-white border border-slate-200 w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-red-500 uppercase">{new Date(ret.date).toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-lg font-bold text-slate-900 leading-none">{new Date(ret.date).getDate()}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{ret.reason}</h4>
                        <p className="text-sm text-slate-500 mt-1 hidden md:block">Retorno programado no protocolo preventivo.</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 py-8">Nenhum retorno agendado.</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-4">Medicações Históricas e Ativas</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Medicamento</th>
                    <th className="py-3 px-4">Posologia</th>
                    <th className="py-3 px-4">Início</th>
                    <th className="py-3 px-4">Término</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pet.medications && pet.medications.length > 0 ? (
                    pet.medications.map(med => (
                      <tr key={med.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{med.name}</td>
                        <td className="py-3 px-4 font-medium text-slate-600">{med.dosage}</td>
                        <td className="py-3 px-4 text-slate-500">{med.startDate}</td>
                        <td className="py-3 px-4 text-slate-500">{med.endDate}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${med.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {med.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-slate-500">Nenhum registro de medicação.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Clinical Handoff / Notes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-medium tracking-wider text-slate-500 uppercase flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" /> Clinical Handoff & Notas
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-xs shrink-0 mt-1">
                  AZ
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 text-sm">Dr. Arquiteto Zelo</span>
                    <span className="text-[10px] text-slate-500 font-medium tracking-wider">Hoje, 14:30</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-2">
                    Paciente apresenta evolução positiva, mas precisamos monitorar a resposta renal. <span className="font-medium text-blue-600 bg-blue-50 px-1 py-0.5 rounded">@Dra. Carla</span> favor revisar check-up preventivo amanhã.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-xs shrink-0 mt-1">
                  CM
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 text-sm">Dra. Carla Mendes</span>
                    <span className="text-[10px] text-slate-500 font-medium tracking-wider">Ontem, 18:45</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Ajustei a posologia para alinhar com o novo peso. Fique de olho na aderência notificada pela coleira.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0 mt-1">
                  AZ
                </div>
                <div className="flex-1 relative">
                  <textarea 
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Adicionar nota ao prontuário... Use @ para marcar outro especialista."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none pb-12"
                    rows={2}
                    disabled={noteStatus === 'saving'}
                  ></textarea>
                  <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                    {noteStatus === 'saved' && (
                      <span className="text-emerald-600 text-xs font-bold mr-2 flex items-center animate-in fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Nota Adicionada
                      </span>
                    )}
                    <button onClick={handleAttachment} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200 transition" title="Anexar arquivo">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={handleSaveNote}
                      disabled={noteStatus === 'saving' || !noteText.trim()}
                      className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition disabled:opacity-50"
                    >
                      {noteStatus === 'saving' ? 'Salvando...' : 'Salvar Nota'}
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 pl-11">
                  Use essa área para registrar o "Clinical Handoff". As notas ficam visíveis para outros vets que acessarem o prontuário.
                </div>
            </div>
          </div>
        </div>

      </div>
      {/* Floating Action Button */}
      <button 
        onClick={() => setShowVideoCall(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center justify-center print:hidden border-4 border-white"
        title="Iniciar Teleorientação"
      >
        <Video className="w-6 h-6" />
      </button>

      {/* Video Call Modal Simulation */}
      {showVideoCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-slate-700 relative flex flex-col h-[80vh]">
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setShowVideoCall(false)} className="w-10 h-10 bg-slate-800/50 hover:bg-slate-800 rounded-full flex items-center justify-center text-white backdrop-blur-md">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 relative bg-slate-800 flex items-center justify-center">
              {/* Fake remote video (Tutor) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden mb-4 bg-slate-700 flex items-center justify-center">
                   <span className="text-4xl text-slate-500 font-bold">Tutor</span>
                 </div>
                 <p className="text-slate-400">Aguardando câmera do tutor...</p>
                 <div className="mt-4 px-4 py-1.5 bg-slate-800 rounded-full border border-slate-700 text-slate-300 text-sm flex items-center">
                   <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div> Simulação Ativa
                 </div>
              </div>

              {/* Fake local video (Vet) */}
              <div className="absolute bottom-6 right-6 w-48 h-64 bg-slate-700 rounded-2xl border-2 border-slate-600 shadow-xl overflow-hidden flex flex-col items-center justify-center">
                 <span className="text-xl text-slate-500 font-bold">Vet</span>
              </div>
            </div>

            <div className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-center space-x-6">
              <button onClick={handleVideoCall} className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700">
                 <Video className="w-5 h-5" />
              </button>
              <button onClick={() => setShowVideoCall(false)} className="px-8 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 flex items-center">
                 <Phone className="w-5 h-5 mr-2 rotate-[135deg]" /> Finalizar Chamada
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
