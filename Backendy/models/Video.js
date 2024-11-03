const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoUrl: String,
  vuforiaTargetId: String
});

module.exports = mongoose.model('Video', videoSchema);
