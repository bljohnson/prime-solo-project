////////////////// SANS PASSPORT ///////////////


// var mongoose = require('mongoose');
// var passport = require('passport');
// var localStrategy = require('passport-local').Strategy;
// var User = require('../models/userModel');
//
// // store this user's unique ID in the session for later reference
// // only runs during authentication
// passport.serializeUser(function(user, done) {
// 	console.log('Serialized: ', user);
// 	done(null, user._id);
// });
//
// // runs on every request after user is authenticated
// // look up user's ID in the session and use it to find them in db for each request
// passport.deserializeUser(function(id, done) {
// 	User.findById(id, function(err, user) {
// 		if(err) {
// 			done(err);
// 		}
// 		console.log('Deserialized: ', user);
// 		done(null, user);
//   });
// });
//
// // does actual work of logging in
// // called by middleware stack
// passport.use('local', new localStrategy ({
// 	passReqToCallback: true,
// 	usernameField: 'username'
// }, function (req, username, password, done) {
// 	// mongoose stuff
// 	User.findOne({username: username}, function (err,user) {
// 		if (err) {
// 			throw err;
// 		} // end if err
// 		if (!user) {
// 			// user not found
// 			return done (null, false, {message: 'Incorrect credentials.'});
// 		} else {
// 			// found user! now check their given password against one stored in db
// 			user.comparePassword(password, function(err, isMatch) {
// 				if (err) {
// 					throw err;
// 				}
// 				if (isMatch) {
// 					// all is good, populate user object on the session via serializeUser
// 					return(done(null, user));
// 				} else {
// 					// no good
// 					done(null, false, {message: 'Incorrect credentials.'});
// 				}
// 			}); // end user.comparePassword
// 		} // end else
// 	}); // end user.findOne
// } // end function
// )); // end passport.use
//
// module.exports = passport;
