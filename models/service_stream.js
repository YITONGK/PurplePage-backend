module.exports = (sequelize, DataTypes) => {
    const ServiceStream = sequelize.define("ServiceStream", {
        "ser_stream_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "ser_stream": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
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

    return ServiceStream;
}