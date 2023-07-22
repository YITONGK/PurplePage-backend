const express = require('express');

// routers
const siteRouter = express.Router();

// require the controllers
const siteController = require('../controllers/siteController.js');

// handle the GET requests to get all sites
siteRouter.get('/', siteController.getAllSites);

// handle the GET request to get one site
siteRouter.get('/:id', siteController.getSiteByID);

// handle POST requests to add one site
siteRouter.post('/', siteController.createSite);

// handle POST requests to update a site
siteRouter.post('/edit', siteController.editSite);

// handle DELETE requests to delete a site
siteRouter.delete('/:id', siteController.deleteSite);

// export the routers
module.exports = siteRouter