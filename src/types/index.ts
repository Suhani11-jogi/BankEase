export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  language: SupportedLanguage;
  voiceSpeed: number; // 0.8, 1.0, 1.2
  largeText: boolean;
  highContrast: boolean;
  avatarSeed: string;
  isDemoUser: boolean;
}

export type ServiceCategory = 
  | 'account'
  | 'debit_atm'
  | 'cheque_passbook'
  | 'personal_info'
  | 'payments_upi'
  | 'loans_deposits'
  | 'complaints_grievance';

export interface BankingService {
  id: string;
  title: string;
  titleHi: string;
  titleMr: string;
  category: ServiceCategory;
  shortDescription: string;
  fullOverview: string;
  requiredDocuments: string[];
  onlineSteps: string[];
  branchSteps: string[];
  typicalTimeframe: string;
  safetyCaution: string;
  associatedFormId?: string;
  popular?: boolean;
}

export interface FormFieldDefinition {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'date';
  placeholder?: string;
  required: boolean;
  options?: string[];
  plainExplanation: string; // "Explain this field" plain language helper
  sampleValue?: string;
}

export interface BankingForm {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  department: string;
  estimatedMinutes: number;
  requiredChecklist: string[];
  fields: FormFieldDefinition[];
  branchSubmissionNote: string;
  officialBankLinkHint?: string;
}

export interface FormSubmissionDraft {
  formId: string;
  formTitle: string;
  lastUpdated: string;
  status: 'Draft' | 'Prepared' | 'Needs review';
  stepReached: number;
  formData: Record<string, string>;
  checklistChecked: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: SupportedLanguage;
  suggestedPrompts?: string[];
  relatedServiceId?: string;
  relatedFormId?: string;
  checklist?: string[];
  isEmergencyAlert?: boolean;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortName: string;
  objective: string;
  targetAudience: string;
  keyBenefits: string[];
  eligibilityCriteria: string[];
  documentsRequired: string[];
  howToApply: string[];
  officialPortal: string;
  badge: string;
}

export interface FraudTopic {
  id: string;
  title: string;
  category: 'calls' | 'digital' | 'cards' | 'identity';
  riskLevel: 'Critical' | 'High' | 'Medium';
  modusOperandi: string;
  redFlags: string[];
  preventiveAction: string[];
  officialReportingStep: string;
  emergencyActionText: string;
}

export interface UserActivityRecord {
  id: string;
  type: 'form_draft' | 'service_viewed' | 'assistant_query' | 'scheme_saved' | 'fraud_read';
  title: string;
  detail: string;
  timestamp: string;
  targetPage?: string;
  metadata?: Record<string, any>;
}
