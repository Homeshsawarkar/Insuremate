import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { 
  Calculator, 
  IndianRupee, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Step4Estimate = () => {
  const { 
    currentPolicy, 
    treatmentScenario, 
    currentEstimate, 
    advanceToNextStep 
  } = usePolicy();

  // Sequence stages animation state
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Animated Count-Up figures for the core metrics
  const [animatedFigures, setAnimatedFigures] = useState({
    total: 0,
    covered: 0,
    outOfPocket: 0,
    coveredPercent: 0,
    outOfPocketPercent: 0
  });

  const finalTotal = currentEstimate.costBreakdown.totalEstimatedCost;
  const finalCovered = currentEstimate.coverageSummary.potentiallyCovered;
  const finalOOP = currentEstimate.coverageSummary.estimatedOutOfPocket;
  const finalCoveredPct = currentEstimate.coverageSummary.coveragePercentage;
  const finalOOPPct = currentEstimate.coverageSummary.outOfPocketPercentage;

  // Stagger stages appearance
  useEffect(() => {
    setActiveStageIndex(0);
    const t1 = setTimeout(() => setActiveStageIndex(1), 200);
    const t2 = setTimeout(() => setActiveStageIndex(2), 400);
    const t3 = setTimeout(() => setActiveStageIndex(3), 600);
    const t4 = setTimeout(() => setActiveStageIndex(4), 800);
    const t5 = setTimeout(() => setActiveStageIndex(5), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [currentEstimate]);

  // Eased count up on mount
  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Fast-start / slow-settle cubic easing
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedFigures({
        total: Math.floor(ease * finalTotal),
        covered: Math.floor(ease * finalCovered),
        outOfPocket: Math.floor(ease * finalOOP),
        coveredPercent: Math.floor(ease * finalCoveredPct),
        outOfPocketPercent: Math.floor(ease * finalOOPPct)
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [finalTotal, finalCovered, finalOOP, finalCoveredPct, finalOOPPct]);

  // Connected Sequence Stages Data
  const stages = [
    {
      num: 1,
      title: "Treatment Cost",
      value: `₹${currentEstimate.costBreakdown.totalEstimatedCost.toLocaleString('en-IN')}`,
      type: "base",
      badge: "Gross Tariff",
      runningTotal: currentEstimate.costBreakdown.totalEstimatedCost
    },
    {
      num: 2,
      title: "Deductible Applied",
      value: `₹${currentPolicy.financials.deductible}`,
      type: "deductible",
      badge: "Nil Deductible",
      runningTotal: currentEstimate.costBreakdown.totalEstimatedCost
    },
    {
      num: 3,
      title: "Co-Payment Rate",
      value: `${currentEstimate.deductionFactors.copayPercentage}%`,
      type: "copay",
      badge: "0% Network Cashless",
      runningTotal: currentEstimate.costBreakdown.totalEstimatedCost
    },
    {
      num: 4,
      title: "Non-Covered Expenses",
      value: `-₹${(currentEstimate.deductionFactors.nonPayableConsumables + currentEstimate.deductionFactors.roomRentExcess + currentEstimate.deductionFactors.proportionateDeduction + currentEstimate.deductionFactors.sublimitDeduction).toLocaleString('en-IN')}`,
      type: "deduction",
      badge: "Sublimits & Non-Payables",
      runningTotal: currentEstimate.coverageSummary.potentiallyCovered
    },
    {
      num: 5,
      title: "Potentially Covered",
      value: `₹${currentEstimate.coverageSummary.potentiallyCovered.toLocaleString('en-IN')}`,
      type: "covered",
      badge: "Insurer Share",
      runningTotal: currentEstimate.coverageSummary.potentiallyCovered
    },
    {
      num: 6,
      title: "Estimated Out-of-Pocket",
      value: `₹${currentEstimate.coverageSummary.estimatedOutOfPocket.toLocaleString('en-IN')}`,
      type: "oop",
      badge: "Patient Responsibility",
      runningTotal: currentEstimate.coverageSummary.estimatedOutOfPocket
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto step-transition">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Step 04 · Cost Estimation & Admissibility</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Admissibility & Out-of-Pocket Calculation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          How your policy clauses, room-rent sublimits, and non-payable lists shape your estimated hospital bill.
        </p>
      </div>

      {/* CORE VISUAL MOMENT: CONNECTED CALCULATION SEQUENCE (Hard Requirement 4) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-8">
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              <span>Step-by-Step Policy Admissibility Chain</span>
            </span>
            <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded font-bold">
              Automated Flow
            </span>
          </div>

          {/* Connected Flow Line Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {stages.map((stage, idx) => {
              const isVisible = idx <= activeStageIndex;
              const isCovered = stage.type === "covered";
              const isOOP = stage.type === "oop";

              return (
                <div
                  key={stage.num}
                  className={`p-3.5 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                    !isVisible
                      ? 'opacity-20 scale-95 border-slate-200'
                      : isCovered
                      ? 'bg-emerald-50/90 border-emerald-400 shadow-glow-emerald scale-100'
                      : isOOP
                      ? 'bg-amber-50/90 border-amber-400 shadow-md scale-100'
                      : 'bg-slate-50 border-slate-200 shadow-2xs scale-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                      <span>0{stage.num}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                        isCovered ? 'bg-emerald-200 text-emerald-900' : isOOP ? 'bg-amber-200 text-amber-900' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {stage.badge}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-800 mt-2 leading-tight">
                      {stage.title}
                    </div>
                  </div>

                  <div className={`mt-3 font-mono font-black text-sm sm:text-base ${
                    isCovered ? 'text-emerald-700' : isOOP ? 'text-amber-900' : 'text-[#1E1B4B]'
                  }`}>
                    {stage.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LARGE RESULT VISUALIZATION: LARGE COST FIGURE + ANIMATED STACKED BAR (Hard Requirement 4) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0E2A] text-white border border-indigo-900 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-950">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Total Estimated Treatment Cost
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white font-mono mt-1 tracking-tight">
                ₹{animatedFigures.total.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-indigo-300 mt-1">
                {currentEstimate.procedure.name} • {treatmentScenario.hospital}
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-indigo-900 sm:pl-6 space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                POLICY WORDING COMPLIANCE
              </span>
              <span className="text-xs text-slate-300">
                Available SI: ₹{currentPolicy.financials.availableSumInsured.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Animated Stacked Bar (0 -> values with color-coded segments and labels) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Potentially Covered: ₹{animatedFigures.covered.toLocaleString('en-IN')} ({animatedFigures.coveredPercent}%)</span>
              </span>
              <span className="text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Estimated Out-of-Pocket: ₹{animatedFigures.outOfPocket.toLocaleString('en-IN')} ({animatedFigures.outOfPocketPercent}%)</span>
              </span>
            </div>

            {/* Visual Stacked Bar with smooth fill */}
            <div className="w-full bg-slate-900 h-8 rounded-2xl overflow-hidden flex shadow-inner border border-indigo-950">
              <div
                className="bg-emerald-500 h-full flex items-center justify-center text-white text-xs font-extrabold transition-all duration-1000 ease-out shadow-glow-emerald"
                style={{ width: `${animatedFigures.coveredPercent}%` }}
              >
                {animatedFigures.coveredPercent > 15 ? `${animatedFigures.coveredPercent}% Covered` : ''}
              </div>
              <div
                className="bg-amber-500 h-full flex items-center justify-center text-white text-xs font-extrabold transition-all duration-1000 ease-out"
                style={{ width: `${animatedFigures.outOfPocketPercent}%` }}
              >
                {animatedFigures.outOfPocketPercent > 15 ? `${animatedFigures.outOfPocketPercent}% Out-of-Pocket` : ''}
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-400 italic pt-1">
              *Illustrative Estimate — Not a Final Insurance Decision. Subject to hospital package itemization and TPA approval.
            </div>
          </div>

        </div>

        {/* SINGLE PRIMARY CTA TO STEP 5 */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={advanceToNextStep}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>View Full Explanation & Reliability</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

    </div>
  );
};
