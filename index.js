if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

//new
// const sqlPool = require('./db'); // Import the pool from db.js

// place it after express.js
// sqlPool.connect()
//   .then(() => {
//     console.log('Connected to SQL Server!');
//   })
//   .catch(err => console.error('Error connecting to SQL Server:', err));

// app.set('sqlPool', sqlPool);

// require the controllers
// const userController = require('./controllers/userController');
const programController = require('./controllers/programController');

// const initializePassport = require('./passport-config');
// initializePassport(passport, userController.getUserByEmail, userController.getUserById);

const app = express();

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8888;

// set up the routes
const divisionRouter = require('./routes/divisionRouter');
const groupRouter = require('./routes/groupRouter');
const programTypeRouter = require('./routes/programTypeRouter');
const programRouter = require('./routes/programRouter');
const serviceStreamRouter = require('./routes/serviceStreamRouter');
const serviceTypeRouter = require('./routes/serviceTypeRouter');
const siteRouter = require('./routes/siteRouter');
const userRouter = require('./routes/userRouter');

const db = require("./models");

// to use ejs syntax, tell the server we're using ejs
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(methodOverride('_method'));

// GET home page
db.sequelize.sync();

// cors
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// handle route requests
app.use('/division', divisionRouter);
app.use('/group', groupRouter);
app.use('/programtype', programTypeRouter);
app.use('/program', programRouter);
app.use('/servicestream', serviceStreamRouter);
app.use('/servicetype', serviceTypeRouter);
app.use('/site', siteRouter);
app.use('/', userRouter);

app.listen(port, () => {
    console.log(`The app is listening on port ${port}!`)
});

module.exports = db;