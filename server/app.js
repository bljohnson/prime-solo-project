var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('../strategies/userStrategy');
var session = require('express-session'); // allows user's session to persist, need for Passport

// include routes
var index = require('../routes/index');
var signUp = require('../routes/signup');
var user = require ('../routes/user');

// include models
var Dog = require('../models/dogModel'); // require model file that creates dogSchema
var User = require('../models/userModel'); // require model file that creates userSchema
var Settings = require('../models/settingsModel'); // require model file that creates settingsSchema

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// make public folder static
app.use(express.static('public'));

// Passport session configuration - allows user's session to be persistent
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
})); // end app.use

// init passport
app.use(passport.initialize());
app.use(passport.session());

// use routes
app.use('/signup', signUp);
app.use('/user', user);
app.use('/*', index); // put last in routes

// db connection string
var connectToDB = mongoose.connect('mongodb://localhost:27017/adoptiondb').connection;

// test db connection
connectToDB.on('error', function(err) {
	console.log('mongodb connection error:', err);
});
connectToDB.once('open', function() {
	console.log('mongodb connection open');
});

// terminate user session
// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

// spin up server
app.listen(process.env.PORT || 3000, function() {
	console.log('now serving port');
});

// base URL
app.get('/', function(req,res) {
	console.log('in base URL');
	res.sendFile(path.resolve('public/views/index.html'));
});


// --------------------------------------------------------------------------------------------------------


// save user settings in db
app.post('/postSettings', function(req, res) {
	console.log('settings posted successfully');
  	console.log('req.body = ', req.body);
	// creates object to store in db using object received by server, property names need to match those in model schema
  	var newSettings = new Settings({
		status: req.body.status,
	  	species: req.body.species,
	  	age: req.body.age,
	  	gender: req.body.gender,
	  	size: req.body.size,
	  	location: req.body.location,
	  	radius: req.body.radius,
	  	dogs: req.body.dogFriendly,
	  	cats: req.body.catFriendly,
	  	kids: req.body.kidFriendly,
	  	energy: req.body.energyLevel,
	  	breed: req.body.primaryBreed,
	  	housetrained: req.body.housetrained,
	  	cratetrained: req.body.cratetrained
  	});
	// saves object to db. .save is a method specific to Mongoose
  	newSettings.save(function(err) {
    		if (err) {
      		console.log(err);
      		res.sendStatus(500);
    		} else {
      		console.log('Settings saved successfully!');
      		res.send(newSettings); // returns user's saved settings in Chrome console
    		} // end if/else statement
  	}); // end newSettings save function
}); // end app.post route


// get user settings from db
app.get('/getSettings', function(req, res){
	Settings.find() // finds ALL settings in usersettings collection
  	.then(function(data){
    		res.send(data);
  	});
}); // end '/getSettings' app.get




// --------------------------------------------------------------------------------------------------------------

// get all favorited dogs in adoptiondb
app.get('/getDogs', function(req, res){
  Dog.find()
  .then(function(data){
    res.send(data);
  });
}); // end app.get

// post to adoptiondb
app.post('/postDog', function(req, res) {
  console.log('dog posted successfully to Favorites list');
  console.log('req.body = ', req.body);
// creates object to store in adoptiondb using object received by server, property names need to match those in model schema
  var newDog = new Dog({ // create new Dog to create new instance of Dog model in adoptiondb, using the following values
    name: req.body.name,
    age: req.body.age,
    breed: req.body.breed,
    gender: req.body.gender
  });
// saves object to db. .save is a method specific to Mongoose
  newDog.save(function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('Dog saved successfully to Favorites list!');
      res.sendStatus(200);
    } // end if/else statement
  }); // end newDog save function
}); // end app.post

// delete dog from dogdb
app.post('/deleteDog', function(req, res) {
  console.log('in delete route');
  Dog.findOne({'_id': req.body.id}, function (err, pet) {
    if (err) {
      console.log (err);
    } else {
      Dog.remove({'_id': req.body.id}, function (err) {
        if (err) {
          console.log ('remove ' + err);
        }
      }); // end remove function
    } // end if/else statement
  }); // end findOne function
}); // end app.post
