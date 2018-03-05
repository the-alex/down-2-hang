const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const socketIO = require('socket.io');

let app = express();

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms as well
app.use(bodyParser.urlencoded({extended: true}));

// Declare static files
app.use(express.static(__dirname + '/client/build'));

// ROUTES -----------------------------------------------------------
// User
// TODO: Handle duplicate username submission
app.post('/api/users/signup', (request, response) => {
  const {username, password} = request.body;
  db.models.User.create({username, password}).then(result => {
    response.status(201).send(JSON.stringify(result));
  });
});

app.post('/api/users/login', (request, response) => {
  // Create a new token id to pair with a username
  const {username, password} = request.body;
  // Check in the database.
  db.models.User.findOne({username, password}).then(result => {
    if (result) {
      response.status(200).send(JSON.stringify({msg: 'Success'}));
    } else {
      response.send(403).send(JSON.stringify({err: 'Credentials Invalid'}));
    }
  });
});

app.get('/api/users', (request, response) => {
  db.models.User.find().then(result => {
    response.send(result);
  });
});

// TODO: Call this `statuses`
// Status
app.get('/api/status', (request, response) => {
  db.models.User.find({}, 'username status').then(result =>
    response.send(JSON.stringify(result)),
  );
});

app.post('/api/status', (request, response) => {
  // Get the current user
  const {username, statusText} = request.body;
  console.log(`statusText: ${statusText}`);
  // Search for the user
  db.models.User.findOne({username})
    .then(user => {
      user.status.text = statusText;
      return user.save();
    })
    .then(user => {
      response.send(
        JSON.stringify({username: user.username, status: user.status}),
      );
    });
  // Update the User.status field
  // return the updated message.
});

// Find all chats with this username in them.
app.get('/api/chats', (request, response) => {
  const {username} = request.body;
  // TODO: Filter by only chats the user is a participant in
  db.models.Chat.find()
    .populate('participants')
    .populate('messages.user')
    .then(chats => {
      response.status(200).send(JSON.stringify(chats));
    });
});

// Create a new chat room, potentially with selected users
app.post('/api/chats', (request, response) => {
  const {chatName} = request.body;
  db.models.Chat.create({
    chatName,
  })
    .then(result => {
      response.status(200).send('Chat created');
    })
    .catch(error => {
      response.send(JSON.stringify({error: error}));
    });
});

// SERVER SETUP ------------------------------------------------

let port = process.env.PORT || 3001;

let server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

io = socketIO(server);

io.on('connection', socket => {
  console.log(`New socket.io connection: ${socket.id}`);

  // Append new message to chat using data
  socket.on('SEND_MESSAGE', data => {
    const {username, message, chatName} = data;
    // Save message to chat
    db.models.Chat.findOne({name: chatName})
      .populate('participants')
      .then(chat => {
        // Get the user._id
        const user = chat.participants.filter(
          user => user.username === username,
        )[0];
        chat.messages.push({
          user: user._id,
          text: message,
        });
        chat.save((err, doc) => {
          console.log(doc);
          // Send data to clients
          io.emit('RECEIVE_MESSAGE', {user, text: message, chatName});
        });
      });
  });

  socket.join('lobby');
});
