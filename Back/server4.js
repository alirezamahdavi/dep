///////////////////////////server set up
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
////////////////////////////////////////////////////////
const axios = require('axios') 
///////////////////////////////////////////////////


'use strict';

var readline = require('readline');

var google = require('./node_modules/googleapis/lib/googleapis.js');
var OAuth2Client = google.auth.OAuth2;
var fitness = google.fitness('v1');

//console.log(fitness);

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
  //callback(url)
}

getAccessToken(oauth2Client, function (url) {
    // retrieve user profile
    fitness.people.get({ userId: 'me', auth: oauth2Client}, function (err, profile) {
    if (err) {
        return console.log('An error occured', err);
    }
    return url
    //console.log(profile);
    });
});

// app.get('/start', (req,res)=>{
//     return res.send(getAccessToken(oauth2Client, function (url) {
//         // retrieve user profile
//         fitness.people.get({ userId: 'me', auth: oauth2Client}, function (err, profile) {
//         if (err) {
//             return console.log('An error occured', err);
//         }
//         return url
//         //console.log(profile);
//         });
//     }));
// })

app.get('/',(req,res)=>{
    const code = req.query.code;
    oauth2Client.getToken(code, function (err, tokens) {
        if (err) {
          return callback(err);
        }
        // set tokens to the client
        // TODO: tokens should be set by OAuth2 client.
        oauth2Client.setCredentials(tokens);
        fitness.users.dataSources.list({ userId: 'me', auth: oauth2Client }, function (err, profile) {
            if (err) {
                return console.log('An error occured', err);
            }
            console.log(profile);
            console.log(profile.dataSource.map(el=>console.log(el.dataType)))
            for (let i = 0; i < profile.dataSource.length; i++){
                if (profile.dataSource[i].name = "com.google.step_count.cumulative"){
                    console.log('found')
                    console.log("\n",i)
                }
                
            }
            // fitness.users.dataSources.datasets.get({ userId: 'me', auth: oauth2Client,  dataSourceId: profile.dataSource[0].dataType.field.format, datasetId:'1502406228000-1503006228000' }, function (err, mydata) {
            //     if (err) {
            //         return console.log('An error occured', err);
            //     }
            //      //console.log(mydata)
            // });
        // retrieve an access token
            
        });
        ///////////////////////////////////////////////////////////////
        // fitness.users.dataSources.datasets.get({ userId: 'me', auth: oauth2Client,  dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps', datasetId:'1502406228000-1503006228000' }, function (err, mydata) {
        //     if (err) {
        //         return console.log('An error occured', err);
        //     }
        //     console.log(mydata)
        // });
        // retrieve an access token
        res.send("success");
        
        
    });


})

// const my_data = {
//     "aggregateBy": [{
//       "dataTypeName": "com.google.step_count.delta",
//       "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
//     }],
//     "bucketByTime": { "durationMillis": 86400000 },
//     "startTimeMillis": 1438705622000,
//     "endTimeMillis": 1439310422000
//   };

// const myUrl = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate'
// const promise=axios.post(myUrl,my_data)

// promise.then((result)=>{
// console.log('succes!')
// console.log(result)
// })

// promise.catch( (error)=>{
// console.log('error!')
// console.log(error)
// })

/////////////////////////////////////////////////////////////
app.listen(8080, () => {
    console.log('\nSERVER RUNNING ON 8080\n');
})
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////











