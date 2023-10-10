// link to program model
const {site_access} = require('../models');

// get all site access
const getAllSiteAccess = async (req, res) => {
    await site_access.findAll().then((siteAccess) => {
        return res.send(siteAccess);
    }).catch((err) => {
        throw err;
    }) // send list to browser
}

module.exports = {
    getAllSiteAccess
}