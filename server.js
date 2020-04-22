const express = require("express");

// Load environment variables
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// @route   GET /
// @desc    Get api info
// @access  Public
// @params  No params
app.get("/", (req, res) => {
  res.send({
    msg: "Hello world",
  });
});

// Listen server on PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
