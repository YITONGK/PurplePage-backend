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


console.log('Starting Server--');

// const Connection = require('tedious').Connection;

// const config_2 = {
//   server: 'VT-PRD-SQLTEST1',
//   authentication: {
//     type: 'default',
//     options: {
//       userName: 'adrian.teo@VT.UNITING.ORG', 
//       integratedSecurity: true
//     }
//   },
//   options: {
//     database: 'ServiceDirectory_UVT_TEST',
//     encrypt: true,
//     trustServerCertificate: true,
//     port: 1433
//   }
// };

// const connection = new Connection(config_2);

// connection.connect();

// connection.on('connect', function(err) {
//     if (err) {
//       console.log("Connection Error", err);
//     } else {
//       console.log("Connected!");
//     }
// });

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
const programAtRouter = require('./routes/programAtRouter');
const programSdmRouter = require('./routes/programSdmRouter');
const serviceStreamRouter = require('./routes/serviceStreamRouter');
const serviceTypeRouter = require('./routes/serviceTypeRouter');
const siteRouter = require('./routes/siteRouter');
const siteAccessRouter = require('./routes/siteAccessRouter');
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


app.use(methodOverride('_method'));

// GET home page
db.sequelize.sync();

// cors
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://purplepage.wernmachine.art', 'https://purplepage.wernmachine.art', 'https://purplepages.vt.uniting.org, http://purplepages.vt.uniting.org'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// handle route requests
app.use('/division', divisionRouter);
app.use('/group', groupRouter);
app.use('/programtype', programTypeRouter);
app.use('/program', programRouter);
app.use('/programat', programAtRouter);
app.use('/programsdm', programSdmRouter);
app.use('/servicestream', serviceStreamRouter);
app.use('/servicetype', serviceTypeRouter);
app.use('/site', siteRouter);
app.use('/siteaccess', siteAccessRouter);
app.use('/', userRouter);

app.listen(port, () => {
    console.log(`The app is listening on port ${port}!`)
});

module.exports = db;