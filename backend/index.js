const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
const adminRouter = require("./routes/admin.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authMiddleware = require("./middleware/auth.middleware");
const adminMiddleware = require("./middleware/admin.middleware");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/movies", authMiddleware, movieRouter);
app.use("/admin", authMiddleware, adminMiddleware, adminRouter);
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log(`Live at http://localhost:5000`));
