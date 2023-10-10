module.exports = (sequelize, DataTypes) => {
    const ProgramAt = sequelize.define("program_at", {
        "at_id": {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "title" : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        "at" : {
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

    return ProgramAt;
}