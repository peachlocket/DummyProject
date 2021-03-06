const express = require('express');
const User = require('../models').User;
const Account = require('../models').Account;
const passport = require('../config/passport');
const router = new express.Router();

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { 
		failureRedirect: '/login' 
	}),
	function(req, res) {
		req.session.currentUser = req.user.email;
		res.redirect('/profile');
});


module.exports = router;