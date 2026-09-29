import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TicketCard } from '../common/TicketCard';
import { RequestDetailModal } from './RequestDetailModal';
import { ArrowLeft, ArrowRight, Navigation, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const BringerRouteMatcher = () => {
  const { requests, acceptParcelRequest, setParcelSubView } = useApp();

  const [selectedPickup, setSelectedPickup] = useState('Academic Block');
  const [selectedDrop, setSelectedDrop] = useState('Hostel A (Block 1)');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Available requests filtering
  const availableRequests = requests.filter(r => r.status === 'REQUESTED');

  // Smart Matching logic: requests that strictly match selected route
  const matchedRequests = availableRequests.filter(
    r => r.pickupLocation.toLowerCase().includes(selectedPickup.toLowerCase().split(' ')[0]) &&
         r.dropLocation.toLowerCase().includes(selectedDrop.toLowerCase().split(' ')[0])
  );

  // Other requests on nearby routes
  const otherRequests = availableRequests.filter(r => !matchedRequests.includes(r));

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
          BRINGER ROUTE SELECTOR
        </span>
      </div>

      {/* Route Selection Tool */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-5 h-5 text-[#D94A2B]" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
            Where are you heading right now?
          </h2>
        </div>

        {/* Route Selectors */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Pickup Selector */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-bold text-[#697052] uppercase tracking-wider">
              Starting from
            </label>
            <select
              value={selectedPickup}
              onChange={(e) => setSelectedPickup(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] font-bold text-sm text-[#171717] focus:border-[#D94A2B] focus:outline-none"
            >
              <option value="Academic Block">Academic Block</option>
              <option value="Delivery Gate">Delivery Gate</option>
              <option value="Security Office">Security Office</option>
            </select>
          </div>

          {/* Route Arrow Indicator */}
          <div className="sm:col-span-2 flex justify-center py-2 sm:py-0">
            <div className="w-8 h-8 rounded-full bg-[#D94A2B]/10 text-[#D94A2B] flex items-center justify-center font-bold">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Drop Selector */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-bold text-[#697052] uppercase tracking-wider">
              Destination hostel
            </label>
            <select
              value={selectedDrop}
              onChange={(e) => setSelectedDrop(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] font-bold text-sm text-[#171717] focus:border-[#D94A2B] focus:outline-none"
            >
              <option value="Hostel A (Block 1)">Hostel A (Block 1)</option>
              <option value="Hostel B (Block 2)">Hostel B (Block 2)</option>
              <option value="Hostel C (Block 3)">Hostel C (Block 3)</option>
              <option value="Hostel D (Girls Block)">Hostel D (Girls Block)</option>
            </select>
          </div>

        </div>

        {/* Signature Smart Matching Banner */}
        <motion.div
          key={`${selectedPickup}-${selectedDrop}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#FBF0ED] border-2 border-[#D94A2B]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-widest text-[#D94A2B] uppercase bg-[#D94A2B]/15 px-2.5 py-0.5 rounded-full">
              ALREADY ON YOUR WAY
            </span>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] mt-1">
              <span>{selectedPickup.toUpperCase()}</span>
              <span className="text-[#D94A2B]">↓ YOUR ROUTE ↓</span>
              <span>{selectedDrop.split(' ')[0].toUpperCase()}</span>
            </div>

            <p className="text-sm font-bold text-[#171717] pt-1">
              {matchedRequests.length > 0 ? (
                <span>🎉 <strong>{matchedRequests.length} parcels</strong> are looking for a ride on your route.</span>
              ) : (
                <span>No exact route matches right now. Check alternative campus requests below.</span>
              )}
            </p>
          </div>

          <span className="text-xs font-bold text-[#697052] bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#D8D1C3] shrink-0">
            {availableRequests.length} total active requests
          </span>
        </motion.div>

      </div>

      {/* MATCHED REQUESTS FEED */}
      {matchedRequests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#171717] flex items-center gap-2">
              <span>Matched on your route</span>
              <span className="text-xs font-mono bg-[#D94A2B] text-white px-2 py-0.5 rounded-full font-sans font-bold">
                {matchedRequests.length}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedRequests.map((req) => (
              <TicketCard
                key={req.id}
                request={req}
                isMatchedRoute={true}
                onSelect={(request) => setSelectedRequest(request)}
                onAccept={(id) => acceptParcelRequest(id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* OTHER CAMPUS REQUESTS */}
      <div className="space-y-4 pt-4 border-t border-[#D8D1C3]">
        <h3 className="font-serif text-2xl font-bold text-[#171717]">
          Other campus requests looking for a bringer
        </h3>

        {otherRequests.length === 0 && matchedRequests.length === 0 ? (
          /* Natural Campus Empty State */
          <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#697052]/10 text-[#697052] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#171717]">
              Nothing needs a ride right now.
            </h4>
            <p className="text-xs text-[#171717]/70 max-w-sm mx-auto">
              Looks like everyone's parcels are already home. Check again when you're heading back next time!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherRequests.map((req) => (
              <TicketCard
                key={req.id}
                request={req}
                isMatchedRoute={false}
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
