import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HOSTEL_BLOCKS, PICKUP_LOCATION } from '../../data/mockData';
import { ArrowLeft, ArrowRight, Check, Package, MapPin, Sparkles, Building2, CreditCard, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

export const RequesterWizard = () => {
  const { createParcelRequest, setParcelSubView } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const pickupLocation = PICKUP_LOCATION; // Always fixed to Delivery Spot

  const [selectedHostelTab, setSelectedHostelTab] = useState('BH');
  const [dropLocation, setDropLocation] = useState('BH1 (Boys Hostel 1)');
  const [urgency, setUrgency] = useState('As soon as possible');

  // Prepaid vs COD Option
  const [paymentType, setPaymentType] = useState('Prepaid'); // 'Prepaid' or 'COD'
  const [codAmount, setCodAmount] = useState('240');

  // Tip options (includes Custom Tip for rush hour or large parcels)
  const [rewardOption, setRewardOption] = useState('20');
  const [customTip, setCustomTip] = useState('30');

  const [platform, setPlatform] = useState('Amazon');
  const [size, setSize] = useState('Small package');
  const [notes, setNotes] = useState('');

  const rewardOptions = [
    { label: 'Free', value: '0' },
    { label: '₹5 Tip', value: '5' },
    { label: '₹10 Tip', value: '10' },
    { label: '₹15 Tip', value: '15' },
    { label: '₹20 Tip', value: '20' },
    { label: 'Custom Tip', value: 'custom' },
  ];

  const platformOptions = [
    { label: 'Amazon', color: '#FF9900' },
    { label: 'Flipkart', color: '#2874F0' },
    { label: 'Myntra', color: '#E42529' },
    { label: 'Meesho', color: '#F43397' },
    { label: 'Other Courier', color: '#171717' },
  ];

  const filteredHostels = HOSTEL_BLOCKS.filter(h => {
    if (selectedHostelTab === 'BH') return h.type === 'BH';
    if (selectedHostelTab === 'GH') return h.type === 'GH';
    return true;
  });

  const getEffectiveReward = () => {
    if (rewardOption === 'custom') return Number(customTip) || 0;
    return Number(rewardOption);
  };

  const handleComplete = () => {
    const activePlat = platformOptions.find(p => p.label === platform) || platformOptions[0];
    
    createParcelRequest({
      platform: platform,
      platformColor: activePlat.color,
      pickupLocation: PICKUP_LOCATION,
      dropLocation: dropLocation,
      urgency: urgency,
      paymentType: paymentType,
      codAmount: paymentType === 'COD' ? Number(codAmount || 0) : 0,
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
        
        {/* STEP 1: Platform, Payment Type & Hostel Drop Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">Step 1 of 3</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Parcel & Hostel Details
              </h2>
              <p className="text-xs text-[#171717]/70 mt-1">
                Pickup is fixed at <strong>Delivery Spot</strong>. Select order platform, payment type, and destination hostel.
              </p>
            </div>

            {/* Order Platform Selector */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Order Platform
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

            {/* PREPAID vs COD SELECTION */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Payment Status
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType('Prepaid')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    paymentType === 'Prepaid'
                      ? 'border-emerald-600 bg-emerald-500/10 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <div>
                      <strong className="block text-xs font-bold">Prepaid</strong>
                      <span className="text-[10px] opacity-75">Already paid online</span>
                    </div>
                  </div>
                  {paymentType === 'Prepaid' && <Check className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType('COD')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    paymentType === 'COD'
                      ? 'border-amber-600 bg-amber-500/10 text-amber-900 ring-2 ring-amber-500/20'
                      : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-amber-600" />
                    <div>
                      <strong className="block text-xs font-bold">COD (Cash on Delivery)</strong>
                      <span className="text-[10px] opacity-75">Pay cash at spot</span>
                    </div>
                  </div>
                  {paymentType === 'COD' && <Check className="w-4 h-4 text-amber-600" />}
                </button>
              </div>

              {/* Specify COD Amount if COD */}
              {paymentType === 'COD' && (
                <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <label className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    COD Amount to pay at Delivery Spot (in ₹)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-900">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 240"
                      value={codAmount}
                      onChange={(e) => setCodAmount(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-sm text-amber-950 font-bold focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drop Location */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                  Drop Hostel Block
                </label>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-[#F5F1E8] p-1 rounded-xl border border-[#D8D1C3]">
                  <button
                    type="button"
                    onClick={() => setSelectedHostelTab('BH')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      selectedHostelTab === 'BH' ? 'bg-[#D94A2B] text-white' : 'text-[#171717]/70'
                    }`}
                  >
                    Boys (BH1-BH8)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHostelTab('GH')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      selectedHostelTab === 'GH' ? 'bg-[#D94A2B] text-white' : 'text-[#171717]/70'
                    }`}
                  >
                    Girls (GH1-GH2)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedHostelTab('ALL')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      selectedHostelTab === 'ALL' ? 'bg-[#D94A2B] text-white' : 'text-[#171717]/70'
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                {filteredHostels.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setDropLocation(h.name)}
                    className={`p-3 rounded-2xl border text-left font-bold text-xs transition-all flex items-center justify-between ${
                      dropLocation === h.name
                        ? 'border-[#D94A2B] bg-[#FBF0ED] text-[#D94A2B] ring-2 ring-[#D94A2B]/20'
                        : 'border-[#D8D1C3] bg-[#F5F1E8] text-[#171717] hover:border-[#697052]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#697052]" />
                      <span>{h.shortName}</span>
                    </div>
                    {dropLocation === h.name && <Check className="w-3.5 h-3.5 text-[#D94A2B]" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-sm transition-transform active:scale-99 flex items-center justify-center gap-2"
            >
              <span>Next: Package Details & Tip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Package Size & Custom Tip Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">Step 2 of 3</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Package size & tip amount
              </h2>
              <p className="text-xs text-[#171717]/70 mt-1">
                Set a tip amount for the bringer. Use custom tip for rush hours or heavy packages.
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
                <option value="Heavy / Large box">Heavy / Large box (Requires two hands / Rush hour)</option>
              </select>
            </div>

            {/* Tip Option (Includes Custom Tip for Rush Hours / Heavy Items) */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Tip Amount for Bringer
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {rewardOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
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

              {/* Custom Tip Input Field */}
              {rewardOption === 'custom' && (
                <div className="mt-3 p-3.5 bg-[#FBF0ED] border border-[#D94A2B]/30 rounded-2xl space-y-1">
                  <label className="text-[11px] font-bold text-[#D94A2B] uppercase tracking-wider block">
                    Enter Custom Tip (For Rush Hour / Heavy Box)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#171717]">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 30"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#D8D1C3] text-sm text-[#171717] font-bold focus:border-[#D94A2B] focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Optional Note */}
            <div>
              <label className="text-xs font-bold text-[#171717] uppercase tracking-wider block mb-2">
                Room No or Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Room 304. Heavy parcel, thanks!"
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

        {/* STEP 3: Summary */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">Step 3 of 3</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
                Confirm & Request
              </h2>
              <p className="text-xs text-[#171717]/70 mt-1">
                Your request will be posted to the Delivery Spot campus feed.
              </p>
            </div>

            {/* Request Summary */}
            <div className="p-5 rounded-2xl bg-[#F5F1E8] border-2 border-[#D8D1C3] space-y-3">
              <div className="flex items-center justify-between font-bold text-base text-[#171717]">
                <span>{platform} Parcel ({size})</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    paymentType === 'COD' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {paymentType === 'COD' ? `COD ₹${codAmount}` : 'Prepaid'}
                  </span>
                  <span className="text-[#D94A2B] bg-[#D94A2B]/10 px-3 py-0.5 rounded-full text-xs font-extrabold">
                    {getEffectiveReward() > 0 ? `₹${getEffectiveReward()} tip` : 'Free bring'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#171717]/80 pt-2 border-t border-[#D8D1C3] space-y-1">
                <div>Pickup spot: <strong>Delivery Spot</strong></div>
                <div>Drop location: <strong>{dropLocation}</strong></div>
                <div>Payment: <strong>{paymentType} {paymentType === 'COD' ? `(Cash: ₹${codAmount})` : '(Online paid)'}</strong></div>
                {notes && <div>Notes: <em>"{notes}"</em></div>}
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-base rounded-2xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              <span>Post Request to Delivery Spot Feed</span>
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
