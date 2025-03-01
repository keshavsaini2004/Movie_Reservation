const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const cors = require('cors');
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 9000;

// Importing the routes
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const showtimeRoutes = require('./routes/showtimeRoutes');
const seatRoutes = require('./routes/seatRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Use the Router file
app.use('/user', userRoutes);
app.use('/movie', movieRoutes);
app.use('/showtime', showtimeRoutes);
app.use('/seat', seatRoutes);
app.use('/reservation', reservationRoutes);

app.listen(9000, ()=>{
  console.log('Server is running on port 9000');
})