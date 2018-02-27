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
// Test
app.get('/api/hello', (request, response) => {
  response.send('Hello!');
});

// User
// TODO: Handle duplicate username submission
app.post('/api/user/create', (request, response) => {
  const {username, password} = request.body;
  db.models.User.create({username, password}).then(result => {
    response.send(JSON.stringify(result));
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
