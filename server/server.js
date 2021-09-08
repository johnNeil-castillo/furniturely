const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// file system from node
const { readdirSync } = require("fs");

require("dotenv").config();

const app = express();

// Connnect to MongoDb
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`DB Connection error ${err}`));

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));
