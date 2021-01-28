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
    User_Id_User: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    IloscNaStanie: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole powinno być liczbą"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('Pole powinno być liczbą dodatnią');
                }
            }
        }
    },
    CenaHurtowa: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        validate: {
            isDecimal: {
                msg: "Pole powinno być liczbą"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('Pole powinno być liczbą dodatnią');
                }
            }
        }
    },
    MinimalnaIloscDoCenyHurtowej: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "Pole powinno być liczbą"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('Pole powinno być liczbą dodatnią');
                }
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
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('Pole powinno być liczbą dodatnią');
                }
            }
        }
    }
});

module.exports = StanWMagazynie;