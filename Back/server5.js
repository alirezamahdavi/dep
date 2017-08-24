const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios'); 
var FitbitApiClient = require("fitbit-node");
/////////////////////////////////////////////////////
/////////////////////****************************************
const path = require('path')

const PORT = process.env.PORT || 8080

app.use(express.static(path.resolve(__dirname+'./../front/build')))
//////////////////////////////////************************************
////////////////////////////////////////////////
const clientID = '**********';
const clientSecret = '********************';
const scope = 'activity heartrate location nutrition profile sleep weight';
const redirectUrl = 'http://localhost:3000/passed';
//////////////////////////////////////////////////////////////////////////

myFitbit = new FitbitApiClient(clientID, clientSecret);
let code = '';
let token = '';
/////////////////////////////////////////////////////////////////////////
let profile = {};
let weight = {};
let sleepGoal = {};
let foodGoal = {};
let heart= {};
///////////////////////////////////////////////////////////////
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
///////////////////////////////////////////////////////////////////
authorizeUrl = myFitbit.getAuthorizeUrl(scope, redirectUrl);

// redirect the user to the Fitbit authorization page
app.get("/authorize", function (req, res,next) {
    res.send(authorizeUrl);
});
app.get("/passed", function(req, res,next){
    code = req.query.code;
    myFitbit.getAccessToken(code, redirectUrl).then (function (result) {
        token = result.access_token
        // use the access token to fetch the user's profile information
        let get1 = myFitbit.get("/profile.json", token)
            //profile = result[0];
        let get2 = myFitbit.get("/body/log/weight/goal.json", token)
            //weight = result[0];
        let get3 = myFitbit.get("/foods/log/goal.json", token)
            //foodGoal = result[0];
        let get4 = myFitbit.get("/sleep/goal.json", token)
            //sleepGoal = result[0];
        let get5 = myFitbit.get("/activities/date/2017-08-24.json", token)
        Promise.all([get1, get2, get3, get4, get5]).then(resolve=>{
            profile = resolve[0][0];
            weight = resolve[1][0];
            foodGoal = resolve[2][0];
            sleepGoal = resolve[3][0];
            heart = resolve[4][0];
            console.log("success in constructing data!")
            res.json({profile,weight,foodGoal,sleepGoal,heart});
        })
    }).catch(function (error) {
        res.send(error);
    });

})
/////////////////////////////////****************************************************
app.get('*',(req, res)=>{
    res.sendFile(path.resolve(__drname+"./../front/build/index.html"))

})
///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log('\nSERVER RUNNING ON 8080\n');
})