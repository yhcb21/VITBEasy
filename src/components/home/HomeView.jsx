import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, ArrowRight, Clock, ShieldCheck, Sparkles, Car, Printer, ShoppingBag, UtensilsCrossed, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomeView = () => {
  const { navigateTo, currentUser, requests, activeRequest } = useApp();

  // Active campus date
  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).toUpperCase().replace(',', ' ·');

  const pendingRequestsCount = requests.filter(r => r.status === 'REQUESTED').length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Editorial Header Section */}
      <section className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D94A2B]/10 via-[#697052]/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl">
          {/* Live Date Chip */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-bold tracking-widest text-[#697052] uppercase bg-[#F3F4EE] px-3 py-1 rounded-full border border-[#697052]/20">
              {todayDateStr}
            </span>
            <span className="text-xs font-semibold text-[#171717]/60 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Campus Live
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.1] text-[#171717] tracking-tight">
            Make campus life <br />
            <span className="italic font-normal text-[#D94A2B]">easier.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#171717]/80 font-normal leading-relaxed max-w-xl">
            Small problems. Simple solutions. Request a peer to bring your parcel from Academic Block for up to ₹20 tip — works seamlessly like campus peer-to-peer delivery.
          </p>

          {/* Quick Hero Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('parcel_bringer', 'requester')}
              className="px-6 py-3 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-full shadow-sm transition-all flex items-center gap-2 group"
            >
              <Package className="w-4 h-4" />
              <span>Request Parcel Pickup</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('parcel_bringer', 'bringer')}
              className="px-5 py-3 bg-[#171717] hover:bg-[#333333] text-white font-bold text-sm rounded-full transition-colors flex items-center gap-2"
            >
              <span>Accept Requests & Earn Tips</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Service Launcher Header */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#697052] tracking-wider uppercase">
              CAMPUS UTILITIES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
              What do you need today?
            </h2>
          </div>
          
          <button
            onClick={() => navigateTo('services')}
            className="text-xs font-bold text-[#D94A2B] hover:underline flex items-center gap-1"
          >
            <span>View all services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Services Area: Featured Parcel Bringer Card + Secondary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FEATURED SERVICE: PARCEL BRINGER (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border-2 border-[#D94A2B] rounded-3xl p-6 sm:p-8 relative shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            
            <div className="absolute top-4 right-4 bg-[#D94A2B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              ACTIVE FEATURE
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D94A2B]/10 text-[#D94A2B] flex items-center justify-center mb-4 border border-[#D94A2B]/20">
                <Package className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#697052]">
                PARCEL BRINGER SERVICE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mt-1 leading-snug">
                Peer-to-peer parcel collection.
              </h3>
              <p className="text-sm text-[#171717]/75 mt-2 leading-relaxed">
                Need your Amazon, Flipkart or Meesho parcel brought to your hostel? Raise a request with up to ₹20 tip. Any verified student heading back will pick it up for you!
              </p>

              {/* Status pill */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3] text-xs font-medium text-[#171717]">
                <span className="w-2 h-2 rounded-full bg-[#D94A2B]"></span>
                <span><strong>{pendingRequestsCount} active requests</strong> in campus pool</span>
              </div>
            </div>

            {/* Dominant Service Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#D8D1C3]">
              <button
                onClick={() => navigateTo('parcel_bringer', 'requester')}
                className="py-3.5 px-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-sm rounded-2xl shadow-sm transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Request a Parcel</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('parcel_bringer', 'bringer')}
                className="py-3.5 px-4 bg-[#F5F1E8] hover:bg-[#EBE5DA] text-[#171717] border border-[#D8D1C3] font-bold text-sm rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Accept & Pick Up</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECONDARY SERVICES (Spans 5 cols) - Note: Lost & Found removed as requested */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Secondary Service 1: Ride Share */}
            <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#697052] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#171717]/10 text-[#171717] flex items-center justify-center shrink-0 border border-[#171717]/20">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-[#171717]">Find a ride</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#697052] bg-[#F3F4EE] px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-[#171717]/70 mt-1">
                  Share auto-rickshaw or cab fare from campus gate to railway station or town.
                </p>
              </div>
            </div>

            {/* Secondary Service 2: Print & Xerox */}
            <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#697052] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#697052]/10 text-[#697052] flex items-center justify-center shrink-0 border border-[#697052]/20">
                <Printer className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-[#171717]">Print something</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#697052] bg-[#F3F4EE] px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-[#171717]/70 mt-1">
                  Send lab report PDFs to campus print shop before you arrive to skip the queue.
                </p>
              </div>
            </div>

            {/* Secondary Service 3: Campus Marketplace */}
            <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-2xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#697052] transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#D94A2B]/10 text-[#D94A2B] flex items-center justify-center shrink-0 border border-[#D94A2B]/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-[#171717]">Buy & sell on campus</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#697052] bg-[#F3F4EE] px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                </div>
                <p className="text-xs text-[#171717]/70 mt-1">
                  Buy & sell lab coats, mattresses, study material & tech items within campus.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Active Campus Task Banner */}
      {activeRequest && (
        <section className="bg-[#FBF0ED] border border-[#D94A2B]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D94A2B] text-white flex items-center justify-center font-bold text-sm shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#D94A2B] uppercase tracking-wider">ACTIVE TASK</span>
                <span className="text-[11px] font-medium text-[#171717]/60">Status: {activeRequest.status}</span>
              </div>
              <h4 className="font-bold text-sm text-[#171717] mt-0.5">
                {activeRequest.platform} Parcel ({activeRequest.pickupLocation} → {activeRequest.dropLocation})
              </h4>
            </div>
          </div>

          <button
            onClick={() => navigateTo('parcel_bringer', 'tracking')}
            className="px-4 py-2 bg-[#D94A2B] text-white text-xs font-bold rounded-xl hover:bg-[#C23E20] transition-colors shrink-0"
          >
            Track Delivery & PIN →
          </button>
        </section>
      )}

      {/* Campus Trust Banner */}
      <section className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#697052]/10 text-[#697052] flex items-center justify-center shrink-0 border border-[#697052]/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#171717]">Student-to-student peer network</h3>
            <p className="text-xs text-[#171717]/70 mt-0.5 max-w-lg">
              Verified campus students collect parcels on your behalf. A simple 4-digit Delivery PIN given at hostel door guarantees instant tip settlement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#697052]/10 text-[#697052] border border-[#697052]/30">
            ✓ Verified Campus Network
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D94A2B]/10 text-[#D94A2B] border border-[#D94A2B]/30">
            Max ₹20 Tip
          </span>
        </div>
      </section>

    </div>
  );
};
