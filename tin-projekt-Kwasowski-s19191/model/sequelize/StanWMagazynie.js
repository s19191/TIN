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
            isNumeric: {
                msg: "Pole powinno być liczbą"
            }
        }
    },
    CenaHurtowa: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        validate: {
            isNumberPlus(value){
                const today = new Date();
                const date = new Date(value);
                if (date > today) {
                    throw new Error("Data nie może być z przyszłości");
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
            isNumeric: {
                msg: "Pole powinno być liczbą"
            }
        }
    }
});

module.exports = StanWMagazynie;