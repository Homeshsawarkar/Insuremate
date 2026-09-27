import React from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { StepIndicator } from './StepIndicator';
import { Step1Upload } from './Step1Upload';
import { Step2Understand } from './Step2Understand';
import { Step3Treatment } from './Step3Treatment';
import { Step4Estimate } from './Step4Estimate';
import { Step5Result } from './Step5Result';
import { ToastContainer } from '../common/Toast';
import { 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

export const InsureMateWorkflow = () => {
  const { currentStep, resetWorkflow, currentPolicy } = usePolicy();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-purple-50/50 text-[#1E1B4B] flex flex-col relative overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* Blurred gradient background blobs for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Application Header */}
      <header className="bg-[#0F0E2A] text-white border-b border-indigo-950/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-glow-purple">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-white flex items-center">
                Insure<span className="text-purple-400">Mate</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Health Insurance Policy Intelligence
              </div>
            </div>
          </div>

          {/* Right Header Status Badges & Restart */}
          <div className="flex items-center gap-3">
            
            {/* Synthetic Demo Non-binding Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/90 border border-indigo-800 text-xs text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar"></span>
              <span className="font-semibold">{currentPolicy.policyNumber}</span>
              <span className="text-[10px] bg-indigo-900 text-indigo-200 px-1.5 py-0.2 rounded font-bold">
                Synthetic Demo
              </span>
            </div>

            {/* Restart Workflow Action */}
            <button
              type="button"
              onClick={resetWorkflow}
              title="Restart from Step 1 with baseline policy"
              className="px-3 py-1.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700/80 text-indigo-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>
      </header>

      {/* CONTINUOUS WORKFLOW STEP INDICATOR */}
      <StepIndicator />

      {/* Main Single Linear Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Synthetic Demo Disclaimer Banner */}
        <div className="bg-amber-50/90 border-l-4 border-amber-500 px-4 py-2.5 rounded-r-xl shadow-xs text-xs text-amber-900 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Synthetic Demonstration Data:</strong> All calculations are illustrative estimates based on parsed mediclaim clauses. Not a binding insurance commitment.
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] uppercase font-bold bg-amber-200/80 px-2 py-0.5 rounded text-amber-950">
            Hackathon MVP
          </span>
        </div>

        {/* Step-Driven View Routing */}
        <div key={currentStep}>
          {currentStep === 1 && <Step1Upload />}
          {currentStep === 2 && <Step2Understand />}
          {currentStep === 3 && <Step3Treatment />}
          {currentStep === 4 && <Step4Estimate />}
          {currentStep === 5 && <Step5Result />}
        </div>

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-indigo-100/60 mt-auto">
        InsureMate · Indian Health Insurance Mediclaim Intelligence Flow
      </footer>

      {/* Toast notifications */}
      <ToastContainer />

    </div>
  );
};
