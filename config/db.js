const mongoose = require("mongoose");

const { MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env;

// Format Mongo connection string
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

const connectDB = async () => {
  // Connect to MongoDB database
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
