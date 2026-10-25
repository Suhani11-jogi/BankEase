import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Globe2, 
  Mic, 
  Type, 
  SunMoon, 
  Lock, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  Check, 
  Building2,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SupportedLanguage } from '../types';

export const ProfilePage: React.FC = () => {
  const { 
    currentUser, 
    loginAsDemoUser, 
    logout, 
    language, 
    setLanguage, 
    voiceSpeed, 
    setVoiceSpeed, 
    largeText, 
    setLargeText, 
    highContrast, 
    setHighContrast,
    showToast 
  } = useApp();

  const [editName, setEditName] = useState(currentUser?.name || 'Suhani Jogi');
  const [editEmail, setEditEmail] = useState(currentUser?.email || 'suhanijogi15@gmail.com');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSavedProfile, setIsSavedProfile] = useState(false);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsDemoUser({
      name: editName.trim(),
      email: editEmail.trim(),
    });
    setIsSavedProfile(true);
    showToast('Profile information updated locally!');
    setTimeout(() => setIsSavedProfile(false), 2000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }
    showToast('Demo Password updated successfully for this session!');
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E5E0EF] pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#272238] tracking-tight">
          Profile & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#777084]">
          Manage your personal preferences, voice playback settings, and accessibility options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: User Summary Card */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0EF] text-center space-y-3 shadow-2xs">
            <div className="w-16 h-16 rounded-2xl bg-[#7755C9] text-white flex items-center justify-center text-xl font-bold mx-auto shadow-sm shadow-[#7755C9]/25">
              {currentUser?.avatarSeed || 'SJ'}
            </div>
            <div>
              <h2 className="text-base font-bold text-[#272238]">{currentUser?.name}</h2>
              <p className="text-xs text-[#777084]">{currentUser?.email}</p>
            </div>
            <span className="inline-block text-[11px] font-semibold bg-[#F3EEFF] text-[#7755C9] px-2.5 py-0.5 rounded-full border border-[#DCD0FA]">
              Active Demo Profile
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F3EEFF] border border-[#DCD0FA] space-y-2 text-xs text-[#4B347F]">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#7755C9]" />
              <span>Independent Platform</span>
            </div>
            <p className="leading-relaxed">
              BankEase never collects or stores your bank login credentials, passwords, or transaction PINs.
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of BankEase</span>
          </button>
        </div>

        {/* Right 2 Columns: Settings Forms */}
        <div className="md:col-span-2 space-y-6">
          {/* Section 1: Edit Profile */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0EF] space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-[#272238] flex items-center gap-2">
              <User className="w-4 h-4 text-[#7755C9]" />
              Personal Information
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#272238]">Your Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#272238]">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  {isSavedProfile ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{isSavedProfile ? 'Saved' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Language & Voice Preferences */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0EF] space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-[#272238] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#7755C9]" />
              Language & Voice Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#272238]">Preferred Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                >
                  <option value="en">English (Indian English)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
                <span className="text-[11px] text-[#777084]">Sets assistant voice and query response language.</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#272238]">Speech Playback Rate</label>
                <select
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                >
                  <option value="0.8">0.8x (Slower — Recommended for Seniors)</option>
                  <option value="1.0">1.0x (Standard Speed)</option>
                  <option value="1.2">1.2x (Faster)</option>
                </select>
                <span className="text-[11px] text-[#777084]">Controls the text-to-speech reading speed.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Accessibility Settings */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0EF] space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-[#272238] flex items-center gap-2">
              <Type className="w-4 h-4 text-[#7755C9]" />
              Accessibility Options
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#272238] block">Larger Text Mode</span>
                  <span className="text-[11px] text-[#777084]">Increases overall typeface sizes for comfortable reading.</span>
                </div>
                <input
                  type="checkbox"
                  checked={largeText}
                  onChange={(e) => setLargeText(e.target.checked)}
                  className="rounded text-[#7755C9] focus:ring-[#7755C9] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#272238] block">High Contrast Mode</span>
                  <span className="text-[11px] text-[#777084]">Enhances color borders and text sharpness.</span>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="rounded text-[#7755C9] focus:ring-[#7755C9] w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Demo Password Change */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0EF] space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-[#272238] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#7755C9]" />
              Security & Demo Password
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#272238]">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#272238]">New Password</label>
                  <input
                    type="password"
                    placeholder="New demo password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E5E0EF] text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9]"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white border border-[#DCD0FA] text-[#7755C9] hover:bg-[#F3EEFF] text-xs font-semibold transition-colors"
                >
                  Update Demo Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
