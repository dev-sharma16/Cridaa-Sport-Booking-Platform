const express = require('express');
const authMiddleware = require("../middleware/auth.middleware");
const { addVenue, fetchAllVenue, fetchVenueById, bookSlot } = require("../controllers/venue.controller")

const router = express.Router();

router.post("/addVenue", authMiddleware, addVenue);

router.get("/", fetchAllVenue);

router.get("/:id", authMiddleware, fetchVenueById);

router.post("/book/:slotId", authMiddleware, bookSlot)

module.exports = router;