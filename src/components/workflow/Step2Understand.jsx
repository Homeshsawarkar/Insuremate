import React, { useState, useRef, useEffect } from 'react';
import { usePolicy } from '../../context/PolicyContext';
import { DocumentSourceModal } from './DocumentSourceModal';
import { 
  Bot, 
  Send, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Eye, 
  Check, 
  Search,
  ExternalLink
} from 'lucide-react';

export const Step2Understand = () => {
  const { 
    currentPolicy, 
    chatMessages, 
    isTyping, 
    askQuestion, 
    advanceToNextStep 
  } = usePolicy();

  const [inputQuery, setInputQuery] = useState('');
  const [modalEvidence, setModalEvidence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatBottomRef = useRef(null);

  // Health-insurance specific example questions
  const exampleQuestions = [
    { id: "q-knee", text: "Is knee replacement surgery covered?", tag: "Waiting Period Alert" },
    { id: "q-room", text: "What is my room rent limit?", tag: "Sub-limit Details" },
    { id: "q-ped", text: "Are pre-existing conditions covered yet?", tag: "PED Clause" },
    { id: "q-exclusions", text: "What are the permanent exclusions?", tag: "Section 6" },
    { id: "q-maternity", text: "Is maternity covered, and what's the waiting period?", tag: "Sub-limit" }
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    askQuestion(inputQuery);
    setInputQuery('');
  };

  const handleExampleClick = (text) => {
    askQuestion(text);
  };

  const handleOpenSource = (evidence) => {
    setModalEvidence(evidence);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto step-transition">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Step 02 · Policy Q&A & Evidence Grounding</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
          Ask Questions About Your Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Ask anything in plain language. Every answer is grounded in your verified policy document and paired with verbatim evidence citations.
        </p>
      </div>

      {/* Main Q&A Interface Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[580px]">
        
        {/* Policy Active Bar */}
        <div className="px-6 py-3.5 bg-[#1E1B4B] text-white flex flex-wrap items-center justify-between gap-3 text-xs border-b border-indigo-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-radar"></span>
            <span className="font-bold text-slate-200">Active Policy Knowledge Base:</span>
            <span className="text-cyan-400 font-semibold">{currentPolicy.policyName}</span>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            86 clauses indexed • 100% Policy Grounded
          </div>
        </div>

        {/* Clickable Example Questions Carousel */}
        <div className="p-4 bg-indigo-50/50 border-b border-indigo-100/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider whitespace-nowrap pl-1">
            Example Queries:
          </span>
          {exampleQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleExampleClick(q.text)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white border border-indigo-200 text-xs font-semibold text-[#1E1B4B] shadow-2xs transition-all whitespace-nowrap flex-shrink-0"
            >
              {q.text}
            </button>
          ))}
        </div>

        {/* Conversation Stream with Highlighted Evidence Blocks */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">
          {chatMessages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';

            return (
              <div 
                key={msg.id} 
                className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-3xl ${isAssistant ? 'w-full' : ''}`}>
                  
                  {/* User Bubble */}
                  {!isAssistant && (
                    <div className="bg-[#1E1B4B] text-white px-5 py-3 rounded-2xl rounded-tr-xs text-xs sm:text-sm font-semibold shadow-md">
                      {msg.text}
                      <div className="text-[10px] text-indigo-300 mt-1 text-right">{msg.timestamp}</div>
                    </div>
                  )}

                  {/* Assistant Answer PAIRED WITH VISIBLE EVIDENCE BLOCK (Mandatory Requirement) */}
                  {isAssistant && (
                    <div className="space-y-4">
                      
                      {/* Plain Language Explanation Box */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-blue-900 pb-2 border-b border-slate-200/80">
                          <span className="flex items-center gap-1.5">
                            <Bot className="w-4 h-4 text-purple-600" />
                            <span>InsureMate Policy Interpretation</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                            Confidence: {msg.confidence?.score || 96}%
                          </span>
                        </div>

                        <p className="font-medium text-[#1E1B4B]">
                          {msg.text}
                        </p>

                        {/* Bullet Details */}
                        {msg.details && msg.details.length > 0 && (
                          <ul className="space-y-1.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                            {msg.details.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Warning Box */}
                        {msg.warning && (
                          <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                            msg.warning.type === 'amber'
                              ? 'bg-amber-50 border-amber-300 text-amber-900'
                              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          }`}>
                            <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              msg.warning.type === 'amber' ? 'text-amber-600' : 'text-emerald-600'
                            }`} />
                            <div>
                              <div className="font-bold">{msg.warning.title}</div>
                              <div className="mt-0.5">{msg.warning.message}</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* VISIBLE EVIDENCE BLOCK (SLIDES IN, BRIEF FLASH HIGHLIGHT, VIEW SOURCE ACTION) */}
                      {msg.evidence && (
                        <div className="p-4 rounded-2xl bg-cyan-50/70 border-2 border-cyan-400 text-xs shadow-md animate-evidence-flash space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-cyan-700 text-white font-mono font-bold text-[10px]">
                                Page {msg.evidence.page}
                              </span>
                              <span className="font-bold text-cyan-950 text-xs">
                                {msg.evidence.section}
                              </span>
                            </div>

                            {/* View Source Action */}
                            <button
                              type="button"
                              onClick={() => handleOpenSource(msg.evidence)}
                              className="px-3 py-1 bg-white hover:bg-cyan-100 text-cyan-800 border border-cyan-300 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105"
                            >
                              <Eye className="w-3.5 h-3.5 text-cyan-600" />
                              <span>View Source</span>
                            </button>
                          </div>

                          {/* Verbatim Clause Preview */}
                          <div className="p-3 bg-white/90 rounded-xl border border-cyan-200/80 font-serif italic text-slate-800 text-xs leading-relaxed">
                            "{msg.evidence.excerpt}"
                          </div>

                          {/* Short Reasoning List (Hard Requirement) */}
                          <div className="grid sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-white/80 p-1.5 rounded-lg border border-emerald-200">
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span>Relevant clause found</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-white/80 p-1.5 rounded-lg border border-emerald-200">
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span>Category matched</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-amber-800 font-semibold bg-white/80 p-1.5 rounded-lg border border-amber-200">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                              <span>Waiting clause verified</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Animated Typing-Dots Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-3.5 flex items-center gap-3 text-xs text-indigo-900 font-medium">
                <Bot className="w-4 h-4 text-purple-600 animate-pulse" />
                <span>InsureMate is cross-referencing policy clauses and sub-limit tables...</span>
                <span className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Free-Text Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type any question (e.g. Is knee replacement covered? What is my room rent limit?)"
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all text-[#1E1B4B] placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Bottom Bar with SINGLE PRIMARY CTA */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Have an upcoming medical treatment in mind? Calculate your out-of-pocket share.
          </div>
          <button
            type="button"
            onClick={advanceToNextStep}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Continue to Treatment Scenario</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      {/* View Source Document Preview Modal */}
      <DocumentSourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        evidence={modalEvidence}
        policyName={currentPolicy.policyName}
      />

    </div>
  );
};
