const StanWMagazynieRepository = require('../repository/sequelize/StanWMagayznieRepository');

exports.getStanyWMagazynach = (req, res, next) => {
    StanWMagazynieRepository.getStanyWMagazynach()
        .then(swm => {
            res.status(200).json(swm);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getStanWMagazynieById = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    const Id_Magazyn = req.params.Id_Magazyn;
    StanWMagazynieRepository.getStanWMagazynieById(Id_Ksiazka, Id_Magazyn)
        .then(swm => {
            if(!swm) {
                res.status(404).json({
                    message: 'Stan w magazynie with Id_Ksiazka: '+Id_Ksiazka+' , Id_Magazyn: '+Id_Magazyn+' not found'
                })
            } else {
                res.status(200).json(swm);
            }
        });
};

exports.createStanWMagazynie = (req, res, next) => {
    StanWMagazynieRepository.createStanWMagazynie(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateStanWMagazynie = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    const Id_Magazyn = req.params.Id_Magazyn;
    StanWMagazynieRepository.updateStanWMagazynie(Id_Ksiazka, Id_Magazyn, req.body)
        .then(result => {
            res.status(200).json({message: 'Stan w magazynie updated!', StanWMagazynie: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteMagazyn = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    const Id_Magazyn = req.params.Id_Magazyn;
    StanWMagazynieRepository.deleteStanWMagazynie(Id_Ksiazka, Id_Magazyn)
        .then(result => {
            res.status(200).json({message: 'Removed magazyn', Magazyn: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};