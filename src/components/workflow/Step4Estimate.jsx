import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { 
  Calculator, 
  IndianRupee, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  TrendingDown,
  Layers,
  HelpCircle
} from 'lucide-react';

export const Step4Estimate = () => {
  const { 
    currentPolicy, 
    treatmentScenario, 
    currentEstimate, 
    advanceToNextStep 
  } = usePolicy();

  // Animation stage sequence
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Animated Count-Up figures for the core metrics
  const [animatedFigures, setAnimatedFigures] = useState({
    treatmentCost: 0,
    deductible: 0,
    copayAmount: 0,
    nonCovered: 0,
    potentiallyCovered: 0,
    outOfPocket: 0,
    coveredPercent: 0,
    outOfPocketPercent: 0
  });

  const finalCost = currentEstimate.costBreakdown.totalEstimatedCost || 200000;
  const finalDeductible = currentEstimate.deductionFactors.deductible || 20000;
  const finalCopay = currentEstimate.deductionFactors.copayAmount || 10000;
  const finalNonCovered = currentEstimate.deductionFactors.totalNonCovered || 15000;
  const finalCovered = currentEstimate.coverageSummary.potentiallyCovered || 165000;
  const finalOOP = currentEstimate.coverageSummary.estimatedOutOfPocket || 35000;
  const finalCoveredPct = currentEstimate.coverageSummary.coveragePercentage || 82.5;
  const finalOOPPct = currentEstimate.coverageSummary.outOfPocketPercentage || 17.5;

  // Stagger stages appearance
  useEffect(() => {
    setActiveStageIndex(0);
    const timers = [
      setTimeout(() => setActiveStageIndex(1), 150),
      setTimeout(() => setActiveStageIndex(2), 350),
      setTimeout(() => setActiveStageIndex(3), 550),
      setTimeout(() => setActiveStageIndex(4), 750),
      setTimeout(() => setActiveStageIndex(5), 950),
      setTimeout(() => setActiveStageIndex(6), 1150)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [currentEstimate]);

  // Eased count up on mount
  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedFigures({
        treatmentCost: Math.floor(ease * finalCost),
        deductible: Math.floor(ease * finalDeductible),
        copayAmount: Math.floor(ease * finalCopay),
        nonCovered: Math.floor(ease * finalNonCovered),
        potentiallyCovered: Math.floor(ease * finalCovered),
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
  }, [finalCost, finalDeductible, finalCopay, finalNonCovered, finalCovered, finalOOP, finalCoveredPct, finalOOPPct]);

  // Prompt exact sequence:
  // Treatment Cost ₹2,00,000 → Deductible ₹20,000 → Co-payment 10% → Non-covered expenses ₹15,000 → Potentially Covered ₹1,65,000 → Estimated Out-of-Pocket ₹35,000
  const calculationStages = [
    {
      step: 1,
      label: "Treatment Cost",
      valueText: `₹${animatedFigures.treatmentCost.toLocaleString('en-IN')}`,
      subtext: "Gross hospital tariff",
      colorType: "neutral"
    },
    {
      step: 2,
      label: "Deductible",
      valueText: `₹${animatedFigures.deductible.toLocaleString('en-IN')}`,
      subtext: "Page 12 • Section 3.1",
      colorType: "deductible"
    },
    {
      step: 3,
      label: "Co-payment",
      valueText: "10%",
      subtext: `₹${animatedFigures.copayAmount.toLocaleString('en-IN')} patient share`,
      colorType: "copay"
    },
    {
      step: 4,
      label: "Non-covered expenses",
      valueText: `₹${animatedFigures.nonCovered.toLocaleString('en-IN')}`,
      subtext: "Consumables & sub-limits",
      colorType: "deduction"
    },
    {
      step: 5,
      label: "Potentially Covered",
      valueText: `₹${animatedFigures.potentiallyCovered.toLocaleString('en-IN')}`,
      subtext: `${animatedFigures.coveredPercent}% estimated insurer share`,
      colorType: "covered"
    },
    {
      step: 6,
      label: "Estimated Out-of-Pocket",
      valueText: `₹${animatedFigures.outOfPocket.toLocaleString('en-IN')}`,
      subtext: `${animatedFigures.outOfPocketPercent}% patient responsibility`,
      colorType: "oop"
    }
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto step-transition pb-8">
      
      {/* SECTION 05 Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
          <span>Step 05 · Cost Calculation Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
          Admissibility & Out-of-Pocket Calculation
        </h2>
        <p className="text-sm sm:text-base text-navy-600 max-w-2xl mx-auto leading-relaxed">
          How your policy deductible, co-payment rates, and non-covered items shape the final hospital expense.
        </p>
      </div>

      {/* CORE ANIMATED CALCULATION FLOW (Not a table. Animated flow with connectors & count-ups) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 sm:p-8 space-y-8">
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>Animated Policy Admissibility Chain</span>
            </span>
            <span className="text-[11px] font-mono text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded font-bold border border-blue-200">
              Interactive Flow
            </span>
          </div>

          {/* Connected horizontal calculation flow */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
            {calculationStages.map((stage, idx) => {
              const isVisible = idx < activeStageIndex;
              const isCovered = stage.colorType === "covered";
              const isOOP = stage.colorType === "oop";

              return (
                <div
                  key={stage.step}
                  className={`relative p-4 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                    !isVisible
                      ? 'opacity-20 scale-95 border-slate-200'
                      : isCovered
                      ? 'bg-emerald-50/90 border-emerald-400 shadow-glow-emerald scale-100'
                      : isOOP
                      ? 'bg-amber-50/90 border-amber-400 shadow-md scale-100'
                      : 'bg-slate-50 border-slate-200 shadow-subtle scale-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                      <span>0{stage.step}</span>
                      {idx < calculationStages.length - 1 && (
                        <span className="text-slate-300 hidden lg:inline">→</span>
                      )}
                    </div>

                    <div className="text-xs font-bold text-navy-900 mt-2 leading-tight">
                      {stage.label}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className={`font-mono font-black text-sm sm:text-base tracking-tight ${
                      isCovered ? 'text-emerald-700' : isOOP ? 'text-amber-900' : 'text-navy-900'
                    }`}>
                      {stage.valueText}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                      {stage.subtext}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LARGE RESULT VISUALIZATION: LARGE COST FIGURE + ANIMATED STACKED BAR WITH TOOLTIPS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1220] text-white border border-navy-800 shadow-premium space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Total Treatment Scenario Cost
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white font-mono mt-1 tracking-tight">
                ₹{animatedFigures.treatmentCost.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                {currentEstimate.procedure.name} • {treatmentScenario.hospital}
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-navy-800 sm:pl-6 space-y-1">
              <span className="text-[10px] font-mono text-brand-blue font-bold block">
                SUM INSURED ADMISSIBILITY
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Available Cover: ₹{currentPolicy.financials.availableSumInsured.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* ANIMATED STACKED BAR WITH HOVER TOOLTIPS (AMOUNT, PERCENTAGE, REASON) */}
          <div className="space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <div 
                className="flex items-center gap-1.5 text-emerald-400 cursor-pointer"
                onMouseEnter={() => setHoveredSegment('covered')}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Potentially Covered: ₹{animatedFigures.potentiallyCovered.toLocaleString('en-IN')} ({animatedFigures.coveredPercent}%)</span>
              </div>
              
              <div 
                className="flex items-center gap-1.5 text-amber-400 cursor-pointer"
                onMouseEnter={() => setHoveredSegment('oop')}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Estimated Out-of-Pocket: ₹{animatedFigures.outOfPocket.toLocaleString('en-IN')} ({animatedFigures.outOfPocketPercent}%)</span>
              </div>
            </div>

            {/* Interactive Stacked Bar */}
            <div className="relative w-full bg-navy-950 h-10 rounded-2xl overflow-hidden flex shadow-inner border border-navy-800 p-1 gap-1">
              <div
                onMouseEnter={() => setHoveredSegment('covered')}
                onMouseLeave={() => setHoveredSegment(null)}
                className="bg-emerald-500 h-full rounded-xl flex items-center justify-center text-white text-xs font-black transition-all duration-1000 ease-out shadow-glow-emerald cursor-pointer hover:brightness-110"
                style={{ width: `${animatedFigures.coveredPercent}%` }}
              >
                {animatedFigures.coveredPercent > 18 ? `₹${animatedFigures.potentiallyCovered.toLocaleString('en-IN')} (Potentially Covered)` : ''}
              </div>
              
              <div
                onMouseEnter={() => setHoveredSegment('oop')}
                onMouseLeave={() => setHoveredSegment(null)}
                className="bg-amber-500 h-full rounded-xl flex items-center justify-center text-white text-xs font-black transition-all duration-1000 ease-out cursor-pointer hover:brightness-110"
                style={{ width: `${animatedFigures.outOfPocketPercent}%` }}
              >
                {animatedFigures.outOfPocketPercent > 18 ? `₹${animatedFigures.outOfPocket.toLocaleString('en-IN')} (Out-of-Pocket)` : ''}
              </div>
            </div>

            {/* Hover Tooltip Box (Amount, Percentage, Reason) */}
            <div className="min-h-[50px] p-3 rounded-xl bg-navy-900/90 border border-navy-800 text-xs transition-all">
              {hoveredSegment === 'covered' ? (
                <div className="space-y-0.5 text-emerald-300">
                  <div className="font-bold flex items-center gap-2">
                    <span>Potentially Covered: ₹{finalCovered.toLocaleString('en-IN')} ({finalCoveredPct}%)</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <strong>Reason:</strong> Inpatient surgery fees, OT charges, and standard implant prosthesis admissible under policy Section 4.2.
                  </div>
                </div>
              ) : hoveredSegment === 'oop' ? (
                <div className="space-y-0.5 text-amber-300">
                  <div className="font-bold flex items-center gap-2">
                    <span>Estimated Out-of-Pocket: ₹{finalOOP.toLocaleString('en-IN')} ({finalOOPPct}%)</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <strong>Reason:</strong> ₹20,000 Deductible + 10% Co-payment + non-payable hospital consumables.
                  </div>
                </div>
              ) : (
                <div className="text-slate-400 text-[11px] flex items-center gap-1.5 italic">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Hover over the green or amber segment above to view exact amount, percentage, and policy adjudication reason.</span>
                </div>
              )}
            </div>

            {/* Strict wording rule banner */}
            <div className="text-center text-[11px] text-slate-400 italic pt-1 border-t border-navy-850">
              *Illustrative Estimate — Not a Final Insurance Decision. All payouts are subject to hospital billing itemization and final insurer adjudication.
            </div>

          </div>

        </div>

        {/* SINGLE PRIMARY CTA TO STEP 5 */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('result-explanation-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                advanceToNextStep();
              }
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm rounded-xl shadow-premium hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
          >
            <span>View Full Explanation & Reliability</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

    </div>
  );
};
