// link to group model
const { Group, Division } = require('../models')

// get all groups
const getAllGroups = async (req, res) => {
    await Group.findAll().then(async (groups) => {
        const divisions = []
        for (let i=0; i < groups.length; i++) {
            await Division.findOne({
                where: {
                    "division_id": groups[i]['division_id']
                }
            }).then((division) => {
                divisions.push({
                    division_id: groups[i]['division_id'],
                    division_name: division['division_name']
                });
            });
        }
        return res.send([groups, divisions]);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a group based on id
const getGroupByID = async (req, res) => {
    // search for group in the database via ID
    await Group.findOne({
        where: {
            "group_id": req.params.id
        }
    }).then(async (group) => {
        if (group) {
            let division_name;
            await Division.findOne({
                where: {
                    "division_id": group['division_id']
                }
            }).then((division) => {
                division_name = division['division_name'];
            })
            return res.send([group, division_name]); // send back the program type details
        } else {
            return res.send([]);
        }
    });
}

// add a group (POST)
const createGroup = async (req, res) => {
    // search for the previous last entry in the group table
    const prevGroup = await Group.findAll({
        limit: 1,
        order: [['group_id', 'DESC']]
    });

    // get the data sent from the frontend
    const { group_name, eo, division_name, status } = req.body;
    // increment id by 1
    const group_id = prevGroup[0].group_id + 1;

    // search for a division and save its id
    const div = await Division.findOne({
        where: {
            "division_name": division_name
        }
    })
    const division_id = div['division_id'];

    // create a new group based on the data
    const newGroup = await Group.create({group_id, group_name, eo, division_id, status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if group was successfully created
    if (newGroup) {
        Group.findAll().then((groups) => {
            return res.send(groups);
        }).catch((err) => {
            throw err;
        }) // return all groups to browser to check that the new group was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a group (POST)
const editGroup = async (req, res) => {
    // get the data sent from the frontend
    const { group_id, group_name, eo, division_name, status } = req.body;

    // search for a division
    const div = await Division.findOne({
        where: {
            "division_name": division_name
        }
    })

    // save the group info
    const groupInfo = {
        group_id: group_id,
        group_name: group_name,
        eo: eo,
        division_id: div['division_id'],
        status: status
    };

    // create a new group based on the info and save it to the database
    const updatedGroup = await Group.update(groupInfo, {
        where: {
            "group_id": group_id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if group was successfully updated
    if (updatedGroup) {
        Group.findAll().then((groups) => {
            res.send(groups);
        }).catch((err) => {
            throw err;
        }) // return all groups to browser to check that the group was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a group (DELETE)
const deleteGroup = async (req, res) => {
    try {
        await Group.destroy({
            where: {
                group_id: req.params.id
            }
        });
        return res.send("Group successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

module.exports = {
    getAllGroups, getGroupByID, createGroup, editGroup, deleteGroup
}