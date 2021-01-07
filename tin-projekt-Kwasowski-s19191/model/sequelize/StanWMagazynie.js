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
            },
            isNumber: {
                msg: "Pole powinno być liczbą"
            },
            min: {
                args: 0,
                msg: "Pole powinno być liczbą dodatnią"
            }
        }
    },
    CenaHurtowa: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        validate: {
            isNumber(value) {
                if (!value.isDecimal && value.notEmpty) {
                    throw new Error('Pole powinno być liczbą');
                }
            },
            min: {
                args: 0,
                msg: "Pole powinno być liczbą dodatnią"
            }
        }
    },
    MinimalnaIloscDoCenyHurtowej: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumber(value) {
                if (!value.isNumeric && value.notEmpty) {
                    throw new Error('Pole powinno być liczbą');
                }
            },
            min: {
                args: 0,
                msg: "Pole powinno być liczbą dodatnią"
            }
        }
    },
    CenaDetaliczna: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDecimal: {
                msg: "Pole powinno być liczbą"
            },
            min: {
                args: 0,
                msg: "Pole powinno być liczbą dodatnią"
            }
        }
    }
});

module.exports = StanWMagazynie;