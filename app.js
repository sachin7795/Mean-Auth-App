const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database
mongoose.connect(config.database);

// On connect
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');

// port number
const port = process.env.PORT || 8080;

// cors middleware
app.use(cors());

// Static folder
app.use(express.static(path.join(__dirname, '/public')));

// body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/',(req, res) => {
    res.send('invalid changed endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen(port,() => {
    console.log('server started at ' + port);
})
