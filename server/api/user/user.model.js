const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  locations: Array,
  notificationPreference: {
    emailIds: Array,
    subject: String,
    message: String,
    time: String,
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
