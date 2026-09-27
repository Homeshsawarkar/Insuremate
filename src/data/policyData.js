/**
 * InsureMate - Centralized Policy Mock Data
 * Realistic Indian Health Insurance mediclaim structure.
 * Clearly labeled as Synthetic Demo Data.
 */

export const INITIAL_POLICY_DATA = {
  isSynthetic: true,
  disclaimer: "SYNTHETIC DEMO DATA: All numbers, terms, and clauses are illustrative for hackathon demonstration and do not represent real insurer underwriting commitments.",
  policyName: "Aegis Care Optima Health Shield (Platinum Plus)",
  policyNumber: "POL-IND-2024-884920",
  insurer: "Aegis General Health Insurance Ltd. (Synthetic Demo)",
  policyType: "Family Floater Mediclaim",
  policyPeriod: {
    startDate: "01 Apr 2024",
    endDate: "31 Mar 2025",
    termYears: 1,
    daysRemaining: 185
  },
  status: "Active",
  aiExtractionConfidence: 94, // %
  lastAnalyzedTimestamp: "2024-09-27 19:45 IST",
  documentMeta: {
    fileName: "Aegis_Care_Optima_Policy_Wording_v4.pdf",
    totalPages: 38,
    fileSize: "2.4 MB",
    clausesExtracted: 86
  },
  financials: {
    totalSumInsured: 500000, // ₹5,00,000
    availableSumInsured: 384500, // ₹3,84,500
    utilizedAmount: 115500, // ₹1,15,500
    cumulativeBonus: 100000, // ₹1,00,000 (NCB)
    effectiveTotalCover: 600000,
    deductible: 0,
    baseCopayPercentage: 0, // 0% at network hospitals
    nonNetworkCopayPercentage: 10, // 10% co-payment for non-network claims
    seniorCitizenCopayPercentage: 20 // If age > 60 years
  },
  membersCovered: [
    { id: "M1", name: "Rajesh Sharma", relation: "Primary Insured", age: 42, gender: "Male", ped: ["Hypertension (Declared)"] },
    { id: "M2", name: "Priya Sharma", relation: "Spouse", age: 39, gender: "Female", ped: [] },
    { id: "M3", name: "Aarav Sharma", relation: "Son", age: 12, gender: "Male", ped: [] }
  ],
  limitsAndSublimits: {
    roomRent: {
      type: "Percentage with Cap",
      dailyLimit: 5000,
      description: "1% of Sum Insured per day (₹5,000/day) or Single Private A/C Room, whichever is lower.",
      proportionateDeductionApplies: true,
      proportionateClause: "Section 3.1.2: If room category chosen exceeds eligible limit, all associated medical expenses (doctor visit, nursing, OT) will be paid in the same proportion as eligible room rent bears to actual room rent incurred."
    },
    icuCharges: {
      dailyLimit: 10000,
      description: "2% of Sum Insured per day (₹10,000/day) or actuals, whichever is lower.",
      proportionateDeductionApplies: true
    },
    specificProcedures: [
      { name: "Cataract Surgery", sublimit: 40000, unit: "per eye", clause: "Section 4.3(a)" },
      { name: "Joint Replacement / Knee Surgery", sublimit: 250000, unit: "per joint", clause: "Section 4.3(c)" },
      { name: "Maternity (Normal Delivery)", sublimit: 40000, unit: "per event", clause: "Section 4.8(i)" },
      { name: "Maternity (Caesarean / C-Section)", sublimit: 60000, unit: "per event", clause: "Section 4.8(ii)" },
      { name: "Kidney Stone / Lithotripsy", sublimit: 60000, unit: "per claim", clause: "Section 4.3(f)" },
      { name: "Hernia Repair", sublimit: 50000, unit: "per surgery", clause: "Section 4.3(d)" }
    ],
    prePostHospitalization: {
      preDays: 60,
      postDays: 90,
      description: "60 days prior to admission & 90 days after discharge covered on reimbursement basis."
    },
    roadAmbulance: {
      limit: 2500,
      unit: "per hospitalization"
    },
    restorationBenefit: {
      available: true,
      description: "100% automatic reload of Sum Insured once completely exhausted during the policy period for unrelated illnesses."
    }
  },
  waitingPeriods: [
    {
      id: "WP-01",
      category: "Initial Waiting Period",
      durationMonths: 1, // 30 days
      monthsElapsed: 18,
      status: "Completed",
      badgeColor: "emerald",
      clause: "Section 5.1(a)",
      description: "30-day initial waiting period for all non-accidental illnesses.",
      evidencePage: 9
    },
    {
      id: "WP-02",
      category: "Specific Illness Waiting Period",
      durationMonths: 24, // 2 years
      monthsElapsed: 18,
      monthsRemaining: 6,
      status: "In Progress",
      badgeColor: "amber",
      clause: "Section 5.2 - Specified Diseases & Procedures",
      description: "24-month waiting period for Joint Replacement, Cataract, Hernia, Benign Prostatic Hypertrophy, Piles, Sinusitis, Calculus diseases.",
      evidencePage: 11
    },
    {
      id: "WP-03",
      category: "Pre-Existing Diseases (PED)",
      durationMonths: 36, // 3 years
      monthsElapsed: 24,
      monthsRemaining: 12,
      status: "In Progress",
      badgeColor: "amber",
      clause: "Section 5.3 - Pre-existing Health Conditions",
      description: "36-month waiting period for any disease/condition diagnosed prior to policy inception (Hypertension declared).",
      evidencePage: 12
    },
    {
      id: "WP-04",
      category: "Maternity & Newborn Cover",
      durationMonths: 24, // 2 years
      monthsElapsed: 24,
      monthsRemaining: 0,
      status: "Completed",
      badgeColor: "emerald",
      clause: "Section 5.4 - Maternity Benefits",
      description: "24-month waiting period completed. Max 2 deliveries covered under floater.",
      evidencePage: 14
    }
  ],
  coverageCategories: [
    {
      category: "Inpatient Hospitalization (min 24h)",
      status: "Covered",
      badge: "Full Cover",
      notes: "Subject to room rent sub-limit and available sum insured.",
      sectionRef: "Section 2.1"
    },
    {
      category: "Day Care Procedures (540+ procedures)",
      status: "Covered",
      badge: "Covered",
      notes: "Treatments requiring < 24h admission due to technological advancement (e.g. Chemotherapy, Dialysis, Eye surgeries).",
      sectionRef: "Section 2.3"
    },
    {
      category: "ICU & Critical Care Charges",
      status: "Covered",
      badge: "Capped (2%)",
      notes: "Covered up to 2% of SI (₹10,000/day).",
      sectionRef: "Section 3.2"
    },
    {
      category: "Emergency Road Ambulance",
      status: "Covered",
      badge: "Capped (₹2.5K)",
      notes: "Up to ₹2,500 per hospitalization to nearest network facility.",
      sectionRef: "Section 2.7"
    },
    {
      category: "Pre & Post Hospitalization",
      status: "Covered",
      badge: "60/90 Days",
      notes: "Diagnostic tests, medications directly related to treated illness.",
      sectionRef: "Section 2.4"
    },
    {
      category: "Maternity Normal & C-Section",
      status: "Conditions Apply",
      badge: "Sub-limit (₹40k/60k)",
      notes: "Waiting period 24 months now completed. Sub-limit ₹40,000 for normal, ₹60,000 for C-section.",
      sectionRef: "Section 4.8"
    },
    {
      category: "Dental Treatment (Non-Accidental)",
      status: "Excluded",
      badge: "Permanent Exclusion",
      notes: "Excluded unless requiring hospitalization arising out of an accidental bodily injury.",
      sectionRef: "Section 6.2(d)"
    },
    {
      category: "Cosmetic & Aesthetic Surgery",
      status: "Excluded",
      badge: "Permanent Exclusion",
      notes: "Plastic/aesthetic surgery excluded unless reconstructive surgery caused by burn/accident.",
      sectionRef: "Section 6.1(a)"
    },
    {
      category: "Alternative Treatments (AYUSH)",
      status: "Conditions Apply",
      badge: "Government Hospital Only",
      notes: "Ayurveda, Yoga, Unani, Siddha, Homeopathy covered up to 100% SI if treated at certified government institutions.",
      sectionRef: "Section 2.9"
    },
    {
      category: "Robotic / Modern Advanced Treatments",
      status: "Conditions Apply",
      badge: "Sub-limit (50% SI)",
      notes: "Robotic surgeries, stem cell therapy, deep brain stimulation covered up to 50% of Sum Insured.",
      sectionRef: "Section 3.9"
    }
  ],
  keyExclusions: [
    "Outpatient Department (OPD) routine consultations without hospitalization",
    "Self-inflicted injuries or conditions resulting from substance misuse",
    "Experimental or unproven clinical treatments",
    "Weight loss / Bariatric surgeries unless BMI > 40 with severe comorbidity approval",
    "External non-medical items (PPE kits, gloves, registration charges, admission kits)"
  ],
  networkStats: {
    totalHospitals: 14200,
    cashlessTurnaroundMinutes: 45,
    topNetworkChains: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Manipal Hospitals", "Ruby Hall Clinic"]
  }
};

