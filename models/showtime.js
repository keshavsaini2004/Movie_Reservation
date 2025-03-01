const mongoose = require('mongoose');
const movie = require('./movie');

const showtimeSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  startTime: {
    type: String,
    required: true
  }
});

const Showtime = mongoose.model('Showtime', showtimeSchema);
module.exports = Showtime;