const express = require('express');

// routers
const programRouter = express.Router();

// require the controllers
const programController = require('../controllers/programController.js');

// handle the GET requests to get all programs
programRouter.get('/', programController.getAllPrograms);

// handle the GET requests to get all related sites
programRouter.get('/sites/:id', programController.getRelatedSites);

// handle the GET request to get one program
programRouter.get('/:id', programController.getProgramByID);

// handle POST requests to add one program
programRouter.post('/', programController.createProgram);

// handle POST requests to update a program
programRouter.post('/edit', programController.editProgram);

// handle DELETE requests to delete a program
programRouter.delete('/:id', programController.deleteProgram);

// export the routers
module.exports = programRouter