const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerController');
const { signupUser, loginUser, logoutUser } = require('../controllers/authController');

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

// Render the landing page
router.get('/', (req, res) => {
    res.render('landing', { user: req.session.user });
});

// Render the registration form
router.get('/register', isAuthenticated, (req, res) => {
    res.render('register');
});

// Handle registration form submission
router.post('/register', registerUser);

// Render the signup form
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle signup form submission
router.post('/signup', signupUser);

// Render the login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login form submission
router.post('/login', loginUser);

// Handle logout
router.get('/logout', logoutUser);

module.exports = router;
