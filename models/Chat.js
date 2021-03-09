const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  message: { type: String, required: true },
  sender: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdat: { type: Date, required: true },
});

module.exports = ChatSchema