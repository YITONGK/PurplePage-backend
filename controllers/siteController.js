// link to site model
const { Site } = require('../models');

// get all sites
const getAllSites = async (req, res) => {
    await Site.findAll().then((sites) => {
        return res.send(sites);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

// get a site based on id
const getSiteByID = async (req, res) => {
    // search for site in the database via ID
    await Site.findOne({
        where: {
            "id": req.params.id
        }
    }).then((site) => {
        if (site) {
            return res.send(site); // send back the site details
        } else {
            return res.send([]);
        }
    });
}

// add a site (POST)
const createSite = async (req, res) => {
    // search for the previous last entry in the site table
    const prevSite = await Site.findAll({
        limit: 1,
        order: [['id', 'DESC']]
    });

    // get data sent from the frontend
    const { street_nbr, street_name, suburb, state, postcode, status } = req.body;
    // increment id by 1
    const id = prevSite[0].id + 1;
    // set site id based on id
    const site_id = 'UVT-Site-00' + id;

    // create a new site based on the data
    const newSite = await Site.create({id, site_id, street_nbr, street_name, suburb, state, postcode, status}).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if site was successfully created
    if (newSite) {
        Site.findAll().then((sites) => {
            return res.send(sites);
        }).catch((err) => {
            throw err;
        }) // return all sites to browser to check that the new site was inserted
    } else {
        return res.send("Database insert failed");
    }
}

// update a site (POST)
const editSite = async (req, res) => {
    // get the data sent from the frontend
    const { id, site_id, street_nbr, street_name, suburb, state, postcode, status } = req.body;

    // save the site info
    const siteInfo = {
        id: id,
        site_id: site_id,
        street_nbr: street_nbr,
        street_name: street_name,
        suburb: suburb,
        state: state,
        postcode: postcode,
        status: status
    };

    // create a new site based on the info and save it to the database
    const updatedSite = await Site.update(siteInfo, {
        where: {
            "id": id
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    // if site was successfully updated
    if (updatedSite) {
        Site.findAll().then((sites) => {
            res.send(sites);
        }).catch((err) => {
            throw err;
        }) // return all sites to browser to check that the site was updated
    } else {
        return res.send("Database update failed");
    }
}

// delete a site (DELETE)
const deleteSite = async (req, res) => {
    try {
        await Site.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.send("Site successfully deleted");
    } catch (err) {
        res.status(400);
        return res.send("Database delete failed");
    }
}

module.exports = {
    getAllSites, getSiteByID, createSite, editSite, deleteSite
}