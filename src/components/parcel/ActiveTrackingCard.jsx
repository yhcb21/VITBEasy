import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Clock, MapPin, PackageCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActiveTrackingCard = () => {
  const { activeRequest, markAsPickedUp, markAsDelivered, currentUser, setParcelSubView } = useApp();

  if (!activeRequest) {
    return (
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-10 text-center space-y-4 max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-full bg-[#D8D1C3]/50 mx-auto flex items-center justify-center">
          <Clock className="w-7 h-7 text-[#697052]" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#171717]">No active request</h3>
        <p className="text-sm text-[#171717]/60">Request a parcel or accept one to track it here.</p>
        <button
          onClick={() => setParcelSubView('hub')}
          className="px-6 py-3 bg-[#D94A2B] text-white text-sm font-bold rounded-2xl hover:bg-[#C23E20]"
        >
          Go to Parcel Hub
        </button>
      </div>
    );
  }

  const { id, platform, dropLocation, size, paymentType, codAmount = 0, reward, status, requester, bringer, notes } = activeRequest;

  // Role detection: is current user the bringer or requester
  const isRequester = requester?.id ? requester.id === currentUser?.id : (requester?.name === currentUser?.name);
  const isBringer = bringer?.id ? bringer.id === currentUser?.id : (bringer?.name === currentUser?.name);

  // Status steps for the timeline
  const steps = [
    { key: 'REQUESTED', label: 'Request posted', sub: 'Looking for a bringer nearby' },
    { key: 'ACCEPTED',  label: 'Bringer assigned', sub: bringer ? `${bringer.name} is heading to Delivery Spot` : '' },
    { key: 'PICKED_UP', label: 'Parcel picked up', sub: `Heading to ${dropLocation}` },
    { key: 'COMPLETED', label: 'Delivered', sub: 'Parcel successfully handed over' },
  ];
  const currentStepIndex = steps.findIndex(s => s.key === status);

  const isAcceptedOrBeyond = ['ACCEPTED', 'PICKED_UP', 'COMPLETED'].includes(status);

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-16">

      {/* TOP CARD: Parcel identity + status badge */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <span className="text-xs font-bold text-[#697052] uppercase tracking-widest">Parcel Bringer</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-0.5">{platform} · {size}</h2>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[#171717]/70 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D94A2B] shrink-0" />
              <span>Delivery Spot → <strong>{dropLocation}</strong></span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
              paymentType === 'COD' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
            }`}>
              {paymentType === 'COD' ? `COD ₹${codAmount}` : 'Prepaid'}
            </span>
            <span className="text-sm font-extrabold text-[#D94A2B]">
              {reward > 0 ? `₹${reward} tip` : 'Free'}
            </span>
          </div>
        </div>

        {notes && (
          <div className="mt-4 p-3 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3] text-xs text-[#171717]/80">
            <strong>Notes:</strong> {notes}
          </div>
        )}

        {/* Status progress timeline */}
        <div className="mt-6 relative">
          {/* Connector line */}
          <div className="absolute left-3.5 top-3.5 bottom-3.5 w-0.5 bg-[#D8D1C3]" />
          <div
            className="absolute left-3.5 top-3.5 w-0.5 bg-[#D94A2B] transition-all duration-700"
            style={{ height: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%` }}
          />

          <div className="space-y-5 relative">
            {steps.map((step, i) => {
              const done = i <= currentStepIndex;
              const active = i === currentStepIndex;
              return (
                <div key={step.key} className="flex items-start gap-4 pl-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all ${
                    done
                      ? active
                        ? 'bg-[#D94A2B] border-[#D94A2B] shadow-md shadow-[#D94A2B]/30'
                        : 'bg-[#D94A2B] border-[#D94A2B]'
                      : 'bg-[#FAF8F5] border-[#D8D1C3]'
                  }`}>
                    {done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${done ? 'text-[#171717]' : 'text-[#171717]/40'}`}>{step.label}</p>
                    {active && step.sub && (
                      <p className="text-xs text-[#697052] mt-0.5">{step.sub}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* PROFILE CARD: Shows Bringer or Requester details once assigned */}
      {isAcceptedOrBeyond && bringer && (
        <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-5 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full text-white font-bold text-sm flex items-center justify-center shrink-0"
            style={{ backgroundColor: isRequester ? (bringer.avatarBg || '#697052') : (requester?.avatarBg || '#D94A2B') }}
          >
            {isRequester ? (bringer.initials || 'U2') : (requester?.initials || 'U1')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#697052] uppercase tracking-wider">
              {isRequester ? 'Assigned Bringer' : 'Requester'}
            </p>
            <p className="font-bold text-base text-[#171717] flex items-center gap-1.5">
              <span>{isRequester ? bringer.name : requester?.name}</span>
              <CheckCircle2 className="w-4 h-4 text-[#697052]" />
            </p>
            <p className="text-xs text-[#171717]/60 mt-0.5">
              ★ {isRequester ? bringer.rating : requester?.rating} · Verified Student
            </p>
          </div>
        </div>
      )}

      {/* BRINGER ACTION BUTTONS: Pick up and Deliver confirmation (Clean & Simple) */}
      {status === 'ACCEPTED' && (
        <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6">
          <button
            onClick={() => markAsPickedUp(id)}
            className="w-full py-4 bg-[#171717] hover:bg-[#333] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <PackageCheck className="w-5 h-5 text-emerald-400" />
            <span>Mark as Picked Up from Delivery Spot</span>
          </button>
        </div>
      )}

      {status === 'PICKED_UP' && (
        <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 space-y-3">
          <div className="text-center">
            <p className="text-xs text-[#697052] font-semibold">Parcel collected from Delivery Spot</p>
            <p className="text-sm font-bold text-[#171717] mt-1">In transit to {dropLocation}</p>
          </div>
          <button
            onClick={() => markAsDelivered(id)}
            className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>Confirm Delivery to {dropLocation}</span>
          </button>
        </div>
      )}

      {/* WAITING STATE (before acceptance) */}
      {status === 'REQUESTED' && (
        <div className="bg-[#FAF8F5] border border-dashed border-[#D8D1C3] rounded-3xl p-8 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-[#697052]/10 mx-auto flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#697052] animate-pulse" />
          </div>
          <p className="font-bold text-sm text-[#171717]">Waiting for a bringer to accept</p>
          <p className="text-xs text-[#171717]/60">Students heading back to hostels can see your request and accept it.</p>
        </div>
      )}

      {/* COMPLETED STATE */}
      {status === 'COMPLETED' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border-2 border-emerald-500/30 rounded-3xl p-8 text-center space-y-3"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="font-serif text-2xl font-bold text-[#171717]">Parcel Delivered!</h4>
          <p className="text-sm text-[#171717]/70">
            Delivered to {dropLocation} · {reward > 0 ? `₹${reward} tip settled` : 'Free bring'} ✓
          </p>
        </motion.div>
      )}

    </div>
  );
};
