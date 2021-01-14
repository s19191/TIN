const StanWMagazynieRepository = require('../repository/sequelize/StanWMagayznieRepository');
const MagazynRepository = require('../repository/sequelize/MagazynRepository');
const KsiazkaRepository = require('../repository/sequelize/KsiazkaRepository');


exports.showStanWMagazynieList = (req, res, next) => {
    StanWMagazynieRepository.getStanyWMagazynach()
        .then(stanyWMagazynach => {
            res.render('pages/stanWMagazynie/list', {
                stanyWMagazynach: stanyWMagazynach,
                navLocation: 'stanWMagazynie',
                formMode: ''
            });
        });
};

exports.showAddStanWMagazynieForm = (req, res, next) => {
    let allKs, allMag;
    KsiazkaRepository.getKsiazki()
        .then(ks => {
            allKs = ks;
            return MagazynRepository.getMagazyny();
        })
        .then(mag => {
            allMag = mag;
            res.render('pages/stanWMagazynie/form', {
                swm: {},
                allKs: allKs,
                allMag: allMag,
                pageTitle: 'Dodawanie stanu książki w konretnym magazynie',
                formMode: 'createNew',
                btnLabel: 'Dodaj stan książki w konkretnym magazynie',
                formAction: '/stanWMagazynie/add',
                navLocation: 'stanWMagazynie',
                validationErrors: []
            });
        });
};

exports.showStanWMagazynieDetails = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    let allKs, allMag;
    KsiazkaRepository.getKsiazki()
        .then(ks => {
            allKs = ks;
            return MagazynRepository.getMagazyny();
        })
        .then(mag => {
            allMag = mag;
            return StanWMagazynieRepository.getStanWMagazynieById(Id_StanWMagazynie);
        }).then(swm => {
        res.render('pages/stanWMagazynie/form', {
            swm: swm,
            allKs: allKs,
            allMag: allMag,
            pageTitle: 'Szczegóły magazynu',
            formMode: 'showDetails',
            btnLabel: 'Dodaj stan książki w konkretnym magazynie',
            formAction: '',
            navLocation: 'stanWMagazynie',
            validationErrors: []
        });
    });
};

exports.showEditStanWMagazynieForm = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    let allKs, allMag;
    KsiazkaRepository.getKsiazki()
        .then(ks => {
            allKs = ks;
            return MagazynRepository.getMagazyny();
        })
        .then(mag => {
            allMag = mag;
            return StanWMagazynieRepository.getStanWMagazynieById(Id_StanWMagazynie);
        }).then(swm => {
        res.render('pages/stanWMagazynie/form', {
            swm: swm,
            allKs: allKs,
            allMag: allMag,
            pageTitle: 'Edycja magazynu',
            formMode: 'edit',
            btnLabel: 'Edytuj stan książki w magazynie',
            formAction: '/stanWMagazynie/edit',
            navLocation: 'stanWMagazynie',
            validationErrors: []
        });
    });
};

