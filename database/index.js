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

// Message
const messageSchema = mongoose.Schema(
  {
    user: mongoose.Schema.ObjectId,
    text: String,
  },
  {timestamps: true},
);

// Chat
const chatSchema = mongoose.Schema(
  {
    messages: [messageSchema],
    chatName: {type: String, default: 'lobby', unique: true},
    participants: [mongoose.Schema.ObjectId],
  },
  {timestamps: true},
);

const User = mongoose.model('User', userSchema);
const Chat = mongoose.model('Chat', chatSchema);

module.exports = {
  models: {
    User,
    Chat,
  },
};
