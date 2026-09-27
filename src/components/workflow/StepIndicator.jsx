import React from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { 
  UploadCloud, 
  BookOpen, 
  Stethoscope, 
  Calculator, 
  CheckCircle2, 
  Check, 
  ChevronRight 
} from 'lucide-react';

export const StepIndicator = () => {
  const { currentStep, maxUnlockedStep, goToStep } = usePolicy();

  const steps = [
    { num: 1, id: "upload", label: "Upload", icon: UploadCloud, subtitle: "01 Upload" },
    { num: 2, id: "understand", label: "Understand", icon: BookOpen, subtitle: "02 Understand" },
    { num: 3, id: "treatment", label: "Treatment", icon: Stethoscope, subtitle: "03 Treatment" },
    { num: 4, id: "estimate", label: "Estimate", icon: Calculator, subtitle: "04 Estimate" },
    { num: 5, id: "result", label: "Result", icon: CheckCircle2, subtitle: "05 Result" }
  ];

  // Calculate progress percentage
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-[#1E1B4B] text-white border-b border-indigo-900/80 shadow-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        
        {/* Top Progress Line & Step Nodes */}
        <div className="relative">
          
          {/* Background Gray Line */}
          <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-indigo-950 rounded-full z-0 hidden sm:block"></div>
          
          {/* Animated Progress Fill Line */}
          <div 
            className="absolute top-1/2 left-6 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 rounded-full z-0 transition-all duration-500 ease-out hidden sm:block"
            style={{ width: `calc(${progressPercent}% * 0.88)` }}
          ></div>

          {/* Step Nodes Row */}
          <div className="relative z-10 flex items-center justify-between">
            {steps.map((s) => {
              const isCurrent = currentStep === s.num;
              const isCompleted = currentStep > s.num;
              const isUnlocked = s.num <= maxUnlockedStep;
              const Icon = s.icon;

              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && goToStep(s.num)}
                  className={`flex flex-col items-center group focus:outline-none transition-all ${
                    isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                  }`}
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                      isCurrent
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ring-4 ring-purple-500/30 scale-110 shadow-glow-purple'
                        : isCompleted
                        ? 'bg-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white stroke-[2.5]" />
                    ) : (
                      <span>0{s.num}</span>
                    )}
                  </div>

                  {/* Step Labels */}
                  <div className="mt-2 text-center">
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'text-white font-extrabold'
                          : isCompleted
                          ? 'text-emerald-400 font-semibold'
                          : 'text-indigo-300 font-medium'
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
