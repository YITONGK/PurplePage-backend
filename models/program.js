module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define("Program", {
        "program_id": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            primaryKey: true
        },
        "title": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "program_nme": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "service_desc": {
            type: DataTypes.STRING
        },
        "sr_group_mgr": {
            type: DataTypes.STRING
        },
        "sr_mgr": {
            type: DataTypes.STRING
        },
        "prgm_mgr": {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        "prgm_cont_no": {
            type: DataTypes.STRING
        },
        "partial_delivery": {
            type: DataTypes.STRING
        },
        "dffh_code": {
            type: DataTypes.STRING
        },
        "no_of_clients": {
            type: DataTypes.INTEGER
        },
        "fte": {
            type: DataTypes.DOUBLE
        },
        "head_count": {
            type: DataTypes.INTEGER
        },
        "service_closed": {
            type: DataTypes.STRING
        },
        "do_not_show": {
            type: DataTypes.STRING
        },
        "episode_desc": {
            type: DataTypes.STRING
        },
        "prgm_type_id": {
            type: DataTypes.INTEGER
        },
        "group_id": {
            type: DataTypes.INTEGER
        },
        "site_id": {
            type: DataTypes.STRING
        },
        "contract_id": {
            type: DataTypes.STRING
        },
        "cost_centre": {
            type: DataTypes.STRING
        },
        "riskman_id": {
            type: DataTypes.INTEGER
        },
        "prgm_status": {
            type: DataTypes.STRING
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
        "qic": {
            type: DataTypes.STRING
        },
        "nsmhs": {
            type: DataTypes.STRING
        },
        "hss": {
            type: DataTypes.STRING
        },
        "nsds": {
            type: DataTypes.STRING
        },
        "aacqa": {
            type: DataTypes.STRING
        },
        "ndis": {
            type: DataTypes.STRING
        },
        "early_learn": {
            type: DataTypes.STRING
        },
        "headspace": {
            type: DataTypes.STRING
        },
        "rto": {
            type: DataTypes.STRING
        },
        "lifeline": {
            type: DataTypes.STRING
        },
        "last_update_sp": {
            type: DataTypes.STRING
        },
        "update_comments": {
            type: DataTypes.STRING
        },
    }, {
        schema: 'dbo',
        timestamps: false,
        freezeTableName: true
    });

    return Program;
}