const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getSortedMovies,
  getSearchedMovies,
} = require("../controller/movie.controller");

// user routes
router.route("/").get(getAllMovies);
router.route("/sorted").get(getSortedMovies);
router.route("/search").get(getSearchedMovies);

module.exports = router;
