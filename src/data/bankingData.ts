import { BankingService, BankingForm, GovernmentScheme, FraudTopic } from '../types';

export const BANKING_SERVICES: BankingService[] = [
  // A. Account Services
  {
    id: 'savings-account-opening',
    title: 'Savings Account Opening Guidance',
    titleHi: 'बचत खाता खोलने का मार्गदर्शन',
    titleMr: 'बचत खाते उघडण्याचे मार्गदर्शन',
    category: 'account',
    shortDescription: 'Step-by-step guidance on opening a basic savings or regular deposit account with any commercial bank.',
    fullOverview: 'A savings account allows you to securely store your money, earn nominal quarterly interest, and access banking channels (debit card, internet banking, UPI). Banks offer standard savings accounts, zero-balance Basic Savings Bank Deposit Accounts (BSBDA), and specialized senior citizen or women savings accounts.',
    requiredDocuments: [
      'Proof of Identity (Aadhaar Card, Passport, Voter ID, or Driving License)',
      'Proof of Address (Aadhaar Card, recent Utility Bill, or Rental Agreement)',
      'Permanent Account Number (PAN) Card or Form 60',
      'Two recent passport-sized colored photographs',
      'Initial minimum deposit cheque or cash (if not a zero-balance BSBDA account)'
    ],
    onlineSteps: [
      'Visit the official website or verified mobile app of your preferred bank.',
      'Select "Open Savings Account" and choose either Video-KYC (instant) or Branch verification.',
      'Enter your mobile number linked to your Aadhaar card to receive OTP.',
      'Upload scanned copies of PAN card, photograph, and sign digitally on plain white paper.',
      'Complete the 2-minute Video-KYC call with the bank officer during banking hours.'
    ],
    branchSteps: [
      'Visit the nearest home branch of the chosen bank with original documents and photocopies.',
      'Ask the customer service desk for the "Account Opening Form (AOF)".',
      'Fill in applicant details, nominee information, and initial deposit denomination.',
      'Affix signatures across photographs and on designated account declaration pages.',
      'Collect the stamped acknowledgement receipt; welcome kit arrives in 5-7 business days.'
    ],
    typicalTimeframe: 'Instant to 24 hours via Video-KYC; 2-4 working days via physical branch.',
    safetyCaution: 'Never let unauthorized agents open an account on your behalf or share OTP sent by the bank.',
    associatedFormId: 'form-savings-account',
    popular: true,
  },
  {
    id: 'current-account-opening',
    title: 'Current Account Opening Guidance',
    titleHi: 'चालू खाता खोलने का मार्गदर्शन',
    titleMr: 'चालू खाते उघडण्याचे मार्गदर्शन',
    category: 'account',
    shortDescription: 'Guidance for business owners, proprietors, professionals, and traders to operate high-transaction accounts.',
    fullOverview: 'Current accounts are designed for daily business transactions with no limit on deposits or withdrawals. Unlike savings accounts, they generally do not earn interest and require higher average monthly or quarterly balances.',
    requiredDocuments: [
      'Entity Registration Certificate (GSTIN Certificate, Shop & Establishment Act license, or MSME Udyam)',
      'PAN Card of the Enterprise / Sole Proprietorship',
      'Identity and address proof of all authorized signatories or partners',
      'Partnership Deed or Memorandum & Articles of Association (if applicable)',
      'Board Resolution authorizing opening of bank account (for companies)'
    ],
    onlineSteps: [
      'Check bank eligibility for Digital Current Accounts based on your GST and Udyam credentials.',
      'Provide business registration number and auto-fetch business address.',
      'Upload beneficial owner identity and address proofs.',
      'Schedule a physical doorstep verification or visit branch with entity stamp.'
    ],
    branchSteps: [
      'Visit the business banking desk with entity rubber stamps and original registration certificates.',
      'Submit the commercial account opening dossier with signatures of authorized signatories.',
      'Submit the initial deposit cheque from existing registered business account if required.'
    ],
    typicalTimeframe: '3 to 7 working days following business premises verification.',
    safetyCaution: 'Always specify transaction authorization limits and multiple signatories for business security.',
    associatedFormId: 'form-current-account',
  },
  {
    id: 'account-maintenance',
    title: 'Account Maintenance & Dormancy Activation',
    titleHi: 'खाता रखरखाव एवं निष्क्रिय खाता सक्रियता',
    titleMr: 'खाते देखभाल आणि निष्क्रिय खाते सक्रिय करणे',
    category: 'account',
    shortDescription: 'How to re-activate an inoperative (dormant) account and avoid non-maintenance penalty charges.',
    fullOverview: 'An account is categorized as "inoperative" or "dormant" if there are no customer-induced transactions for over two years. Dormant accounts still earn interest, but withdrawals, debit card swipes, and net banking are restricted for customer protection.',
    requiredDocuments: [
      'Latest KYC documents (Aadhaar Card and PAN Card)',
      'Passbook or recent statement showing account number',
      'Written application request letter for account reactivation',
      'Passport size photograph'
    ],
    onlineSteps: [
      'Some banks permit re-KYC via net banking or mobile app if your mobile number has not changed.',
      'Log into net banking and navigate to Service Requests > Account Reactivation / Re-KYC.',
      'Verify via OTP and upload fresh identity and address proof.'
    ],
    branchSteps: [
      'Visit the home branch with original KYC documents.',
      'Submit the reactivation letter along with self-attested document copies.',
      'Perform a nominal deposit or withdrawal at the teller counter to generate a customer-initiated entry.'
    ],
    typicalTimeframe: 'Within 24 to 48 hours after KYC re-verification.',
    safetyCaution: 'Banks never charge any fee for reactivating an inoperative account per RBI regulations.',
  },
  {
    id: 'account-closure',
    title: 'Bank Account Closure Procedure',
    titleHi: 'बैंक खाता बंद करने की प्रक्रिया',
    titleMr: 'बँक खाते बंद करण्याची पद्धत',
    category: 'account',
    shortDescription: 'Clear steps to safely close an unused bank account and transfer your remaining funds.',
    fullOverview: 'Closing an unused bank account prevents unnecessary minimum-balance penalties, debit card annual fees, and dormant risks. Before closing, ensure all auto-debits (EMIs, SIPs, utility bills) are migrated to another active account.',
    requiredDocuments: [
      'Account Closure Request Form (available at branch or BankEase template)',
      'Unused cheque leaves to be surrendered or cancelled',
      'Active Debit / ATM card to be surrendered or cut across the chip',
      'Original Passbook (bank will cancel and return it to you)',
      'Alternative active bank account details (cheque or passbook copy) for balance transfer'
    ],
    onlineSteps: [
      'A few digital banks support online closure via mobile app under Profile > Account Settings > Close Account.',
      'Verify that balance is zero or specify an alternate bank account IFSC and account number for NEFT payout.'
    ],
    branchSteps: [
      'Ensure zero pending overdraft or negative balance charges.',
      'Hand over the closure application along with your cut debit card and unused cheque book.',
      'Receive remaining balance via cash (if under limit) or instant NEFT/cheque to your other bank.'
    ],
    typicalTimeframe: 'Usually completed within 2 to 3 working days.',
    safetyCaution: 'Always collect the official stamped Account Closure Acknowledgement slip.',
    associatedFormId: 'form-account-closure',
  },
  {
    id: 'joint-account-operations',
    title: 'Joint Account Procedures & Mandates',
    titleHi: 'संयुक्त खाता प्रक्रिया एवं संचालन अधिकार',
    titleMr: 'संयुक्त खाते कार्यपद्धती',
    category: 'account',
    shortDescription: 'Understanding "Either or Survivor", "Former or Survivor", and adding joint holders.',
    fullOverview: 'Joint accounts allow two or more individuals (spouses, parents and children, business partners) to hold an account together. The mandate determines who can withdraw money and what happens in the event of an untimely demise.',
    requiredDocuments: [
      'KYC documents of both/all account applicants',
      'Joint Account mandate declaration form',
      'Photographs and signatures of all holders'
    ],
    onlineSteps: [
      'Review existing account type under Net Banking > Account Details > Mode of Operation.',
      'Most mandate modifications require physical consent of all joint parties.'
    ],
    branchSteps: [
      'Both primary and secondary holders must visit the branch in person.',
      'Sign the Joint Account Addition / Mandate change form in front of the bank manager.',
      'Select mandate: "Either or Survivor" (any person can withdraw) or "Jointly" (both signatures required).'
    ],
    typicalTimeframe: '3 to 5 business days.',
    safetyCaution: 'Choose "Either or Survivor" carefully to prevent disputes in daily transaction authorizations.',
  },
  {
    id: 'nominee-update',
    title: 'Nominee Addition, Update, or Removal',
    titleHi: 'नॉमिनी (वारिसदार) जोड़ना या बदलना',
    titleMr: 'वारसदार (नॉमिनी) जोडणे किंवा बदलणे',
    category: 'account',
    shortDescription: 'Safeguard your savings for your loved ones by maintaining an up-to-date registered nominee.',
    fullOverview: 'Nomination ensures that in the event of the account holder\'s demise, the funds in the bank account can be released to the nominee without lengthy court succession procedures. Nomination can be added (Form DA1), cancelled (Form DA2), or modified (Form DA3).',
    requiredDocuments: [
      'Nominee full legal name, date of birth, and relationship with account holder',
      'Nominee address proof (if different from account holder)',
      'If nominee is a minor (under 18), details and signature of a legally appointed guardian',
      'Account number and passbook copy'
    ],
    onlineSteps: [
      'Log into your bank\'s net banking portal or official mobile app.',
      'Navigate to Services > Nominee Details / Manage Nomination.',
      'Enter nominee name, relationship, age, and address.',
      'Authenticate with OTP sent to your registered mobile number.'
    ],
    branchSteps: [
      'Ask for Form DA1 (New Nomination) or Form DA3 (Change of Nominee).',
      'Fill in the nominee details and sign. If using thumb impression, two witnesses are required.',
      'Submit the form and get the counterfoil stamped with "Nomination Registered".'
    ],
    typicalTimeframe: 'Instant online; 24 to 48 hours via branch.',
    safetyCaution: 'Check your passbook or statement to confirm the message "Nomination Registered" appears.',
    associatedFormId: 'form-nominee-update',
    popular: true,
  },

  // B. Debit Card & ATM Services
  {
    id: 'debit-card-application',
    title: 'Debit Card Application & Replacement',
    titleHi: 'डेबिट कार्ड नया आवेदन एवं पुनः जारी करना',
    titleMr: 'डेबिट कार्ड अर्ज आणि बदलणे',
    category: 'debit_atm',
    shortDescription: 'Apply for a new EMV chip debit card, replace an expired or damaged card, or upgrade card tier.',
    fullOverview: 'A debit card allows ATM cash withdrawals, point-of-sale card swipes, and secure online e-commerce transactions. Modern cards feature contactless NFC tap-and-pay and international roaming toggles.',
    requiredDocuments: [
      'Savings or Current Account number',
      'Identity verification via Registered Mobile Number OTP or branch signature',
      'Updated communication address proof if your current delivery address has changed'
    ],
    onlineSteps: [
      'Open your bank mobile app and tap Cards > Debit Card > Apply New / Re-issue.',
      'Select card network (RuPay, Visa, or Mastercard) and card variant.',
      'Confirm your delivery address displayed on the screen.',
      'Authorize via MPIN or SMS OTP; track speed post dispatch with tracking number.'
    ],
    branchSteps: [
      'Collect "Debit Card Request Form" at branch or get an Instant Green Debit Card kit over the counter.',
      'Fill in account details and choose desired card type.',
      'Submit form; personalized cards are delivered to registered address in 5-7 days.'
    ],
    typicalTimeframe: 'Instant for non-personalized over-the-counter kit; 5-7 business days for personalized name card.',
    safetyCaution: 'Bank staff will never ask for your card PIN, CVV, or card expiry date.',
    associatedFormId: 'form-debit-card',
    popular: true,
  },
  {
    id: 'card-blocking-lost',
    title: 'Instant Card Blocking & Lost Card Protocol',
    titleHi: 'कार्ड तुरंत ब्लॉक करना एवं खोए हुए कार्ड की सुरक्षा',
    titleMr: 'कार्ड त्वरित ब्लॉक करणे व हरवलेले कार्ड',
    category: 'debit_atm',
    shortDescription: 'Emergency steps to immediately block your debit or credit card to prevent unauthorized usage.',
    fullOverview: 'If your card is misplaced, stolen, or swallowed by an ATM, blocking it immediately eliminates your financial liability for any subsequent unauthorized transactions under RBI\'s limited liability framework.',
    requiredDocuments: [
      'Bank registered mobile number or account number',
      'Last 4 digits of card (if known, but NOT mandatory for emergency block)'
    ],
    onlineSteps: [
      'Open your bank mobile app > Debit Cards > Manage Limits / Status > Toggle to "Temporary Lock" or "Permanent Block".',
      'Send an emergency SMS from your registered mobile (e.g. "BLOCK XXXX" to your bank\'s designated emergency shortcode).',
      'Call the 24x7 toll-free emergency card hotline printed on your bank statement.'
    ],
    branchSteps: [
      'Visit any nearby branch and notify customer service for immediate terminal hotlisting.',
      'Request an instant replacement card kit if available.'
    ],
    typicalTimeframe: 'Immediate (within seconds).',
    safetyCaution: 'Do not search for bank customer care numbers on random Google search or social media. Use official numbers only.',
    associatedFormId: 'form-card-blocking',
    popular: true,
  },
  {
    id: 'pin-generation-reset',
    title: 'ATM PIN Generation & Green PIN Reset',
    titleHi: 'एटीएम पिन बनाना एवं ग्रीन पिन रीसेट',
    titleMr: 'एटीएम पिन तयार करणे आणि बदलणे',
    category: 'debit_atm',
    shortDescription: 'Generate a new 4-digit ATM PIN using Green PIN service via ATM, SMS, or Mobile Banking.',
    fullOverview: 'Banks no longer mail paper PIN mailers. Instead, the eco-friendly "Green PIN" method allows cardholders to securely generate or reset their 4-digit PIN at any bank ATM, net banking portal, or mobile app.',
    requiredDocuments: [
      'Active Debit Card and bank account number',
      'Registered mobile number phone to receive 6-digit OTP'
    ],
    onlineSteps: [
      'Login to bank mobile app > Cards > Set / Reset ATM PIN.',
      'Enter new 4-digit PIN, re-enter to confirm, and authorize with OTP.',
      'Your card is immediately active for transactions.'
    ],
    branchSteps: [
      'Insert your card into any home bank ATM.',
      'Select "PIN Generation / Green PIN" on the welcome screen.',
      'Enter your 11-digit account number; an OTP will arrive on your mobile.',
      'Re-insert card, enter OTP, and key in your chosen new 4-digit secret PIN.'
    ],
    typicalTimeframe: 'Immediate (real-time).',
    safetyCaution: 'Never write your PIN on the back of your card, in your wallet, or share it with bank staff.',
  },

  // C. Cheque & Passbook Services
  {
    id: 'cheque-book-request',
    title: 'Cheque Book Request & Tracking',
    titleHi: 'चेक बुक अनुरोध एवं ट्रैकिंग',
    titleMr: 'चेक बुक मागणी व ट्रॅकिंग',
    category: 'cheque_passbook',
    shortDescription: 'Request a new personalized cheque book (20, 50, or 100 leaves) delivered securely to your door.',
    fullOverview: 'Cheque books are required for high-value payments, property transactions, school fees, and legal undertakings. Many accounts include one free 20-leaf cheque book per financial year.',
    requiredDocuments: [
      'Savings / Current account with KYC up to date',
      'Confirmed registered postal address'
    ],
    onlineSteps: [
      'Open Net Banking or Mobile App > Cheques > Request Cheque Book.',
      'Select number of leaves (25, 50, 100) and dispatch address.',
      'Confirm with OTP; track package dispatch status online.'
    ],
    branchSteps: [
      'Submit the reorder slip found at the back of your previous cheque book into the branch drop-box.',
      'Or fill out the standard Cheque Book Requisition form at customer counter.'
    ],
    typicalTimeframe: '3 to 5 business days delivered via registered post.',
    safetyCaution: 'Always check that the envelope seal is intact when delivered. Never sign blank cheque leaves.',
    associatedFormId: 'form-cheque-book',
  },
  {
    id: 'stop-payment-cheque',
    title: 'Stop Payment on Issued Cheque',
    titleHi: 'जारी किए गए चेक का भुगतान रोकना (स्टॉप पेमेंट)',
    titleMr: 'दिलेल्या धनादेशाचे पेमेंट थांबवणे',
    category: 'cheque_passbook',
    shortDescription: 'Instantly halt payment on a lost, stolen, or disputed cheque before it is presented for clearing.',
    fullOverview: 'If a cheque leaf is lost, stolen, or the underlying trade agreement is cancelled before clearing, placing a "Stop Payment" mandate instructs the clearing department to return the cheque with the memo "Payment Stopped by Drawer".',
    requiredDocuments: [
      '6-digit Cheque Number',
      'Cheque date, beneficiary payee name, and exact amount (if known)',
      'Account number'
    ],
    onlineSteps: [
      'Login to Mobile App / Net Banking > Cheque Services > Stop Cheque Payment.',
      'Enter 6-digit cheque number and select reason (lost, dispute, cancelled).',
      'Authenticate with transaction password or OTP for instant cancellation.'
    ],
    branchSteps: [
      'Call your home branch immediately or visit customer service desk.',
      'Submit written letter or Stop Cheque instruction form with cheque number details.',
      'Collect acknowledgement copy confirming payment freeze.'
    ],
    typicalTimeframe: 'Immediate upon confirmation.',
    safetyCaution: 'Ensure stop payment is issued before the clearing cutoff time (normally 11:30 AM on banking days).',
    associatedFormId: 'form-stop-payment',
  },
  {
    id: 'bank-statement-passbook',
    title: 'Bank Statement & Passbook Update',
    titleHi: 'बैंक स्टेटमेंट एवं पासबुक अपडेट',
    titleMr: 'बँक स्टेटमेंट आणि पासबुक नोंदणी',
    category: 'cheque_passbook',
    shortDescription: 'Download official digital e-statements with password protection or print branch passbook.',
    fullOverview: 'Bank statements provide a legal record of all debits, credits, and closing balances for a given period (monthly, quarterly, or yearly). They are widely required for visa applications, income tax filing, and loan appraisals.',
    requiredDocuments: [
      'Account number and date range',
      'Net banking login or verified email address on file'
    ],
    onlineSteps: [
      'Open Mobile App > Accounts > View Statement / Download E-Statement.',
      'Select date range (last 1 month, 3 months, 6 months, or custom FY range).',
      'Choose PDF format. The file is usually password-protected (typically your DOB or PAN combination).'
    ],
    branchSteps: [
      'Insert your physical passbook into the self-service Passbook Printing Kiosk (available 24/7 in ATM lobbies).',
      'Or request a stamped physical statement at the teller desk (may carry a nominal charge).'
    ],
    typicalTimeframe: 'Instant download online; 5 minutes at self-service kiosk.',
    safetyCaution: 'E-statement PDF passwords are case-sensitive. Never forward unencrypted statements to unknown parties.',
    associatedFormId: 'form-statement-request',
  },

  // D. Personal Information Updates
  {
    id: 'address-change',
    title: 'Address Change & Communication Update',
    titleHi: 'पते में बदलाव एवं संचार विवरण अपडेट',
    titleMr: 'पत्ता बदल आणि संपर्काची माहिती',
    category: 'personal_info',
    shortDescription: 'Update your official correspondence and permanent residential address in bank records.',
    fullOverview: 'Maintaining your current address ensures that new debit cards, cheque books, and mandatory regulatory notices reach you safely. Banks distinguish between Permanent Address and Mailing / Correspondence Address.',
    requiredDocuments: [
      'Officially Valid Document (OVD) showing new address: Aadhaar Card, Passport, Voter ID, Driving License',
      'Electricity, Water, or Piped Gas bill not older than 2 months (for utility verification)',
      'Registered Rent Agreement / Lease Deed if residing in rented accommodation'
    ],
    onlineSteps: [
      'Log into Net Banking > Profile > Update Address.',
      'Select "Update via Aadhaar OTP" (if your Aadhaar already carries the new address).',
      'Authenticate with UIDAI OTP; address updates automatically within 24 hours.'
    ],
    branchSteps: [
      'Collect "Address Update Application Form" at the branch.',
      'Submit self-attested photocopy of new address proof along with original for verification.',
      'Bank officer validates and issues an update tracking token.'
    ],
    typicalTimeframe: '24 hours via Aadhaar e-KYC; 3-4 working days via physical branch proof.',
    safetyCaution: 'Ensure your Aadhaar is updated at your local post office or UIDAI center before attempting online address sync.',
    associatedFormId: 'form-address-change',
    popular: true,
  },
  {
    id: 'mobile-email-update',
    title: 'Registered Mobile Number & Email Change',
    titleHi: 'मोबाइल नंबर एवं ईमेल पता परिवर्तन',
    titleMr: 'नोंदणीकृत मोबाईल नंबर आणि ईमेल बदल',
    category: 'personal_info',
    shortDescription: 'Critical update for receiving transaction SMS alerts, OTPs, and security verification codes.',
    fullOverview: 'Because the registered mobile number is the primary authentication factor for OTPs and UPI, banks have stringent multi-step security protocols for changing it to prevent unauthorized account takeover.',
    requiredDocuments: [
      'Original Aadhaar card or PAN card',
      'Existing Debit Card with working PIN (for ATM channel update)',
      'Physical presence of account holder at home branch'
    ],
    onlineSteps: [
      'Some banks permit mobile update via Net Banking if you have both old and new SIM cards to verify OTPs.',
      'Navigate to Profile > Contact Details > Change Mobile Number.'
    ],
    branchSteps: [
      'Option A (ATM): Insert debit card at home bank ATM > Select "Registration / Mobile Update" > Enter new number > Verify SMS codes sent to both numbers.',
      'Option B (Branch): Visit home branch in person, fill Mobile Update Form, provide biometric fingerprint or signature, and present original ID.'
    ],
    typicalTimeframe: '4 to 24 hours after dual authentication.',
    safetyCaution: 'Beware of "SIM swap" scams. If your phone suddenly loses signal unexpectedly, notify your telecom operator and bank immediately.',
    associatedFormId: 'form-mobile-update',
    popular: true,
  },
  {
    id: 'kyc-rekyc-guidance',
    title: 'KYC & Periodic Re-KYC Update',
    titleHi: 'केवाईसी एवं आवधिक पुन: सत्यापन (री-केवाईसी)',
    titleMr: 'केवायसी आणि नियमित पडताळणी',
    category: 'personal_info',
    shortDescription: 'Satisfy RBI periodic verification rules to keep your account operational and prevent account freeze.',
    fullOverview: 'Under Reserve Bank of India guidelines, banks must refresh customer identity records periodically: every 2 years for high-risk, 8 years for medium-risk, and 10 years for low-risk customers. If there is no change in your address, re-KYC can be submitted by simple self-declaration.',
    requiredDocuments: [
      'Self-attested copy of Aadhaar Card and PAN Card',
      'Passport size colored photograph',
      'Self-declaration letter confirming "No Change in Status" if details are identical'
    ],
    onlineSteps: [
      'If your details have NOT changed, simply submit a self-declaration via Net Banking / Mobile App with one click.',
      'If details have changed, upload new address proof or authorize via Aadhaar OTP.'
    ],
    branchSteps: [
      'Submit the single-page Re-KYC form along with your Aadhaar copy and signed photo at any branch.',
      'Receive official acknowledgement of KYC compliance.'
    ],
    typicalTimeframe: 'Instant online self-declaration; 2-3 business days at branch.',
    safetyCaution: 'Banks NEVER ask you to click a link in an SMS to update KYC. Scammers use fake "KYC Expired" SMS to steal credentials.',
    associatedFormId: 'form-rekyc',
    popular: true,
  },

  // E. Payments & Transaction Assistance
  {
    id: 'failed-transaction-guidance',
    title: 'Failed Transaction & Auto-Reversal (TAT)',
    titleHi: 'विफल लेन-देन एवं ऑटो-रिवर्सल समय सीमा',
    titleMr: 'अयशस्वी व्यवहार व पैसे परत मिळण्याची प्रक्रिया',
    category: 'payments_upi',
    shortDescription: 'Money deducted but not credited to merchant or ATM? Know RBI\'s T+5 compensation guidelines.',
    fullOverview: 'When an ATM fails to dispense cash or an online card transaction fails mid-way, money is frequently held in an intermediary clearing account. Under RBI circulars, banks must reverse failed transactions within fixed turnaround times (T+1 to T+5 days), failing which the bank must pay compensation of ₹100 per day of delay.',
    requiredDocuments: [
      'Transaction Reference Number / RRN (12 digits)',
      'Date, time, and exact amount of transaction',
      'ATM ID or merchant name'
    ],
    onlineSteps: [
      'Open Bank App > Transaction History > Tap the failed entry > Select "Raise Dispute / Complain".',
      'Select reason (e.g. "Cash not dispensed", "Account debited but merchant unpaid").',
      'Save the Dispute Ticket Reference number for tracking.'
    ],
    branchSteps: [
      'Fill in the standard ATM / Transaction Dispute form.',
      'Attach ATM receipt slip showing "Transaction Failed / Timeout" if available.'
    ],
    typicalTimeframe: 'Auto-reversed in 24 to 48 hours; regulatory maximum T+5 business days.',
    safetyCaution: 'Do not repeat the transaction immediately if your account was debited without merchant confirmation. Wait 15 minutes.',
    associatedFormId: 'form-transaction-dispute',
    popular: true,
  },
  {
    id: 'upi-problem-guidance',
    title: 'UPI Payment Issues & Chargeback Protocol',
    titleHi: 'यूपीआई भुगतान समस्याएं एवं शिकायत निवारण',
    titleMr: 'युपीआय समस्या व तक्रार निवारण',
    category: 'payments_upi',
    shortDescription: 'Resolve wrong transfers, pending UPI statuses, and incorrect UPI PIN locks.',
    fullOverview: 'Unified Payments Interface (UPI) handles billions of instant transfers. Common issues include transactions stuck in "Pending" status, money sent to the wrong UPI ID by typo, or UPI PIN blocked after 3 incorrect attempts.',
    requiredDocuments: [
      '12-digit UPI Transaction ID / UTR Number',
      'Beneficiary Virtual Payment Address (VPA / UPI ID) or mobile number',
      'Screenshot of payment debit confirmation'
    ],
    onlineSteps: [
      'Inside your UPI app (Google Pay, PhonePe, Paytm, BHIM), navigate to Transaction Details > Need Help / Raise Dispute.',
      'If unresolved, file an official dispute directly on the NPCI Portal (npci.org.in > Dispute Redressal Mechanism).',
      'If money was transferred to an unintended wrong recipient, immediately notify your bank with UTR number to request inter-bank recall.'
    ],
    branchSteps: [
      'Visit branch manager with UTR number and written application explaining wrong beneficiary transfer.',
      'The bank will initiate a recall request through NPCI to the beneficiary\'s bank.'
    ],
    typicalTimeframe: 'Pending issues resolve in 2 to 4 hours; wrong transfer recall depends on beneficiary bank consent.',
    safetyCaution: 'Remember: You NEVER need to scan a QR code or enter your UPI PIN to RECEIVE money. Entering PIN always debits money!',
  },
  {
    id: 'unauthorized-transaction-steps',
    title: 'Unauthorized Transaction Emergency Reporting',
    titleHi: 'अनधिकृत लेन-देन की आपातकालीन रिपोर्टिंग',
    titleMr: 'अनधिकृत व्यवहाराची त्वरित तक्रार',
    category: 'payments_upi',
    shortDescription: 'Act within 3 days for ZERO liability under Reserve Bank of India customer protection rules.',
    fullOverview: 'If money was debited from your account or card without your authorization, prompt reporting is paramount. If reported within 3 working days, customer liability is ZERO under RBI mandate. If reported between 4 to 7 days, maximum liability is limited to ₹10,000.',
    requiredDocuments: [
      'Exact SMS or email alert received for the unauthorized transaction',
      'Bank account number and card details',
      'Formal cybercrime complaint acknowledgement (cybercrime.gov.in or helpline 1930)'
    ],
    onlineSteps: [
      'Immediately call your bank\'s dedicated 24x7 Fraud Hotline or press "Report Fraud" inside the mobile app to block card/account.',
      'Dial the National Cybercrime Helpline 1930 immediately to freeze funds before fraudsters cash out.',
      'File an online complaint at cybercrime.gov.in and save the acknowledgement PDF.'
    ],
    branchSteps: [
      'Visit home branch within 24 hours of reporting.',
      'Submit written unauthorized transaction dispute letter with copy of police/cyber complaint.',
      'Collect written acknowledgement signed by the Branch Operations Manager.'
    ],
    typicalTimeframe: 'Shadow credit / provisional credit must be provided by the bank within 10 working days.',
    safetyCaution: 'Do not delete the SMS alerts, emails, or call logs—these serve as vital forensic evidence.',
    popular: true,
  },

  // F. Loans & Deposits
  {
    id: 'personal-loan-guidance',
    title: 'Personal Loan Application & Document Checklist',
    titleHi: 'व्यक्तिगत ऋण (पर्सनल लोन) आवेदन एवं दस्तावेज',
    titleMr: 'वैयक्तिक कर्ज अर्ज आणि कागदपत्रे',
    category: 'loans_deposits',
    shortDescription: 'Guidance on unsecured personal loans, interest benchmarks, EMI calculation, and eligibility.',
    fullOverview: 'Personal loans are unsecured multi-purpose loans for medical emergencies, home renovation, or education. Eligibility is assessed primarily on your monthly net income, employment stability, and CIBIL credit score (typically 750+).',
    requiredDocuments: [
      'Identity and Address Proof (Aadhaar & PAN mandatory)',
      'Last 3 to 6 months bank statements showing regular salary or business turnover',
      'Last 3 months salary slips and latest Form 16 / ITR (Income Tax Return)',
      'Employment proof (employee ID card and corporate email ID)'
    ],
    onlineSteps: [
      'Check pre-approved loan offers inside your primary bank\'s mobile app (often requires zero documentation).',
      'Choose loan amount and tenure (12 to 60 months) to compare monthly EMI.',
      'Review processing fee and annual percentage rate (APR) before confirming digital e-agreement.'
    ],
    branchSteps: [
      'Meet the retail credit officer at your bank branch.',
      'Submit loan application along with physical salary slips and stamped bank statement copies.',
      'Sign the loan agreement upon credit approval and sanction letter generation.'
    ],
    typicalTimeframe: 'Pre-approved: Under 1 hour; Regular application: 2 to 4 working days.',
    safetyCaution: 'Never pay upfront "processing fees" or "loan approval deposits" into personal bank accounts or UPI handles.',
    associatedFormId: 'form-loan-inquiry',
  },
  {
    id: 'fixed-recurring-deposit',
    title: 'Fixed Deposit (FD) & Recurring Deposit (RD)',
    titleHi: 'सावधि जमा (FD) एवं आवर्ती जमा (RD) जानकारी',
    titleMr: 'मुदत ठेव (FD) आणि आवर्ती ठेव (RD)',
    category: 'loans_deposits',
    shortDescription: 'Earn guaranteed interest, explore senior citizen bonus rates, and tax-saver FDs.',
    fullOverview: 'Fixed Deposits (FD) let you invest a lump sum for a fixed period (7 days to 10 years) at a guaranteed interest rate. Recurring Deposits (RD) allow disciplined monthly savings. Senior citizens (aged 60+) receive an additional 0.50% interest rate premium across most Indian banks.',
    requiredDocuments: [
      'Active savings account with the bank',
      'PAN card (mandatory to avoid 20% TDS under Income Tax Act)',
      'Form 15G (for general citizens) or Form 15H (for senior citizens) to claim TDS exemption if total income is non-taxable'
    ],
    onlineSteps: [
      'Open Bank App > Deposits > Open Fixed / Recurring Deposit.',
      'Select deposit amount, tenure, interest payout frequency (monthly, quarterly, or cumulative on maturity).',
      'Select auto-renewal options and confirm nominee; e-FD receipt is instantly generated for download.'
    ],
    branchSteps: [
      'Fill in the Term Deposit application form.',
      'Specify debit account number and maturity disposal instructions.',
      'Collect physical Term Deposit Advice (TDA) certificate.'
    ],
    typicalTimeframe: 'Instant online; same day at branch.',
    safetyCaution: 'Remember that bank deposits up to ₹5,00,000 per depositor per bank are fully insured by the DICGC (RBI subsidiary).',
  },

  // G. Complaints & Grievance Services
  {
    id: 'complaint-filing-ombudsman',
    title: 'Bank Grievance Escalation & RBI Ombudsman',
    titleHi: 'बैंक शिकायत निवारण एवं आरबीआई लोकपाल',
    titleMr: 'बँक तक्रार निवारण आणि आरबीआय लोकपाल',
    category: 'complaints_grievance',
    shortDescription: 'How to file an official bank complaint and escalate to the RBI Integrated Ombudsman Scheme if unresolved.',
    fullOverview: 'Every bank maintains a 3-tier grievance mechanism: Level 1 Branch / Customer Care, Level 2 Nodal Officer, and Level 3 Principal Nodal Officer. If your complaint is not resolved satisfactorily within 30 days, you can lodge a free complaint with the RBI Integrated Ombudsman at cms.rbi.org.in.',
    requiredDocuments: [
      'Original complaint reference number / ticket ID with date of filing',
      'Bank\'s written response or proof of no response after 30 days',
      'Chronological summary of facts and financial loss proof'
    ],
    onlineSteps: [
      'Step 1: File complaint on bank\'s official website under "Grievance Redressal / Feedback".',
      'Step 2: Note the Complaint Ticket ID. Wait 30 calendar days for resolution.',
      'Step 3: If rejected or unresolved, visit the RBI Complaint Management System at cms.rbi.org.in or email crpc@rbi.org.in.'
    ],
    branchSteps: [
      'Submit written letter to the Branch Manager and request a stamped "Complaint Register Acknowledgement".',
      'If unresolved in 10 days, escalate in writing to the Zonal Nodal Officer.'
    ],
    typicalTimeframe: 'Bank internal turnaround: up to 30 days; RBI Ombudsman adjudication: 30 to 60 days.',
    safetyCaution: 'The RBI Ombudsman service is completely FREE. Never pay any private agent or legal firm for filing an ombudsman complaint.',
    associatedFormId: 'form-grievance',
  }
];

