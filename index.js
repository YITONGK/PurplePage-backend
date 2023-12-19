if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');


console.log('Starting Server--');

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
    origin: ['http://localhost:3000', 'http://purplepage.wernmachine.art', 'https://purplepage.wernmachine.art', 'https://purplepages.vt.uniting.org', 'http://purplepages.vt.uniting.org'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Middleware for token validation
app.use((req, res, next) => {

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; //Bre

    if (!token) {
        console.log("Token Missing");
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    else {
        // Create a JWKS client instance pointing to the JWKS endpoint
        const jwksUri = 'https://login.microsoftonline.com/ea913fd5-8fd8-47c7-8f3f-8117e1a387dc/discovery/keys?appid=788cf6e0-220f-4228-a961-67e18d97e10f';
        const client = jwksClient({ jwksUri });

        // Function to get the public key based on the token's header
        const getKey = (header, callback) => {
            client.getSigningKey(header.kid, (err, key) => {
                if (err) {
                    callback(err);
                } else {
                    // console.log(key);
                    const signingKey = key.publicKey || key.rsaPublicKey;
                    // console.log("Public Key: " + signingKey);
                    callback(null, signingKey);
                }
            });
        };

        // Verify the MSAL token
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decodedToken) => {
            if (err) {
                console.error('Token validation failed:', err);
                return res.status(401).send('Unauthorized - Token Invalid');
                // Handle the invalid token case
            } else {
                // Token is valid, and decodedToken contains the decoded claims
                console.log('Token is valid. Decoded:', decodedToken);
                next();
                // Proceed with further logic
            }
        });
    }


});

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