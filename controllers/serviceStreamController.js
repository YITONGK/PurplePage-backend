// link to service stream model
const { ServiceStream } = require('../models');

// get all service streams
const getAllServiceStreams = async (req, res) => {
    await ServiceStream.findAll().then((serviceStreams) => {
        return res.send(serviceStreams);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a service stream based on id
const getServiceStreamByID = async (req, res) => {
    // search for service stream in the database via ID
    await ServiceStream.findOne({
        where: {
            "ser_stream_id": req.params.id
        }
    }).then((serviceStream) => {
        if (serviceStream) {
            return res.send(serviceStream); // send back the service stream details
        } else {
            return res.send([]);
        }
    });
}

// add a service stream (POST)
const createServiceStream = async (req, res) => {
    // search for the previous last entry in the service stream table
    const prevServiceStream = await ServiceStream.findAll({
        limit: 1,
        order: [['ser_stream_id', 'DESC']]
    });

    // get data sent from the frontend
    const { ser_stream, status } = req.body;
    // increment id by 1
    const ser_stream_id = prevServiceStream[0].ser_stream_id + 1;

    // create a new service stream
    const newServiceStream = await ServiceStream.create({ser_stream_id, ser_stream, status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if service stream was successfully created
    if (newServiceStream) {
        ServiceStream.findAll().then((serviceStreams) => {
            return res.send(serviceStreams);
        }).catch((err) => {
            throw err;
        }) // return all service streams to browser to check that the new service stream was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a service stream (POST)
const editServiceStream = async (req, res) => {
    // get the data sent from the frontend
    const { ser_stream_id, ser_stream, status } = req.body;

    // save the service stream info
    const serviceStreamInfo = {
        ser_stream_id: ser_stream_id,
        ser_stream: ser_stream,
        status: status
    };

    // create a new service stream based on the info and save it to the database
    const updatedServiceStream = await ServiceStream.update(serviceStreamInfo, {
        where: {
            "ser_stream_id": ser_stream_id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if service stream was successfully updated
    if (updatedServiceStream) {
        ServiceStream.findAll().then((serviceStreams) => {
            res.send(serviceStreams);
        }).catch((err) => {
            throw err;
        }) // return all service streams to browser to check that the service stream was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a service stream (DELETE)
const deleteServiceStream = async (req, res) => {
    try {
        await ServiceStream.destroy({
            where: {
                ser_stream_id: req.params.id
            }
        });
        return res.send("Service stream successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

module.exports = {
    getAllServiceStreams, getServiceStreamByID, createServiceStream, editServiceStream, deleteServiceStream
}