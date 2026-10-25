import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Building, 
  Globe2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANKING_SERVICES } from '../data/bankingData';

export const ServiceDetailModal: React.FC = () => {
  const { 
    selectedServiceId, 
    setSelectedServiceId, 
    setSelectedFormId, 
    navigateTo, 
    isServiceSaved, 
    toggleSaveService, 
    language 
  } = useApp();

  if (!selectedServiceId) return null;

  const service = BANKING_SERVICES.find((s) => s.id === selectedServiceId);
  if (!service) return null;

  const isSaved = isServiceSaved(service.id);

  const getLocalizedTitle = () => {
    if (language === 'hi' && service.titleHi) return service.titleHi;
    if (language === 'mr' && service.titleMr) return service.titleMr;
    return service.title;
  };

  const handleStartForm = () => {
    if (service.associatedFormId) {
      setSelectedServiceId(null);
      setSelectedFormId(service.associatedFormId);
    } else {
      setSelectedServiceId(null);
      navigateTo('forms');
    }
  };

  const handleAskAssistant = () => {
    setSelectedServiceId(null);
    navigateTo('assistant', { assistantQuery: `How do I complete the procedure for ${service.title}?` });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0EF] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 py-4 border-b border-[#E5E0EF] flex items-start justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                {service.category.replace('_', ' & ')}
              </span>
              <span className="text-xs text-[#777084] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#7755C9]" />
                {service.typicalTimeframe}
              </span>
            </div>
            <h2 id="service-modal-title" className="text-lg sm:text-xl font-bold text-[#272238]">
              {getLocalizedTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => toggleSaveService(service.id, service.title)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved 
                  ? 'bg-[#F3EEFF] border-[#7755C9] text-[#7755C9]' 
                  : 'bg-[#F8F7FC] border-[#E5E0EF] text-[#777084] hover:text-[#7755C9]'
              }`}
              title={isSaved ? 'Saved to activities' : 'Save service'}
              aria-label="Save service"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSelectedServiceId(null)}
              className="p-2 text-[#777084] hover:text-[#272238] hover:bg-[#F8F7FC] rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#777084] mb-2">Service Overview</h3>
            <p className="text-sm text-[#272238] leading-relaxed">
              {service.fullOverview}
            </p>
          </div>

          {/* Required Documents */}
          <div className="p-4 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B347F] mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7755C9]" />
              Required Documents Checklist
            </h3>
            <ul className="space-y-2">
              {service.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#272238]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7755C9] mt-2 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dual procedure breakdown: Online vs Branch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Online Steps */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E0EF] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#7755C9] uppercase tracking-wider">
                <Globe2 className="w-4 h-4" />
                Online / Mobile App Steps
              </div>
              <ol className="space-y-2 text-xs text-[#272238]">
                {service.onlineSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#F3EEFF] text-[#7755C9] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Branch Steps */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E0EF] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4B347F] uppercase tracking-wider">
                <Building className="w-4 h-4" />
                Physical Branch Steps
              </div>
              <ol className="space-y-2 text-xs text-[#272238]">
                {service.branchSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#F3EEFF] text-[#4B347F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Safety Caution */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3EEFF] border border-[#DCD0FA] text-xs text-[#4B347F]">
            <AlertTriangle className="w-4 h-4 text-[#7755C9] shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-[#272238]">BankEase Safety Tip: </strong>
              {service.safetyCaution}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-[#F8F7FC] border-t border-[#E5E0EF] px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleAskAssistant}
            className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold text-[#4B347F] bg-white border border-[#DCD0FA] hover:bg-[#F3EEFF] rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7755C9]" />
            Ask Assistant Questions
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {service.associatedFormId && (
              <button
                onClick={handleStartForm}
                className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#7755C9] hover:bg-[#4B347F] rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-[#7755C9]/20 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                Start Guided Form
              </button>
            )}
            <button
              onClick={() => setSelectedServiceId(null)}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-[#777084] hover:text-[#272238] rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
