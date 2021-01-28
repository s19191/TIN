const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const User = sequelize.define('User', {
    Id_User: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Role_Id_Role: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;