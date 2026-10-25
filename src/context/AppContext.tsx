import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, SupportedLanguage, FormSubmissionDraft, UserActivityRecord } from '../types';

export type AppPage =
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'assistant'
  | 'services'
  | 'forms'
  | 'voice'
  | 'schemes'
  | 'fraud'
  | 'activities'
  | 'profile';

interface NavigationOptions {
  serviceId?: string;
  formId?: string;
  assistantQuery?: string;
}

interface AppContextType {
  currentPage: AppPage;
  navigateTo: (page: AppPage, options?: NavigationOptions) => void;
  currentUser: UserProfile | null;
  loginAsDemoUser: (user: Partial<UserProfile>) => void;
  logout: () => void;
  savedServiceIds: string[];
  toggleSaveService: (serviceId: string, title?: string) => void;
  isServiceSaved: (serviceId: string) => boolean;
  draftForms: FormSubmissionDraft[];
  saveFormDraft: (draft: FormSubmissionDraft) => void;
  getFormDraft: (formId: string) => FormSubmissionDraft | undefined;
  userActivities: UserActivityRecord[];
  addActivity: (activity: Omit<UserActivityRecord, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string | null) => void;
  selectedFormId: string | null;
  setSelectedFormId: (id: string | null) => void;
  assistantInitialQuery: string | null;
  setAssistantInitialQuery: (query: string | null) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  voiceSpeed: number;
  setVoiceSpeed: (speed: number) => void;
  largeText: boolean;
  setLargeText: (val: boolean) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'demo-user-1',
  name: 'Suhani Jogi',
  email: 'suhanijogi15@gmail.com',
  language: 'en',
  voiceSpeed: 1.0,
  largeText: false,
  highContrast: false,
  avatarSeed: 'SJ',
  isDemoUser: true,
};

const INITIAL_ACTIVITIES: UserActivityRecord[] = [
  {
    id: 'act-1',
    type: 'service_viewed',
    title: 'Explored Savings Account Opening',
    detail: 'Checked Video-KYC checklist and branch procedures.',
    timestamp: '10 mins ago',
    targetPage: 'services',
  },
  {
    id: 'act-2',
    type: 'assistant_query',
    title: 'Asked about Lost ATM Card Protocol',
    detail: 'Learned emergency card blocking steps and RBI Zero Liability rule.',
    timestamp: '1 hour ago',
    targetPage: 'assistant',
  },
  {
    id: 'act-3',
    type: 'form_draft',
    title: 'Started Nominee Update Form (DA1)',
    detail: 'Draft saved with beneficiary details prepared.',
    timestamp: 'Yesterday',
    targetPage: 'forms',
  },
  {
    id: 'act-4',
    type: 'fraud_read',
    title: 'Reviewed UPI "Scan to Receive" Scam Warning',
    detail: 'Understood that scanning QR or typing PIN never receives money.',
    timestamp: '2 days ago',
    targetPage: 'fraud',
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEFAULT_DEMO_USER);
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>([
    'savings-account-opening',
    'nominee-update',
    'failed-transaction-guidance'
  ]);
  const [draftForms, setDraftForms] = useState<FormSubmissionDraft[]>([
    {
      formId: 'form-nominee-update',
      formTitle: 'Nomination Registration / Update (Form DA1 / DA3)',
      lastUpdated: 'Yesterday, 4:30 PM',
      status: 'Prepared',
      stepReached: 4,
      formData: {
        accountNumber: '203948571029',
        nomineeFullName: 'Ananya Sharma',
        relationship: 'Daughter',
        nomineeAge: '22 Years'
      },
      checklistChecked: [
        'Nominee Date of Birth proof (if minor)',
        'Account passbook or cheque leaf'
      ]
    }
  ]);
  const [userActivities, setUserActivities] = useState<UserActivityRecord[]>(INITIAL_ACTIVITIES);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1.0);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const navigateTo = (page: AppPage, options?: NavigationOptions) => {
    if (options?.serviceId) {
      setSelectedServiceId(options.serviceId);
    }
    if (options?.formId) {
      setSelectedFormId(options.formId);
    }
    if (options?.assistantQuery) {
      setAssistantInitialQuery(options.assistantQuery);
    }
    setCurrentPage(page);
  };

  const loginAsDemoUser = (user: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: user.id || 'demo-user-' + Date.now(),
      name: user.name || 'Suhani Jogi',
      email: user.email || 'user@bankease.demo',
      language: user.language || 'en',
      voiceSpeed: user.voiceSpeed || 1.0,
      largeText: user.largeText ?? false,
      highContrast: user.highContrast ?? false,
      avatarSeed: (user.name || 'User').slice(0, 2).toUpperCase(),
      isDemoUser: true,
    };
    setCurrentUser(newUser);
    setLanguage(newUser.language);
    showToast(`Welcome to BankEase, ${newUser.name}!`);
    setCurrentPage('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been signed out of BankEase Demo.');
    setCurrentPage('landing');
  };

  const toggleSaveService = (serviceId: string, title?: string) => {
    setSavedServiceIds((prev) => {
      const exists = prev.includes(serviceId);
      if (exists) {
        showToast(title ? `Removed "${title}" from saved services` : 'Removed from saved services');
        return prev.filter((id) => id !== serviceId);
      } else {
        showToast(title ? `Saved "${title}" to your activities` : 'Saved to your activities');
        addActivity({
          type: 'service_viewed',
          title: `Saved Service: ${title || serviceId}`,
          detail: 'Bookmarked for quick future reference.',
          targetPage: 'services'
        });
        return [...prev, serviceId];
      }
    });
  };

  const isServiceSaved = (serviceId: string) => savedServiceIds.includes(serviceId);

  const saveFormDraft = (draft: FormSubmissionDraft) => {
    setDraftForms((prev) => {
      const idx = prev.findIndex((d) => d.formId === draft.formId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = draft;
        return updated;
      }
      return [draft, ...prev];
    });
    addActivity({
      type: 'form_draft',
      title: `Updated Draft: ${draft.formTitle}`,
      detail: `Status: ${draft.status}. Prepared to step ${draft.stepReached}.`,
      targetPage: 'forms'
    });
    showToast(`Draft for "${draft.formTitle}" saved successfully!`);
  };

  const getFormDraft = (formId: string) => {
    return draftForms.find((d) => d.formId === formId);
  };

  const addActivity = (activity: Omit<UserActivityRecord, 'id' | 'timestamp'>) => {
    const newRecord: UserActivityRecord = {
      ...activity,
      id: 'act-' + Date.now(),
      timestamp: 'Just now'
    };
    setUserActivities((prev) => [newRecord, ...prev.slice(0, 20)]);
  };

  const clearActivities = () => {
    setUserActivities([]);
    showToast('Cleared your recent activity log.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        currentUser,
        loginAsDemoUser,
        logout,
        savedServiceIds,
        toggleSaveService,
        isServiceSaved,
        draftForms,
        saveFormDraft,
        getFormDraft,
        userActivities,
        addActivity,
        clearActivities,
        selectedServiceId,
        setSelectedServiceId,
        selectedFormId,
        setSelectedFormId,
        assistantInitialQuery,
        setAssistantInitialQuery,
        language,
        setLanguage,
        voiceSpeed,
        setVoiceSpeed,
        largeText,
        setLargeText,
        highContrast,
        setHighContrast,
        toastMessage,
        showToast
      }}
    >
      <div className={`${largeText ? 'text-lg' : 'text-base'} ${highContrast ? 'contrast-125' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
