const User = require("../../model/sequelize/User");
const Role = require('../../model/sequelize/Role');

exports.findByEmail = (email) => {
    return User.findOne({
        where: {Email: email},
            include: [{
                model: Role,
                as: 'role'
            }]
    });
}