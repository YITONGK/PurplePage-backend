const express = require('express');

// routers
const programSdmRouter = express.Router();

// require the controllers
const programSdmController = require('../controllers/programSdmController');

// handle the GET requests to get all programs
programSdmRouter.get('/', programSdmController.getAllProgramSdm);


// export the routers
module.exports = programSdmRouter