import React, { useState, useRef } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { 
  UploadCloud, 
  FileText, 
  Check, 
  Sparkles, 
  ArrowRight, 
  FileCheck2, 
  CheckCircle2, 
  RefreshCw,
  ShieldCheck,
  Info,
  X,
  FileSearch,
  Lock
} from 'lucide-react';

export const Step1Upload = () => {
  const fileInputRef = useRef(null);
  const uploadZoneRef = useRef(null);
  const { 
    currentPolicy, 
    runPolicyUploadAnalysis, 
    analysisProgress, 
    advanceToNextStep,
    isPolicyUploaded 
  } = usePolicy();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);

  // Mouse tilt effect for 3D floating policy document visual
  const [docTilt, setDocTilt] = useState({ rotateX: 6, rotateY: -8 });

  const handleDocMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 12;
    const rotateX = -(y / (rect.height / 2)) * 12;
    setDocTilt({ rotateX, rotateY });
  };

  const handleDocMouseLeave = () => {
    setDocTilt({ rotateX: 6, rotateY: -8 });
  };

  // 6 specific processing steps from prompt
  const processingSteps = [
    "Reading policy",
    "Extracting clauses",
    "Identifying coverage",
    "Mapping exclusions",
    "Analyzing limits",
    "Building InsureMate intelligence"
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        name: file.name,
        size: file.size,
        fileObj: file
      });
      setHasCompletedAnalysis(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile({
        name: file.name,
        size: file.size,
        fileObj: file
      });
      setHasCompletedAnalysis(false);
    }
  };

  const handleLoadSamplePdf = () => {
    setSelectedFile({
      name: "Aegis_Care_Optima_Policy.pdf",
      size: 2.4 * 1024 * 1024,
      fileObj: { name: "Aegis_Care_Optima_Policy.pdf", size: 2.4 * 1024 * 1024 }
    });
    setHasCompletedAnalysis(false);
    // Smooth scroll to upload zone
    uploadZoneRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToUpload = () => {
    uploadZoneRef.current?.scrollIntoView({ behavior: 'smooth' });
    fileInputRef.current?.click();
  };

  const startAnalysis = () => {
    const fileToAnalyze = selectedFile?.fileObj || { 
      name: "Aegis_Care_Optima_Policy.pdf", 
      size: 2.4 * 1024 * 1024 
    };

    runPolicyUploadAnalysis(fileToAnalyze, () => {
      setHasCompletedAnalysis(true);
    });
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto step-transition pb-8">
      
      {/* SECTION 01 — HERO (Headline, Subtitle, Buttons, and Floating 3D Policy Visual) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 sm:pt-8">
        
        {/* Left Column: Headlines & Primary Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
            <span>AI-Powered Insurance Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight leading-[1.12]">
            Understand your policy. <br />
            <span className="text-brand-blue">Know your treatment cost.</span>
          </h1>

          <p className="text-base sm:text-lg text-navy-600 max-w-xl leading-relaxed font-normal">
            InsureMate turns complex health insurance policies into clear answers, evidence and treatment-cost estimates.
          </p>

          {/* Prompt specified buttons: "Upload Your Policy" (primary), "See How It Works" (secondary) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={scrollToUpload}
              className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-sm sm:text-base rounded-xl shadow-premium hover:shadow-glow-blue transition-all flex items-center gap-2.5 group"
            >
              <UploadCloud className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Upload Your Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setShowHowItWorksModal(true)}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-navy-800 font-semibold text-sm sm:text-base rounded-xl border border-slate-200 shadow-subtle transition-all flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-brand-blue" />
              <span>See How It Works</span>
            </button>
          </div>

          <div className="flex items-center gap-6 pt-3 text-xs text-navy-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              <span>Exact Policy Citations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              <span>Treatment Cost Clarity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              <span>Zero Hallucinations</span>
            </div>
          </div>

        </div>

        {/* Right Column: Floating 3D Policy-Document Visual with Depth and Floating Labels */}
        <div 
          className="lg:col-span-5 perspective-1000 flex items-center justify-center py-6 select-none"
          onMouseMove={handleDocMouseMove}
          onMouseLeave={handleDocMouseLeave}
        >
          <div 
            className="relative w-72 sm:w-80 h-96 bg-white rounded-2xl border border-slate-200 shadow-float p-6 transition-transform duration-200 ease-out animate-float-doc"
            style={{
              transform: `rotateX(${docTilt.rotateX}deg) rotateY(${docTilt.rotateY}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Top document binding strip */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-navy-900 via-brand-blue to-navy-900 rounded-t-2xl"></div>

            {/* Document Header */}
            <div className="pt-2 flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-navy-900 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-navy-900 tracking-tight">AEGIS SHIELD OPTIMA</div>
                  <div className="text-[8px] text-slate-400">POL-IND-2024-884920</div>
                </div>
              </div>
              <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE
              </span>
            </div>

            {/* Simulated text lines */}
            <div className="mt-4 space-y-2.5">
              <div className="h-2 bg-slate-200 rounded w-3/4"></div>
              <div className="h-2 bg-slate-100 rounded w-full"></div>
              <div className="h-2 bg-slate-100 rounded w-5/6"></div>
              
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 mt-4 space-y-1">
                <div className="text-[9px] font-bold text-navy-800">SECTION 4.2 • INPATIENT HOSPITALIZATION</div>
                <div className="text-[8px] text-slate-500 leading-tight">
                  Expenses incurred for knee replacement, cataract, and listed surgeries are covered subject to sub-limits...
                </div>
              </div>

              <div className="h-2 bg-slate-100 rounded w-4/5 mt-3"></div>
              <div className="h-2 bg-slate-100 rounded w-2/3"></div>
              <div className="h-2 bg-slate-100 rounded w-full"></div>
            </div>

            {/* Verified seal */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 text-[9px] font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
              <Sparkles className="w-3 h-3" />
              <span>INSUREMATE INDEXED</span>
            </div>

            {/* GENTLY FLOATING LABELS (COVERAGE, WAITING PERIOD, LIMITS, CO-PAY, EXCLUSIONS) */}
            <div 
              className="absolute -top-3 -right-6 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black tracking-wider uppercase shadow-md animate-float-tag-1"
              style={{ transform: 'translateZ(30px)' }}
            >
              COVERAGE
            </div>

            <div 
              className="absolute top-20 -left-8 px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black tracking-wider uppercase shadow-md animate-float-tag-2"
              style={{ transform: 'translateZ(35px)' }}
            >
              WAITING PERIOD
            </div>

            <div 
              className="absolute top-44 -right-8 px-3 py-1 rounded-full bg-navy-900 text-white text-[10px] font-black tracking-wider uppercase shadow-md border border-navy-700 animate-float-tag-1"
              style={{ transform: 'translateZ(40px)' }}
            >
              LIMITS
            </div>

            <div 
              className="absolute bottom-16 -left-6 px-3 py-1 rounded-full bg-brand-blue text-white text-[10px] font-black tracking-wider uppercase shadow-md animate-float-tag-2"
              style={{ transform: 'translateZ(25px)' }}
            >
              CO-PAY
            </div>

            <div 
              className="absolute -bottom-3 right-8 px-3 py-1 rounded-full bg-red-500 text-white text-[10px] font-black tracking-wider uppercase shadow-md animate-float-tag-1"
              style={{ transform: 'translateZ(35px)' }}
            >
              EXCLUSIONS
            </div>

          </div>
        </div>

      </div>

      {/* UPLOAD AREA (Section 01 Drag-and-drop & Processing) */}
      <div ref={uploadZoneRef} className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden p-6 sm:p-8 space-y-6">
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />

        {/* Drag and drop box with exact prompt wording */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 animate-dash-pulse ${
            isDragOver
              ? 'border-brand-blue bg-blue-50/50 scale-[1.01]'
              : selectedFile
              ? 'border-emerald-500 bg-emerald-50/20'
              : 'border-slate-300 hover:border-brand-blue bg-slate-50/60'
          }`}
        >
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all shadow-subtle ${
            selectedFile 
              ? 'bg-emerald-500 text-white shadow-glow-emerald' 
              : 'bg-brand-blue text-white shadow-glow-blue'
          }`}>
            {selectedFile ? <FileCheck2 className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-navy-900">
            {selectedFile ? selectedFile.name : "Drop your insurance policy PDF here"}
          </h3>
          <p className="text-xs sm:text-sm text-navy-500 mt-1">
            {selectedFile 
              ? `Size: ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • Click to replace file`
              : "or click to browse"}
          </p>
          <p className="text-[11px] font-mono text-slate-400 mt-2">
            PDF • Maximum 10 MB
          </p>
        </div>

        {/* Quick Sample Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-xs text-navy-500">
            Want to test without uploading your personal document?
          </span>
          <button
            type="button"
            onClick={handleLoadSamplePdf}
            className="px-4 py-2 text-xs font-bold text-brand-blue bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-brand-blue" />
            <span>Load Sample Policy (Aegis_Care_Optima_Policy.pdf)</span>
          </button>
        </div>

        {/* Selected file confirmation row */}
        {selectedFile && !analysisProgress.isAnalyzing && !hasCompletedAnalysis && (
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-navy-900">{selectedFile.name}</p>
                <p className="text-xs text-navy-500">Ready for automated clause extraction and intelligence mapping</p>
              </div>
            </div>

            <button
              onClick={startAnalysis}
              className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold rounded-xl text-xs sm:text-sm shadow-premium transition-all flex items-center justify-center gap-2"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ANIMATED PROCESSING SEQUENCE WITH SCANNING LINE OVER THE DOCUMENT */}
        {analysisProgress.isAnalyzing && (
          <div className="p-6 rounded-2xl bg-[#0B1220] text-white space-y-4 border border-navy-800 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-navy-800 font-mono">
              <span className="text-brand-blue flex items-center gap-2 font-bold">
                <RefreshCw className="w-4 h-4 animate-spin text-brand-blue" />
                INSUREMATE INTELLIGENCE PIPELINE
              </span>
              <span className="text-slate-400">
                Processing Step {analysisProgress.currentStep + 1} of 6
              </span>
            </div>

            {/* Document scanning view with laser line */}
            <div className="relative bg-navy-950 rounded-xl p-4 font-mono text-[11px] leading-relaxed overflow-hidden border border-navy-800 shadow-inner h-28 select-none">
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent shadow-[0_0_12px_#2563EB] animate-scan pointer-events-none z-20"></div>
              <div className="opacity-70 space-y-1.5 text-slate-300">
                <div className="text-slate-400 font-bold border-b border-navy-850 pb-1 flex justify-between text-[10px]">
                  <span>FILE: Aegis_Care_Optima_Policy.pdf</span>
                  <span className="text-brand-blue">OPTICAL CLAUSE RECOGNITION</span>
                </div>
                <p>Section 3.1: Annual Aggregate Deductible of ₹20,000 applicable...</p>
                <p>Section 4.2: Joint replacement / Knee surgery sub-limit ₹2,50,000 per joint...</p>
                <p>Section 5.2: 24-month waiting period for specified degenerative joint conditions...</p>
              </div>
            </div>

            {/* Prompt exact sequence checklist: Reading policy → Extracting clauses → Identifying coverage → Mapping exclusions → Analyzing limits → Building InsureMate intelligence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              {processingSteps.map((stepTitle, idx) => {
                const isDone = idx < analysisProgress.currentStep;
                const isCurrent = idx === analysisProgress.currentStep;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl flex items-center justify-between transition-all ${
                      isDone
                        ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300'
                        : isCurrent
                        ? 'bg-blue-950/60 border border-brand-blue text-white font-bold'
                        : 'text-slate-500 bg-navy-950/40 border border-navy-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDone ? (
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                      ) : isCurrent ? (
                        <span className="w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-700"></span>
                      )}
                      <span>{stepTitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PROMPT READY STATE:
            ✓ 12 pages analyzed ✓ 86 clauses extracted ✓ Coverage rules ✓ Exclusions ✓ Waiting periods
            → "Policy Intelligence Ready" → button "Continue" */}
        {(hasCompletedAnalysis || (isPolicyUploaded && !selectedFile)) && (
          <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-glow-emerald">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-emerald-950">
                    Policy Intelligence Ready
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Parsed document: <strong>{currentPolicy.documentMeta?.fileName || "Aegis_Care_Optima_Policy.pdf"}</strong>
                  </p>
                </div>
              </div>

              {/* Exact prompt button: "Continue" */}
              <button
                type="button"
                onClick={advanceToNextStep}
                className="w-full sm:w-auto px-8 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm rounded-xl shadow-premium hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Prompt exact check items */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-semibold shadow-subtle">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>12 pages analyzed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-semibold shadow-subtle">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>86 clauses extracted</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-semibold shadow-subtle">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Coverage rules</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-semibold shadow-subtle">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Exclusions</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-semibold shadow-subtle col-span-2 sm:col-span-1">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Waiting periods</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* "See How It Works" Explanation Modal */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-float border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-blue" />
                <span className="font-bold text-sm">How InsureMate Works</span>
              </div>
              <button 
                onClick={() => setShowHowItWorksModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-navy-700 leading-relaxed">
              <p>
                InsureMate is your guided, AI-powered health insurance intelligence assistant. Here is the single continuous workflow:
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
                  <span className="font-mono font-bold text-brand-blue">01</span>
                  <div>
                    <strong className="text-navy-900 block">Upload Policy</strong>
                    InsureMate parses policy PDF clauses, sub-limits, waiting periods, and exclusions into structured intelligence.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
                  <span className="font-mono font-bold text-brand-blue">02</span>
                  <div>
                    <strong className="text-navy-900 block">Understand & Ask Anything</strong>
                    Interactive policy knowledge node map plus AI chat with exact document evidence citations.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
                  <span className="font-mono font-bold text-brand-blue">03</span>
                  <div>
                    <strong className="text-navy-900 block">Enter Treatment Scenario</strong>
                    Provide your treatment, age, and estimated hospital cost to calculate coverage.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
                  <span className="font-mono font-bold text-brand-blue">04</span>
                  <div>
                    <strong className="text-navy-900 block">Cost Calculation Flow</strong>
                    Animated calculation sequence showing treatment cost, deductible, co-payment, non-covered expenses, potentially covered share, and out-of-pocket balance.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex gap-3">
                  <span className="font-mono font-bold text-brand-blue">05</span>
                  <div>
                    <strong className="text-navy-900 block">Why, Confidence & Recalculate</strong>
                    Clickable evidence references, transparency on missing info, and instant recalculation when parameters update.
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHowItWorksModal(false)}
                className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs rounded-xl shadow-subtle"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
