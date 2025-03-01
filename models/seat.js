const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime",
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
