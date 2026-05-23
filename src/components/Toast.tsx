import { CheckCircle2, AlertCircle, X, Info, Undo2 } from 'lucide-react';
import React, { useEffect } from 'react';

export type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  onUndo?: () => void;
};

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, onUndo }) => {
  useEffect(() => {
    // If it has undo, maybe we leave it longer, or same timeframe
    const timer = setTimeout(onClose, onUndo ? 6000 : 4000);
    return () => clearTimeout(timer);
  }, [onClose, onUndo]);

  const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
  const Icon = type === 'success' ? CheckCircle2 : type === 'error' ? AlertCircle : Info;

  return (
    <div className={`${bg} text-white px-4 py-3 rounded-xl shadow-lg border border-black/10 text-sm font-bold animate-in slide-in-from-top-2 fade-in flex items-center`}>
      <Icon className="w-5 h-5 mr-3 opacity-90" />
      <span className="flex-1">{message}</span>
      {onUndo && (
        <button 
          onClick={() => { onUndo(); onClose(); }} 
          className="ml-4 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-bold transition flex items-center"
          title="Desfazer ação"
        >
          <Undo2 className="w-3.5 h-3.5 mr-1" /> Desfazer
        </button>
      )}
      <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 transition" title="Fechar notificação">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
