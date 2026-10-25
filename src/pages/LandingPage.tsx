import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Mic, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  HelpCircle, 
  Volume2, 
  Lock, 
  ChevronRight,
  UserCheck,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#4B347F] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#7755C9]" />
            <span>Inclusive Banking Guidance for Everyday Users</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#272238] tracking-tight leading-[1.15]">
            Banking, <span className="text-[#7755C9]">Made Easier.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-[#777084] max-w-2xl mx-auto leading-relaxed">
            Understand complex banking procedures, complete branch forms with plain-English guidance, and resolve everyday queries in English, Hindi, and Marathi with voice support.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('signup')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#7755C9]/25 hover:shadow-xl hover:shadow-[#7755C9]/30 transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EEFF] text-[#4B347F] border border-[#DCD0FA] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Layers className="w-4 h-4 text-[#7755C9]" />
              <span>Explore 25+ Services</span>
            </button>
          </div>

          {/* Reassurance pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#777084]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7755C9]" /> No bank login needed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7755C9]" /> Zero balance display
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7755C9]" /> Real browser voice input
            </span>
          </div>
        </div>

        {/* 2. PREMIUM VISUAL PREVIEW OF THE ASSISTANT INTERFACE */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-white border border-[#E5E0EF] shadow-xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E0EF]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs font-semibold text-[#777084] ml-2">BankEase Intelligent Assistant</span>
            </div>
            <span className="text-[11px] bg-[#F3EEFF] text-[#7755C9] font-semibold px-2 py-0.5 rounded-full border border-[#DCD0FA]">
              Interactive Preview
            </span>
          </div>

          {/* Mock Conversation Showcase */}
          <div className="space-y-3 py-2">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#7755C9] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-sm max-w-md shadow-xs">
                "How do I add a nominee to my bank account?"
              </div>
            </div>

            {/* Assistant response */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-[#F8F7FC] border border-[#E5E0EF] text-[#272238] p-4 rounded-2xl rounded-tl-xs text-xs sm:text-sm max-w-xl space-y-2.5">
                <p className="font-semibold text-[#4B347F]">
                  You can register a nominee in 2 simple ways:
                </p>
                <ul className="space-y-1.5 text-xs text-[#272238]">
                  <li>• <strong>Online (1 minute):</strong> Log into your bank mobile app &gt; Services &gt; Manage Nominee &gt; enter Aadhaar details &gt; verify OTP.</li>
                  <li>• <strong>Branch (Form DA1):</strong> Fill out the single-page Nomination Form with nominee relationship and DOB.</li>
                </ul>
                <div className="pt-2 flex flex-wrap gap-2">
                  <button 
                    onClick={() => navigateTo('forms', { formId: 'form-nominee-update' })}
                    className="text-[11px] px-2.5 py-1 bg-white text-[#7755C9] border border-[#DCD0FA] rounded-lg font-semibold hover:bg-[#F3EEFF] transition-colors"
                  >
                    Open Guided Form DA1 →
                  </button>
                  <button 
                    onClick={() => navigateTo('assistant', { assistantQuery: 'How to add nominee' })}
                    className="text-[11px] px-2.5 py-1 bg-[#F3EEFF] text-[#4B347F] rounded-lg font-semibold hover:bg-[#DCD0FA]/50 transition-colors"
                  >
                    Ask Follow-up →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Assistant Input Bar Preview */}
          <div 
            onClick={() => navigateTo('assistant')}
            className="cursor-pointer bg-[#F8F7FC] hover:bg-[#F3EEFF]/40 border border-[#E5E0EF] rounded-xl p-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-[#777084] transition-all"
          >
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-4 h-4 text-[#7755C9]" />
              <span className="truncate">Ask anything: "What documents do I need to open a bank account?"</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E0EF] flex items-center justify-center text-[#7755C9]">
                <Mic className="w-4 h-4" />
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#7755C9] text-white font-semibold text-xs flex items-center gap-1">
                <span>Try Live</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAJOR BENEFITS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#7755C9]">Why BankEase</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#272238]">
            Built for Everyone Who Finds Banking Overwhelming
          </h3>
          <p className="text-sm text-[#777084]">
            No confusing financial jargon, no hidden balance traps, and no frustration standing in wrong branch lines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 hover:border-[#DCD0FA] transition-all">
            <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#272238]">Plain-English Explanations</h4>
            <p className="text-xs sm:text-sm text-[#777084] leading-relaxed">
              Every complex banking term—from IFSC and BSBDA to KYC and Lien—is demystified with clear, everyday analogies.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 hover:border-[#DCD0FA] transition-all">
            <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#272238]">Voice in Your Language</h4>
            <p className="text-xs sm:text-sm text-[#777084] leading-relaxed">
              Speak naturally using real browser speech recognition in English, Hindi, and Marathi, with spoken answers read aloud.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 hover:border-[#DCD0FA] transition-all">
            <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#272238]">Guided Form Workflows</h4>
            <p className="text-xs sm:text-sm text-[#777084] leading-relaxed">
              Step-by-step document checklists, "Explain This Field" tooltips, and printable slips ready for counter submission.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 hover:border-[#DCD0FA] transition-all">
            <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#272238]">Fraud & Scam Armor</h4>
            <p className="text-xs sm:text-sm text-[#777084] leading-relaxed">
              Learn the QR code receiving trap, fake customer care hazards, and how to invoke RBI's 3-day Zero Liability protection.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW BANKEASE WORKS IN 4 SIMPLE STEPS */}
      <section className="bg-[#F8F7FC] py-16 border-y border-[#E5E0EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#7755C9]">Simple 4-Step Process</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#272238]">
              How BankEase Guides You from Question to Solution
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E5E0EF] relative space-y-2">
              <span className="text-3xl font-extrabold text-[#DCD0FA]">01</span>
              <h4 className="text-sm font-bold text-[#272238]">Type or Speak Your Query</h4>
              <p className="text-xs text-[#777084]">
                Ask in plain words like "My card is lost" or "I want to change my phone number."
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0EF] relative space-y-2">
              <span className="text-3xl font-extrabold text-[#DCD0FA]">02</span>
              <h4 className="text-sm font-bold text-[#272238]">Get Practical Steps</h4>
              <p className="text-xs text-[#777084]">
                Receive instant online procedures and exact physical documents needed for branch visits.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0EF] relative space-y-2">
              <span className="text-3xl font-extrabold text-[#DCD0FA]">03</span>
              <h4 className="text-sm font-bold text-[#272238]">Fill Guided Form Slip</h4>
              <p className="text-xs text-[#777084]">
                Enter details with plain-English help. Verify requirements before going to the bank.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E5E0EF] relative space-y-2">
              <span className="text-3xl font-extrabold text-[#DCD0FA]">04</span>
              <h4 className="text-sm font-bold text-[#272238]">Complete Confidently</h4>
              <p className="text-xs text-[#777084]">
                Carry your prepared checklist and slip to your bank branch or execute in your bank app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEDICATED FEATURE HIGHLIGHTS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Highlight 1: Voice & Language */}
        <div className="bg-white rounded-3xl border border-[#E5E0EF] p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7755C9] bg-[#F3EEFF] px-2.5 py-1 rounded-md border border-[#DCD0FA]">
              Accessibility First
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#272238]">
              Speak Instead of Typing. In English, हिन्दी, or मराठी.
            </h3>
            <p className="text-sm text-[#777084] leading-relaxed">
              Designed specifically for senior citizens and individuals who find typing tedious. Click the microphone, speak naturally, verify your words on screen, and listen to the assistant's clear spoken answers.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('voice')}
                className="px-5 py-2.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Mic className="w-4 h-4" />
                <span>Try Voice Assistance Hub</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:max-w-md p-5 rounded-2xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#777084]">
              <span className="font-semibold text-[#272238]">Live Voice Recognition Demo</span>
              <span className="text-[#7755C9] font-bold">Web Speech API</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#DCD0FA] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-[#272238]">
                <Volume2 className="w-4 h-4 text-[#7755C9]" />
                <span>"खाता बंद करने के लिए क्या चाहिए?"</span>
              </div>
              <span className="text-[10px] bg-[#F3EEFF] text-[#7755C9] px-2 py-0.5 rounded font-bold">
                Hindi (hi-IN)
              </span>
            </div>
            <div className="p-3 text-[11px] text-[#777084] bg-[#F3EEFF]/50 rounded-xl">
              ✓ Fully functional browser speech-to-text and text-to-speech engine with speech rate adjustments.
            </div>
          </div>
        </div>

        {/* Highlight 2: Fraud Protection Awareness */}
        <div className="bg-[#4B347F] rounded-3xl p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DCD0FA] bg-white/10 px-2.5 py-1 rounded-md">
              Fraud Awareness & Protection
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Know Your Rights: RBI Zero Liability Framework
            </h3>
            <p className="text-sm text-[#DCD0FA] leading-relaxed">
              If an unauthorized debit occurs, reporting it to your bank within 3 working days ensures zero customer financial loss under RBI regulations. BankEase educates you on real scam patterns before you fall victim.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('fraud')}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F3EEFF] text-[#4B347F] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#7755C9]" />
                <span>Explore Fraud Guide</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#DCD0FA]">Key Safety Truths</h4>
            <ul className="space-y-2 text-xs text-white">
              <li className="flex items-start gap-2">
                <span className="text-amber-300 font-bold">!</span>
                <span>You NEVER scan QR codes or enter UPI PINs to receive payments.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-300 font-bold">!</span>
                <span>Bank staff NEVER ask for OTPs, ATM PINs, or password entries.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-300 font-bold">!</span>
                <span>Never download AnyDesk or TeamViewer on phone caller requests.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-b from-[#F3EEFF] to-white border border-[#DCD0FA] p-8 sm:p-12 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#7755C9] text-white flex items-center justify-center mx-auto shadow-md shadow-[#7755C9]/20">
            <Building2 className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#272238]">
              Ready to Simplify Your Banking Experience?
            </h3>
            <p className="text-sm text-[#777084]">
              Join thousands of everyday users, senior citizens, and students navigating banking with total confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('signup')}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white font-semibold text-sm shadow-md shadow-[#7755C9]/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started with Demo Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('services')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-[#DCD0FA] hover:bg-[#F8F7FC] text-[#4B347F] font-semibold text-sm transition-colors"
            >
              Browse All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
