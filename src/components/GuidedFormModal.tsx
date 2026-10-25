import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Download, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Save, 
  Check, 
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANKING_FORMS } from '../data/bankingData';
import { FormSubmissionDraft } from '../types';

export const GuidedFormModal: React.FC = () => {
  const { 
    selectedFormId, 
    setSelectedFormId, 
    saveFormDraft, 
    getFormDraft, 
    showToast,
    addActivity 
  } = useApp();

  const formDef = BANKING_FORMS.find((f) => f.id === selectedFormId);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [checkedDocs, setCheckedDocs] = useState<string[]>([]);
  const [activeHelpFieldId, setActiveHelpFieldId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Restore draft if exists
  useEffect(() => {
    if (formDef) {
      const existingDraft = getFormDraft(formDef.id);
      if (existingDraft) {
        setFormData(existingDraft.formData || {});
        setCheckedDocs(existingDraft.checklistChecked || []);
        setCurrentStep(Math.min(existingDraft.stepReached || 1, 4));
      } else {
        setFormData({});
        setCheckedDocs([]);
        setCurrentStep(1);
      }
      setValidationErrors({});
      setIsSaved(false);
    }
  }, [formDef]);

  if (!selectedFormId || !formDef) return null;

  const handleInputChange = (fieldId: string, val: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: val }));
    if (validationErrors[fieldId]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[fieldId];
        return copy;
      });
    }
  };

  const handleToggleDoc = (doc: string) => {
    setCheckedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleAutoFillSample = () => {
    const sample: Record<string, string> = {};
    formDef.fields.forEach((f) => {
      if (f.sampleValue) {
        sample[f.id] = f.sampleValue;
      }
    });
    setFormData(sample);
    setCheckedDocs(formDef.requiredChecklist);
    showToast('Auto-filled form with sample demo values!');
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    formDef.fields.forEach((field) => {
      if (field.required && (!formData[field.id] || formData[field.id].trim() === '')) {
        errors[field.id] = `Please fill out this field.`;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3) {
      if (!validateStep3()) return;
    }

    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Auto save draft progress
      saveFormDraft({
        formId: formDef.id,
        formTitle: formDef.title,
        lastUpdated: 'Just now',
        status: nextStep === 5 ? 'Prepared' : 'Draft',
        stepReached: nextStep,
        formData,
        checklistChecked: checkedDocs
      });

      if (nextStep === 5) {
        addActivity({
          type: 'form_draft',
          title: `Completed Preparation: ${formDef.title}`,
          detail: 'All fields verified and checklist slip ready for branch submission.',
          targetPage: 'forms'
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleManualSave = () => {
    saveFormDraft({
      formId: formDef.id,
      formTitle: formDef.title,
      lastUpdated: 'Just now',
      status: currentStep === 5 ? 'Prepared' : 'Draft',
      stepReached: currentStep,
      formData,
      checklistChecked: checkedDocs
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDownloadSlip = () => {
    const textContent = `
========================================
BANKEASE - FORM PREPARATION SLIP
========================================
Form: ${formDef.title}
Department: ${formDef.department}
Date Prepared: ${new Date().toLocaleDateString()}
Status: Prepared for Bank Branch Submission (Demo Prototype)

----------------------------------------
DOCUMENTS CHECKLIST
----------------------------------------
${formDef.requiredChecklist.map((d) => `[${checkedDocs.includes(d) ? 'X' : ' '}] ${d}`).join('\n')}

----------------------------------------
APPLICANT ENTERED DETAILS
----------------------------------------
${formDef.fields.map((f) => `${f.label}: ${formData[f.id] || '(Not provided)'}`).join('\n')}

----------------------------------------
BRANCH SUBMISSION INSTRUCTIONS
----------------------------------------
${formDef.branchSubmissionNote}

Important: BankEase never transmits live bank applications or requests bank passwords. Hand over physical forms directly to authorized branch staff.
========================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formDef.id}-preparation-slip.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded application summary slip!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#E5E0EF] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guided-form-title"
      >
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-[#E5E0EF] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA]">
                Step {currentStep} of 5
              </span>
              <span className="text-xs text-[#777084]">{formDef.department}</span>
            </div>
            <h2 id="guided-form-title" className="text-base sm:text-lg font-bold text-[#272238] truncate max-w-md">
              {formDef.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualSave}
              className="p-2 rounded-xl text-xs font-medium text-[#7755C9] hover:bg-[#F3EEFF] border border-[#DCD0FA] transition-colors flex items-center gap-1"
              title="Save progress"
            >
              {isSaved ? <Check className="w-4 h-4 text-green-600" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={() => setSelectedFormId(null)}
              className="p-2 text-[#777084] hover:text-[#272238] hover:bg-[#F8F7FC] rounded-xl transition-colors"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#F3EEFF] h-1.5">
          <div 
            className="bg-[#7755C9] h-1.5 transition-all duration-300 rounded-r-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Overview & Guidelines */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7755C9]">Form Purpose</span>
                <p className="text-sm text-[#272238] leading-relaxed">
                  {formDef.description}
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs text-[#777084]">
                  <span>⏱️ Estimated Time: ~{formDef.estimatedMinutes} minutes</span>
                  <span>🔒 Privacy: Data stays in your browser</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#272238]">How This Guided Assistance Works</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[#E5E0EF] space-y-1">
                    <span className="font-bold text-[#7755C9]">1. Verify Checklist</span>
                    <p className="text-[#777084]">Ensure you have all physical certificates and proofs ready.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E5E0EF] space-y-1">
                    <span className="font-bold text-[#7755C9]">2. Plain Language Input</span>
                    <p className="text-[#777084]">Confused by jargon? Tap "Explain Field" for simple guidance.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E5E0EF] space-y-1">
                    <span className="font-bold text-[#7755C9]">3. Branch Ready Slip</span>
                    <p className="text-[#777084]">Get an organized reference sheet to carry to your bank.</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F3EEFF] border border-[#DCD0FA] text-xs text-[#4B347F] flex items-center justify-between">
                <span>Want to test how the form looks with sample information?</span>
                <button
                  type="button"
                  onClick={handleAutoFillSample}
                  className="px-3 py-1.5 bg-white text-[#7755C9] font-semibold rounded-lg border border-[#DCD0FA] shadow-xs hover:bg-[#F8F7FC] transition-colors shrink-0"
                >
                  Fill Sample Data
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Document Checklist */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-[#272238]">Required Document Verification</h3>
                <p className="text-xs text-[#777084]">
                  Please tick each document you have ready. This prevents multiple trips to the bank branch.
                </p>
              </div>

              <div className="space-y-2.5">
                {formDef.requiredChecklist.map((doc, idx) => {
                  const isChecked = checkedDocs.includes(doc);
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-[#F3EEFF] border-[#7755C9]/50 text-[#272238]' 
                          : 'bg-white border-[#E5E0EF] text-[#777084] hover:bg-[#F8F7FC]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleDoc(doc)}
                        className="mt-0.5 rounded text-[#7755C9] focus:ring-[#7755C9] w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm font-medium leading-tight">
                        {doc}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="text-xs text-[#777084] bg-[#F8F7FC] p-3 rounded-xl border border-[#E5E0EF] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7755C9] shrink-0" />
                <span>
                  Checked {checkedDocs.length} of {formDef.requiredChecklist.length} required documents. You can still continue if you plan to gather them later.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Plain-English Guided Input */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#272238]">Enter Your Application Details</h3>
                  <p className="text-xs text-[#777084]">Tap the question mark on any field for a plain-English explanation.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFillSample}
                  className="text-xs font-semibold text-[#7755C9] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-fill Sample
                </button>
              </div>

              <div className="space-y-4">
                {formDef.fields.map((field) => {
                  const isHelpOpen = activeHelpFieldId === field.id;
                  const error = validationErrors[field.id];

                  return (
                    <div key={field.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#272238] flex items-center gap-1">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <button
                          type="button"
                          onClick={() => setActiveHelpFieldId(isHelpOpen ? null : field.id)}
                          className="text-[11px] text-[#7755C9] hover:text-[#4B347F] flex items-center gap-1 font-medium"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{isHelpOpen ? 'Hide Help' : 'Explain Field'}</span>
                        </button>
                      </div>

                      {/* Plain-English Explanation Helper Box */}
                      {isHelpOpen && (
                        <div className="p-2.5 rounded-lg bg-[#F3EEFF] border border-[#DCD0FA] text-xs text-[#4B347F] animate-in fade-in duration-150">
                          <strong className="font-semibold">Plain English Explanation: </strong>
                          {field.plainExplanation}
                        </div>
                      )}

                      {field.type === 'select' ? (
                        <select
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9] transition-all ${
                            error ? 'border-red-400 bg-red-50/30' : 'border-[#E5E0EF]'
                          }`}
                        >
                          <option value="">-- Select an option --</option>
                          {field.options?.map((opt, i) => (
                            <option key={i} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          rows={2}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9] transition-all ${
                            error ? 'border-red-400 bg-red-50/30' : 'border-[#E5E0EF]'
                          }`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-[#272238] focus:outline-none focus:ring-2 focus:ring-[#7755C9] transition-all ${
                            error ? 'border-red-400 bg-red-50/30' : 'border-[#E5E0EF]'
                          }`}
                        />
                      )}

                      {error && (
                        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {error}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Review Before Continuing */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h3 className="text-sm font-bold text-[#272238]">Review Prepared Information</h3>
                <p className="text-xs text-[#777084]">Check your entries before generating the branch submission slip.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#7755C9] pb-1 border-b border-[#E5E0EF]">
                  Applicant Summary
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {formDef.fields.map((f) => (
                    <div key={f.id} className="space-y-0.5">
                      <span className="text-[#777084] font-medium">{f.label}</span>
                      <p className="font-semibold text-[#272238] break-words">
                        {formData[f.id] || <span className="text-gray-400 italic">Not specified</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5E0EF] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#4B347F]">
                  Document Readiness Status
                </div>
                <div className="flex flex-wrap gap-2">
                  {formDef.requiredChecklist.map((d, i) => (
                    <span 
                      key={i} 
                      className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        checkedDocs.includes(d) 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {checkedDocs.includes(d) ? '✓ Ready:' : '○ Pending:'} {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F3EEFF] border border-[#DCD0FA] text-xs text-[#4B347F] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7755C9] shrink-0" />
                <span>
                  <strong>Safe Preview:</strong> No banking credentials (PINs, passwords, OTPs) are stored or transmitted.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Prepared Slip & Next Steps */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center mx-auto shadow-xs">
                <FileCheck className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#272238]">Form Preparation Complete!</h3>
                <p className="text-xs sm:text-sm text-[#777084] max-w-md mx-auto">
                  Your details and document checklist have been compiled. Download or print this slip to carry with your physical documents to the bank branch.
                </p>
              </div>

              {/* Branch Instructions Card */}
              <div className="text-left p-4 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF] space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7755C9]">Next Steps for You</span>
                <p className="text-xs sm:text-sm text-[#272238] leading-relaxed">
                  {formDef.branchSubmissionNote}
                </p>
                <div className="pt-2 text-[11px] text-[#777084] border-t border-[#E5E0EF]">
                  💡 <em>Prototype notice:</em> This frontend tool prepares your structured details. Because BankEase is not directly connected to a bank backend, this action does not electronically submit to a bank server.
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadSlip}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm shadow-[#7755C9]/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download Preparation Slip (.txt)
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#DCD0FA] hover:bg-[#F3EEFF] text-[#4B347F] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print Summary
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#F8F7FC] px-5 py-3.5 border-t border-[#E5E0EF] flex items-center justify-between gap-3">
          {currentStep > 1 && currentStep < 5 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#777084] hover:text-[#272238] rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm shadow-[#7755C9]/20 transition-all"
              >
                <span>{currentStep === 4 ? 'Confirm & Finish' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setSelectedFormId(null)}
                className="px-5 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold transition-all"
              >
                Close & Return
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
