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
                pageTitle: 'Nowy stan książki w konretnym magazynie',
                btnLabel: 'Dodaj zatrudnienie',
                formAction: '/stanWMagazynie/add',
                navLocation: 'stanWMagazynie',
                validation: 'stanWMagazynie'
            });
        });
}

exports.showStanWMagazynieDetails = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.getStanWMagazynieById(Id_StanWMagazynie)
        .then(swm => {
            res.render('pages/stanWMagazynie/form', {
                swm: swm,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły magazynu',
                formAction: '',
                navLocation: 'stanWMagazynie',
                validation: ''
            });
        });
}

exports.showEditStanWMagazynieForm = (req, res, next) => {
    const Id_StanWMagazynie = req.params.Id_StanWMagazynie;
    StanWMagazynieRepository.getStanWMagazynieById(Id_StanWMagazynie)
        .then(swm => {
            res.render('pages/stanWMagazynie/form', {
                swm: swm,
                formMode: 'edit',
                pageTitle: 'Edycja magazynu',
                btnLabel: 'Edytuj magazyn',
                formAction: '/stanWMagazynie/edit',
                navLocation: 'stanWMagazynie',
                validation: 'stanWMagazynie'
            });
        });
}