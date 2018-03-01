const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

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

// Status
app.get('/api/status', (request, response) => {
  db.models.User.find({}, 'username status').then(result =>
    response.send(JSON.stringify(result)),
  );
});

let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
