// link to program type model
const { ProgramType, ServiceType } = require('../models');

// get all program types
const getAllProgramTypes = async (req, res) => {
    await ProgramType.findAll().then(async (programTypes) => {
        const serviceTypes = []
        for (let i=0; i < programTypes.length; i++) {
            await ServiceType.findOne({
                where: {
                    "ser_type_id": programTypes[i]['ser_type_id']
                }
            }).then((serviceType) => {
                serviceTypes.push({
                    prgm_type_id: programTypes[i]['prgm_type_id'],
                    ser_type: serviceType['ser_type']
                });
            });
        }
        return res.send([programTypes, serviceTypes]);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a program type based on id
const getProgramTypeByID = async (req, res) => {
    // search for v in the database via ID
    await ProgramType.findOne({
        where: {
            "prgm_type_id": req.params.id
        }
    }).then(async (programType) => {
        if (programType) {
            let ser_type;
            await ServiceType.findOne({
                where: {
                    "ser_type_id": programType['ser_type_id']
                }
            }).then((serviceType) => {
                ser_type = serviceType['ser_type'];
            })
            return res.send([programType, ser_type]); // send back the program type details
        } else {
            return res.send([]);
        }
    });
}

// add a program type (POST)
const createProgramType = async (req, res) => {
    // search for the previous last entry in the program type table
    const prevProgramType = await ProgramType.findAll({
        limit: 1,
        order: [['prgm_type_id', 'DESC']]
    });

    // get data sent from the frontend
    const { prgm_type, ser_type, pgm_type_status } = req.body;
    // increment id by 1
    const prgm_type_id = prevProgramType[0].prgm_type_id + 1;

    // find a service type and save its id
    const serviceType = await ServiceType.findOne({
        where: {
            "ser_type": ser_type
        }
    })
    const ser_type_id = serviceType['ser_type_id'];

    // create a new program type based on the data
    const newProgramType = await ProgramType.create({prgm_type_id, prgm_type, ser_type_id, pgm_type_status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if program type was succesfully created
    if (newProgramType) {
        ProgramType.findAll().then((programTypes) => {
            return res.send(programTypes);
        }).catch((err) => {
            throw err;
        }) // return all program types to browser to check that the new program type was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a program type (POST)
const editProgramType = async (req, res) => {
    // get the data sent from the frontend
    const { prgm_type_id, prgm_type, ser_type, pgm_type_status } = req.body;

    // find a service type
    const serviceType = await ServiceType.findOne({
        where: {
            "ser_type": ser_type
        }
    })

    // save the program type info
    const programTypeInfo = {
        prgm_type_id: prgm_type_id,
        prgm_type: prgm_type,
        ser_type_id: serviceType['ser_type_id'],
        prgm_type_status: pgm_type_status
    };

    // create a new program type based on the info and save it to the database
    const updatedProgramType = await ProgramType.update(programTypeInfo, {
        where: {
            "prgm_type_id": prgm_type_id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if program type was succesfully updated
    if (updatedProgramType) {
        ProgramType.findAll().then((programTypes) => {
            res.send(programTypes);
        }).catch((err) => {
            throw err;
        }) // return all program types to browser to check that the program type was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a program type (DELETE)
const deleteProgramType = async (req, res) => {
    try {
        await ProgramType.destroy({
            where: {
                prgm_type_id: req.params.id
            }
        });
        return res.send("Program type successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

module.exports = {
    getAllProgramTypes, getProgramTypeByID, createProgramType, editProgramType, deleteProgramType
}