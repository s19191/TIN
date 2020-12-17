const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Ksiazka = sequelize.define('Ksiazka', {
    Id_Ksiazka: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Tytul: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DataWydania: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Ksiazka;