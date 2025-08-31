const Venue = require('../models/venue.model');
const Slot = require('../models/slots.model');
const Slots = require('../models/slots.model');

const slotTimings = [
    { startTime: "10:00 AM", endTime: "01:00 PM" },
    { startTime: "02:00 PM", endTime: "05:00 PM" },
    { startTime: "06:00 PM", endTime: "09:00 PM" }
];


async function addVenue(req,res){
    const {name, image, location} = req.body;
    if (!name || !location){
        return res
        .status(400)
        .json({
            success: false, 
            message: "Name and Location both are required"
        })   
    }

    let createdVenue = await Venue.create({
        name,
        image,
        location,
    })
    if(!createdVenue){
        return res
        .status(500)
        .json({
            success: false, 
            message: "Error in creating the venue post in Db"
        })
    }

    const today = new Date();
    let slotDocs = [];

    for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i); 

        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

        for (const timing of slotTimings) {
            slotDocs.push({
                venue: createdVenue._id,
                date: formattedDate,
                startTime: timing.startTime,
                endTime: timing.endTime,
                isBooked: false,
            });
        }
    }

    await Slot.insertMany(slotDocs);

    return res
    .status(201)
    .json({
        success: true, 
        message: "Venue added",
        venue: createdVenue,
    })
}

async function fetchAllVenue(req,res){
    const allVenues = await Venue.find();
    if(!allVenues){
        return res
        .status(500)
        .json({
            success: false,
            message: "Venues not found"
        })
    }

    return res
    .status(200)
    .json({
        success: true,
        message: "Venues fetched successfully",
        venues: allVenues
    })
}

async function fetchVenueById(req,res){
    const venueId = req.params.id;

    const venue = await Venue.findById(venueId);
    if(!venue){
        return res
        .status(500)
        .json({
            success: false,
            message: "Venue not found"
        })
    }

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate()+7);

    const slots = await Slots.find({
        venue: venueId,
        date : { 
            $gte: today.toISOString().split("T")[0], $lte: nextWeek.toISOString().split("T")[0] 
        }
    }).sort({ date: 1, startTime: 1 });
    if(!slots){
        return res
        .status(500)
        .json({
            success: false,
            message: "Venue'slots not found"
        })
    }

    return res
    .status(200)
    .json({
        venue,
        slots
    })
}

async function bookSlot(req, res){
    const slotId = req.params.slotId;

    const slot = await Slot.findById(slotId);
    if (!slot){ 
        return res
        .status(404)
        .json({
            success: false,
            message: "Slot not found" 
        });
    }

    if (slot.isBooked) {
        return res
        .status(400)
        .json({
            success: false,
            message: "This slot is already booked" 
        });
    }

    slot.isBooked = true;
    slot.bookedBy = req.user._id;
    await slot.save();

    return res
    .status(201)
    .json({
        success: true,
        message: "Slot booked successfully", 
        slot 
    });
}

module.exports = { addVenue, fetchAllVenue, fetchVenueById, bookSlot }