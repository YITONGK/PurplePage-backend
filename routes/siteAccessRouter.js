const express = require('express');

// routers
const siteAccessRouter = express.Router();

// require the controllers
const siteAccessController = require('../controllers/siteAccessController');

// handle the GET requests to get all programs
siteAccessRouter.get('/', siteAccessController.getAllSiteAccess);


// export the routers
module.exports = siteAccessRouter