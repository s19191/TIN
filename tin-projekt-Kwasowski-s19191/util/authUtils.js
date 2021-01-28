const bcrypt = require('bcryptjs');
const MagazynRepository = require('../repository/sequelize/MagazynRepository');
const StanWMagazynieRepository = require('../repository/sequelize/StanWMagayznieRepository');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if(loggedUser) {
        next();
    } else {
        throw new Error('unauthorized access');
    }
}

exports.permitAuthenticatedCreatorUserMagazyn = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            const creatorUser = mag.user;
            if(loggedUser.Id_User == creatorUser.Id_User || loggedUser.role.Name == 'Admin') {
                next();
            } else {
                //TODO: To nie działa
                throw new Error('unauthorized access');
            }
        });
}

exports.permitAuthenticatedCreatorUserStanWMagazynie = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.getStanWMagazynieById(Id_StanWMagazynie)
        .then(swm => {
            const creatorUser = swm.user;
            if(loggedUser.Id_User == creatorUser.Id_User || loggedUser.role.Name == 'Admin') {
                next();
            } else {
                //TODO: To nie działa
                throw new Error('unauthorized access');
            }
        });
}