const Ksiazka = require("../../model/sequelize/Ksiazka");
const StanWMagazynie = require("../../model/sequelize/StanWMagazynie");
const Magazyn = require("../../model/sequelize/Magazyn");

exports.getKsiazki = () => {
    return Ksiazka.findAll();
};

exports.getKsiazkaById = (Id_Ksiazka) => {
    return Ksiazka.findByPk(Id_Ksiazka,
        {
            include: [{
                model: StanWMagazynie,
                as: 'stanyWMagazynach',
                include: [{
                    model: Magazyn,
                    as: 'magazyn'
                }]
            }]
        });
};

exports.createKsiazka = (newKsiazkaData) => {
    return Ksiazka.create({
        User_Id_User: newKsiazkaData.User_Id_User,
        Tytul: newKsiazkaData.Tytul,
        Autor: newKsiazkaData.Autor,
        DataWydania: newKsiazkaData.DataWydania
    });
};

exports.updateKsiazka = (Id_Ksiazka, ksiazkaData) => {
    return Ksiazka.update(ksiazkaData, {where: {Id_Ksiazka: Id_Ksiazka }});
};

exports.deleteKsiazka = (Id_Ksiazka) => {
    return Ksiazka.destroy({
        where: {Id_Ksiazka: Id_Ksiazka }
    });
};