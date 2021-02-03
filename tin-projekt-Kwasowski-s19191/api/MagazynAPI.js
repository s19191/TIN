const MagazynRepository = require('../repository/sequelize/MagazynRepository');

exports.getMagazyny = (req, res, next) => {
    MagazynRepository.getMagazyny()
        .then(mag => {
            res.status(200).json(mag);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMagazynById = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            if(!mag) {
                res.status(404).json({
                    message: 'Magazyn with id: '+Id_Magazyn+' not found'
                })
            } else {
                res.status(200).json(mag);
            }
        });
};

exports.createMagazyn = (req, res, next) => {
    MagazynRepository.createMagazyn(req.body)
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

exports.updateMagazyn = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.updateMagazyn(Id_Magazyn, req.body)
        .then(result => {
            res.status(200).json({message: 'Magazyn updated!', Magazyn: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMagazyn = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.deleteMagazyn(Id_Magazyn)
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