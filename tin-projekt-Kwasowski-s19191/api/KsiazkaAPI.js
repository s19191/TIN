const KsiazkaRepository = require('../repository/sequelize/KsiazkaRepository');

exports.getKsiazki = (req, res, next) => {
    KsiazkaRepository.getKsiazki()
        .then(ks => {
            res.status(200).json(ks);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getKsiazkaById = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.getKsiazkaById(Id_Ksiazka)
        .then(ks => {
            if(!ks) {
                res.status(404).json({
                    message: 'Ksiazka with id: '+Id_Ksiazka+' not found'
                })
            } else {
                res.status(200).json(ks);
            }
        });
};

exports.createKsiazka = (req, res, next) => {
    KsiazkaRepository.createKsiazka(req.body)
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

exports.updateKsiazka = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.updateKsiazka(Id_Ksiazka, req.body)
        .then(result => {
            res.status(200).json({message: 'Ksiazka updated!', Ksiazka: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteKsiazka = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.deleteKsiazka(Id_Ksiazka)
        .then(result => {
            res.status(200).json({message: 'Removed ksiazka', Ksiazka: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};