/**
 * Newly uploaded mock policy: "Star Health Comprehensive Super Shield"
 * Used when user simulates uploading a new PDF policy.
 */
export const UPLOADED_POLICY_MOCK = {
  isSynthetic: true,
  disclaimer: "SYNTHETIC DEMO DATA: Extracted via simulated InsureMate parser pipeline. For demonstration purposes only.",
  policyName: "Star Premier MediHealth Elite Floater",
  policyNumber: "POL-STAR-2024-991204",
  insurer: "Star Premier Allied Health Assurance Ltd. (Synthetic Demo)",
  policyType: "Executive Family Mediclaim",
  policyPeriod: {
    startDate: "15 Jun 2024",
    endDate: "14 Jun 2025",
    termYears: 1,
    daysRemaining: 260
  },
  status: "Active",
  aiExtractionConfidence: 96,
  lastAnalyzedTimestamp: "Just now (Automated OCR & NLP)",
  documentMeta: {
    fileName: "Star_Premier_MediHealth_Policy_Document_2024.pdf",
    totalPages: 44,
    fileSize: "3.8 MB",
    clausesExtracted: 112
  },
  financials: {
    totalSumInsured: 1000000, // ₹10,00,000
    availableSumInsured: 1000000,
    utilizedAmount: 0,
    cumulativeBonus: 150000,
    effectiveTotalCover: 1150000,
    deductible: 0,
    baseCopayPercentage: 0,
    nonNetworkCopayPercentage: 5,
    seniorCitizenCopayPercentage: 10
  },
  membersCovered: [
    { id: "M1", name: "Rajesh Sharma", relation: "Primary Insured", age: 42, gender: "Male", ped: ["Hypertension"] },
    { id: "M2", name: "Priya Sharma", relation: "Spouse", age: 39, gender: "Female", ped: [] },
    { id: "M3", name: "Aarav Sharma", relation: "Son", age: 12, gender: "Male", ped: [] }
  ],
  limitsAndSublimits: {
    roomRent: {
      type: "Single Private Room (No proportionate cut)",
      dailyLimit: 12000,
      description: "Single Private A/C Room without proportionate deduction penalty.",
      proportionateDeductionApplies: false,
      proportionateClause: "Section 3.1: Eligible for Single Standard AC Room without proportionate deduction."
    },
    icuCharges: {
      dailyLimit: 25000,
      description: "Actual ICU charges covered up to Sum Insured.",
      proportionateDeductionApplies: false
    },
    specificProcedures: [
      { name: "Cataract Surgery", sublimit: 65000, unit: "per eye", clause: "Section 4.2" },
      { name: "Joint Replacement / Knee Surgery", sublimit: 400000, unit: "per joint", clause: "Section 4.4" },
      { name: "Maternity (Normal Delivery)", sublimit: 75000, unit: "per event", clause: "Section 4.9" },
      { name: "Maternity (Caesarean / C-Section)", sublimit: 100000, unit: "per event", clause: "Section 4.9" },
      { name: "Kidney Stone / Lithotripsy", sublimit: 90000, unit: "per claim", clause: "Section 4.5" }
    ],
    prePostHospitalization: {
      preDays: 60,
      postDays: 180,
      description: "60 days pre-hospitalization & 180 days post-hospitalization reimbursement."
    },
    roadAmbulance: {
      limit: 5000,
      unit: "per hospitalization"
    },
    restorationBenefit: {
      available: true,
      description: "100% restoration up to 3 times in a policy year."
    }
  },
  waitingPeriods: [
    {
      id: "WP-01",
      category: "Initial Waiting Period",
      durationMonths: 1,
      monthsElapsed: 4,
      status: "Completed",
      badgeColor: "emerald",
      clause: "Section 5.1",
      description: "30-day initial waiting period completed.",
      evidencePage: 8
    },
    {
      id: "WP-02",
      category: "Specific Illness Waiting Period",
      durationMonths: 24,
      monthsElapsed: 24,
      monthsRemaining: 0,
      status: "Completed (Ported Policy)",
      badgeColor: "emerald",
      clause: "Section 5.2 - Special Illness Waiver",
      description: "24-month specific illness waiting period waived/elapsed due to portability continuity credit.",
      evidencePage: 12
    },
    {
      id: "WP-03",
      category: "Pre-Existing Diseases (PED)",
      durationMonths: 36,
      monthsElapsed: 28,
      monthsRemaining: 8,
      status: "In Progress",
      badgeColor: "amber",
      clause: "Section 5.3",
      description: "36-month waiting period for declared Hypertension (8 months remaining).",
      evidencePage: 15
    },
    {
      id: "WP-04",
      category: "Maternity & Newborn Cover",
      durationMonths: 24,
      monthsElapsed: 24,
      monthsRemaining: 0,
      status: "Completed",
      badgeColor: "emerald",
      clause: "Section 5.5",
      description: "Maternity cover fully active (up to ₹1,00,000 for C-section).",
      evidencePage: 18
    }
  ],
  coverageCategories: [
    { category: "Inpatient Hospitalization (min 24h)", status: "Covered", badge: "No Room Sublimit", notes: "Single AC room covered without proportionate penalties.", sectionRef: "Section 2.1" },
    { category: "Day Care Procedures", status: "Covered", badge: "All Daycare", notes: "Over 650 day care treatments covered.", sectionRef: "Section 2.4" },
    { category: "ICU & Critical Care Charges", status: "Covered", badge: "Actuals", notes: "No sublimit on ICU care.", sectionRef: "Section 3.1" },
    { category: "Emergency Air & Road Ambulance", status: "Covered", badge: "₹5,000 Road / Air Cover", notes: "Covered up to ₹5,000 road, air ambulance up to ₹2.5L.", sectionRef: "Section 2.8" },
    { category: "Maternity Normal & C-Section", status: "Covered", badge: "High Limit", notes: "₹75,000 normal, ₹1,00,000 C-Section.", sectionRef: "Section 4.9" },
    { category: "Dental Treatment (Non-Accidental)", status: "Excluded", badge: "Excluded", notes: "Cosmetic or non-accidental dental procedures not covered.", sectionRef: "Section 6.3" },
    { category: "Cosmetic & Aesthetic Surgery", status: "Excluded", badge: "Excluded", notes: "Aesthetic surgeries excluded unless accident reconstructive.", sectionRef: "Section 6.1" }
  ],
  keyExclusions: [
    "Outpatient routine dental visits without accident",
    "Self-inflicted injuries",
    "Pure cosmetic anti-aging treatments",
    "Non-medical charges (IRDAI list of non-payable items: admission charges, thermometer, gowns)"
  ],
  networkStats: {
    totalHospitals: 16800,
    cashlessTurnaroundMinutes: 30,
    topNetworkChains: ["Apollo", "Max", "Fortis", "Manipal", "Narayana Health"]
  }
};
