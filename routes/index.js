/*var labyokeFinderClass = require('./labyokerfinder');*/
/*var accounting = require('./accounting');
var dates = require('../config/staticvariables');

var LabYokeUsers = labyokeFinderClass.LabYokeUsers;
*/
var moment = require('moment-timezone');
var musicFinderClass = require('./labyokerfinder');
var MusicRules = musicFinderClass.MusicRules;
var MusicUpdateRules = musicFinderClass.MusicUpdateRules;
var MusicAddTracks = musicFinderClass.MusicAddTracks;
var MusicDeleteTracks = musicFinderClass.MusicDeleteTracks;
var MusicStock = musicFinderClass.MusicStock;
var express = require('express');
var util = require('util');
var router = express.Router();


var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var yahooFinance = require('yahoo-finance');
var _ = require('lodash');

//var fs = require('fs');
//html-pdf

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        console.log("inside upload function");
        callback(null, true);
    }
}).single('file');

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


module.exports = function(router) {


var client_id = '7c7e3e774ee3460292e5fe3695819cb0'; // Your client id
var client_secret = 'f3bbc2590f7143c5b8ffa3e5bf3c7698'; // Your secret
var redirect_uri = 'https://financialmoodswing.herokuapp.com/callback/'; // Your redirect uri
var stateKey = 'spotify_auth_state';



router.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public streaming';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', function(req, res) {
  console.log("inside callback0");
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    console.log("inside callback0");
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        var user_id = body.id;
        req.session.userid = body.id;
        console.log("userid is: " + user_id);

        req.session.access = access_token;
        console.log("set access: " + req.session.access);
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
          //req.session.userid = body.id;
          //user_id = body.id;
          //
        });

        var or =req.session.to;
        if(or){
        or = or.replace(/\/$/,"");
      }
        // we can also pass the token to the browser to make requests from there
        if(or!= null && or.length > 0){
          res.redirect(or + '/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            user_id: user_id
          }));
          req.session.to = null;
        } else {
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            user_id: user_id
          }));
        }
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      req.session.access = access_token;
      console.log("set access: " + req.session.access);
      res.send({
        'access_token': access_token
      });
    }
  });
});



/*  router.get('/transferusertolab', function(req, res) {
    res.redirect('/users');
  });

  router.get('/help', function(req, res) {
    res.render('help', {
      ordersnum: req.session.orders,
      sharesnum: req.session.shares,
      title : 'Help',
      loggedIn : req.session.loggedin,
      labyoker : req.session.user,
      isLoggedInAdmin: req.session.admin,
      menu : 'help',
      title: 'Help'
    });

  });
*/

  router.get('/logout', function(req, res) {
    req.logout();
    req.session.user = null;
    req.session.loggedin = false;
    res.redirect('/login');
  });

  router.get('/test', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
        console.log("set access test: " + access_token);
    if(req.session.access != undefined){
      var musicRules = new MusicRules();
      musicRules.getrules(function(error, results) { 
    res.render('test', {
      rules: results,
      /*ordersnum: req.session.orders,
      sharesnum: req.session.shares,*/
      title : 'Admin',
      access_token:access_token,
      user_id:req.session.userid,
      /*loggedIn : req.session.loggedin,
      labyoker : req.session.user,
      isLoggedInAdmin: req.session.admin,*/
      menu : 'test'
    });
  });

  } else{
    res.redirect('/login');
  }

  });

    router.get('/mood', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
        console.log("set access test: " + access_token);

      var musicRules = new MusicRules();
      musicRules.getrules(function(error, results) { 
    res.render('mood', {
      rules: results,
      /*ordersnum: req.session.orders,
      sharesnum: req.session.shares,*/
      title : 'Mood',
      access_token:access_token,
      user_id:req.session.userid,
      /*loggedIn : req.session.loggedin,
      labyoker : req.session.user,
      isLoggedInAdmin: req.session.admin,*/
      menu : 'mood'
    });
  });

  });

    
router.get('/playlistfetch', isLoggedIn, function(req, res) {
   if(req.session.access != undefined){
      var musicRules = new MusicRules();
      musicRules.playlistfetch(function(error, results) { 
    res.send({res:results});
  });

  } else{
    res.redirect('/mood');
  }

});

