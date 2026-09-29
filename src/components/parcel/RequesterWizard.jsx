import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, ArrowRight, Check, Package, MapPin, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const RequesterWizard = () => {
  const { createParcelRequest, setParcelSubView } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [pickupLocation, setPickupLocation] = useState('Academic Block');
  const [customPickup, setCustomPickup] = useState('');

  const [dropLocation, setDropLocation] = useState('Hostel A (Block 1)');
  const [customDrop, setCustomDrop] = useState('');

  const [urgency, setUrgency] = useState('As soon as possible');

  // Tip capped at max 20 rupees as requested
  const [rewardOption, setRewardOption] = useState('20');
  const [customReward, setCustomReward] = useState('');

  const [platform, setPlatform] = useState('Amazon');
  const [size, setSize] = useState('Small package');
  const [notes, setNotes] = useState('');

  const pickupOptions = ['Academic Block', 'Delivery Gate', 'Security Office', 'Other Spot'];
  const dropOptions = ['Hostel A (Block 1)', 'Hostel B (Block 2)', 'Hostel C (Block 3)', 'Hostel D (Girls Block)', 'Other Hostel'];
  const rewardOptions = [
    { label: 'Free', value: '0' },
    { label: '₹5 Tip', value: '5' },
    { label: '₹10 Tip', value: '10' },
    { label: '₹15 Tip', value: '15' },
    { label: '₹20 Max Tip', value: '20' },
  ];
  const platformOptions = [
    { label: 'Amazon', color: '#FF9900' },
    { label: 'Flipkart', color: '#2874F0' },
    { label: 'Myntra', color: '#E42529' },
    { label: 'Meesho', color: '#F43397' },
    { label: 'Other Courier', color: '#171717' },
  ];

  const getEffectivePickup = () => pickupLocation.includes('Other') ? (customPickup || 'Other Spot') : pickupLocation;
  const getEffectiveDrop = () => dropLocation.includes('Other') ? (customDrop || 'Other Hostel') : dropLocation;
  const getEffectiveReward = () => Math.min(Number(rewardOption), 20);

  const handleComplete = () => {
    const activePlat = platformOptions.find(p => p.label === platform) || platformOptions[0];
    
    createParcelRequest({
      platform: platform,
      platformColor: activePlat.color,
      pickupLocation: getEffectivePickup(),
      dropLocation: getEffectiveDrop(),
      urgency: urgency,
      reward: getEffectiveReward(),
      size: size,
      notes: notes,
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1);
            else setParcelSubView('hub');
          }}
          className="flex items-center gap-2 text-xs font-bold text-[#171717]/70 hover:text-[#171717] px-3.5 py-1.5 rounded-full border border-[#D8D1C3] bg-[#FAF8F5]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{step === 1 ? 'Cancel' : 'Back'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#697052] uppercase tracking-wider">
            STEP {step} OF 3
          </span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= step ? 'w-6 bg-[#D94A2B]' : 'w-2 bg-[#D8D1C3]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 shadow-sm"
      >
        
        {/* STEP 1: Platform & Locations */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">Step 1 of 3</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Where is your parcel?
              </h2>
              <p className="text-xs text-[#171717]/70 mt-1">
                Select your order platform, pickup location, and drop hostel.
              </p>
            </div>

            {/* Order Platform Selector */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Select Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {platformOptions.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPlatform(p.label)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                      platform === p.label
                        ? 'border-[#D94A2B] bg-[#D94A2B] text-white shadow-xs'
                        : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717] hover:border-[#697052]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Pickup Location (Where parcel is placed)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {pickupOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPickupLocation(opt)}
                    className={`p-3.5 rounded-2xl border text-left font-bold text-xs transition-all flex items-center justify-between ${
                      pickupLocation === opt
                        ? 'border-[#D94A2B] bg-[#FBF0ED] text-[#D94A2B]'
                        : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717]'
                    }`}
                  >
                    <span>{opt}</span>
                    {pickupLocation === opt && <Check className="w-3.5 h-3.5 text-[#D94A2B]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Location */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Drop Location (Your Hostel)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dropOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setDropLocation(opt)}
                    className={`p-3.5 rounded-2xl border text-left font-bold text-xs transition-all flex items-center justify-between ${
                      dropLocation === opt
                        ? 'border-[#D94A2B] bg-[#FBF0ED] text-[#D94A2B]'
                        : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717]'
                    }`}
                  >
                    <span>{opt}</span>
                    {dropLocation === opt && <Check className="w-3.5 h-3.5 text-[#D94A2B]" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-sm transition-transform active:scale-99 flex items-center justify-center gap-2"
            >
              <span>Next: Package Size & Tip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Package Size & Tip Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">Step 2 of 3</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Package size & tip amount
              </h2>
              <p className="text-xs text-[#171717]/70 mt-1">
                Set a tip for the student who picks up your parcel (maximum ₹20 tip).
              </p>
            </div>

            {/* Package Size */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Package Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] text-sm text-[#171717] font-bold focus:border-[#D94A2B] focus:outline-none"
              >
                <option value="Small package">Small package (Books, phone case, small box)</option>
                <option value="Medium box">Medium box (Shoes, clothes box)</option>
                <option value="Clothing bag">Clothing bag (Myntra/Ajio bag)</option>
                <option value="Heavy box">Heavy box (Requires two hands)</option>
              </select>
            </div>

            {/* Tip Option (Capped at max ₹20) */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Set Tip Amount for Bringer (Max ₹20)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {rewardOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRewardOption(opt.value)}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                      rewardOption === opt.value
                        ? 'border-[#D94A2B] bg-[#FBF0ED] text-[#D94A2B] ring-2 ring-[#D94A2B]/20'
                        : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717]'
                    }`}
                  >
                    <span className="text-sm font-extrabold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Instructions or Room No (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Room 412. Please drop at hostel lobby."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] text-sm text-[#171717] focus:border-[#D94A2B] focus:outline-none"
              />
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-sm transition-transform active:scale-99 flex items-center justify-center gap-2"
            >
              <span>Review Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 3: Summary & PIN preview */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">Step 3 of 3</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Confirm & Request
              </h2>
              <p className="text-xs text-[#171717]/70 mt-1">
                Your request will be visible to all verified campus bringers instantly.
              </p>
            </div>

            {/* Request Summary */}
            <div className="p-5 rounded-2xl bg-[#F5F1E8] border-2 border-[#D8D1C3] space-y-3">
              <div className="flex items-center justify-between font-bold text-base text-[#171717]">
                <span>{platform} Parcel ({size})</span>
                <span className="text-[#D94A2B] bg-[#D94A2B]/10 px-3 py-1 rounded-full text-xs font-extrabold">
                  {getEffectiveReward() > 0 ? `₹${getEffectiveReward()} tip` : 'Free bring'}
                </span>
              </div>

              <div className="text-xs text-[#171717]/80 pt-2 border-t border-[#D8D1C3] space-y-1">
                <div>Pickup spot: <strong>{getEffectivePickup()}</strong></div>
                <div>Drop location: <strong>{getEffectiveDrop()}</strong></div>
                {notes && <div>Notes: <em>"{notes}"</em></div>}
              </div>
            </div>

            {/* Simple Delivery PIN Explanation */}
            <div className="p-4 rounded-2xl bg-[#FBF0ED] border border-[#D94A2B]/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D94A2B] shrink-0 mt-0.5" />
              <div className="text-xs text-[#171717]">
                <strong className="text-[#D94A2B] font-bold block mb-0.5">How Delivery Hand-off Works:</strong>
                When a verified student accepts your request and reaches your hostel, share your 4-digit Delivery PIN with them to confirm receipt!
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-base rounded-2xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              <span>Post Request to Campus Feed</span>
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
