import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Globe2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  AlertCircle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { SupportedLanguage } from '../types';

export const VoicePage: React.FC = () => {
  const { navigateTo, language, setLanguage, voiceSpeed, setVoiceSpeed, showToast } = useApp();

  const {
    isListening,
    transcript,
    interimTranscript,
    isSpeaking,
    isSpeechRecognitionSupported,
    isSpeechSynthesisSupported,
    permissionError,
    startListening,
    stopListening,
    cancelListening,
    clearTranscript,
    speak,
    stopSpeaking,
    setLanguage: setVoiceLanguage,
  } = useVoiceAssistant(language, voiceSpeed);

  const [textInputAlternative, setTextInputAlternative] = useState('');

  // Sync language with hook
  useEffect(() => {
    setVoiceLanguage(language);
  }, [language, setVoiceLanguage]);

  const activeTranscript = transcript || interimTranscript || textInputAlternative;

  const samplePhrases: Record<SupportedLanguage, { text: string; label: string }[]> = {
    en: [
      { text: 'How do I open a savings account with video KYC?', label: 'Open Account' },
      { text: 'My debit card was lost in an ATM, how do I block it?', label: 'Lost Card' },
      { text: 'How do I change my registered mobile number?', label: 'Mobile Number' },
    ],
    hi: [
      { text: 'नया बैंक खाता खोलने के लिए क्या दस्तावेज चाहिए?', label: 'खाता खोलना' },
      { text: 'एटीएम कार्ड खो जाने पर उसे तुरंत कैसे ब्लॉक करें?', label: 'कार्ड ब्लॉक' },
      { text: 'बैंक में नॉमिनी कैसे जोड़ें?', label: 'नॉमिनी जोड़ना' },
    ],
    mr: [
      { text: 'बचत खाते उघडण्यासाठी कोणती कागदपत्रे लागतात?', label: 'खाते उघडणे' },
      { text: 'माझे एटीएम कार्ड हरवले आहे, ते कसे ब्लॉक करावे?', label: 'कार्ड ब्लॉक' },
      { text: 'बँक खात्यात वारसदार कसा जोडावा?', label: 'वारसदार जोडणे' },
    ],
  };

  const handleTestTTS = () => {
    const sampleResponses: Record<SupportedLanguage, string> = {
      en: 'Welcome to BankEase. To open a savings account, you need your Aadhaar card and PAN card. You can complete the process online via Video-KYC in just two minutes.',
      hi: 'बैंक-ईज में आपका स्वागत है। बचत खाता खोलने के लिए आपको आधार कार्ड और पैन कार्ड की आवश्यकता होती है। आप इसे 2 मिनट में ऑनलाइन पूरा कर सकते हैं।',
      mr: 'बँक-ईज मध्ये आपले स्वागत आहे. बचत खाते उघडण्यासाठी आधार आणि पॅन कार्ड आवश्यक आहे. आपण हे २ मिनिटांत ऑनलाईन करू शकता.',
    };

    speak(sampleResponses[language]);
  };

  const handleTransferToAssistant = () => {
    if (!activeTranscript.trim()) {
      showToast('Please speak or type a query first.');
      return;
    }
    navigateTo('assistant', { assistantQuery: activeTranscript.trim() });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEFF] border border-[#DCD0FA] text-xs font-semibold text-[#7755C9]">
          <Mic className="w-3.5 h-3.5" />
          <span>Multilingual Voice Assistance Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#272238] tracking-tight">
          Speak in Your Language. Listen to Clear Answers.
        </h1>
        <p className="text-sm text-[#777084] max-w-2xl mx-auto">
          BankEase uses real browser speech recognition so you never have to struggle with tiny mobile keyboards. Select your language, click the microphone, and test voice interactions right here.
        </p>
      </div>

      {/* Language Selection Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { code: 'en' as SupportedLanguage, name: 'English', native: 'English', sub: 'Standard Indian English (en-IN)' },
          { code: 'hi' as SupportedLanguage, name: 'Hindi', native: 'हिन्दी', sub: 'हिंदी आवाज पहचान (hi-IN)' },
          { code: 'mr' as SupportedLanguage, name: 'Marathi', native: 'मराठी', sub: 'मराठी आवाज ओळख (mr-IN)' },
        ].map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              onClick={() => {
                setLanguage(item.code);
                stopSpeaking();
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#F3EEFF] border-[#7755C9] shadow-sm'
                  : 'bg-white border-[#E5E0EF] hover:border-[#DCD0FA]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-[#272238]">{item.native}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#7755C9]" />}
              </div>
              <span className="text-xs text-[#777084] block">{item.name}</span>
              <span className="text-[11px] text-[#4B347F] mt-1 block font-medium">{item.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Voice Interaction Workbench Card */}
      <div className="bg-white rounded-3xl border border-[#E5E0EF] shadow-xl p-6 sm:p-10 space-y-8">
        {/* Large Central Microphone Control */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            {/* Listening Wave Pulse Ring */}
            {isListening && (
              <span className="absolute inset-0 rounded-full bg-[#7755C9]/30 animate-ping duration-1000" />
            )}

            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center transition-all shadow-lg ${
                isListening
                  ? 'bg-red-500 text-white hover:bg-red-600 scale-105'
                  : 'bg-[#7755C9] text-white hover:bg-[#4B347F] hover:scale-105 shadow-[#7755C9]/30'
              }`}
              title={isListening ? 'Click to Stop Listening' : 'Click to Speak'}
              aria-label={isListening ? 'Stop listening' : 'Start microphone'}
            >
              {isListening ? (
                <>
                  <MicOff className="w-8 h-8 sm:w-10 sm:h-10" />
                  <span className="text-[11px] font-bold mt-1">Stop</span>
                </>
              ) : (
                <>
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10" />
                  <span className="text-[11px] font-bold mt-1">Speak</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[#272238]">
              {isListening ? (
                <span className="text-red-600 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  Listening... speak your question now
                </span>
              ) : (
                'Click the microphone and speak clearly'
              )}
            </h3>
            <p className="text-xs text-[#777084]">
              {isListening 
                ? 'Your words are being transcribed in real-time below' 
                : 'Supports English, Hindi, and Marathi depending on your browser engine'}
            </p>
          </div>
        </div>

        {/* Audio Wave Visualizer Simulation while listening */}
        {isListening && (
          <div className="flex items-center justify-center gap-1.5 h-8">
            <span className="w-1.5 bg-[#7755C9] rounded-full h-4 animate-voice-1" />
            <span className="w-1.5 bg-[#7755C9] rounded-full h-8 animate-voice-2" />
            <span className="w-1.5 bg-[#7755C9] rounded-full h-10 animate-voice-3" />
            <span className="w-1.5 bg-[#7755C9] rounded-full h-6 animate-voice-4" />
            <span className="w-1.5 bg-[#7755C9] rounded-full h-3 animate-voice-5" />
          </div>
        )}

        {permissionError && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Microphone status: </strong>
              {permissionError}
            </div>
          </div>
        )}

        {/* Real-time Transcript Area & Typing Alternative */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#272238]">Recognized Voice Transcript (Editable)</span>
            {activeTranscript && (
              <button
                type="button"
                onClick={() => {
                  clearTranscript();
                  setTextInputAlternative('');
                }}
                className="text-[11px] text-[#7755C9] hover:underline font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <textarea
            rows={3}
            value={activeTranscript}
            onChange={(e) => setTextInputAlternative(e.target.value)}
            placeholder="Your spoken words will appear here automatically. You can also type directly into this box anytime..."
            className="w-full p-4 rounded-2xl bg-[#F8F7FC] border border-[#E5E0EF] focus:border-[#7755C9] focus:outline-none focus:ring-2 focus:ring-[#7755C9]/20 text-xs sm:text-sm text-[#272238] transition-all"
          />

          {/* Quick Sample Prompts to Try */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium text-[#777084]">Or click a sample banking phrase in {language.toUpperCase()}:</span>
            <div className="flex flex-wrap gap-2">
              {samplePhrases[language].map((phrase, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTextInputAlternative(phrase.text)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E5E0EF] hover:border-[#7755C9] hover:bg-[#F3EEFF] text-xs font-medium text-[#272238] transition-colors"
                >
                  "{phrase.text}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spoken-Response Controls & Next Step Buttons */}
        <div className="pt-4 border-t border-[#E5E0EF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isSpeaking ? (
              <button
                type="button"
                onClick={stopSpeaking}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <VolumeX className="w-4 h-4" />
                <span>Stop Spoken Audio</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleTestTTS}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#7755C9] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Test Spoken Response Audio</span>
              </button>
            )}

            {/* Speech rate toggle */}
            <select
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
              className="text-xs bg-[#F8F7FC] border border-[#E5E0EF] rounded-xl px-2 py-2 text-[#272238] font-medium"
              title="Voice Speech Rate"
            >
              <option value="0.8">0.8x (Slower)</option>
              <option value="1.0">1.0x (Normal)</option>
              <option value="1.2">1.2x (Faster)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleTransferToAssistant}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm shadow-[#7755C9]/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask in AI Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Permissions & Privacy Transparency Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Permission Instructions */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E0EF] space-y-3">
          <h3 className="text-sm font-bold text-[#272238] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#7755C9]" />
            How to Grant Microphone Permission
          </h3>
          <ul className="space-y-2 text-xs text-[#777084]">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#7755C9]">1.</span>
              <span>When prompted by your browser, tap <strong>"Allow"</strong> for microphone access.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#7755C9]">2.</span>
              <span>If denied by mistake, click the lock or tuning icon in your browser address bar to reset permissions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#7755C9]">3.</span>
              <span>Microphone access requires a secure HTTPS connection (built into this preview).</span>
            </li>
          </ul>
        </div>

        {/* Privacy Note */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E0EF] space-y-3">
          <h3 className="text-sm font-bold text-[#272238] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7755C9]" />
            Voice Privacy & Security Guarantee
          </h3>
          <p className="text-xs text-[#777084] leading-relaxed">
            BankEase activates your microphone <strong>only</strong> when you click the Speak button. We never record in the background or store your audio files on servers. Recognition is executed natively in your browser.
          </p>
          <div className="text-[11px] text-[#4B347F] font-semibold bg-[#F3EEFF] p-2.5 rounded-xl border border-[#DCD0FA]">
            Tip: You can always use the text keyboard if you prefer not to use voice.
          </div>
        </div>
      </div>
    </div>
  );
};
