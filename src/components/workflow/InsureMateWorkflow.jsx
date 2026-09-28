import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { StepIndicator } from './StepIndicator';
import { Step1Upload } from './Step1Upload';
import { Step2Understand } from './Step2Understand';
import { Step3Treatment } from './Step3Treatment';
import { Step4Estimate } from './Step4Estimate';
import { Step5Result } from './Step5Result';
import { ToastContainer } from '../common/Toast';
import { FloatingAIAssistantButton } from '../common/FloatingAIAssistantButton';
import { 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  AlertCircle,
  UploadCloud 
} from 'lucide-react';

export const InsureMateWorkflow = () => {
  const { 
    currentStep, 
    resetWorkflow, 
    currentPolicy, 
    goToStep 
  } = usePolicy();

  // Tracks active page/section in view (1 = Upload, 2 = Understand/Ask InsureMate, 3 = Treatment, 4 = Estimate, 5 = Result)
  const [activeStep, setActiveStep] = useState(currentStep >= 2 ? 2 : 1);

  // Scroll listener to update active step for floating button visibility & step tracking
  useEffect(() => {
    if (currentStep === 1) {
      setActiveStep(1);
      return;
    }

    const sections = [
      { id: 'policy-overview-section', num: 2 },
      { id: 'treatment-scenario-section', num: 3 },
      { id: 'cost-estimate-section', num: 4 },
      { id: 'result-explanation-section', num: 5 }
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveStep(sections[i].num);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-navy-900 flex flex-col relative overflow-x-hidden selection:bg-brand-blue/15 selection:text-brand-blue font-sans">
      
      {/* Subtle soft ambient light for depth */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[350px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Top Application Header */}
      <header className="bg-[#0B1220] text-white border-b border-navy-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & Brand: InsureMate - "Your AI-powered insurance intelligence assistant." */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center shadow-glow-blue">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Insure<span className="text-brand-blue">Mate</span></span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium tracking-tight">
                Your AI-powered insurance intelligence assistant.
              </div>
            </div>
          </div>

          {/* Right Header Status Badges & Actions */}
          <div className="flex items-center gap-3">
            
            {/* Synthetic Demonstration Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 border border-navy-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar"></span>
              <span className="font-semibold text-white">{currentPolicy.policyNumber}</span>
              <span className="text-[10px] bg-navy-800 text-slate-300 px-1.5 py-0.2 rounded font-semibold border border-navy-700">
                Synthetic Demo
              </span>
            </div>

            {/* Upload Action */}
            <button
              type="button"
              onClick={() => goToStep(1)}
              title="Upload new policy PDF"
              className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-subtle"
            >
              <UploadCloud className="w-3.5 h-3.5 text-brand-blue" />
              <span className="hidden sm:inline">Upload Policy</span>
            </button>

            {/* Restart Workflow Action */}
            <button
              type="button"
              onClick={resetWorkflow}
              title="Restart workflow with baseline policy"
              className="px-3.5 py-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-subtle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>
      </header>

      {/* MINIMAL TOP STEP INDICATOR: 01 Upload → 02 Understand → 03 Treatment → 04 Estimate → 05 Result */}
      <StepIndicator />

      {/* Main Single Guided Product Flow */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Synthetic Demonstration Data Banner */}
        <div className="bg-amber-50 border-l-4 border-amber-500 px-4 py-2.5 rounded-r-xl shadow-subtle text-xs text-amber-900 flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Synthetic Demonstration Data:</strong> Illustrative Estimate — Not a Final Insurance Decision. All cost shares and clause interpretations are indicative demonstrations.
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] uppercase font-bold bg-amber-200/80 px-2 py-0.5 rounded text-amber-950">
            Demonstration
          </span>
        </div>

        {/* PAGE HIERARCHY:
            When on Step 1: Upload Policy screen.
            When on Step >= 2: Complete top-to-bottom hierarchy where treatment-cost workflow dominates visually:
            1. Policy overview ("Your policy, understood.")
            2. Small Ask InsureMate card (~15-20% visual height)
            3. Treatment scenario ("What will your treatment cost?")
            4. Cost estimation
            5. Coverage / out-of-pocket result
            6. Explanation ("Why this estimate?")
            7. Confidence / missing information
            8. Recalculation
        */}
        {currentStep === 1 ? (
          <Step1Upload />
        ) : (
          <div className="space-y-16">
            {/* 1. Policy overview ("Your policy, understood.") & 2. Small Ask InsureMate card */}
            <section id="policy-overview-section" className="scroll-mt-32">
              <Step2Understand />
            </section>

            {/* 3. Treatment scenario ("What will your treatment cost?") */}
            <section id="treatment-scenario-section" className="scroll-mt-32">
              <Step3Treatment />
            </section>

            {/* 4. Cost estimation */}
            <section id="cost-estimate-section" className="scroll-mt-32">
              <Step4Estimate />
            </section>

            {/* 5. Coverage / out-of-pocket result, 6. Explanation, 7. Confidence, 8. Recalculation */}
            <section id="result-explanation-section" className="scroll-mt-32">
              <Step5Result />
            </section>
          </div>
        )}

      </main>

      {/* Clean Footer */}
      <footer className="py-5 text-center text-xs text-slate-500 border-t border-slate-200/80 mt-auto bg-white/60">
        InsureMate · Indian Health Insurance Policy Intelligence Flow · ₹ INR Context
      </footer>

      {/* Toast notifications */}
      <ToastContainer />

      {/* Floating AI Assistant Button & Popup (available on Steps >= 2 without leaving the workflow) */}
      {currentStep >= 2 && <FloatingAIAssistantButton />}

    </div>
  );
};
