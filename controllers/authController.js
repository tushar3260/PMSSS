const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new User({ email, password });
        await newUser.save();
        req.session.user = newUser; // Set the session
        res.redirect('/'); // Redirect to home page
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send('An error occurred during signup.');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { message: 'User not found. Please sign up.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { message: 'Invalid email or password' });
        }
        req.session.user = user; // Set the session
        res.redirect('/'); // Redirect to home page
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('An error occurred during login.');
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('An error occurred during logout.');
        }
        res.redirect('/');
    });
};
