import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Grid, Package, Clock, User } from 'lucide-react';

export const Navigation = () => {
  const { activeTab, navigateTo } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'parcel_bringer', label: 'Parcel', icon: Package, highlight: true },
    { id: 'activity', label: 'Activity', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5] border-t border-[#D8D1C3] px-3 py-2 pb-safe">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          if (item.highlight) {
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-transform active:scale-95 ${
                  isActive ? 'bg-[#D94A2B] text-white shadow-md' : 'bg-[#D94A2B]/10 text-[#D94A2B]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-semibold mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-colors ${
                isActive ? 'text-[#D94A2B] font-bold' : 'text-[#171717]/60 hover:text-[#171717]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
