const Movie = require("../models/Movie.model");

//POST : /admin
const AddMovies = async function (req, res) {
  try {
    const {
      title,
      year,
      rated,
      genre,
      director,
      duration,
      actors,
      plot,
      poster,
      rating,
    } = req.body;
    if (!title || !rating || !year || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMovie = new Movie(req.body);
    await newMovie.save();

    return res
      .status(201)
      .json({ message: "Movie added successfully", movie: newMovie });
  } catch (error) {
    return res.json({ message: error });
  }
};

//PUT : /admin/:id
const EditMovies = async function (req, res) {
  try {
    const { id } = req.params;
    const movie = await Movie.findOneAndUpdate({ imdbID: id }, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({
      message: "Movie updated successfully",
    });
  } catch (error) {
    return res.json({ message: error });
  }
};

//DELETE : /admin/:id
const DeleteMovies = async function (req, res) {
  try {
    const { id } = req.params;
    const movie = await Movie.findOneAndDelete({ imdbID: id });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
};

module.exports = { AddMovies, EditMovies, DeleteMovies };
