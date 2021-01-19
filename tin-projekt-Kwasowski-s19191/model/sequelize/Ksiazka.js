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
        allowNull: false,
        // validate: {
        //     notEmpty: {
        //         msg: "Pole jest wymagane"
        //     },
        //     len: {
        //         args: [2,60],
        //         msg: "Pole powinno zawierać od 2 do 60 znaków"
        //     }
        // }
    },
    Autor: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    DataWydania: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)"
            },
            isSameOrBefore(value){
                const today = new Date();
                const date = new Date(value);
                if (date > today) {
                    throw new Error("Data nie może być z przyszłości");
                }
            }
        }
    }
});

module.exports = Ksiazka;