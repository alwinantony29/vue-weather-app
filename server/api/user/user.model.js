const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: [true, "Email is required"], unique: true },
  userName: { type: String, required: [true, "Username is required"] },
  password: { type: String, required: true },
  locations: [{ type: String, required: true }],
  notificationPreference: {
    emailIds: [{ type: String, required: true }],
    subject: String,
    message: String,
    time: String,
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
