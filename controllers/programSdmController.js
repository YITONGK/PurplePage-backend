// link to program model
const {program_sdm} = require('../models');

// get all programs Sdm
const getAllProgramSdm = async (req, res) => {
    await program_sdm.findAll().then((programSdm) => {
        return res.send(programSdm);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

module.exports = {
    getAllProgramSdm
}