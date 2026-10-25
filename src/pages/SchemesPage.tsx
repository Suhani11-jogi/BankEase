import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  X, 
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOVERNMENT_SCHEMES } from '../data/bankingData';
import { GovernmentScheme } from '../types';

export const SchemesPage: React.FC = () => {
  const { navigateTo, addActivity } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);

  const filteredSchemes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return GOVERNMENT_SCHEMES;
    return GOVERNMENT_SCHEMES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortName.toLowerCase().includes(q) ||
        s.objective.toLowerCase().includes(q) ||
        s.targetAudience.toLowerCase().includes(q) ||
        s.keyBenefits.some((b) => b.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleOpenScheme = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    addActivity({
      type: 'scheme_saved',
      title: `Viewed Scheme: ${scheme.shortName}`,
      detail: `Checked eligibility and official application guidelines.`,
      targetPage: 'schemes'
    });
  };

  const handleAskAboutScheme = (schemeName: string) => {
    setSelectedScheme(null);
    navigateTo('assistant', { assistantQuery: `Tell me how to apply for ${schemeName} and what documents are required.` });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#7755C9]">
          <Award className="w-3.5 h-3.5" />
          <span>National Financial Inclusion Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
          Government Banking & Social Security Schemes
        </h1>
        <p className="text-sm text-[#777084] max-w-2xl mx-auto">
          Explore government-backed welfare, pension, insurance, and zero-balance banking programs with verified eligibility criteria and document checklists.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <Search className="w-5 h-5 text-[#777084] absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search schemes (e.g. 'Jan Dhan', 'Pension', 'Insurance', 'Mudra')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#E5E0EF] focus:border-[#7755C9] focus:outline-none focus:ring-2 focus:ring-[#7755C9]/20 text-xs sm:text-sm shadow-xs transition-all text-[#272238]"
        />
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-[#E5E0EF] hover:border-[#DCD0FA] p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                  {scheme.badge}
                </span>
                <span className="text-[11px] text-[#777084] font-medium">Govt of India</span>
              </div>

              <h2 className="text-base font-bold text-[#272238] group-hover:text-[#7755C9] transition-colors">
                {scheme.name}
              </h2>

              <p className="text-xs text-[#777084] line-clamp-2 leading-relaxed">
                {scheme.objective}
              </p>

              {/* Key Benefits Preview */}
              <div className="p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B347F] block">
                  Key Benefits
                </span>
                <ul className="space-y-1 text-xs text-[#272238]">
                  {scheme.keyBenefits.slice(0, 2).map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5 text-[11px] truncate">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="truncate">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E0EF] flex items-center justify-between">
              <button
                onClick={() => handleOpenScheme(scheme)}
                className="text-xs font-semibold text-[#7755C9] hover:underline flex items-center gap-1"
              >
                <span>View Full Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#777084] hover:text-[#7755C9] rounded-lg transition-colors"
                title="Open Official Govt Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E0EF] p-5 sm:p-6 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5E0EF] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                  {selectedScheme.badge}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#272238] mt-1.5">
                  {selectedScheme.name}
                </h2>
                <p className="text-xs text-[#777084]">{selectedScheme.targetAudience}</p>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="p-1.5 text-[#777084] hover:text-[#272238] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Objective */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#777084]">Scheme Objective</h3>
              <p className="text-sm text-[#272238] leading-relaxed">{selectedScheme.objective}</p>
            </div>

            {/* Key Benefits */}
            <div className="p-4 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4B347F]">Scheme Benefits</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#272238]">
                {selectedScheme.keyBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7755C9] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility & Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E5E0EF] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#272238]">Eligibility Criteria</h4>
                <ul className="space-y-1.5 text-xs text-[#777084]">
                  {selectedScheme.eligibilityCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7755C9] mt-1.5 shrink-0" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5E0EF] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#272238]">Required Documents</h4>
                <ul className="space-y-1.5 text-xs text-[#777084]">
                  {selectedScheme.documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7755C9] mt-1.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to Apply */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#777084]">How to Apply</h3>
              <ol className="space-y-1.5 text-xs sm:text-sm text-[#272238]">
                {selectedScheme.howToApply.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F3EEFF] text-[#7755C9] font-bold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E5E0EF] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => handleAskAboutScheme(selectedScheme.name)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#4B347F] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#7755C9]" />
                <span>Ask Assistant About This</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={selectedScheme.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedScheme(null)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#777084] hover:text-[#272238]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
