import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import crypto from "crypto";
import path from "path";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// **MySQL Database Connection**
const db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Sql@worst123",
    database: process.env.DB_NAME || "travel_web",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// **Razorpay Configuration**
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// **API Routes**
app.get('/flights-autocomplete', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`https://${RAPIDAPI_HOST}/flights/auto-complete`, {
            headers: {
                'X-RapidAPI-Host': RAPIDAPI_HOST,
                'X-RapidAPI-Key': RAPIDAPI_KEY,
            },
            params: { query },
        });

        if (!response.data.data || !Array.isArray(response.data.data)) {
            return res.status(500).json({ error: 'Invalid response from API' });
        }

        const suggestions_flight = response.data.data
            .filter(
                (item) =>
                    item.presentation.subtitle === 'India' &&
                    item.presentation.suggestionTitle.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
                suggestionTitle: item.presentation.suggestionTitle,
                subtitle: item.presentation.subtitle,
                skyId: item.presentation.skyId,
            }));

        if (suggestions_flight.length === 0) {
            return res.json({ status: true, airports: [] });
        }
        
        // Prepare query for bulk insertion
        const insertQuery = `
            INSERT INTO suggestions_flight (suggestionTitle, subtitle, skyId)
            VALUES ?
            ON DUPLICATE KEY UPDATE 
                suggestionTitle = VALUES(suggestionTitle),
                subtitle = VALUES(subtitle);
        `;
        const values = suggestions_flight.map((s) => [s.suggestionTitle, s.subtitle, s.skyId]);

        db.query(insertQuery, [values], (err) => {
            if (err) {
                console.error('Error inserting data into database:', err.message);
                return res.status(500).json({ error: 'Failed to save data to database' });
            }
            res.json({ status: true, airports: suggestions_flight });
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

// ✅ Fetch Trip Details
app.get("/trip-details", (req, res) => {
    db.query("SELECT * FROM trip_details", (err, data) => {
        if (err) return res.status(500).json({ error: "Database Error", details: err });
        return res.json(data);
    });
});

// ✅ Fetch Flights with Image Conversion
app.get("/flights", (req, res) => {
    const q = "SELECT * FROM flights";

    db.query(q, (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database Error", details: err });
        }

        // ✅ Convert BLOB image to Base64 format
        const flightsWithImages = data.map((flight) => ({
            ...flight,
            img: flight.img ? `data:image/jpeg;base64,${flight.img.toString("base64")}` : null
        }));

        // ✅ Send response after conversion
        res.json(flightsWithImages);
    });
});


// ✅ Fetch Hotels with Image Conversion
app.get("/hotels", (req, res) => {
    const q = "SELECT * FROM hotels";
    
    db.query(q, (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database Error", details: err });
        }

        // ✅ Convert BLOB to Base64 inside the query callback
        const hotelsWithImages = data.map((hotel) => ({
            ...hotel,
            img: hotel.img ? `data:image/jpeg;base64,${hotel.img.toString("base64")}` : null
        }));

        // ✅ Send response after conversion
        res.json(hotelsWithImages);
    });
});

// ✅ Search Flights by City
app.get("/flights/search", (req, res) => {
    const { from_city, to_city } = req.query;
    const q = "SELECT * FROM flights WHERE from_city = ? AND to_city = ?";

    db.query(q, [from_city, to_city], (err, data) => {
        if (err) return res.status(500).json({ error: "Database Error", details: err });
        return res.json(data);
    });
});

// **API to Retrieve All Trains**
app.get("/trains", (req, res) => {
    const q = "SELECT * FROM trains";

    db.query(q, (err, data) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database Error", details: err });
        }

        // ✅ Convert BLOB image to Base64 format
        const trainsWithImages = data.map((train) => ({
            ...train,
            img: train.img ? `data:image/jpeg;base64,${train.img.toString("base64")}` : null
        }));

        // ✅ Send response after conversion
        res.json(trainsWithImages);
    });
});
// **API to Retrieve a Specific Train by ID**
app.get("/trains/:id", (req, res) => {
    const trainId = req.params.id;
    const query = "SELECT * FROM trains WHERE train_id = ?";
    db.query(query, [trainId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data.length ? data[0] : { message: "Train not found" });
    });
});

// **API to Retrieve Trains Based on Source and Destination**
app.get("/trains/search", (req, res) => {
    const { from_city, to_city } = req.query;
    const query = "SELECT * FROM trains WHERE from_city = ? AND to_city = ?";
    db.query(query, [from_city, to_city], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

// ✅ Add Passenger Details
app.post("/passenger-details", async (req, res) => {
    const passengers = req.body.passengers;

    if (!passengers || !Array.isArray(passengers)) {
        return res.status(400).json({ message: "Invalid data format" });
    }

    try {
        for (const passenger of passengers) {
            await db.query(
                "INSERT INTO passenger_details (title, first_name, last_name, age) VALUES (?, ?, ?, ?)",
                [passenger.title, passenger.first_name, passenger.last_name, passenger.age]
            );
        }
        res.status(200).json({ message: "Passengers added successfully" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Database error", error });
    }
});

// ✅ Create Razorpay Order
app.post("/api/create-order", async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Convert amount to paisa
        currency: currency,
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: "Razorpay Error", details: err.message });
    }
});

// ✅ Verify Payment Signature
app.post("/api/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        db.query(
            "INSERT INTO payments (order_id, payment_id, status) VALUES (?, ?, ?)",
            [razorpay_order_id, razorpay_payment_id, "Success"],
            (err) => {
                if (err) return res.status(500).json({ error: "Database Error", details: err });
                res.json({ success: true, message: "Payment verified successfully" });
            }
        );
    } else {
        res.status(400).json({ success: false, message: "Invalid signature" });
    }
});


// **📌 Serve React Frontend in Production Mode**
const __dirname = path.resolve();  // Get absolute directory path
const buildPath = path.join(__dirname, "frontend", "build"); // Adjust path if needed

// ✅ Serve static files from the React build directory
app.use(express.static(buildPath));

// ✅ Fallback for React SPA (Single Page App)
app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"), (err) => {
        if (err) {
            console.error("Error serving React frontend:", err);
            res.status(500).send("Internal Server Error");
        }
    });
});

// ✅ Start the Server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
