# InsureMate 🛡️
> **AI-Powered Health Insurance Policy Intelligence Assistant**

InsureMate simplifies complex Indian mediclaim and health insurance policies into plain-English answers, verified clause citations, sub-limit calculations, and out-of-pocket hospital cost estimates.

---

## 🌟 Key Features

1. **Policy Document Ingestion & Parsing**:
   - Ingests and parses complex health insurance policy schedules and certificates.
   - Extracts key parameters: Sum Insured, Room Rent Limits & Proportionate Deductions, ICU Caps, Co-payment %, Waiting Periods (Initial, Specific Illness, PED, Maternity), and Day Care inclusions.

2. **AI Policy Intelligence & Clause Cross-Referencing**:
   - Conversational assistant with cited evidence cards (page numbers, section titles, and verbatim excerpts).
   - Instant answers on pre-existing diseases (PED), network vs non-network cashless settlement rules, and exclusions.

3. **Planned Treatment Cost Estimator**:
   - Out-of-pocket expense calculator calibrated to Indian private and network hospital tariffs (Metro Tier-1, Tier-2, Tier-3).
   - Detailed deduction breakdown:
     - Room rent excess & proportionate deductions across doctor visits, nursing, and surgery.
     - Co-payment percentage.
     - IRDAI non-payable consumables & administration charges.
     - Disease sub-limit caps and remaining sum insured depletion.

4. **Continuous 5-Step Linear Experience**:
   - Modern, frictionless guided flow: `01 Ingest` → `02 Understand` → `03 Treatment Selection` → `04 Estimate Review` → `05 Actionable Summary`.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Visualization**: Recharts
- **State Management**: React Context API (`PolicyContext`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Homeshsawarkar/insuremate.git
   cd insuremate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ⚠️ Disclaimer

*All calculations, clause extractions, and cost estimates presented by InsureMate are illustrative demonstration models based on synthetic policy data. They do not constitute a binding insurance underwriting commitment or final claim settlement decision.*
