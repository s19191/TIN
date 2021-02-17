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
                msg: "notEmpty"
            }
        }
    },
    Magazyn_Id_Magazyn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
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
                msg: "notEmpty"
            },
            isInt: {
                msg: "isNumber"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('isNumberPlus');
                }
            }
        }
    },
    CenaHurtowa: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        validate: {
            isDecimal: {
                msg: "isNumber"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('isNumberPlus');
                }
            }
        }
    },
    MinimalnaIloscDoCenyHurtowej: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isInt: {
                msg: "isNumber"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('isNumberPlus');
                }
            }
        }
    },
    CenaDetaliczna: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDecimal: {
                msg: "isNumber"
            },
            isNumberPlus(value) {
                if (value < 0) {
                    throw new Error('isNumberPlus');
                }
            }
        }
    }
});

module.exports = StanWMagazynie;