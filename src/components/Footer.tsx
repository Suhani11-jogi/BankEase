import React from 'react';
import { Building2, ShieldCheck, Heart, ExternalLink, PhoneCall, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-white border-t border-[#E5E0EF] pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#E5E0EF]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7755C9] flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#272238]">BankEase</span>
            </div>
            <p className="text-sm text-[#777084] max-w-sm leading-relaxed">
              Banking, Made Easier. An inclusive guidance platform empowering everyday citizens, elderly individuals, and first-time account holders with simplified procedures, voice queries, and fraud protection.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#4B347F] bg-[#F3EEFF] p-3 rounded-xl border border-[#DCD0FA]/60">
              <ShieldCheck className="w-4 h-4 text-[#7755C9] shrink-0" />
              <span>
                <strong>Zero Balance Policy:</strong> BankEase never displays account balances or collects banking credentials.
              </span>
            </div>
          </div>

          {/* Column 1: Core Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#272238] mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-[#777084]">
              <li>
                <button onClick={() => navigateTo('services')} className="hover:text-[#7755C9] transition-colors">
                  All Banking Services
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('assistant')} className="hover:text-[#7755C9] transition-colors">
                  AI Banking Assistant
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('forms')} className="hover:text-[#7755C9] transition-colors">
                  Forms & Checklists
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('voice')} className="hover:text-[#7755C9] transition-colors">
                  Voice & Language Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('schemes')} className="hover:text-[#7755C9] transition-colors">
                  Government Schemes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Safety & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#272238] mb-3">Safety & Grievance</h4>
            <ul className="space-y-2 text-sm text-[#777084]">
              <li>
                <button onClick={() => navigateTo('fraud')} className="hover:text-[#7755C9] transition-colors">
                  Fraud Awareness Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services', { serviceId: 'unauthorized-transaction-steps' })} className="hover:text-[#7755C9] transition-colors">
                  RBI 3-Day Zero Liability
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services', { serviceId: 'complaint-filing-ombudsman' })} className="hover:text-[#7755C9] transition-colors">
                  RBI Ombudsman Procedure
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('services', { serviceId: 'card-blocking-lost' })} className="hover:text-[#7755C9] transition-colors">
                  Lost Card Hotlisting
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#272238] mb-3">Official Helplines</h4>
            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F8F7FC] border border-[#E5E0EF]">
                <div className="flex items-center gap-1.5 font-semibold text-[#272238]">
                  <PhoneCall className="w-3.5 h-3.5 text-[#7755C9]" />
                  <span>Cyber Crime: 1930</span>
                </div>
                <p className="text-[#777084] text-[11px] mt-0.5">National Cybercrime Helpline</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#F8F7FC] border border-[#E5E0EF]">
                <div className="flex items-center gap-1.5 font-semibold text-[#272238]">
                  <ExternalLink className="w-3.5 h-3.5 text-[#7755C9]" />
                  <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#7755C9] underline">
                    RBI CMS Portal
                  </a>
                </div>
                <p className="text-[#777084] text-[11px] mt-0.5">Integrated Ombudsman Portal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777084]">
          <p>© {new Date().getFullYear()} BankEase. Designed for accessible, secure banking assistance.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#4B347F]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7755C9]" /> Demo Prototype
            </span>
            <span>•</span>
            <button onClick={() => navigateTo('profile')} className="hover:text-[#7755C9]">
              Accessibility & Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
