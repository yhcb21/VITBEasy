import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HOSTEL_BLOCKS } from '../../data/mockData';
import { ArrowLeft, MapPin, Package, CheckCircle2, Clock, CreditCard, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

export const BringerRouteMatcher = () => {
  const { requests, acceptParcelRequest, setParcelSubView, currentUser } = useApp();
  const [selectedDrop, setSelectedDrop] = useState('ALL');

  const availableRequests = requests.filter(r => r.status === 'REQUESTED');

  const filteredRequests = selectedDrop === 'ALL'
    ? availableRequests
    : availableRequests.filter(r => r.dropLocation.includes(selectedDrop));

  const hostelTabs = ['ALL', 'BH1', 'BH2', 'BH3', 'BH4', 'BH5', 'BH6', 'BH7', 'BH8', 'GH1', 'GH2', 'Special'];

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setParcelSubView('hub')}
          className="flex items-center gap-2 text-xs font-bold text-[#171717]/70 hover:text-[#171717] px-3.5 py-1.5 rounded-full border border-[#D8D1C3] bg-[#FAF8F5]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <span className="text-xs font-bold text-[#697052] uppercase tracking-wider bg-[#F3F4EE] px-3 py-1 rounded-full border border-[#697052]/20">
          {availableRequests.length} requests waiting
        </span>
      </div>

      {/* Intro */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8">
        <span className="text-xs font-bold text-[#697052] uppercase tracking-wider">Heading back to hostel?</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1">
          Pick up a parcel on the way.
        </h2>
        <p className="text-sm text-[#171717]/70 mt-2">
          Filter by your destination hostel and accept a request.
        </p>
      </div>

      {/* Hostel filter chips */}
      <div className="flex flex-wrap gap-2">
        {hostelTabs.map(tag => {
          const count = tag === 'ALL' ? availableRequests.length : availableRequests.filter(r => r.dropLocation.includes(tag)).length;
          return (
            <button
              key={tag}
              onClick={() => setSelectedDrop(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedDrop === tag
                  ? 'bg-[#D94A2B] text-white shadow-sm'
                  : 'bg-[#FAF8F5] border border-[#D8D1C3] text-[#171717]/70 hover:text-[#171717] hover:border-[#697052]'
              }`}
            >
              <span>{tag === 'ALL' ? 'All hostels' : tag}</span>
              {count > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${selectedDrop === tag ? 'bg-white/25 text-white' : 'bg-[#D8D1C3] text-[#171717]/70'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Request cards */}
      {filteredRequests.length === 0 ? (
        <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#697052]/10 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-[#697052]" />
          </div>
          <p className="font-serif text-xl font-bold text-[#171717]">Nothing here right now</p>
          <p className="text-xs text-[#171717]/60">No parcels waiting for {selectedDrop === 'ALL' ? 'any hostel' : selectedDrop}. Try another block.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#FAF8F5] border border-[#D8D1C3] hover:border-[#D94A2B] rounded-3xl p-5 sm:p-6 transition-colors"
            >
              {/* Top row: platform + badges */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif text-xl font-bold text-[#171717]">{req.platform} Parcel</span>
                    <span className="text-[10px] font-bold text-[#697052] bg-[#F3F4EE] px-2 py-0.5 rounded uppercase tracking-wider">{req.size}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#171717]/70 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#D94A2B] shrink-0" />
                    <span>Delivery Spot → <strong>{req.dropLocation}</strong></span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    req.paymentType === 'COD'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {req.paymentType === 'COD' ? `COD ₹${req.codAmount}` : 'Prepaid'}
                  </span>
                  <span className="text-base font-extrabold text-[#D94A2B]">
                    {req.reward > 0 ? `₹${req.reward} tip` : 'Free'}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#D8D1C3] my-4" />

              {/* Requester info + time + accept */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
                    style={{ backgroundColor: req.requester?.avatarBg || '#697052' }}
                  >
                    {req.requester?.initials || '?'}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-sm font-bold text-[#171717]">
                      <span>{req.requester?.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#697052]" />
                    </div>
                    <span className="text-xs text-[#697052]">{req.timeAgo}</span>
                  </div>
                </div>

                {req.notes && (
                  <span className="text-xs text-[#171717]/60 italic max-w-[180px] truncate">"{req.notes}"</span>
                )}

                {req.requester?.id === currentUser.id || req.requester?.name === currentUser.name ? (
                  <span className="px-3 py-1.5 bg-[#FAF8F5] border border-[#D8D1C3] text-[#697052] font-semibold text-xs rounded-xl">
                    Your request (Waiting for bringer)
                  </span>
                ) : (
                  <button
                    onClick={() => acceptParcelRequest(req.id)}
                    className="px-5 py-2.5 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-sm transition-transform active:scale-95 shrink-0"
                  >
                    Accept
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};
