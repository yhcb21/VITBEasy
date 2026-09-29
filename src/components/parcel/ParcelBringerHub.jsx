import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, ArrowRight, Navigation, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ParcelBringerHub = () => {
  const { requests, setParcelSubView } = useApp();

  const activeCount = requests.filter(r => r.status === 'REQUESTED').length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Service Header Environment */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-[#D94A2B] uppercase tracking-wider bg-[#D94A2B]/10 px-3 py-1 rounded-full border border-[#D94A2B]/20">
            VITBEasy / Parcel Bringer
          </span>
          <span className="text-xs font-semibold text-[#697052] bg-[#F3F4EE] px-2.5 py-1 rounded-full">
            {activeCount} active parcels waiting
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717] tracking-tight">
          Someone's already going <span className="italic font-normal text-[#D94A2B]">your way.</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-[#171717]/80 max-w-2xl leading-relaxed">
          Get your parcel from the Academic Block without making the 40-minute round trip. Or pick up a parcel on your way back to hostel and earn small negotiated rewards.
        </p>
      </div>

      {/* Two Primary Dominant Action Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Path 1: Requester Path */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setParcelSubView('requester')}
          className="bg-[#FAF8F5] border-2 border-[#D94A2B] rounded-3xl p-6 sm:p-8 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#D94A2B] text-white flex items-center justify-center mb-5 shadow-xs">
              <Package className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#D94A2B]">
              REQUESTER FLOW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1 group-hover:text-[#D94A2B] transition-colors">
              I need my parcel
            </h2>
            <p className="text-xs sm:text-sm text-[#171717]/70 mt-2 leading-relaxed">
              Stuck in hostel or busy studying? Post where your parcel is and set a reward for a fellow student to bring it over.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#D8D1C3] flex items-center justify-between font-bold text-sm text-[#D94A2B]">
            <span>Start 5-step request</span>
            <div className="w-8 h-8 rounded-full bg-[#D94A2B] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Path 2: Bringer Path */}
        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => setParcelSubView('bringer')}
          className="bg-[#FAF8F5] border border-[#D8D1C3] hover:border-[#697052] rounded-3xl p-6 sm:p-8 cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#697052] text-white flex items-center justify-center mb-5 shadow-xs">
              <Navigation className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#697052]">
              BRINGER FLOW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1 group-hover:text-[#697052] transition-colors">
              I'm heading back
            </h2>
            <p className="text-xs sm:text-sm text-[#171717]/70 mt-2 leading-relaxed">
              Leaving Academic Block for hostel? Select your route to view parcels looking for a ride along your path.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-[#D8D1C3] flex items-center justify-between font-bold text-sm text-[#697052]">
            <span>View route compatibility</span>
            <div className="w-8 h-8 rounded-full bg-[#697052] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Live Campus Parcels Preview Bar */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#171717]">Recent requests around campus</h3>
            <p className="text-xs text-[#171717]/60">Live requests looking for a bringer</p>
          </div>

          <button
            onClick={() => setParcelSubView('bringer')}
            className="text-xs font-bold text-[#D94A2B] hover:underline flex items-center gap-1"
          >
            <span>See all {requests.length} requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.slice(0, 3).map(req => (
            <div
              key={req.id}
              onClick={() => setParcelSubView('bringer')}
              className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] hover:border-[#D94A2B] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-bold text-[#171717]">
                <span>{req.platform} Parcel</span>
                <span className="text-[#D94A2B]">
                  {req.reward > 0 ? `₹${req.reward}` : 'Free'}
                </span>
              </div>
              <div className="mt-2 text-xs text-[#171717]/70 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D94A2B]" />
                <span>{req.pickupLocation} → {req.dropLocation}</span>
              </div>
              <div className="mt-2 text-[10px] text-[#697052] font-semibold flex items-center justify-between">
                <span>By {req.requester.name}</span>
                <span>{req.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
