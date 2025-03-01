const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtime",
        required: true
    },
    seatIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seat",
        required: true
    }],
    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked"
    }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
