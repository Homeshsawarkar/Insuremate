/**
 * InsureMate - Treatment Cost Data & Calculation Engine
 * Indian Healthcare & Mediclaim cost models with realistic hospital benchmarks.
 * Clearly labeled as Synthetic Demo Data / Illustrative Estimates.
 */

export const POPULAR_PROCEDURES = [
  {
    id: "knee-replacement",
    name: "Total Knee Replacement (Unilateral)",
    category: "Orthopedic Surgery",
    standardStayDays: 4,
    baseCostTier1: 285000,
    baseCostTier2: 235000,
    sublimitKey: "Joint Replacement / Knee Surgery",
    waitingPeriodMonths: 24,
    defaultBreakdown: {
      surgeryFees: 110000,
      implantProsthesis: 65000,
      roomCharges: 32000, // 4 days @ 8000
      medicinesConsumables: 38000,
      diagnosticsPreOp: 40000
    },
    nonPayableConsumablesEst: 18000
  },
  {
    id: "cataract-surgery",
    name: "Cataract Surgery (Phaco + Foldable IOL)",
    category: "Ophthalmology (Day Care)",
    standardStayDays: 1,
    baseCostTier1: 65000,
    baseCostTier2: 48000,
    sublimitKey: "Cataract Surgery",
    waitingPeriodMonths: 24,
    defaultBreakdown: {
      surgeryFees: 24000,
      implantProsthesis: 22000,
      roomCharges: 5000,
      medicinesConsumables: 7000,
      diagnosticsPreOp: 7000
    },
    nonPayableConsumablesEst: 4500
  },
  {
    id: "angioplasty",
    name: "Coronary Angioplasty (PTCA with 1 DES Stent)",
    category: "Cardiology",
    standardStayDays: 3,
    baseCostTier1: 260000,
    baseCostTier2: 210000,
    sublimitKey: null, // Full SI subject to available limit
    waitingPeriodMonths: 24,
    defaultBreakdown: {
      surgeryFees: 95000,
      implantProsthesis: 45000,
      roomCharges: 36000, // ICU + Private
      medicinesConsumables: 48000,
      diagnosticsPreOp: 36000
    },
    nonPayableConsumablesEst: 22000
  },
  {
    id: "cholecystectomy",
    name: "Laparoscopic Gallbladder Removal",
    category: "General Surgery",
    standardStayDays: 2,
    baseCostTier1: 125000,
    baseCostTier2: 95000,
    sublimitKey: "Hernia Repair", // general surgery bucket
    waitingPeriodMonths: 24,
    defaultBreakdown: {
      surgeryFees: 52000,
      implantProsthesis: 8000,
      roomCharges: 18000,
      medicinesConsumables: 24000,
      diagnosticsPreOp: 23000
    },
    nonPayableConsumablesEst: 12000
  },
  {
    id: "maternity-csection",
    name: "Caesarean Section (C-Section Delivery)",
    category: "Obstetrics & Gynecology",
    standardStayDays: 3,
    baseCostTier1: 110000,
    baseCostTier2: 85000,
    sublimitKey: "Maternity (Caesarean / C-Section)",
    waitingPeriodMonths: 24,
    defaultBreakdown: {
      surgeryFees: 45000,
      implantProsthesis: 0,
      roomCharges: 25000,
      medicinesConsumables: 22000,
      diagnosticsPreOp: 18000
    },
    nonPayableConsumablesEst: 9500
  },
  {
    id: "kidney-stone",
    name: "Laser Lithotripsy (Kidney Stone Removal)",
    category: "Urology (Day Care)",
    standardStayDays: 1,
    baseCostTier1: 95000,
    baseCostTier2: 75000,
    sublimitKey: "Kidney Stone / Lithotripsy",
    waitingPeriodMonths: 24,
    defaultBreakdown: {
      surgeryFees: 42000,
      implantProsthesis: 10000,
      roomCharges: 9000,
      medicinesConsumables: 16000,
      diagnosticsPreOp: 18000
    },
    nonPayableConsumablesEst: 8000
  }
];

