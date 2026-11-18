
const express = require("express");
const Item = require("../models/Item");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" +
            file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");

        cb(null, uniqueName);
    }
});

// Image upload configuration
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed"));
        }
    }
});

// GET: Get all items with search and filters
router.get("/", async (req, res) => {
    try {
        const { type, category, search } = req.query;
        const filter = {};

        if (type && ["lost", "found"].includes(type)) {
            filter.type = type;
        }

        if (category && category !== "All") {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } }
            ];
        }

        const items = await Item.find(filter).sort({ createdAt: -1 });

        res.json(items);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get one item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json(item);

    } catch (error) {
        res.status(400).json({
            message: "Invalid item ID"
        });
    }
});

// POST: Create a new lost/found item
// Multer processes the image and form fields here
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            type,
            location,
            date,
            postedBy,
            contact
        } = req.body;

        const item = await Item.create({
            title,
            description,
            category,
            type,
            location,
            date,
            image: req.file
                ? `/uploads/${req.file.filename}`
                : "",
            postedBy,
            contact
        });

        res.status(201).json(item);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// PUT: Mark item as claimed
router.put("/:id/claim", async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { status: "claimed" },
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json(item);

    } catch (error) {
        res.status(400).json({
            message: "Could not update item"
        });
    }
});

module.exports = router;
