const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./config/database');
const indexRouter = require('./routes/index');

const app = express();

// Connect to MongoDB
connectDB();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:3000/`);
});
