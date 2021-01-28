const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Role = sequelize.define('Role', {
    Id_Role: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Role;