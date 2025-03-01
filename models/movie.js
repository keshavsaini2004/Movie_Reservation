const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    genre: { 
      type: String, 
      enum: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"], 
      required: true 
    },
    actors:{
        type:Array,
        required:true
    }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;