const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// dotenv config :
dotenv.config();
// so this dotenv package helps to hide our sensitive data like passwords , api keys etc in .env file and .config reads the file as soon as the server starts and make it available in process.env object .

// importing routes form routes folder :
const userRoutes = require("./routes/userRoutes");

// mongoDB connection :
connectDB();

// rest object :
const app = express();

// middlewares :
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// port :
const port = process.env.PORT || 8080;

// routes :
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`server running on port no. ${port}`.bgCyan.white);
});
