import React, { useState, useRef, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { DocumentSourceModal } from '../workflow/DocumentSourceModal';
import { 
  Sparkles, 
  X, 
  Search, 
  Send, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

export const FloatingAIAssistantButton = () => {
  const { currentPolicy } = usePolicy();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestAnswer, setLatestAnswer] = useState(null);
  const [modalEvidence, setModalEvidence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef(null);

  // Suggestions
  const suggestionChips = [
    "Is knee replacement covered?",
    "What is my waiting period?",
    "What is my room-rent limit?",
    "What is my deductible?"
  ];

  // Grounded answer generator matching Step 2 knowledge base
  const getAnswerForQuery = (queryText) => {
    const q = queryText.toLowerCase();

    if (q.includes("knee") || q.includes("joint") || q.includes("replacement")) {
      return {
        query: queryText,
        text: "Potentially covered, subject to the applicable waiting period, policy limits and treatment conditions.",
        evidenceRef: "Page 18 • Section 4.2",
        confidence: "High",
        missingInfo: "The policy does not specify the applicable hospital package limit.",
        evidenceModal: {
          page: 18,
          section: "Section 4.2 • Hospitalization Benefits",
          excerpt: "Hospitalization expenses for Joint Replacement / Knee Surgery are potentially covered under Inpatient Hospitalization Benefits, subject to the applicable waiting period, sub-limits and remaining sum insured."
        }
      };
    }

    if (q.includes("room") || q.includes("rent") || q.includes("icu")) {
      return {
        query: queryText,
        text: "Your daily room-rent limit is capped at 1% of Sum Insured (₹5,000/day for ₹5,00,000 SI) or a Single Private A/C Room, whichever is lower. ICU is capped at ₹10,000/day (2% of Sum Insured). Opting for a higher tariff triggers proportionate deductions across associated doctor & surgical fees.",
        evidenceRef: "Page 8 • Section 3.1.2",
        confidence: "High",
        missingInfo: null,
        evidenceModal: {
          page: 8,
          section: "Section 3.1.2 • Room Rent & Proportionate Deductions",
          excerpt: "Room, Boarding and Nursing Expenses provided by the Hospital are capped at 1% of Sum Insured per day. If a higher tariff room is chosen, associated medical expenses are paid in the same proportion."
        }
      };
    }

    if (q.includes("wait") || q.includes("period")) {
      return {
        query: queryText,
        text: "Standard policy waiting periods apply: 30 days initial for general illnesses (completed), 24 months for specified procedures including joint surgeries (18 months elapsed, 6 remaining), and 36 months for declared pre-existing diseases.",
        evidenceRef: "Page 12 • Section 5.2",
        confidence: "High",
        missingInfo: "Portability continuity certificate required to waive remaining 6 months.",
        evidenceModal: {
          page: 12,
          section: "Section 5.2 • Waiting Periods Schedule",
          excerpt: "Specific procedures listed in Schedule B (including Joint Replacements and Cataract) shall be covered only after twenty-four (24) continuous months of coverage from policy inception."
        }
      };
    }

    if (q.includes("deduct") || q.includes("excess")) {
      return {
        query: queryText,
        text: "Your policy carries an annual aggregate deductible of ₹20,000 on standard hospitalization claims. You pay the first ₹20,000 out-of-pocket directly to the hospital before policy benefits attach.",
        evidenceRef: "Page 12 • Section 3.1",
        confidence: "High",
        missingInfo: null,
        evidenceModal: {
          page: 12,
          section: "Section 3.1 • Annual Aggregate Deductible Clause",
          excerpt: "The Insured shall be responsible for paying the specified Deductible amount of ₹20,000 for each policy year prior to any benefits becoming payable under the Hospitalization Benefit."
        }
      };
    }

    if (q.includes("exclu") || q.includes("not covered")) {
      return {
        query: queryText,
        text: "Permanent exclusions include cosmetic or aesthetic surgeries, non-accidental outpatient dental care, experimental clinical trials, and statutory IRDAI non-medical consumables.",
        evidenceRef: "Page 26 • Section 6.1",
        confidence: "High",
        missingInfo: null,
        evidenceModal: {
          page: 26,
          section: "Section 6.1 • Permanent & General Exclusions",
          excerpt: "The Company shall not be liable to make any payment for any expenses incurred towards Cosmetic or Plastic Surgery, Non-accidental Dental treatments, Experimental Procedures, and items listed under Annexure I Non-Payable Schedules."
        }
      };
    }

    // Dynamic sensible fallback
    return {
      query: queryText,
      text: "Treatment expenses are potentially covered up to your available sum insured (₹3,84,500), subject to medical necessity, standard ₹20,000 deductible, and network cashless conditions.",
      evidenceRef: "Page 6 • Section 2.1",
      confidence: "High",
      missingInfo: "Detailed billing itemization required for pre-authorization.",
      evidenceModal: {
        page: 6,
        section: "Section 2.1 • General Inpatient Admissibility",
        excerpt: "The Company will indemnify Medically Necessary Hospitalization expenses reasonably incurred for Inpatient care and specified Day Care treatments up to the available Sum Insured."
      }
    };
  };

  const handleAsk = (queryText) => {
    const textToQuery = queryText || inputQuery;
    if (!textToQuery || !textToQuery.trim()) return;

    setInputQuery(textToQuery);
    setIsAnalyzing(true);

    setTimeout(() => {
      const answer = getAnswerForQuery(textToQuery);
      setLatestAnswer(answer);
      setIsAnalyzing(false);
    }, 380);
  };

  const handleChipClick = (chipText) => {
    handleAsk(chipText);
  };

  const handleOpenSource = (evidence) => {
    setModalEvidence(evidence);
    setIsModalOpen(true);
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isModalOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isModalOpen]);

  return (
    <>
      <aside 
        aria-label="InsureMate AI Assistant"
        className="fixed bottom-6 right-6 z-40 select-none"
      >
        {!isOpen ? (
          /* FLOATING PILL BUTTON */
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            id="floating-ai-assistant-btn"
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0B1220] hover:bg-brand-blue border border-brand-blue/50 text-white font-bold text-xs shadow-float hover:shadow-glow-blue transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-float-subtle backdrop-blur-md"
            title="Ask InsureMate AI about your policy"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:text-white transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="tracking-wide">Ask AI Assistant</span>
          </button>
        ) : (
          /* COMPACT FLOATING POP-UP CARD */
          <div 
            id="floating-ai-popup-card"
            className="w-[340px] sm:w-[390px] max-h-[82vh] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#0B1220] text-white flex items-center justify-between border-b border-navy-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5 text-white">
                    <span>✦ Ask InsureMate AI</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Ask anything about your policy
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                title="Close popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-3.5 overflow-y-auto max-h-[calc(82vh-60px)]">
              {/* Query Input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAsk(inputQuery);
                }} 
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask about coverage, waiting period, limits..."
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-navy-900 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isAnalyzing}
                  className="px-3.5 py-2 bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-subtle transition-all flex items-center gap-1 flex-shrink-0"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Ask</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>

              {/* Suggestions */}
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Suggested questions:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      className="px-2.5 py-1 rounded-full bg-slate-50 hover:bg-blue-50 text-navy-800 hover:text-brand-blue border border-slate-200 hover:border-blue-200 text-[11px] font-medium transition-all text-left shadow-subtle active:scale-98"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Block */}
              {latestAnswer && (
                <div className="pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2.5 text-xs">
                    
                    {/* Question */}
                    <div>
                      <div className="text-[9px] font-mono uppercase font-bold text-slate-400">
                        Question
                      </div>
                      <div className="font-semibold text-navy-900 text-xs mt-0.5">
                        {latestAnswer.query}
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="pt-1.5 border-t border-blue-100">
                      <div className="text-[9px] font-mono uppercase font-bold text-brand-blue flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-brand-blue" />
                        <span>AI Response</span>
                      </div>
                      <div className="text-navy-900 leading-relaxed text-xs mt-0.5 font-normal">
                        {latestAnswer.text}
                      </div>
                    </div>

                    {/* Evidence & Confidence */}
                    <div className="pt-1.5 border-t border-blue-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] text-slate-600 font-semibold">
                          {latestAnswer.evidenceRef}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenSource(latestAnswer.evidenceModal)}
                          className="px-1.5 py-0.5 bg-white hover:bg-brand-blue hover:text-white text-brand-blue border border-blue-200 rounded text-[9px] font-bold transition-all flex items-center gap-0.5 shadow-subtle"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>View</span>
                        </button>
                      </div>

                      <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                        {latestAnswer.confidence}
                      </span>
                    </div>

                    {/* Missing information warning */}
                    {latestAnswer.missingInfo && (
                      <div className="flex items-start gap-1.5 text-[10px] text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200">
                        <AlertTriangle className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Missing information:</strong> {latestAnswer.missingInfo}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </aside>

      {/* Modal / Document Viewer for source citation */}
      <DocumentSourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidence={modalEvidence}
        policyName={currentPolicy?.policyName || "Health Shield Gold"}
      />
    </>
  );
};
