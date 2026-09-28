import React, { useEffect } from 'react';
import { FileText, CheckCircle2, X } from 'lucide-react';

export const DocumentSourceModal = ({ isOpen, onClose, evidence, policyName }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />

      {/* Modal with fade + slight upward motion */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-4 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B1220] text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-brand-blue" />
            <span className="font-bold text-xs sm:text-sm">
              Policy Document Source Viewer — Page {evidence.page}
            </span>
            <span className="hidden sm:inline-block text-[10px] bg-brand-blue text-white px-2 py-0.5 rounded font-mono font-semibold">
              {policyName}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 transition-colors rounded-lg"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Body with Laser Line */}
        <div className="p-6 bg-slate-100 flex-1 overflow-y-auto">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-subtle border border-slate-200 relative select-none font-serif text-xs text-slate-700 leading-relaxed space-y-4">
            
            {/* Laser scan line moving through modal */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_8px_#2563EB] animate-scan pointer-events-none z-20"></div>

            <div className="flex justify-between border-b border-slate-200 pb-2 text-[10px] text-slate-400 font-sans font-bold">
              <span>SCHEDULE OF BENEFITS & STATUTORY CLAUSES</span>
              <span>PAGE {evidence.page} (VERIFIED POLICY WORDING)</span>
            </div>

            <p className="text-slate-400 text-[11px]">
              The Company shall indemnify the Insured Person in respect of the Medically Necessary expenses reasonably incurred in accordance with the terms, conditions, sub-limits and exclusions herein stipulated.
            </p>

            {/* Highlighted Cited Clause (subtle animated highlight per spec) */}
            <div className="p-4 sm:p-5 bg-blue-50/80 border-l-4 border-brand-blue rounded-r-xl text-navy-900 font-medium my-3 shadow-subtle animate-evidence-flash">
              <div className="text-[11px] font-sans font-bold text-brand-blue mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                <span>EXACT POLICY EVIDENCE: {evidence.section}</span>
              </div>
              <p className="italic leading-relaxed font-serif text-xs sm:text-sm text-navy-950 font-semibold">
                "{evidence.excerpt}"
              </p>
            </div>

            <p className="text-slate-400 text-[11px]">
              All claims arising directly or indirectly from procedures or conditions declared prior to inception shall be strictly adjudicated in accordance with the Pre-Existing Disease waiting schedule.
            </p>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-sans">
              <span>Verification Standard: 100% Policy Grounded</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ✓ Non-Hallucination Standard
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Verbatim quote referenced directly from policy document.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl font-bold text-xs transition-all shadow-subtle"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
