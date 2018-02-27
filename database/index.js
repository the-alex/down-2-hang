const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
mongoose.connect(MONGODB_URI);

const Status = mongoose.model('Status', {
  text: String
});

module.exports = {
  models: {
    Status,
  },
};
