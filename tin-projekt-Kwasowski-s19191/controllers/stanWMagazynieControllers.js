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
}

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
                validation: 'stanWMagazynie'
            });
        });
}

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
            validation: ''
        });
    });
}

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
            validation: 'stanWMagazynie'
        });
    });
}

exports.addStanWMagazynie = (req, res, next) => {
    const swmData = { ...req.body };
    const Id_StanWMagazynie = req.body.Id_StanWMagazynie;
    let allKs, allMag;
    StanWMagazynieRepository.checkIfEXsists(swmData.Ksiazka_Id_Ksiazka, swmData.Magazyn_Id_Magazyn)
        .then(result => {
            if (result.count == 0) {
                StanWMagazynieRepository.createStanWMagazynie(swmData)
                    .then( result => {
                        res.redirect('/stanWMagazynie');
                    });
            } else {
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
                        validation: ''
                    });
            });
        }
    });
    // StanWMagazynieRepository.createStanWMagazynie(swmData)
    //     .then( result => {
    //         res.redirect('/stanWMagazynie');
    //     });
};

exports.updateStanWMagazynie = (req, res, next) => {
    const Id_StanWMagazynie = req.body.Id_StanWMagazynie;
    const swmData = { ...req.body };
    StanWMagazynieRepository.updateStanWMagazynie(Id_StanWMagazynie, swmData)
        .then( result => {
            res.redirect('/stanWMagazynie');
        });
};

exports.deleteStanWMagazynie = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.deleteStanWMagazynie(Id_StanWMagazynie)
        .then( () => {
            res.redirect('/stanWMagazynie');
        });
};