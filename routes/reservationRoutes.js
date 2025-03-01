const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const mongoose = require("mongoose");
const Seat = require("../models/Seat");


router.post("/reservations", async (req, res) => {
    const { userId, showtime, seatIds } = req.body;

    try {
        // Check if any seat is already booked
        const bookedSeats = await Seat.find({ _id: { $in: seatIds }, isBooked: true });

        if (bookedSeats.length > 0) {
            return res.status(400).json({ message: "Some seats are already booked" });
        }

        // Mark seats as booked
        await Seat.updateMany(
            { _id: { $in: seatIds } },
            { $set: { isBooked: true } }
        );

        // Create reservation
        const reservation = new Reservation({ userId, showtime, seatIds });
        await reservation.save();

        res.status(201).json({ message: "Reservation successful", reservation });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


router.get("/reservations/:userId", async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.params.userId })
            .populate("seatIds")
            .populate("showtime");
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});


// Cancel a reservation
router.delete("/reservations/:reservationId", async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.reservationId);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        // Mark seats as available
        await Seat.updateMany(
            { _id: { $in: reservation.seatIds } },
            { $set: { isBooked: false } }
        );

        // Update reservation status
        reservation.status = "cancelled";
        await reservation.save();

        res.json({ message: "Reservation cancelled successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});



module.exports = router;
