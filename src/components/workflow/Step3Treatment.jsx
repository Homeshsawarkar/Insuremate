import React, { useState, useRef, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { POPULAR_PROCEDURES } from '../../data/treatmentData';
import { 
  Stethoscope, 
  Sparkles, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  Calendar,
  Building2,
  FileEdit,
  AlertCircle
} from 'lucide-react';

export const Step3Treatment = () => {
  const { 
    treatmentScenario, 
    runTreatmentAnalysis 
  } = usePolicy();

  // Fields strictly per prompt specification:
  // Treatment (Knee Replacement), Patient Age (55), Expected Hospital Cost (₹2,00,000), Existing Condition (Y/N), Hospital (optional), Additional Information (optional)
  const [selectedProcedureId, setSelectedProcedureId] = useState(treatmentScenario.procedureId || "knee-replacement");
  const [customTreatment, setCustomTreatment] = useState(
    treatmentScenario.procedureId === "other"
      ? (treatmentScenario.customTreatment || treatmentScenario.treatmentName || "")
      : ""
  );
  const [customError, setCustomError] = useState("");
  const customInputRef = useRef(null);

  const [patientAge, setPatientAge] = useState(treatmentScenario.patientAge || 55);
  const [expectedCost, setExpectedCost] = useState(treatmentScenario.expectedCost || 200000);
  const [hasPreExisting, setHasPreExisting] = useState(treatmentScenario.hasPreExisting || false);
  const [hospital, setHospital] = useState(treatmentScenario.hospital || "Sahyadri Super Speciality Hospital, Pune");
  const [additionalInfo, setAdditionalInfo] = useState(treatmentScenario.additionalInfo || "");

  // Processing animation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [checklistStep, setChecklistStep] = useState(0);

  // Exact prompt processing steps:
  // Understanding treatment → Checking policy → Checking limits → Checking patient information → Calculating estimate
  const processingSteps = [
    "Understanding treatment",
    "Checking policy",
    "Checking limits",
    "Checking patient information",
    "Calculating estimate"
  ];

  // Autofocus custom input when "Other" is selected
  useEffect(() => {
    if (selectedProcedureId === "other" && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [selectedProcedureId]);

  const handleProcedureChange = (e) => {
    const procId = e.target.value;
    setSelectedProcedureId(procId);
    setCustomError("");
    if (procId !== "other") {
      setCustomTreatment("");
      const proc = POPULAR_PROCEDURES.find(p => p.id === procId);
      if (proc) {
        setExpectedCost(proc.baseCostTier1 || 200000);
      }
    } else {
      setTimeout(() => {
        if (customInputRef.current) {
          customInputRef.current.focus();
        }
      }, 50);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Block submission if "Other" is selected and custom treatment is empty or whitespace-only
    if (selectedProcedureId === "other") {
      const trimmed = customTreatment.trim();
      if (!trimmed) {
        setCustomError("Please enter your treatment or procedure.");
        if (customInputRef.current) {
          customInputRef.current.focus();
        }
        return;
      }
    }

    setCustomError("");
    setIsAnalyzing(true);
    setChecklistStep(0);

    const resolvedTreatmentName = selectedProcedureId === "other"
      ? customTreatment.trim()
      : (POPULAR_PROCEDURES.find(p => p.id === selectedProcedureId)?.name || "Knee Replacement");

    const stepInterval = 280; // ~1.4s total
    const interval = setInterval(() => {
      setChecklistStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            runTreatmentAnalysis({
              procedureId: selectedProcedureId,
              treatmentName: resolvedTreatmentName,
              customTreatment: selectedProcedureId === "other" ? customTreatment.trim() : "",
              patientAge: parseInt(patientAge, 10),
              expectedCost: parseInt(expectedCost, 10),
              hasPreExisting: hasPreExisting,
              hospital: hospital,
              additionalInfo: additionalInfo
            });
            setIsAnalyzing(false);
            setTimeout(() => {
              const el = document.getElementById('cost-estimate-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 80);
          }, 300);
          return prev;
        }
      });
    }, stepInterval);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto step-transition pb-8">
      
      {/* SECTION 04 Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
          <span>Step 04 · Treatment Scenario</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
          What will this treatment cost?
        </h2>
        <p className="text-sm sm:text-base text-navy-600 max-w-lg mx-auto leading-relaxed">
          Enter your upcoming treatment parameters to calculate expected hospital admissibility and out-of-pocket payment.
        </p>
      </div>

      {/* Main Card with ONLY the specified fields */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium p-6 sm:p-8 space-y-6">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Treatment dropdown + Custom Treatment Input */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Treatment
              </label>
              <div className="relative">
                <select
                  value={selectedProcedureId}
                  onChange={handleProcedureChange}
                  className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                >
                  {POPULAR_PROCEDURES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Custom Treatment Input (shown only when "Other" is selected, with smooth 200ms transition) */}
            {selectedProcedureId === "other" && (
              <div className="space-y-1.5 transition-all duration-200 motion-reduce:transition-none motion-reduce:animate-none animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                  CUSTOM TREATMENT
                </label>
                <input
                  ref={customInputRef}
                  type="text"
                  value={customTreatment}
                  onChange={(e) => {
                    setCustomTreatment(e.target.value);
                    if (customError) setCustomError("");
                  }}
                  placeholder="Enter your treatment or procedure..."
                  className={`w-full px-4 py-3.5 text-sm bg-slate-50 border rounded-xl text-navy-900 font-semibold focus:outline-none transition-all ${
                    customError
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-slate-300 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue'
                  }`}
                />
                {customError && (
                  <p className="text-xs text-red-500 font-semibold flex items-center gap-1.5 pt-0.5 animate-in fade-in">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{customError}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 2. Patient Age (55) */}
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Patient Age
              </label>
              <input
                type="number"
                min="1"
                max="99"
                required
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
            </div>

            {/* 3. Expected Hospital Cost (₹2,00,000) */}
            <div>
              <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
                Expected Hospital Cost (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  required
                  value={expectedCost}
                  onChange={(e) => setExpectedCost(e.target.value)}
                  className="w-full pl-8 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-navy-900 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all font-mono"
                />
              </div>
            </div>

          </div>

          {/* 4. Existing Condition (Y/N) */}
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Existing Condition?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasPreExisting(false)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  !hasPreExisting
                    ? 'bg-brand-blue text-white border-brand-blue shadow-subtle'
                    : 'bg-slate-50 text-navy-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                No (New Condition)
              </button>
              <button
                type="button"
                onClick={() => setHasPreExisting(true)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                  hasPreExisting
                    ? 'bg-amber-500 text-white border-amber-500 shadow-subtle'
                    : 'bg-slate-50 text-navy-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Yes (Pre-existing Condition)
              </button>
            </div>
            <span className="text-[11px] text-navy-500 mt-1 block">
              Tests 36-month waiting period applicability for declared pre-existing diseases.
            </span>
          </div>

          {/* 5. Hospital (optional) */}
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Hospital <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="e.g. Sahyadri Super Speciality Hospital, Pune"
              className="w-full px-4 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-slate-400"
            />
          </div>

          {/* 6. Additional Information (optional) */}
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Additional Information <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g. Planned elective unilateral surgery within 45 days, single room..."
              className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Processing Animation (1-2s):
              Understanding treatment → Checking policy → Checking limits → Checking patient information → Calculating estimate */}
          {isAnalyzing && (
            <div className="p-5 rounded-2xl bg-[#0B1220] text-white border border-navy-800 space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-navy-800 font-mono">
                <span className="text-brand-blue font-bold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
                  ANALYZING TREATMENT SCENARIO...
                </span>
                <span className="text-slate-400">Step {checklistStep + 1} of {processingSteps.length}</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                {processingSteps.map((step, idx) => {
                  const isDone = idx < checklistStep;
                  const isCurrent = idx === checklistStep;

                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
                        isDone
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                          : isCurrent
                          ? 'bg-blue-950 text-white font-bold border border-brand-blue'
                          : 'text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : isCurrent ? (
                        <span className="w-3.5 h-3.5 border-2 border-brand-blue border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-700 flex-shrink-0"></span>
                      )}
                      <span className="truncate">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Prompt specified button: "Analyze Treatment." */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm sm:text-base rounded-xl shadow-premium hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
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
