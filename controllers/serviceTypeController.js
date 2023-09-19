// link to service type model
const { ser_type, ser_stream } = require('../models');

// get all service types
const getAllServiceTypes = async (req, res) => {
    await ser_type.findAll().then(async (serviceTypes) => {
        const serviceStreams = []
        for (let i=0; i < serviceTypes.length; i++) {
            await ser_stream.findOne({
                where: {
                    "ser_stream_id": serviceTypes[i]['ser_stream_id']
                }
            }).then((serviceStream) => {
                // serviceStreams.push(serviceStream);
                serviceStreams.push({
                    ser_type_id: serviceTypes[i]['ser_type_id'],
                    // ser_stream: serviceStream['ser_stream'] // need to fix
                });
            });
        }
        return res.send([serviceTypes, serviceStreams]);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a service type based on id
const getServiceTypeByID = async (req, res) => {
    // search for service type in the database via ID
    await ser_type.findOne({
        where: {
            "ser_type_id": req.params.id
        }
    }).then(async (serviceType) => {
        if (serviceType) {
            let ser_stream;
            await ser_stream.findOne({
                where: {
                    "ser_stream_id": serviceType['ser_stream_id']
                }
            }).then((serviceStream) => {
                ser_stream = serviceStream['ser_stream'];
            })
            return res.send([serviceType, ser_stream]); // send back the program type details
        } else {
            return res.send([]);
        }
    });
}

// add a service type (POST)
const createServiceType = async (req, res) => {
    // search for the previous last entry in the service type table
    const prevServiceType = await ser_type.findAll({
        limit: 1,
        order: [['ser_type_id', 'DESC']]
    });

    // get data sent from the frontend
    const { ser_type, ser_stream, status } = req.body;
    // increment id by 1
    const ser_type_id = prevServiceType[0].ser_type_id + 1;

    // find a service stream and save its id
    const serviceStream = await ser_stream.findOne({
        where: {
            "ser_stream": ser_stream
        }
    })
    const ser_stream_id = serviceStream['ser_stream_id'];

    // create a new service type based on the data
    const newServiceType = await ser_type.create({ser_type_id, ser_type, ser_stream_id, status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if service type was successfully created
    if (newServiceType) {
        ser_type.findAll().then((serviceTypes) => {
            return res.send(serviceTypes);
        }).catch((err) => {
            throw err;
        }) // return all service types to browser to check that the new service type was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a service type (POST)
const editServiceType = async (req, res) => {
    // get the data sent from the frontend
    const { ser_type_id, ser_type, ser_stream, status } = req.body;

    // find a service stream
    const serviceStream = await ser_stream.findOne({
        where: {
            "ser_stream": ser_stream
        }
    })

    // save the service type info
    const serviceTypeInfo = {
        ser_type_id: ser_type_id,
        ser_type: ser_type,
        ser_stream_id: serviceStream['ser_stream_id'],
        status: status
    };

    // create a new service type based on the info and save it to the database
    const updatedServiceType = await ser_type.update(serviceTypeInfo, {
        where: {
            "ser_type_id": ser_type_id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if service type was successfully created
    if (updatedServiceType) {
        ser_type.findAll().then((serviceTypes) => {
            res.send(serviceTypes);
        }).catch((err) => {
            throw err;
        }) // return all service types to browser to check that the service type was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a service type (DELETE)
const deleteServiceType = async (req, res) => {
    try {
        await ser_type.destroy({
            where: {
                ser_type_id: req.params.id
            }
        });
        return res.send("Service type successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

module.exports = {
    getAllServiceTypes, getServiceTypeByID, createServiceType, editServiceType, deleteServiceType
}