export const BANKING_FORMS: BankingForm[] = [
  {
    id: 'form-savings-account',
    title: 'Savings Account Application Assistance',
    category: 'account',
    description: 'Prepare your basic personal, address, and nominee information needed to fill out a standard bank account opening form.',
    department: 'Retail Banking & Customer Onboarding',
    estimatedMinutes: 6,
    requiredChecklist: [
      'Aadhaar Card (with mobile number linked)',
      'PAN Card (Permanent Account Number)',
      '2 Recent passport size photos',
      'Initial deposit cheque or cash (₹1,000 - ₹5,000 depending on bank)'
    ],
    fields: [
      {
        id: 'applicantName',
        label: 'Full Legal Name',
        type: 'text',
        placeholder: 'As printed on your Aadhaar / PAN card',
        required: true,
        plainExplanation: 'Enter your legal first, middle, and last name exactly as it appears on your official government identity documents.',
        sampleValue: 'Rajesh Kumar Sharma'
      },
      {
        id: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
        required: true,
        plainExplanation: 'Used by the bank to verify your age eligibility, senior citizen perks (if 60+), and tax compliance.',
        sampleValue: '1985-06-15'
      },
      {
        id: 'mobileNumber',
        label: 'Mobile Number for Alerts',
        type: 'tel',
        placeholder: '10-digit mobile number',
        required: true,
        plainExplanation: 'This phone will receive mandatory SMS alerts for all debits, credits, and OTP security codes.',
        sampleValue: '9876543210'
      },
      {
        id: 'panNumber',
        label: 'PAN Card Number',
        type: 'text',
        placeholder: 'e.g. ABCDE1234F',
        required: true,
        plainExplanation: 'Mandatory 10-character alphanumeric tax identifier required by the Income Tax Department for bank accounts.',
        sampleValue: 'ABCDE1234F'
      },
      {
        id: 'accountType',
        label: 'Account Variant',
        type: 'select',
        required: true,
        options: ['Regular Savings Account with Cheque Book', 'Zero Balance Basic Savings (BSBDA)', 'Senior Citizen Savings Account', 'Salary Account'],
        plainExplanation: 'Select whether you prefer a zero-minimum-balance basic account or a regular account with full cheque/card benefits.',
        sampleValue: 'Regular Savings Account with Cheque Book'
      },
      {
        id: 'nomineeName',
        label: 'Nominee Name',
        type: 'text',
        placeholder: 'Person who will inherit account balance',
        required: true,
        plainExplanation: 'The family member or trusted individual legally entitled to receive your account funds in the event of your demise.',
        sampleValue: 'Sunita Sharma (Spouse)'
      }
    ],
    branchSubmissionNote: 'Take this prepared slip with your original Aadhaar and PAN cards to your preferred branch. Hand it to the New Accounts desk.',
  },
  {
    id: 'form-address-change',
    title: 'Address & Communication Update Form',
    category: 'personal_info',
    description: 'Prepare your address change request with proper proof mapping for correspondence and debit card delivery.',
    department: 'Customer Service & KYC Operations',
    estimatedMinutes: 4,
    requiredChecklist: [
      'Valid address proof (Aadhaar, Voter ID, Passport, or registered rent agreement)',
      'Recent electricity or gas utility bill (less than 2 months old)',
      'Account passbook copy'
    ],
    fields: [
      {
        id: 'accountNumber',
        label: 'Existing Account Number',
        type: 'text',
        placeholder: 'e.g. 123456789012',
        required: true,
        plainExplanation: 'The 11 to 16 digit account number printed on the first page of your bank passbook or e-statement.',
        sampleValue: '112233445566'
      },
      {
        id: 'newStreetAddress',
        label: 'New Residential Address',
        type: 'textarea',
        placeholder: 'Flat/House No, Building, Street, Area',
        required: true,
        plainExplanation: 'Your complete physical street address where you currently reside.',
        sampleValue: 'Flat 402, Shanti Heights, M.G. Road, Pune'
      },
      {
        id: 'newPinCode',
        label: 'Postal PIN Code',
        type: 'text',
        placeholder: '6-digit postal code',
        required: true,
        plainExplanation: '6-digit postal index code essential for postal delivery of your debit cards and bank notices.',
        sampleValue: '411001'
      },
      {
        id: 'proofType',
        label: 'Document Enclosed as Proof',
        type: 'select',
        required: true,
        options: ['Aadhaar Card with Updated Address', 'Electricity / Utility Bill', 'Voter Identity Card', 'Registered Rent Agreement'],
        plainExplanation: 'Select the official document you will attach to substantiate your change of address.',
        sampleValue: 'Aadhaar Card with Updated Address'
      }
    ],
    branchSubmissionNote: 'Submit this along with a self-attested photocopy of your new address proof to your home branch customer desk.',
  },
  {
    id: 'form-nominee-update',
    title: 'Nomination Registration / Update (Form DA1 / DA3)',
    category: 'account',
    description: 'Ensure your savings are protected by registering or modifying your nominated beneficiary.',
    department: 'Deposit Accounts & Mandates',
    estimatedMinutes: 5,
    requiredChecklist: [
      'Nominee Date of Birth proof (if minor)',
      'Account passbook or cheque leaf'
    ],
    fields: [
      {
        id: 'accountNumber',
        label: 'Bank Account Number',
        type: 'text',
        placeholder: 'Your savings or fixed deposit account number',
        required: true,
        plainExplanation: 'The bank account to which this nomination mandate will be legally linked.',
        sampleValue: '203948571029'
      },
      {
        id: 'nomineeFullName',
        label: 'Nominee Full Legal Name',
        type: 'text',
        placeholder: 'Full name as per their ID proof',
        required: true,
        plainExplanation: 'The full legal name of the person you want to appoint as your nominee.',
        sampleValue: 'Ananya Sharma'
      },
      {
        id: 'relationship',
        label: 'Relationship with Account Holder',
        type: 'select',
        required: true,
        options: ['Spouse', 'Son', 'Daughter', 'Mother', 'Father', 'Brother', 'Sister', 'Other'],
        plainExplanation: 'Your legal or family relationship with the nominated person.',
        sampleValue: 'Daughter'
      },
      {
        id: 'nomineeAge',
        label: 'Nominee Age / Date of Birth',
        type: 'text',
        placeholder: 'Age in years or DOB',
        required: true,
        plainExplanation: 'If nominee is under 18 years old, an adult guardian must also be appointed on the form.',
        sampleValue: '22 Years'
      }
    ],
    branchSubmissionNote: 'Obtain the stamped counterfoil from the bank confirming "Nomination Registered". Keep it safely with your family documents.',
  },
  {
    id: 'form-card-blocking',
    title: 'Card Blocking & Reissue Request Guidance',
    category: 'debit_atm',
    description: 'Formal written instruction to permanently hotlist a lost or stolen card and request a safe re-issue.',
    department: 'Debit Card & Fraud Prevention Cell',
    estimatedMinutes: 3,
    requiredChecklist: [
      'Account number',
      'Date & location where card was lost/compromised'
    ],
    fields: [
      {
        id: 'accountNumber',
        label: 'Account Number',
        type: 'text',
        placeholder: 'Account linked with the card',
        required: true,
        plainExplanation: 'The bank account to which the compromised debit card is attached.',
        sampleValue: '556677889900'
      },
      {
        id: 'blockReason',
        label: 'Reason for Blocking',
        type: 'select',
        required: true,
        options: ['Card Lost / Stolen', 'Suspected Fraud / Phishing Incident', 'Card Damaged / Swallowed by ATM', 'Unsolicited SMS Alert Received'],
        plainExplanation: 'Specifying the exact reason helps the bank flag any unauthorized transactions for rapid chargeback.',
        sampleValue: 'Card Lost / Stolen'
      },
      {
        id: 'requestReplacement',
        label: 'Re-issue New Card?',
        type: 'select',
        required: true,
        options: ['Yes, please dispatch replacement to my registered address', 'No, I will collect green PIN kit from branch', 'Do not reissue at this time'],
        plainExplanation: 'Choose whether you want a replacement debit card delivered to your residential address.',
        sampleValue: 'Yes, please dispatch replacement to my registered address'
      }
    ],
    branchSubmissionNote: 'Emergency note: For immediate card blocking, also call your bank\'s 24/7 toll-free helpline number or send an emergency SMS right away.',
  },
  {
    id: 'form-cheque-book',
    title: 'Cheque Book Requisition Assistance',
    category: 'cheque_passbook',
    description: 'Request a fresh personalized cheque book with account title and magnetic ink (MICR) strip.',
    department: 'Clearing & Cheque Operations',
    estimatedMinutes: 3,
    requiredChecklist: [
      'Account in active status',
      'Confirmed registered mailing address'
    ],
    fields: [
      {
        id: 'accountNumber',
        label: 'Account Number',
        type: 'text',
        placeholder: 'Your 11-16 digit account number',
        required: true,
        plainExplanation: 'Account from which cheques will be debited upon clearing.',
        sampleValue: '998877665544'
      },
      {
        id: 'numberOfLeaves',
        label: 'Number of Cheque Leaves Required',
        type: 'select',
        required: true,
        options: ['25 Leaves (Standard personal use)', '50 Leaves', '100 Leaves (Recommended for commercial/business accounts)'],
        plainExplanation: 'Select the size of the cheque book booklet you require.',
        sampleValue: '25 Leaves (Standard personal use)'
      },
      {
        id: 'deliveryMode',
        label: 'Preferred Delivery Mode',
        type: 'select',
        required: true,
        options: ['Dispatch by Speed Post to Registered Address', 'Hold at Home Branch for Self Collection'],
        plainExplanation: 'Choose whether to receive the booklet at home or collect it directly at the branch counter.',
        sampleValue: 'Dispatch by Speed Post to Registered Address'
      }
    ],
    branchSubmissionNote: 'Drop this slip in the branch cheque requisition box or submit at the single-window counter.',
  },
  {
    id: 'form-transaction-dispute',
    title: 'Failed Transaction Dispute Form (Chargeback)',
    category: 'payments_upi',
    description: 'Official dispute template for cash not dispensed at ATM, double debit, or failed merchant POS swipe.',
    department: 'ATM & Electronic Payment Reconciliation',
    estimatedMinutes: 5,
    requiredChecklist: [
      '12-digit Transaction Reference Number (RRN / UTR)',
      'Transaction date, exact time, and amount in rupees',
      'ATM Terminal ID or Merchant receipt (if available)'
    ],
    fields: [
      {
        id: 'accountNumber',
        label: 'Account Number Debited',
        type: 'text',
        placeholder: 'Account number',
        required: true,
        plainExplanation: 'The bank account from which money was debited without successful service delivery.',
        sampleValue: '123443211234'
      },
      {
        id: 'transactionDate',
        label: 'Date of Transaction',
        type: 'date',
        required: true,
        plainExplanation: 'The exact calendar date when the failed transaction occurred.',
        sampleValue: '2026-10-24'
      },
      {
        id: 'disputeAmount',
        label: 'Disputed Amount (₹)',
        type: 'text',
        placeholder: 'e.g. 2000',
        required: true,
        plainExplanation: 'The exact numerical amount deducted in Indian Rupees.',
        sampleValue: '5000'
      },
      {
        id: 'disputeType',
        label: 'Nature of Dispute',
        type: 'select',
        required: true,
        options: [
          'ATM: Cash not dispensed but account debited',
          'ATM: Partial cash dispensed only',
          'UPI: Money deducted but merchant / recipient did not receive',
          'POS / Card Swipe: Charged twice for single purchase',
          'Online Shopping: Transaction failed but money deducted'
        ],
        plainExplanation: 'Categorize the incident so the clearing team can route it to the specific card network or NPCI switch.',
        sampleValue: 'ATM: Cash not dispensed but account debited'
      },
      {
        id: 'terminalOrRrn',
        label: 'ATM ID or 12-Digit RRN Number',
        type: 'text',
        placeholder: 'Found in transaction SMS / receipt',
        required: true,
        plainExplanation: 'The unique retrieval reference number (RRN) that identifies this exact transaction in the inter-bank network.',
        sampleValue: 'RRN429810293812'
      }
    ],
    branchSubmissionNote: 'Banks are bound by RBI guidelines to resolve valid ATM disputes within 5 working days or pay ₹100/day compensation.',
  }
];

