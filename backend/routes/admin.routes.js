const express = require("express");
const {
  AddMovies,
  EditMovies,
  DeleteMovies,
} = require("../controller/admin.controller");
const router = express.Router();

// admin routes
router.route("/").post(AddMovies);
router.route("/:id").put(EditMovies);
router.route("/:id").delete(DeleteMovies);

module.exports = router;
