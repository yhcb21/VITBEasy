import React, { useState, useRef } from 'react';
import { KeyRound, CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OTPModal = ({ isOpen, onClose, onSubmit, type = 'pickup', targetOtp = '4728' }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  if (!isOpen) return null;

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setErrorMsg('');

    // Focus next input automatically
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 4);
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs[3].current?.focus();
    }
  };

  const handleSubmitCode = (e) => {
    e?.preventDefault();
    const code = otp.join('');
    if (code.length < 4) {
      setErrorMsg('Please enter all 4 digits');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const success = onSubmit(code);
      setIsVerifying(false);
      if (success) {
        setOtp(['', '', '', '']);
        onClose();
      } else {
        setErrorMsg('Invalid code entered. Please try again.');
      }
    }, 400);
  };

  const title = type === 'pickup' ? 'PICKUP CODE VERIFICATION' : 'DELIVERY CONFIRMATION CODE';
  const subtitle = type === 'pickup' 
    ? 'Enter the 4-digit pickup code provided by the parcel owner to secure the item.'
    : 'Ask the recipient for their 4-digit delivery code to finish this task.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-[#D8D1C3] hover:bg-[#D8D1C3]/30 text-[#171717]/60 hover:text-[#171717] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#D94A2B]/10 text-[#D94A2B] mx-auto flex items-center justify-center mb-3 border border-[#D94A2B]/20">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">{title}</h3>
            <p className="text-xs text-[#171717]/70 mt-1 max-w-xs mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Preset Helper Code Box for Demo ease */}
          <div className="my-4 p-2.5 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3] text-center">
            <span className="text-[11px] text-[#697052] font-semibold uppercase tracking-wider block">
              Demo Code Hint
            </span>
            <span className="font-mono text-base font-bold text-[#171717] tracking-widest mt-0.5 block">
              {targetOtp || (type === 'pickup' ? '4 7 2 8' : '8 2 9 1')}
            </span>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmitCode} className="mt-6">
            <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={inputRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-13 h-16 sm:w-14 sm:h-18 text-center text-2xl font-bold font-mono bg-[#F5F1E8] border-2 border-[#D8D1C3] rounded-2xl text-[#171717] focus:border-[#D94A2B] focus:bg-white focus:outline-none transition-all shadow-inner"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            {errorMsg && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#D94A2B] font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="mt-6 w-full py-3.5 px-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-md transition-transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>Verifying code...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Verify Code</span>
                </>
              )}
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
