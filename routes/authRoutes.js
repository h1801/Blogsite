const router = require('express').Router();
//const { response } = require('express');
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { title:'login' ,user: req.user });
});

// auth logout
router.get('/logout', (request, response) => {
    // handle with passport
    request.logout();
    response.redirect('/auth/login');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;