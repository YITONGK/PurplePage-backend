module.exports = (sequelize, DataTypes) => {
    const ProgramType = sequelize.define("ProgramType", {
        "prgm_type_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "prgm_type": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "ser_type_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "accre_id": {
            type: DataTypes.STRING
        },
        "pgm_type_status": {
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

    return ProgramType;
}