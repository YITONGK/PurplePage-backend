const express = require('express');

// routers
const groupRouter = express.Router();

// require the controllers
const groupController = require('../controllers/groupController.js');

// handle the GET requests to get all groups
groupRouter.get('/', groupController.getAllGroups);

// handle the GET request to get one group
groupRouter.get('/:id', groupController.getGroupByID);

// handle POST requests to add one group
groupRouter.post('/', groupController.createGroup);

// handle POST requests to update a group
groupRouter.post('/edit', groupController.editGroup);

// handle DELETE requests to delete a group
groupRouter.delete('/:id', groupController.deleteGroup);

// export the routers
module.exports = groupRouter
