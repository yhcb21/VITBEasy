import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Clock, MapPin, PackageCheck, KeyRound, ArrowRight, ShieldCheck, Star, User, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const ActiveTrackingCard = () => {
  const { activeRequest, markAsPickedUp, verifyDeliveryPin, updateRequestStatus, setParcelSubView } = useApp();

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  if (!activeRequest) {
    return (
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-8 text-center space-y-4 max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[#697052]/10 text-[#697052] mx-auto flex items-center justify-center">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#171717]">No active parcel tracking right now</h3>
        <p className="text-xs text-[#171717]/70">
          Request a parcel or accept one from the campus pool to track status.
        </p>
        <button
          onClick={() => setParcelSubView('hub')}
          className="px-5 py-2.5 bg-[#D94A2B] text-white text-xs font-bold rounded-2xl hover:bg-[#C23E20]"
        >
          Go to Parcel Hub
        </button>
      </div>
    );
  }

  const {
    id,
    platform,
    platformColor,
    pickupLocation,
    dropLocation,
    size,
    reward,
    status,
    requester,
    bringer,
    deliveryPin
  } = activeRequest;

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (enteredPin.length < 4) {
      setPinError('Please enter all 4 digits');
      return;
    }
    const success = verifyDeliveryPin(id, enteredPin);
    if (success) {
      setEnteredPin('');
      setPinError('');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D94A2B', '#697052', '#D8D1C3']
        });
      } catch (err) {}
    } else {
      setPinError('Invalid Delivery PIN. Check with requester.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      
      {/* Ride-Hailing Style Active Order Banner */}
      <div className="bg-[#FAF8F5] border-2 border-[#D94A2B] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Status Chip */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#D94A2B] uppercase tracking-wider bg-[#D94A2B]/10 px-3 py-1 rounded-full border border-[#D94A2B]/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D94A2B] animate-ping"></span>
            {status === 'ACCEPTED' ? 'BRINGER ASSIGNED' : status === 'PICKED_UP' ? 'PARCEL IN TRANSIT' : status === 'COMPLETED' ? 'DELIVERED & VERIFIED' : 'SEARCHING FOR BRINGER'}
          </span>

          <span className="text-xs font-extrabold text-[#D94A2B] bg-[#FBF0ED] px-3 py-1 rounded-full border border-[#D94A2B]/30">
            {reward > 0 ? `₹${reward} Tip` : 'Free Bring'}
          </span>
        </div>

        {/* Headline */}
        <div className="mt-4">
          <h2 className="font-serif text-3xl font-bold text-[#171717]">
            {platform} Parcel ({size})
          </h2>
          <p className="text-xs font-medium text-[#171717]/70 mt-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D94A2B]" />
            <span>{pickupLocation} → <strong>{dropLocation}</strong></span>
          </p>
        </div>

        {/* Bringer Profile Assignment (Uber / Ola driver card style) */}
        {bringer ? (
          <div className="mt-6 p-4 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#D94A2B] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                {bringer.initials || 'YS'}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#171717]">
                  <span>{bringer.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#697052]" />
                </div>
                <div className="flex items-center gap-1 text-xs text-[#171717]/70 mt-0.5">
                  <Star className="w-3 h-3 text-[#D94A2B] fill-[#D94A2B]" />
                  <span>{bringer.rating} ★ · Bringing your parcel</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-bold text-[#697052] uppercase bg-[#F3F4EE] px-2.5 py-1 rounded-full border border-[#697052]/20">
              Verified Student
            </span>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-2xl bg-[#FBF0ED] border border-[#D94A2B]/30 text-xs font-semibold text-[#D94A2B] flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Request is active in campus feed. Waiting for a student to accept...</span>
          </div>
        )}

      </div>

      {/* DELIVERY PIN DISPLAY (Uber / Swiggy PIN Model) */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#D94A2B]/10 text-[#D94A2B] mx-auto flex items-center justify-center border border-[#D94A2B]/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#171717]">
            Delivery PIN System
          </h3>
          <p className="text-xs text-[#171717]/70 max-w-sm mx-auto">
            Just like Swiggy or Uber, the requester holds a 4-digit PIN. Share this PIN when receiving the parcel to confirm delivery and transfer the tip!
          </p>
        </div>

        {/* Big Bold Delivery PIN Box for Requester */}
        <div className="p-6 rounded-2xl bg-[#FBF0ED] border-2 border-[#D94A2B]/40 text-center space-y-2">
          <span className="text-[11px] font-bold text-[#D94A2B] uppercase tracking-widest block">
            YOUR 4-DIGIT DELIVERY PIN
          </span>
          <div className="font-mono text-4xl font-extrabold text-[#171717] tracking-[0.3em] py-1">
            {deliveryPin || '4728'}
          </div>
          <p className="text-xs text-[#171717]/80 font-medium">
            Give this PIN to {bringer?.name || 'the bringer'} when he hands over your parcel at hostel.
          </p>
        </div>

        {/* Bringer Actions: Mark Picked Up & Enter Delivery PIN */}
        <div className="pt-4 border-t border-[#D8D1C3] space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#697052]">
            Bringer Actions (When collecting / delivering)
          </h4>

          {status === 'ACCEPTED' && (
            <button
              onClick={() => markAsPickedUp(id)}
              className="w-full py-3.5 bg-[#171717] hover:bg-[#333333] text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <PackageCheck className="w-4 h-4" />
              <span>1. Click Here when you collect parcel from {pickupLocation}</span>
            </button>
          )}

          {/* Delivery PIN Input Form */}
          <form onSubmit={handleVerifyPin} className="space-y-3 bg-[#F5F1E8] p-4 rounded-2xl border border-[#D8D1C3]">
            <label className="text-xs font-bold text-[#171717] block">
              2. Enter Requester's Delivery PIN (At Hostel Hand-off):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={4}
                placeholder="Enter 4-digit PIN (e.g. 4728)"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="flex-1 p-3 rounded-xl bg-white border border-[#D8D1C3] text-sm font-mono font-bold text-center tracking-widest focus:border-[#D94A2B] focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
              >
                Verify PIN & Finish
              </button>
            </div>
            {pinError && <p className="text-xs text-[#D94A2B] font-bold">{pinError}</p>}
          </form>

        </div>

      </div>

    </div>
  );
};
