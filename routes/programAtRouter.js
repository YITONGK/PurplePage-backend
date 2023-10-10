const express = require('express');

// routers
const programAtRouter = express.Router();

// require the controllers
const programAtController = require('../controllers/programAtController');

// handle the GET requests to get all programs
programAtRouter.get('/', programAtController.getAllProgramAt);


// export the routers
module.exports = programAtRouter