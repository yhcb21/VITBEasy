import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HOSTEL_BLOCKS, PICKUP_LOCATION } from '../../data/mockData';
import { TicketCard } from '../common/TicketCard';
import { RequestDetailModal } from './RequestDetailModal';
import { ArrowLeft, ArrowRight, Navigation, Sparkles, Filter, CheckCircle2, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const BringerRouteMatcher = () => {
  const { requests, acceptParcelRequest, setParcelSubView } = useApp();

  const [selectedDrop, setSelectedDrop] = useState('ALL');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Available requests filtering
  const availableRequests = requests.filter(r => r.status === 'REQUESTED');

  // Filter requests by drop hostel block if selected
  const filteredRequests = availableRequests.filter(r => {
    if (selectedDrop === 'ALL') return true;
    return r.dropLocation.toLowerCase().includes(selectedDrop.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setParcelSubView('hub')}
          className="flex items-center gap-2 text-xs font-bold text-[#171717]/70 hover:text-[#171717] px-3.5 py-1.5 rounded-full border border-[#D8D1C3] bg-[#FAF8F5]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Parcel Hub</span>
        </button>

        <span className="text-xs font-bold text-[#697052] uppercase tracking-wider bg-[#F3F4EE] px-3 py-1 rounded-full border border-[#697052]/20">
          DELIVERY SPOT REQUEST FEED
        </span>
      </div>

      {/* Route Filter Tool */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#D94A2B]" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                Heading back from Delivery Spot?
              </h2>
            </div>
            <p className="text-xs text-[#171717]/70 mt-1">
              Pickup location is <strong>Delivery Spot</strong>. Filter requests by your destination hostel block:
            </p>
          </div>

          <span className="text-xs font-bold text-[#D94A2B] bg-[#D94A2B]/10 px-3 py-1.5 rounded-xl border border-[#D94A2B]/20 shrink-0">
            {availableRequests.length} active requests
          </span>
        </div>

        {/* Filter Chips by Hostel Block */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-4 border-t border-[#D8D1C3]">
          <button
            onClick={() => setSelectedDrop('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDrop === 'ALL'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'bg-[#F5F1E8] border border-[#D8D1C3] text-[#171717]/70 hover:text-[#171717]'
            }`}
          >
            All Hostels ({availableRequests.length})
          </button>

          {['BH1', 'BH2', 'BH3', 'BH4', 'BH5', 'BH6', 'BH7', 'BH8', 'GH1', 'GH2', 'Special'].map(hTag => {
            const count = availableRequests.filter(r => r.dropLocation.includes(hTag)).length;
            return (
              <button
                key={hTag}
                onClick={() => setSelectedDrop(hTag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  selectedDrop === hTag
                    ? 'bg-[#D94A2B] text-white shadow-xs'
                    : 'bg-[#F5F1E8] border border-[#D8D1C3] text-[#171717]/70 hover:text-[#171717]'
                }`}
              >
                <span>{hTag}</span>
                {count > 0 && (
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* REQUESTS FEED */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#171717] flex items-center gap-2">
            <span>Parcels at Delivery Spot waiting for a bringer</span>
            <span className="text-xs font-mono bg-[#D94A2B] text-white px-2 py-0.5 rounded-full font-sans font-bold">
              {filteredRequests.length}
            </span>
          </h3>
        </div>

        {filteredRequests.length === 0 ? (
          /* Natural Campus Empty State */
          <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#697052]/10 text-[#697052] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#171717]">
              Nothing needs a ride right now for this hostel.
            </h4>
            <p className="text-xs text-[#171717]/70 max-w-sm mx-auto">
              Looks like everyone's parcels are already home. Check again when you're heading back next time!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRequests.map((req) => (
              <TicketCard
                key={req.id}
                request={req}
                isMatchedRoute={selectedDrop !== 'ALL' && req.dropLocation.includes(selectedDrop)}
                onSelect={(request) => setSelectedRequest(request)}
                onAccept={(id) => acceptParcelRequest(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal View */}
      {selectedRequest && (
        <RequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onAccept={(id) => {
            setSelectedRequest(null);
            acceptParcelRequest(id);
          }}
        />
      )}

    </div>
  );
};
