/**
 * InsureMate - Policy Assistant Chat Knowledge Base & Evidence Data
 * Each response includes:
 * - Plain language explanation
 * - Evidence Card (page number, section title, verbatim excerpt)
 * - Warning/Conditions alert (if waiting period or sub-limit applies)
 * - Confidence score and rating
 * - Synthetic demo data disclaimer
 */

export const SUGGESTED_QUESTIONS = [
  {
    id: "q-knee",
    text: "Is knee replacement covered?",
    badge: "Hospitalization Cover"
  },
  {
    id: "q-room-rent",
    text: "What is my room-rent limit?",
    badge: "Sub-limit & Penalty"
  },
  {
    id: "q-exclusions",
    text: "What treatments are excluded?",
    badge: "Permanent Exclusions"
  },
  {
    id: "q-waiting",
    text: "What is my waiting period?",
    badge: "PED & Procedures"
  },
  {
    id: "q-deductible",
    text: "How much is my deductible?",
    badge: "Cost Sharing"
  }
];

export const KNOWLEDGE_BASE_RESPONSES = {
  "knee": {
    matchedQuery: "Is knee replacement covered?",
    answer: "Knee replacement is potentially covered under hospitalization benefits, subject to the applicable waiting period, sub-limits and remaining sum insured.",
    details: [
      "Sub-limit: Coverage is capped at ₹2,50,000 per joint or actual approved expenses, whichever is lower.",
      "Waiting Period: Specific illness waiting period applies (24 months). If the procedure is elective/degenerative, eligibility requires continuous policy active status.",
      "Cashless Facility: 0% co-payment when performed at any empaneled network healthcare provider."
    ],
    warning: {
      type: "amber",
      title: "Waiting-Period & Sub-Limit Verification Required",
      message: "Non-accidental knee replacement requires verification of the 24-month specific illness waiting clause and the ₹2,50,000 per joint sub-limit cap."
    },
    evidence: {
      page: 18,
      section: "Section 4.2 • Hospitalization Benefits",
      excerpt: "Hospitalization expenses for Joint Replacement / Knee Surgery are potentially covered under Inpatient Hospitalization Benefits, subject to the applicable waiting period, sub-limits and remaining sum insured."
    },
    confidence: {
      score: 92,
      rating: "Very High Confidence",
      notes: "Relevant clause matched directly from Section 4.2."
    },
    reasoning: [
      { text: "relevant clause found", status: "success" },
      { text: "treatment category matched", status: "success" },
      { text: "waiting-period eligibility requires verification", status: "warning" }
    ]
  },

  "room": {
    matchedQuery: "What is my room-rent limit?",
    answer: "Your policy room-rent limit is 1% of your Sum Insured per day (₹5,000/day) or a Single Private A/C Room, whichever is lower. ICU charges are capped at 2% of Sum Insured (₹10,000/day).",
    details: [
      "Daily Room Cap: ₹5,000 per day (1% of ₹5,00,000 Sum Insured).",
      "ICU Daily Cap: ₹10,000 per day (2% of Sum Insured).",
      "Proportionate Deduction Clause: If room tariff exceeds ₹5,000/day, all associated hospital charges (OT, doctor, nursing) will be reduced proportionately."
    ],
    warning: {
      type: "amber",
      title: "Proportionate Deduction Risk",
      message: "Exceeding the eligible room tariff will trigger a proportionate deduction across associated medical bills."
    },
    evidence: {
      page: 8,
      section: "Section 3.1.2 • Room Rent & Proportionate Deductions",
      excerpt: "Room, Boarding and Nursing Expenses provided by the Hospital are capped at 1% of Sum Insured per day. If a higher tariff room is chosen, associated medical expenses are paid in the same proportion."
    },
    confidence: {
      score: 96,
      rating: "Definitive Match",
      notes: "Clause 3.1.2 defines the 1% formula and proportionate deduction rule."
    },
    reasoning: [
      { text: "relevant clause found", status: "success" },
      { text: "sub-limit formula verified", status: "success" },
      { text: "proportionate penalty clause verified", status: "warning" }
    ]
  },

  "exclusions": {
    matchedQuery: "What treatments are excluded?",
    answer: "Under your policy, permanent exclusions include cosmetic surgery, non-accidental dental care, experimental or unproven therapies, routine OPD consultations, and non-medical hospital consumables.",
    details: [
      "Cosmetic & Aesthetic: Excluded unless required for reconstructive surgery following acute burn or accident.",
      "Dental Procedures: Excluded unless arising directly from accidental bodily trauma requiring hospital admission.",
      "IRDAI Non-Payables: PPE kits, sanitizers, administrative fees, and non-medical consumables are excluded from reimbursement."
    ],
    warning: {
      type: "amber",
      title: "Permanent Exclusions Apply Universally",
      message: "Excluded treatments cannot be claimed under cashless or reimbursement even if Sum Insured is fully available."
    },
    evidence: {
      page: 26,
      section: "Section 6.1 • Permanent & General Exclusions",
      excerpt: "The Company shall not be liable to make any payment for any expenses incurred towards Cosmetic or Plastic Surgery, Non-accidental Dental treatments, Experimental Procedures, and items listed under Annexure I Non-Payable Schedules."
    },
    confidence: {
      score: 95,
      rating: "High Confidence",
      notes: "Direct citation from Section 6.1 general exclusion register."
    },
    reasoning: [
      { text: "relevant clause found", status: "success" },
      { text: "statutory exclusion registry matched", status: "success" },
      { text: "non-payable schedule confirmed", status: "warning" }
    ]
  },

  "waiting": {
    matchedQuery: "What is my waiting period?",
    answer: "Your policy enforces three distinct waiting periods: an initial 30-day waiting period, a 24-month waiting period for specific listed illnesses, and a 36-month waiting period for declared pre-existing diseases (PED).",
    details: [
      "Initial 30 Days: Completed (all non-accidental illnesses eligible).",
      "24-Month Specific Illnesses: Applies to joint replacements, cataract, hernia, and calculus diseases (18 months elapsed, 6 months remaining).",
      "36-Month PED: Applies to declared pre-existing conditions (24 months elapsed, 12 months remaining)."
    ],
    warning: {
      type: "amber",
      title: "6 Months Remaining for Specific Surgical Procedures",
      message: "Elective joint replacement or cataract surgery will be admissible once the remaining 6 months of the 24-month waiting period elapse."
    },
    evidence: {
      page: 12,
      section: "Section 5.2 • Waiting Periods Schedule",
      excerpt: "Specific procedures listed in Schedule B (including Joint Replacements and Cataract) shall be covered only after twenty-four (24) continuous months of coverage from policy inception."
    },
    confidence: {
      score: 94,
      rating: "High Accuracy",
      notes: "Direct match against Section 5.2 Specific Procedures waiting period."
    },
    reasoning: [
      { text: "relevant clause found", status: "success" },
      { text: "waiting period duration matched", status: "success" },
      { text: "elapsed months calculated against inception date", status: "warning" }
    ]
  },

  "deductible": {
    matchedQuery: "How much is my deductible?",
    answer: "Your standard policy has a ₹20,000 deductible per policy year on specific hospitalization claims, after which the policy covers admissible expenses up to the available Sum Insured.",
    details: [
      "Base Floater Deductible: ₹20,000 applicable per policy year before claim liability attaches.",
      "Network Cashless Co-pay: 0% co-payment at 14,200+ network hospitals once deductible is met.",
      "Non-network Co-pay: 10% co-payment applies if treated at non-network healthcare facilities."
    ],
    warning: {
      type: "blue",
      title: "Deductible is Paid Out of Pocket First",
      message: "The first ₹20,000 of admissible hospital bills is settled directly by the policyholder before insurer contribution starts."
    },
    evidence: {
      page: 12,
      section: "Section 3.1 • Annual Aggregate Deductible Clause",
      excerpt: "The Insured shall be responsible for paying the specified Deductible amount of ₹20,000 for each policy year prior to any benefits becoming payable under the Hospitalization Benefit."
    },
    confidence: {
      score: 98,
      rating: "Definitive Match",
      notes: "Clause 3.1 defines the annual deductible requirement."
    },
    reasoning: [
      { text: "relevant clause found", status: "success" },
      { text: "deductible schedule matched", status: "success" },
      { text: "cost-sharing order verified", status: "warning" }
    ]
  },

  "copay": {
    matchedQuery: "What is my co-payment percentage?",
    answer: "Your policy has 0% co-payment when you receive treatment at an empaneled Network Hospital. A 10% co-payment applies if you choose a Non-Network Hospital.",
    details: [
      "Network Hospitals (Cashless): 0% co-pay. The insurer pays 100% of approved eligible expenses.",
      "Non-Network Hospitals (Reimbursement): 10% co-payment applied to the final eligible claim amount.",
      "Senior Citizen Clause: If any insured person undergoes treatment at age 61 or above, a 20% co-payment applies regardless of hospital network status."
    ],
    warning: {
      type: "blue",
      title: "Recommendation: Stick to Network Hospitals",
      message: "Over 14,200 hospitals in India offer 0% co-pay cashless claims on this policy. Seeking treatment at an out-of-network facility adds an avoidable 10% out-of-pocket cost."
    },
    evidence: {
      page: 21,
      section: "Section 5.2 — Co-Payment Schedule and Network Conditions",
      excerpt: "A Co-payment of 10% shall be applicable on all admissible claim amounts incurred at Non-Network Hospitals. Zero co-payment applies for cashless hospitalizations at registered network service providers."
    },
    confidence: {
      score: 94,
      rating: "Very High Confidence",
      notes: "Extracted directly from the Schedule of Benefits & Co-payment annexure."
    }
  },

  "ped": {
    matchedQuery: "Are pre-existing conditions covered yet?",
    answer: "No, pre-existing conditions (PED) are NOT yet covered. Your policy has a 36-month (3 years) waiting period for pre-existing conditions, and only 24 months have elapsed so far.",
    details: [
      "Total PED Waiting Period: 36 months (3 continuous policy years).",
      "Months Completed: 24 months.",
      "Months Remaining: 12 months (coverage unlocks on 01 April 2025 upon timely renewal).",
      "Declared Condition: Hypertension declared on primary insured (Rajesh Sharma). Any hospitalization directly attributable to hypertension or its clinical complications is excluded until the 36-month mark."
    ],
    warning: {
      type: "amber",
      title: "12 Months Waiting Remaining for Declared PED",
      message: "Hospitalization for conditions related to declared Hypertension will be rejected by the insurer until 36 continuous months of coverage are completed."
    },
    evidence: {
      page: 12,
      section: "Section 5.3 — Pre-Existing Disease (PED) Clause",
      excerpt: "Any condition, ailment or injury or related condition(s) for which the Insured had signs/symptoms, and/or was diagnosed within 48 months prior to inception, shall be covered only after 36 months of continuous coverage."
    },
    confidence: {
      score: 97,
      rating: "High Accuracy",
      notes: "Cross-referenced with proposal form declaration records and Section 5.3."
    }
  },

  "daycare": {
    matchedQuery: "What day-care procedures are included?",
    answer: "Your policy covers 540+ specified Day Care procedures where hospitalization is less than 24 hours due to technological and surgical advancement.",
    details: [
      "Eligible day-care treatments include: Chemotherapy, Radiotherapy, Hemodialysis, Cataract surgery, Laparoscopic appendectomy, Lithotripsy (kidney stones), Tympanoplasty, Tonsillectomy, and Coronary Angiography.",
      "Condition: The procedure must be carried out in a recognized hospital/day care centre with an OT and medical supervision.",
      "OPD consultations or dental treatments not involving admission do NOT qualify as day-care procedures."
    ],
    warning: {
      type: "emerald",
      title: "No 24-Hour Hospitalization Requirement for Listed Day Care",
      message: "The general mediclaim 24-hour admission requirement is formally waived for all 540+ medical procedures specified in Annexure II."
    },
    evidence: {
      page: 6,
      section: "Section 2.3 & Annexure II — Day Care Treatment Coverage",
      excerpt: "Medical expenses incurred on hospitalization for specified Day Care Procedures requiring less than 24 hours admission due to modern medical technology shall be payable up to the Sum Insured."
    },
    confidence: {
      score: 99,
      rating: "Comprehensive Verification",
      notes: "Annexure II covers full 540+ procedure breakdown."
    }
  },

  "cataract": {
    matchedQuery: "What is the cataract surgery coverage limit?",
    answer: "Cataract surgery is covered up to ₹40,000 per eye, subject to the specific illness 24-month waiting period clause.",
    details: [
      "Sub-limit: ₹40,000 maximum per eye (inclusive of intraocular lens, surgeon fee, and OT).",
      "Waiting Period: Subject to 24-month waiting period (6 months remaining unless policy was ported from another insurer with continuity).",
      "Day Care: Cataract surgery qualifies as a recognized day care procedure with no overnight stay needed."
    ],
    warning: {
      type: "amber",
      title: "Capped at ₹40,000 per Eye",
      message: "Premium multifocal or Toric lenses costing ₹70,000+ will leave you with an out-of-pocket difference of ₹30,000+ per eye."
    },
    evidence: {
      page: 10,
      section: "Section 4.3(a) — Cataract Surgery Sub-limit",
      excerpt: "Expenses related to Cataract treatment shall be limited to ₹40,000 for each eye, subject to a 24-month waiting period from the original policy inception date."
    },
    confidence: {
      score: 96,
      rating: "Very High Confidence",
      notes: "Explicitly defined under Specific Illness sub-limit schedule."
    }
  },

  "cashless": {
    matchedQuery: "How does cashless claim processing work?",
    answer: "Cashless claims are facilitated at any of the 14,200+ network hospitals through the insurer's Third Party Administrator (TPA) or in-house health desk.",
    details: [
      "Planned Admission: Submit pre-authorization form at least 48 to 72 hours prior to hospital admission.",
      "Emergency Admission: Intimate within 24 hours of hospital admission.",
      "Approval Time: Initial cashless pre-auth is typically processed within 45 to 60 minutes.",
      "Non-payable items: Remember that non-medical consumables (IRDAI excluded items list like gloves, sanitizers, admission fees) are settled directly out of pocket at discharge."
    ],
    warning: {
      type: "blue",
      title: "Carry Your Digital Health Card & Govt Photo ID",
      message: "Present your InsureMate policy card (POL-IND-2024-884920) at the hospital TPA desk along with Aadhaar/PAN for instant verification."
    },
    evidence: {
      page: 18,
      section: "Section 8.1 — Cashless Settlement Guidelines",
      excerpt: "The Company will facilitate cashless access via designated Third Party Administrators at Network Hospitals subject to timely pre-authorization request and valid identification."
    },
    confidence: {
      score: 93,
      rating: "High Confidence",
      notes: "Standard network cashless protocol."
    }
  }
};

