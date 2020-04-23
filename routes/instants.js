const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({ dest: "../public/uploads" });

const Instant = require("../models/Instant");

// @route   GET /instants
// @desc    Get all instants
// @access  Public
// @params  No params
router.get("/", async (req, res) => {
  try {
    // Find all instants order by timestamp descendant
    let instants = await Instant.find().sort({ timestamp: "desc" });

    // Add DEPLOY_URL in front of the photo
    instants = instants.map((instant) => {
      instant.photo = `${process.env.DEPLOY_URL}/uploads/${instant.photo}`;
      return instant;
    });

    res.send(instants);
  } catch (err) {
    console.log(err);
  }
});

// @route   GET /instants/:id
// @desc    Get single instant
// @access  Public
// @params  id
router.get("/:id", async (req, res) => {
  try {
    let instant = await Instant.findById(req.params.id);

    instant.photo = `${process.env.DEPLOY_URL}/uploads/${instant.photo}`;

    res.send(instant);
  } catch (err) {
    console.log(err);
  }
});

// @route   POST /instants
// @desc    Create single instant
// @access  Public
// @params  {instant}
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const instant = req.body;
    const image = req.file;

    if (!image) {
      return res.send(400).status({
        msg: "No image found, please upload one",
      });
    }

    if (!instant.user && !instant.latitude && !instant.longitude) {
      return res.send(400).status({
        msg: "Metadata for image is missing",
      });
    }

    //await Instant.create(req.body);

    res.send({ instant, file });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
