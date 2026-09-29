import React from 'react';
import { ArrowRight, CheckCircle2, Star, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export const TicketCard = ({ request, onSelect, onAccept, isMatchedRoute = false }) => {
  const {
    timeAgo,
    reward,
    platform,
    platformColor,
    pickupLocation,
    dropLocation,
    size,
    urgency,
    requester,
    notes,
    status
  } = request;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`relative bg-[#FAF8F5] rounded-2xl border ${
        isMatchedRoute ? 'border-[#D94A2B] ring-2 ring-[#D94A2B]/15' : 'border-[#D8D1C3]'
      } p-4 sm:p-5 shadow-sm hover:shadow-md transition-all group`}
    >
      {/* Route compatibility highlight badge */}
      {isMatchedRoute && (
        <div className="absolute -top-3 left-4 bg-[#D94A2B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
          <span>★ Already on your route</span>
        </div>
      )}

      {/* Ticket Header: Time Ago & Reward Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C3]/60">
        <span className="text-[11px] font-bold tracking-wider text-[#697052] uppercase flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#697052]" />
          {timeAgo}
        </span>

        <div className="flex items-center gap-2">
          {reward === 0 ? (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#697052]/10 text-[#697052] border border-[#697052]/20">
              Free bring
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#D94A2B]/10 text-[#D94A2B] border border-[#D94A2B]/20">
              ₹{reward} reward
            </span>
          )}
        </div>
      </div>

      {/* Main Ticket Content */}
      <div className="py-3">
        {/* Platform & Item description */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-[#171717] flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: platformColor || '#D94A2B' }}
            />
            {platform} parcel
          </h3>
          <span className="text-[11px] px-2 py-0.5 bg-[#F5F1E8] border border-[#D8D1C3] rounded text-[#171717]/80 font-medium">
            {size}
          </span>
        </div>

        {/* Dynamic Route Arrow Visualizer */}
        <div className="mt-3 p-2.5 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3]/70 flex items-center justify-between text-xs font-medium text-[#171717]">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#D94A2B]"></span>
            <span>{pickupLocation}</span>
          </div>

          <ArrowRight className="w-4 h-4 text-[#D94A2B] shrink-0" />

          <div className="flex items-center gap-1.5 font-bold text-right">
            <span>{dropLocation}</span>
            <span className="w-2 h-2 rounded-full bg-[#697052]"></span>
          </div>
        </div>

        {/* Urgency & Notes snippet */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#171717]/70">
          <span>Needed: <strong className="text-[#171717]">{urgency}</strong></span>
          {notes && (
            <span className="italic truncate max-w-[160px] text-[#697052]">
              "{notes}"
            </span>
          )}
        </div>
      </div>

      {/* Ticket Footer: Requester info & Action button */}
      <div className="mt-2 pt-3 border-t border-[#D8D1C3]/60 flex items-center justify-between">
        {/* Requester Profile */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs"
            style={{ backgroundColor: requester?.avatarBg || '#171717' }}
          >
            {requester?.initials || requester?.name?.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#171717]">
              <span>{requester?.name}</span>
              {requester?.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#697052] fill-[#697052]/10" />
              )}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#171717]/60">
              <Star className="w-2.5 h-2.5 text-[#D94A2B] fill-[#D94A2B]" />
              <span>{requester?.rating}</span>
              <span>· {requester?.completedCount || 8} completed</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {onSelect && (
            <button
              onClick={() => onSelect(request)}
              className="px-3 py-1.5 rounded-xl border border-[#D8D1C3] text-xs font-medium text-[#171717] hover:bg-[#D8D1C3]/30 transition-colors"
            >
              Details
            </button>
          )}

          {onAccept && (
            <button
              onClick={() => onAccept(request.id)}
              className="px-4 py-1.5 rounded-xl bg-[#D94A2B] text-white font-bold text-xs hover:bg-[#C23E20] shadow-sm transition-transform active:scale-95 flex items-center gap-1"
            >
              BRING IT
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
