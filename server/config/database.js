const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
  } catch (error) {
    throw `Db connection failed: ${error.message}`;
  }
};
module.exports = connectDB;
