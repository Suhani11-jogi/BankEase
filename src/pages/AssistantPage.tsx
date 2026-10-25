import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ArrowLeft, 
  FileText, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Globe2, 
  AlertCircle,
  Copy,
  Check,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { ChatMessage, SupportedLanguage } from '../types';
import { ASSISTANT_KNOWLEDGE_BASE, DEFAULT_ASSISTANT_RESPONSE } from '../data/bankingData';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: `Hello! I am your **BankEase Assistant**. \n\nI can guide you through banking procedures, explain required documents, assist with forms, and help you recognize banking scams. \n\nFeel free to type your question below or click the microphone to speak with me in English, हिन्दी, or मराठी.`,
    timestamp: 'Just now',
    suggestedPrompts: [
      'How can I open a savings account?',
      'How do I add or change my nominee?',
      'What should I do if my ATM card is lost?',
      'How do I update my registered mobile number?',
      'How can I complain about a failed ATM transaction?'
    ]
  }
];

export const AssistantPage: React.FC = () => {
  const { 
    navigateTo, 
    setSelectedServiceId, 
    setSelectedFormId, 
    assistantInitialQuery, 
    setAssistantInitialQuery,
    language,
    setLanguage,
    voiceSpeed,
    showToast,
    addActivity
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Voice Assistant Hook
  const {
    isListening,
    transcript,
    interimTranscript,
    isSpeaking,
    currentSpeakingId,
    isSpeechRecognitionSupported,
    permissionError,
    startListening,
    stopListening,
    cancelListening,
    speak,
    stopSpeaking,
    setLanguage: setVoiceLanguage,
  } = useVoiceAssistant(language, voiceSpeed);

  // Synchronize language state
  useEffect(() => {
    setVoiceLanguage(language);
  }, [language, setVoiceLanguage]);

  // When speech recognition produces text, update input text for easy editing
  useEffect(() => {
    if (transcript) {
      setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    }
  }, [transcript]);

  // Handle incoming deep query from dashboard or landing page
  useEffect(() => {
    if (assistantInitialQuery) {
      handleSendMessage(assistantInitialQuery);
      setAssistantInitialQuery(null);
    }
  }, [assistantInitialQuery]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, interimTranscript]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    // Stop listening if active
    if (isListening) {
      stopListening();
    }

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Activity record
    addActivity({
      type: 'assistant_query',
      title: `Asked: "${query.slice(0, 35)}..."`,
      detail: 'Received step-by-step procedure guidance.',
      targetPage: 'assistant'
    });

    // Simulate natural AI thinking delay and find response
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedRule = ASSISTANT_KNOWLEDGE_BASE.find((rule) =>
        rule.keywords.some((kw) => lowerQuery.includes(kw.toLowerCase()))
      );

      let responseText = '';
      let checklist: string[] | undefined = undefined;
      let relatedServiceId: string | undefined = undefined;
      let relatedFormId: string | undefined = undefined;
      let suggestedPrompts: string[] | undefined = undefined;

      if (matchedRule) {
        if (language === 'hi') {
          responseText = matchedRule.responseHi;
        } else if (language === 'mr') {
          responseText = matchedRule.responseMr;
        } else {
          responseText = matchedRule.response;
        }
        checklist = matchedRule.checklist;
        relatedServiceId = matchedRule.relatedServiceId;
        relatedFormId = matchedRule.relatedFormId;
        suggestedPrompts = matchedRule.suggestedPrompts;
      } else {
        if (language === 'hi') {
          responseText = DEFAULT_ASSISTANT_RESPONSE.responseHi;
        } else if (language === 'mr') {
          responseText = DEFAULT_ASSISTANT_RESPONSE.responseMr;
        } else {
          responseText = DEFAULT_ASSISTANT_RESPONSE.response;
        }
        suggestedPrompts = [
          'How can I open a savings account?',
          'What documents are usually required to open an account?',
          'I want to change my registered mobile number.',
          'How do I add or change my nominee?'
        ];
      }

      const assistantMsg: ChatMessage = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checklist,
        relatedServiceId,
        relatedFormId,
        suggestedPrompts
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);

      // Auto read response if user was interacting via voice
      // (Optional convenience)
    }, 600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied response text to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewConversation = () => {
    stopSpeaking();
    setMessages(INITIAL_MESSAGES);
    setInputText('');
    showToast('Started a fresh conversation session.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col h-[calc(100vh-8.5rem)] min-h-[580px]">
      {/* 1. ASSISTANT TOP TOOLBAR */}
      <div className="bg-white rounded-2xl border border-[#E5E0EF] p-3.5 sm:p-4 mb-3 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateTo('dashboard')}
            className="p-1.5 text-[#777084] hover:text-[#272238] hover:bg-[#F8F7FC] rounded-lg transition-colors"
            title="Return to Dashboard"
            aria-label="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-xl bg-[#7755C9] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-bold text-[#272238]">BankEase Assistant</h1>
              <span className="text-[10px] font-semibold bg-[#F3EEFF] text-[#7755C9] px-2 py-0.5 rounded-full border border-[#DCD0FA]">
                Verified Demo Assistant
              </span>
            </div>
            <p className="text-[11px] text-[#777084]">Respectful, step-by-step guidance • English, हिन्दी, मराठी</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Speaking Indicator & Stop Button */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="px-2.5 py-1.5 rounded-xl bg-purple-100 text-[#7755C9] text-xs font-semibold flex items-center gap-1.5 animate-pulse"
              title="Stop audio playback"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stop Audio</span>
            </button>
          )}

          {/* Language Switch */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="text-xs bg-[#F8F7FC] text-[#272238] border border-[#E5E0EF] rounded-xl px-2.5 py-1.5 font-medium focus:outline-none focus:ring-1 focus:ring-[#7755C9]"
          >
            <option value="en">English (India)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>

          {/* New Chat Button */}
          <button
            onClick={handleNewConversation}
            className="p-2 text-[#777084] hover:text-[#7755C9] hover:bg-[#F3EEFF] rounded-xl transition-colors border border-transparent hover:border-[#DCD0FA]"
            title="Start New Conversation"
            aria-label="Start New Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CHAT MESSAGES DISPLAY */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-[#E5E0EF] p-4 sm:p-6 space-y-5 shadow-2xs">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';
          const isThisMsgSpeaking = currentSpeakingId === msg.id && isSpeaking;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAssistant ? '' : 'justify-end'}`}
            >
              {isAssistant && (
                <div className="w-8 h-8 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm space-y-3 ${
                  isAssistant
                    ? 'bg-[#F8F7FC] border border-[#E5E0EF] text-[#272238] rounded-tl-xs'
                    : 'bg-[#7755C9] text-white rounded-tr-xs shadow-xs'
                }`}
              >
                {/* Message Body with simple markdown line splitting */}
                <div className="space-y-2 whitespace-pre-line leading-relaxed">
                  {msg.text.split('\n\n').map((para, pIdx) => {
                    if (para.startsWith('### ')) {
                      return (
                        <h4 key={pIdx} className="text-xs sm:text-sm font-bold text-[#4B347F] pt-1">
                          {para.replace('### ', '')}
                        </h4>
                      );
                    }
                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>

                {/* Checklist Badge preview if available */}
                {msg.checklist && msg.checklist.length > 0 && (
                  <div className="pt-2 border-t border-[#E5E0EF] space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#4B347F] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7755C9]" />
                      Core Checklist:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.checklist.map((item, cIdx) => (
                        <span key={cIdx} className="text-[11px] bg-white text-[#272238] border border-[#E5E0EF] px-2 py-0.5 rounded-md">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contextual Action Links (Open Form or Open Service) */}
                {isAssistant && (msg.relatedServiceId || msg.relatedFormId) && (
                  <div className="pt-2 flex flex-wrap gap-2 border-t border-[#E5E0EF]">
                    {msg.relatedServiceId && (
                      <button
                        onClick={() => setSelectedServiceId(msg.relatedServiceId!)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-[#DCD0FA] text-[#7755C9] font-semibold hover:bg-[#F3EEFF] transition-colors flex items-center gap-1.5"
                      >
                        <Layers className="w-3 h-3" />
                        <span>View Service Details</span>
                      </button>
                    )}
                    {msg.relatedFormId && (
                      <button
                        onClick={() => setSelectedFormId(msg.relatedFormId!)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-[#7755C9] text-white font-semibold hover:bg-[#4B347F] transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Start Guided Form</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Suggested Prompts */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="pt-2 border-t border-[#E5E0EF] space-y-1.5">
                    <span className="text-[11px] text-[#777084] font-medium block">Suggested follow-ups:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((prompt, prIdx) => (
                        <button
                          key={prIdx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] bg-white hover:bg-[#F3EEFF] text-[#4B347F] border border-[#E5E0EF] hover:border-[#7755C9] px-2.5 py-1 rounded-lg text-left transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom message controls (Read aloud, Copy, Timestamp) */}
                {isAssistant && (
                  <div className="pt-1.5 flex items-center justify-between text-[11px] text-[#777084]">
                    <span>{msg.timestamp}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          if (isThisMsgSpeaking) {
                            stopSpeaking();
                          } else {
                            speak(msg.text, msg.id);
                          }
                        }}
                        className={`p-1.5 rounded-md hover:bg-white transition-colors ${
                          isThisMsgSpeaking ? 'text-[#7755C9] font-bold bg-white' : 'text-[#777084]'
                        }`}
                        title={isThisMsgSpeaking ? 'Stop speaking' : 'Read answer aloud'}
                        aria-label={isThisMsgSpeaking ? 'Stop speaking' : 'Read answer aloud'}
                      >
                        {isThisMsgSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="p-1.5 rounded-md hover:bg-white text-[#777084] transition-colors"
                        title="Copy text"
                        aria-label="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#F8F7FC] border border-[#E5E0EF] rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5 text-xs text-[#777084]">
              <span className="w-2 h-2 rounded-full bg-[#7755C9] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#7755C9] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#7755C9] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 font-medium">Checking banking guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. LISTENING PULSE / PERMISSION WARNING OVERLAY */}
      {isListening && (
        <div className="bg-[#4B347F] text-white rounded-2xl p-3 my-2 flex items-center justify-between gap-3 shadow-md animate-in fade-in duration-150">
          <div className="flex items-center gap-3">
            {/* Animated Audio Wave Bars */}
            <div className="flex items-center gap-1 h-6">
              <span className="w-1 bg-[#DCD0FA] rounded-full h-3 animate-voice-1" />
              <span className="w-1 bg-[#DCD0FA] rounded-full h-5 animate-voice-2" />
              <span className="w-1 bg-[#DCD0FA] rounded-full h-6 animate-voice-3" />
              <span className="w-1 bg-[#DCD0FA] rounded-full h-4 animate-voice-4" />
              <span className="w-1 bg-[#DCD0FA] rounded-full h-2 animate-voice-5" />
            </div>
            <div>
              <p className="text-xs font-bold">Listening for your banking question...</p>
              <p className="text-[11px] text-[#DCD0FA] truncate max-w-sm">
                {interimTranscript || transcript || 'Speak clearly into your microphone'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={stopListening}
              className="px-3 py-1 bg-white text-[#4B347F] rounded-lg text-xs font-semibold hover:bg-[#F3EEFF] transition-colors"
            >
              Done Speaking
            </button>
            <button
              onClick={cancelListening}
              className="px-2 py-1 text-white/80 hover:text-white text-xs underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {permissionError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-2.5 my-2 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{permissionError}</span>
          </div>
          <button
            onClick={() => setInputText('')}
            className="text-[11px] font-bold text-amber-900 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 4. CHAT INPUT BAR WITH MICROPHONE & SEND */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-3 bg-white rounded-2xl border-2 border-[#E5E0EF] focus-within:border-[#7755C9] p-2 flex items-center gap-2 shadow-sm transition-all"
      >
        <input
          type="text"
          placeholder={
            isListening 
              ? 'Speaking... recognized text appears here...' 
              : 'Type or speak your banking question in plain language...'
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 text-xs sm:text-sm bg-transparent text-[#272238] focus:outline-none placeholder-[#777084]"
        />

        {/* Microphone Button */}
        {isListening ? (
          <button
            type="button"
            onClick={stopListening}
            className="p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
            title="Stop Listening"
            aria-label="Stop Listening"
          >
            <MicOff className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={startListening}
            className="p-2.5 rounded-xl bg-[#F3EEFF] hover:bg-[#DCD0FA] text-[#7755C9] transition-colors"
            title={
              isSpeechRecognitionSupported
                ? 'Speak using microphone'
                : 'Speech recognition unavailable in this browser (use Chrome/Edge/Safari)'
            }
            aria-label="Speak using microphone"
          >
            <Mic className="w-4 h-4" />
          </button>
        )}

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() && !isListening}
          className="px-4 py-2.5 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] disabled:opacity-50 disabled:pointer-events-none text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all shrink-0"
          aria-label="Send message"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Bottom disclaimer note */}
      <div className="pt-2 text-center text-[11px] text-[#777084] flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#7755C9]" />
        <span>BankEase Assistant provides procedure guidance only. Never share real banking passwords, OTPs, or CVVs.</span>
      </div>
    </div>
  );
};
