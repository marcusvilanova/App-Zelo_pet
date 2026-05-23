import { useState, useEffect } from 'react';
import { MOCK_PETS } from '../../../packages/shared/mock-data';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { Skeleton } from '../../../components/Skeleton';

export default function PatientsDirectory() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial network fetch
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 p-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-72" />
        </div>
        <Skeleton className="h-[600px] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Diretório de Pacientes</h1>
          <p className="text-slate-500 text-sm mt-1">Gestão global de pets e status preventivo.</p>
        </div>
        <div className="relative w-72">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
          <input type="text" placeholder="Buscar pet, tutor ou CPF..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th className="py-3 px-6">Identificação</th>
              <th className="py-3 px-6">Espécie/Raça</th>
              <th className="py-3 px-6" title="Score gerado pela IA com base em exames e fatores de risco. (Heurística de Ajuda)">Health Score AI</th>
              <th className="py-3 px-6" title="Situação de vacinas, vermífugos e antiparasitários.">Status Preventivo</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_PETS.map(pet => (
              <tr key={pet.id} className="hover:bg-slate-50 cursor-pointer group">
                <td className="py-4 px-6 border-l-4 border-transparent group-hover:border-blue-500 focus-within:border-blue-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      {pet.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{pet.name}</p>
                      <p className="text-slate-500 text-xs">ID: {pet.id.padStart(5, '0')}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-slate-900">{pet.species}</p>
                  <p className="text-slate-500 text-xs">{pet.breed}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="font-bold text-slate-900">{pet.healthScore}</span>
                  <span className="text-slate-400 text-xs">/100</span>
                </td>
                <td className="py-4 px-6">
                   <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${pet.status === 'Em dia' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {pet.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link to={`/web/pacientes/${pet.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold">
                    Prontuário <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
