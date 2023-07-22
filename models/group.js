module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("Group", {
        "group_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "group_name": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "eo": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "division_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
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
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Group;
}