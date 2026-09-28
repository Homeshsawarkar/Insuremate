import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { 
  UploadCloud, 
  BookOpen, 
  Stethoscope, 
  Calculator, 
  CheckCircle2, 
  Check
} from 'lucide-react';

export const StepIndicator = () => {
  const { currentStep, maxUnlockedStep, goToStep } = usePolicy();
  const [activeNum, setActiveNum] = useState(currentStep);

  const steps = [
    { num: 1, id: "upload", label: "Upload", icon: UploadCloud, subtitle: "01 Upload" },
    { num: 2, id: "understand", label: "Understand", icon: BookOpen, subtitle: "02 Understand" },
    { num: 3, id: "treatment", label: "Treatment", icon: Stethoscope, subtitle: "03 Treatment" },
    { num: 4, id: "estimate", label: "Estimate", icon: Calculator, subtitle: "04 Estimate" },
    { num: 5, id: "result", label: "Result", icon: CheckCircle2, subtitle: "05 Result" }
  ];

  // Sync activeNum on step changes
  useEffect(() => {
    setActiveNum(currentStep);
  }, [currentStep]);

  // Scroll spy when on master page (currentStep >= 2)
  useEffect(() => {
    if (currentStep === 1) return;

    const sections = [
      { id: 'policy-overview-section', num: 2 },
      { id: 'treatment-scenario-section', num: 3 },
      { id: 'cost-estimate-section', num: 4 },
      { id: 'result-explanation-section', num: 5 }
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNum(sections[i].num);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep]);

  const handleStepClick = (num) => {
    if (num === 1) {
      goToStep(1, true);
    } else {
      if (currentStep === 1) {
        goToStep(num, false);
      }
      const sectionMap = {
        2: 'policy-overview-section',
        3: 'treatment-scenario-section',
        4: 'cost-estimate-section',
        5: 'result-explanation-section'
      };
      const sectionId = sectionMap[num];
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, currentStep === 1 ? 80 : 0);
      }
    }
  };

  const progressPercent = ((activeNum - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-[#0B1220] text-white border-b border-navy-800/80 shadow-subtle sticky top-[57px] z-30 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5">
        
        <div className="relative">
          {/* Subtle connecting track line */}
          <div className="absolute top-4 left-6 right-6 h-[2px] bg-navy-800 rounded-full z-0 hidden sm:block"></div>
          
          {/* Active progress fill */}
          <div 
            className="absolute top-4 left-6 h-[2px] bg-gradient-to-r from-brand-blue to-emerald-500 rounded-full z-0 transition-all duration-500 ease-out hidden sm:block"
            style={{ width: `calc(${progressPercent}% * 0.88)` }}
          ></div>

          {/* Step items */}
          <div className="relative z-10 flex items-center justify-between">
            {steps.map((s) => {
              const isCurrent = activeNum === s.num;
              const isCompleted = activeNum > s.num;
              const isUnlocked = s.num <= maxUnlockedStep;

              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && handleStepClick(s.num)}
                  className={`flex flex-col items-center group focus:outline-none transition-all ${
                    isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-45'
                  }`}
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isCurrent
                        ? 'bg-brand-blue text-white ring-4 ring-brand-blue/30 scale-105 shadow-glow-blue'
                        : isCompleted
                        ? 'bg-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-navy-900 text-slate-400 border border-navy-700 group-hover:border-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white stroke-[2.5]" />
                    ) : (
                      <span>0{s.num}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="mt-1.5 text-center">
                    <span
                      className={`text-[11px] sm:text-xs font-semibold tracking-tight transition-colors ${
                        isCurrent
                          ? 'text-white font-bold'
                          : isCompleted
                          ? 'text-emerald-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
