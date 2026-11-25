import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  INITIAL_REQUESTS,
  INITIAL_SERVICES,
  INITIAL_ACTIVITY,
  INITIAL_NOTIFICATIONS,
  ALL_USERS,
  CURRENT_USER,
  PICKUP_LOCATION
} from '../data/mockData';

const AppContext = createContext();

const API_BASE = 'http://localhost:5000/api';
const socket = io('http://localhost:5000', {
  autoConnect: true,
  reconnection: true,
  transports: ['websocket', 'polling']
});

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'parcel_bringer' | 'activity' | 'profile'
  const [parcelSubView, setParcelSubView] = useState('hub'); // 'hub' | 'requester' | 'bringer' | 'tracking'
  
  const [services] = useState(INITIAL_SERVICES);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [allUsersList, setAllUsersList] = useState(ALL_USERS);

  // Each window/tab has its own independent session via sessionStorage
  // Window 1 defaults to test_user_1 (Requester), or loads whatever was picked in that tab
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('vitbeasy_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return CURRENT_USER; // Default: test_user_1
  });

  const isAuthenticated = true;

  const [activeRequestId, setActiveRequestId] = useState(INITIAL_REQUESTS[0].id);
  const [selectedRequestForDetail, setSelectedRequestForDetail] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Switch profile in this specific window/tab (from Profile tab gear icon)
  const switchUser = (userId) => {
    const target = allUsersList.find(u => u.id === userId) || (currentUser.id === 'test_user_1' ? allUsersList[1] : allUsersList[0]);
    setCurrentUser(target);
    try {
      sessionStorage.setItem('vitbeasy_user', JSON.stringify(target));
    } catch (e) {}
    showToast(`Active profile: ${target.name} (${target.role === 'requester' ? 'Requester' : 'Bringer'})`, 'success');
  };

  // Initial Fetch & Real-time Socket Setup
  useEffect(() => {
    fetch(`${API_BASE}/users`)
      .then(res => res.json())
      .then(users => {
        if (Array.isArray(users) && users.length > 0) {
          setAllUsersList(users);
        }
      })
      .catch(() => {});

    fetch(`${API_BASE}/requests`)
      .then(res => res.json())
      .then(reqs => {
        if (Array.isArray(reqs) && reqs.length > 0) {
          setRequests(reqs);
          setActiveRequestId(reqs[0].id);
        }
      })
      .catch(() => {});

    socket.on('requests_updated', (updatedRequests) => {
      setRequests(updatedRequests);
    });

    socket.on('request_created', (newReq) => {
      setRequests(prev => {
        if (prev.some(r => r.id === newReq.id)) return prev;
        return [newReq, ...prev];
      });
      if (newReq.requesterId !== currentUser?.id) {
        showToast(`New parcel request posted by ${newReq.requester?.name || 'a student'}!`, 'info');
      }
    });

    socket.on('request_updated', (updatedReq) => {
      setRequests(prev => prev.map(r => r.id === updatedReq.id ? updatedReq : r));

      if (updatedReq.requesterId === currentUser?.id && updatedReq.status === 'ACCEPTED') {
        showToast(`${updatedReq.bringer?.name || 'A bringer'} accepted your parcel request!`, 'success');
      } else if (updatedReq.status === 'COMPLETED') {
        showToast(`Delivery completed!`, 'success');
      }
    });

    return () => {
      socket.off('requests_updated');
      socket.off('request_created');
      socket.off('request_updated');
    };
  }, [currentUser?.id]);

  const navigateTo = (tab, subView = null) => {
    setActiveTab(tab);
    if (subView) {
      setParcelSubView(subView);
    } else if (tab === 'parcel_bringer') {
      setParcelSubView('hub');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create a new request (Requester Flow)
  const createParcelRequest = async (newReqData) => {
    const newId = `req_${Date.now()}`;

    const newRequest = {
      id: newId,
      requesterId: currentUser.id,
      platform: newReqData.platform || 'Amazon',
      platformColor: newReqData.platformColor || '#D94A2B',
      pickupLocation: PICKUP_LOCATION,
      dropLocation: newReqData.dropLocation || 'BH1 (Boys Hostel 1)',
      size: newReqData.size || 'Small package',
      urgency: newReqData.urgency || 'As soon as possible',
      paymentType: newReqData.paymentType || 'Prepaid',
      codAmount: newReqData.paymentType === 'COD' ? Number(newReqData.codAmount || 0) : 0,
      reward: Number(newReqData.reward) || 0,
      notes: newReqData.notes || '',
      requester: {
        id: currentUser.id,
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
      bringer: null
    };

    setRequests(prev => [newRequest, ...prev]);
    setActiveRequestId(newId);

    try {
      await fetch(`${API_BASE}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest)
      });
    } catch (e) {}

    showToast(`Request posted! Waiting for a bringer to accept.`, 'success');
    navigateTo('parcel_bringer', 'tracking');
    return newRequest;
  };

  // Accept a parcel request (Bringer Flow)
  const acceptParcelRequest = async (requestId, bringerUser = null) => {
    const assignedBringer = bringerUser || {
      id: currentUser.id,
      name: currentUser.name,
      rating: currentUser.rating,
      completedCount: currentUser.parcelsBrought,
      initials: currentUser.initials,
      avatarBg: currentUser.avatarBg
    };

    try {
      await fetch(`${API_BASE}/requests/${requestId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bringer: assignedBringer })
      });
    } catch (e) {
      setRequests(prev => prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'ACCEPTED',
            bringer: assignedBringer
          };
        }
        return req;
      }));
    }

    setActiveRequestId(requestId);
    showToast(`Accepted request! Tracking delivery status.`, 'success');
    navigateTo('parcel_bringer', 'tracking');
  };

  // Mark parcel as picked up by Bringer
  const markAsPickedUp = async (requestId) => {
    try {
      await fetch(`${API_BASE}/requests/${requestId}/pickup`, {
        method: 'POST'
      });
    } catch (e) {
      setRequests(prev => prev.map(r => {
        if (r.id === requestId) {
          return { ...r, status: 'PICKED_UP' };
        }
        return r;
      }));
    }

    showToast('Parcel collected from Delivery Spot! Heading to hostel.', 'success');
  };

  // Mark parcel as delivered
  const markAsDelivered = async (requestId) => {
    try {
      await fetch(`${API_BASE}/requests/${requestId}/deliver`, {
        method: 'POST'
      });
    } catch (e) {
      setRequests(prev => prev.map(r => {
        if (r.id === requestId) {
          return { ...r, status: 'COMPLETED' };
        }
        return r;
      }));
    }

    showToast('Parcel delivery confirmed!', 'success');
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
      isAuthenticated,
      allUsers: allUsersList,
      switchUser,
      activeRequestId,
      activeRequest,
      selectedRequestForDetail,
      toast,
      navigateTo,
      setParcelSubView,
      createParcelRequest,
      acceptParcelRequest,
      markAsPickedUp,
      markAsDelivered,
      setSelectedRequestForDetail,
      setActiveRequestId,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
