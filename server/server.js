require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://yashdubey10f_db_user:vitbeasy@cluster0.o6wcsgn.mongodb.net/vitbeasy?retryWrites=true&w=majority';

// Mongoose Schemas & Models
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  fullTitle: String,
  department: String,
  isVerified: Boolean,
  rating: Number,
  parcelsBrought: Number,
  parcelsReceived: Number,
  defaultHostel: String,
  avatarBg: String,
  initials: String,
  role: String
}, { timestamps: true });

const requestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  requesterId: String,
  platform: String,
  platformColor: String,
  pickupLocation: String,
  dropLocation: String,
  size: String,
  urgency: String,
  paymentType: String,
  codAmount: Number,
  reward: Number,
  notes: String,
  requester: Object,
  timeAgo: String,
  createdAt: String,
  status: String,
  bringer: Object
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Request = mongoose.model('Request', requestSchema);

// Initial Test Profiles & Requests
const SEED_USERS = [
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
    role: 'requester'
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
    role: 'bringer'
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
    role: 'requester'
  }
];

const SEED_REQUESTS = [
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
    bringer: null
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
    bringer: null
  }
];

let isMongoConnected = false;
const DB_FILE = path.join(__dirname, 'db.json');

function loadFallback() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ users: SEED_USERS, requests: SEED_REQUESTS }, null, 2));
      return { users: SEED_USERS, requests: SEED_REQUESTS };
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (e) {
    return { users: SEED_USERS, requests: SEED_REQUESTS };
  }
}

function saveFallback(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {}
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(async () => {
  isMongoConnected = true;
  console.log('Connected to MongoDB Atlas successfully.');

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.insertMany(SEED_USERS);
  }

  const reqCount = await Request.countDocuments();
  if (reqCount === 0) {
    await Request.insertMany(SEED_REQUESTS);
  }
})
.catch((err) => {
  isMongoConnected = false;
  console.warn('MongoDB Atlas connection timed out/failed. Using persistent local document store as fallback:', err.message);
});

// REST API Endpoints

// 1. Get all test users
app.get('/api/users', async (req, res) => {
  if (isMongoConnected) {
    try {
      const users = await User.find().lean();
      return res.json(users);
    } catch (e) {}
  }
  const db = loadFallback();
  res.json(db.users);
});

// 2. Switch/Select user profile
app.post('/api/auth/switch', async (req, res) => {
  const { userId } = req.body;
  if (isMongoConnected) {
    try {
      const user = await User.findOne({ id: userId }).lean();
      if (user) return res.json({ success: true, user });
    } catch (e) {}
  }
  const db = loadFallback();
  const user = db.users.find(u => u.id === userId);
  if (user) return res.json({ success: true, user });
  res.status(404).json({ success: false, message: 'User not found' });
});

// 3. Get all parcel requests
app.get('/api/requests', async (req, res) => {
  if (isMongoConnected) {
    try {
      const reqs = await Request.find().sort({ createdAt: -1 }).lean();
      return res.json(reqs);
    } catch (e) {}
  }
  const db = loadFallback();
  res.json(db.requests);
});

// 4. Create a parcel request
app.post('/api/requests', async (req, res) => {
  const newReq = req.body;
  if (isMongoConnected) {
    try {
      await Request.create(newReq);
      const allReqs = await Request.find().sort({ createdAt: -1 }).lean();
      io.emit('request_created', newReq);
      io.emit('requests_updated', allReqs);
      return res.status(201).json(newReq);
    } catch (e) {}
  }

  const db = loadFallback();
  db.requests.unshift(newReq);
  saveFallback(db);

  io.emit('request_created', newReq);
  io.emit('requests_updated', db.requests);
  res.status(201).json(newReq);
});

// 5. Accept parcel request
app.post('/api/requests/:id/accept', async (req, res) => {
  const { id } = req.params;
  const { bringer } = req.body;

  if (isMongoConnected) {
    try {
      const currentReq = await Request.findOne({ id });
      if (currentReq) {
        currentReq.status = 'ACCEPTED';
        currentReq.bringer = bringer;
        await currentReq.save();
        const allReqs = await Request.find().sort({ createdAt: -1 }).lean();
        io.emit('request_updated', currentReq);
        io.emit('requests_updated', allReqs);
        return res.json(currentReq);
      }
    } catch (e) {}
  }

  const db = loadFallback();
  const reqIndex = db.requests.findIndex(r => r.id === id);
  if (reqIndex !== -1) {
    const currentReq = db.requests[reqIndex];
    currentReq.status = 'ACCEPTED';
    currentReq.bringer = bringer;
    saveFallback(db);
    io.emit('request_updated', currentReq);
    io.emit('requests_updated', db.requests);
    return res.json(currentReq);
  }

  res.status(404).json({ message: 'Request not found' });
});

// 6. Mark Picked Up
app.post('/api/requests/:id/pickup', async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      const currentReq = await Request.findOne({ id });
      if (currentReq) {
        currentReq.status = 'PICKED_UP';
        await currentReq.save();
        const allReqs = await Request.find().sort({ createdAt: -1 }).lean();
        io.emit('request_updated', currentReq);
        io.emit('requests_updated', allReqs);
        return res.json(currentReq);
      }
    } catch (e) {}
  }

  const db = loadFallback();
  const reqIndex = db.requests.findIndex(r => r.id === id);
  if (reqIndex !== -1) {
    const currentReq = db.requests[reqIndex];
    currentReq.status = 'PICKED_UP';
    saveFallback(db);
    io.emit('request_updated', currentReq);
    io.emit('requests_updated', db.requests);
    return res.json(currentReq);
  }

  res.status(404).json({ message: 'Request not found' });
});

// 7. Mark Delivered
app.post('/api/requests/:id/deliver', async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      const currentReq = await Request.findOne({ id });
      if (currentReq) {
        currentReq.status = 'COMPLETED';
        await currentReq.save();

        if (currentReq.bringer?.id) {
          await User.updateOne({ id: currentReq.bringer.id }, { $inc: { parcelsBrought: 1 } });
        }

        const allReqs = await Request.find().sort({ createdAt: -1 }).lean();
        io.emit('request_updated', currentReq);
        io.emit('requests_updated', allReqs);
        return res.json({ success: true, request: currentReq });
      }
    } catch (e) {}
  }

  const db = loadFallback();
  const reqIndex = db.requests.findIndex(r => r.id === id);
  if (reqIndex !== -1) {
    const currentReq = db.requests[reqIndex];
    currentReq.status = 'COMPLETED';
    saveFallback(db);
    io.emit('request_updated', currentReq);
    io.emit('requests_updated', db.requests);
    return res.json({ success: true, request: currentReq });
  }

  res.status(404).json({ message: 'Request not found' });
});

io.on('connection', (socket) => {
  console.log('Socket client connected:', socket.id);
});

server.listen(PORT, () => {
  console.log(`VITBEasy backend running on port ${PORT}`);
});
