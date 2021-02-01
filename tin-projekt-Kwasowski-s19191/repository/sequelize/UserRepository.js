const User = require("../../model/sequelize/User");
const Role = require('../../model/sequelize/Role');
const authUtil = require('../../util/authUtils');

exports.findByEmail = (email) => {
    return User.findOne({
        where: {Email: email},
            include: [{
                model: Role,
                as: 'role'
            }]
    });
};

exports.createUser = (newUserData) => {
    const passHash = authUtil.hashPassword(newUserData.Password);
    return User.create({
        Role_Id_Role: 1,
        Name: newUserData.Name,
        Surname: newUserData.Surname,
        Email: newUserData.Email,
        Password: passHash
    });
};