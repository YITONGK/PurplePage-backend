const express = require('express');

// routers
const programTypeRouter = express.Router();

// require the controllers
const programTypeController = require('../controllers/programTypeController.js');

// handle the GET requests to get all program types
programTypeRouter.get('/', programTypeController.getAllProgramTypes);

// handle the GET request to get one program type
programTypeRouter.get('/:id', programTypeController.getProgramTypeByID);

// handle POST requests to add one program type
programTypeRouter.post('/', programTypeController.createProgramType);

// handle POST requests to update a program type
programTypeRouter.post('/edit', programTypeController.editProgramType);

// handle DELETE requests to delete a program type
programTypeRouter.delete('/:id', programTypeController.deleteProgramType);

// export the routers
module.exports = programTypeRouter