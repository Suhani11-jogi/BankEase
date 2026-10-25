/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { GuidedFormModal } from './components/GuidedFormModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssistantPage } from './pages/AssistantPage';
import { ServicesPage } from './pages/ServicesPage';
import { FormsPage } from './pages/FormsPage';
import { VoicePage } from './pages/VoicePage';
import { SchemesPage } from './pages/SchemesPage';
import { FraudPage } from './pages/FraudPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ProfilePage } from './pages/ProfilePage';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, toastMessage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'assistant':
        return <AssistantPage />;
      case 'services':
        return <ServicesPage />;
      case 'forms':
        return <FormsPage />;
      case 'voice':
        return <VoicePage />;
      case 'schemes':
        return <SchemesPage />;
      case 'fraud':
        return <FraudPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7FC] text-[#272238] antialiased selection:bg-[#DCD0FA] selection:text-[#4B347F]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#272238] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom duration-200 border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Safety & Compliance Reassurance Banner */}
      <DisclaimerBanner />

      {/* Responsive Navigation Bar */}
      <Navbar />

      {/* Main Page View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Interactive Modals */}
      <ServiceDetailModal />
      <GuidedFormModal />

      {/* Global Fintech Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
