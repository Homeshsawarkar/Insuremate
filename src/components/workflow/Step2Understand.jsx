import React, { useState, useRef } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { DocumentSourceModal } from './DocumentSourceModal';
import { 
  Sparkles, 
  ArrowRight, 
  Eye, 
  ShieldCheck,
  Layers,
  Activity,
  Clock,
  Ban,
  Percent,
  Coins,
  Search,
  RefreshCw,
  Send,
  AlertTriangle
} from 'lucide-react';

export const Step2Understand = () => {
  const { 
    currentPolicy, 
    advanceToNextStep 
  } = usePolicy();

  const [inputQuery, setInputQuery] = useState('');
  const [modalEvidence, setModalEvidence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState('coverage');

  // Single latest answer state (no chat history, never append)
  const [latestAnswer, setLatestAnswer] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Embedded AI Section highlight/glow state
  const [isAiHighlighted, setIsAiHighlighted] = useState(false);
  const aiSectionRef = useRef(null);
  const inputRef = useRef(null);

  // Smooth scroll to embedded AI section & autofocus input with glowing highlight
  const handleScrollToAI = () => {
    if (aiSectionRef.current) {
      aiSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setIsAiHighlighted(true);
    setTimeout(() => {
      setIsAiHighlighted(false);
    }, 1000); // 800-1200ms subtle glow per requirement
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 250);
  };

  // STEP 2: Policy Overview Nodes (Coverage, Exclusions, Waiting periods, Deductibles, Co-payment, Room-rent limits, Sub-limits)
  const policyNodes = [
    {
      id: "coverage",
      title: "Coverage",
      icon: ShieldCheck,
      headline: "Inpatient & Day Care Coverage",
      details: [
        "Inpatient Hospitalization: 100% admissible expenses (min 24h admission) up to Sum Insured.",
        "540+ Day Care Surgeries: Modern procedures requiring < 24h stay (dialysis, cataract, chemo).",
        "Pre & Post Hospitalization: 60 days prior & 90 days after discharge covered on reimbursement."
      ],
      citation: "Page 6 • Section 2.1 & Section 2.3",
      evidence: {
        page: 6,
        section: "Section 2.1 & 2.3 • Inpatient Hospitalization & Day Care",
        excerpt: "The Company will indemnify Medically Necessary Hospitalization expenses reasonably incurred for Inpatient care and specified Day Care treatments up to the Sum Insured."
      }
    },
    {
      id: "exclusions",
      title: "Exclusions",
      icon: Ban,
      headline: "General & Permanent Exclusions",
      details: [
        "Cosmetic & Aesthetic Surgery: Excluded unless required post acute accidental trauma or burns.",
        "Non-Accidental Dental: Routine outpatient dental care excluded.",
        "Statutory Non-Payables: IRDAI non-medical consumables (PPE kits, masks, admission fees)."
      ],
      citation: "Page 26 • Section 6.1",
      evidence: {
        page: 26,
        section: "Section 6.1 • Permanent Exclusions Register",
        excerpt: "The Company shall not be liable to make any payment for expenses incurred towards Cosmetic surgery, OPD dental, Unproven experimental therapies, or Non-medical supplies."
      }
    },
    {
      id: "waiting",
      title: "Waiting Periods",
      icon: Clock,
      headline: "Statutory Waiting Timelines",
      details: [
        "Initial 30 Days: Cleared (all emergency non-accidental illnesses covered).",
        "24-Month Specific Illnesses: Joint replacement, cataract, hernia (18 months elapsed, 6 remaining).",
        "36-Month Pre-Existing (PED): Declared conditions covered after 36 months (24 months elapsed)."
      ],
      citation: "Page 12 • Section 5.2",
      evidence: {
        page: 12,
        section: "Section 5.2 • Waiting Periods Schedule",
        excerpt: "A waiting period of 24 months applies for Joint Replacement, Cataract, and specific elective surgeries from policy inception."
      }
    },
    {
      id: "deductibles",
      title: "Deductibles",
      icon: Coins,
      headline: "Annual Aggregate Deductible",
      details: [
        "Deductible Amount: ₹20,000 per policy year applied prior to insurer payment liability.",
        "Threshold Settlement: Paid out-of-pocket by policyholder directly to the hospital.",
        "Balance Coverage: 100% of remaining admissible expenses paid up to available Sum Insured."
      ],
      citation: "Page 12 • Section 3.1",
      evidence: {
        page: 12,
        section: "Section 3.1 • Annual Aggregate Deductible Clause",
        excerpt: "The Insured shall be responsible for paying the specified Deductible amount of ₹20,000 for each policy year prior to any benefits becoming payable under the Hospitalization Benefit."
      }
    },
    {
      id: "copayment",
      title: "Co-payment",
      icon: Percent,
      headline: "Network vs Non-Network Co-Pay",
      details: [
        "Network Hospitals: 0% co-payment for cashless hospitalizations at 14,200+ empaneled facilities.",
        "Non-Network Hospitals: 10% co-payment on final admissible reimbursement claims.",
        "Senior Citizens: 20% co-payment if insured person is aged 61 years or above."
      ],
      citation: "Page 21 • Section 5.2",
      evidence: {
        page: 21,
        section: "Section 5.2 • Co-Payment Schedule",
        excerpt: "A Co-payment of 10% shall be applicable on admissible claim amounts incurred at Non-Network Hospitals. Zero co-payment applies for cashless admissions at network providers."
      }
    },
    {
      id: "roomrent",
      title: "Room-rent limits",
      icon: Layers,
      headline: "Room Rent & ICU Ceilings",
      details: [
        "Room Rent Cap: ₹5,000/day (1% of ₹5,00,000 SI) or Single Private A/C Room.",
        "ICU Charges: Capped at ₹10,000/day (2% of Sum Insured).",
        "Proportionate Deduction: Over-limit room tariff scales down all associated medical charges proportionally."
      ],
      citation: "Page 8 • Section 3.1.2",
      evidence: {
        page: 8,
        section: "Section 3.1.2 • Sub-limits & Proportionate Deductions",
        excerpt: "Daily room rent is capped at 1% of Sum Insured. If room tariff exceeds this threshold, associated medical charges shall be reimbursed in proportion to eligible room rent."
      }
    },
    {
      id: "sublimits",
      title: "Sub-limits",
      icon: Activity,
      headline: "Procedure & Treatment Caps",
      details: [
        "Joint Replacement Sub-limit: ₹2,50,000 maximum per joint.",
        "Cataract Surgery Sub-limit: ₹40,000 per eye.",
        "Maternity Sub-limit: ₹50,000 normal / ₹75,000 C-Section delivery."
      ],
      citation: "Page 9 • Section 3.3",
      evidence: {
        page: 9,
        section: "Section 3.3 • Specific Procedure Sub-Limits",
        excerpt: "Expenses related to Joint Replacement procedures are capped at a maximum of ₹2,50,000 per joint regardless of available Sum Insured balance."
      }
    }
  ];

  // Compact suggested questions specified in prompt wireframe
  const suggestionChips = [
    "Is knee replacement covered?",
    "What is my waiting period?",
    "What is my room-rent limit?",
    "What is my deductible?"
  ];

  // Grounded knowledge base answers
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
        text: "Your daily room-rent limit is capped at 1% of Sum Insured (₹5,00,000 SI = ₹5,000/day) or a Single Private A/C Room, whichever is lower. ICU is capped at ₹10,000/day (2% of Sum Insured). Opting for a higher tariff triggers proportionate deductions across associated doctor & surgical fees.",
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

  // Trigger query (either from form submit or clicking a chip)
  const handleAsk = (queryText) => {
    const textToQuery = queryText || inputQuery;
    if (!textToQuery || !textToQuery.trim()) return;

    setInputQuery(textToQuery);
    setIsAnalyzing(true);

    // Simulate fast NLP clause retrieval
    setTimeout(() => {
      const answer = getAnswerForQuery(textToQuery);
      setLatestAnswer(answer); // REPLACES previous answer. Never append.
      setIsAnalyzing(false);
    }, 400);
  };

  const handleChipClick = (chipText) => {
    handleAsk(chipText);
  };

  const handleOpenSource = (evidence) => {
    setModalEvidence(evidence);
    setIsModalOpen(true);
  };

  const activeNode = policyNodes.find(n => n.id === activeNodeId) || policyNodes[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto step-transition pb-6">
      
      {/* 1. STEP 2: UNDERSTAND YOUR POLICY */}
      <div className="space-y-4">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-brand-blue" />
            <span>Step 02 · Understand Your Policy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight uppercase">
            Understand Your Policy
          </h2>
          <p className="text-xs sm:text-sm text-navy-600 max-w-xl mx-auto leading-relaxed">
            Policy summary and extracted coverage terms for <span className="font-semibold text-navy-900">{currentPolicy.policyName}</span>. Review key clauses or ask InsureMate AI directly below.
          </p>
        </div>

        {/* Interactive Node Network Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle p-5 sm:p-6 space-y-5">
          
          {/* Center Badge + Node Grid */}
          <div>
            <div className="flex flex-col items-center justify-center text-center pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B1220] border-2 border-brand-blue shadow-glow-blue flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="mt-1 text-[11px] font-black tracking-tight text-navy-900 uppercase">
                InsureMate Policy Summary
              </div>
              <div className="text-[10px] text-navy-500">
                {currentPolicy.policyName} • Policy #{currentPolicy.policyNumber}
              </div>
            </div>

            {/* Radial / Connected Nodes Row (Coverage, Exclusions, Waiting periods, Deductibles, Co-payment, Room-rent limits, Sub-limits) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {policyNodes.map((node) => {
                const isActive = activeNodeId === node.id;
                const Icon = node.icon;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onMouseEnter={() => setActiveNodeId(node.id)}
                    onClick={() => setActiveNodeId(node.id)}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-between group ${
                      isActive
                        ? 'bg-navy-900 border-brand-blue text-white shadow-glow-blue scale-102'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-navy-800'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-all ${
                      isActive
                        ? 'bg-brand-blue text-white'
                        : 'bg-white text-navy-700 shadow-subtle'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className={`text-[11px] font-bold transition-colors ${
                      isActive ? 'text-white' : 'text-navy-900'
                    }`}>
                      {node.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Node Info Panel */}
            <div className="mt-4 p-4 rounded-xl bg-[#0B1220] text-white border border-navy-800 shadow-subtle transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-brand-blue text-white flex items-center justify-center">
                    <activeNode.icon className="w-3 h-3" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-brand-blue uppercase font-bold tracking-wider mr-2">
                      {activeNode.title.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {activeNode.headline}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenSource(activeNode.evidence)}
                  className="px-2.5 py-1 bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-semibold border border-navy-700 transition-colors flex items-center gap-1 self-start sm:self-auto"
                >
                  <Eye className="w-3 h-3 text-brand-blue" />
                  <span>View Source ({activeNode.citation})</span>
                </button>
              </div>

              <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-300">
                {activeNode.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-blue mt-1.5 flex-shrink-0"></span>
                    <span className="leading-snug">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CLEAR CTA: [ ✦ Ask InsureMate AI ] (Takes user directly to embedded AI section on same page) */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50 to-blue-50/40 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-bold text-navy-900">
                    Need instant clarity on clauses or conditions?
                  </div>
                  <div className="text-[11px] text-navy-500">
                    Query your extracted policy terms with grounded citations and confidence ratings.
                  </div>
                </div>
              </div>

              <button
                type="button"
                id="ask-insuremate-ai-button"
                onClick={handleScrollToAI}
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm shadow-premium hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 group flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
                <span>✦ Ask InsureMate AI</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 2. EMBEDDED AI ASSISTANT SECTION (Compact, grounded, embedded on Step 2) */}
      <div 
        ref={aiSectionRef}
        id="embedded-ai-assistant-section"
        className={`bg-white rounded-3xl border p-5 sm:p-6 space-y-4 transition-all duration-300 ${
          isAiHighlighted 
            ? 'ring-4 ring-brand-blue/40 border-brand-blue shadow-glow-blue scale-[1.008]' 
            : 'border-slate-200 shadow-premium'
        }`}
      >
        
        {/* Card Header: ✦ Ask InsureMate AI / Ask anything about your insurance policy. */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-brand-blue font-bold text-base sm:text-lg">✦</span>
              <h3 className="text-base sm:text-lg font-bold text-navy-900 tracking-tight">
                Ask InsureMate AI
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-navy-500 mt-0.5">
              Ask anything about your insurance policy.
            </p>
          </div>

          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 hidden sm:inline-block">
            Grounded Policy Intelligence
          </span>
        </div>

        {/* Input: [ Ask about coverage, waiting period, limits... ] [ Ask ] */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputQuery);
          }} 
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              ref={inputRef}
              id="ai-assistant-input"
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about coverage, waiting period, limits..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all text-navy-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          <button
            type="submit"
            id="ai-assistant-ask-btn"
            disabled={!inputQuery.trim() || isAnalyzing}
            className="px-5 py-2.5 bg-brand-blue hover:bg-brand-blue-dark disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm shadow-subtle transition-all flex items-center gap-1.5 flex-shrink-0"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Analyzing policy...</span>
              </>
            ) : (
              <>
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Suggested questions: */}
        <div className="space-y-1.5 pt-0.5">
          <div className="text-[11px] font-semibold text-slate-500">
            Suggested questions:
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1 rounded-full bg-slate-50 hover:bg-blue-50 text-navy-800 hover:text-brand-blue border border-slate-200 hover:border-blue-200 text-xs font-medium transition-all shadow-subtle flex-shrink-0 active:scale-98"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Compact AI Response Block (Structured per specification: QUESTION, AI RESPONSE, EVIDENCE, CONFIDENCE, Missing info) */}
        {latestAnswer && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-blue-200/80 space-y-3.5">
              
              {/* QUESTION */}
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Question
                </div>
                <div className="text-xs sm:text-sm font-bold text-navy-900 mt-0.5">
                  {latestAnswer.query}
                </div>
              </div>

              {/* AI RESPONSE */}
              <div className="pt-2.5 border-t border-slate-200/80">
                <div className="text-[10px] font-bold text-brand-blue uppercase tracking-wider font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-blue" />
                  <span>AI Response</span>
                </div>
                <p className="text-xs sm:text-sm text-navy-900 leading-relaxed font-normal mt-1">
                  {latestAnswer.text}
                </p>
              </div>

              {/* EVIDENCE & CONFIDENCE ROW */}
              <div className="pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Evidence
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs font-semibold text-navy-900">
                      {latestAnswer.evidenceRef}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenSource(latestAnswer.evidenceModal)}
                      className="px-2 py-0.5 bg-white hover:bg-brand-blue hover:text-white text-brand-blue border border-blue-200 rounded-md font-bold text-[10px] transition-all flex items-center gap-1 shadow-subtle"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Source</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Confidence
                  </div>
                  <div className="mt-0.5">
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{latestAnswer.confidence}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* MISSING INFORMATION (Alert if any missing information or limitation) */}
              {latestAnswer.missingInfo && (
                <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 px-3 py-2 rounded-xl border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950">⚠ Missing information: </span>
                    <span>{latestAnswer.missingInfo}</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* SINGLE PRIMARY CTA TO ADVANCE TO TREATMENT SCENARIO */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          id="continue-to-treatment-scenario-btn"
          onClick={() => {
            const el = document.getElementById('treatment-scenario-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              advanceToNextStep();
            }
          }}
          className="w-full sm:w-auto px-7 py-3 bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm rounded-xl shadow-premium hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 group"
        >
          <span>Continue to Treatment Scenario</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Modal / Document Viewer with highlighted clause (closes via X, backdrop click and Escape) */}
      <DocumentSourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidence={modalEvidence}
        policyName={currentPolicy.policyName}
      />

    </div>
  );
};
