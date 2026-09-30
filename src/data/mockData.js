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
  defaultHostel: 'BH1 (Boys Hostel 1)',
  avatarBg: '#D94A2B',
  initials: 'DB'
};

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
    pickupLocation: 'Delivery Spot',
    dropLocation: 'BH1 (Boys Hostel 1)',
    size: 'Small package',
    urgency: 'Before 5:30 PM',
    paymentType: 'Prepaid', // Prepaid or COD
    codAmount: 0,
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
    status: 'ACCEPTED',
    deliveryPin: '4728',
    bringer: {
      name: 'Yash S.',
      rating: 4.9,
      completedCount: 15,
      initials: 'YS',
      avatarBg: '#D94A2B'
    },
    chatMessages: [
      { id: 'm1', sender: 'Yash S.', text: 'Hey Ananya! I picked up your Amazon prepaid parcel from Delivery Spot.', time: '2m ago' },
      { id: 'm2', sender: 'Ananya R.', text: 'Awesome Yash! I am waiting near BH1 main lobby.', time: '1m ago' }
    ]
  },
  {
    id: 'req_102',
    platform: 'Flipkart',
    platformColor: '#2874F0',
    pickupLocation: 'Delivery Spot',
    dropLocation: 'BH3 (Boys Hostel 3)',
    size: 'Medium box',
    urgency: 'As soon as possible',
    paymentType: 'COD', // Cash on Delivery parcel
    codAmount: 240,
    reward: 15,
    notes: 'COD parcel: Please pay ₹240 at Delivery Spot. I will give you ₹240 + ₹15 tip in cash.',
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
    status: 'REQUESTED',
    deliveryPin: '3194',
    bringer: null,
    chatMessages: []
  },
  {
    id: 'req_103',
    platform: 'Myntra',
    platformColor: '#E42529',
    pickupLocation: 'Delivery Spot',
    dropLocation: 'GH1 (Girls Hostel 1)',
    size: 'Clothing bag',
    urgency: 'Before 7:00 PM',
    paymentType: 'Prepaid',
    codAmount: 0,
    reward: 15,
    notes: 'Please drop at security gate desk.',
    requester: {
      name: 'Priya M.',
      isVerified: true,
      rating: 5.0,
      completedCount: 23,
      avatarBg: '#D94A2B',
      initials: 'PM'
    },
    timeAgo: '14 MIN AGO',
    createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    deliveryPin: '9081',
    bringer: null,
    chatMessages: []
  },
  {
    id: 'req_104',
    platform: 'Meesho',
    platformColor: '#F43397',
    pickupLocation: 'Delivery Spot',
    dropLocation: 'Special Block',
    size: 'Small envelope',
    urgency: 'As soon as possible',
    paymentType: 'Prepaid',
    codAmount: 0,
    reward: 10,
    notes: 'Lab document accessory envelope.',
    requester: {
      name: 'Aryan K.',
      isVerified: true,
      rating: 4.7,
      completedCount: 8,
      avatarBg: '#697052',
      initials: 'AK'
    },
    timeAgo: '27 MIN AGO',
    createdAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
    status: 'REQUESTED',
    deliveryPin: '1482',
    bringer: null,
    chatMessages: []
  }
];

export const INITIAL_ACTIVITY = [
  {
    id: 'act_1',
    dayGroup: 'TODAY',
    service: 'PARCEL BRINGER',
    title: 'Amazon parcel (Prepaid) → BH1 (Boys Hostel 1)',
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
    title: 'Flipkart parcel (COD ₹240) → BH3 (Boys Hostel 3)',
    status: 'Delivered for Rahul S.',
    rewardText: '₹15 tip',
    timestamp: '11:40 AM',
    isPositive: true,
    icon: 'PackageCheck'
  },
  {
    id: 'act_3',
    dayGroup: 'YESTERDAY',
    service: 'RIDE SHARE',
    title: 'BH1 → Main Gate',
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
    text: 'Yash S. accepted your parcel request from Delivery Spot! You can now live chat with him.',
    timeAgo: '10m ago',
    read: false,
    type: 'ACCEPTED'
  },
  {
    id: 'notif_2',
    text: 'Yash S.: "I picked up your parcel from Delivery Spot, heading to BH1 now."',
    timeAgo: '4m ago',
    read: false,
    type: 'CHAT'
  },
  {
    id: 'notif_3',
    text: 'Delivery PIN verified! Yash delivered your parcel. ₹20 tip transferred.',
    timeAgo: 'Just now',
    read: false,
    type: 'DELIVERED'
  }
];
