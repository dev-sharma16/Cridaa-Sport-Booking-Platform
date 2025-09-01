const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const venueRoutes = require("./routes/venue.routes")

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    process.env.FrontEnd_Url,
    "http://localhost:5173",
    "https://cridaa-sport-booking-platform.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use("/auth", authRoutes);
app.use("/venue", venueRoutes);

module.exports = app;
