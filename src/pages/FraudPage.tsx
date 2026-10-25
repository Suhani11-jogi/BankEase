import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  Lock, 
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FRAUD_TOPICS } from '../data/bankingData';
import { ScamQuizModal } from '../components/ScamQuizModal';

export const FraudPage: React.FC = () => {
  const { navigateTo } = useApp();

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const selectedTopic = FRAUD_TOPICS.find((t) => t.id === selectedTopicId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#7755C9]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Banking Safety & Scam Prevention Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
          Fraud Awareness & Safe Banking Armor
        </h1>
        <p className="text-sm text-[#777084] max-w-2xl mx-auto">
          Learn how to recognize common digital banking traps, protect your hard-earned money, and act immediately in the first golden hours of any unauthorized debit.
        </p>

        {/* Quiz CTA Banner */}
        <div className="pt-2">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm shadow-[#7755C9]/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take the 2-Minute Scam Awareness Quiz</span>
          </button>
        </div>
      </div>

      {/* EMERGENCY PROTOCOL BANNER (Call 1930 / RBI 3-Day Rule) */}
      <div className="rounded-3xl bg-[#4B347F] text-white p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/20 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DCD0FA]">Emergency Response Protocol</span>
            <h2 className="text-xl sm:text-2xl font-bold">Money Deducted Without Your Permission?</h2>
            <p className="text-xs sm:text-sm text-[#DCD0FA]">
              Act immediately in the golden hour to minimize financial loss and secure full refund protection.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex items-center gap-3 shrink-0">
            <PhoneCall className="w-6 h-6 text-green-300" />
            <div>
              <span className="text-[10px] text-[#DCD0FA] uppercase tracking-wider block font-bold">National Cyber Helpline</span>
              <span className="text-lg font-black text-white tracking-wide">Dial 1930 (Toll Free)</span>
            </div>
          </div>
        </div>

        {/* 4 Golden Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-white text-[#4B347F] font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-bold text-white">Block Card & App</h3>
            <p className="text-[#DCD0FA]">Immediately freeze debit card and lock net banking via bank app or SMS.</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-white text-[#4B347F] font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-bold text-white">Call 1930 Helpline</h3>
            <p className="text-[#DCD0FA]">Dial within 2 hours so cyber police can freeze recipient bank accounts.</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-white text-[#4B347F] font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="font-bold text-white">Report at cybercrime.gov.in</h3>
            <p className="text-[#DCD0FA]">Download the formal complaint acknowledgement PDF with timestamp.</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-white text-[#4B347F] font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="font-bold text-white">Notify Bank Within 3 Days</h3>
            <p className="text-[#DCD0FA]">Reporting within 3 working days guarantees ZERO customer liability under RBI rules.</p>
          </div>
        </div>
      </div>

      {/* CORE FRAUD TOPICS BREAKDOWN */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#272238]">Common Banking Scam Traps</h2>
            <p className="text-xs text-[#777084]">Click any scenario to see red flags and preventive actions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FRAUD_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-[#E5E0EF] hover:border-[#DCD0FA] p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    topic.riskLevel === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {topic.riskLevel} Risk
                  </span>
                  <span className="text-[11px] text-[#777084] capitalize">{topic.category} scam</span>
                </div>

                <h3 className="text-base font-bold text-[#272238] group-hover:text-[#7755C9] transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-[#777084] line-clamp-3 leading-relaxed">
                  {topic.modusOperandi}
                </p>

                {/* Red Flags summary */}
                <div className="p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 block">
                    Top Red Flag:
                  </span>
                  <p className="text-xs text-[#272238] font-medium truncate">
                    {topic.redFlags[0]}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E0EF] flex items-center justify-between">
                <button
                  onClick={() => setSelectedTopicId(topic.id)}
                  className="text-xs font-semibold text-[#7755C9] hover:underline flex items-center gap-1"
                >
                  <span>Read Full Safety Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => navigateTo('assistant', { assistantQuery: `Explain how to avoid ${topic.title}` })}
                  className="p-1.5 rounded-lg text-[#777084] hover:text-[#7755C9] hover:bg-[#F3EEFF] transition-colors"
                  title="Ask assistant about this"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal for Selected Fraud Topic */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0EF] p-5 sm:p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#E5E0EF] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  {selectedTopic.riskLevel} Risk Warning
                </span>
                <h3 className="text-lg font-bold text-[#272238] mt-1.5">{selectedTopic.title}</h3>
              </div>
              <button onClick={() => setSelectedTopicId(null)} className="p-1.5 text-[#777084] hover:text-[#272238]">
                ✕
              </button>
            </div>

            {/* How scammers work */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#777084]">Modus Operandi (How It Works)</h4>
              <p className="text-xs sm:text-sm text-[#272238] leading-relaxed">{selectedTopic.modusOperandi}</p>
            </div>

            {/* Red Flags */}
            <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Telltale Red Flags
              </h4>
              <ul className="space-y-1.5 text-xs text-red-950">
                {selectedTopic.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preventive Actions */}
            <div className="p-4 rounded-xl bg-[#F3EEFF] border border-[#DCD0FA] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B347F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7755C9]" />
                How to Protect Yourself
              </h4>
              <ul className="space-y-1.5 text-xs text-[#272238]">
                {selectedTopic.preventiveAction.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7755C9] font-bold">✓</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official reporting advice */}
            <div className="text-xs text-[#777084] p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF]">
              <strong className="text-[#272238]">What to do if impacted: </strong>
              {selectedTopic.officialReportingStep}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTopicId(null)}
                className="px-5 py-2 rounded-xl bg-[#7755C9] text-white text-xs sm:text-sm font-semibold hover:bg-[#4B347F] transition-colors"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Scam Quiz Modal */}
      <ScamQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
};
