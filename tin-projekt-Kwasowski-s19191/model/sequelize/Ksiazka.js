const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');


const Ksiazka = sequelize.define('Ksiazka', {
    Id_Ksiazka: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    User_Id_User: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Tytul: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,60],
                msg: "len_2_60"
            }
        }
    },
    Autor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,60],
                msg: "len_2_60"
            }
        }
    },
    DataWydania: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "isDate"
            },
            isSameOrBefore(value){
                const today = new Date();
                const date = new Date(value);
                if (date > today) {
                    throw new Error("isNotFutureDate");
                }
            }
        }
    }
});

module.exports = Ksiazka;