export const CITIES_AND_HOSPITALS = [
  {
    city: "Pune",
    tier: "Tier 1",
    hospitals: [
      { name: "Ruby Hall Clinic, Sassoon Road", isNetwork: true, avgRoomRate: 5500, rating: 4.6 },
      { name: "Sahyadri Super Speciality Hospital, Deccan", isNetwork: true, avgRoomRate: 5000, rating: 4.5 },
      { name: "Manipal Hospital, Kharadi", isNetwork: true, avgRoomRate: 6500, rating: 4.7 },
      { name: "Jehangir Hospital, Bund Garden", isNetwork: true, avgRoomRate: 5200, rating: 4.4 },
      { name: "City Care Nursing Home (Non-Network)", isNetwork: false, avgRoomRate: 4000, rating: 3.9 }
    ]
  },
  {
    city: "Mumbai",
    tier: "Tier 1",
    hospitals: [
      { name: "Kokilaben Dhirubhai Ambani Hospital, Andheri", isNetwork: true, avgRoomRate: 8500, rating: 4.8 },
      { name: "Lilavati Hospital & Research Centre, Bandra", isNetwork: true, avgRoomRate: 8000, rating: 4.6 },
      { name: "Nanavati Max Super Speciality, Vile Parle", isNetwork: true, avgRoomRate: 7500, rating: 4.7 },
      { name: "H.N. Reliance Foundation Hospital, Girgaon", isNetwork: true, avgRoomRate: 9000, rating: 4.9 },
      { name: "Bandra West Polyclinic (Non-Network)", isNetwork: false, avgRoomRate: 4500, rating: 3.8 }
    ]
  },
  {
    city: "Bengaluru",
    tier: "Tier 1",
    hospitals: [
      { name: "Manipal Hospital, Old Airport Road", isNetwork: true, avgRoomRate: 7000, rating: 4.7 },
      { name: "Apollo Hospitals, Bannerghatta Road", isNetwork: true, avgRoomRate: 6800, rating: 4.6 },
      { name: "Fortis Hospital, Cunningham Road", isNetwork: true, avgRoomRate: 6500, rating: 4.6 },
      { name: "Indiranagar Surgical Care (Non-Network)", isNetwork: false, avgRoomRate: 4200, rating: 3.9 }
    ]
  },
  {
    city: "Delhi NCR",
    tier: "Tier 1",
    hospitals: [
      { name: "Max Super Speciality Hospital, Saket", isNetwork: true, avgRoomRate: 8500, rating: 4.8 },
      { name: "Medanta - The Medicity, Gurugram", isNetwork: true, avgRoomRate: 8200, rating: 4.8 },
      { name: "Fortis Memorial Research Institute, Gurugram", isNetwork: true, avgRoomRate: 7800, rating: 4.7 },
      { name: "South Delhi Community Hospital (Non-Network)", isNetwork: false, avgRoomRate: 4800, rating: 3.9 }
    ]
  },
  {
    city: "Hyderabad",
    tier: "Tier 2",
    hospitals: [
      { name: "Apollo Health City, Jubilee Hills", isNetwork: true, avgRoomRate: 6000, rating: 4.7 },
      { name: "Yashoda Hospitals, Somajiguda", isNetwork: true, avgRoomRate: 5500, rating: 4.6 },
      { name: "KIMS Hospitals, Secunderabad", isNetwork: true, avgRoomRate: 5200, rating: 4.5 },
      { name: "Begumpet Healthcare Centre (Non-Network)", isNetwork: false, avgRoomRate: 3800, rating: 3.7 }
    ]
  }
];

/**
 * Core Health Insurance Cost Estimation Engine
 * Applies realistic mediclaim rules:
 * - Room Rent Cap & Proportionate Deduction
 * - Specific Procedure Sub-limits
 * - Network vs Non-Network Co-Payment
 * - Senior Citizen Co-Payment
 * - IRDAI Non-Payable Consumables (gloves, sanitizer, registration, non-medical items)
 * - Available Sum Insured exhaustion limit
 */
