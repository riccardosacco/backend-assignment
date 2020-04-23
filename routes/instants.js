const express = require("express");

const router = express.Router();

// @route   GET /instants
// @desc    Get all instants
// @access  Public
// @params  No params
router.get("/", (req, res) => {
  res.send({
    msg: "Hello world",
  });
});

module.exports = router;
