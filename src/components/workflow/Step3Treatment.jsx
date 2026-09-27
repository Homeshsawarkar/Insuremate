import React, { useState } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { POPULAR_PROCEDURES, CITIES_AND_HOSPITALS } from '../../data/treatmentData';
import { 
  Stethoscope, 
  IndianRupee, 
  Calendar, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';

export const Step3Treatment = () => {
  const { 
    treatmentScenario, 
    runTreatmentAnalysis 
  } = usePolicy();

  // Minimal form fields per specification:
  // Treatment, Patient Age, Expected Hospital Cost, Existing Condition (Y/N), Hospital (optional), Additional Information (optional)
  const [selectedProcedureId, setSelectedProcedureId] = useState(treatmentScenario.procedureId || "knee-replacement");
  const [patientAge, setPatientAge] = useState(treatmentScenario.patientAge || 54);
  const [expectedCost, setExpectedCost] = useState(treatmentScenario.expectedCost || 285000);
  const [hasPreExisting, setHasPreExisting] = useState(treatmentScenario.hasPreExisting || false);
  const [hospital, setHospital] = useState(treatmentScenario.hospital || "Sahyadri Super Speciality Hospital, Pune");
  const [additionalInfo, setAdditionalInfo] = useState(treatmentScenario.additionalInfo || "Doctor recommended surgery within 60 days. Inquiring for cashless pre-auth.");

  // Animation checklist state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [checklistStep, setChecklistStep] = useState(0);

  const checklistItems = [
    "Understanding treatment scenario & clinical codes",
    "Checking policy coverage eligibility & available sum insured",
    "Checking sub-limits & room-rent proportionate rules",
    "Checking patient age & pre-existing declaration terms",
    "Calculating coverage & out-of-pocket breakdown"
  ];

  const handleProcedureChange = (e) => {
    const procId = e.target.value;
    setSelectedProcedureId(procId);
    const proc = POPULAR_PROCEDURES.find(p => p.id === procId);
    if (proc) {
      setExpectedCost(proc.baseCostTier1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setChecklistStep(0);

    const stepInterval = 250;
    const interval = setInterval(() => {
      setChecklistStep((prev) => {
        if (prev < checklistItems.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            const proc = POPULAR_PROCEDURES.find(p => p.id === selectedProcedureId) || POPULAR_PROCEDURES[0];
            runTreatmentAnalysis({
              procedureId: selectedProcedureId,
              treatmentName: proc.name,
              patientAge: parseInt(patientAge, 10),
              expectedCost: parseInt(expectedCost, 10),
              hasPreExisting: hasPreExisting,
              hospital: hospital,
              additionalInfo: additionalInfo
            });
            setIsAnalyzing(false);
          }, 300);
          return prev;
        }
      });
    }, stepInterval);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto step-transition">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Step 03 · Medical Treatment Scenario</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Estimate My Treatment Cost
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Provide your upcoming treatment details to calculate how much your insurance will potentially pay and what you will owe out of pocket.
        </p>
      </div>

      {/* Minimal Form Card (No Extra Fields) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Treatment / Procedure */}
          <div>
            <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
              Treatment / Procedure
            </label>
            <select
              value={selectedProcedureId}
              onChange={handleProcedureChange}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-[#1E1B4B] font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
            >
              {POPULAR_PROCEDURES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 2. Patient Age */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                Patient Age (Years)
              </label>
              <input
                type="number"
                min="1"
                max="99"
                required
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-[#1E1B4B] font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
              />
            </div>

            {/* 3. Expected Hospital Cost */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                Expected Hospital Cost (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  required
                  value={expectedCost}
                  onChange={(e) => setExpectedCost(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-[#1E1B4B] font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                />
              </div>
            </div>

          </div>

          {/* 4. Existing Condition (Y/N) */}
          <div>
            <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
              Is this related to an Existing Condition (PED)?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasPreExisting(false)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  !hasPreExisting
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                No (New Condition)
              </button>
              <button
                type="button"
                onClick={() => setHasPreExisting(true)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  hasPreExisting
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Yes (PED Declared)
              </button>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Tests 36-month waiting period applicability for declared pre-existing diseases.
            </span>
          </div>

          {/* 5. Hospital (optional) */}
          <div>
            <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
              Hospital (Optional)
            </label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="e.g. Sahyadri Super Speciality Hospital, Pune"
              className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* 6. Additional Information (optional) */}
          <div>
            <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
              Additional Clinical Information (Optional)
            </label>
            <textarea
              rows={2}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g. Planned admission next month, private room requested, implant package quote..."
              className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-[#1E1B4B] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* ANIMATED PRE-CALCULATION CHECKLIST (Hard Requirement) */}
          {isAnalyzing && (
            <div className="p-5 rounded-2xl bg-[#0F0E2A] text-white border border-indigo-900 space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-indigo-950 font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  ANALYZING TREATMENT SCENARIO...
                </span>
                <span className="text-slate-400">Step {checklistStep + 1} of {checklistItems.length}</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                {checklistItems.map((item, idx) => {
                  const isDone = idx < checklistStep;
                  const isCurrent = idx === checklistStep;

                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
                        isDone ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60' : isCurrent ? 'bg-purple-950 text-white font-bold border border-purple-500' : 'text-slate-600'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : isCurrent ? (
                        <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex-shrink-0"></span>
                      )}
                      <span className="truncate">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SINGLE PRIMARY CTA: "Analyze Treatment" */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Analyze Treatment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
