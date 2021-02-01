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
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.getStanWMagazynieById(Id_StanWMagazynie)
        .then(swm => {
            if(!swm) {
                res.status(404).json({
                    message: 'Stan w magazynie with Id_StanWMagazynie: '+Id_StanWMagazynie+' not found'
                })
            } else {
                res.status(200).json(swm);
            }
        });
};

exports.createStanWMagazynie = (req, res, next) => {
    const swmData = {...req.body};
    if (swmData.CenaHurtowa == '') {
        swmData.CenaHurtowa = null;
    };
    if (swmData.MinimalnaIloscDoCenyHurtowej == '') {
        swmData.MinimalnaIloscDoCenyHurtowej = null;
    };
    StanWMagazynieRepository.createStanWMagazynie(swmData)
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
    const swmData = {...req.body};
    if (swmData.CenaHurtowa == '') {
        swmData.CenaHurtowa = null;
    };
    if (swmData.MinimalnaIloscDoCenyHurtowej == '') {
        swmData.MinimalnaIloscDoCenyHurtowej = null;
    };
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.updateStanWMagazynie(Id_StanWMagazynie, swmData)
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

exports.deleteStanWMagazynie = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.deleteStanWMagazynie(Id_StanWMagazynie)
        .then(result => {
            res.status(200).json({message: 'Removed stan w magazynie', StanWMagazynie: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteManyStanyWMagazynach = (req, res, next) => {
    const Ids_StanWMagazynie = req.params.Ids_StanWMagazynie;
    StanWMagazynieRepository.deleteManyStanyWMagazynach(Ids_StanWMagazynie)
        .then(result => {
            res.status(200).json({message: 'Removed stan w magazynie', StanWMagazynie: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};