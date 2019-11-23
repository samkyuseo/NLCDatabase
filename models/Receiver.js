const mongoose = require('mongoose');

const ReceiverSchema = new mongoose.Schema({
  '1': {
    type: String,
    default: ''
  },
  '2': {
    type: String,
    default: ''
  },
  '3': {
    type: String,
    default: ''
  },
  '4': {
    type: String,
    default: ''
  },
  '5': {
    type: String,
    default: ''
  },
  '6': {
    type: String,
    default: ''
  },
  '7': {
    type: String,
    default: ''
  },
  '8': {
    type: String,
    default: ''
  },
  '9': {
    type: String,
    default: ''
  },
  '10': {
    type: String,
    default: ''
  },
  '12': {
    type: String,
    default: ''
  },
  '13': {
    type: String,
    default: ''
  },
  '14': {
    type: String,
    default: ''
  },
  '15': {
    type: String,
    default: ''
  }
});
module.exports = Receiver = mongoose.model('receiver', ReceiverSchema);
