const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  researchTopic: {
    type: String,
    required: true
  },
  searchHistory: [
    {
      SearchDate: {
        type: String,
        required: true
      },
      SearchQuery: {
        type: String,
        required: true
      },
      SearchGUID: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
