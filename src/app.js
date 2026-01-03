const express = require("express");
const weatherRoutes = require("./routes/weather.routes");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/api/weather", weatherRoutes);

// ❗ Always last
app.use(errorHandler);

module.exports = app;
