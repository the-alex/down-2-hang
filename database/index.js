const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/fetcher';
mongoose.connect(MONGODB_URI);

// Status
const statusSchema = mongoose.Schema({
  text: {type: String, default: 'What a world!'},
});

// User
const userSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true, dropDups: true},
  password: {type: String, required: true},
  status: {type: statusSchema, default: statusSchema},
});

const User = mongoose.model('User', userSchema);

module.exports = {
  models: {
    User,
  },
};
