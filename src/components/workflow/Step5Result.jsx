import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { DocumentSourceModal } from './DocumentSourceModal';
import { 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  Sparkles, 
  Check, 
  FileText, 
  IndianRupee, 
  RotateCcw,
  CheckCircle2,
  Eye,
  ArrowRight
} from 'lucide-react';

export const Step5Result = () => {
  const { 
    currentPolicy, 
    treatmentScenario, 
    currentEstimate, 
    previousEstimate, 
    recalculationReason, 
    runRecalculation,
    resetWorkflow 
  } = usePolicy();

  // Modal evidence viewer state
  const [modalEvidence, setModalEvidence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expandable panel state for "Why this estimate?"
  const [isWhyOpen, setIsWhyOpen] = useState(true);

  // Expandable panel for "Add More Information"
  const [isAddInfoOpen, setIsAddInfoOpen] = useState(false);

  // Recalculation form fields
  const [editRoomCategory, setEditRoomCategory] = useState("Twin Sharing A/C");
  const [editAge, setEditAge] = useState(treatmentScenario.patientAge || 55);
  const [editCost, setEditCost] = useState(treatmentScenario.expectedCost || 200000);
  const [editHospital, setEditHospital] = useState(treatmentScenario.hospital || "Sahyadri Super Speciality Hospital, Pune");
  const [editPreExisting, setEditPreExisting] = useState(treatmentScenario.hasPreExisting || false);

  // Recalculation multi-step animation sequence state
  // Sequence per prompt: "New information detected" (✓ Hospital updated ✓ Patient information updated) → "Recalculating..." → Previous estimate ₹35,000 animates out, Updated estimate ₹42,000 counts up.
  const [recalcStep, setRecalcStep] = useState('idle'); // 'idle' | 'detected' | 'calculating' | 'done'
  const [displayedOOP, setDisplayedOOP] = useState(currentEstimate.coverageSummary.estimatedOutOfPocket);

  // Circular Confidence Ring Animation (87%, MEDIUM-HIGH CONFIDENCE)
  const [ringScore, setRingScore] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1000;
    const target = currentEstimate.confidence?.score || 87;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setRingScore(Math.floor(ease * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [currentEstimate.confidence?.score]);

  // Handle Recalculate Sequence
  const handleRecalculateSubmit = (e) => {
    e.preventDefault();
    
    // Step 1: "New information detected"
    setRecalcStep('detected');

    // Step 2: "Recalculating..."
    setTimeout(() => {
      setRecalcStep('calculating');
      
      // Step 3: Animate out previous estimate and count up updated estimate
      setTimeout(() => {
        let reason = "Your estimate changed because additional information was provided: Updated hospital room tier and patient eligibility factors.";
        
        runRecalculation({
          patientAge: parseInt(editAge, 10),
          expectedCost: parseInt(editCost, 10),
          hospital: editHospital,
          hasPreExisting: editPreExisting,
          roomCategory: editRoomCategory,
          isNetworkOverride: true,
          isRecalculated: true
        }, reason);

        // Animate count up from 35,000 to 42,000
        const startVal = 35000;
        const endVal = 42000;
        let startT = null;
        const dur = 800;
        
        const countStep = (time) => {
          if (!startT) startT = time;
          const prog = Math.min((time - startT) / dur, 1);
          const val = Math.floor(startVal + (endVal - startVal) * prog);
          setDisplayedOOP(val);
          if (prog < 1) {
            window.requestAnimationFrame(countStep);
          } else {
            setRecalcStep('done');
          }
        };
        window.requestAnimationFrame(countStep);

      }, 900);
    }, 800);
  };

  // Open Document Source modal with exact policy reference
  const handleOpenSourceByRef = (refKey) => {
    if (refKey === 'deductible') {
      setModalEvidence({
        page: 12,
        section: "Section 3.1 • Annual Aggregate Deductible",
        excerpt: "The Insured shall bear an aggregate Deductible of ₹20,000 for each policy year prior to any benefits becoming payable under the Hospitalization Benefit."
      });
    } else if (refKey === 'copay') {
      setModalEvidence({
        page: 21,
        section: "Section 5.2 • Co-Payment Adjudication",
        excerpt: "A Co-payment of 10% is applicable on admissible claim amounts incurred at Non-Network Hospitals or for specific specialized elective treatments."
      });
    } else if (refKey === 'sublimit') {
      setModalEvidence({
        page: 24,
        section: "Section 6.1 • Specific Procedure Sub-Limits",
        excerpt: "Expenses for Joint Replacement / Knee Surgery are capped at a maximum admissible sub-limit of ₹2,50,000 per joint, excluding IRDAI non-medical consumables."
      });
    }
    setIsModalOpen(true);
  };

  const oopAmount = recalcStep === 'done' || previousEstimate ? 42000 : 35000;
  const coveredAmount = recalcStep === 'done' || previousEstimate ? 158000 : 165000;

  return (
    <div className="space-y-8 max-w-4xl mx-auto step-transition pb-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Step 05 · Final Admissibility & Diagnostic Result</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
          Your Treatment Cost Intelligence
        </h2>
        <p className="text-sm sm:text-base text-navy-600 max-w-xl mx-auto leading-relaxed">
          Clear financial breakdown, exact policy evidence citations, confidence scoring, and recalculation.
        </p>
      </div>

      {/* FINAL RESULT VIEW CARD (CLEAN, ONLY THIS PER PROMPT) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Core Financial Summary Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Treatment</span>
            <p className="font-extrabold text-navy-900 text-sm mt-0.5 truncate">
              {currentEstimate.procedure.name}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Treatment Cost</span>
            <p className="font-extrabold text-navy-900 text-base font-mono mt-0.5">
              ₹{(currentEstimate.costBreakdown.totalEstimatedCost || 200000).toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Potentially Covered</span>
            <p className="font-extrabold text-emerald-600 text-base font-mono mt-0.5">
              ₹{coveredAmount.toLocaleString('en-IN')}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Estimated Out-of-Pocket</span>
            <p className="font-extrabold text-amber-900 text-base font-mono mt-0.5">
              ₹{oopAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* SECTION 06 — WHY THIS ESTIMATE? (Expandable panel with clickable policy references) */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsWhyOpen(!isWhyOpen)}
            className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-blue" />
              <h3 className="font-bold text-navy-900 text-xs sm:text-sm">
                Why this estimate?
              </h3>
            </div>
            {isWhyOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isWhyOpen && (
            <div className="p-5 divide-y divide-slate-100 text-xs animate-in fade-in duration-150 space-y-2">
              
              {/* Formula Headline */}
              <div className="pb-3 text-xs font-bold text-navy-900 bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex flex-wrap items-center justify-between gap-2">
                <span>Calculation Formula:</span>
                <span className="font-mono text-brand-blue">
                  ₹20,000 Deductible + {recalcStep === 'done' || previousEstimate ? '₹14,000 Co-payment' : '₹10,000 Co-payment'} + {recalcStep === 'done' || previousEstimate ? '₹8,000 Non-covered' : '₹5,000 Non-covered'} = ₹{oopAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* 1. Deductible (Page 12 • Section 3.1) */}
              <div className="pt-3 pb-2 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-navy-900 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>₹20,000 Deductible</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Applicable annual aggregate deductible before policy benefits attach.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenSourceByRef('deductible')}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 text-brand-blue border border-blue-200 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 transition-colors shadow-subtle flex-shrink-0"
                >
                  <Eye className="w-3 h-3" />
                  <span>Page 12 • Section 3.1</span>
                </button>
              </div>

              {/* 2. Co-payment (Page 21 • Section 5.2) */}
              <div className="py-2.5 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-navy-900 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>{recalcStep === 'done' || previousEstimate ? '₹14,000 Co-payment (10% + Age Factor)' : '₹10,000 Co-payment (10%)'}</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    Standard cost-sharing co-payment percentage applied to admissible hospital bill.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenSourceByRef('copay')}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 text-brand-blue border border-blue-200 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 transition-colors shadow-subtle flex-shrink-0"
                >
                  <Eye className="w-3 h-3" />
                  <span>Page 21 • Section 5.2</span>
                </button>
              </div>

              {/* 3. Sub-limit / Non-covered (Page 24 • Section 6.1) */}
              <div className="py-2.5 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-navy-900 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px]">ℹ</span>
                    <span>{recalcStep === 'done' || previousEstimate ? '₹8,000 Non-covered expenses & sub-limits' : '₹5,000 Non-covered expenses'}</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">
                    IRDAI non-payable consumables (PPE, sanitizer, registration) and procedure sub-limit caps.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenSourceByRef('sublimit')}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 text-brand-blue border border-blue-200 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1 transition-colors shadow-subtle flex-shrink-0"
                >
                  <Eye className="w-3 h-3" />
                  <span>Page 24 • Section 6.1</span>
                </button>
              </div>

            </div>
          )}
        </div>

        {/* SECTION 07 — CONFIDENCE & MISSING INFORMATION */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-navy-900">
                Confidence & Missing Information
              </h3>
              <p className="text-xs text-navy-500 mt-0.5">
                We disclose missing hospital information rather than making ungrounded assumptions.
              </p>
            </div>

            {/* Animated circular indicator: 87%, MEDIUM-HIGH CONFIDENCE */}
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" stroke="#E2E8F0" strokeWidth="5" fill="transparent" />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    stroke="#10B981"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray="150.8"
                    strokeDashoffset={150.8 - (150.8 * ringScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-sm text-navy-900">
                  {ringScore}%
                </span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-navy-900 block uppercase tracking-wider text-[10px]">
                  AI Confidence
                </span>
                <span className="text-emerald-700 font-extrabold text-xs">
                  {recalcStep === 'done' || previousEstimate ? "91% HIGH CONFIDENCE" : "87% MEDIUM-HIGH CONFIDENCE"}
                </span>
              </div>
            </div>
          </div>

          {/* Known vs Missing information bars */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-navy-700 mb-1 font-semibold">
                <span>Verified Policy Information (Sum Insured, Deductibles, Sub-limits)</span>
                <span className="text-emerald-700 font-bold">{recalcStep === 'done' || previousEstimate ? '91%' : '87%'}</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: recalcStep === 'done' || previousEstimate ? '91%' : '87%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-navy-700 mb-1 font-semibold">
                <span>Missing / Unconfirmed Hospital Parameters</span>
                <span className="text-amber-700 font-bold">{recalcStep === 'done' || previousEstimate ? '9%' : '13%'}</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-700" style={{ width: recalcStep === 'done' || previousEstimate ? '9%' : '13%' }}></div>
              </div>
            </div>
          </div>

          {/* Amber missing items (Prompt: ⚠ Exact hospital package unavailable ⚠ Waiting-period eligibility requires confirmation ⚠ Final billing amount unavailable) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Missing Information (Transparency Disclosure):</span>
            </span>

            <ul className="space-y-2 text-xs text-navy-800">
              <li className="flex items-start gap-2.5 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                <span className="text-amber-600 font-bold">⚠</span>
                <span>Exact hospital package unavailable</span>
              </li>
              <li className="flex items-start gap-2.5 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                <span className="text-amber-600 font-bold">⚠</span>
                <span>Waiting-period eligibility requires confirmation</span>
              </li>
              <li className="flex items-start gap-2.5 bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                <span className="text-amber-600 font-bold">⚠</span>
                <span>Final billing amount unavailable</span>
              </li>
            </ul>

            <p className="text-[11px] text-navy-500 italic pt-1">
              "These missing details may change the final estimate." Missing information represents transparent clinical disclosure, not a system failure.
            </p>
          </div>
        </div>

        {/* SECTION 08 — ADD INFORMATION + RECALCULATE */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1220] text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-brand-blue" />
                <span>Want a more precise estimate? Add more information.</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Update hospital details, treatment room tariff, patient age, or expected billing to refine your numbers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddInfoOpen(!isAddInfoOpen)}
              className="px-4 py-2 bg-navy-800 hover:bg-navy-700 border border-navy-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto"
            >
              <span>{isAddInfoOpen ? "Hide Form" : "Edit Parameters"}</span>
              {isAddInfoOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Interactive Recalculation Sequence States */}
          {recalcStep === 'detected' && (
            <div className="p-4 rounded-xl bg-blue-950/80 border border-brand-blue text-xs text-white space-y-1.5 animate-in fade-in">
              <div className="font-bold flex items-center gap-2 text-brand-blue">
                <Sparkles className="w-4 h-4" />
                <span>New information detected</span>
              </div>
              <div className="text-slate-300 pl-6 space-y-0.5 text-[11px]">
                <div>✓ Hospital updated: {editHospital}</div>
                <div>✓ Patient information updated: Age {editAge}, Room: {editRoomCategory}</div>
              </div>
            </div>
          )}

          {recalcStep === 'calculating' && (
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 text-xs text-white flex items-center gap-3 animate-in fade-in">
              <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
              <span className="font-bold">Recalculating...</span>
            </div>
          )}

          {(recalcStep === 'done' || previousEstimate) && (
            <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/80 text-xs text-white space-y-2 animate-in fade-in">
              <div className="font-bold text-emerald-400 flex items-center justify-between">
                <span>Your estimate changed because additional information was provided:</span>
                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-mono font-bold">RECALCULATED</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Hospital tariff and patient parameters updated. Previous estimate was <strong>₹35,000</strong>. Updated estimate is <strong>₹42,000</strong> based on refined billing itemization.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs">
                <span className="text-slate-400">Previous: <del className="text-red-400 font-mono">₹35,000</del></span>
                <span className="text-emerald-400 font-bold font-mono">Updated: ₹42,000</span>
              </div>
            </div>
          )}

          {/* Editable Parameters Form */}
          {isAddInfoOpen && (
            <form onSubmit={handleRecalculateSubmit} className="pt-4 border-t border-navy-800 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                
                {/* 1. Hospital */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    value={editHospital}
                    onChange={(e) => setEditHospital(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white focus:outline-none focus:border-brand-blue font-medium"
                  />
                </div>

                {/* 2. Treatment Details / Room Category */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Room Category Tariff</label>
                  <select
                    value={editRoomCategory}
                    onChange={(e) => setEditRoomCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white focus:outline-none focus:border-brand-blue font-medium"
                  >
                    <option value="Single Private A/C">Single Private A/C (Standard Tariff)</option>
                    <option value="Twin Sharing A/C">Twin Sharing A/C (Economy)</option>
                    <option value="Deluxe Suite">Deluxe Suite (Higher Tariff)</option>
                  </select>
                </div>

                {/* 3. Patient Information (Age) */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white focus:outline-none focus:border-brand-blue font-medium font-mono"
                  />
                </div>

                {/* 4. Existing Condition */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Existing Condition (PED)?</label>
                  <select
                    value={editPreExisting ? "yes" : "no"}
                    onChange={(e) => setEditPreExisting(e.target.value === "yes")}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white focus:outline-none focus:border-brand-blue font-medium"
                  >
                    <option value="no">No (New Condition)</option>
                    <option value="yes">Yes (Subject to PED Waiting)</option>
                  </select>
                </div>

                {/* 5. Expected Cost */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Expected Cost (₹)</label>
                  <input
                    type="number"
                    value={editCost}
                    onChange={(e) => setEditCost(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-navy-950 border border-navy-800 rounded-xl text-white focus:outline-none focus:border-brand-blue font-medium font-mono"
                  />
                </div>

              </div>

              {/* Prompt specified button: "Recalculate" */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={recalcStep === 'calculating'}
                  className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs sm:text-sm rounded-xl shadow-subtle transition-all flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${recalcStep === 'calculating' ? 'animate-spin' : ''}`} />
                  <span>Recalculate</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* BOTTOM BUTTONS PER PROMPT: [Add More Information] [Recalculate] */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddInfoOpen(!isAddInfoOpen)}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-navy-900 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Add More Information</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAddInfoOpen(true);
              }}
              className="px-6 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-subtle flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalculate</span>
            </button>
          </div>

          <button
            type="button"
            onClick={resetWorkflow}
            className="px-4 py-3 text-slate-500 hover:text-navy-900 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Workflow</span>
          </button>
        </div>

      </div>

      {/* Document Source Modal */}
      <DocumentSourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidence={modalEvidence}
        policyName={currentPolicy.policyName}
      />

    </div>
  );
};
