const sequelize = require('./sequelize');

const Ksiazka = require('../../model/sequelize/Ksiazka');
const Magazyn = require('../../model/sequelize/Magazyn');
const StanWMagazynie = require('../../model/sequelize/StanWMagazynie');
const User = require('../../model/sequelize/User');
const Role = require('../../model/sequelize/Role');

const authUtil = require('../../util/authUtils');
const passHash01 = authUtil.hashPassword('s19191');
const passHash02 = authUtil.hashPassword('12345');
const passHash03 = authUtil.hashPassword('qwert');

module.exports = () => {
    Ksiazka.hasMany(StanWMagazynie, {as: 'stanyWMagazynach', foreignKey: {name: 'Ksiazka_Id_Ksiazka', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    StanWMagazynie.belongsTo(Ksiazka, {as: 'ksiazka', foreignKey: {name: 'Ksiazka_Id_Ksiazka', allowNull: false} } );
    Magazyn.hasMany(StanWMagazynie, {as: 'stanyWMagazynach', foreignKey: {name: 'Magazyn_Id_Magazyn', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    StanWMagazynie.belongsTo(Magazyn, {as: 'magazyn', foreignKey: {name: 'Magazyn_Id_Magazyn', allowNull: false} });
    User.hasMany(Ksiazka, {as: 'ksiazka', foreignKey: {name: 'User_Id_User', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Ksiazka.belongsTo(User, {as: 'user', foreignKey: {name: 'User_Id_User', allowNull: false} } );
    User.hasMany(Magazyn, {as: 'magazyn', foreignKey: {name: 'User_Id_User', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Magazyn.belongsTo(User, {as: 'user', foreignKey: {name: 'User_Id_User', allowNull: false} } );
    User.hasMany(StanWMagazynie, {as: 'stanyWMagazynach', foreignKey: {name: 'User_Id_User', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    StanWMagazynie.belongsTo(User, {as: 'user', foreignKey: {name: 'User_Id_User', allowNull: false} } );
    Role.hasMany(User, {as: 'user', foreignKey: {name: 'Role_Id_Role', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    User.belongsTo(Role, {as: 'role', foreignKey: {name: 'Role_Id_Role', allowNull: false} } );

    let allKsiazka, allMagazyn;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Role.findAll();
        })
        .then(ro => {
            if(!ro || ro.length == 0) {
                return Role.bulkCreate([
                    {Name: 'Admin'},
                    {Name: 'Creator'},
                ])
                    .then( () => {
                        return Role.findAll();
                    });
            } else {
                return ro;
            }
        })
        .then(() => {
            return User.findAll();
        })
        .then(us => {
            if(!us || us.length == 0) {
                return User.bulkCreate([
                    {Role_Id_Role: 1, Name: 'Jan', Surname: 'Kwasowski', Email: 's19191@pjwstk.edu.pl', Password: passHash01},
                    {Role_Id_Role: 2, Name: 'Adam', Surname: 'Marian', Email: 'adam@adam.pl', Password: passHash02},
                    {Role_Id_Role: 2, Name: 'Agata', Surname: 'Maria', Email: 'agata@agata.pl', Password: passHash03}
                ])
                    .then( () => {
                        return User.findAll();
                    });
            } else {
                return us;
            }
        })
        .then( () => {
            return Ksiazka.findAll();
        })
        .then(ks => {
            if(!ks || ks.length == 0) {
                return Ksiazka.bulkCreate([
                    {User_Id_User: 1, Tytul: 'Lew, czarownica i stara szafa', Autor: 'C.S. Lewis', DataWydania: '1950-01-01'},
                    {User_Id_User: 1, Tytul: 'Książę Kaspian', Autor: 'C.S. Lewis', DataWydania: '1951-01-01'},
                    {User_Id_User: 1, Tytul: 'Podróż „Wędrowca do Świtu”', Autor: 'C.S. Lewis', DataWydania: '1952-01-01'},
                    {User_Id_User: 1, Tytul: 'Srebrne krzesło', Autor: 'C.S. Lewis', DataWydania: '1953-01-01'}
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
                    {User_Id_User: 2, Adres: 'ul. Górka 15/67', Nazwa: 'Magazyn na górce'},
                    {User_Id_User: 3, Adres: 'ul. Dołek 9', Nazwa: 'Magazyn w dołku'}
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
                    {Ksiazka_Id_Ksiazka: allKsiazka[0].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[0].Id_Magazyn, User_Id_User: 2, IloscNaStanie: 1000, CenaHurtowa: 20.50, MinimalnaIloscDoCenyHurtowej: 100, CenaDetaliczna: 30.50},
                    {Ksiazka_Id_Ksiazka: allKsiazka[1].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[0].Id_Magazyn, User_Id_User: 2, IloscNaStanie: 5000, CenaHurtowa: 18.50, MinimalnaIloscDoCenyHurtowej: 20, CenaDetaliczna: 35.50},
                    {Ksiazka_Id_Ksiazka: allKsiazka[2].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[0].Id_Magazyn, User_Id_User: 2, IloscNaStanie: 12000, CenaHurtowa: 10.50, MinimalnaIloscDoCenyHurtowej: 1000, CenaDetaliczna: 20.50},
                    {Ksiazka_Id_Ksiazka: allKsiazka[0].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[1].Id_Magazyn, User_Id_User: 3, IloscNaStanie: 15000, CenaHurtowa: 40.50, MinimalnaIloscDoCenyHurtowej: 300, CenaDetaliczna: 45.90},
                    {Ksiazka_Id_Ksiazka: allKsiazka[1].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[1].Id_Magazyn, User_Id_User: 3, IloscNaStanie: 2500, CenaHurtowa: 15.80, MinimalnaIloscDoCenyHurtowej: 500, CenaDetaliczna: 39.99},
                    {Ksiazka_Id_Ksiazka: allKsiazka[2].Id_Ksiazka, Magazyn_Id_Magazyn: allMagazyn[1].Id_Magazyn, User_Id_User: 3, IloscNaStanie: 40, CenaHurtowa: null, MinimalnaIloscDoCenyHurtowej: null, CenaDetaliczna: 10.50}
                ]);
            } else {
                return swm;
            }
        });
};