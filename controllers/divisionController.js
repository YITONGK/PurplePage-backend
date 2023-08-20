// link to division model
const { Division } = require('../models');


// get all divisions
const getAllDivisions = async (req, res) => {
    await Division.findAll().then((divisions) => {
        return res.send(divisions);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a division based on id
const getDivisionByID = async (req, res) => {
    // search for division in the database via ID
    await Division.findOne({
        where: {
            "division_id": req.params.id
        }
    }).then((division) => {
        if (division) {
            return res.send(division); // send back the division details
        } else {
            return res.send([]);
        }
    });
}

// add a division (POST)
const createDivision = async (req, res) => {
    // search for the previous last entry in the division table
    const prevDivision = await Division.findAll({
        limit: 1,
        order: [['division_id', 'DESC']]
    });

    // get the data sent from the frontend
    const { division_name, gm, status } = req.body;
    // increment id by 1
    const division_id = prevDivision[0].division_id + 1;

    // create a new division based on the data
    const newDivision = await Division.create({division_id, division_name, gm, status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if division was successfully created
    if (newDivision) {
        Division.findAll().then((divisions) => {
            return res.send(divisions);
        }).catch((err) => {
            throw err;
        }) // return all divisions to browser to check that the new division was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a division (POST)
const editDivision = async (req, res) => {
    // get the data sent from the frontend
    const { division_id, division_name, gm, status } = req.body;

    // save the division info
    const divisionInfo = {
        division_id: division_id,
        division_name: division_name,
        gm: gm,
        status: status
    };

    // create a new division based on the info and save it to the database
    const updatedDivision = await Division.update(divisionInfo, {
        where: {
            "division_id": division_id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if division was succesfully updated
    if (updatedDivision) {
        Division.findAll().then((divisions) => {
            res.send(divisions);
        }).catch((err) => {
            throw err;
        }) // return all divisions to browser to check that the division was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a division (DELETE)
const deleteDivision = async (req, res) => {
    try {
        await Division.destroy({
            where: {
                division_id: req.params.id
            }
        });
        return res.send("Division successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

module.exports = {
    getAllDivisions, getDivisionByID, createDivision, editDivision, deleteDivision
}