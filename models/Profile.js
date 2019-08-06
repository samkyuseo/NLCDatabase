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
      searchDate: {
        type: Date,
        default: Date.now()
      },
      searchString: {
        type: String,
        required: true
      },
      searchResults: [
        {
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
        }
      ]
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
