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
  Layers,
  ShieldCheck
} from 'lucide-react';

export const Step1Upload = () => {
  const fileInputRef = useRef(null);
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

  // Analysis checklist stages
  const analysisSteps = [
    { title: "Reading policy structure & definitions", tag: "PDF OCR" },
    { title: "Extracting 86 clauses & sub-limit tables", tag: "NLP Parse" },
    { title: "Identifying covered hospital & day-care lists", tag: "Coverage Index" },
    { title: "Mapping specific & permanent exclusions", tag: "Exclusion Registry" },
    { title: "Analyzing waiting periods & pre-existing terms", tag: "Timing Rules" }
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
      name: "Star_Premier_MediHealth_Policy_Document_2024.pdf",
      size: 3.8 * 1024 * 1024,
      fileObj: { name: "Star_Premier_MediHealth_Policy_Document_2024.pdf", size: 3.8 * 1024 * 1024 }
    });
    setHasCompletedAnalysis(false);
  };

  const startAnalysis = () => {
    const fileToAnalyze = selectedFile?.fileObj || { 
      name: "Aegis_Care_Optima_Policy_Wording_v4.pdf", 
      size: 2.4 * 1024 * 1024 
    };

    runPolicyUploadAnalysis(fileToAnalyze, () => {
      setHasCompletedAnalysis(true);
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto step-transition">
      
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Step 01 · Policy Document Ingestion</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Understand Your Health Insurance Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload your policy PDF and let InsureMate identify coverage, exclusions, waiting periods, limits and other key terms.
        </p>
      </div>

      {/* Main Upload & Analysis Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Drag and Drop Zone */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 animate-dash-pulse ${
            isDragOver
              ? 'border-purple-600 bg-purple-50/50 scale-[1.01]'
              : selectedFile
              ? 'border-emerald-500 bg-emerald-50/30'
              : 'border-indigo-300 hover:border-purple-500 bg-slate-50/50'
          }`}
        >
          {/* File Icon with drop bounce animation when selected */}
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all ${
            selectedFile 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white animate-drop-bounce shadow-glow-emerald' 
              : 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-glow-blue'
          }`}>
            {selectedFile ? <FileCheck2 className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#1E1B4B]">
            {selectedFile ? selectedFile.name : "Drag and drop your policy PDF here"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {selectedFile 
              ? `Size: ${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • Click to replace file`
              : "or browse file from your computer (Standard PDF, max 10MB)"}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-slate-600">✓ All Indian Mediclaim Formats</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-medium text-slate-600">✓ In-Browser Privacy Preserved</span>
          </div>
        </div>

        {/* Load Sample PDF shortcut button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-500 font-medium">
            Don't have a health policy PDF ready?
          </span>
          <button
            type="button"
            onClick={handleLoadSamplePdf}
            className="px-3.5 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Load Sample Mediclaim PDF (Star Premier ₹10L)</span>
          </button>
        </div>

        {/* Start Analysis Button (when file selected and not yet analyzed) */}
        {selectedFile && !analysisProgress.isAnalyzing && !hasCompletedAnalysis && (
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#1E1B4B]">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">Ready for simulated clause extraction</p>
              </div>
            </div>

            <button
              onClick={startAnalysis}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Analyze Policy Document</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SIMULATED ANALYSIS SEQUENCE WITH SCANNING LINE & CHECKLIST */}
        {analysisProgress.isAnalyzing && (
          <div className="p-6 rounded-2xl bg-[#0F0E2A] text-white space-y-4 border border-indigo-900 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-indigo-950 font-mono">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                INSUREMATE INGESTION PIPELINE
              </span>
              <span className="text-slate-400">
                Step {analysisProgress.currentStep + 1} of {analysisProgress.steps.length}
              </span>
            </div>

            {/* Mock Document Page with Animated Laser Scanning Line */}
            <div className="relative bg-slate-950 rounded-xl p-3.5 font-mono text-[10px] leading-relaxed overflow-hidden border border-slate-800 shadow-inner h-28 select-none">
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#22d3ee] animate-scan pointer-events-none z-20"></div>
              <div className="opacity-60 space-y-1">
                <div className="text-slate-500 font-bold border-b border-slate-900 pb-0.5 flex justify-between">
                  <span>PARSING OFFICIAL POLICY WORDING & SCHEDULE</span>
                  <span className="text-cyan-400">OCR SCANNING</span>
                </div>
                <p>Section 3.1: Eligible room rent capped at 1% of Sum Insured per day...</p>
                <p>Section 4.3: Joint replacement covered after 24 continuous months, capped at ₹2,50,000...</p>
              </div>
            </div>

            {/* Checklist items with checkmarks and connecting line */}
            <div className="space-y-2 pt-1 text-xs">
              {analysisSteps.map((step, idx) => {
                const isDone = idx < analysisProgress.currentStep;
                const isCurrent = idx === analysisProgress.currentStep;

                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl flex items-center justify-between transition-all ${
                      isDone
                        ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-300'
                        : isCurrent
                        ? 'bg-purple-950/60 border border-purple-600 text-white font-bold'
                        : 'text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isDone ? (
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</span>
                      ) : isCurrent ? (
                        <span className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-700"></span>
                      )}
                      <span>{step.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {step.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONFIRMATION SUMMARY CARD & SINGLE PRIMARY CTA (Hard Requirement) */}
        {(hasCompletedAnalysis || (isPolicyUploaded && !selectedFile)) && (
          <div className="p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 space-y-4 animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5 shadow-glow-emerald">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-black text-emerald-950">
                  Policy Analyzed Successfully
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                  <strong>86 clauses identified</strong> from <em>{currentPolicy.policyName}</em>. 
                  Extracted Total Sum Insured: <strong>₹{currentPolicy.financials.totalSumInsured.toLocaleString('en-IN')}</strong>, 
                  Daily Room Rent Cap: <strong>₹{currentPolicy.limitsAndSublimits.roomRent.dailyLimit.toLocaleString('en-IN')}/day</strong>, 
                  and 4 statutory waiting period tracks.
                </p>

                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-white border border-emerald-100">
                    <span className="text-[10px] text-slate-500">Available SI</span>
                    <p className="font-bold text-emerald-700">₹{currentPolicy.financials.availableSumInsured.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-emerald-100">
                    <span className="text-[10px] text-slate-500">Room Rent Cap</span>
                    <p className="font-bold text-slate-800">₹{currentPolicy.limitsAndSublimits.roomRent.dailyLimit.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-emerald-100">
                    <span className="text-[10px] text-slate-500">Waiting Periods</span>
                    <p className="font-bold text-amber-700">4 Tracked</p>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-emerald-100">
                    <span className="text-[10px] text-slate-500">Network Co-pay</span>
                    <p className="font-bold text-emerald-700">{currentPolicy.financials.baseCopayPercentage}% Cashless</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SINGLE MANDATORY CTA */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={advanceToNextStep}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Continue to Policy</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
