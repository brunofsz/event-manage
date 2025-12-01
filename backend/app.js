const express = require("express");
const cors = require("cors");
// const { connect } = require("mongoose");
const app = express();

app.use(cors());

app.use(express.json());

// DB connection
const conn = require("./db/conn");

conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server online");
});
