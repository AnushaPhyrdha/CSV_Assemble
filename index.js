const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");
const filterRoutes = require("./routes/filter_routes");
const jwt = require("jsonwebtoken");
const cors = require("cors");

mongoose.connect("mongodb://localhost/OneAssure");

app.use(cors());
require("./model/user");
require("./model/student");

app.use(bodyParser());
app.use("/", loginRoutes);
app.use("/api", postRoutes);
app.use("/api", filterRoutes);

app.listen("5000", () => console.log("Server listening on port 5000"));
