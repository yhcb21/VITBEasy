export const HOSTEL_BLOCKS = [
  { id: 'bh1', name: 'BH1 (Boys Hostel 1)', type: 'BH', shortName: 'BH1' },
  { id: 'bh2', name: 'BH2 (Boys Hostel 2)', type: 'BH', shortName: 'BH2' },
  { id: 'bh3', name: 'BH3 (Boys Hostel 3)', type: 'BH', shortName: 'BH3' },
  { id: 'bh4', name: 'BH4 (Boys Hostel 4)', type: 'BH', shortName: 'BH4' },
  { id: 'bh5', name: 'BH5 (Boys Hostel 5)', type: 'BH', shortName: 'BH5' },
  { id: 'bh6', name: 'BH6 (Boys Hostel 6)', type: 'BH', shortName: 'BH6' },
  { id: 'bh7', name: 'BH7 (Boys Hostel 7)', type: 'BH', shortName: 'BH7' },
  { id: 'bh8', name: 'BH8 (Boys Hostel 8)', type: 'BH', shortName: 'BH8' },
  { id: 'gh1', name: 'GH1 (Girls Hostel 1)', type: 'GH', shortName: 'GH1' },
  { id: 'gh2', name: 'GH2 (Girls Hostel 2)', type: 'GH', shortName: 'GH2' },
  { id: 'special', name: 'Special Block', type: 'SPECIAL', shortName: 'Special Block' },
];

export const PICKUP_LOCATION = 'Delivery Spot';

// Generic test profiles with no real names and no registration numbers
export const ALL_USERS = [
  {
    id: 'test_user_1',
    name: 'test_user_1',
    fullTitle: 'test_user_1',
    department: 'Computer Science & Engg',
    isVerified: true,
    rating: 4.9,
    parcelsBrought: 7,
    parcelsReceived: 12,
    defaultHostel: 'BH1 (Boys Hostel 1)',
    avatarBg: '#D94A2B',
    initials: 'U1',
    role: 'requester',
  },
  {
    id: 'test_user_2',
    name: 'test_user_2',
    fullTitle: 'test_user_2',
    department: 'Computer Science & Engg',
    isVerified: true,
    rating: 4.9,
    parcelsBrought: 15,
    parcelsReceived: 3,
    defaultHostel: 'BH3 (Boys Hostel 3)',
    avatarBg: '#697052',
    initials: 'U2',
    role: 'bringer',
  },
  {
    id: 'test_user_3',
    name: 'test_user_3',
    fullTitle: 'test_user_3',
    department: 'Electronics & Comm',
    isVerified: true,
    rating: 4.8,
    parcelsBrought: 4,
    parcelsReceived: 9,
    defaultHostel: 'GH1 (Girls Hostel 1)',
    avatarBg: '#171717',
    initials: 'U3',
    role: 'requester',
  },
];

export const CURRENT_USER = ALL_USERS[0]; // Default: test_user_1

export const INITIAL_SERVICES = [
  {
    id: 'parcel_bringer',
    title: 'Bring my parcel',
    tagline: 'Get your parcel from Delivery Spot to your hostel block.',
    shortDesc: 'Get something brought from Delivery Spot.',
    icon: 'Package',
    isAvailable: true,
    isFeatured: true,
    badgeText: 'FEATURED SERVICE',
    activeRequestsCount: 4,
  },
];

export const INITIAL_REQUESTS = [
  {
    id: 'req_101',
    requesterId: 'test_user_1',
    platform: 'Amazon',
    platformColor: '#FF9900',
    pickupLocation: 'Delivery Spot',
    dropLocation: 'BH1 (Boys Hostel 1)',
    size: 'Small package',
    urgency: 'Before 5:30 PM',
    paymentType: 'Prepaid',
    codAmount: 0,
    reward: 20,
    notes: 'Room 412. Small Amazon box with study books.',
    requester: {
      id: 'test_user_1',
      name: 'test_user_1',
      isVerified: true,
      rating: 4.9,
      completedCount: 7,
      avatarBg: '#D94A2B',
      initials: 'U1'
    },
    timeAgo: '02 MIN AGO',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    bringer: null,
  },
  {
    id: 'req_102',
    requesterId: 'test_user_3',
    platform: 'Flipkart',
    platformColor: '#2874F0',
    pickupLocation: 'Delivery Spot',
    dropLocation: 'BH3 (Boys Hostel 3)',
    size: 'Medium box',
    urgency: 'As soon as possible',
    paymentType: 'COD',
    codAmount: 240,
    reward: 15,
    notes: 'COD parcel: Please pay ₹240 at Delivery Spot. I will give you ₹240 + ₹15 tip in cash.',
    requester: {
      id: 'test_user_3',
      name: 'test_user_3',
      isVerified: true,
      rating: 4.8,
      completedCount: 12,
      avatarBg: '#171717',
      initials: 'U3'
    },
    timeAgo: '08 MIN AGO',
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    bringer: null,
  },
  {
    id: 'req_103',
    requesterId: 'test_user_3',
    platform: 'Myntra',
    platformColor: '#E42529',
    pickupLocation: 'Delivery Spot',
    dropLocation: 'GH1 (Girls Hostel 1)',
    size: 'Clothing bag',
    urgency: 'Before 7:00 PM',
    paymentType: 'Prepaid',
    codAmount: 0,
    reward: 15,
    notes: 'Please drop at GH1 security desk.',
    requester: {
      id: 'test_user_3',
      name: 'test_user_3',
      isVerified: true,
      rating: 4.8,
      completedCount: 12,
      avatarBg: '#171717',
      initials: 'U3'
    },
    timeAgo: '14 MIN AGO',
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    bringer: null,
  },
];

export const INITIAL_ACTIVITY = [
  {
    id: 'act_1',
    dayGroup: 'TODAY',
    service: 'PARCEL BRINGER',
    title: 'Amazon parcel (Prepaid) → BH1 (Boys Hostel 1)',
    status: 'Delivered by test_user_2',
    rewardText: '₹20 tip',
    timestamp: '2:15 PM',
    isPositive: true,
    icon: 'PackageCheck'
  },
  {
    id: 'act_2',
    dayGroup: 'TODAY',
    service: 'PARCEL BRINGER',
    title: 'Flipkart parcel (COD ₹240) → BH3 (Boys Hostel 3)',
    status: 'Delivered for test_user_3',
    rewardText: '₹15 tip',
    timestamp: '11:40 AM',
    isPositive: true,
    icon: 'PackageCheck'
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    text: 'test_user_2 accepted your parcel request from Delivery Spot!',
    timeAgo: '10m ago',
    read: false,
    type: 'ACCEPTED'
  },
  {
    id: 'notif_2',
    text: 'test_user_2 marked your parcel as picked up from Delivery Spot.',
    timeAgo: '4m ago',
    read: false,
    type: 'PICKED_UP'
  },
  {
    id: 'notif_3',
    text: 'Parcel delivery confirmed! ₹20 tip transferred.',
    timeAgo: 'Just now',
    read: false,
    type: 'DELIVERED'
  }
];
