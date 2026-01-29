const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  remainderAt: { type: Date, required: true },
  remainderSent: { type: Boolean, default: false },
  email: String,
  phone: String,
  notifyBefore: { type: Number, default: 5 },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
