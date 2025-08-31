const Slot = require("../models/slots.model");
const Venue = require("../models/venue.model");
const mongoose = require("mongoose");

const slotTimings = [
    { startTime: "10:00 AM", endTime: "01:00 PM" },
    { startTime: "02:00 PM", endTime: "05:00 PM" },
    { startTime: "06:00 PM", endTime: "09:00 PM" }
];

async function generateSlotsForVenue(venueId, days = 7) {
    const today = new Date();

    for (let i = 1; i <= days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); 
        
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
        
        for (const timing of slotTimings) {
            await Slot.create({
                venue: venueId,
                date: formattedDate,
                startTime: timing.startTime,
                endTime: timing.endTime,
                isBooked: false,
            });
        }
    }
    console.log("Slots generated!");
}

module.exports = generateSlotsForVenue;