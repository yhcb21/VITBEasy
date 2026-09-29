export const CAMPUS_LOCATIONS = [
  { id: 'academic', name: 'Academic Block', category: 'academic' },
  { id: 'delivery_gate', name: 'Delivery Gate', category: 'gate' },
  { id: 'security_office', name: 'Security Office', category: 'security' },
  { id: 'hostel_a', name: 'Hostel A (Block 1)', category: 'hostel' },
  { id: 'hostel_b', name: 'Hostel B (Block 2)', category: 'hostel' },
  { id: 'hostel_c', name: 'Hostel C (Block 3)', category: 'hostel' },
  { id: 'hostel_d', name: 'Hostel D (Girls Block)', category: 'hostel' },
];

export const CURRENT_USER = {
  id: 'usr_dishant',
  name: 'Dishant B.',
  fullTitle: 'Dishant Bhowmick',
  registrationNo: '22BCE10429',
  department: 'Computer Science & Engg',
  isVerified: true,
  rating: 4.9,
  parcelsBrought: 12,
  parcelsReceived: 7,
  defaultHostel: 'Hostel A (Block 1)',
  avatarBg: '#D94A2B',
  initials: 'DB'
};

export const INITIAL_SERVICES = [
  {
    id: 'parcel_bringer',
    title: 'Bring my parcel',
    tagline: 'Get your parcel from Academic Block without the 40-minute round trip.',
    shortDesc: 'Get something brought from the Academic Block.',
    icon: 'Package',
    isAvailable: true,
    isFeatured: true,
    badgeText: 'FEATURED SERVICE',
    activeRequestsCount: 4,
  },
  {
    id: 'ride_share',
    title: 'Find a ride',
    tagline: 'Going towards auto stand or railway station?',
    shortDesc: 'Find someone going your way.',
    icon: 'Car',
    isAvailable: false,
    badgeText: 'COMING SOON',
    comingSoonLabel: 'Under development',
  },
  {
    id: 'print_xerox',
    title: 'Print something',
    tagline: 'Send lab manuals & printouts before reaching shop.',
    shortDesc: 'Send a document before reaching the shop.',
    icon: 'Printer',
    isAvailable: false,
    badgeText: 'COMING SOON',
    comingSoonLabel: 'Integrating with Campus Stationary',
  },
  {
    id: 'campus_market',
    title: 'Buy & sell on campus',
    tagline: 'Lab coats, mattresses, study material & tech.',
    shortDesc: 'Buy and sell things within campus.',
    icon: 'ShoppingBag',
    isAvailable: false,
    badgeText: 'COMING SOON',
    comingSoonLabel: 'In campus testing',
  },
  {
    id: 'food_pickup',
    title: 'Food pickup',
    tagline: 'Canteen & Food Court order collection.',
    shortDesc: 'Ask someone already near the food outlet to bring it.',
    icon: 'UtensilsCrossed',
    isAvailable: false,
    badgeText: 'COMING SOON',
    comingSoonLabel: 'Coming soon',
  },
];

export const INITIAL_REQUESTS = [
  {
    id: 'req_101',
    platform: 'Amazon',
    platformColor: '#FF9900',
    pickupLocation: 'Academic Block',
    dropLocation: 'Hostel A (Block 1)',
    size: 'Small package',
    urgency: 'Before 5:30 PM',
    reward: 20, // Max 20 rupees tip
    notes: 'Small Amazon box containing study books. I am in Room 412.',
    requester: {
      name: 'Ananya R.',
      isVerified: true,
      rating: 4.8,
      completedCount: 12,
      avatarBg: '#697052',
      initials: 'AR'
    },
    timeAgo: '02 MIN AGO',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    deliveryPin: '4728', // Single 4-digit PIN given by requester to bringer upon delivery (Uber/Zomato style)
    bringer: null
  },
  {
    id: 'req_102',
    platform: 'Flipkart',
    platformColor: '#2874F0',
    pickupLocation: 'Academic Block',
    dropLocation: 'Hostel A (Block 1)',
    size: 'Medium box',
    urgency: 'As soon as possible',
    reward: 10,
    notes: 'Just a lightweight clothing packet.',
    requester: {
      name: 'Rahul S.',
      isVerified: true,
      rating: 4.9,
      completedCount: 19,
      avatarBg: '#171717',
      initials: 'RS'
    },
    timeAgo: '08 MIN AGO',
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    status: 'ACCEPTED',
    deliveryPin: '3194',
    bringer: {
      name: 'Yash S.',
      rating: 4.9,
      completedCount: 15,
      initials: 'YS',
      avatarBg: '#D94A2B'
    }
  },
  {
    id: 'req_103',
    platform: 'Myntra',
    platformColor: '#E42529',
    pickupLocation: 'Academic Block',
    dropLocation: 'Hostel B (Block 2)',
    size: 'Clothing bag',
    urgency: 'Before 7:00 PM',
    reward: 15,
    notes: 'Near security desk desk #3.',
    requester: {
      name: 'Aryan K.',
      isVerified: true,
      rating: 4.7,
      completedCount: 8,
      avatarBg: '#D94A2B',
      initials: 'AK'
    },
    timeAgo: '14 MIN AGO',
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    deliveryPin: '9081',
    bringer: null
  },
  {
    id: 'req_104',
    platform: 'Meesho',
    platformColor: '#F43397',
    pickupLocation: 'Academic Block',
    dropLocation: 'Hostel C (Block 3)',
    size: 'Small envelope',
    urgency: 'As soon as possible',
    reward: 10,
    notes: 'Contains lab document accessory. Please hand over near hostel lobby.',
    requester: {
      name: 'Priya M.',
      isVerified: true,
      rating: 5.0,
      completedCount: 23,
      avatarBg: '#697052',
      initials: 'PM'
    },
    timeAgo: '27 MIN AGO',
    createdAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    deliveryPin: '1482',
    bringer: null
  }
];

export const INITIAL_ACTIVITY = [
  {
    id: 'act_1',
    dayGroup: 'TODAY',
    service: 'PARCEL BRINGER',
    title: 'Amazon parcel → Hostel A',
    status: 'Delivered by Yash S.',
    rewardText: '₹20 tip',
    timestamp: '2:15 PM',
    isPositive: true,
    icon: 'PackageCheck'
  },
  {
    id: 'act_2',
    dayGroup: 'TODAY',
    service: 'PARCEL BRINGER',
    title: 'Flipkart parcel → Academic Block',
    status: 'Delivered for Rahul S.',
    rewardText: '₹10 tip',
    timestamp: '11:40 AM',
    isPositive: true,
    icon: 'PackageCheck'
  },
  {
    id: 'act_3',
    dayGroup: 'YESTERDAY',
    service: 'RIDE SHARE',
    title: 'Hostel A → Academic Block',
    status: 'Completed with Tanmay',
    rewardText: 'Shared ₹15',
    timestamp: '4:30 PM',
    isPositive: false,
    icon: 'Car'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    text: 'Yash S. accepted your parcel request! He is picking up your parcel from Academic Block.',
    timeAgo: '10m ago',
    read: false,
    type: 'ACCEPTED'
  },
  {
    id: 'notif_2',
    text: 'Yash S. has collected your parcel and is on his way to Hostel A.',
    timeAgo: '4m ago',
    read: false,
    type: 'PICKED_UP'
  },
  {
    id: 'notif_3',
    text: 'Delivery PIN verified! Yash delivered your parcel. ₹20 tip transferred.',
    timeAgo: 'Just now',
    read: false,
    type: 'DELIVERED'
  }
];