export const GOVERNMENT_SCHEMES: GovernmentScheme[] = [
  {
    id: 'pmjdy',
    name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
    shortName: 'Jan Dhan Yojana',
    objective: 'National mission for financial inclusion ensuring access to affordable banking, remittance, credit, insurance, and pension.',
    targetAudience: 'Any Indian citizen aged 10+ without a basic bank account.',
    keyBenefits: [
      'Zero minimum balance requirement',
      'Free RuPay debit card with built-in ₹2,00,000 accidental insurance cover',
      'Overdraft (OD) facility up to ₹10,000 for eligible operating accounts',
      'Direct Benefit Transfer (DBT) credit for government subsidies'
    ],
    eligibilityCriteria: [
      'Resident Indian citizen aged 10 years or older',
      'Does not already hold an active savings account in any bank',
      'Simplified KYC documentation allowed if standard OVD is unavailable'
    ],
    documentsRequired: [
      'Aadhaar Card (primary document)',
      'If address changed: self-declaration of current address',
      'If Aadhaar unavailable: Voter ID, NREGA job card, or letter from Gazetted Officer',
      'Two passport size photographs'
    ],
    howToApply: [
      'Visit any commercial bank, regional rural bank, or Bank Mitra (Customer Service Point kiosk).',
      'Request the "Jan Dhan Account Opening Form".',
      'Affix signature or thumb impression with Aadhaar photocopy.',
      'Receive instant zero-balance passbook and RuPay card.'
    ],
    officialPortal: 'https://pmjdy.gov.in',
    badge: 'Universal Financial Inclusion'
  },
  {
    id: 'pmsby',
    name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    shortName: 'Suraksha Bima Yojana',
    objective: 'Affordable accidental death and disability insurance for bank account holders at an annual premium of just ₹20.',
    targetAudience: 'Bank account holders aged 18 to 70 years.',
    keyBenefits: [
      '₹2,00,000 compensation on accidental death or total permanent disability',
      '₹1,00,000 compensation for permanent partial disability',
      'Ultra-affordable premium of only ₹20 per year auto-debited in May',
      'Continuous annual coverage through auto-debit consent'
    ],
    eligibilityCriteria: [
      'Individual bank account holder between 18 and 70 years of age',
      'Active savings account with auto-debit facility enabled',
      'Aadhaar linked to bank account'
    ],
    documentsRequired: [
      'Bank passbook copy',
      'Aadhaar card copy',
      'One-page PMSBY consent-cum-declaration form'
    ],
    howToApply: [
      'Log in to Internet Banking / Mobile Banking > Social Security Schemes > PMSBY.',
      'Or submit the simple 1-page auto-debit consent form at your bank branch before May 31.'
    ],
    officialPortal: 'https://jansuraksha.gov.in',
    badge: 'Accident Cover: ₹20/year'
  },
  {
    id: 'pmjjby',
    name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
    shortName: 'Jeevan Jyoti Bima Yojana',
    objective: 'Life insurance cover of ₹2,00,000 for death due to any cause (natural or accidental) at ₹436 per year.',
    targetAudience: 'Account holders aged 18 to 50 years (coverage till 55 years).',
    keyBenefits: [
      '₹2,00,000 life insurance protection payable to nominee on demise of insured',
      'Covers death due to any cause (medical, disease, natural, or accidental)',
      'Annual premium of ₹436 auto-debited directly from savings account',
      'Tax benefits under Section 80C on premium paid'
    ],
    eligibilityCriteria: [
      'Age between 18 and 50 years at enrollment',
      'Active savings bank account with sufficient balance for ₹436 debit',
      'Simple self-certification of good health'
    ],
    documentsRequired: [
      'Aadhaar card copy',
      'Bank account number',
      'Nominee details and KYC copy'
    ],
    howToApply: [
      'Activate online via bank mobile app or net banking with 2 clicks.',
      'Or visit branch and submit the PMJJBY enrolment mandate form.'
    ],
    officialPortal: 'https://jansuraksha.gov.in',
    badge: 'Life Cover: ₹436/year'
  },
  {
    id: 'apy',
    name: 'Atal Pension Yojana (APY)',
    shortName: 'Atal Pension Yojana',
    objective: 'Government-backed pension scheme aimed at creating a universal social security system for unorganized sector workers.',
    targetAudience: 'Indian citizens aged 18 to 40 years (non-income tax payers).',
    keyBenefits: [
      'Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 after age 60',
      'Pension is lifelong for subscriber; after demise, same pension is paid to spouse',
      'On demise of both subscriber and spouse, entire accumulated corpus is returned to nominee',
      'Government co-contribution and sovereign guarantee on returns'
    ],
    eligibilityCriteria: [
      'Age between 18 and 40 years',
      'Must have a savings bank account linked with mobile number',
      'Must NOT be an income-tax payer (as per current rules)'
    ],
    documentsRequired: [
      'Savings account details and Aadhaar card',
      'Mobile number for transaction SMS',
      'Spouse and nominee details'
    ],
    howToApply: [
      'Enroll through your bank\'s net banking portal under "Pensions > APY".',
      'Or fill the APY registration form at your bank branch specifying your desired monthly pension amount.'
    ],
    officialPortal: 'https://npscra.nsdl.co.in',
    badge: 'Guaranteed Pension'
  },
  {
    id: 'sukanya',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    shortName: 'Sukanya Samriddhi',
    objective: 'Government small-deposit scheme designed exclusively for the education and marriage expenses of girl children.',
    targetAudience: 'Parents or legal guardians of a girl child aged under 10 years.',
    keyBenefits: [
      'High interest rate (currently ~8.2% per annum, compounded annually)',
      'Triple tax exemption (EEE): investment, interest earned, and maturity proceeds are 100% tax-free under 80C',
      'Minimum deposit of just ₹250 per year up to maximum ₹1,50,000',
      'Partial withdrawal allowed after girl child turns 18 for higher education'
    ],
    eligibilityCriteria: [
      'Account can be opened by parents/guardians for a girl child from her birth up to 10 years of age',
      'Maximum 2 accounts per family (one for each girl child, exception for twins/triplets)'
    ],
    documentsRequired: [
      'Birth Certificate of the girl child',
      'Identity and address proof of guardian (Aadhaar & PAN)',
      'Initial deposit cash or cheque (minimum ₹250)'
    ],
    howToApply: [
      'Visit any post office or authorized commercial bank branch.',
      'Submit the SSY opening form along with child\'s birth certificate and guardian KYC.',
      'Receive a dedicated Sukanya Samriddhi passbook.'
    ],
    officialPortal: 'https://www.indiapost.gov.in',
    badge: 'Girl Child Welfare'
  },
  {
    id: 'mudra',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    shortName: 'MUDRA Loan',
    objective: 'Provide collateral-free micro-credit up to ₹20 Lakhs to non-corporate, non-farm small/micro enterprises.',
    targetAudience: 'Artisans, shopkeepers, fruit/food vendors, small manufacturers, repair shops, and service providers.',
    keyBenefits: [
      'Collateral-free (no property or gold mortgage required)',
      'Zero processing fee for Shishu and Kishore loans in most public banks',
      '3 loan tiers: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 Lakhs), Tarun (₹5 Lakhs to ₹20 Lakhs)',
      'MUDRA Debit Card provided for working capital withdrawals'
    ],
    eligibilityCriteria: [
      'Small business owner or entrepreneur with a viable business plan',
      'Good credit track record with no past bank loan default'
    ],
    documentsRequired: [
      'Proof of identity and business address',
      'Quotation of machinery/items to be purchased',
      'Business plan / projected turnover statement'
    ],
    howToApply: [
      'Apply online via the Udyamimitra portal (udyamimitra.in) or visit any commercial bank or NBFC branch.'
    ],
    officialPortal: 'https://udyamimitra.in',
    badge: 'Collateral-Free Micro Credit'
  }
];

