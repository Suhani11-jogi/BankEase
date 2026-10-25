import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  scenario: string;
  options: { label: string; isSafe: boolean; explanation: string }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    scenario: 'You are selling a study table on an online marketplace. A buyer says: "I will pay you ₹3,000 right now. Please scan this QR code and type your 4-digit UPI PIN to accept the money."',
    options: [
      {
        label: 'Scan the QR and enter my PIN to receive the ₹3,000.',
        isSafe: false,
        explanation: 'Scam Alert! Entering your UPI PIN always DEBITS money from your account. You NEVER need to enter your PIN or scan a QR code to receive money.'
      },
      {
        label: 'Refuse. Provide only my UPI ID / mobile number and tell them PIN is never required to receive funds.',
        isSafe: true,
        explanation: 'Correct! When someone sends money to your UPI ID or mobile, it credits automatically without requiring your PIN.'
      }
    ]
  },
  {
    id: 2,
    scenario: 'You receive a call: "Hello, this is Bank Manager Sharma. An accidental charge of ₹12,000 occurred on your card. To cancel this charge immediately, please read out the 6-digit OTP sent to your phone."',
    options: [
      {
        label: 'Give the caller the OTP quickly so the charge is cancelled.',
        isSafe: false,
        explanation: 'Danger! OTPs are used ONLY to authorize payments, NEVER to cancel them. Bank managers will never ask for your OTP.'
      },
      {
        label: 'Hang up immediately and check my card transactions inside the official bank app.',
        isSafe: true,
        explanation: 'Correct! Bank officials never ask for OTPs or PINs. Always verify independently through official channels.'
      }
    ]
  },
  {
    id: 3,
    scenario: 'You receive an SMS: "Dear Customer, your bank account is blocked due to non-updated KYC. Click bit.ly/bank-kyc-update to unblock immediately."',
    options: [
      {
        label: 'Click the link and fill in my net banking password and debit card details.',
        isSafe: false,
        explanation: 'Phishing trap! Banks never send shortened links via SMS asking you to type banking passwords or card numbers.'
      },
      {
        label: 'Ignore the link, delete the SMS, and check KYC status inside my official banking app.',
        isSafe: true,
        explanation: 'Spot on! Real KYC can be done safely through the bank\'s verified app or at the local branch, never via unsolicited SMS links.'
      }
    ]
  },
  {
    id: 4,
    scenario: 'You search Google for your bank\'s customer care number and call a 10-digit mobile number found in the search results. The person asks you to download "AnyDesk" or "QuickSupport" so they can inspect your phone.',
    options: [
      {
        label: 'Download the app so customer care can fix my banking problem.',
        isSafe: false,
        explanation: 'High risk! AnyDesk shares your phone screen with fraudsters, allowing them to view your bank balance, OTPs, and passwords.'
      },
      {
        label: 'Refuse to install screen-sharing software and dial the official 1800 number printed on my debit card.',
        isSafe: true,
        explanation: 'Excellent! Legitimate customer support staff inspect backend system logs—they never need to view your mobile phone screen.'
      }
    ]
  }
];

export const ScamQuizModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    if (currentQ.options[idx].isSafe) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-[#E5E0EF] space-y-5 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-[#E5E0EF] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F3EEFF] text-[#7755C9] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#272238]">Scam Awareness Quiz</h3>
              <p className="text-[11px] text-[#777084]">Test your real-world banking safety knowledge</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#777084] hover:text-[#272238] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#777084]">
              <span>Scenario {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="font-semibold text-[#7755C9]">Score: {score}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F7FC] border border-[#E5E0EF]">
              <p className="text-sm font-semibold text-[#272238] leading-relaxed">
                {currentQ.scenario}
              </p>
            </div>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'border-[#E5E0EF] hover:bg-[#F8F7FC] text-[#272238]';

                if (selectedOption !== null) {
                  if (opt.isSafe) {
                    btnStyle = 'border-green-400 bg-green-50 text-green-900 font-semibold';
                  } else if (isSelected && !opt.isSafe) {
                    btnStyle = 'border-red-400 bg-red-50 text-red-900 font-semibold';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${btnStyle}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 text-xs mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation box after choice */}
            {selectedOption !== null && (
              <div 
                className={`p-3.5 rounded-xl text-xs space-y-1 animate-in fade-in duration-150 ${
                  currentQ.options[selectedOption].isSafe 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {currentQ.options[selectedOption].isSafe ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                  <span>{currentQ.options[selectedOption].isSafe ? 'Safe Decision!' : 'Security Risk!'}</span>
                </div>
                <p>{currentQ.options[selectedOption].explanation}</p>
              </div>
            )}

            {selectedOption !== null && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  {currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Results'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3EEFF] text-[#7755C9] border border-[#DCD0FA] flex items-center justify-center mx-auto text-2xl font-bold">
              {score}/{QUIZ_QUESTIONS.length}
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#272238]">
                {score === QUIZ_QUESTIONS.length
                  ? 'Banking Safety Champion! 🛡️'
                  : score >= 2
                  ? 'Good Awareness!'
                  : 'Safety Practice Needed'}
              </h4>
              <p className="text-xs sm:text-sm text-[#777084] max-w-sm mx-auto">
                {score === QUIZ_QUESTIONS.length
                  ? 'You demonstrated perfect awareness. You know never to scan QR codes to receive money or share OTPs!'
                  : 'Remember the golden rule: Bank staff never ask for OTPs or PINs, and you never scan QR codes to receive money.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl border border-[#DCD0FA] bg-[#F8F7FC] hover:bg-[#F3EEFF] text-xs sm:text-sm font-semibold text-[#4B347F] flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Retry Quiz
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#7755C9] hover:bg-[#4B347F] text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
