import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  ArrowRight, 
  Layers, 
  FileText, 
  ShieldAlert, 
  Award, 
  Clock, 
  AlertTriangle, 
  BookmarkCheck, 
  CheckCircle2, 
  Send,
  Building2,
  ChevronRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANKING_SERVICES } from '../data/bankingData';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    navigateTo, 
    userActivities, 
    draftForms, 
    savedServiceIds,
    setSelectedServiceId,
    setSelectedFormId,
    language 
  } = useApp();

  const [quickInput, setQuickInput] = useState('');

  const suggestedPrompts = [
    { text: 'I want to open a bank account.', query: 'How can I open a savings account?' },
    { text: 'How do I update my address?', query: 'How do I update my address in bank records?' },
    { text: 'I need to request a cheque book.', query: 'How do I request a new cheque book?' },
    { text: 'How can I get my bank statement?', query: 'How can I download a bank statement?' },
    { text: 'How do I apply for a loan?', query: 'How do I apply for a personal loan?' },
  ];

  const handleAsk = (queryText: string) => {
    if (!queryText.trim()) return;
    navigateTo('assistant', { assistantQuery: queryText.trim() });
  };

  const savedServicesList = BANKING_SERVICES.filter((s) => savedServiceIds.includes(s.id));
  const popularServices = BANKING_SERVICES.filter((s) => s.popular).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME BANNER & ASSISTANT HERO INPUT */}
      <div className="rounded-3xl bg-gradient-to-r from-[#F3EEFF] via-white to-[#F8F7FC] border border-[#DCD0FA] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#DCD0FA] text-[11px] font-bold text-[#7755C9]">
              <Sparkles className="w-3.5 h-3.5" />
              Banking Assistance Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#272238] tracking-tight">
              Hello, {currentUser?.name || 'Friend'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#777084]">
              What banking procedure or question can we help you understand today?
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-[#E5E0EF] text-[#4B347F] shadow-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7755C9]" />
              Safe Demo Session
            </span>
          </div>
        </div>

        {/* Central Assistant Search / Voice Input Area */}
        <div className="space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(quickInput);
            }}
            className="bg-white rounded-2xl border-2 border-[#DCD0FA] focus-within:border-[#7755C9] shadow-md p-2 flex items-center gap-2 transition-all"
          >
            <div className="pl-3 text-[#7755C9]">
              <Sparkles className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Ask anything (e.g., 'How to close my account?' or 'What documents for KYC?')..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              className="flex-1 py-2 text-xs sm:text-sm bg-transparent text-[#272238] focus:outline-none placeholder-[#777084]"
            />
            
            {/* Direct Microphone Shortcut */}
            <button
              type="button"
              onClick={() => navigateTo('assistant', { assistantQuery: '' })}
              className="p-2.5 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#7755C9] transition-colors"
              title="Speak with Voice"
              aria-label="Speak with Voice"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Suggested Prompts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[#777084] font-medium shrink-0">Try asking:</span>
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(p.query)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F3EEFF] text-[#272238] font-medium shrink-0 transition-colors shadow-2xs"
              >
                {p.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. CORE SHORTCUTS GRID (Services, Forms, Voice, Schemes, Fraud) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Shortcut 1: Banking Services */}
        <button
          onClick={() => navigateTo('services')}
          className="p-4 rounded-2xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F8F7FC] text-left space-y-2 group transition-all shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center group-hover:bg-[#7755C9] group-hover:text-white transition-colors">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#272238]">All Services</h3>
            <p className="text-[11px] text-[#777084]">25+ bank procedures</p>
          </div>
        </button>

        {/* Shortcut 2: Forms & Applications */}
        <button
          onClick={() => navigateTo('forms')}
          className="p-4 rounded-2xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F8F7FC] text-left space-y-2 group transition-all shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center group-hover:bg-[#7755C9] group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#272238]">Forms Centre</h3>
            <p className="text-[11px] text-[#777084]">Guided 5-step preparation</p>
          </div>
        </button>

        {/* Shortcut 3: Voice & Language */}
        <button
          onClick={() => navigateTo('voice')}
          className="p-4 rounded-2xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F8F7FC] text-left space-y-2 group transition-all shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center group-hover:bg-[#7755C9] group-hover:text-white transition-colors">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#272238]">Voice Hub</h3>
            <p className="text-[11px] text-[#777084]">English, हिन्दी, मराठी</p>
          </div>
        </button>

        {/* Shortcut 4: Fraud Awareness */}
        <button
          onClick={() => navigateTo('fraud')}
          className="p-4 rounded-2xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F8F7FC] text-left space-y-2 group transition-all shadow-2xs"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center group-hover:bg-[#7755C9] group-hover:text-white transition-colors">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#272238]">Fraud Safety</h3>
            <p className="text-[11px] text-[#777084]">Scam traps & Helpline 1930</p>
          </div>
        </button>

        {/* Shortcut 5: Govt Schemes */}
        <button
          onClick={() => navigateTo('schemes')}
          className="p-4 rounded-2xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F8F7FC] text-left space-y-2 group transition-all shadow-2xs col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center group-hover:bg-[#7755C9] group-hover:text-white transition-colors">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#272238]">Govt Schemes</h3>
            <p className="text-[11px] text-[#777084]">Jan Dhan, APY, PMJJBY</p>
          </div>
        </button>
      </div>

      {/* 3. DUAL COLUMN: POPULAR SERVICES & DRAFTS / ACTIVITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Popular Banking Services */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#272238]">Popular Banking Assistance</h2>
              <p className="text-xs text-[#777084]">Most requested procedures by everyday users</p>
            </div>
            <button
              onClick={() => navigateTo('services')}
              className="text-xs font-bold text-[#7755C9] hover:underline flex items-center gap-1"
            >
              <span>View All 25+</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularServices.map((service) => (
              <div
                key={service.id}
                className="p-4 rounded-2xl bg-white border border-[#E5E0EF] hover:border-[#DCD0FA] space-y-3 transition-all flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9]">
                      {service.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-[#777084] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {service.typicalTimeframe.split(';')[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#272238]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#777084] line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#E5E0EF]">
                  <button
                    onClick={() => setSelectedServiceId(service.id)}
                    className="text-xs font-semibold text-[#7755C9] hover:underline flex items-center gap-1"
                  >
                    <span>View Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  {service.associatedFormId && (
                    <button
                      onClick={() => setSelectedFormId(service.associatedFormId!)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F3EEFF] text-[#4B347F] font-semibold hover:bg-[#DCD0FA] transition-colors"
                    >
                      Start Form
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Saved Services Section if any */}
          {savedServicesList.length > 0 && (
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#272238] flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-[#7755C9]" />
                  Your Bookmarked Services ({savedServicesList.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {savedServicesList.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedServiceId(item.id)}
                    className="p-3 rounded-xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] text-left space-y-1 transition-all"
                  >
                    <span className="text-xs font-bold text-[#272238] block truncate">{item.title}</span>
                    <span className="text-[10px] text-[#777084] block">{item.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Active Drafts, Recent Activities & Safety Advice */}
        <div className="space-y-6">
          {/* Active Drafts Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#272238] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#7755C9]" />
                Your Form Drafts
              </h3>
              <button
                onClick={() => navigateTo('forms')}
                className="text-[11px] font-bold text-[#7755C9] hover:underline"
              >
                All Forms
              </button>
            </div>

            {draftForms.length === 0 ? (
              <p className="text-xs text-[#777084] py-2">No active drafts. You can prepare an application anytime.</p>
            ) : (
              <div className="space-y-2.5">
                {draftForms.slice(0, 2).map((draft) => (
                  <div
                    key={draft.formId}
                    onClick={() => setSelectedFormId(draft.formId)}
                    className="p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] hover:border-[#7755C9] cursor-pointer space-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#272238] truncate max-w-[180px]">
                        {draft.formTitle}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        draft.status === 'Prepared' ? 'bg-green-100 text-green-800' : 'bg-[#F3EEFF] text-[#7755C9]'
                      }`}>
                        {draft.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777084]">Updated: {draft.lastUpdated}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activities Feed */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#272238]">Recent Activity</h3>
              <button
                onClick={() => navigateTo('activities')}
                className="text-[11px] font-bold text-[#7755C9] hover:underline"
              >
                View Log
              </button>
            </div>

            <div className="space-y-3">
              {userActivities.slice(0, 3).map((act) => (
                <div key={act.id} className="text-xs space-y-0.5 border-b border-[#E5E0EF] pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#272238]">{act.title}</span>
                    <span className="text-[10px] text-[#777084]">{act.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#777084]">{act.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Safety Rule of the Day */}
          <div className="p-4 rounded-2xl bg-[#F3EEFF] border border-[#DCD0FA] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#4B347F] uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-[#7755C9]" />
              Safe Banking Tip
            </div>
            <p className="text-xs text-[#272238] leading-relaxed">
              <strong>The Golden Rule:</strong> Entering your 4 or 6-digit UPI PIN ALWAYS debits money. You never need to enter your PIN to receive payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
