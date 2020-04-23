const express = require("express");
const router = express.Router();
const multer = require("multer");
const amqp = require("amqplib");

// Import randomString function
const randomString = require("../utils/randomString");

const storage = multer.diskStorage({
  destination: "./public/tmp/",
  filename: function (req, file, cb) {
    // Find image extension
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];

    // Save file with random string filename
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
    res.status(500).send({
      msg: "Internal Server Error",
    });
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

    if (!instant) {
      return res.status(404).send({ msg: "Instant not found" });
    }

    instant.photo = `${process.env.DEPLOY_URL}/uploads/${instant.photo}`;

    res.send(instant);
  } catch (err) {
    res.status(500).send({
      msg: "Internal Server Error",
    });
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

    // TODO: Send job to rabbitmq queue
    amqp.connect(process.env.AMQP_URL).then(function (conn) {
      return conn
        .createChannel()
        .then(function (ch) {
          var q = "instants";
          var msg = photo.path;

          var ok = ch.assertQueue(q, { durable: false });

          return ok.then(function (_qok) {
            ch.sendToQueue(q, Buffer.from(msg));
            console.log(" [x] Sent '%s'", msg);
            return ch.close();
          });
        })
        .finally(function () {
          conn.close();
        });
    });

    const inserted = await Instant.create(instant);

    res.send({
      ...inserted._doc,
      photo: `${process.env.DEPLOY_URL}/uploads/${inserted.photo}`,
    });
  } catch (err) {
    res.status(500).send({
      msg: "Internal Server Error",
    });
    console.log(err);
  }
});

module.exports = router;
