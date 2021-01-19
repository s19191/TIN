const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-projekt-s19191', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;