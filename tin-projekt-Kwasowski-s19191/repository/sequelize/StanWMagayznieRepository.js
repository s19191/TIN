const Sequelize = require('sequelize');

const StanWMagazynie = require('../../model/sequelize/StanWMagazynie');
const Ksiazka = require('../../model/sequelize/Ksiazka');
const Magazyn = require('../../model/sequelize/Magazyn');

exports.getStanyWMagazynach = () => {
    return StanWMagazynie.findAll({include: [
            {
                model: Ksiazka,
                as: 'ksiazka'
            },
            {
                model: Magazyn,
                as: 'magazyn'
            }]
    });
};


exports.getStanWMagazynieById = (Id_StanWMagazynie) => {
    return StanWMagazynie.findByPk(Id_StanWMagazynie, {include: [
            {
                model: Ksiazka,
                as: 'ksiazka'
            },
            {
                model: Magazyn,
                as: 'magazyn'
            }]
    });
};

exports.checkIfExsists = (Ksiazka_Id_Ksiazka, Magazyn_Id_Magazyn) => {
    return StanWMagazynie.findAndCountAll({
        where: {
            Ksiazka_Id_Ksiazka: Ksiazka_Id_Ksiazka,
            Magazyn_Id_Magazyn: Magazyn_Id_Magazyn
        }
    });
};

exports.createStanWMagazynie = (stanWMagazynieData) => {
    return StanWMagazynie.create({
        Ksiazka_Id_Ksiazka: stanWMagazynieData.Ksiazka_Id_Ksiazka,
        Magazyn_Id_Magazyn: stanWMagazynieData.Magazyn_Id_Magazyn,
        IloscNaStanie: stanWMagazynieData.IloscNaStanie,
        CenaHurtowa: stanWMagazynieData.CenaHurtowa,
        MinimalnaIloscDoCenyHurtowej: stanWMagazynieData.MinimalnaIloscDoCenyHurtowej,
        CenaDetaliczna: stanWMagazynieData.CenaDetaliczna
    });
};

exports.updateStanWMagazynie = (Id_StanWMagazynie, stanWMagazynieData) => {
    return StanWMagazynie.update(stanWMagazynieData, {where: {Id_StanWMagazynie: Id_StanWMagazynie }});
}

exports.deleteStanWMagazynie = (Id_StanWMagazynie) => {
    return StanWMagazynie.destroy({
        where: {Id_StanWMagazynie: Id_StanWMagazynie }
    });
}

exports.deleteManyStanyWMagazynach = (Ids_StanWMagazynie) => {
    return StanWMagazynie.find({ Id_StanWMagazynie: { [Sequelize.Op.in]: Ids_StanWMagazynie }})
}