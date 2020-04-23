const fs = require("fs");

// Load environment variables
require("dotenv").config();

// Load models
const Instant = require("./models/Instant");

// Connect to DB
const connectDB = require("./config/db");
connectDB();

const instants = JSON.parse(fs.readFileSync("./json/instants.json"));

// Import into DB
const importData = async () => {
  try {
    await Instant.create(instants);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Instant.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

switch (process.argv[2]) {
  case "-i":
    importData();
    break;
  case "-d":
    deleteData();
    break;
}
