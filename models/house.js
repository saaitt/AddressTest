'use strict';
module.exports = (sequelize, DataTypes) => {
    let House = sequelize.define('House', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        area: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        rent: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mortgage: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });
    return House;
}
