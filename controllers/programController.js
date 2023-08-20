// link to program model
const { Program, ProgramType, Group, Site } = require('../models');

// get all programs
const getAllPrograms = async (req, res) => {
    await Program.findAll().then(async (programs) => {
        // get all program types
        const programTypes = [];
        for (let i=0; i < programs.length; i++) {
            await ProgramType.findOne({
                where: {
                    "prgm_type_id": programs[i]['prgm_type_id']
                }
            }).then((programType) => {
                programTypes.push({
                    prgm_type_id: programs[i]['prgm_type_id'],
                    prgm_type: programType['prgm_type']
                });
            });
        }

        // get all groups
        const groups = [];
        for (let i=0; i < programs.length; i++) {
            await Group.findOne({
                where: {
                    "group_id": programs[i]['group_id']
                }
            }).then((group) => {
                groups.push({
                    group_id: programs[i]['group_id'],
                    group_name: group['group_name']
                });
            });
        }
        // get all sites
        const sites = [];
        for (let i=0; i < programs.length; i++) {
            await Site.findOne({
                where: {
                    "site_id": programs[i]['site_id']
                }
            }).then((site) => {
                if (site !== null) {
                    sites.push({
                        site_id: site['dataValues']['site_id']
                    });
                    // sites.push(site);
                }
            });
        }
        return res.send([programs, programTypes, groups, sites]);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a program based on id
const getProgramByID = async (req, res) => {
    // search for program in the database via ID
    await Program.findOne({
        where: {
            "program_id": req.params.id
        }
    }).then(async (program) => {
        if (program) {
            let prgm_type;
            await ProgramType.findOne({
                where: {
                    "prgm_type_id": program['prgm_type_id']
                }
            }).then((programType) => {
                prgm_type = programType['prgm_type'];
            })
            let group_name;
            await Group.findOne({
                where: {
                    "group_id": program['group_id']
                }
            }).then((group) => {
                group_name = group['group_name'];
            })
            return res.send([program, prgm_type, group_name]); // send back the program details
        } else {
            return res.send([]);
        }
    });
}

// add a program (POST)
const createProgram = async (req, res) => {
    // search for the previous last entry in the program table
    const prevProgram = await Program.findAll({
        limit: 1,
        order: [['program_id', 'DESC']]
    });

    // get data sent from the frontend
    const { program_nme, prgm_mgr, prgm_type, group_name, prgm_status } = req.body;
    // increment id by 1
    const program_id = prevProgram[0].program_id + 1;
    // set title based on program id
    const title = 'UVT-00' + program_id;

    // find a program type and save its id
    const programType = await ProgramType.findOne({
        where: {
            "prgm_type": prgm_type
        }
    })
    const prgm_type_id = programType['prgm_type_id'];

    // find a group and save its id
    const group = await Group.findOne({
        where: {
            "group_name": group_name
        }
    })
    const group_id = group['group_id'];

    // create a new program based on the data
    const newProgram = await Program.create({program_id, title, program_nme, prgm_mgr, prgm_type_id, group_id, prgm_status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if program was successfully created
    if (newProgram) {
        Program.findAll().then((programs) => {
            return res.send(programs);
        }).catch((err) => {
            throw err;
        }) // return all programs to browser to check that the new program was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a program (POST)
const editProgram = async (req, res) => {
    // get the data sent from the frontend
    const { program_id, title, program_nme, prgm_mgr, prgm_type, group_name, prgm_status } = req.body;

    // find a program type
    const programType = await ProgramType.findOne({
        where: {
            "prgm_type": prgm_type
        }
    })

    // find a group
    const group = await Group.findOne({
        where: {
            "group_name": group_name
        }
    })

    // save the program info
    const programInfo = {
        program_id: program_id,
        title: title,
        program_nme: program_nme,
        prgm_mgr: prgm_mgr,
        prgm_type_id: programType['prgm_type_id'],
        group_id: group['group_id'],
        prgm_status: prgm_status
    };

    // create a new program based on the info and save it to the database
    const updatedProgram = await Program.update(programInfo, {
        where: {
            "program_id": program_id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if program was successfully updated
    if (updatedProgram) {
        Program.findAll().then((programs) => {
            res.send(programs);
        }).catch((err) => {
            throw err;
        }) // return all programs to browser to check that the program was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a program (DELETE)
const deleteProgram = async (req, res) => {
    try {
        await Program.destroy({
            where: {
                program_id: req.params.id
            }
        });
        return res.send("Program successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

// get all related sites
const getRelatedSites = async (req, res) => {
    // find a program
    const program = await Program.findOne({
        where: {
            "program_id": req.params.id
        }
    });
    // find all program according to site
    await Program.findAll().then(async (programs) => {
        const sites = [];
        for (let i=0; i < programs.length; i++) {
            if (program.program_nme === programs[i].program_nme) {
                await Site.findOne({
                    where: {
                        "site_id": programs[i].site_id
                    }
                }).then((site) => {
                    sites.push(site);
                })
            }
        }
        return res.send(sites);
    }).catch((err) => {
        throw err;
    })
}

module.exports = {
    getAllPrograms, getProgramByID, createProgram, editProgram, deleteProgram, getRelatedSites
}