router.get('/stockfetch', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
      var playlistname = req.query.playlistname;
      var prog = req.query.prog;
        console.log("set access test: " + access_token);
        console.log("set playlistname: " + playlistname);
        console.log("set prog: " + prog);
var SYMBOLS = [
  'XAX',
  '^FCHI',
  '^IXIC',
  '^NDX',
  '^DJI',
  '^GSPC',
  '^OEX',
  '^RUT',
  '^GDAXI',
  '^N225',
  '^HSI',
  '^FTSE',
  '^BATSK',
  '^STOXX50E'
];

       

var datenow = moment(new Date).tz("America/New_York");
var dateyest = moment().add(-2, 'days');

var daynow = datenow.weekday();
var dayyest = dateyest.weekday();
console.log("day now is: " + daynow);



if(daynow == 5){
  console.log("here00");
  datenow = moment().add(-2, 'days');
  dateyest = moment().add(-3, 'days');
  console.log("here01");
} else if(daynow == 1){
  console.log("here10");
  datenow = moment().add(-3, 'days');
  dateyest = moment().add(-4, 'days');
  console.log("here11");
} else if(dateyest == 0){
  console.log("here20");
  dateyest = datenow.add(-4, 'days');
      console.log("here021");
} else if(dateyest == 6){
  console.log("here30");
  dateyest = datenow.add(-3, 'days');
  console.log("here31");
}
  datenow = datenow.format('YYYY-MM-DD');
  dateyest = dateyest.format('YYYY-MM-DD');

console.log("here40: "+datenow);
//datenow = datenow.format('YYYY-MM-DD');
console.log("here50: "+ dateyest);
//dateyest = dateyest.format('YYYY-MM-DD');
console.log("here51");

console.log("datenow is: " + datenow);
console.log("dateyest is: " + dateyest);

var quotesfinal = [];
var quotesyesfinal = [];

yahooFinance.historical({
  symbols: SYMBOLS,
  from: dateyest,
  to: datenow,
  period: 'd'
}).then(function (result) {
  _.each(result, function (quotes, symbol) {
    console.log(util.format(
      '=== %s (%d) ===',
      symbol,
      quotes.length
    ).cyan);
    if (quotes[0]) {
      quotesfinal.push(quotes[0]);
      quotesyesfinal.push(quotes[quotes.length - 1]);
      console.log(
        '%s\n...\n%s',
        JSON.stringify(quotes[0], null, 2),
        JSON.stringify(quotes[quotes.length - 1], null, 2)
      );
    } else {
      console.log('N/A');
    }
  });
}).finally(function() {
    // get a random index
  var b = Math.floor((Math.random() * quotesfinal.length-1) + 1);

  var musicStock = new MusicStock(quotesfinal[b],quotesyesfinal[b], playlistname, prog);
      musicStock.getmusic(function(error, results) { 
        console.log("stock " + results.index + " - music: " + results.url + " is successful.");
        res.send(results);
  });
    //res.send({quotes:quotesfinal,quotesyes:quotesyesfinal});
});;



  });

    router.post('/addtoplaylist', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
    if(req.session.access != undefined){
      var databuild = req.body.databuild;
      var playlistid = req.body.playlistid;
      var playlistname = req.body.playlistname;
      console.log("databuild: " + JSON.stringify(databuild));
      console.log("playlistid: " + playlistid);

      var musicAddtracks = new MusicAddTracks(databuild,playlistid,playlistname);
      musicAddtracks.addtoplaylist(function(error, results) { 
        console.log("added tracks for " + playlistid + " is successful.");
        res.end();
  });

  } 

  });

    router.post('/deletetrack', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
    if(req.session.access != undefined){
      var playlistname = req.body.playlistname;
      var trackid = req.body.trackid;
      console.log("playlistname: " + playlistname);
      console.log("trackid: " + trackid);

      var musicDeletetracks = new MusicDeleteTracks(playlistname,trackid);
      musicDeletetracks.deletetrack(function(error, results) { 
        console.log("deleted track " + trackid + " for " + playlistname + " is successful.");
        res.end();
  });

  } 

  });


  router.post('/updaterule', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
      console.log("updaterule set access test0: " + req);
        console.log("updaterule set access test: " + req.col);
    if(req.session.access != undefined){
      var col = req.body.col;
      var rule = req.body.rule;
      var val = req.body.val;
      console.log("col: " + col);
      console.log("rule: " + rule);
      console.log("val: " + val);

      var musicUpdateRules = new MusicUpdateRules(col,rule,val);
      musicUpdateRules.updaterule(function(error, results) { 
        console.log("update " + col + " for " + rule + " is successful.");
        res.end();
  });

  } 

  });

    router.post('/updaterulestr', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
      console.log("updaterulestr set access test0: " + req);
        console.log("updaterulestr set access test: " + req.col);
    if(req.session.access != undefined){
      var col = req.body.col;
      var rule = req.body.rule;
      var val = req.body.val;
      console.log("col: " + col);
      console.log("rule: " + rule);
      console.log("val: " + val);

      var musicUpdateRules = new MusicUpdateRules(col,rule,val);
      musicUpdateRules.updaterulestr(function(error, results) { 
        console.log("update " + col + " for " + rule + " is successful.");
        res.end();
  });

  } 

  });

    router.post('/updateruleint', isLoggedIn, function(req, res) {
      var access_token = req.session.access;
      console.log("updateruleint set access test0: " + req);
        console.log("updateruleint set access test: " + req.col);
    if(req.session.access != undefined){
      var col = req.body.col;
      var rule = req.body.rule;
      var val = req.body.val;
      console.log("col: " + col);
      console.log("rule: " + rule);
      console.log("val: " + val);

      var musicUpdateRules = new MusicUpdateRules(col,rule,val);
      musicUpdateRules.updateruleint(function(error, results) { 
        console.log("update " + col + " for " + rule + " is successful.");
        res.end();
  });

  } 

  });

  router.get('/', function(req, res) {
    //req.logout();
    //req.session.user = null;
    //req.session.loggedin = false;
    res.redirect('/test');
  });

  function isLoggedIn(req, res, next) {
    if (req.session.access)
      return next();
    console.log('requested url: '+req.originalUrl);
    req.session.to = req.originalUrl;
    res.redirect('/login');
  }
  function isLoggedInAdmin(req, res, next) {
    if (req.session.user && (req.session.useradmin || req.session.usersuperadmin))
      return next();
    console.log('requested url: '+req.originalUrl);
    req.session.to = req.originalUrl;
    res.redirect('/login');
  }

