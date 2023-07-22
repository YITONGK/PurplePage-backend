const express = require('express');

// routers
const serviceTypeRouter = express.Router();

// require the controllers
const serviceTypeController = require('../controllers/serviceTypeController.js');

// handle the GET requests to get all service types
serviceTypeRouter.get('/', serviceTypeController.getAllServiceTypes);

// handle the GET request to get one service type
serviceTypeRouter.get('/:id', serviceTypeController.getServiceTypeByID);

// handle POST requests to add one service type
serviceTypeRouter.post('/', serviceTypeController.createServiceType);

// handle POST requests to update a service type
serviceTypeRouter.post('/edit', serviceTypeController.editServiceType);

// handle DELETE requests to delete a service type
serviceTypeRouter.delete('/:id', serviceTypeController.deleteServiceType);

// export the routers
module.exports = serviceTypeRouter