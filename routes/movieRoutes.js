const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.post('/add', async (req, res) => {
  try{
    const data = req.body;
    const insertJson ={
      title: data.title,
      description: data.description,
      year: data.year,
      rating: data.rating,
      genre: data.genre,
      actors: data.actors
    }
    const newMovie = new Movie(insertJson);
    const response = await newMovie.save();
    res.status(200).json({
      success:true,
      status: 200,
      message: "Data saved successfully",
      data: response
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
});

router.get('/list', async (req, res) => {
  try{
    const movies = await Movie.find();
    res.status(200).json({
      success:true,
      status: 200,
      data: movies
    });
  }catch(err){
    console.error(err);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
});

module.exports = router;