const Magazyn = require("../../model/sequelize/Magazyn");
const Ksiazka = require("../../model/sequelize/Ksiazka");
const StanWMagazynie = require("../../model/sequelize/StanWMagazynie");

exports.getMagazyny = () => {
    return Magazyn.findAll();
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
            }]
        });
};

exports.createMagazyn = (newMagazynData) => {
    return Magazyn.create({
        Adres: newMagazynData.Adres,
        Nazwa: newMagazynData.Nazwa
    });
};

exports.updateMagazyn = (Id_Magazyn, magazynData) => {
    const Adres = magazynData.Adres;
    const Nazwa = magazynData.Nazwa;
    return Magazyn.update(magazynData, {where: {Id_Magazyn: Id_Magazyn }});
};

exports.deleteMagazyn = (Id_Magazyn) => {
    return Magazyn.destroy({
        where: {Id_Magazyn: Id_Magazyn }
    });
};