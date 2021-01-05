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
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Magazyn_Id_Magazyn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    IloscNaStanie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    CenaHurtowa: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        validate: {
            isInt: {
                msg: "Pole powinno być liczbą"
            }
        }
    },
    MinimalnaIloscDoCenyHurtowej: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    CenaDetaliczna: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = StanWMagazynie;