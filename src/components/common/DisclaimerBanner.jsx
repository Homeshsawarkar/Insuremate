import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-50 border-y border-amber-200/80 px-4 py-1.5 flex items-center justify-between text-xs text-amber-800">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>
            <strong className="font-semibold">Synthetic Demo Data:</strong> All figures and policy terms are illustrative for demonstration purposes. Not an underwriting commitment or coverage guarantee.
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-medium bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
          Hackathon MVP
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-3.5 rounded-r-lg shadow-sm mb-5 text-sm text-amber-900 flex items-start space-x-3">
      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-amber-950 flex items-center gap-1.5">
            <span>Synthetic Demonstration Data & Illustrative Estimates</span>
            <span className="text-[10px] uppercase tracking-wider bg-amber-200/70 text-amber-900 px-1.5 py-0.5 rounded font-bold">
              Non-Binding
            </span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-amber-800 leading-relaxed">
          InsureMate parses complex mediclaim clauses to assist policyholder comprehension. All calculated cost shares, sub-limits, and payable ratios are <em>indicative estimates</em> subject to final insurer underwriting, hospital billing codes, and IRDAI non-payable schedules.
        </p>
      </div>
    </div>
  );
};
