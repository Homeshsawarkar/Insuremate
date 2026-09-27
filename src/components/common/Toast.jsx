import React from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = usePolicy();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let bg = "bg-slate-900 text-white";
        let icon = <Info className="w-4 h-4 text-blue-400" />;

        if (toast.type === "success") {
          bg = "bg-emerald-900 border border-emerald-700 text-emerald-50";
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        } else if (toast.type === "warning") {
          bg = "bg-amber-900 border border-amber-700 text-amber-50";
          icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
        }

        return (
          <div
            key={toast.id}
            className={`${bg} shadow-lg rounded-xl p-3.5 flex items-start space-x-3 pointer-events-auto transition-all transform translate-y-0 duration-200 text-sm`}
          >
            <div className="mt-0.5 flex-shrink-0">{icon}</div>
            <div className="flex-1 text-xs sm:text-sm font-medium leading-tight">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
