import { useState, useEffect } from 'react';
import { PackageSearch, AlertTriangle, CheckCircle2, Factory, Search, Filter, Phone, Mail, FileText } from 'lucide-react';
import { useSystemFeedback } from '../../../contexts/FeedbackContext';
import { Skeleton } from '../../../components/Skeleton';

const MOCK_INVENTORY = [
  { id: 1, name: 'Simparic 20mg (Caixa c/ 3)', qtd: 2, min: 10, status: 'Critico', supplier: 'Zoetis Brasil', category: 'Antiparasitários', price: 'R$ 145,00' },
  { id: 2, name: 'Vacina V10 (Dose)', qtd: 8, min: 20, status: 'Critico', supplier: 'Zoetis Brasil', category: 'Biológicos', price: 'R$ 45,00' },
  { id: 3, name: 'Otomax Pomada (14g)', qtd: 5, min: 5, status: 'Alerta', supplier: 'Virbac', category: 'Dermatológicos', price: 'R$ 82,90' },
  { id: 4, name: 'Bravecto Gatos (112,5mg)', qtd: 15, min: 8, status: 'Normal', supplier: 'MSD Saúde Animal', category: 'Antiparasitários', price: 'R$ 198,00' },
  { id: 5, name: 'Apoquel 16mg (Cartela)', qtd: 24, min: 10, status: 'Normal', supplier: 'Zoetis Brasil', category: 'Dermatológicos', price: 'R$ 210,00' },
];

export default function PharmacyInventoryManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [confirmOrder, setConfirmOrder] = useState<number | null>(null);
  const feedback = useSystemFeedback();

  useEffect(() => {
    // Simulate initial network fetch
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleApproveOrder = (id: number) => {
    setApprovingId(id);
    // Simulate API request
    setTimeout(() => {
      // Simulate 10% chance of failure for error feedback standard
      if (Math.random() > 0.9) {
        feedback.error('Falha de conexão com a distribuidora. Tente novamente.');
        setApprovingId(null);
        setConfirmOrder(null);
        return;
      }
      setInventory(prev => prev.map(item => item.id === id ? { ...item, status: 'Pedido B2B Concluído' } : item));
      setApprovingId(null);
      setConfirmOrder(null);
      feedback.success('Pedido B2B processado com sucesso!', () => {
        // Undo B2B order function
        setInventory(prev => prev.map(item => item.id === id ? { ...item, status: 'Critico' } : item));
        feedback.info('Pedido cancelado com sucesso.');
      });
    }, 1500);
  };

  const filtered = inventory.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 space-y-6">
        <Skeleton className="h-10 w-1/4 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="lg:col-span-1 h-64 rounded-2xl" />
          <div className="lg:col-span-3 space-y-4">
             <Skeleton className="h-14 rounded-xl" />
             <Skeleton className="h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Farma & Estoque</h1>
          <p className="text-slate-500 text-sm mt-1">Integração B2B, automação de suprimentos e farmácia delivery.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Suppliers Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50">
              <Factory className="w-4 h-4 text-slate-500 mr-2" />
              <h2 className="text-sm font-bold text-slate-900">Fornecedores (B2B)</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="group">
                <p className="text-sm font-bold text-slate-800">Zoetis Brasil</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500 flex items-center"><Phone className="w-3 h-3 mr-1.5" /> (11) 5090-8200</p>
                  <p className="text-xs text-slate-500 flex items-center"><Mail className="w-3 h-3 mr-1.5" /> b2b@zoetis.com</p>
                  <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-flex mt-1 items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> API Conectada
                  </p>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-4 group">
                <p className="text-sm font-bold text-slate-800">Virbac</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500 flex items-center"><Phone className="w-3 h-3 mr-1.5" /> 0800 13 65 33</p>
                  <p className="text-xs text-slate-500 flex items-center"><Mail className="w-3 h-3 mr-1.5" /> sac@virbac.com.br</p>
                  <p className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-flex mt-1 items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Falha na Sincronização
                  </p>
                </div>
              </div>
               <div className="border-t border-slate-100 pt-4 group">
                <p className="text-sm font-bold text-slate-800">MSD Saúde Animal</p>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-slate-500 flex items-center"><Phone className="w-3 h-3 mr-1.5" /> 0800 70 70 512</p>
                  <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-flex mt-1 items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> API Conectada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Inventory Layout */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
             <div className="flex-1 relative">
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder="Pesquisar por SKU, princípio ativo..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
               />
             </div>
             <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-100">
               <Filter className="w-4 h-4 mr-2" />
               Filtros
             </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-6">Produto / SKU</th>
                    <th className="py-3 px-6">Categoria</th>
                    <th className="py-3 px-6">Status / Qtd</th>
                    <th className="py-3 px-6 text-right">Ação B2B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Custo Un: {item.price}</p>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">{item.category}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className="font-mono font-bold text-slate-700 mr-3">{item.qtd} <span className="text-xs text-slate-400 font-sans font-normal">/ min: {item.min}</span></span>
                           <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.status === 'Critico' ? 'bg-red-100 text-red-700' :
                            item.status === 'Alerta' ? 'bg-orange-100 text-orange-700' :
                            item.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {(item.status === 'Critico' || item.status === 'Alerta') ? (
                          <div className="flex flex-col items-end">
                            {confirmOrder === item.id ? (
                               <div className="flex items-center space-x-2 animate-in fade-in">
                                 <button 
                                   onClick={() => setConfirmOrder(null)}
                                   className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors"
                                 >
                                   Cancelar
                                 </button>
                                 <button 
                                   onClick={() => handleApproveOrder(item.id)}
                                   disabled={approvingId === item.id}
                                   className="flex items-center bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition"
                                 >
                                   {approvingId === item.id ? 'Aguarde...' : 'Confirmar Pedido'}
                                 </button>
                               </div>
                            ) : (
                               <>
                                <button 
                                 onClick={() => setConfirmOrder(item.id)}
                                 className="flex items-center justify-center space-x-1 ml-auto px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm bg-blue-600 text-white hover:bg-blue-700 hover:shadow"
                               >
                                 <span className="flex items-center">
                                   <FileText className="w-3.5 h-3.5 mr-1.5" />
                                   1-Click Order B2B
                                 </span>
                               </button>
                               <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold text-right">
                                 Requisição no Fornecedor
                               </div>
                               </>
                            )}
                          </div>
                        ) : item.status === 'Pedido B2B Concluído' ? (
                           <span className="text-blue-600 text-xs font-bold flex items-center justify-end">
                            <CheckCircle2 className="w-4 h-4 mr-1 text-blue-500" />
                            Aguardando Entrega
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium flex items-center justify-end">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Saudável
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <p className="text-slate-500 text-sm font-medium mb-3">Nenhum produto encontrado para "{searchTerm}".</p>
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                          Limpar Filtros e Busca
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
