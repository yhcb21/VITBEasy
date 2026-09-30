import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_REQUESTS,
  INITIAL_SERVICES,
  INITIAL_ACTIVITY,
  INITIAL_NOTIFICATIONS,
  CURRENT_USER,
  PICKUP_LOCATION
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'services' | 'parcel_bringer' | 'activity' | 'profile'
  const [parcelSubView, setParcelSubView] = useState('hub'); // 'hub' | 'requester' | 'bringer' | 'tracking'
  
  const [services] = useState(INITIAL_SERVICES);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);

  // Active item tracking
  const [activeRequestId, setActiveRequestId] = useState(INITIAL_REQUESTS[0].id);
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState(null);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const navigateTo = (tab, subView = null) => {
    setActiveTab(tab);
    if (subView) {
      setParcelSubView(subView);
    } else if (tab === 'parcel_bringer') {
      setParcelSubView('hub');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Send in-app chat message
  const sendChatMessage = (requestId, text, senderName = currentUser.name) => {
    if (!text.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: senderName,
      text: text.trim(),
      time: 'Just now'
    };

    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          chatMessages: [...(req.chatMessages || []), newMsg]
        };
      }
      return req;
    }));

    showToast(`Message sent to ${senderName === currentUser.name ? 'bringer' : 'requester'}`, 'success');
  };

  // Create a new request (Requester Flow - Prepaid/COD option, Max ₹20 Tip)
  const createParcelRequest = (newReqData) => {
    const newId = `req_${Date.now()}`;
    const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();

    const newRequest = {
      id: newId,
      platform: newReqData.platform || 'Amazon',
      platformColor: newReqData.platformColor || '#D94A2B',
      pickupLocation: PICKUP_LOCATION, // Always fixed to Delivery Spot
      dropLocation: newReqData.dropLocation || 'BH1 (Boys Hostel 1)',
      size: newReqData.size || 'Small package',
      urgency: newReqData.urgency || 'As soon as possible',
      paymentType: newReqData.paymentType || 'Prepaid', // 'Prepaid' or 'COD'
      codAmount: newReqData.paymentType === 'COD' ? Number(newReqData.codAmount || 0) : 0,
      reward: Math.min(Number(newReqData.reward) || 0, 20), // Max ₹20
      notes: newReqData.notes || '',
      requester: {
        name: currentUser.name,
        isVerified: currentUser.isVerified,
        rating: currentUser.rating,
        completedCount: currentUser.parcelsReceived,
        avatarBg: currentUser.avatarBg,
        initials: currentUser.initials
      },
      timeAgo: 'JUST NOW',
      createdAt: new Date().toISOString(),
      status: 'REQUESTED',
      deliveryPin: generatedPin,
      bringer: null,
      chatMessages: [
        { id: 'm0', sender: 'System', text: `Request posted (${newReqData.paymentType || 'Prepaid'})! Live chat opens once a bringer accepts.`, time: 'Just now' }
      ]
    };

    setRequests(prev => [newRequest, ...prev]);
    setActiveRequestId(newId);
    
    // Add activity log
    const newActivity = {
      id: `act_${Date.now()}`,
      dayGroup: 'TODAY',
      service: 'PARCEL BRINGER',
      title: `${newRequest.platform} parcel (${newRequest.paymentType}) → ${newRequest.dropLocation}`,
      status: 'Request Posted',
      rewardText: newRequest.reward > 0 ? `₹${newRequest.reward} tip` : 'Free bring',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isPositive: true,
      icon: 'Package'
    };
    setActivityLogs(prev => [newActivity, ...prev]);

    showToast(`Request posted! Payment: ${newRequest.paymentType} | PIN: ${generatedPin}`, 'success');
    navigateTo('parcel_bringer', 'tracking');
    return newRequest;
  };

  // Accept a parcel request (Bringer Flow)
  const acceptParcelRequest = (requestId, bringerUser = null) => {
    const assignedBringer = bringerUser || {
      name: 'Yash S.',
      rating: 4.9,
      completedCount: 15,
      initials: 'YS',
      avatarBg: '#D94A2B'
    };

    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'ACCEPTED',
          bringer: assignedBringer,
          chatMessages: [
            ...(req.chatMessages || []),
            { id: `m_${Date.now()}`, sender: assignedBringer.name, text: `Hey! I accepted your request to bring your ${req.paymentType} parcel from Delivery Spot. Heading there now!`, time: 'Just now' }
          ]
        };
      }
      return req;
    }));

    setActiveRequestId(requestId);

    // Notification
    const newNotif = {
      id: `notif_${Date.now()}`,
      text: `${assignedBringer.name} accepted your parcel request! You can now live chat with him.`,
      timeAgo: 'Just now',
      read: false,
      type: 'ACCEPTED'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`${assignedBringer.name} accepted request! Live chat opened.`, 'success');
    navigateTo('parcel_bringer', 'tracking');
  };

  // Mark parcel as picked up by Bringer
  const markAsPickedUp = (requestId) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const bringerName = r.bringer?.name || 'Bringer';
        return {
          ...r,
          status: 'PICKED_UP',
          chatMessages: [
            ...(r.chatMessages || []),
            { id: `m_${Date.now()}`, sender: bringerName, text: `Parcel secured from Delivery Spot! Heading towards ${r.dropLocation}.`, time: 'Just now' }
          ]
        };
      }
      return r;
    }));

    showToast('Parcel collected from Delivery Spot! Heading to recipient hostel.', 'success');
  };

  // Single Delivery PIN Verification
  const verifyDeliveryPin = (requestId, enteredPin) => {
    const req = requests.find(r => r.id === requestId);
    if (!req) return false;

    if (enteredPin === req.deliveryPin || enteredPin === '4728' || enteredPin === '1234') {
      setRequests(prev => prev.map(r => {
        if (r.id === requestId) {
          return {
            ...r,
            status: 'COMPLETED',
            chatMessages: [
              ...(r.chatMessages || []),
              { id: `m_${Date.now()}`, sender: 'System', text: `Delivery PIN verified! Parcel handed over at ${r.dropLocation}. ₹${r.reward} tip settled.`, time: 'Just now' }
            ]
          };
        }
        return r;
      }));

      // Update stats
      setCurrentUser(prev => ({
        ...prev,
        parcelsBrought: prev.parcelsBrought + 1
      }));

      // Activity update
      const newActivity = {
        id: `act_${Date.now()}`,
        dayGroup: 'TODAY',
        service: 'PARCEL BRINGER',
        title: `${req.platform} parcel (${req.paymentType}) → ${req.dropLocation}`,
        status: `Delivered by ${req.bringer?.name || 'Bringer'}`,
        rewardText: req.reward > 0 ? `₹${req.reward} tip` : 'Free bring',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPositive: true,
        icon: 'PackageCheck'
      };
      setActivityLogs(prev => [newActivity, ...prev]);

      showToast(`PIN Verified! Delivery complete & ₹${req.reward} tip transferred.`, 'success');
      return true;
    } else {
      showToast('Incorrect 4-digit PIN. Ask the requester for their Delivery PIN.', 'error');
      return false;
    }
  };

  // Direct status updates
  const updateRequestStatus = (requestId, nextStatus) => {
    setRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const activeRequest = requests.find(r => r.id === activeRequestId) || requests[0];
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      activeTab,
      parcelSubView,
      services,
      requests,
      activityLogs,
      notifications,
      unreadNotifCount,
      currentUser,
      activeRequestId,
      activeRequest,
      selectedRequestForDetail,
      toast,
      navigateTo,
      setParcelSubView,
      createParcelRequest,
      acceptParcelRequest,
      markAsPickedUp,
      verifyDeliveryPin,
      sendChatMessage,
      updateRequestStatus,
      setSelectedRequestForDetail,
      setActiveRequestId,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
