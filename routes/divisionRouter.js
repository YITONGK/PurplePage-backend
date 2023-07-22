const express = require('express');

// routers
const divisionRouter = express.Router();

// require the controllers
const divisionController = require('../controllers/divisionController.js');

// handle the GET requests to get all divisions
divisionRouter.get('/', divisionController.getAllDivisions);

// handle the GET request to get one division
divisionRouter.get('/:id', divisionController.getDivisionByID);

// handle POST requests to add one division
divisionRouter.post('/', divisionController.createDivision);

// handle POST requests to update a division
divisionRouter.post('/edit', divisionController.editDivision);

// handle DELETE requests to delete a division
divisionRouter.delete('/:id', divisionController.deleteDivision);

// export the routers
module.exports = divisionRouter