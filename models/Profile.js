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
      searchString: {
        type: String,
        required: true
      },
      searchResults: {
        type: String,
        required: true
      },
      searchDate: {
        type: Date,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
