const express = require("express");
const router = express.Router();
const multer = require("multer");

// Import randomString function
const randomString = require("../utils/randomString");

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    // Find image extension
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];

    cb(null, `${randomString(15)}.${extension}`);
  },
});

const upload = multer({ storage });

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
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const photo = req.file;

    const instant = {
      ...req.body,
      photo: photo.filename,
      weight: photo.size,
    };

    if (!photo) {
      return res.send(400).status({
        msg: "No photo found, please upload one",
      });
    }

    if (!instant.user && !instant.latitude && !instant.longitude) {
      return res.send(400).status({
        msg: "Metadata for image is missing",
      });
    }

    const inserted = await Instant.create(instant);

    res.send(inserted);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
