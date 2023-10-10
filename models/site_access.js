module.exports = (sequelize, DataTypes) => {
    const SiteAccess = sequelize.define("site_access", {
        "acc_id": {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "site_id" : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        "accessibility" : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        "create_date" : {
            type: DataTypes.DATE,
            allowNull: true,
        },
        "created_by" : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        "modify_date" : {
            type: DataTypes.DATE,
            allowNull: true,
        },
        "modified_by" : {
            type: DataTypes.STRING,
            allowNull: true,
        }

    }, {
        schema: 'dbo',
        timestamps: false,
        freezeTableName: true
    });

    return SiteAccess;
}