import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Toast, ToastProps } from '../components/Toast';

export type ToastMessage = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  onUndo?: () => void;
};

type FeedbackContextType = {
  success: (message: string, onUndo?: () => void) => void;
  error: (message: string, onUndo?: () => void) => void;
  info: (message: string, onUndo?: () => void) => void;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info', onUndo?: () => void) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, onUndo }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((msg: string, onUndo?: () => void) => addToast(msg, 'success', onUndo), [addToast]);
  const error = useCallback((msg: string, onUndo?: () => void) => addToast(msg, 'error', onUndo), [addToast]);
  const info = useCallback((msg: string, onUndo?: () => void) => addToast(msg, 'info', onUndo), [addToast]);

  return (
    <FeedbackContext.Provider value={{ success, error, info }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onUndo={toast.onUndo}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </FeedbackContext.Provider>
  );
}

export function useSystemFeedback() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useSystemFeedback must be used within a FeedbackProvider');
  }
  return context;
}
