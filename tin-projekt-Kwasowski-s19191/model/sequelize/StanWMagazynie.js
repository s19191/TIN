const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const StanWMagazynie = sequelize.define('StanWMagazynie', {
    Id_StanWMagazynie: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Ksiazka_Id_Ksiazka: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Magazyn_Id_Magazyn: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    IloscNaStanie: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CenaHurtowa: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    MinimalnaIloscDoCenyHurtowej: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    CenaDetaliczna: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = StanWMagazynie;