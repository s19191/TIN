const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const StanWMagazynie = sequelize.define('StanWMagazynie', {
    Ksiazka_Id_Ksiazka: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Magazyn_Id_Magazyn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
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