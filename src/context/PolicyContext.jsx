import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_POLICY_DATA, UPLOADED_POLICY_MOCK } from '../data/policyData';
import { getAssistantResponse, SUGGESTED_QUESTIONS } from '../data/chatData';
import { calculateTreatmentEstimate, POPULAR_PROCEDURES, CITIES_AND_HOSPITALS } from '../data/treatmentData';

const PolicyContext = createContext();

export const PolicyProvider = ({ children }) => {
  // Linear Workflow Step State: 1 = Upload, 2 = Understand, 3 = Treatment, 4 = Estimate, 5 = Result
  const [currentStep, setCurrentStep] = useState(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(2); // Allows user to jump between steps they've seen

  // Active Policy State
  const [currentPolicy, setCurrentPolicy] = useState(INITIAL_POLICY_DATA);
  const [isPolicyUploaded, setIsPolicyUploaded] = useState(true); // Pre-loaded with default policy
  const [uploadedFile, setUploadedFile] = useState(null);

  // Upload & OCR Analysis Pipeline Progress State
  const [analysisProgress, setAnalysisProgress] = useState({
    isAnalyzing: false,
    currentStep: 0,
    statusText: "",
    steps: [
      "Reading policy structure & OCR layers...",
      "Extracting 86 clauses & schedule limits...",
      "Identifying covered treatments & day-care lists...",
      "Mapping specific & permanent exclusions...",
      "Analyzing waiting periods & PED terms...",
      "Policy analyzed! Knowledge base ready."
    ]
  });

  // Step 2 Chat Assistant State
  const [chatMessages, setChatMessages] = useState([
    {
      id: "msg-welcome-1",
      sender: "assistant",
      text: "Hello! I am InsureMate. I have read and parsed all 86 clauses from your policy: " + INITIAL_POLICY_DATA.policyName + ". You can ask me any question about your coverage, sub-limits, waiting periods, or exclusions.",
      details: [
        "Base Sum Insured: ₹5,00,000 (Available: ₹3,84,500)",
        "Room Rent Cap: ₹5,000/day (1% of SI) — Proportionate deduction applies",
        "0% Cashless Co-pay at 14,200+ Network Hospitals"
      ],
      evidence: {
        page: 1,
        section: "Policy Schedule & Certificate of Insurance",
        excerpt: "Policy No: POL-IND-2024-884920 issued under Aegis Care Optima Health Shield."
      },
      confidence: {
        score: 98,
        rating: "Document Grounded",
        notes: "Verified against policy schedule page 1."
      },
      warning: null,
      timestamp: "Just now",
      isSynthetic: true
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Step 3 Minimal Treatment Scenario Input Form State
  const [treatmentScenario, setTreatmentScenario] = useState({
    procedureId: "knee-replacement",
    treatmentName: "Total Knee Replacement (Unilateral)",
    patientAge: 54,
    expectedCost: 285000,
    hasPreExisting: false,
    hospital: "Sahyadri Super Speciality Hospital, Pune",
    additionalInfo: "Doctor recommended surgery within 60 days. Inquiring for cashless pre-auth."
  });

  // Step 4 & 5 Calculation Results
  const initialCalc = calculateTreatmentEstimate({
    procedureId: "knee-replacement",
    hospitalName: "Sahyadri Super Speciality Hospital",
    cityName: "Pune",
    patientAge: 54,
    hasPreExisting: false,
    roomCategory: "Single Private A/C",
    policy: INITIAL_POLICY_DATA
  });

  const [currentEstimate, setCurrentEstimate] = useState(initialCalc);
  const [previousEstimate, setPreviousEstimate] = useState(null);
  const [recalculationReason, setRecalculationReason] = useState("");

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Step Navigation Control
  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 5) {
      setCurrentStep(stepNumber);
      if (stepNumber > maxUnlockedStep) {
        setMaxUnlockedStep(stepNumber);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const advanceToNextStep = () => {
    goToStep(currentStep + 1);
  };

  // Step 1: Simulated Upload & Analysis
  const runPolicyUploadAnalysis = (file, onCompleteCallback) => {
    setUploadedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      totalPages: 44
    });

    setAnalysisProgress(prev => ({
      ...prev,
      isAnalyzing: true,
      currentStep: 0,
      statusText: prev.steps[0]
    }));

    const stepInterval = 600;
    let step = 0;

    const intervalId = setInterval(() => {
      step++;
      if (step < analysisProgress.steps.length - 1) {
        setAnalysisProgress(prev => ({
          ...prev,
          currentStep: step,
          statusText: prev.steps[step]
        }));
      } else {
        clearInterval(intervalId);
        setAnalysisProgress(prev => ({
          ...prev,
          currentStep: prev.steps.length - 1,
          statusText: prev.steps[prev.steps.length - 1]
        }));

        setTimeout(() => {
          setCurrentPolicy(UPLOADED_POLICY_MOCK);
          setIsPolicyUploaded(true);
          setAnalysisProgress(prev => ({ ...prev, isAnalyzing: false }));
          setMaxUnlockedStep(prev => Math.max(prev, 2));

          addToast("Policy analyzed! 86 clauses & terms extracted.", "success");

          // Add a welcome assistant message for the new policy
          setChatMessages(prev => [
            ...prev,
            {
              id: `msg-${Date.now()}`,
              sender: "assistant",
              text: `I have analyzed your uploaded policy: **${UPLOADED_POLICY_MOCK.policyName}**. Sum Insured updated to ₹10,00,000 with 0% proportionate room-rent deductions!`,
              details: [
                "New Total Sum Insured: ₹10,00,000",
                "Room rent sublimit: Single Private A/C (no proportionate cut)",
                "Specific illness waiting period: Waived via continuity credit"
              ],
              evidence: {
                page: 1,
                section: "Uploaded Document Annexure A",
                excerpt: "Star Premier MediHealth Elite Floater — Admissibility Schedule."
              },
              confidence: {
                score: 96,
                rating: "High Accuracy OCR",
                notes: "Extracted 112 policy clauses."
              },
              warning: null,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isSynthetic: true
            }
          ]);

          if (onCompleteCallback) onCompleteCallback();
        }, 500);
      }
    }, stepInterval);
  };

  // Step 2: Chat Question Asking
  const askQuestion = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getAssistantResponse(queryText, currentPolicy);
      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        sender: "assistant",
        text: response.answer,
        details: response.details,
        warning: response.warning,
        evidence: response.evidence,
        confidence: response.confidence,
        timestamp: response.timestamp,
        isSynthetic: true
      };

      setChatMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
      setMaxUnlockedStep(prev => Math.max(prev, 3));
    }, 700);
  };

  // Step 3 -> 4 Calculation
  const runTreatmentAnalysis = (scenarioData) => {
    setTreatmentScenario(scenarioData);
    const newEst = calculateTreatmentEstimate({
      procedureId: scenarioData.procedureId,
      hospitalName: scenarioData.hospital,
      cityName: "Pune",
      patientAge: scenarioData.patientAge,
      hasPreExisting: scenarioData.hasPreExisting,
      roomCategory: "Single Private A/C",
      policy: currentPolicy
    });

    setPreviousEstimate(null);
    setCurrentEstimate(newEst);
    setRecalculationReason("");
    setMaxUnlockedStep(prev => Math.max(prev, 5));
    goToStep(4);
  };

  // Step 5: Recalculate
  const runRecalculation = (updatedData, reasonText) => {
    const updated = calculateTreatmentEstimate({
      procedureId: updatedData.procedureId || treatmentScenario.procedureId,
      hospitalName: updatedData.hospital || treatmentScenario.hospital,
      cityName: "Pune",
      patientAge: updatedData.patientAge || treatmentScenario.patientAge,
      hasPreExisting: updatedData.hasPreExisting !== undefined ? updatedData.hasPreExisting : treatmentScenario.hasPreExisting,
      roomCategory: updatedData.roomCategory || "Twin Sharing A/C",
      isNetworkOverride: updatedData.isNetworkOverride !== undefined ? updatedData.isNetworkOverride : true,
      policy: currentPolicy
    });

    setPreviousEstimate(currentEstimate);
    setCurrentEstimate(updated);
    setRecalculationReason(reasonText || "Updated patient age, room tariff, or network hospital parameters.");
    addToast("Treatment estimate recalculated!", "success");
  };

  // Reset entire workflow back to step 1
  const resetWorkflow = () => {
    setCurrentPolicy(INITIAL_POLICY_DATA);
    setIsPolicyUploaded(true);
    setUploadedFile(null);
    setCurrentStep(1);
    setMaxUnlockedStep(2);
    setPreviousEstimate(null);
    addToast("Workflow reset to sample policy baseline.", "info");
  };

  return (
    <PolicyContext.Provider
      value={{
        currentStep,
        maxUnlockedStep,
        goToStep,
        advanceToNextStep,
        currentPolicy,
        isPolicyUploaded,
        uploadedFile,
        analysisProgress,
        runPolicyUploadAnalysis,
        chatMessages,
        isTyping,
        askQuestion,
        suggestedQuestions: SUGGESTED_QUESTIONS,
        treatmentScenario,
        setTreatmentScenario,
        runTreatmentAnalysis,
        currentEstimate,
        previousEstimate,
        recalculationReason,
        runRecalculation,
        resetWorkflow,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export const usePolicy = () => {
  const context = useContext(PolicyContext);
  if (!context) {
    throw new Error('usePolicy must be used within a PolicyProvider');
  }
  return context;
};
