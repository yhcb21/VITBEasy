import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, PackageCheck, Car, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export const ActivityTimeline = () => {
  const { activityLogs } = useApp();

  // Group activity by dayGroup (TODAY, YESTERDAY, MONDAY...)
  const grouped = activityLogs.reduce((acc, log) => {
    const group = log.dayGroup || 'RECENT';
    if (!acc[group]) acc[group] = [];
    acc[group].push(log);
    return acc;
  }, {});

  const getServiceBadgeColor = (service) => {
    if (service?.includes('PARCEL')) return 'bg-[#D94A2B]/10 text-[#D94A2B] border-[#D94A2B]/20';
    if (service?.includes('RIDE')) return 'bg-[#171717]/10 text-[#171717] border-[#171717]/20';
    if (service?.includes('LOST')) return 'bg-[#697052]/10 text-[#697052] border-[#697052]/20';
    return 'bg-[#697052]/10 text-[#697052] border-[#697052]/20';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      
      {/* Activity Header */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8">
        <span className="text-xs font-bold text-[#697052] uppercase tracking-wider bg-[#F3F4EE] px-3 py-1 rounded-full border border-[#697052]/20">
          PLATFORM ACTIVITY TIMELINE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] mt-3">
          Your campus interactions.
        </h1>
        <p className="text-xs sm:text-sm text-[#171717]/70 mt-2">
          Unified transaction and request history across Parcel Bringer, Ride Share, and Lost & Found.
        </p>
      </div>

      {/* Grouped Timeline */}
      <div className="space-y-8">
        {Object.keys(grouped).map((dayKey) => (
          <div key={dayKey} className="space-y-4">
            
            {/* Day Header */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-widest text-[#697052] uppercase bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#D8D1C3]">
                {dayKey}
              </span>
              <div className="flex-1 h-px bg-[#D8D1C3]"></div>
            </div>

            {/* List of items */}
            <div className="space-y-3">
              {grouped[dayKey].map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF8F5] border border-[#D8D1C3] hover:border-[#697052] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3] flex items-center justify-center text-[#171717] shrink-0">
                      {item.service?.includes('RIDE') ? (
                        <Car className="w-5 h-5 text-[#171717]" />
                      ) : item.service?.includes('LOST') ? (
                        <CheckCircle2 className="w-5 h-5 text-[#697052]" />
                      ) : (
                        <PackageCheck className="w-5 h-5 text-[#D94A2B]" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getServiceBadgeColor(item.service)}`}>
                          {item.service}
                        </span>
                        <span className="text-[11px] text-[#697052]">{item.timestamp}</span>
                      </div>

                      <h4 className="font-bold text-sm text-[#171717] mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#171717]/70">
                        {item.status}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#D94A2B] bg-[#D94A2B]/10 px-3 py-1 rounded-full border border-[#D94A2B]/20 inline-block">
                      {item.rewardText}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
