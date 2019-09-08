const mongoose = require('mongoose');

const SavedSearchSchema = new mongoose.Schema({
  SearchGUID: {
    type: String,
    required: true
  },
  SearchQuery: {
    type: String,
    required: true
  },
  SearchDate: {
    type: String,
    required: true
  }
});

module.exports = SavedSearch = mongoose.model('savedsearch', SavedSearchSchema);
