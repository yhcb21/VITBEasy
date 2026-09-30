import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Clock, MapPin, PackageCheck, KeyRound, Star, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const ActiveTrackingCard = () => {
  const { activeRequest, markAsPickedUp, verifyDeliveryPin, sendChatMessage, currentUser, setParcelSubView } = useApp();

  // Determine user role automatically based on who the current user is.
  // viewPerspective drives all role-based UI splits in this component.
  const isRequester = activeRequest?.requester?.name === currentUser.name || activeRequest?.requester?.name === 'Dishant B.';
  const viewPerspective = isRequester ? 'requester' : 'bringer';

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(true);

  if (!activeRequest) {
    return (
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-8 text-center space-y-4 max-w-lg mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[#697052]/10 text-[#697052] mx-auto flex items-center justify-center">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#171717]">No active parcel tracking</h3>
        <p className="text-xs text-[#171717]/70">
          Request a parcel or accept one from the campus pool to track status.
        </p>
        <button
          onClick={() => setParcelSubView('hub')}
          className="px-5 py-2.5 bg-[#D94A2B] text-white text-xs font-bold rounded-2xl hover:bg-[#C23E20]"
        >
          Go to Parcel Hub
        </button>
      </div>
    );
  }

  const {
    id,
    platform,
    platformColor,
    pickupLocation,
    dropLocation,
    size,
    paymentType = 'Prepaid',
    codAmount = 0,
    reward,
    status,
    requester,
    bringer,
    deliveryPin,
    chatMessages = []
  } = activeRequest;

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (enteredPin.length < 4) {
      setPinError('Please enter all 4 digits');
      return;
    }
    const success = verifyDeliveryPin(id, enteredPin);
    if (success) {
      setEnteredPin('');
      setPinError('');
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D94A2B', '#697052', '#D8D1C3']
        });
      } catch (err) {}
    } else {
      setPinError('Incorrect Delivery PIN');
    }
  };

  const handleSendChat = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const senderName = viewPerspective === 'requester' ? (requester?.name || currentUser.name) : (bringer?.name || 'Yash S.');
    sendChatMessage(id, chatInput, senderName);
    setChatInput('');
  };

  const sendQuickChip = (text) => {
    const senderName = viewPerspective === 'requester' ? (requester?.name || currentUser.name) : (bringer?.name || 'Yash S.');
    sendChatMessage(id, text, senderName);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      

      {/* Active Order Card */}
      <div className="bg-[#FAF8F5] border-2 border-[#D94A2B] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Status Chip & Badges */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#D94A2B] uppercase tracking-wider bg-[#D94A2B]/10 px-3 py-1 rounded-full border border-[#D94A2B]/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D94A2B] animate-ping"></span>
            {status === 'ACCEPTED' ? 'BRINGER ASSIGNED' : status === 'PICKED_UP' ? 'PARCEL IN TRANSIT' : status === 'COMPLETED' ? 'DELIVERED & COMPLETED' : 'SEARCHING FOR BRINGER'}
          </span>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold ${
              paymentType === 'COD' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              {paymentType === 'COD' ? `COD ₹${codAmount}` : 'Prepaid'}
            </span>

            <span className="text-xs font-extrabold text-[#D94A2B] bg-[#FBF0ED] px-3 py-1 rounded-full border border-[#D94A2B]/30">
              {reward > 0 ? `₹${reward} Tip` : 'Free Bring'}
            </span>
          </div>
        </div>

        {/* Parcel Heading */}
        <div className="mt-4">
          <h2 className="font-serif text-3xl font-bold text-[#171717]">
            {platform} Parcel ({size})
          </h2>
          <p className="text-xs font-medium text-[#171717]/70 mt-1 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D94A2B]" />
            <span>Delivery Spot → <strong>{dropLocation}</strong></span>
          </p>
        </div>

        {/* Bringer / Requester Profile Card */}
        {bringer ? (
          <div className="mt-6 p-4 rounded-2xl bg-[#F5F1E8] border border-[#D8D1C3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#D94A2B] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                {viewPerspective === 'requester' ? (bringer.initials || 'YS') : (requester?.initials || 'DB')}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#171717]">
                  <span>{viewPerspective === 'requester' ? bringer.name : requester?.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#697052]" />
                </div>
                <div className="flex items-center gap-1 text-xs text-[#171717]/70 mt-0.5">
                  <Star className="w-3 h-3 text-[#D94A2B] fill-[#D94A2B]" />
                  <span>{viewPerspective === 'requester' ? bringer.rating : requester?.rating} ★ · {viewPerspective === 'requester' ? 'Assigned Bringer' : 'Requester'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowChat(!showChat)}
              className="px-3.5 py-1.5 rounded-full bg-[#D94A2B] text-white text-xs font-bold hover:bg-[#C23E20] flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Chat ({chatMessages.length})</span>
            </button>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-2xl bg-[#FBF0ED] border border-[#D94A2B]/30 text-xs font-semibold text-[#D94A2B] flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Request active in Delivery Spot feed. Waiting for bringer...</span>
          </div>
        )}

      </div>

      {/* LIVE CHAT */}
      {showChat && bringer && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#D8D1C3] pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#D94A2B]" />
              <h3 className="font-serif text-xl font-bold text-[#171717]">
                Live Chat ({viewPerspective === 'requester' ? `with ${bringer.name}` : `with ${requester?.name}`})
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#697052] bg-[#F3F4EE] px-2.5 py-0.5 rounded-full">
              Direct Chat
            </span>
          </div>

          {/* Messages */}
          <div className="bg-[#F5F1E8] border border-[#D8D1C3] rounded-2xl p-4 max-h-56 overflow-y-auto space-y-3">
            {chatMessages.length === 0 ? (
              <p className="text-xs text-[#171717]/60 text-center py-4">No messages yet</p>
            ) : (
              chatMessages.map((m) => {
                const currentSender = viewPerspective === 'requester' ? requester?.name : bringer?.name;
                const isMe = m.sender === currentSender || m.sender === currentUser.name;
                const isSystem = m.sender === 'System';

                if (isSystem) {
                  return (
                    <div key={m.id} className="text-center py-1">
                      <span className="text-[10px] font-semibold text-[#697052] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#D8D1C3] inline-block">
                        {m.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1 mb-0.5 text-[10px] text-[#697052] font-semibold">
                      <span>{m.sender}</span>
                      <span>· {m.time}</span>
                    </div>
                    <div className={`p-3 rounded-2xl text-xs max-w-xs ${
                      isMe 
                        ? 'bg-[#D94A2B] text-white font-medium rounded-tr-none' 
                        : 'bg-[#FAF8F5] text-[#171717] border border-[#D8D1C3] rounded-tl-none font-medium'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5">
            {viewPerspective === 'requester' ? (
              <>
                <button
                  onClick={() => sendQuickChip("Waiting at hostel lobby")}
                  className="text-[11px] font-medium bg-[#F5F1E8] hover:bg-[#D8D1C3]/40 border border-[#D8D1C3] px-2.5 py-1 rounded-full text-[#171717]"
                >
                  "Waiting at hostel lobby"
                </button>
                <button
                  onClick={() => sendQuickChip("Got PIN ready!")}
                  className="text-[11px] font-medium bg-[#F5F1E8] hover:bg-[#D8D1C3]/40 border border-[#D8D1C3] px-2.5 py-1 rounded-full text-[#171717]"
                >
                  "Got PIN ready"
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => sendQuickChip("I am at Delivery Spot right now")}
                  className="text-[11px] font-medium bg-[#F5F1E8] hover:bg-[#D8D1C3]/40 border border-[#D8D1C3] px-2.5 py-1 rounded-full text-[#171717]"
                >
                  "I am at Delivery Spot"
                </button>
                <button
                  onClick={() => sendQuickChip("Reached hostel entrance!")}
                  className="text-[11px] font-medium bg-[#F5F1E8] hover:bg-[#D8D1C3]/40 border border-[#D8D1C3] px-2.5 py-1 rounded-full text-[#171717]"
                >
                  "Reached hostel entrance!"
                </button>
              </>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              placeholder={`Message ${viewPerspective === 'requester' ? bringer.name : requester?.name}...`}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-[#F5F1E8] border border-[#D8D1C3] text-xs text-[#171717] font-medium focus:border-[#D94A2B] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-[#D94A2B] hover:bg-[#C23E20] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>

        </motion.div>
      )}

      {/* STRICT ROLE-BASED PIN SECTION */}
      <div className="bg-[#FAF8F5] border border-[#D8D1C3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* REQUESTER MODE: SHOWS ONLY THE 4-DIGIT PIN (NO INPUT BOX SHOWN AT ALL) */}
        {viewPerspective === 'requester' && (
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#D94A2B]/10 text-[#D94A2B] mx-auto flex items-center justify-center border border-[#D94A2B]/20">
              <KeyRound className="w-6 h-6" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-[#171717]">
              Delivery PIN
            </h3>

            {/* Clean PIN Display Box */}
            <div className="p-6 rounded-2xl bg-[#FBF0ED] border-2 border-[#D94A2B]/40 text-center space-y-1 shadow-xs max-w-md mx-auto">
              <span className="text-[10px] font-bold text-[#D94A2B] uppercase tracking-widest block">
                YOUR DELIVERY PIN
              </span>
              <div className="font-mono text-5xl font-extrabold text-[#171717] tracking-[0.35em] py-2">
                {deliveryPin || '4728'}
              </div>
              <p className="text-xs text-[#171717]/80 font-medium pt-1">
                Share this PIN with {bringer?.name || 'Yash S.'} at {dropLocation} upon parcel hand-off.
              </p>
            </div>
          </div>
        )}

        {/* BRINGER MODE: SHOWS ONLY THE INPUT BOX & PICKUP BUTTON (NO PIN NUMBER SHOWN AT ALL) */}
        {viewPerspective === 'bringer' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl font-bold text-[#171717]">
                Collect & Verify Hand-Off
              </h3>
            </div>

            {/* Mark Picked Up Action */}
            {status === 'ACCEPTED' && (
              <button
                onClick={() => markAsPickedUp(id)}
                className="w-full py-4 bg-[#171717] hover:bg-[#333333] text-white font-bold text-xs rounded-2xl shadow-sm transition-transform active:scale-98 flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Mark as Picked Up from Delivery Spot</span>
              </button>
            )}

            {/* PIN Input Box for Bringer */}
            <form onSubmit={handleVerifyPin} className="space-y-3 bg-[#F5F1E8] p-5 rounded-2xl border border-[#D8D1C3] max-w-md mx-auto">
              <label className="text-xs font-bold text-[#171717] block">
                Enter {requester?.name || 'Requester'}'s Delivery PIN:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Enter 4-digit PIN"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="flex-1 p-3.5 rounded-xl bg-white border border-[#D8D1C3] text-base font-mono font-bold text-center tracking-widest focus:border-[#D94A2B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-[#D94A2B] hover:bg-[#C23E20] text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
                >
                  Verify PIN
                </button>
              </div>
              {pinError && <p className="text-xs text-[#D94A2B] font-bold">{pinError}</p>}
            </form>

          </div>
        )}

        {/* Completed State */}
        {status === 'COMPLETED' && (
          <div className="p-5 rounded-2xl bg-[#F5F1E8] border-2 border-emerald-600/30 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#171717]">
              Parcel Delivery Completed
            </h4>
            <p className="text-xs text-[#171717]/80 max-w-sm mx-auto">
              Delivery Spot → {dropLocation} · Delivered by {bringer?.name || 'Yash S.'} · {reward > 0 ? `₹${reward} tip settled` : 'Free bring completed'} ✓
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
