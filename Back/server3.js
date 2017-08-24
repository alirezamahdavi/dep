///////////////////////////server set up
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
////////////////////////////////////////////////////////

'use strict';

var readline = require('readline');

var google = require('./node_modules/googleapis/lib/googleapis.js');
var OAuth2Client = google.auth.OAuth2;
var fitness = google.fitness('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '766861396931-3prm89vintumj8t7vd26hck5bf67a3v5.apps.googleusercontent.com';
var CLIENT_SECRET = 'lvI--JXpWmcxMHhuv-ZfkzbC';
var REDIRECT_URL = 'http://localhost:8080';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/fitness.activity.read' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

// retrieve an access token
getAccessToken(oauth2Client, function () {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});


//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
app.listen(8080, () => {
    console.log('\nSERVER RUNNING ON 8080\n');
})
////////////////////////////////////////////////////////////