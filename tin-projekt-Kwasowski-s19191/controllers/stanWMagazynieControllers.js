const StanWMagazynieRepository = require('../repository/sequelize/StanWMagayznieRepository');
const MagazynRepository = require('../repository/sequelize/MagazynRepository');
const KsiazkaRepository = require('../repository/sequelize/KsiazkaRepository');


exports.showStanWMagazynieList = (req, res, next) => {
    StanWMagazynieRepository.getStanyWMagazynach()
        .then(stanyWMagazynach => {
            res.render('pages/stanWMagazynie/list', {
                stanyWMagazynach: stanyWMagazynach,
                navLocation: 'stanWMagazynie',
                validation: ''
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
                formMode: 'createNew',
                allKs: allKs,
                allMag: allMag,
                pageTitle: 'Dodawanie stanu książki w konretnym magazynie',
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
            formMode: 'showDetails',
            allKs: allKs,
            allMag: allMag,
            pageTitle: 'Szczegóły magazynu',
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
            formMode: 'edit',
            allKs: allKs,
            allMag: allMag,
            pageTitle: 'Edycja magazynu',
            formAction: '/stanWMagazynie/edit',
            btnLabel: 'Edytuj stan książki w magazynie',
            navLocation: 'stanWMagazynie',
            validation: 'stanWMagazynie'
        });
    });
}

exports.addStanWMagazynie = (req, res, next) => {
    const swmData = { ...req.body };
    StanWMagazynieRepository.createStanWMagazynie(swmData)
        .then( result => {
            res.redirect('/stanWMagazynie');
        });
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