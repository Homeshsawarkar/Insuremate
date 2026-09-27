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
    text: "Is knee replacement surgery covered?",
    badge: "Waiting Period Alert"
  },
  {
    id: "q-room-rent",
    text: "What is my room rent limit?",
    badge: "Sub-limit Details"
  },
  {
    id: "q-maternity",
    text: "Is maternity covered, and what's the waiting period?",
    badge: "Capped Cover"
  },
  {
    id: "q-copay",
    text: "What is my co-payment percentage?",
    badge: "Network vs Non-network"
  },
  {
    id: "q-ped",
    text: "Are pre-existing conditions covered yet?",
    badge: "36-Month Clause"
  },
  {
    id: "q-daycare",
    text: "What day-care procedures are included?",
    badge: "540+ Procedures"
  }
];

export const KNOWLEDGE_BASE_RESPONSES = {
  "knee": {
    matchedQuery: "Is knee replacement surgery covered?",
    answer: "Yes, knee replacement (Unilateral or Bilateral Total Knee Arthroplasty) is covered under your policy, but with two very important conditions: a 24-month specific illness waiting period and a procedure sub-limit.",
    details: [
      "Sub-limit: Coverage is capped at ₹2,50,000 per joint or the actual cost, whichever is lower.",
      "Waiting Period Status: Your policy has completed 18 months of the mandatory 24-month specific illness waiting period. This means there are approximately 6 months remaining before non-accidental knee replacement claims become eligible.",
      "If the knee replacement is necessitated directly by an acute accidental trauma, the waiting period does NOT apply."
    ],
    warning: {
      type: "amber",
      title: "Active Waiting Period: 6 Months Remaining",
      message: "Elective or degenerative knee replacement surgery is NOT claimable today. It becomes fully eligible after 6 months once your 24-month specific illness waiting period is completed."
    },
    evidence: {
      page: 11,
      section: "Section 4.3(c) & Section 5.2 — Joint Replacement & Specified Disease Waiting Period",
      excerpt: "Joint replacement surgeries for osteoarthritis or degenerative joint disease are subject to a mandatory 24-month waiting period from inception. Coverage is capped at a maximum of ₹2,50,000 per joint."
    },
    confidence: {
      score: 96,
      rating: "Very High Confidence",
      notes: "Direct match against Section 4.3(c) and Schedule of Specified Procedures."
    }
  },

  "room": {
    matchedQuery: "What is my room rent limit?",
    answer: "Your policy room-rent limit is 1% of your Sum Insured per day, which equates to ₹5,000 per day (or a Single Private A/C Room, whichever is lower). ICU charges are capped separately at 2% of Sum Insured (₹10,000 per day).",
    details: [
      "Daily Room Rent Cap: ₹5,000/day (1% of ₹5,00,000 Sum Insured).",
      "ICU Daily Cap: ₹10,000/day (2% of Sum Insured).",
      "Proportionate Deduction Risk: If you opt for a room costing more than ₹5,000/day (e.g., Deluxe or Suite at ₹10,000/day), the insurer will deduct ALL associated hospital bill components (surgeon fees, OT charges, nursing charges) proportionately by 50%!"
    ],
    warning: {
      type: "amber",
      title: "Watch Out for Proportionate Deduction Clause",
      message: "Choosing a room category higher than Single Private A/C / ₹5,000/day will result in a heavy proportionate penalty across your entire hospital bill, greatly increasing your out-of-pocket payment."
    },
    evidence: {
      page: 8,
      section: "Section 3.1.2 — Room Rent & Proportionate Deductions Clause",
      excerpt: "Room, Boarding and Nursing Expenses provided by the Hospital/Nursing Home are capped at 1% of Sum Insured per day. If Insured Person occupies a room with higher tariff than eligible, other medical charges shall be reimbursed in proportion to eligible room rent."
    },
    confidence: {
      score: 98,
      rating: "Definitive Match",
      notes: "Clause 3.1.2 explicitly defines the 1% formula and proportionate deduction rule."
    }
  },

  "maternity": {
    matchedQuery: "Is maternity covered, and what's the waiting period?",
    answer: "Yes, maternity expenses are covered for up to 2 deliveries under this floater policy, subject to a sub-limit. Your 24-month maternity waiting period is now completed, meaning coverage is currently ACTIVE.",
    details: [
      "Normal Delivery Sub-limit: ₹40,000 per delivery.",
      "Caesarean (C-Section) Sub-limit: ₹60,000 per delivery.",
      "Waiting Period: 24 months from policy start date. Since your policy has run for 24 months, this benefit is now fully unlocked.",
      "Newborn baby is automatically covered from day 1 up to the expiry of the current policy period within the maternity sub-limit."
    ],
    warning: {
      type: "emerald",
      title: "Maternity Waiting Period Cleared",
      message: "You have completed the 24-month waiting duration. Claims for normal or C-section delivery are eligible up to the respective sub-limits."
    },
    evidence: {
      page: 14,
      section: "Section 4.8 & Section 5.4 — Maternity Expenses & Newborn Cover",
      excerpt: "Hospitalization expenses for delivery (including caesarean section) are covered after 24 continuous months of coverage, limited to ₹40,000 for normal and ₹60,000 for caesarean section, for a maximum of two deliveries during lifetime."
    },
    confidence: {
      score: 95,
      rating: "Very High Confidence",
      notes: "Explicitly defined under Section 4.8 with clear sub-limit values."
    }
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
      page: 15,
      section: "Section 7.2 — Co-Payment Schedule and Network Conditions",
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
  } else if (q.includes("matern") || q.includes("deliver") || q.includes("baby") || q.includes("pregnan") || q.includes("c-section")) {
    matchedKey = "maternity";
  } else if (q.includes("co-pay") || q.includes("copay") || q.includes("percentage") || q.includes("deductible")) {
    matchedKey = "copay";
  } else if (q.includes("pre-exist") || q.includes("ped") || q.includes("hypertens") || q.includes("diabetes") || q.includes("waiting")) {
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
