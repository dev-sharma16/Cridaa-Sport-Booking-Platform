const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: "https://via.placeholder.com/300x200?text=No+Image"
        },
        location: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;