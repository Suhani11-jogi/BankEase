import React, { useState } from 'react';
import { 
  FileCheck, 
  Bookmark, 
  Clock, 
  Trash2, 
  ChevronRight, 
  Bell, 
  Sparkles, 
  FileText, 
  Layers, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANKING_SERVICES } from '../data/bankingData';

export const ActivitiesPage: React.FC = () => {
  const { 
    userActivities, 
    clearActivities, 
    draftForms, 
    savedServiceIds, 
    setSelectedServiceId, 
    setSelectedFormId, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'drafts' | 'saved' | 'reminders'>('all');

  const savedServicesList = BANKING_SERVICES.filter((s) => savedServiceIds.includes(s.id));

  const sampleReminders = [
    {
      id: 'rem-1',
      title: 'Submit Nominee Form at Branch',
      detail: 'You prepared the DA1 form. Remember to carry your original passbook and nominee photo to the customer desk.',
      date: 'Next Bank Working Day',
      type: 'action',
      formId: 'form-nominee-update'
    },
    {
      id: 'rem-2',
      title: 'Review Re-KYC Periodic Deadline',
      detail: 'Check whether your bank requires a quick 1-click self-declaration online.',
      date: 'Within 30 Days',
      type: 'info',
      serviceId: 'kyc-rekyc-guidance'
    },
    {
      id: 'rem-3',
      title: 'ATM Failed Transaction Dispute Deadline',
      detail: 'If an ATM didn\'t dispense cash, file dispute within 30 days to claim statutory ₹100/day delay compensation.',
      date: 'Regulatory Timeline',
      type: 'caution',
      serviceId: 'failed-transaction-guidance'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E0EF] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#7755C9] mb-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Local Progress & Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#272238] tracking-tight">
            My Activities & Saved Items
          </h1>
          <p className="text-xs sm:text-sm text-[#777084]">
            Track your prepared banking application slips, saved procedures, and suggested next steps in your current session.
          </p>
        </div>

        {userActivities.length > 0 && (
          <button
            onClick={clearActivities}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Log</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: `All Activity (${userActivities.length})` },
          { id: 'drafts', label: `Form Drafts (${draftForms.length})` },
          { id: 'saved', label: `Saved Services (${savedServicesList.length})` },
          { id: 'reminders', label: `Reminders (${sampleReminders.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[#7755C9] text-white shadow-xs'
                : 'bg-white border border-[#E5E0EF] text-[#777084] hover:text-[#272238] hover:bg-[#F8F7FC]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* 1. ALL ACTIVITY */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          {userActivities.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E0EF] space-y-2">
              <Clock className="w-8 h-8 text-[#DCD0FA] mx-auto" />
              <p className="text-sm font-semibold text-[#272238]">No activities logged yet.</p>
              <p className="text-xs text-[#777084]">As you explore services, ask assistant queries, and prepare forms, records will appear here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E5E0EF] divide-y divide-[#E5E0EF]">
              {userActivities.map((act) => (
                <div key={act.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-[#F8F7FC] transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#272238]">{act.title}</span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9]">
                        {act.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-[#777084]">{act.detail}</p>
                  </div>
                  <span className="text-[11px] text-[#777084] shrink-0">{act.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. FORM DRAFTS */}
      {activeTab === 'drafts' && (
        <div className="space-y-4">
          {draftForms.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E0EF] space-y-3">
              <FileText className="w-8 h-8 text-[#DCD0FA] mx-auto" />
              <p className="text-sm font-semibold text-[#272238]">No active form drafts.</p>
              <button
                onClick={() => navigateTo('forms')}
                className="px-4 py-2 bg-[#7755C9] text-white text-xs font-semibold rounded-xl"
              >
                Explore Forms Centre
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {draftForms.map((draft) => (
                <div
                  key={draft.formId}
                  className="p-5 rounded-2xl bg-white border border-[#E5E0EF] space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        draft.status === 'Prepared' ? 'bg-green-100 text-green-800' : 'bg-[#F3EEFF] text-[#7755C9]'
                      }`}>
                        Status: {draft.status}
                      </span>
                      <span className="text-[11px] text-[#777084]">Step {draft.stepReached}/5</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#272238]">{draft.formTitle}</h3>
                    <p className="text-xs text-[#777084]">
                      Checked {draft.checklistChecked.length} documents. Last updated {draft.lastUpdated}.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E0EF] flex items-center justify-between">
                    <span className="text-[11px] text-[#777084]">Stored in browser</span>
                    <button
                      onClick={() => setSelectedFormId(draft.formId)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>Resume & View Slip</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. SAVED SERVICES */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedServicesList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E5E0EF] space-y-3">
              <Bookmark className="w-8 h-8 text-[#DCD0FA] mx-auto" />
              <p className="text-sm font-semibold text-[#272238]">No services bookmarked yet.</p>
              <button
                onClick={() => navigateTo('services')}
                className="px-4 py-2 bg-[#7755C9] text-white text-xs font-semibold rounded-xl"
              >
                Browse Banking Services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedServicesList.map((service) => (
                <div
                  key={service.id}
                  className="p-4 rounded-2xl bg-white border border-[#E5E0EF] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9]">
                      {service.category.replace('_', ' ')}
                    </span>
                    <h3 className="text-sm font-bold text-[#272238]">{service.title}</h3>
                    <p className="text-xs text-[#777084] line-clamp-2">{service.shortDescription}</p>
                  </div>

                  <div className="pt-2 border-t border-[#E5E0EF] flex justify-end">
                    <button
                      onClick={() => setSelectedServiceId(service.id)}
                      className="text-xs font-semibold text-[#7755C9] hover:underline flex items-center gap-1"
                    >
                      <span>View Procedure</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. REMINDERS */}
      {activeTab === 'reminders' && (
        <div className="space-y-3">
          {sampleReminders.map((rem) => (
            <div
              key={rem.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0EF] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#272238]">{rem.title}</h4>
                    <span className="text-[10px] font-semibold bg-[#F8F7FC] text-[#777084] px-2 py-0.5 rounded border border-[#E5E0EF]">
                      {rem.date}
                    </span>
                  </div>
                  <p className="text-xs text-[#777084] max-w-xl leading-relaxed">{rem.detail}</p>
                </div>
              </div>

              {rem.formId ? (
                <button
                  onClick={() => setSelectedFormId(rem.formId!)}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#4B347F] text-xs font-semibold transition-colors"
                >
                  Open Form
                </button>
              ) : rem.serviceId ? (
                <button
                  onClick={() => setSelectedServiceId(rem.serviceId!)}
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#4B347F] text-xs font-semibold transition-colors"
                >
                  View Details
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
