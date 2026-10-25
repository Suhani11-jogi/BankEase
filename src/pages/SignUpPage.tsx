import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SignUpPage: React.FC = () => {
  const { navigateTo, loginAsDemoUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please acknowledge the terms & privacy policy to continue.');
      return;
    }

    // Success in demo registration
    loginAsDemoUser({
      name: fullName.trim(),
      email: email.trim(),
    });
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Left Column: Context & Safety */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7755C9] text-white flex items-center justify-center shadow-md shadow-[#7755C9]/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
            Create Your Free <span className="text-[#7755C9]">BankEase</span> Account
          </h1>
          <p className="text-sm text-[#777084] leading-relaxed">
            Gain access to voice assistance in three languages, personalized form checklists, saved services, and emergency fraud reporting steps.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E5E0EF]">
            <CheckCircle2 className="w-5 h-5 text-[#7755C9] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-semibold text-[#272238] block">Completely Independent</strong>
              <span className="text-[#777084]">You never link your actual bank account or disclose financial balances.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E5E0EF]">
            <CheckCircle2 className="w-5 h-5 text-[#7755C9] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-semibold text-[#272238] block">Interactive Guided Forms</strong>
              <span className="text-[#777084]">Prepare paperwork from home with clear plain-English instructions.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E5E0EF]">
            <CheckCircle2 className="w-5 h-5 text-[#7755C9] shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-semibold text-[#272238] block">Voice in English, Hindi & Marathi</strong>
              <span className="text-[#777084]">Speak naturally and listen to answers read aloud anytime.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sign Up Form Card */}
      <div className="w-full md:w-1/2 max-w-md bg-white border border-[#E5E0EF] rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-900/5">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#272238] mb-1">Get Started</h2>
          <p className="text-xs text-[#777084]">Create a demo profile in under 30 seconds.</p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#272238]">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#777084] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="e.g. Suhani Jogi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#272238]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#777084] absolute left-3.5 top-3" />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#272238]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777084] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#777084] hover:text-[#272238]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#272238]">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777084] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                required
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2 text-xs text-[#777084] cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#7755C9] focus:ring-[#7755C9]"
              />
              <span>
                I agree to the <strong className="text-[#272238]">Terms of Service</strong> and understand that BankEase is a demo guidance platform that does not connect to live bank accounts.
              </span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#7755C9]/20 transition-all mt-3"
          >
            <span>Create Account & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-[#E5E0EF] text-center text-xs text-[#777084]">
          Already have an account?{' '}
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-[#7755C9] hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
