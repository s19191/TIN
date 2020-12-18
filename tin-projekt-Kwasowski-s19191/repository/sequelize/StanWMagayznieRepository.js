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


exports.getStanWMagazynieById = (Id_Ksiazka, Id_Magazyn) => {
    return StanWMagazynie.findByPk(Id_Ksiazka, Id_Magazyn, {include: [
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

exports.createStanWMagazynie = (stanWMagazynieData) => {
    console.log(JSON.stringify(stanWMagazynieData));

    return StanWMagazynie.create({
        Ksiazka_Id_Ksiazka: stanWMagazynieData.Ksiazka_Id_Ksiazka,
        Magazyn_Id_Magazyn: stanWMagazynieData.Magazyn_Id_Magazyn,
        IloscNaStanie: stanWMagazynieData.IloscNaStanie,
        CenaHurtowa: stanWMagazynieData.CenaHurtowa,
        MinimalnaIloscDoCenyHurtowej: stanWMagazynieData.MinimalnaIloscDoCenyHurtowej,
        CenaDetaliczna: stanWMagazynieData.CenaDetaliczna
    });
};

exports.updateStanWMagazynie = (Id_Ksiazka, Id_Magazyn, stanWMagazynieData) => {
    return StanWMagazynie.update(stanWMagazynieData, {where: {Ksiazka_Id_Ksiazka: Id_Ksiazka, Magazyn_Id_Magazyn: Id_Magazyn }});
}

exports.deleteStanWMagazynie = (Id_Ksiazka, Id_Magazyn) => {
    return StanWMagazynie.destroy({
        where: {Ksiazka_Id_Ksiazka: Id_Ksiazka, Magazyn_Id_Magazyn: Id_Magazyn }
    });
}

exports.deleteManyStanyWMagazynach = (Id_Ksiazek, Id_Magazynow) => {
    return StanWMagazynie.find({ Ksiazka_Id_Ksiazka: { [Sequelize.Op.in]: Id_Ksiazek }, Magazyn_Id_Magazyn: { [Sequelize.Op.in]: Id_Magazynow }})
}