import { useState, useEffect, useRef, useCallback } from 'react';
import { SupportedLanguage } from '../types';

// Extend window interface for Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export interface VoiceAssistantHook {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  isSpeaking: boolean;
  currentSpeakingId: string | null;
  isSpeechRecognitionSupported: boolean;
  isSpeechSynthesisSupported: boolean;
  permissionError: string | null;
  startListening: () => void;
  stopListening: () => void;
  cancelListening: () => void;
  clearTranscript: () => void;
  speak: (text: string, messageId?: string) => void;
  stopSpeaking: () => void;
  currentLanguage: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  voiceSpeed: number;
  setVoiceSpeed: (speed: number) => void;
}

export function useVoiceAssistant(
  initialLanguage: SupportedLanguage = 'en',
  initialVoiceSpeed: number = 1.0
): VoiceAssistantHook {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(initialVoiceSpeed);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const isSpeechRecognitionSupported = typeof window !== 'undefined' && 
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const isSpeechSynthesisSupported = typeof window !== 'undefined' && 
    'speechSynthesis' in window;

  // Map app languages to BCP-47 language tags for SpeechRecognition
  const getLanguageTag = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'mr':
        return 'mr-IN';
      case 'en':
      default:
        return 'en-IN';
    }
  };

  // Initialize SpeechRecognition instance
  useEffect(() => {
    if (!isSpeechRecognitionSupported) return;

    const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionConstructor();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = getLanguageTag(currentLanguage);

    recognition.onstart = () => {
      setIsListening(true);
      setPermissionError(null);
    };

    recognition.onresult = (event: any) => {
      let finalStr = '';
      let interimStr = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalStr += item[0].transcript;
        } else {
          interimStr += item[0].transcript;
        }
      }

      if (finalStr) {
        setTranscript((prev) => (prev ? `${prev} ${finalStr}` : finalStr));
        setInterimTranscript('');
      } else {
        setInterimTranscript(interimStr);
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setInterimTranscript('');
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        setPermissionError('Microphone permission was denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'no-speech') {
        // No speech detected, not fatal
        setPermissionError('No speech was detected. Please try clicking the microphone and speaking again.');
      } else if (event.error === 'audio-capture') {
        setPermissionError('No microphone detected. Please check that your device microphone is connected.');
      } else {
        setPermissionError(`Voice recognition status: ${event.error}. You can also type your question.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch {
        // ignore
      }
    };
  }, [currentLanguage, isSpeechRecognitionSupported]);

  // Clean markdown syntax before speaking for natural audio pronunciation
  const cleanTextForSpeech = (text: string): string => {
    return text
      .replace(/###+/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`[^`]+`/g, '')
      .replace(/^[•\-\*]\s+/gm, '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // strip emojis for smoother speech
      .trim();
  };

  const startListening = useCallback(() => {
    if (!isSpeechRecognitionSupported) {
      setPermissionError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari, or type your question.');
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
    }

    setPermissionError(null);
    setTranscript('');
    setInterimTranscript('');

    try {
      if (recognitionRef.current) {
        recognitionRef.current.lang = getLanguageTag(currentLanguage);
        recognitionRef.current.start();
      }
    } catch (e: any) {
      if (e?.name === 'InvalidStateError') {
        // Already started
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      } else {
        setPermissionError('Unable to start microphone. Please try again or type directly.');
      }
    }
  }, [isSpeechRecognitionSupported, isSpeaking, currentLanguage]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, [isListening]);

  const cancelListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  const stopSpeaking = useCallback(() => {
    if (isSpeechSynthesisSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentSpeakingId(null);
  }, [isSpeechSynthesisSupported]);

  const speak = useCallback((rawText: string, messageId?: string) => {
    if (!isSpeechSynthesisSupported || !window.speechSynthesis) {
      return;
    }

    // Cancel existing speech
    window.speechSynthesis.cancel();

    const cleanText = cleanTextForSpeech(rawText);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = voiceSpeed;
    utterance.pitch = 1.0;

    const langTag = getLanguageTag(currentLanguage);
    utterance.lang = langTag;

    // Try finding matching voice
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.startsWith(currentLanguage) || v.lang.startsWith(langTag)
    ) || voices.find((v) => v.lang.includes('IN')) || voices[0];

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingId(messageId || 'generic');
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeechSynthesisSupported, voiceSpeed, currentLanguage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    isSpeaking,
    currentSpeakingId,
    isSpeechRecognitionSupported,
    isSpeechSynthesisSupported,
    permissionError,
    startListening,
    stopListening,
    cancelListening,
    clearTranscript,
    speak,
    stopSpeaking,
    currentLanguage,
    setLanguage: setCurrentLanguage,
    voiceSpeed,
    setVoiceSpeed
  };
}
