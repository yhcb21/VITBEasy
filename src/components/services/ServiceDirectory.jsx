import React from 'react';
import { useApp } from '../../context/AppContext';
import { Package, Car, Printer, ShoppingBag, UtensilsCrossed, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceDirectory = () => {
  const { services, navigateTo } = useApp();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Package': return <Package className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Printer': return <Printer className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Directory Page Header */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8">
        <span className="text-xs font-bold text-[#697052] uppercase tracking-wider bg-[#F3F4EE] px-3 py-1 rounded-full border border-[#697052]/20">
          CAMPUS UTILITY DIRECTORY
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mt-3">
          Services built for student life.
        </h1>
        <p className="text-sm sm:text-base text-[#171717]/70 mt-2 max-w-2xl leading-relaxed">
          VITBEasy connects campus students to solve daily friction — starting with peer parcel bringing (max ₹20 tip).
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const isFeatured = service.isFeatured;
          const isAvailable = service.isAvailable;

          return (
            <motion.div
              key={service.id}
              whileHover={{ y: -3 }}
              className={`relative bg-[#FAF8F5] rounded-3xl p-6 border ${
                isFeatured 
                  ? 'border-2 border-[#D94A2B] shadow-sm' 
                  : 'border-[#D8D1C3]'
              } flex flex-col justify-between transition-all group`}
            >
              {/* Badge Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isAvailable 
                    ? 'bg-[#D94A2B]/10 text-[#D94A2B] border border-[#D94A2B]/20' 
                    : 'bg-[#697052]/10 text-[#697052] border border-[#697052]/20'
                }`}>
                  {getIcon(service.icon)}
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  isAvailable
                    ? 'bg-[#D94A2B] text-white shadow-xs'
                    : 'bg-[#F3F4EE] text-[#697052] border border-[#697052]/20'
                }`}>
                  {service.badgeText}
                </span>
              </div>

              {/* Action-Oriented Title & Description */}
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#171717] group-hover:text-[#D94A2B] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-[#171717]/70 leading-relaxed">
                  {service.tagline}
                </p>
                <p className="text-xs text-[#697052] font-medium pt-1">
                  {service.shortDesc}
                </p>
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-[#D8D1C3]">
                {isAvailable ? (
                  <button
                    onClick={() => navigateTo('parcel_bringer', 'hub')}
                    className="w-full py-3 px-4 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-xs rounded-2xl shadow-xs transition-transform active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>Launch Parcel Bringer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-full py-2.5 px-3 bg-[#F5F1E8] border border-[#D8D1C3] rounded-2xl text-center flex items-center justify-center gap-2 text-xs font-semibold text-[#697052]">
                    <Lock className="w-3.5 h-3.5 text-[#697052]" />
                    <span>{service.comingSoonLabel || 'Coming soon'}</span>
                  </div>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
