import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Layers, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Building2,
  CreditCard,
  BookOpen,
  UserCheck,
  Zap,
  PiggyBank,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANKING_SERVICES } from '../data/bankingData';
import { ServiceCategory } from '../types';

export const ServicesPage: React.FC = () => {
  const { 
    setSelectedServiceId, 
    setSelectedFormId, 
    isServiceSaved, 
    toggleSaveService, 
    language 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Services', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'account', label: 'Account Services', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'debit_atm', label: 'Debit & ATM', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'cheque_passbook', label: 'Cheques & Passbooks', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'personal_info', label: 'Personal Info & KYC', icon: <UserCheck className="w-3.5 h-3.5" /> },
    { id: 'payments_upi', label: 'Payments & UPI', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'loans_deposits', label: 'Loans & Deposits', icon: <PiggyBank className="w-3.5 h-3.5" /> },
    { id: 'complaints_grievance', label: 'Grievance & Ombudsman', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  const filteredServices = useMemo(() => {
    return BANKING_SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        service.title.toLowerCase().includes(q) ||
        (service.titleHi && service.titleHi.toLowerCase().includes(q)) ||
        (service.titleMr && service.titleMr.toLowerCase().includes(q)) ||
        service.shortDescription.toLowerCase().includes(q) ||
        service.requiredDocuments.some((d) => d.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#7755C9]">
          <Layers className="w-3.5 h-3.5" />
          <span>Comprehensive Banking Guidance Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
          All Banking Services & Procedures
        </h1>
        <p className="text-sm text-[#777084] max-w-2xl mx-auto">
          Explore complete step-by-step procedures, required document checklists, and branch submission guidance across all major banking operations.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 text-[#777084] absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search any service, procedure, or document (e.g. 'Aadhaar', 'Nominee', 'Lost ATM Card')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#E5E0EF] focus:border-[#7755C9] focus:outline-none focus:ring-2 focus:ring-[#7755C9]/20 text-xs sm:text-sm shadow-xs transition-all text-[#272238]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs text-[#777084] hover:text-[#272238] font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar justify-start lg:justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#7755C9] text-white shadow-xs'
                    : 'bg-white border border-[#E5E0EF] text-[#777084] hover:text-[#272238] hover:bg-[#F8F7FC]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#777084] px-1">
          <span>Showing {filteredServices.length} banking services</span>
          <span className="italic">Procedures may slightly differ between banks</span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E5E0EF] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#272238]">No matching banking services found</h3>
            <p className="text-xs text-[#777084] max-w-sm mx-auto">
              Try searching with alternative keywords like "account", "card", "cheque", or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#F3EEFF] text-[#7755C9] font-semibold text-xs rounded-xl hover:bg-[#DCD0FA] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => {
              const isSaved = isServiceSaved(service.id);

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-[#E5E0EF] hover:border-[#DCD0FA] p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Category badge & Save button */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                        {service.category.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => toggleSaveService(service.id, service.title)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved 
                            ? 'bg-[#F3EEFF] border-[#7755C9] text-[#7755C9]' 
                            : 'bg-white border-[#E5E0EF] text-[#777084] hover:text-[#7755C9]'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save service'}
                        aria-label="Save service"
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-[#272238] group-hover:text-[#7755C9] transition-colors">
                      {language === 'hi' && service.titleHi ? service.titleHi : language === 'mr' && service.titleMr ? service.titleMr : service.title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-xs text-[#777084] line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Meta Info (Turnaround & Documents Count) */}
                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#777084] border-t border-[#E5E0EF]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#7755C9]" />
                        {service.typicalTimeframe.split(';')[0]}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        {service.requiredDocuments.length} Docs Needed
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#E5E0EF]">
                    <button
                      onClick={() => setSelectedServiceId(service.id)}
                      className="text-xs font-semibold text-[#7755C9] hover:underline flex items-center gap-1"
                    >
                      <span>View Procedure</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {service.associatedFormId && (
                      <button
                        onClick={() => setSelectedFormId(service.associatedFormId!)}
                        className="text-xs px-2.5 py-1.5 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#4B347F] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <FileText className="w-3 h-3 text-[#7755C9]" />
                        <span>Start Form</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
