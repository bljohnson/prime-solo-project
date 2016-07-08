var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectToDB = mongoose.connect('mongodb://localhost:27017/adoptiondb').connection;

var Dog = require('../models/dog'); // require model file that creates dogSchema
var User = require('../models/newuser'); // require model file that creates userSchema

// var session = require('express-session'); // allows user's session to persist, need for Passport
// var passport = require('../strategies/users_mongoose.js');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// test db connection
connectToDB.on('error', function(err) {
	console.log('mongodb connection error:', err);
});
connectToDB.once('open', function() {
	console.log('mongodb connection open');
});

// app.get('/signin', function(req, res) {
// 	res.sendfile('public/partials/signin.html');
// });

// Passport session configuration - allows user's session to be persistent
// app.use(session({
//    secret: 'secret',
//    key: 'user',
//    resave: 'true',
//    saveUninitialized: false,
//    cookie: {maxage: 60000, secure: false}
// })); // end app.use

// init passport
// app.use(passport.initialize());
// app.use(passport.session());

// include routes
// var index = require('../routes/index');
// var signUp = require('../routes/signup');

// routes
// app.use('/signup', signUp);
// app.use('/*', index);

// spin up server
app.listen(process.env.PORT || 3000, function() {
	console.log('now serving port');
});

// make public folder static
app.use(express.static('public'));

// base URL
app.get('/', function(req,res) {
	console.log('in base URL');
	res.sendFile(path.resolve('views/index.html'));
});

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
