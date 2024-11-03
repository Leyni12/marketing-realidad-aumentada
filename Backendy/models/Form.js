// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  option: { type: String, required: true },
  description: { type: String },
  targetId: { type: String },
  videoUrl: { type: String },
});

module.exports = mongoose.model('Form', formSchema);