export const FRAUD_TOPICS: FraudTopic[] = [
  {
    id: 'fake-customer-care',
    title: 'Fake Customer Care & Google Search Number Scams',
    category: 'calls',
    riskLevel: 'Critical',
    modusOperandi: 'Fraudsters post their own mobile numbers on Google Maps, review sites, and social media under bank names (e.g. "SBI Support", "HDFC Toll Free"). When a distressed user searches Google and calls, the imposter asks them to install remote-control screen-sharing apps (AnyDesk, TeamViewer) or pay ₹5 via UPI to "verify" the complaint, which empties their bank account.',
    redFlags: [
      'Customer care number is a normal 10-digit mobile number starting with 6, 7, 8, or 9 rather than an official 1800-series toll-free number.',
      'The caller instructs you to download an app from Play Store like AnyDesk, QuickSupport, or RustDesk.',
      'The caller asks you to do a "small ₹1 or ₹5 recharge" to test your account.',
      'The caller asks you to read aloud an OTP or SMS code received on your phone.'
    ],
    preventiveAction: [
      'Always obtain customer support numbers ONLY from the back of your debit card, official passbook, or verified website (look for https:// and verified padlock).',
      'Never install remote screen-sharing apps on advice of anyone claiming to be a bank official.',
      'Remember: Real bank staff can inspect system logs from their internal terminal; they NEVER need to look at your mobile phone screen.'
    ],
    officialReportingStep: 'If compromised, disconnect internet immediately, uninstall the remote app, call your bank to freeze internet banking, and dial cyber helpline 1930.',
    emergencyActionText: 'Freeze accounts immediately via your bank\'s emergency card/net-banking lock switch.'
  },
  {
    id: 'upi-qr-receive-scam',
    title: 'UPI "Scan to Receive Money" Fraud (OLX & Marketplace Scams)',
    category: 'digital',
    riskLevel: 'Critical',
    modusOperandi: 'When you try to sell an item online or receive a prize/refund, the scammer claims: "I am sending you ₹5,000. Scan this QR code or click this link to accept the payment." The moment you scan the QR and enter your 4-digit or 6-digit UPI PIN, money is DEBITED from your account instead of credited.',
    redFlags: [
      'Buyer insists on paying via QR code or payment link rather than asking for your account number / IFSC.',
      'You are asked to enter your secret UPI PIN to "receive" or "claim" money.',
      'The prompt shows "Pay" or "Debited" instead of "Credit".'
    ],
    preventiveAction: [
      'GOLDEN RULE OF UPI: You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money.',
      'Entering your UPI PIN ALWAYS debits money from your bank account.',
      'To receive money safely, simply share your mobile number or UPI ID (VPA). The funds will credit automatically without any action on your phone.'
    ],
    officialReportingStep: 'Note the 12-digit UTR number and UPI ID of the scammer. Lodge an immediate complaint on the National Cybercrime Portal (cybercrime.gov.in) and within the UPI app.',
    emergencyActionText: 'Report to NPCI and your bank within 2 hours to trace the receiving UPI handle.'
  },
  {
    id: 'phishing-sms-kyc',
    title: 'Fake "Electricity Bill" & "KYC Expired" SMS Phishing',
    category: 'digital',
    riskLevel: 'High',
    modusOperandi: 'You receive an urgent SMS: "Dear customer, your bank account / SIM will be blocked tonight due to incomplete KYC. Click here http://bit.ly/bank-kyc to update immediately." The link opens a look-alike fake banking webpage asking for your user ID, password, date of birth, and OTP.',
    redFlags: [
      'SMS creates artificial panic and urgency ("Account will be blocked tonight", "Electricity disconnected in 2 hours").',
      'Sender ID is an unknown 10-digit mobile number or strange alphanumeric header instead of official bank header (e.g. AX-HDFCBK, VM-SBINB).',
      'Link is shortened (bit.ly, tinyurl) or uses odd spelling (e.g., sbi-login-support.xyz).'
    ],
    preventiveAction: [
      'Never click links in unsolicited SMS or WhatsApp messages claiming your account or card is blocked.',
      'Banks will never send links asking you to type your net banking password or debit card PIN.',
      'If in doubt, open your official bank app directly from your phone app drawer, not via the SMS link.'
    ],
    officialReportingStep: 'Forward fraudulent SMS to 1909 (Telecom spam registry) and report the URL on cybercrime.gov.in.',
    emergencyActionText: 'If you typed your password, immediately change your net banking password and block internet banking.'
  },
  {
    id: 'otp-pin-confidentiality',
    title: 'The Unbreakable Rule: OTP, PIN, CVV Confidentiality',
    category: 'identity',
    riskLevel: 'Critical',
    modusOperandi: 'Fraudsters pose as bank officers, insurance agents, or lottery coordinators, claiming they need your OTP to "cancel a wrong charge", "upgrade your credit card limit", or "credit your prize". Once you speak the OTP, they authorize an irreversible fund transfer.',
    redFlags: [
      'Anyone asking you to read out an OTP received on your mobile phone.',
      'Anyone asking for the 3-digit CVV number on the back of your debit card.',
      'Claims that "the OTP is to cancel the transaction" (OTP is ONLY used to AUTHORIZE a transaction, never to cancel it).'
    ],
    preventiveAction: [
      'Never share your OTP, UPI PIN, ATM PIN, or card CVV with ANYONE—including bank managers, police officers, or close friends.',
      'Read the full SMS text of every OTP before entering it: it specifies the EXACT rupee amount being deducted and the merchant name.',
      'If the SMS says "OTP to debit ₹10,000 to XYZ", do not enter it unless you intentionally initiated that exact payment.'
    ],
    officialReportingStep: 'Call bank card division hotline immediately to block the card.',
    emergencyActionText: 'Remember: Bank staff will NEVER ask for your OTP or PIN under any circumstances.'
  },
  {
    id: 'lost-stolen-card',
    title: 'Lost or Stolen Card: Golden Hour Action Checklist',
    category: 'cards',
    riskLevel: 'High',
    modusOperandi: 'When physical cards are lost or stolen at crowded markets or ATM lobbies, thieves quickly make contactless tap-and-pay purchases (which do not require a PIN under ₹5,000) or perform international online transactions.',
    redFlags: [
      'Card missing from your wallet or purse.',
      'ATM machine retains/swallows your card and a "helpful stranger" tells you to re-enter your PIN.',
      'Sudden SMS alerts for transactions you did not make.'
    ],
    preventiveAction: [
      'Use your bank\'s mobile app to disable "Contactless / International" transactions when not travelling.',
      'Set daily card transaction limits (e.g. ₹5,000) to limit loss in worst-case scenarios.',
      'Never write your 4-digit PIN on the card body or on a paper kept inside your wallet.'
    ],
    officialReportingStep: 'Open your mobile app and toggle card status to "Blocked", or call your bank\'s 24x7 emergency helpline.',
    emergencyActionText: 'Report within 3 days to preserve RBI Zero Customer Liability protection.'
  }
];

