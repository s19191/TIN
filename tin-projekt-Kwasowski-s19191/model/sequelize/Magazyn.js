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
    Nazwa: {
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
    Adres: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            is: {
                args: /((ul\.)|(al\.))\s(.+)\s(\d+[a-zA-Z]?[\/-]?\d*[a-zA-Z]?[\/-]?\d*)/,
                msg: "isCorrectAdress"
            }
        }
    }
});

module.exports = Magazyn;