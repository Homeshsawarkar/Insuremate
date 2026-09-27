import React, { useState, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
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
  Info,
  CheckCircle2
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

  // Expandable panel state for "Why is the estimated out-of-pocket ₹X?"
  const [isWhyOpen, setIsWhyOpen] = useState(true);

  // Expandable panel for "Add More Information"
  const [isAddInfoOpen, setIsAddInfoOpen] = useState(false);

  // Recalculation form fields
  const [editRoomCategory, setEditRoomCategory] = useState("Twin Sharing A/C");
  const [editAge, setEditAge] = useState(treatmentScenario.patientAge || 54);
  const [editCost, setEditCost] = useState(treatmentScenario.expectedCost || 285000);
  const [editHospital, setEditHospital] = useState(treatmentScenario.hospital || "Sahyadri Super Speciality Hospital, Pune");
  const [editPreExisting, setEditPreExisting] = useState(treatmentScenario.hasPreExisting || false);
  const [editNetwork, setEditNetwork] = useState(true);

  // Recalculation animation state
  const [isRecalculatingAnim, setIsRecalculatingAnim] = useState(false);
  const [showUpdatedPulse, setShowUpdatedPulse] = useState(false);

  // Circular Confidence Ring Animation
  const [ringConfidence, setRingConfidence] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 1200;
    const target = currentEstimate.confidence.score;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setRingConfidence(Math.floor(ease * target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [currentEstimate.confidence.score]);

  // Recalculate action
  const handleRecalculateSubmit = (e) => {
    e.preventDefault();
    setIsRecalculatingAnim(true);

    setTimeout(() => {
      let reason = "";
      if (editRoomCategory === "Twin Sharing A/C") {
        reason = "Selecting Twin Sharing A/C (under ₹5,000/day cap) eliminated the proportionate deduction penalty, reducing out-of-pocket!";
      } else if (editRoomCategory === "Deluxe Suite") {
        reason = "Selecting Deluxe Suite triggered an adverse proportionate reduction across doctor and OT charges.";
      } else if (editAge !== treatmentScenario.patientAge) {
        reason = `Adjusted patient age to ${editAge} years (verified co-payment eligibility).`;
      } else {
        reason = "Estimate refreshed with updated patient and hospital clinical parameters.";
      }

      runRecalculation({
        patientAge: parseInt(editAge, 10),
        expectedCost: parseInt(editCost, 10),
        hospital: editHospital,
        hasPreExisting: editPreExisting,
        roomCategory: editRoomCategory,
        isNetworkOverride: editNetwork
      }, reason);

      setIsRecalculatingAnim(false);
      setShowUpdatedPulse(true);
      setTimeout(() => setShowUpdatedPulse(false), 3000);
    }, 700);
  };

  // Ring color dynamic transition: Amber to Emerald past 80%
  const ringColor = ringConfidence >= 85 ? "#10B981" : ringConfidence >= 75 ? "#3B82F6" : "#F59E0B";

  return (
    <div className="space-y-8 max-w-4xl mx-auto step-transition">
      
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Step 05 · Final Result & Explanation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Admissibility Result & Reliability Diagnostics
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Ground-truth policy explanation, AI confidence scoring, missing hospital information, and scenario recalculation.
        </p>
      </div>

      {/* RECALCULATION NOTIFICATION & ANIMATED BEFORE / AFTER (Hard Requirement 7) */}
      {previousEstimate && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-300 shadow-md animate-in fade-in space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-800 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>New Information Received & Estimate Recalculated</span>
            </span>
            {showUpdatedPulse && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px] animate-pulse">
                UPDATED
              </span>
            )}
          </div>
          
          <p className="text-xs sm:text-sm text-slate-800 font-medium">
            {recalculationReason}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
            <span className="text-slate-500">
              Previous Out-of-Pocket: <del className="text-rose-500 font-mono">₹{previousEstimate.coverageSummary.estimatedOutOfPocket.toLocaleString('en-IN')}</del>
            </span>
            <span className="text-emerald-700 font-mono text-sm font-extrabold flex items-center gap-1">
              New Out-of-Pocket: ₹{currentEstimate.coverageSummary.estimatedOutOfPocket.toLocaleString('en-IN')}
            </span>
            <span className="text-blue-700 bg-white px-2.5 py-0.5 rounded-lg border border-blue-200 shadow-2xs">
              Difference: ₹{Math.abs(previousEstimate.coverageSummary.estimatedOutOfPocket - currentEstimate.coverageSummary.estimatedOutOfPocket).toLocaleString('en-IN')} saved
            </span>
          </div>
        </div>
      )}

      {/* FINAL RESULT VIEW CARD (CONTAINS ONLY WHAT IS REQUIRED) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Core Summary Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Treatment</span>
            <p className="font-extrabold text-[#1E1B4B] text-sm mt-0.5 truncate">{currentEstimate.procedure.name}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Treatment Cost</span>
            <p className="font-extrabold text-[#1E1B4B] text-base font-mono mt-0.5">₹{currentEstimate.costBreakdown.totalEstimatedCost.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Potentially Covered</span>
            <p className="font-extrabold text-emerald-600 text-base font-mono mt-0.5">₹{currentEstimate.coverageSummary.potentiallyCovered.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Estimated Out-of-Pocket</span>
            <p className="font-extrabold text-amber-900 text-base font-mono mt-0.5">₹{currentEstimate.coverageSummary.estimatedOutOfPocket.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* STEP 5: EXPANDABLE PANEL — "Why is the estimated out-of-pocket ₹X?" */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsWhyOpen(!isWhyOpen)}
            className="w-full p-4 bg-slate-50 hover:bg-slate-100/70 transition-colors flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                Why is the estimated out-of-pocket ₹{currentEstimate.coverageSummary.estimatedOutOfPocket.toLocaleString('en-IN')}?
              </h3>
            </div>
            {isWhyOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isWhyOpen && (
            <div className="p-5 divide-y divide-slate-100 text-xs animate-in fade-in duration-150 space-y-1">
              
              {/* Line 1: Deductible */}
              <div className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1E1B4B] flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>Deductible: ₹{currentPolicy.financials.deductible}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">Section 2.1 — Nil deductible on standard hospitalization claims under Aegis Care Optima.</p>
                </div>
                <span className="font-mono text-slate-700 font-bold">₹0</span>
              </div>

              {/* Line 2: Co-payment */}
              <div className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1E1B4B] flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</span>
                    <span>Co-payment: {currentEstimate.deductionFactors.copayPercentage}%</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">Section 7.2 (Page 15) — 0% co-payment applied for treatments at empaneled network hospitals.</p>
                </div>
                <span className="font-mono text-slate-700 font-bold">₹{currentEstimate.deductionFactors.copayAmount.toLocaleString('en-IN')}</span>
              </div>

              {/* Line 3: Sub-limit cap deduction */}
              {currentEstimate.deductionFactors.sublimitDeduction > 0 && (
                <div className="py-2.5 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">⚠</span>
                      <span>Procedure Sub-Limit Capping</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">Section 4.3(c) (Page 11) — Maximum coverage capped at ₹{currentEstimate.deductionFactors.applicableSublimit.toLocaleString('en-IN')} per joint/procedure.</p>
                  </div>
                  <span className="font-mono text-amber-900 font-bold">+₹{currentEstimate.deductionFactors.sublimitDeduction.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Line 4: Proportionate deduction if higher room tariff chosen */}
              {currentEstimate.deductionFactors.proportionateDeduction > 0 && (
                <div className="py-2.5 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-rose-900 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-[10px]">⚠</span>
                      <span>Room Rent Proportionate Penalty ({currentEstimate.deductionFactors.proportionateCutPercentage}%)</span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">Section 3.1.2 (Page 8) — Tariff exceeded eligible ₹5,000/day cap, causing associated surgical cut.</p>
                  </div>
                  <span className="font-mono text-rose-900 font-bold">+₹{currentEstimate.deductionFactors.proportionateDeduction.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Line 5: Non-payable consumables */}
              <div className="py-2.5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-[#1E1B4B] flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">ℹ</span>
                    <span>IRDAI Non-Payable Consumables</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">Annexure I — Statutory non-medical consumables (gloves, sanitizer, admission kit, registration fee).</p>
                </div>
                <span className="font-mono text-slate-700 font-bold">+₹{currentEstimate.deductionFactors.nonPayableConsumables.toLocaleString('en-IN')}</span>
              </div>

              {/* Total Balance */}
              <div className="pt-3 flex items-center justify-between text-xs font-black text-[#1E1B4B]">
                <span>Total Estimated Out-of-Pocket Share</span>
                <span className="text-sm font-mono text-amber-900">₹{currentEstimate.coverageSummary.estimatedOutOfPocket.toLocaleString('en-IN')}</span>
              </div>

            </div>
          )}
        </div>

        {/* STEP 6: CONFIDENCE + MISSING INFORMATION */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
                How Reliable Is This Estimate?
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                We disclose missing information rather than making unverified guesses.
              </p>
            </div>

            {/* Circular Confidence Ring (shifts color amber -> emerald) */}
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" stroke="#E2E8F0" strokeWidth="5" fill="transparent" />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    stroke={ringColor}
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray="150.8"
                    strokeDashoffset={150.8 - (150.8 * ringConfidence) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono font-black text-sm text-[#1E1B4B]">
                  {ringConfidence}%
                </span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">AI Confidence</span>
                <span className="text-emerald-700 font-semibold">{currentEstimate.confidence.rating}</span>
              </div>
            </div>
          </div>

          {/* Known-vs-Missing Information Bar Pair */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Verified Policy Information (Sum Insured, Sub-limits, Waiting Durations)</span>
                <span className="font-bold text-emerald-600">{currentEstimate.confidence.score}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${currentEstimate.confidence.score}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Missing / Unconfirmed Hospital Items</span>
                <span className="font-bold text-amber-600">{100 - currentEstimate.confidence.score}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${100 - currentEstimate.confidence.score}%` }}></div>
              </div>
            </div>
          </div>

          {/* Explicit Missing Items List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Explicit Missing Information Flags (May adjust final reimbursement):</span>
            </span>

            <ul className="space-y-1.5 text-xs text-slate-700">
              {currentEstimate.confidence.missingInfo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                  <span className="text-[11px] leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* STEP 7: ADD INFORMATION + RECALCULATE */}
        <div className="p-6 rounded-3xl bg-[#1E1B4B] text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <span>Add More Information & Recalculate</span>
              </h3>
              <p className="text-xs text-indigo-200 mt-0.5">
                Update room tariff (e.g. choose Twin Sharing to avoid proportionate cut), hospital, or patient info.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddInfoOpen(!isAddInfoOpen)}
              className="px-4 py-2 bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>{isAddInfoOpen ? "Hide Form" : "Open Parameters Form"}</span>
              {isAddInfoOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {isAddInfoOpen && (
            <form onSubmit={handleRecalculateSubmit} className="pt-3 border-t border-indigo-900/80 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                
                {/* Room Category */}
                <div>
                  <label className="block font-semibold text-indigo-200 mb-1">Room Category Tariff</label>
                  <select
                    value={editRoomCategory}
                    onChange={(e) => setEditRoomCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-indigo-950 border border-indigo-800 rounded-lg text-white focus:outline-none"
                  >
                    <option value="Twin Sharing A/C">Twin Sharing A/C (₹4,000/day — Under Cap)</option>
                    <option value="Single Private A/C">Single Private A/C (₹6,500/day)</option>
                    <option value="Deluxe Suite">Deluxe Suite (₹10,000/day — Proportionate Penalty)</option>
                    <option value="General Ward">General Ward (₹2,500/day)</option>
                  </select>
                </div>

                {/* Patient Age */}
                <div>
                  <label className="block font-semibold text-indigo-200 mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                    className="w-full px-3 py-2 bg-indigo-950 border border-indigo-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

                {/* Expected Cost */}
                <div>
                  <label className="block font-semibold text-indigo-200 mb-1">Expected Cost (₹)</label>
                  <input
                    type="number"
                    value={editCost}
                    onChange={(e) => setEditCost(e.target.value)}
                    className="w-full px-3 py-2 bg-indigo-950 border border-indigo-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

                {/* Hospital */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-indigo-200 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    value={editHospital}
                    onChange={(e) => setEditHospital(e.target.value)}
                    className="w-full px-3 py-2 bg-indigo-950 border border-indigo-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

                {/* Pre-Existing Condition */}
                <div>
                  <label className="block font-semibold text-indigo-200 mb-1">Pre-existing Condition?</label>
                  <select
                    value={editPreExisting ? "yes" : "no"}
                    onChange={(e) => setEditPreExisting(e.target.value === "yes")}
                    className="w-full px-3 py-2 bg-indigo-950 border border-indigo-800 rounded-lg text-white focus:outline-none"
                  >
                    <option value="no">No (New Condition)</option>
                    <option value="yes">Yes (Subject to PED Waiting)</option>
                  </select>
                </div>

              </div>

              {/* Submit Recalculate Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isRecalculatingAnim}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRecalculatingAnim ? 'animate-spin' : ''}`} />
                  <span>Recalculate Estimate</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* TWO FINAL ACTIONS (Hard Requirement) */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsAddInfoOpen(!isAddInfoOpen)}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#1E1B4B] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Add More Information</span>
          </button>

          <button
            type="button"
            onClick={resetWorkflow}
            className="px-6 py-3 text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Workflow with New Policy</span>
          </button>
        </div>

      </div>

    </div>
  );
};
