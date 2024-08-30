const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, course, income, password } = req.body;
        const newUser = new User({ name, email, phone, course, income, password });
        await newUser.save();
        res.send('Registration successful!');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('An error occurred during registration.');
    }
};