/*  router.get('/login', function(req, res) {
    console.log("login req.session.user: " + req.session.user);
    if (req.session.user) {
      res.redirect('/querytool');
    } else {
      var labyokerLabs = new LabyokerLabs('','');
      labyokerLabs.getlabs(function(error, labs) {
        req.session.labs = labs;
        console.log("loggin in labs: " + labs);
        res.render('login', {ordersnum: req.session.orders, sharesnum: req.session.shares, labyoker : req.session.user, title: 'Login',isLoggedInAdmin: req.session.admin});
        req.session.messages = null;
      });

    }
  });

  router.get('/querytool', isLoggedInSuperAdmin, function(req, res) {
    if (req.session.user) {
      var labYokeSearch = new LabYokeSearch("",req.session.email);
      labYokeSearch.findagents(function(error, results) {     
        if (results != null && results.length > 0){
          res.render('querytool', {mylab: req.session.lab,ordersnum: req.session.orders, sharesnum: req.session.shares, labyoker : req.session.user, isLoggedInAdmin: req.session.admin, agentsResults : results, loggedIn : true, title: 'Query Tool'});
        } else {
          res.render('querytool', {mylab: req.session.lab,ordersnum: req.session.orders, sharesnum: req.session.shares, labyoker : req.session.user, isLoggedInAdmin: req.session.admin, loggedIn : true, title: 'Query Tool'});
        }
        req.session.messages = null;
      });
    } else {
      res.redirect('/login');
    }
  });
*/



};