/**
 * Helper to match custom user questions against knowledge base
 */
export function getAssistantResponse(queryText, currentPolicy) {
  const q = queryText.toLowerCase();

  let matchedKey = null;
  if (q.includes("knee") || q.includes("joint") || q.includes("ortho")) {
    matchedKey = "knee";
  } else if (q.includes("room") || q.includes("rent") || q.includes("icu") || q.includes("bed")) {
    matchedKey = "room";
  } else if (q.includes("exclu") || q.includes("not covered") || q.includes("refused")) {
    matchedKey = "exclusions";
  } else if (q.includes("waiting") || q.includes("wait") || q.includes("period") || q.includes("months remaining")) {
    matchedKey = "waiting";
  } else if (q.includes("deduct") || q.includes("excess")) {
    matchedKey = "deductible";
  } else if (q.includes("co-pay") || q.includes("copay") || q.includes("percentage")) {
    matchedKey = "copay";
  } else if (q.includes("matern") || q.includes("deliver") || q.includes("baby") || q.includes("pregnan") || q.includes("c-section")) {
    matchedKey = "maternity";
  } else if (q.includes("pre-exist") || q.includes("ped") || q.includes("hypertens") || q.includes("diabetes")) {
    matchedKey = "ped";
  } else if (q.includes("day-care") || q.includes("day care") || q.includes("chemo") || q.includes("dialysis") || q.includes("24 hour")) {
    matchedKey = "daycare";
  } else if (q.includes("cataract") || q.includes("eye") || q.includes("lens")) {
    matchedKey = "cataract";
  } else if (q.includes("cashless") || q.includes("network") || q.includes("tpa") || q.includes("hospital")) {
    matchedKey = "cashless";
  }

  if (matchedKey && KNOWLEDGE_BASE_RESPONSES[matchedKey]) {
    return {
      ...KNOWLEDGE_BASE_RESPONSES[matchedKey],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSynthetic: true
    };
  }

  // Dynamic generalized fallback backed by active policy terms
  return {
    matchedQuery: queryText,
    answer: `Based on your policy document (${currentPolicy.policyName}), here is the synthesized policy analysis for your inquiry:`,
    details: [
      `Your current available Sum Insured is ₹${currentPolicy.financials.availableSumInsured.toLocaleString('en-IN')} out of ₹${currentPolicy.financials.totalSumInsured.toLocaleString('en-IN')}.`,
      `Inpatient hospitalization requires minimum 24-hour admission unless the treatment is listed under the 540+ approved Day Care procedures.`,
      `Network hospital claims enjoy 0% co-payment, whereas non-network admissions attract a 10% co-payment deduction.`,
      `Room rent is capped at ₹${currentPolicy.limitsAndSublimits.roomRent.dailyLimit.toLocaleString('en-IN')}/day; selecting higher rooms triggers proportionate reduction across diagnostic & doctor fee claims.`
    ],
    warning: {
      type: "blue",
      title: "General Policy Interpretation",
      message: "For non-standard experimental treatments or unlisted procedures, prior written approval from the insurer's medical underwriting desk is required."
    },
    evidence: {
      page: 16,
      section: "Section 3.4 & General Terms of Admissibility",
      excerpt: "Claims are payable up to the available sum insured for medically necessary hospitalization recommended by a registered medical practitioner, subject to applicable deductibles and sub-limits."
    },
    confidence: {
      score: 87,
      rating: "General Synthesis",
      notes: "Answer derived by synthesizing core policy schedule terms."
    },
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSynthetic: true
  };
}
