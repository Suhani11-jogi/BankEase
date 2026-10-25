import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-[#F3EEFF] border-b border-[#DCD0FA] py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs md:text-sm text-[#4B347F]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#7755C9] shrink-0" />
          <span>
            <strong className="font-semibold text-[#272238]">Safe Banking Notice:</strong> BankEase is an assistance and navigation platform. We never connect to your live bank account, display account balances, or ask for PINs, OTPs, or passwords.
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#777084] shrink-0">
          <Info className="w-3.5 h-3.5 text-[#7755C9]" />
          <span>National Cyber Helpline: <strong>1930</strong></span>
        </div>
      </div>
    </div>
  );
};
