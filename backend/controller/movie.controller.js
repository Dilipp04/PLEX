const Movie = require("../models/Movie.model");

// GET /movies
const getAllMovies = async function (req, res) {
  try {
    const movies = await Movie.find(); // Fetch all movies
    return res.json(movies);
  } catch (error) {}
};

// GET /movies/sorted?sortBy=rating&order=desc
const getSortedMovies = async function (req, res) {
  try {
    let { sortBy, order } = req.query;

    // Ensure the sorting field is valid
    const allowedFields = ["title", "rating", "year", "duration"];
    if (!allowedFields.includes(sortBy)) {
      return res.status(400).json({ error: "Invalid sorting field" });
    }

    // Convert order to 1 (asc) or -1 (desc)
    order = order === "desc" ? -1 : 1;

    const movies = await Movie.find().sort({ [sortBy]: order });

    res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// GET /movies/search?search=war
const getSearchedMovies = async function (req, res) {
  try {
    const { search } = req.query;

    const movies = await Movie.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } }, // Search in title
            { plot: { $regex: search, $options: "i" } }, // Search in description
          ],
        },
      },
      {
        $addFields: {
          titleMatch: {
            $cond: {
              if: {
                $regexMatch: { input: "$title", regex: search, options: "i" },
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
      { $sort: { titleMatch: -1 } }, // Sort: Exact title matches first
    ]);
    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
module.exports = { getAllMovies, getSortedMovies, getSearchedMovies };
