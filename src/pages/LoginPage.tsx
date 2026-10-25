import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const { navigateTo, loginAsDemoUser, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    // Success in demo mode
    loginAsDemoUser({
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
      email: email,
    });
  };

  const handleQuickDemoLogin = (profile: { name: string; email: string; language: 'en' | 'hi' | 'mr'; speed: number }) => {
    loginAsDemoUser({
      name: profile.name,
      email: profile.email,
      language: profile.language,
      voiceSpeed: profile.speed
    });
  };

  const handleForgotPassword = () => {
    showToast('Demo Mode: In production, a secure password reset link would be emailed. For demo, use any password.');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
      {/* Left Column: Visual branding and value prop */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7755C9] text-white flex items-center justify-center shadow-md shadow-[#7755C9]/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
            Welcome Back to <span className="text-[#7755C9]">BankEase</span>
          </h1>
          <p className="text-sm text-[#777084] leading-relaxed">
            Your personal, accessible companion for navigating everyday banking procedures, forms, voice assistance, and fraud protection.
          </p>
        </div>

        {/* Demo Quick Logins */}
        <div className="p-4 rounded-2xl bg-white border border-[#E5E0EF] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7755C9]">
            <Sparkles className="w-3.5 h-3.5" />
            Quick 1-Click Demo Profiles
          </div>
          <p className="text-xs text-[#777084]">
            Select a sample persona to immediately explore personalized features:
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin({ name: 'Suhani Jogi', email: 'suhanijogi15@gmail.com', language: 'en', speed: 1.0 })}
              className="w-full p-2.5 rounded-xl border border-[#DCD0FA] bg-[#F8F7FC] hover:bg-[#F3EEFF] text-left text-xs flex items-center justify-between transition-colors"
            >
              <div>
                <span className="font-semibold text-[#272238]">Suhani Jogi</span>
                <span className="text-[#777084] text-[11px] block">Standard User (English, 1.0x Voice)</span>
              </div>
              <UserCheck className="w-4 h-4 text-[#7755C9]" />
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin({ name: 'Priya Sharma', email: 'priya.sharma@demo.in', language: 'hi', speed: 0.8 })}
              className="w-full p-2.5 rounded-xl border border-[#DCD0FA] bg-[#F8F7FC] hover:bg-[#F3EEFF] text-left text-xs flex items-center justify-between transition-colors"
            >
              <div>
                <span className="font-semibold text-[#272238]">Priya Sharma (Senior Citizen)</span>
                <span className="text-[#777084] text-[11px] block">Pre-set in हिन्दी with slower 0.8x speech</span>
              </div>
              <UserCheck className="w-4 h-4 text-[#7755C9]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#4B347F] bg-[#F3EEFF] p-3 rounded-xl border border-[#DCD0FA]">
          <ShieldCheck className="w-4 h-4 text-[#7755C9] shrink-0" />
          <span>
            BankEase accounts are completely separate from your real bank account login.
          </span>
        </div>
      </div>

      {/* Right Column: Login Card */}
      <div className="w-full md:w-1/2 max-w-md bg-white border border-[#E5E0EF] rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-900/5">
        <h2 className="text-xl font-bold text-[#272238] mb-1">Sign In</h2>
        <p className="text-xs text-[#777084] mb-6">Enter your email and password to access BankEase.</p>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
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
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#272238]">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] font-semibold text-[#7755C9] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777084] absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-[#777084] hover:text-[#272238]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center justify-between text-xs text-[#777084]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#7755C9] focus:ring-[#7755C9]"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#7755C9]/20 transition-all mt-2"
          >
            <span>Log In to BankEase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E5E0EF] text-center text-xs text-[#777084]">
          Don't have an account yet?{' '}
          <button
            onClick={() => navigateTo('signup')}
            className="font-bold text-[#7755C9] hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};
