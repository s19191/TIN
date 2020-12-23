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
        // validate: {
        //     notEmpty: {
        //         msg: "Pole jest wymagane"
        //     },
        //     len: {
        //         args: [2,60],
        //         msg: "Pole powinno zawierać od 2 do 60 znaków"
        //     },
        // }
    },
    Nazwa: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     notEmpty: {
        //         msg: "Pole jest wymagane"
        //     },
        //     len: {
        //         args: [2,60],
        //         msg: "Pole powinno zawierać od 2 do 60 znaków"
        //     },
        // }
    }
});

module.exports = Magazyn;