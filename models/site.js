module.exports = (sequelize, DataTypes) => {
    const Site = sequelize.define("Site", {
        "id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "site_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "site_contact_name": {
            type: DataTypes.STRING
        },
        "uniting_cont": {
            type: DataTypes.STRING
        },
        "site_contact_nbr": {
            type: DataTypes.STRING
        },
        "site_mgr_cont_nbr": {
            type: DataTypes.STRING
        },
        "street_nbr": {
            type: DataTypes.STRING
        },
        "street_name": {
            type: DataTypes.STRING
        },
        "suburb": {
            type: DataTypes.STRING
        },
        "state": {
            type: DataTypes.STRING
        },
        "postcode": {
            type: DataTypes.INTEGER
        },
        "lga": {
            type: DataTypes.STRING
        },
        "dffh_area": {
            type: DataTypes.STRING
        },
        "status": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "create_date": {
            type: DataTypes.DATE
        },
        "created_by": {
            type: DataTypes.STRING
        },
        "modify_date": {
            type: DataTypes.DATE
        },
        "modified_by": {
            type: DataTypes.STRING
        },
        "address" : {
            type: DataTypes.STRING
        },
        "lat": {
            type: DataTypes.INTEGER
        },
        "lng": {
            type: DataTypes.INTEGER
        },
    }, {
        // schema: 'purplepage',
        timestamps: false,
        freezeTableName: true
    });

    return Site;
}