// Predefined intelligent assistant responses with rich step-by-step guidance
export interface AssistantResponseRule {
  keywords: string[];
  title: string;
  response: string;
  responseHi: string;
  responseMr: string;
  relatedServiceId?: string;
  relatedFormId?: string;
  checklist?: string[];
  suggestedPrompts?: string[];
}

export const ASSISTANT_KNOWLEDGE_BASE: AssistantResponseRule[] = [
  {
    keywords: ['open', 'savings account', 'new account', 'start account', 'khata kholna', 'saving'],
    title: 'Savings Account Opening Guidance',
    response: `Opening a savings account is straightforward and can be completed either 100% online (via Video-KYC) or by visiting any nearby bank branch.\n\n### 1. Requirements Checklist\n- Proof of Identity: Aadhaar Card, Passport, or Voter ID\n- Proof of Address: Aadhaar Card or recent Utility Bill\n- PAN Card or Form 60\n- 2 Passport-sized photographs\n- Initial deposit (₹0 for Jan Dhan / BSBDA; ₹1,000–₹5,000 for regular savings)\n\n### 2. Fastest Method: Digital Video-KYC\n1. Visit the verified website or mobile app of your chosen bank.\n2. Enter your Aadhaar-linked mobile number to receive OTP.\n3. Upload your PAN card photo and sign on a blank paper.\n4. Complete a 2-minute video call with a bank officer during working hours.\n5. Your account and virtual debit card are ready within 24 hours!\n\n### 3. Alternative: Physical Branch Visit\nTake your original documents to the customer desk, fill out the Account Opening Form (AOF), and collect your stamped acknowledgement slip.`,
    responseHi: `बचत खाता खोलना बहुत आसान है। आप इसे 100% ऑनलाइन (वीडियो-केवाईसी के माध्यम से) या नजदीकी बैंक शाखा जाकर खोल सकते हैं।\n\n### आवश्यक दस्तावेज:\n- आधार कार्ड एवं पैन कार्ड\n- 2 पासपोर्ट साइज फोटो\n- वर्तमान पते का प्रमाण\n\nअगर आप ऑनलाइन खोलना चाहते हैं, तो बैंक के आधिकारिक ऐप पर जाएं और आधार ओटीपी द्वारा 2 मिनट में खाता शुरू करें!`,
    responseMr: `बचत खाते उघडणे अगदी सोपे आहे. तुम्ही ते व्हिडिओ-केवायसी द्वारे ऑनलाईन किंवा बँकेच्या शाखेत जाऊन उघडू शकता.\n\n### आवश्यक कागदपत्रे:\n- आधार कार्ड आणि पॅन कार्ड\n- २ पासपोर्ट साईझ फोटो\n- पत्त्याचा पुरावा\n\nबँकेच्या अधिकृत मोबाईल ॲपवरून व्हिडिओ केवायसीद्वारे २४ तासांत खाते सुरू करता येते.`,
    relatedServiceId: 'savings-account-opening',
    relatedFormId: 'form-savings-account',
    checklist: ['Aadhaar Card', 'PAN Card', '2 Photographs', 'Initial deposit cheque/cash'],
    suggestedPrompts: [
      'What is the difference between savings and current account?',
      'Can I open a zero balance account?',
      'How do I add a nominee to my account?'
    ]
  },
  {
    keywords: ['nominee', 'nomination', 'varisdar', 'add nominee', 'change nominee', 'वारिसदार'],
    title: 'Nominee Addition & Update Guidance',
    response: `Registering a nominee ensures that in the event of any unfortunate occurrence, your hard-earned savings can be smoothly handed over to your loved one without court succession delays.\n\n### How to Register or Change Nominee:\n\n**Method A: Online (Fastest)**\n1. Log into your bank\'s official mobile app or net banking portal.\n2. Navigate to **Services > Account Settings > Manage Nomination**.\n3. Enter the nominee\'s full legal name, date of birth, relationship (e.g. spouse, child, parent), and address.\n4. Authenticate with the OTP sent to your registered mobile number.\n\n**Method B: Branch Form DA1 / DA3**\n1. Ask for **Form DA1** (New Nomination) or **Form DA3** (Change/Update Nominee).\n2. Fill in the nominee details and sign. If using a thumb impression, two witnesses are required.\n3. Always collect the stamped counterfoil confirming **"Nomination Registered"**.\n\n*Important:* You can change or update your nominee at any time throughout your lifetime at zero cost.`,
    responseHi: `अपने बैंक खाते में नॉमिनी (वारिसदार) दर्ज करना बहुत जरूरी है ताकि आपके बाद आपकी जमा राशि आपके परिवार को बिना किसी कानूनी परेशानी के मिल सके।\n\nआप अपने बैंक के मोबाइल ऐप में जाकर "Services > Manage Nominee" में जाकर 1 मिनट में नॉमिनी जोड़ सकते हैं, या शाखा में फॉर्म DA1 भरकर जमा कर सकते हैं।`,
    responseMr: `बँक खात्यात नॉमिनी (वारसदार) नोंदवणे अत्यंत आवश्यक आहे. यामुळे तुमच्या पश्चात तुमची पुंजी तुमच्या कुटुंबीयांना सहजतेने मिळते.\n\nतुम्ही बँकेच्या मोबाईल ॲपमध्ये "Manage Nominee" पर्यायावर जाऊन किंवा शाखेत फॉर्म DA1 जमा करून नॉमिनी नोंदवू शकता.`,
    relatedServiceId: 'nominee-update',
    relatedFormId: 'form-nominee-update',
    checklist: ['Nominee Full Name', 'Nominee Date of Birth', 'Relationship proof', 'Account Number'],
    suggestedPrompts: [
      'Can I appoint a minor child as nominee?',
      'How to check if my account already has a nominee?',
      'Can I have more than one nominee?'
    ]
  },
  {
    keywords: ['lost card', 'stolen card', 'block card', 'atm card lost', 'card block', 'khoya card'],
    title: 'Emergency: Lost or Stolen Card Protocol',
    response: `🚨 **Immediate Action Required:** If your debit or ATM card is lost or stolen, act immediately to prevent unauthorized usage and safeguard yourself under RBI's Zero Customer Liability rules.\n\n### Step 1: Block Card Instantly (Takes 30 seconds)\n- **Mobile App:** Open your bank app > tap **Cards** > select **Lock / Block Card Permanently**.\n- **Emergency SMS:** Send an SMS from your registered mobile (e.g., \`BLOCK <last 4 digits>\` to your bank's designated emergency shortcode).\n- **24/7 Phone:** Call the verified toll-free card hotline printed on your bank statement.\n\n### Step 2: Request Replacement Card\n- While blocking, toggle "Re-issue new card" to receive a fresh chip card at your registered home address within 5 to 7 business days.\n- Alternatively, visit your home branch with your ID to collect an instant green kit.\n\n*Safety reminder:* Bank staff will never call to ask for your card PIN, CVV, or passwords.`,
    responseHi: `🚨 **आपातकालीन निर्देश:** यदि आपका एटीएम या डेबिट कार्ड खो गया है, तो तुरंत इन कदमों का पालन करें:\n\n1. तुरंत अपने बैंक ऐप में जाकर कार्ड को 'Block' करें या 24x7 हेल्पलाइन पर कॉल करें।\n2. बैंक एसएमएस के जरिए तुरंत नया कार्ड भेजने का अनुरोध करें।\n3. ध्यान रखें: बैंक अधिकारी कभी भी आपसे पिन या सीवीवी नहीं मांगते।`,
    responseMr: `🚨 **तातडीची कृती:** तुमचे एटीएम किंवा डेबिट कार्ड हरवले असल्यास तात्काळ पुढील पावले उचला:\n\n१. बँकेच्या मोबाईल ॲपमध्ये जाऊन कार्ड तात्काळ 'Block' करा.\n२. बँकेच्या २४x७ ग्राहक सेवेला फोन करून कार्ड हॉटलिस्ट करा.\n३. आरबीआयच्या नियमांनुसार तात्काळ कार्ड ब्लॉक केल्यास तुमचे नुकसान शून्य होते.`,
    relatedServiceId: 'card-blocking-lost',
    relatedFormId: 'form-card-blocking',
    checklist: ['Bank Account Number', 'Registered Mobile for OTP', 'Last 4 digits of card (if known)'],
    suggestedPrompts: [
      'What if an unauthorized transaction already happened?',
      'How to generate a new ATM PIN?',
      'How long does a replacement card take to arrive?'
    ]
  },
  {
    keywords: ['address', 'change address', 'update address', 'pata badalna', 'shifting'],
    title: 'Address Change & Communication Update',
    response: `Keeping your official mailing address up to date guarantees that replacement debit cards, cheque books, and critical legal notifications reach you securely.\n\n### 1. Required Proof of New Address\n- Aadhaar Card (fastest if your Aadhaar already carries the new address)\n- Passport, Voter Identity Card, or Driving License\n- Electricity, piped gas, or water utility bill (not older than 2 months)\n- Registered Rent Agreement (for rented residences)\n\n### 2. Method 1: Instant via Aadhaar e-KYC (Online)\n1. Log into your bank's internet banking portal.\n2. Navigate to **Profile > Update Address > Via Aadhaar OTP**.\n3. Enter your 12-digit Aadhaar number and submit the OTP received from UIDAI.\n4. Address synchronizes across bank records within 24 hours.\n\n### 3. Method 2: Physical Branch Submission\nSubmit an Address Update Form along with a self-attested photocopy of your new address proof and original for verification.`,
    responseHi: `पते में बदलाव करने के लिए सबसे आसान तरीका आधार ई-केवाईसी है। यदि आपके आधार कार्ड पर नया पता दर्ज है, तो आप नेट बैंकिंग में जाकर ओटीपी के जरिए 24 घंटे में पता अपडेट कर सकते हैं।\n\nशाखा में जाने के लिए आधार कार्ड या पिछले 2 महीने का बिजली बिल साथ ले जाएं।`,
    responseMr: `पत्ता बदलण्यासाठी आधार ई-केवायसी सर्वात सोपा मार्ग आहे. तुमच्या आधारवर नवीन पत्ता असल्यास नेट बँकिंगद्वारे एका दिवसात पत्ता बदलता येतो.\n\nशाखेत जाताना आधार किंवा २ महिन्यांचे वीज बिल सोबत ठेवा.`,
    relatedServiceId: 'address-change',
    relatedFormId: 'form-address-change',
    checklist: ['Updated Aadhaar Card', 'Electricity / Gas Bill (< 2 months)', 'Account Passbook'],
    suggestedPrompts: [
      'How do I update my mobile number?',
      'Can I update address without Aadhaar card?',
      'Do banks charge fees for address change?'
    ]
  },
  {
    keywords: ['cheque', 'cheque book', 'request cheque', 'order cheque', 'check book', 'checkbook'],
    title: 'Cheque Book Request & Tracking',
    response: `You can order a new personalized cheque book anytime without standing in branch queues.\n\n### How to Request:\n1. **Via Mobile App / Net Banking:** Navigate to **Cheques > Request Cheque Book** > choose number of leaves (25, 50, or 100) > confirm delivery address.\n2. **Via ATM:** Insert your debit card > select **More Services > Cheque Book Request**.\n3. **Via Branch Drop Box:** Tear out the reorder slip from the back of your previous cheque book, sign it, and drop it into your branch requisition box.\n\n### Delivery & Safety:\n- Delivered by Registered Speed Post within 3 to 5 working days.\n- Inspect the outer security seal upon delivery to ensure it is untampered.\n- Never sign blank cheque leaves or leave unused signed cheques in unsecured drawers.`,
    responseHi: `नया चेक बुक मंगाना बहुत आसान है। आप अपने बैंक ऐप में 'Cheque Services > Request Cheque Book' में जाकर 25 या 50 पन्नों का चेक बुक ऑर्डर कर सकते हैं। यह 3 से 5 दिनों में स्पीड पोस्ट द्वारा आपके पते पर पहुंच जाता है।`,
    responseMr: `नवीन चेक बुक मागवण्यासाठी बँकेच्या मोबाईल ॲपमध्ये जा आणि 'Request Cheque Book' निवडा. स्पीड पोस्टद्वारे ३ ते ५ दिवसांत तुमच्या पत्त्यावर चेक बुक पोहोचते.`,
    relatedServiceId: 'cheque-book-request',
    relatedFormId: 'form-cheque-book',
    checklist: ['Active Account Number', 'Registered Postal Address', 'Mobile number for SMS tracking'],
    suggestedPrompts: [
      'How to stop payment on a cheque I already issued?',
      'Are there charges for a new cheque book?',
      'What is positive pay system (PPS) for cheques?'
    ]
  },
  {
    keywords: ['failed transaction', 'money deducted', 'atm failed', 'cash not dispensed', 'upi failed', 'pending'],
    title: 'Failed Transaction & Auto-Reversal (RBI Guidelines)',
    response: `Do not panic if money was deducted from your account during an ATM withdrawal or UPI payment, but cash was not dispensed or merchant did not receive it.\n\n### 1. What Happens Under the Hood:\nThe deducted amount is held in an automated settlement clearing account. Most inter-bank systems automatically detect the unfulfilled handshake and reverse the money.\n\n### 2. Turnaround Time (TAT) & Compensation:\n- **Standard Reversal:** Typically refunded within **24 to 48 hours**.\n- **RBI Mandate:** Banks must reverse failed ATM transactions within **T+5 business days**.\n- **Statutory Penalty:** If the bank fails to reverse within 5 working days, they are legally required to pay you **₹100 per day of delay** as compensation.\n\n### 3. What You Should Do:\n1. Note the 12-digit **RRN / UTR number** from your debit SMS.\n2. In your bank app, tap the transaction and click **Raise Dispute**.\n3. If uncredited after 48 hours, file a complaint using our Dispute Form.`,
    responseHi: `यदि आपके खाते से पैसे कट गए हैं लेकिन एटीएम से नकदी नहीं निकली या यूपीआई असफल हो गया, तो घबराएं नहीं।\n\nआरबीआई के नियमानुसार 24 से 48 घंटे में पैसे स्वतः वापस आ जाते हैं। यदि 5 कार्य दिवसों में पैसे वापस नहीं आते हैं, तो बैंक को प्रति दिन ₹100 हर्जाना देना होगा। एसएमएस से 12 अंकों का यूटीआर/आरआरएन नंबर संभाल कर रखें।`,
    responseMr: `एटीएममधून पैसे न निघता किंवा यूपीआय अयशस्वी होऊन खात्यातून पैसे कापले गेल्यास घाबरू नका.\n\nआरबीआयच्या नियमानुसार २४ ते ४८ तासांत पैसे आपोआप जमा होतात. ५ दिवसांपेक्षा जास्त उशीर झाल्यास बँक प्रतिदिन १०० रुपये नुकसानभरपाई देण्यास बांधील आहे. एसएमएसमधील १२ अंकी UTR नंबर जपून ठेवा.`,
    relatedServiceId: 'failed-transaction-guidance',
    relatedFormId: 'form-transaction-dispute',
    checklist: ['12-digit RRN / UTR Number', 'Exact Date & Time', 'Transaction Amount', 'ATM ID / Merchant Name'],
    suggestedPrompts: [
      'What is the difference between RRN and UTR?',
      'How to complain if the bank does not refund within 5 days?',
      'How to report an unauthorized fraud transaction?'
    ]
  },
  {
    keywords: ['statement', 'download statement', 'passbook', 'e-statement', 'account statement'],
    title: 'Bank Statement & Passbook Guide',
    response: `You can instantly download an official digital account statement (PDF) anytime for loan applications, visa filings, or income tax verification.\n\n### 1. Instant Download via Mobile App\n1. Open your bank mobile app and tap **Accounts > View Statement**.\n2. Choose period: Last 1 month, 3 months, 6 months, or custom financial year.\n3. Tap **Download PDF** or **Email to registered ID**.\n\n### 2. PDF Password Format:\nMost bank e-statements are password-protected for privacy. Common patterns include:\n- First 4 letters of your name in UPPERCASE + Date and Month of Birth (e.g., \`RAJE1506\` for Rajesh born 15th June).\n- Or your 10-character PAN number.\n\n### 3. Physical Passbook:\nInsert your passbook into any 24/7 automated Passbook Printing Kiosk in bank ATM lobbies to print recent entries in under 60 seconds.`,
    responseHi: `बैंक स्टेटमेंट डाउनलोड करने के लिए अपने मोबाइल ऐप में 'Accounts > Download Statement' पर जाएं। आप 1 महीने से लेकर 1 साल तक का स्टेटमेंट पीडीएफ में डाउनलोड कर सकते हैं। इसका पासवर्ड आमतौर पर आपके नाम के पहले 4 अक्षर और जन्मतिथि होती है।`,
    responseMr: `बँक स्टेटमेंट डाऊनलोड करण्यासाठी मोबाईल ॲपमध्ये जाऊन महिना किंवा वर्षाचे स्टेटमेंट पीडीएफ स्वरूपात मिळवा. पासवर्ड सहसा तुमच्या नावातील पहिली ४ अक्षरे आणि जन्मतारीख असते.`,
    relatedServiceId: 'bank-statement-passbook',
    relatedFormId: 'form-statement-request',
    suggestedPrompts: [
      'How to get a stamped bank statement for visa?',
      'How to view transaction history without net banking?',
      'Are there charges for email statements?'
    ]
  },
  {
    keywords: ['scam', 'fraud', 'fake call', 'cyber crime', 'phishing', 'dhokha', 'scammer'],
    title: 'Fraud Awareness & Safe Banking Golden Rules',
    response: `🛡️ **BankEase Safety Principles for Everyday Banking:**\n\n1. **The QR Code Rule:** You NEVER need to scan a QR code or enter your UPI PIN to receive money. Entering PIN always debits money from your account.\n2. **The OTP Secret:** Never share OTP with anyone—not even someone claiming to be your branch manager, police, or cyber agent. Bank staff can never ask for OTP.\n3. **Search Warning:** Never trust customer care numbers found on Google Search or social media. Always use numbers printed on your actual debit card or bank passbook.\n4. **Screen Share Danger:** Never install apps like AnyDesk, TeamViewer, or QuickSupport on the instruction of any caller.\n\n### In Case of Emergency:\n- Immediately dial the **National Cybercrime Helpline 1930**.\n- Block your cards inside your mobile app.\n- Report on **cybercrime.gov.in** within 3 days for zero financial liability.`,
    responseHi: `🛡️ **बैंकिंग सुरक्षा के 4 सुनहरे नियम:**\n\n1. कभी भी पैसे प्राप्त करने के लिए क्यूआर कोड स्कैन न करें या यूपीआई पिन न डालें।\n2. ओटीपी, पिन या सीवीवी किसी के साथ साझा न करें।\n3. गूगल सर्च पर दिए गए कस्टमर केयर नंबरों पर भरोसा न करें।\n4. किसी के कहने पर AnyDesk जैसी ऐप डाउनलोड न करें।\n\nधोखाधड़ी होने पर तुरंत राष्ट्रीय हेल्पलाइन **1930** पर कॉल करें।`,
    responseMr: `🛡️ **सुरक्षित बँकिंगचे ४ सुवर्ण नियम:**\n\n१. पैसे मिळवण्यासाठी कधीही युपीआय पिन टाकू नका किंवा क्यूआर कोड स्कॅन करू नका.\n२. ओटीपी आणि पिन कोणालाही सांगू नका.\n३. गुगल सर्चवरील कस्टमर केअर नंबर खोटे असू शकतात.\n४. फसवणूक झाल्यास तात्काळ **१९३०** या राष्ट्रीय सायबर हेल्पलाईनवर संपर्क साधा.`,
    suggestedPrompts: [
      'What should I do if I already clicked a suspicious link?',
      'How does the 1930 cybercrime helpline work?',
      'What is RBI zero liability policy?'
    ]
  },
  {
    keywords: ['kyc', 're-kyc', 'rekyc', 'kyc update', 'freeze account', 'kyc expired'],
    title: 'KYC & Periodic Re-KYC Guidance',
    response: `Under Reserve Bank of India (RBI) rules, banks are mandated to periodically update customer identity records (Know Your Customer).\n\n### 1. Has Your Address Changed?\n- **No Change in Address:** You do NOT need to visit the branch! Simply log into your mobile banking or net banking app, find the **Re-KYC Banner**, and submit a one-click digital self-declaration.\n- **Address Has Changed:** Submit an updated Aadhaar or utility bill either via online Aadhaar OTP or at your home branch.\n\n### 2. What Documents Are Accepted:\n- Aadhaar Card with self-attestation\n- PAN Card or Form 60\n- Passport-sized photograph\n\n### 3. Critical Fraud Alert:\nBanks **NEVER** send SMS messages with links stating: *"Your account is blocked, click this link to update KYC"*. Those are phishing scams designed to steal passwords. Always do KYC through your bank's official app or physical branch.`,
    responseHi: `केवाईसी अपडेट करना आवश्यक है। यदि आपका पता नहीं बदला है, तो आप बैंक के आधिकारिक ऐप में जाकर केवल 1 क्लिक में री-केवाईसी स्व-घोषणा पत्र जमा कर सकते हैं।\n\nसावधान: बैंक कभी भी एसएमएस में लिंक भेजकर केवाईसी अपडेट करने को नहीं कहते। ऐसे लिंक पर क्लिक न करें।`,
    responseMr: `केवायसी अद्ययावत करणे आवश्यक आहे. पत्ता बदलला नसेल तर मोबाईल ॲपमधून एका क्लिकवर री-केवायसी करता येते.\n\nलक्ष द्या: केवायसीसाठी आलेले संशयास्पद एसएमएस लिंक उघडू नका.`,
    relatedServiceId: 'kyc-rekyc-guidance',
    relatedFormId: 'form-rekyc',
    checklist: ['Aadhaar Card', 'PAN Card', 'Photograph'],
    suggestedPrompts: [
      'What happens if I miss the Re-KYC deadline?',
      'How to do Video-KYC from home?',
      'Can senior citizens do Re-KYC doorstep banking?'
    ]
  },
  {
    keywords: ['loan', 'personal loan', 'home loan', 'education loan', 'karz', 'mudra'],
    title: 'Loan Applications & Document Guidance',
    response: `Banks provide diverse loan products tailored to your needs. Here is a quick breakdown:\n\n### 1. Loan Categories:\n- **Personal Loan:** Multi-purpose, no collateral, requires regular salary/business income and CIBIL score 750+.\n- **Home Loan:** Secured against property, lower interest rates (~8.4%–9.5%), longest tenure up to 30 years.\n- **Education Loan:** For higher studies in India or abroad, collateral-free up to ₹7.5 Lakhs under government schemes.\n- **MUDRA Loan:** For small businesses and shops up to ₹20 Lakhs with no collateral requirement.\n\n### 2. Essential Documents Needed:\n- Last 3–6 months bank statements\n- Last 3 months salary slips + Form 16 / ITR\n- Identity & address proof (Aadhaar & PAN)\n- Proof of business / employment\n\n*Important warning:* Never pay "advance loan approval fees" or "security deposits" to anyone on WhatsApp or UPI. Legitimate banks deduct processing fees only from the disbursed loan amount.`,
    responseHi: `बैंक कई प्रकार के ऋण प्रदान करते हैं जैसे व्यक्तिगत ऋण (पर्सनल लोन), गृह ऋण (होम लोन), और व्यवसाय के लिए मुद्रा ऋण।\n\nलोन के लिए पिछले 6 महीने का बैंक स्टेटमेंट, 3 महीने की सैलरी स्लिप और आधार-पैन कार्ड की आवश्यकता होती है। किसी को भी एडवांस लोन फीस न दें।`,
    responseMr: `बँका वैयक्तिक कर्ज, गृहकर्ज, शैक्षणिक कर्ज आणि लहान व्यवसायांसाठी मुद्रा कर्ज उपलब्ध करून देतात.\n\nयासाठी ६ महिन्यांचे बँक स्टेटमेंट, पगार पावती आणि आधार-पॅन कार्ड आवश्यक असते. कोणत्याही व्यक्तीला कर्जासाठी ॲडव्हान्स पैसे देऊ नका.`,
    relatedServiceId: 'personal-loan-guidance',
    relatedFormId: 'form-loan-inquiry',
    checklist: ['Identity Proof (Aadhaar/PAN)', 'Salary Slips (3 months)', 'Bank Statement (6 months)', 'Form 16 / ITR'],
    suggestedPrompts: [
      'What CIBIL score is required for personal loan?',
      'How to apply for government MUDRA loan?',
      'What is the difference between fixed and floating interest rate?'
    ]
  }
];

