const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Magazyn = sequelize.define('Magazyn', {
    Id_Magazyn: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Adres: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isAdress(value) {
                const pattern = /((ul\.)|(al\.))\s(.+)\s(\d+[a-zA-Z]?[\/-]?\d*[a-zA-Z]?[\/-]?\d*)/;
                if (!pattern.test(value) && !value.notEmpty) {
                    throw new Error('Pole powinno zawierać adres w formacie np. ul. Gorka 14C');
                }
            }
        }
    },
    Nazwa: {
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
    }
});

module.exports = Magazyn;