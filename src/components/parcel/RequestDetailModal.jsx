import React, { useState } from 'react';
import { X, CheckCircle2, Star, MessageSquare, ArrowRight, ShieldCheck, MapPin, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RequestDetailModal = ({ request, onClose, onAccept }) => {
  if (!request) return null;

  const {
    id,
    platform,
    platformColor,
    pickupLocation,
    dropLocation,
    size,
    urgency,
    reward,
    requester,
    timeAgo,
    notes
  } = request;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full border border-[#D8D1C3] hover:bg-[#D8D1C3]/40 text-[#171717]/60 hover:text-[#171717] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: platformColor || '#D94A2B' }}
            />
            <span className="text-xs font-bold uppercase tracking-wider text-[#697052]">
              {platform} PARCEL DETAILS
            </span>
          </div>

          {/* Prominent Vertical Route Visualizer */}
          <div className="bg-[#F5F1E8] border border-[#D8D1C3] rounded-2xl p-5 my-3 relative">
            <span className="text-[10px] font-bold text-[#697052] uppercase tracking-wider block mb-3">
              PARCEL ROUTE
            </span>

            <div className="flex items-start gap-4">
              {/* Route Line & Dots */}
              <div className="flex flex-col items-center py-1">
                <div className="w-4 h-4 rounded-full bg-[#D94A2B] ring-4 ring-[#D94A2B]/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <div className="w-0.5 h-12 bg-dashed bg-gradient-to-b from-[#D94A2B] to-[#697052] my-1"></div>
                <div className="w-4 h-4 rounded-full bg-[#697052] ring-4 ring-[#697052]/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
              </div>

              {/* Pickup & Drop Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#697052] uppercase tracking-wider">PICKUP LOCATION</span>
                  <h4 className="font-bold text-base text-[#171717]">Delivery Spot</h4>
                  <span className="text-xs text-[#171717]/60">Official Campus Parcel Area</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#697052] uppercase tracking-wider">DESTINATION HOSTEL BLOCK</span>
                  <h4 className="font-bold text-base text-[#171717]">{dropLocation}</h4>
                  <span className="text-xs text-[#171717]/60">Hostel main entrance / lobby</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parcel Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="p-3 bg-[#F5F1E8] border border-[#D8D1C3] rounded-xl">
              <span className="text-[10px] text-[#697052] font-semibold uppercase block">Package Size</span>
              <span className="font-bold text-xs text-[#171717]">{size}</span>
            </div>

            <div className="p-3 bg-[#F5F1E8] border border-[#D8D1C3] rounded-xl">
              <span className="text-[10px] text-[#697052] font-semibold uppercase block">Urgency</span>
              <span className="font-bold text-xs text-[#171717]">{urgency}</span>
            </div>

            <div className="p-3 bg-[#FBF0ED] border border-[#D94A2B]/30 rounded-xl">
              <span className="text-[10px] text-[#D94A2B] font-semibold uppercase block">Negotiated Tip</span>
              <span className="font-extrabold text-sm text-[#D94A2B]">
                {reward > 0 ? `₹${reward} tip` : 'Free bring'}
              </span>
            </div>

            <div className="p-3 bg-[#F5F1E8] border border-[#D8D1C3] rounded-xl">
              <span className="text-[10px] text-[#697052] font-semibold uppercase block">Requested</span>
              <span className="font-bold text-xs text-[#171717]">{timeAgo}</span>
            </div>
          </div>

          {notes && (
            <div className="p-3 bg-[#F5F1E8] border border-[#D8D1C3] rounded-xl my-3">
              <span className="text-[10px] text-[#697052] font-bold uppercase block mb-0.5">Requester Note</span>
              <p className="text-xs text-[#171717] italic">"{notes}"</p>
            </div>
          )}

          {/* Requester Profile Card */}
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#D8D1C3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs"
                style={{ backgroundColor: requester?.avatarBg || '#171717' }}
              >
                {requester?.initials || 'AR'}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#171717]">
                  <span>{requester?.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#697052]" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#171717]/70 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-[#D94A2B] fill-[#D94A2B]" />
                  <span>{requester?.rating} ★</span>
                  <span>· {requester?.completedCount || 12} completed</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-bold text-[#697052] bg-[#F3F4EE] px-2.5 py-1 rounded-full border border-[#697052]/20">
              Verified Student
            </span>
          </div>

          {/* Modal Actions */}
          <div className="mt-6 space-y-2">
            <button
              onClick={() => onAccept(id)}
              className="w-full py-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Accept Request & Open Live Chat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
