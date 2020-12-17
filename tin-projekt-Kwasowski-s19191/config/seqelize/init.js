const sequelize = require('./sequelize');

const Ksiazka = require('../../model/sequelize/Ksiazka');
const Magazyn = require('../../model/sequelize/Magazyn');
const StanWMagazynie = require('../../model/sequelize/StanWMagazynie');

module.exports = () => {
    Ksiazka.hasMany(StanWMagazynie, {as: 'stanWMagazynie', foreignKey: {name: 'Id_Ksiazka', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    StanWMagazynie.belongsTo(Ksiazka, {as: 'ksiazka', foreignKey: {name: 'Id_Ksiazka', allowNull: false} } );
    Magazyn.hasMany(StanWMagazynie, {as: 'stanWMagazynie', foreignKey: {name: 'Id_Magazyn', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    StanWMagazynie.belongsTo(Magazyn, {as: 'magazyn', foreignKey: {name: 'Id_Magazyn', allowNull: false} });

    let allKsiazka, allMagazyn;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Ksiazka.findAll();
        })
        .then(ks => {
            if(!ks || ks.length == 0) {
                return Ksiazka.bulkCreate([
                    {Tytul: 'Lew, czarownica i stara szafa', Autor: 'C.S. Lewis', DataWydania: '1950-01-01'},
                    {Tytul: 'Książę Kaspian', Autor: 'C.S. Lewis', DataWydania: '1951-01-01'},
                    {Tytul: 'Podróż „Wędrowca do Świtu”', Autor: 'C.S. Lewis', DataWydania: '1952-01-01'}
                ])
                    .then( () => {
                        return Ksiazka.findAll();
                    });
            } else {
                return ks;
            }
        })
        .then( ks => {
            allKsiazka = ks;
            return Magazyn.findAll();
        })
        .then( mag => {
            if( !mag || mag.length == 0 ) {
                return Magazyn.bulkCreate([
                    {Adres: 'ul. Górka 15/67', budget: 'Magazyn na górce'},
                    {Adres: 'ul. Dołek 9', budget: 'Magazyn w dołku'}
                ])
                    .then( () => {
                        return Magazyn.findAll();
                    });
            } else {
                return mag;
            }
        })
        .then( mag => {
            allMagazyn = mag;
            return StanWMagazynie.findAll();
        })
        .then( swm => {
            if( !swm || swm.length == 0 ) {
                return StanWMagazynie.bulkCreate([
                    {Ksiazka_Id_Ksiazka: allKsiazka[0].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[0].Id_Magazyn, IloscNaStanie: 1000, CenaHurtowa: 20.50, MinimalnaIloscDoCenyHurtowej: 100, CenaDetaliczna: 30.50},
                    {Ksiazka_Id_Ksiazka: allKsiazka[1].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[0].Id_Magazyn, IloscNaStanie: 5000, CenaHurtowa: 18.50, MinimalnaIloscDoCenyHurtowej: 20, CenaDetaliczna: 35.50},
                    {Ksiazka_Id_Ksiazka: allKsiazka[3].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[0].Id_Magazyn, IloscNaStanie: 12000, CenaHurtowa: 10.50, MinimalnaIloscDoCenyHurtowej: 1000, CenaDetaliczna: 20.50},
                    {Ksiazka_Id_Ksiazka: allKsiazka[0].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[1].Id_Magazyn, IloscNaStanie: 15000, CenaHurtowa: 40.50, MinimalnaIloscDoCenyHurtowej: 300, CenaDetaliczna: 45.90},
                    {Ksiazka_Id_Ksiazka: allKsiazka[1].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[1].Id_Magazyn, IloscNaStanie: 2500, CenaHurtowa: 15.80, MinimalnaIloscDoCenyHurtowej: 500, CenaDetaliczna: 39.99},
                    {Ksiazka_Id_Ksiazka: allKsiazka[3].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[1].Id_Magazyn, IloscNaStanie: 40, CenaHurtowa: null, MinimalnaIloscDoCenyHurtowej: null, CenaDetaliczna: 10.50}
                ]);
            } else {
                return swm;
            }
        });
};