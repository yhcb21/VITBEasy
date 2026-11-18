# VITBeasy Lost & Found

A dark blue/black Lost & Found module for the VITBeasy campus platform.

## Features
- Lost / Found tabs
- Search
- Category filtering
- Responsive dark UI
- Report Lost Item
- Report Found Item
- REST API
- MongoDB data model
- Demo fallback data when MongoDB is unavailable

## Run

1. Install Node.js.
2. Open this folder in VS Code.
3. Run:

```bash
npm install
```

4. Copy `.env.example` to `.env`.
5. Make sure MongoDB is running.
6. Run:

```bash
npm start
```

7. Open:

http://localhost:5000

## API

GET `/api/items`

GET `/api/items?type=lost`

GET `/api/items?type=found`

GET `/api/items?category=Electronics`

POST `/api/items`

PUT `/api/items/:id/claim`

DELETE `/api/items/:id`

## Next steps
Add authentication, Cloudinary/Firebase image upload, student profiles, item detail pages, private messaging, admin moderation and lost/found matching.
