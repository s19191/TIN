const Magazyn = require("../../model/sequelize/Magazyn");
const Ksiazka = require("../../model/sequelize/Ksiazka");
const StanWMagazynie = require("../../model/sequelize/StanWMagazynie");
const User = require('../../model/sequelize/User');
const Role = require('../../model/sequelize/Role');

exports.getMagazyny = () => {
    return Magazyn.findAll(
        {
            include: [{
                model: User,
                as: 'user',
                include: [{
                    model: Role,
                    as: 'role'
                }]
            }]
        });
};

exports.getMagazynById = (Id_Magazyn) => {
    return Magazyn.findByPk(Id_Magazyn,
        {
            include: [{
                model: StanWMagazynie,
                as: 'stanyWMagazynach',
                include: [{
                    model: Ksiazka,
                    as: 'ksiazka'
                }]
            }, {
                model: User,
                as: 'user',
                include: [{
                    model: Role,
                    as: 'role'
                }]
            }]
        });
};

exports.createMagazyn = (newMagazynData) => {
    return Magazyn.create({
        User_Id_User: newMagazynData.User_Id_User,
        Adres: newMagazynData.Adres,
        Nazwa: newMagazynData.Nazwa
    });
};

exports.updateMagazyn = (Id_Magazyn, magazynData) => {
    return Magazyn.update(magazynData, {where: {Id_Magazyn: Id_Magazyn }});
};

exports.deleteMagazyn = (Id_Magazyn) => {
    return Magazyn.destroy({
        where: {Id_Magazyn: Id_Magazyn }
    });
};