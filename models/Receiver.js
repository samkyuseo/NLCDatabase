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
  }
});
module.exports = Receiver = mongoose.model('receiver', ReceiverSchema);