exports.addStanWMagazynie = (req, res, next) => {
    const swmData = {...req.body};
    if (swmData.CenaHurtowa == '') {
        swmData.CenaHurtowa = null;
    };
    if (swmData.MinimalnaIloscDoCenyHurtowej == '') {
        swmData.MinimalnaIloscDoCenyHurtowej = null;
    };
    let allKs, allMag, ks, mag;
    KsiazkaRepository.getKsiazki()
        .then(ks => {
            allKs = ks;
            return MagazynRepository.getMagazyny();
        })
        .then(mag => {
            allMag = mag;
            return KsiazkaRepository.getKsiazkaById(swmData.Ksiazka_Id_Ksiazka);
        })
        .then(k => {
            ks = k;
            return MagazynRepository.getMagazynById(swmData.Magazyn_Id_Magazyn);
        })
        .then(m => {
            mag = m;
            return StanWMagazynieRepository.checkIfExsists(swmData.Ksiazka_Id_Ksiazka, swmData.Magazyn_Id_Magazyn);
        })
        .then(result => {
            if (result.count == 0) {
                StanWMagazynieRepository.createStanWMagazynie(swmData)
                    .then(() => {
                        res.redirect('/stanWMagazynie');
                    })
                    .catch(err => {
                        swmData.ksiazka = ks;
                        swmData.magazyn = mag;
                        res.render('pages/stanWMagazynie/form', {
                            swm: swmData,
                            allKs: allKs,
                            allMag: allMag,
                            pageTitle: 'Dodawanie stanu książki w konretnym magazynie',
                            formMode: 'createNewErrors',
                            btnLabel: 'Dodaj stan książki w konkretnym magazynie',
                            formAction: '/stanWMagazynie/add',
                            navLocation: 'stanWMagazynie',
                            validationErrors: err.errors
                        });
                    });
            } else {
                res.render('pages/stanWMagazynie/form', {
                    swm: swmData,
                    allKs: allKs,
                    allMag: allMag,
                    pageTitle: 'Dodawanie stanu książki w konretnym magazynie',
                    formMode: 'idsError',
                    btnLabel: 'Dodaj stan książki w konkretnym magazynie',
                    formAction: '/stanWMagazynie/add',
                    navLocation: 'stanWMagazynie',
                    validationErrors: []
                });
            };
        });
};

exports.updateStanWMagazynie = (req, res, next) => {
    const Id_StanWMagazynie = req.body.Id_StanWMagazynie;
    const swmData = {...req.body};
    if (swmData.CenaHurtowa == '') {
        swmData.CenaHurtowa = null;
    };
    if (swmData.MinimalnaIloscDoCenyHurtowej == '') {
        swmData.MinimalnaIloscDoCenyHurtowej = null;
    };
    let allKs, allMag, ks, mag;
    KsiazkaRepository.getKsiazki()
        .then(ks => {
            allKs = ks;
            return MagazynRepository.getMagazyny();
        })
        .then(mag => {
            allMag = mag;
            return KsiazkaRepository.getKsiazkaById(swmData.Ksiazka_Id_Ksiazka);
        })
        .then(k => {
            ks = k;
            return MagazynRepository.getMagazynById(swmData.Magazyn_Id_Magazyn);
        })
        .then(m => {
            mag = m;
            return StanWMagazynieRepository.checkIfExsists(swmData.Ksiazka_Id_Ksiazka, swmData.Magazyn_Id_Magazyn);
        })
        .then(result => {
            if (result.count == 0 || (result.count == 1 && result.rows[0].Id_StanWMagazynie == Id_StanWMagazynie)) {
                StanWMagazynieRepository.updateStanWMagazynie(Id_StanWMagazynie, swmData)
                    .then(() => {
                        res.redirect('/stanWMagazynie');
                    })
                    .catch(err => {
                        swmData.ksiazka = ks;
                        swmData.magazyn = mag;
                        res.render('pages/stanWMagazynie/form', {
                            swm: swmData,
                            allKs: allKs,
                            allMag: allMag,
                            pageTitle: 'Edycja magazynu',
                            formMode: 'edit',
                            btnLabel: 'Edytuj stan książki w magazynie',
                            formAction: '/stanWMagazynie/edit',
                            navLocation: 'stanWMagazynie',
                            validationErrors: err.errors
                        });
                    });
            } else {
                swmData.ksiazka = ks;
                swmData.magazyn = mag;
                res.render('pages/stanWMagazynie/form', {
                    swm: swmData,
                    allKs: allKs,
                    allMag: allMag,
                    pageTitle: 'Edycja magazynu',
                    formMode: 'idsError',
                    btnLabel: 'Edytuj stan książki w magazynie',
                    formAction: '/stanWMagazynie/edit',
                    navLocation: 'stanWMagazynie',
                    validationErrors: []
                });
            };
        });
};

exports.deleteStanWMagazynie = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.deleteStanWMagazynie(Id_StanWMagazynie)
        .then( () => {
            res.redirect('/stanWMagazynie');
        });
};