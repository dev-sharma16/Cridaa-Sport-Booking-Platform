const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Venue", 
            required: true
        },
        date: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: { 
            type: String, 
            required: true 
        },
        isBooked: { 
            type: Boolean, 
            default: false 
        },
        bookedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
    },
    {
        timestamps: true
    }
)

const Slots = mongoose.model("Slot", slotSchema);

module.exports = Slots;
