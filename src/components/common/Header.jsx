import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCircle2, Package, Sparkles, User, ChevronRight } from 'lucide-react';

export const Header = () => {
  const { activeTab, navigateTo, notifications, unreadNotifCount, currentUser } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#D8D1C3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => navigateTo('home')} 
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#D94A2B] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
            VE
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#171717]">
                VITBEasy
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[#D8D1C3]/60 text-[#697052] rounded">
                Campus Utility
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FAF8F5] p-1.5 rounded-full border border-[#D8D1C3]">
          <button
            onClick={() => navigateTo('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'home'
                ? 'bg-[#171717] text-white shadow-sm'
                : 'text-[#171717]/70 hover:text-[#171717] hover:bg-[#D8D1C3]/40'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => navigateTo('services')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'services'
                ? 'bg-[#171717] text-white shadow-sm'
                : 'text-[#171717]/70 hover:text-[#171717] hover:bg-[#D8D1C3]/40'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => navigateTo('parcel_bringer')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'parcel_bringer'
                ? 'bg-[#D94A2B] text-white shadow-sm font-semibold'
                : 'text-[#D94A2B] font-semibold hover:bg-[#D94A2B]/10'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            Parcel Bringer
          </button>

          <button
            onClick={() => navigateTo('activity')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'activity'
                ? 'bg-[#171717] text-white shadow-sm'
                : 'text-[#171717]/70 hover:text-[#171717] hover:bg-[#D8D1C3]/40'
            }`}
          >
            Activity
          </button>

          <button
            onClick={() => navigateTo('profile')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-[#171717] text-white shadow-sm'
                : 'text-[#171717]/70 hover:text-[#171717] hover:bg-[#D8D1C3]/40'
            }`}
          >
            Profile
          </button>
        </nav>

        {/* Header Right Tools: Notifications & Profile Quick Chip */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="p-2 rounded-full border border-[#D8D1C3] bg-[#FAF8F5] text-[#171717] hover:bg-[#D8D1C3]/50 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-[#171717]" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D94A2B] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Notification Menu Popover */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FAF8F5] border border-[#D8D1C3] rounded-2xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C3]">
                  <h4 className="font-serif text-lg font-semibold text-[#171717]">Campus Updates</h4>
                  <span className="text-[11px] font-medium text-[#697052] bg-[#F3F4EE] px-2 py-0.5 rounded-full">
                    {notifications.length} recent
                  </span>
                </div>

                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-[#171717]/60 py-4 text-center">No new notifications</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3]/60 flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#D94A2B]/10 text-[#D94A2B] flex items-center justify-center shrink-0 mt-0.5">
                          <Package className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#171717] font-medium leading-snug">{n.text}</p>
                          <span className="text-[10px] text-[#697052] mt-1 block">{n.timeAgo}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Quick Tag */}
          <button
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-[#D8D1C3] bg-[#FAF8F5] hover:bg-[#D8D1C3]/30 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#D94A2B] text-white font-bold text-[10px] flex items-center justify-center">
              {currentUser.initials}
            </div>
            <span className="text-xs font-semibold text-[#171717] hidden sm:inline-block">
              {currentUser.name}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
