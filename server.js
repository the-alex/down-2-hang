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

// ROUTES

app.get('/api/hello', (request, response) => {
  response.send('Hello!');
});

app.post('/api/status', (request, response) => {
  db.models.Status.create({text: request.body.text}).then(result => {
    response.send(JSON.stringify(result));
  });
});

app.get('/api/status', (request, response) => {
  db.models.Status.find().then(result => response.send(JSON.stringify(result)));
});

let port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
