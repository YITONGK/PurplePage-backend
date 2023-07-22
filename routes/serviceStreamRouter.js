const express = require('express');

// routers
const serviceStreamRouter = express.Router();

// require the controllers
const serviceStreamController = require('../controllers/serviceStreamController.js');

// handle the GET requests to get all service streams
serviceStreamRouter.get('/', serviceStreamController.getAllServiceStreams);

// handle the GET request to get one service stream
serviceStreamRouter.get('/:id', serviceStreamController.getServiceStreamByID);

// handle POST requests to add one service stream
serviceStreamRouter.post('/', serviceStreamController.createServiceStream);

// handle POST requests to update a service stream
serviceStreamRouter.post('/edit', serviceStreamController.editServiceStream);

// handle DELETE requests to delete a service stream
serviceStreamRouter.delete('/:id', serviceStreamController.deleteServiceStream);

// export the routers
module.exports = serviceStreamRouter