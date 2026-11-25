import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Star, ShieldCheck, Package, User, Bell, HelpCircle, AlertTriangle, ChevronRight, Settings, Check, Users } from 'lucide-react';

export const ProfileView = () => {
  const { currentUser, navigateTo, allUsers, switchUser } = useApp();
  const [showGearDropdown, setShowGearDropdown] = useState(false);
  const gearRef = useRef(null);

  // Close gear dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (gearRef.current && !gearRef.current.contains(e.target)) {
        setShowGearDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Profile Header Card */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            
            {/* Avatar Circle */}
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full text-white font-bold text-2xl flex items-center justify-center shadow-md shrink-0 border-4 border-[#FAF8F5]"
              style={{ backgroundColor: currentUser?.avatarBg || '#D94A2B' }}
            >
              {currentUser?.initials || 'U1'}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
                  {currentUser?.name || 'test_user_1'}
                </h1>
                <CheckCircle2 className="w-5 h-5 text-[#697052]" />
              </div>

              <p className="text-xs text-[#171717]/70 font-mono mt-0.5">
                {currentUser?.department}
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px] font-bold text-[#697052] bg-[#F3F4EE] px-2.5 py-0.5 rounded-full border border-[#697052]/20">
                  Verified VIT Student ✓
                </span>

                <span className="text-[11px] font-bold text-[#D94A2B] bg-[#D94A2B]/10 px-2.5 py-0.5 rounded-full border border-[#D94A2B]/20 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#D94A2B]" />
                  {currentUser?.rating} Rating
                </span>

                <span className="text-[11px] font-bold text-[#171717] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#D8D1C3] uppercase tracking-wider">
                  Hostel: {currentUser?.defaultHostel}
                </span>
              </div>
            </div>

          </div>

          {/* Settings Gear with Profile Switch Dropdown */}
          <div className="relative" ref={gearRef}>
            <button
              onClick={() => setShowGearDropdown(!showGearDropdown)}
              title="Profile Settings & Switch Profile"
              className={`p-3 rounded-full border transition-all flex items-center justify-center ${
                showGearDropdown
                  ? 'border-[#D94A2B] bg-[#D94A2B] text-white shadow-xs'
                  : 'border-[#D8D1C3] bg-[#F5F1E8] hover:bg-[#D8D1C3]/50 text-[#171717]'
              }`}
            >
              <Settings className={`w-5 h-5 transition-transform ${showGearDropdown ? 'rotate-90' : ''}`} />
            </button>

            {/* Dropdown Menu directly from Gear */}
            {showGearDropdown && (
              <div className="absolute right-0 top-14 w-64 bg-[#FAF8F5] border border-[#D8D1C3] rounded-2xl shadow-xl z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200 space-y-2">
                <div className="px-2 py-1 border-b border-[#D8D1C3] pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D94A2B]" />
                    <span className="text-[11px] font-bold text-[#171717] uppercase tracking-wider">
                      Switch Profile
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-[#697052] bg-[#F3F4EE] px-2 py-0.5 rounded-full">
                    Demo
                  </span>
                </div>

                <div className="space-y-1">
                  {allUsers?.map((u) => {
                    const isSelected = u.id === currentUser?.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchUser(u.id);
                          setShowGearDropdown(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#D94A2B] text-white shadow-xs'
                            : 'hover:bg-[#F5F1E8] text-[#171717]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ${
                              isSelected ? 'ring-2 ring-white/50' : ''
                            }`}
                            style={{ backgroundColor: u.avatarBg || '#171717' }}
                          >
                            {u.initials}
                          </div>
                          <div className="min-w-0">
                            <strong className="text-xs font-bold block truncate font-mono">{u.name}</strong>
                            <span className={`text-[10px] block ${isSelected ? 'text-white/80' : 'text-[#697052]'}`}>
                              {u.role === 'bringer' ? 'Bringer' : 'Requester'} · {u.defaultHostel?.split(' ')[0]}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <Check className="w-4 h-4 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reputable Stats Counter */}
        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#D8D1C3]">
          
          <div className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3]">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-serif block">
              {currentUser?.parcelsBrought}
            </span>
            <span className="text-xs font-bold text-[#697052] uppercase tracking-wider mt-1 block">
              Parcels brought
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FBF0ED] border border-[#D94A2B]/30">
            <span className="text-3xl sm:text-4xl font-extrabold text-[#D94A2B] font-serif block">
              {currentUser?.parcelsReceived}
            </span>
            <span className="text-xs font-bold text-[#D94A2B] uppercase tracking-wider mt-1 block">
              Parcels received
            </span>
          </div>

        </div>

      </div>

      {/* Account & Safety Settings List */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 space-y-3 shadow-sm">
        <h3 className="text-xs font-bold text-[#697052] uppercase tracking-wider mb-2">
          ACCOUNT & TRUST PREFERENCES
        </h3>

        {[
          { label: 'Campus Verification', desc: 'VIT student email & biometric verified', icon: ShieldCheck },
          { label: 'Activity & History', desc: 'View past deliveries and ride logs', icon: Package, action: () => navigateTo('activity') },
          { label: 'Notification Preferences', desc: 'SMS & in-app alerts for pickup codes', icon: Bell },
          { label: 'Help & Campus Guidelines', desc: 'Learn campus utility safety rules', icon: HelpCircle },
          { label: 'Report an issue', desc: 'Dispute delivery or report missing item', icon: AlertTriangle },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={item.action || null}
              className="p-4 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] hover:border-[#697052] flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#D8D1C3] flex items-center justify-center text-[#171717]">
                  <Icon className="w-4 h-4 text-[#D94A2B]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#171717]">{item.label}</h4>
                  <p className="text-xs text-[#171717]/60">{item.desc}</p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[#171717]/40" />
            </div>
          );
        })}
      </div>

    </div>
  );
};
