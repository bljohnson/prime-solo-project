var express = require('express');
var router = express.Router();
var passport = require('passport');

// handles Ajax request for user info if user is authenticated
router.get('/', function(req, res) {
	// check if signed in
	if (req.isAuthenticated()) {
		// send back user object from db
		console.log('Signed in');
		res.send (req.user);
	} else {
		// failure best handled on server. do redirect here.
		console.log('Not signed in');
		res.redirect(301, '/');
	}
}); // end router.get

module.exports = router;
