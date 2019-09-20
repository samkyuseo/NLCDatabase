const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  queryString: {
    type: String,
    required: true
  },
  programName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  station: {
    type: String,
    required: true
  },
  fullText: {
    type: String,
    required: true
  },
  viewership: {
    type: String,
    required: true
  },
  totalViewership: {
    type: String,
    required: true
  },
  videoLink: {
    type: String,
    required: true
  }
});

module.exports = Transcript = mongoose.model('transcript', TranscriptSchema);
