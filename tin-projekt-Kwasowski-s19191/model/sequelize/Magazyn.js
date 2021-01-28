const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Magazyn = sequelize.define('Magazyn', {
    Id_Magazyn: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    User_Id_User: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Adres: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            is: {
                args: /((ul\.)|(al\.))\s(.+)\s(\d+[a-zA-Z]?[\/-]?\d*[a-zA-Z]?[\/-]?\d*)/,
                msg: "Pole powinno zawierać adres w formacie np. ul. Gorka 14C"
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