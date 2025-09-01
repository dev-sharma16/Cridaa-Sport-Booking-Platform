const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const venueRoutes = require("./routes/venue.routes")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.FrontEnd_Url ? process.env.FrontEnd_Url : "http://localhost:5173",
        credentials: true
    })
);

app.use("/auth", authRoutes);
app.use("/venue", venueRoutes);

module.exports = app;
