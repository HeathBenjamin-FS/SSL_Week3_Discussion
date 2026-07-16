const express = require("express");
const app = express();
const routeHandler = require("./routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
    success: true,
  });
});

app.use("/api/geo-data", routeHandler);

module.exports = app;
