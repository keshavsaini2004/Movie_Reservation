const express = require("express");
const router = express.Router();
const Seat = require("../models/Seat");


//  Create Seats for a Showtime (Admin Only)
router.post("/create", async (req, res) => {
    try {
        const { showtimeId, totalSeats } = req.body;

        // Generate seat numbers (e.g., "A1", "A2", "B1", etc.)
        const seats = [];
        for (let i = 1; i <= totalSeats; i++) {
            seats.push({ showtime: showtimeId, seatNumber: `S${i}` });
        }
        console.log("Seats to be inserted:", seats); 

        // Save seats to DB
        const insertedSeats = await Seat.insertMany(seats, { ordered: false });
        res.status(201).json({ message: "Seats created successfully", seats });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Get Available Seats for a Showtime
router.get("/available/:showtimeId", async (req, res) => {
    try {
        const { showtimeId } = req.params;

        const availableSeats = await Seat.find({ showtime: showtimeId, isBooked: false });

        res.status(200).json(availableSeats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Get All Seats for a Showtime (Both Booked & Available)
router.get("/all/:showtimeId", async (req, res) => {
    try {
        const { showtimeId } = req.params;

        const allSeats = await Seat.find({ showtime: showtimeId });

        res.status(200).json(allSeats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
