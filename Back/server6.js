// initialize the express application
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios'); 

/////////////////////Credentials
const clientID = '228QL8';
const clientSecret = '7303a66e63684d419a45e2b6e4c84c24';
const scope = 'activity heartrate location nutrition profile sleep weight';
const redirectUrl = 'http://localhost:8080';


// initialize the Fitbit API client
let FitbitApiClient = require("fitbit-node");
let client = new FitbitApiClient(clientID, clientSecret);



// redirect the user to the Fitbit authorization page
app.get("/authorize", function (req, res) {
// request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl(scope, redirectUrl));
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", function (req, res) {
// exchange the authorization code we just received for an access token
client.getAccessToken(req.query.code, redirectUrl).then(function (result) {
    // use the access token to fetch the user's profile information
    client.get("/profile.json", result.access_token).then(function (results) {
        res.send(results[0]);
    });
}).catch(function (error) {
    res.send(error);
});
});

// launch the server
app.listen(8080, () => {
    console.log('\nSERVER RUNNING ON 8080\n');
})