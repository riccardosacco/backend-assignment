const express = require("express");
const morgan = require("morgan");

// Load environment variables
require("dotenv").config();

// Connect to DB
const connectDB = require("./config/db");
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());

app.use(morgan("dev"));

// Set static folder
app.use(express.static("public"));

app.use("/api/v1/instants", require("./routes/instants"));

// @route   GET /
// @desc    Get api info
// @access  Public
// @params  No params
app.get("/api/v1", (req, res) => {
  res.send({
    msg: "Welcome to Instants photo uploader API",
    resources: {
      instants: `${process.env.DEPLOY_URL}/api/v1/instants`,
    },
  });
});

// Listen server on PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Connect to RabbitMQ
require("./config/amqp");