export function calculateTreatmentEstimate({
  procedureId,
  hospitalName,
  cityName,
  patientAge,
  hasPreExisting,
  roomCategory = "Single Private A/C",
  isNetworkOverride = null,
  policy
}) {
  const procedure = POPULAR_PROCEDURES.find(p => p.id === procedureId) || POPULAR_PROCEDURES[0];
  
  // Find hospital details
  const cityData = CITIES_AND_HOSPITALS.find(c => c.city.toLowerCase() === cityName.toLowerCase()) || CITIES_AND_HOSPITALS[0];
  const hospital = cityData.hospitals.find(h => h.name.toLowerCase().includes(hospitalName.toLowerCase())) || cityData.hospitals[0];
  
  const isNetwork = isNetworkOverride !== null ? isNetworkOverride : hospital.isNetwork;

  // Base costs adjusted for city tier and room type
  const isTier1 = cityData.tier === "Tier 1";
  let multiplier = isTier1 ? 1.05 : 0.95;
  
  // Adjust for room category tariff
  let dailyRoomCharge = 5000;
  if (roomCategory === "Deluxe Suite") {
    dailyRoomCharge = 10000;
    multiplier *= 1.22;
  } else if (roomCategory === "Single Private A/C") {
    dailyRoomCharge = 6500;
    multiplier *= 1.05;
  } else if (roomCategory === "Twin Sharing A/C") {
    dailyRoomCharge = 4000;
    multiplier *= 0.92;
  } else if (roomCategory === "General Ward") {
    dailyRoomCharge = 2500;
    multiplier *= 0.80;
  }

  // Calculate itemized breakdown
  const surgeryFees = Math.round(procedure.defaultBreakdown.surgeryFees * multiplier);
  const implantProsthesis = Math.round(procedure.defaultBreakdown.implantProsthesis);
  const roomCharges = Math.round(dailyRoomCharge * procedure.standardStayDays);
  const medicinesConsumables = Math.round(procedure.defaultBreakdown.medicinesConsumables * multiplier);
  const diagnosticsPreOp = Math.round(procedure.defaultBreakdown.diagnosticsPreOp * multiplier);
  
  const totalEstimatedCost = surgeryFees + implantProsthesis + roomCharges + medicinesConsumables + diagnosticsPreOp;
  const nonPayables = Math.round(procedure.nonPayableConsumablesEst * (multiplier > 1 ? 1.15 : 0.95));

  // Policy rules application
  const policyRoomCap = policy.limitsAndSublimits.roomRent.dailyLimit; // e.g. ₹5,000
  let proportionateCutAmount = 0;
  let proportionateCutPercentage = 0;

  if (policy.limitsAndSublimits.roomRent.proportionateDeductionApplies && dailyRoomCharge > policyRoomCap) {
    // Proportionate ratio: eligible / actual
    const ratio = policyRoomCap / dailyRoomCharge;
    proportionateCutPercentage = Math.round((1 - ratio) * 100);
    // Associated medical charges (surgery, doctor fees, nursing) get proportionately reduced
    const associatedCharges = surgeryFees + diagnosticsPreOp;
    proportionateCutAmount = Math.round(associatedCharges * (1 - ratio));
  }

  // Room excess direct payment
  const roomExcessDaily = Math.max(0, dailyRoomCharge - policyRoomCap);
  const roomExcessTotal = roomExcessDaily * procedure.standardStayDays;

  // Procedure sub-limit check
  let applicableSublimit = null;
  let sublimitDeduction = 0;
  if (procedure.sublimitKey) {
    const matched = policy.limitsAndSublimits.specificProcedures.find(s => s.name.toLowerCase().includes(procedure.sublimitKey.toLowerCase()) || procedure.sublimitKey.toLowerCase().includes(s.name.toLowerCase()));
    if (matched) {
      applicableSublimit = matched.sublimit;
    }
  }

  // Check waiting period applicability
  let waitingPeriodWarning = null;
  let waitingPeriodPassed = true;
  
  if (procedure.id === "knee-replacement") {
    const wp = policy.waitingPeriods.find(w => w.id === "WP-02");
    if (wp && wp.monthsRemaining > 0) {
      waitingPeriodPassed = false;
      waitingPeriodWarning = `24-month specific illness waiting period is in effect (${wp.monthsRemaining} months remaining). Non-emergency elective claim will be rejected or require special waiver.`;
    }
  }

  if (hasPreExisting) {
    const pedWp = policy.waitingPeriods.find(w => w.id === "WP-03");
    if (pedWp && pedWp.monthsRemaining > 0) {
      waitingPeriodWarning = `Pre-existing conditions have ${pedWp.monthsRemaining} months of waiting period remaining. If this treatment is linked to a declared condition, coverage may be disputed.`;
    }
  }

  // Co-payment calculation
  let copayPercentage = 0;
  if (!isNetwork) {
    copayPercentage += policy.financials.nonNetworkCopayPercentage; // 10%
  }
  if (parseInt(patientAge, 10) >= 61) {
    copayPercentage = Math.max(copayPercentage, policy.financials.seniorCitizenCopayPercentage); // 20%
  }

  // Calculate Potentially Covered Amount
  // 1. Start from Total Medical Cost excluding non-payables
  let claimableBase = totalEstimatedCost - nonPayables - roomExcessTotal - proportionateCutAmount;

  // 2. Cap at sub-limit if applicable
  if (applicableSublimit && claimableBase > applicableSublimit) {
    sublimitDeduction = claimableBase - applicableSublimit;
    claimableBase = applicableSublimit;
  }

  // 3. Apply co-payment
  const copayAmount = Math.round(claimableBase * (copayPercentage / 100));
  let approvedBeforeSI = claimableBase - copayAmount;

  // 4. Cap at Available Sum Insured
  const availableSI = policy.financials.availableSumInsured;
  let sumInsuredShortfall = 0;
  let potentiallyCovered = approvedBeforeSI;

  if (approvedBeforeSI > availableSI) {
    sumInsuredShortfall = approvedBeforeSI - availableSI;
    potentiallyCovered = availableSI;
  }

  // Out of pocket = Total Cost - Potentially Covered
  const estimatedOutOfPocket = Math.max(0, totalEstimatedCost - potentiallyCovered);

  // Confidence & Missing Info
  let confidenceScore = 88;
  const missingInfoList = [];

  if (roomCategory === "Deluxe Suite" || dailyRoomCharge > policyRoomCap) {
    confidenceScore -= 4;
    missingInfoList.push("Exact hospital billing itemization for room rent vs nursing vs resident medical officer (RMO) fees.");
  }
  if (!isNetwork) {
    confidenceScore -= 5;
    missingInfoList.push("Pre-approval confirmation from TPA desk for non-network hospital reimbursement tariffs.");
  }
  if (!hasPreExisting) {
    missingInfoList.push("Doctor's clinical certificate confirming procedure is not secondary to any undeclared historical condition.");
  } else {
    confidenceScore -= 6;
    missingInfoList.push("Detailed discharge summary and past medical history to verify whether PED exclusion applies.");
  }
  missingInfoList.push("Quotation and batch invoice of surgical implants/prosthesis from hospital store.");

  confidenceScore = Math.max(65, Math.min(96, confidenceScore));

  return {
    isSynthetic: true,
    procedure,
    hospital: {
      name: hospital.name,
      city: cityData.city,
      tier: cityData.tier,
      isNetwork,
      roomRate: dailyRoomCharge
    },
    patient: {
      age: patientAge,
      hasPreExisting,
      roomCategory
    },
    costBreakdown: {
      totalEstimatedCost,
      surgeryFees,
      implantProsthesis,
      roomCharges,
      medicinesConsumables,
      diagnosticsPreOp,
      nonPayables
    },
    coverageSummary: {
      totalCost: totalEstimatedCost,
      potentiallyCovered,
      estimatedOutOfPocket,
      coveragePercentage: Math.round((potentiallyCovered / totalEstimatedCost) * 100),
      outOfPocketPercentage: Math.round((estimatedOutOfPocket / totalEstimatedCost) * 100)
    },
    deductionFactors: {
      nonPayableConsumables: nonPayables,
      roomRentExcess: roomExcessTotal,
      proportionateDeduction: proportionateCutAmount,
      proportionateCutPercentage,
      sublimitDeduction,
      applicableSublimit,
      copayPercentage,
      copayAmount,
      sumInsuredShortfall,
      availableSumInsured: availableSI
    },
    waitingPeriodStatus: {
      waitingPeriodPassed,
      warning: waitingPeriodWarning
    },
    confidence: {
      score: confidenceScore,
      rating: confidenceScore >= 90 ? "High Confidence" : confidenceScore >= 80 ? "Medium-High Confidence" : "Moderate Confidence",
      missingInfo: missingInfoList
    },
    chartData: [
      { name: "Potentially Covered", amount: potentiallyCovered, fill: "#10B981" },
      { name: "Est. Out-of-Pocket", amount: estimatedOutOfPocket, fill: "#F59E0B" }
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
