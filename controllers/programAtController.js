// link to program model
const {program_at} = require('../models');

// get all programs At
const getAllProgramAt = async (req, res) => {
    await program_at.findAll().then((programAt) => {
        return res.send(programAt);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

module.exports = {
    getAllProgramAt
}