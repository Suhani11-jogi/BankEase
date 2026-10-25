import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ShieldCheck,
  FileCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANKING_FORMS } from '../data/bankingData';

export const FormsPage: React.FC = () => {
  const { setSelectedFormId, draftForms } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Forms' },
    { id: 'account', label: 'Account Opening & Closure' },
    { id: 'personal_info', label: 'Address & Contact Updates' },
    { id: 'debit_atm', label: 'Cards & PINs' },
    { id: 'cheque_passbook', label: 'Cheques & Statements' },
    { id: 'payments_upi', label: 'Disputes & Chargebacks' },
  ];

  const filteredForms = useMemo(() => {
    return BANKING_FORMS.filter((form) => {
      const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        form.title.toLowerCase().includes(q) ||
        form.description.toLowerCase().includes(q) ||
        form.department.toLowerCase().includes(q) ||
        form.requiredChecklist.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#7755C9]">
          <FileText className="w-3.5 h-3.5" />
          <span>Interactive Form Preparation Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
          Banking Forms & Applications Centre
        </h1>
        <p className="text-sm text-[#777084] max-w-2xl mx-auto">
          Never feel lost filling out complicated paperwork. BankEase breaks down every field into plain English, tracks your required documents, and prepares a clear summary slip for your branch visit.
        </p>
      </div>

      {/* Process Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5E0EF] grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-[#272238]">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#F3EEFF] text-[#7755C9] font-bold flex items-center justify-center shrink-0">1</span>
          <span>Pick standard banking request</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#F3EEFF] text-[#7755C9] font-bold flex items-center justify-center shrink-0">2</span>
          <span>Check document readiness</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#F3EEFF] text-[#7755C9] font-bold flex items-center justify-center shrink-0">3</span>
          <span>Plain-English guided inputs</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#F3EEFF] text-[#7755C9] font-bold flex items-center justify-center shrink-0">4</span>
          <span>Print / download branch slip</span>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 text-[#777084] absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search forms (e.g. 'Savings', 'Nominee', 'Dispute', 'Cheque')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#E5E0EF] focus:border-[#7755C9] focus:outline-none focus:ring-2 focus:ring-[#7755C9]/20 text-xs sm:text-sm shadow-xs transition-all text-[#272238]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar justify-start sm:justify-center">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#7755C9] text-white shadow-xs'
                    : 'bg-white border border-[#E5E0EF] text-[#777084] hover:text-[#272238] hover:bg-[#F8F7FC]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => {
          const draft = draftForms.find((d) => d.formId === form.id);

          return (
            <div
              key={form.id}
              className="bg-white rounded-2xl border border-[#E5E0EF] hover:border-[#DCD0FA] p-5 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                    {form.department}
                  </span>
                  {draft && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      draft.status === 'Prepared' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {draft.status}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-bold text-[#272238] group-hover:text-[#7755C9] transition-colors">
                  {form.title}
                </h2>

                <p className="text-xs text-[#777084] line-clamp-3 leading-relaxed">
                  {form.description}
                </p>

                {/* Required Checklist Preview */}
                <div className="p-3 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4B347F] block">
                    Required Documents Checklist ({form.requiredChecklist.length})
                  </span>
                  <ul className="space-y-1 text-[11px] text-[#272238]">
                    {form.requiredChecklist.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 truncate">
                        <span className="text-green-600 font-bold">✓</span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                    {form.requiredChecklist.length > 3 && (
                      <li className="text-[10px] text-[#777084] italic">
                        +{form.requiredChecklist.length - 3} more in guided checklist
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-[#E5E0EF] flex items-center justify-between">
                <span className="text-xs text-[#777084] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#7755C9]" />
                  ~{form.estimatedMinutes} mins
                </span>

                <button
                  onClick={() => setSelectedFormId(form.id)}
                  className="px-4 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <span>{draft ? 'Resume Form' : 'Start Form'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
