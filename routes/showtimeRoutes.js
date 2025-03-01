const express = require('express');
const router = express.Router();
const Showtime = require('../models/showtime');

router.post('/add', async (req, res) => {
  try{
    const data = req.body;
    const insertJson ={
      movieId: data.movieId,
      date: data.date,
      totalSeats: data.totalSeats,
      startTime: data.startTime,
    }
    const newShowtime = new Showtime(insertJson);
    const response = await newShowtime.save();
    res.status(200).json({
      success:true,
      status: 200,
      message: "Showtime saved successfully",
      data: response
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
});

//get all showtimes
router.get('/list', async (req, res) => {
  try{
    const showtimes = await Showtime.find().populate('movieId');
    res.status(200).json({
      success:true,
      status: 200,
      data: showtimes
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
});

//get showtime by id
router.get('/:id', async (req, res) => {
  try{
    const showtime = await Showtime.findById(req.params.id).populate('movieId');
    res.status(200).json({
      success:true,
      status: 200,
      data: showtime
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
});

//delete showtime by id
router.delete('/:id', async (req, res) => {
  try{
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success:true,
      status: 200,
      message: "Showtime deleted successfully",
      data: showtime
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
});1
module.exports = router;