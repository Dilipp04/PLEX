const mongoose = require("mongoose");
const { number } = require("zod");

const MovieSchema = new mongoose.Schema({
  imdbID: { type: String, unique: true, required: true },
  title: String,
  year: String,
  rated: String,
  genre: String,
  director: String,
  duration: Number,
  actors: String,
  plot: String,
  poster: String,
  rating: Number,
});

module.exports = mongoose.model("Movie", MovieSchema);
