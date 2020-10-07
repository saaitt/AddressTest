'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Houses', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            area: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            latitude: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            longitude: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            rent: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            mortgage: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Houses');
    }
};