import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParcelBringerHub } from './ParcelBringerHub';
import { RequesterWizard } from './RequesterWizard';
import { BringerRouteMatcher } from './BringerRouteMatcher';
import { ActiveTrackingCard } from './ActiveTrackingCard';
import { Package, Navigation, Clock, Sparkles } from 'lucide-react';

export const ParcelServiceContainer = () => {
  const { parcelSubView, setParcelSubView } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Service Sub-navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#D8D1C3] pb-3 overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setParcelSubView('hub')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              parcelSubView === 'hub'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#171717]/70 hover:bg-[#D8D1C3]/40'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Parcel Hub</span>
          </button>

          <button
            onClick={() => setParcelSubView('requester')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              parcelSubView === 'requester'
                ? 'bg-[#D94A2B] text-white shadow-xs'
                : 'text-[#D94A2B] hover:bg-[#D94A2B]/10'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>I Need My Parcel</span>
          </button>

          <button
            onClick={() => setParcelSubView('bringer')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              parcelSubView === 'bringer'
                ? 'bg-[#697052] text-white shadow-xs'
                : 'text-[#697052] hover:bg-[#697052]/10'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>I'm Heading Back</span>
          </button>

          <button
            onClick={() => setParcelSubView('tracking')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              parcelSubView === 'tracking'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#171717]/70 hover:bg-[#D8D1C3]/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Active Tracking</span>
          </button>
        </div>
      </div>

      {/* Render Subview */}
      {parcelSubView === 'hub' && <ParcelBringerHub />}
      {parcelSubView === 'requester' && <RequesterWizard />}
      {parcelSubView === 'bringer' && <BringerRouteMatcher />}
      {parcelSubView === 'tracking' && <ActiveTrackingCard />}

    </div>
  );
};
