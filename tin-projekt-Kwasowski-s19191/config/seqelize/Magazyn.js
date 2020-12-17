const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Magazyn = sequelize.define('Magazyn', {
    Id_Magazyn: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Adres: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Nazwa: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Magazyn;