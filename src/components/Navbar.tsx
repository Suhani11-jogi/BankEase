import React, { useState } from 'react';
import { 
  Building2, 
  Mic, 
  Menu, 
  X, 
  Globe, 
  User, 
  LogOut, 
  FileText, 
  ShieldAlert, 
  Award, 
  Layers, 
  LayoutDashboard, 
  Sparkles,
  Type,
  SunMoon
} from 'lucide-react';
import { useApp, AppPage } from '../context/AppContext';
import { SupportedLanguage } from '../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    currentUser, 
    logout, 
    language, 
    setLanguage, 
    largeText, 
    setLargeText, 
    highContrast, 
    setHighContrast 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [accessMenuOpen, setAccessMenuOpen] = useState(false);

  const handleNav = (page: AppPage) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E0EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button 
            onClick={() => handleNav(currentUser ? 'dashboard' : 'landing')} 
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="BankEase Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#7755C9] flex items-center justify-center text-white shadow-sm shadow-[#7755C9]/20 group-hover:bg-[#4B347F] transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-[#272238]">BankEase</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                  Beta
                </span>
              </div>
              <p className="text-[11px] text-[#777084] font-medium hidden sm:block -mt-0.5">Banking, Made Easier</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {!currentUser ? (
              <>
                <button
                  onClick={() => handleNav('landing')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'landing' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNav('services')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'services' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  Banking Services
                </button>
                <button
                  onClick={() => handleNav('assistant')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'assistant' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#7755C9]" />
                  AI Assistant
                </button>
                <button
                  onClick={() => handleNav('forms')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'forms' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  Forms Centre
                </button>
                <button
                  onClick={() => handleNav('fraud')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'fraud' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  Fraud Safety
                </button>
                <button
                  onClick={() => handleNav('schemes')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 'schemes' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  Govt Schemes
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'dashboard' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => handleNav('assistant')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'assistant' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#7755C9]" />
                  AI Assistant
                </button>
                <button
                  onClick={() => handleNav('services')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'services' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  Services
                </button>
                <button
                  onClick={() => handleNav('forms')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'forms' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Forms
                </button>
                <button
                  onClick={() => handleNav('voice')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'voice' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <Mic className="w-4 h-4 text-[#7755C9]" />
                  Voice
                </button>
                <button
                  onClick={() => handleNav('fraud')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'fraud' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  Safety
                </button>
                <button
                  onClick={() => handleNav('schemes')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentPage === 'schemes' 
                      ? 'text-[#7755C9] bg-[#F3EEFF] font-semibold' 
                      : 'text-[#272238] hover:text-[#7755C9] hover:bg-[#F8F7FC]'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Schemes
                </button>
              </>
            )}
          </nav>

          {/* Right Action Icons: Language, Accessibility, User Profile */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setUserMenuOpen(false);
                  setAccessMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#272238] bg-[#F8F7FC] hover:bg-[#F3EEFF] border border-[#E5E0EF] rounded-lg transition-colors"
                title="Select Language"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#7755C9]" />
                <span className="uppercase font-semibold">{language}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white border border-[#E5E0EF] rounded-xl shadow-lg py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F3EEFF] transition-colors ${
                        language === l.code ? 'text-[#7755C9] font-bold bg-[#F3EEFF]/50' : 'text-[#272238]'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-[#777084]">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Quick Toggles */}
            <div className="relative">
              <button
                onClick={() => {
                  setAccessMenuOpen(!accessMenuOpen);
                  setLangMenuOpen(false);
                  setUserMenuOpen(false);
                }}
                className="p-2 text-[#777084] hover:text-[#7755C9] bg-[#F8F7FC] hover:bg-[#F3EEFF] border border-[#E5E0EF] rounded-lg transition-colors"
                title="Accessibility Preferences"
                aria-label="Accessibility Preferences"
              >
                <Type className="w-4 h-4" />
              </button>

              {accessMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white border border-[#E5E0EF] rounded-xl shadow-lg p-3 z-50 space-y-2">
                  <div className="text-xs font-semibold text-[#272238] pb-1 border-b border-[#E5E0EF]">
                    Accessibility Options
                  </div>
                  <label className="flex items-center justify-between text-xs text-[#272238] cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-[#7755C9]" />
                      Larger Text
                    </span>
                    <input
                      type="checkbox"
                      checked={largeText}
                      onChange={(e) => setLargeText(e.target.checked)}
                      className="rounded text-[#7755C9] focus:ring-[#7755C9]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-[#272238] cursor-pointer">
                    <span className="flex items-center gap-1.5">
                      <SunMoon className="w-3.5 h-3.5 text-[#7755C9]" />
                      High Contrast
                    </span>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className="rounded text-[#7755C9] focus:ring-[#7755C9]"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* User Profile or Login CTA */}
            {!currentUser ? (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3.5 py-1.5 text-sm font-medium text-[#272238] hover:text-[#7755C9] transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#7755C9] hover:bg-[#4B347F] rounded-xl shadow-sm shadow-[#7755C9]/20 transition-all"
                >
                  Get Started
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    setLangMenuOpen(false);
                    setAccessMenuOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-[#E5E0EF] bg-[#F8F7FC] hover:bg-[#F3EEFF] transition-colors focus:outline-none"
                  aria-label="User Account"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#7755C9] text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.avatarSeed}
                  </div>
                  <span className="text-xs font-medium text-[#272238] hidden sm:block max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-1.5 w-48 bg-white border border-[#E5E0EF] rounded-xl shadow-lg py-1.5 z-50">
                    <div className="px-3 py-2 border-b border-[#E5E0EF]">
                      <p className="text-xs font-bold text-[#272238] truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-[#777084] truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] bg-[#F3EEFF] text-[#7755C9] font-medium px-1.5 py-0.5 rounded">
                        Demo Account
                      </span>
                    </div>
                    <button
                      onClick={() => handleNav('dashboard')}
                      className="w-full text-left px-3 py-2 text-xs text-[#272238] hover:bg-[#F8F7FC] flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#7755C9]" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('activities')}
                      className="w-full text-left px-3 py-2 text-xs text-[#272238] hover:bg-[#F8F7FC] flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#7755C9]" />
                      My Activities
                    </button>
                    <button
                      onClick={() => handleNav('profile')}
                      className="w-full text-left px-3 py-2 text-xs text-[#272238] hover:bg-[#F8F7FC] flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#7755C9]" />
                      Profile & Settings
                    </button>
                    <div className="border-t border-[#E5E0EF] my-1" />
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#272238] hover:bg-[#F3EEFF] rounded-lg transition-colors ml-1"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#7755C9]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E0EF] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-150">
          {!currentUser ? (
            <>
              <button
                onClick={() => handleNav('landing')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF]"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('services')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF]"
              >
                All Banking Services
              </button>
              <button
                onClick={() => handleNav('assistant')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#7755C9]" />
                AI Banking Assistant
              </button>
              <button
                onClick={() => handleNav('forms')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF]"
              >
                Forms & Applications Centre
              </button>
              <button
                onClick={() => handleNav('voice')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF]"
              >
                Voice Assistance
              </button>
              <button
                onClick={() => handleNav('fraud')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF]"
              >
                Fraud Awareness & Safety
              </button>
              <button
                onClick={() => handleNav('schemes')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF]"
              >
                Government Schemes
              </button>
              <div className="pt-3 border-t border-[#E5E0EF] flex flex-col gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 rounded-xl border border-[#DCD0FA] text-sm font-semibold text-[#7755C9] bg-[#F3EEFF]"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#7755C9]"
                >
                  Create Free Demo Account
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-[#7755C9]" />
                Dashboard
              </button>
              <button
                onClick={() => handleNav('assistant')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#7755C9]" />
                AI Banking Assistant
              </button>
              <button
                onClick={() => handleNav('services')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#7755C9]" />
                Banking Services
              </button>
              <button
                onClick={() => handleNav('forms')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#7755C9]" />
                Forms & Applications
              </button>
              <button
                onClick={() => handleNav('voice')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <Mic className="w-4 h-4 text-[#7755C9]" />
                Voice & Language
              </button>
              <button
                onClick={() => handleNav('fraud')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-[#7755C9]" />
                Fraud Awareness
              </button>
              <button
                onClick={() => handleNav('schemes')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-[#7755C9]" />
                Government Schemes
              </button>
              <button
                onClick={() => handleNav('activities')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#7755C9]" />
                My Activities
              </button>
              <button
                onClick={() => handleNav('profile')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#272238] hover:bg-[#F3EEFF] flex items-center gap-2"
              >
                <User className="w-4 h-4 text-[#7755C9]" />
                Profile & Settings
              </button>
              <div className="pt-2 border-t border-[#E5E0EF]">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