// Fallback response for unhandled banking questions
export const DEFAULT_ASSISTANT_RESPONSE = {
  response: `Thank you for asking. Banking procedures vary depending on whether you are dealing with a public sector, private, or cooperative bank.\n\nHere are practical recommended steps for your request:\n\n1. **Check Official Channels:** Open your bank's verified mobile application or official internet banking portal (verify the web address begins with https://).\n2. **Carry Core Documents:** For branch services, keep your Aadhaar Card, PAN Card, active registered mobile number, and passbook handy.\n3. **Never Share Secrets:** Remember that bank representatives will never ask for your 4-digit ATM PIN, UPI PIN, OTPs, or password.\n\nWould you like guidance on a specific topic such as **opening an account**, **updating your address or nominee**, **reporting a failed transaction**, or **blocking a lost card**?`,
  responseHi: `धन्यवाद। बैंकिंग नियम अलग-अलग बैंकों में थोड़े भिन्न हो सकते हैं।\n\nसामान्य दिशानिर्देश:\n1. हमेशा बैंक के आधिकारिक ऐप का ही उपयोग करें।\n2. शाखा जाते समय आधार कार्ड, पैन कार्ड और पासबुक साथ रखें।\n3. अपना पिन, पासवर्ड या ओटीपी कभी किसी को न बताएं।\n\nआप नीचे दिए गए विकल्पों में से किसी एक पर क्लिक करके विस्तृत सहायता प्राप्त कर सकते हैं।`,
  responseMr: `धन्यवाद. वेगवेगळ्या बँकांच्या कार्यपद्धतीत थोडा फरक असू शकतो.\n\nमहत्त्वाचे मार्गदर्शन:\n१. बँकेच्या अधिकृत ॲपचाच वापर करा.\n२. शाखेत जाताना आधार, पॅन आणि पासबुक सोबत ठेवा.\n३. तुमचा पिन, पासवर्ड किंवा ओटीपी कधीही कोणाला सांगू नका.\n\nविस्तृत माहितीसाठी खालील पर्यायांवर क्लिक करा.`
};
