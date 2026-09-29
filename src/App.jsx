import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { HomeView } from './components/home/HomeView';
import { ServiceDirectory } from './components/services/ServiceDirectory';
import { ParcelServiceContainer } from './components/parcel/ParcelServiceContainer';
import { ActivityTimeline } from './components/activity/ActivityTimeline';
import { ProfileView } from './components/profile/ProfileView';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent = () => {
  const { activeTab, toast } = useApp();

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#171717] flex flex-col justify-between">
      
      <div>
        {/* Header Bar */}
        <Header />

        {/* Global Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-4 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#171717] text-white shadow-xl flex items-center gap-3 border border-[#D8D1C3]/30"
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-[#D94A2B] shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <span className="text-xs font-semibold leading-tight">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main View Container */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 md:pb-12">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'services' && <ServiceDirectory />}
          {activeTab === 'parcel_bringer' && <ParcelServiceContainer />}
          {activeTab === 'activity' && <ActivityTimeline />}
          {activeTab === 'profile' && <ProfileView />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#FAF8F5] border-t border-[#D8D1C3] py-8 text-center text-xs text-[#171717]/60 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#171717]">VITBEasy</span>
            <span>· Campus Utility Platform</span>
          </div>
          <p className="text-[11px] text-[#697052]">
            Designed natively for everyday campus life at VIT Bhopal.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <Navigation />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
