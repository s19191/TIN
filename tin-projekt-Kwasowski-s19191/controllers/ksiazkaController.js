const KsiazkaRepository = require('../repository/sequelize/KsiazkaRepository');

exports.showKsiazkaList = (req, res, next) => {
    KsiazkaRepository.getKsiazki()
        .then(ksiazki => {
            res.render('pages/ksiazka/list', {
                ksiazki: ksiazki,
                navLocation: 'ksiazka',
                formMode: ''
            });
        });
};

exports.showAddKsiazkaForm = (req, res, next) => {
    res.render('pages/ksiazka/form', {
        ks: {},
        pageTitle: 'Dodawanie książki',
        formMode: 'createNew',
        btnLabel: 'Dodaj książkę',
        formAction: '/ksiazka/add',
        navLocation: 'ksiazka',
        validationErrors: []
    });
};

exports.showKsiazkaDetails = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.getKsiazkaById(Id_Ksiazka)
        .then(ks => {
            res.render('pages/ksiazka/form', {
                ks: ks,
                pageTitle: 'Szczegóły książki',
                formMode: 'showDetails',
                btnLabel: '',
                formAction: '',
                navLocation: 'ksiazka',
                validationErrors: []
            });
        });
};

exports.showEditKsiazkaForm = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.getKsiazkaById(Id_Ksiazka)
        .then(ks => {
            res.render('pages/ksiazka/form', {
                ks: ks,
                pageTitle: 'Edycja książki',
                formMode: 'edit',
                btnLabel: 'Edytuj książkę',
                formAction: '/ksiazka/edit',
                navLocation: 'ksiazka',
                validationErrors: []
            });
        });
};

exports.addKsiazka = (req, res, next) => {
    const ksData = { ...req.body };
    KsiazkaRepository.createKsiazka(ksData)
        .then( () => {
            res.redirect('/ksiazka');
        })
        .catch(err => {
            res.render('pages/ksiazka/form', {
                ks: ksData,
                pageTitle: 'Dodawanie książki',
                formMode: 'createNewErrors',
                btnLabel: 'Dodaj książke',
                formAction: '/ksiazka/add',
                navLocation: 'ksiazka',
                validationErrors: err.errors
            });
        });
};

exports.updateKsiazka = (req, res, next) => {
    const Id_Ksiazka = req.body.Id_Ksiazka;
    const ksData = {...req.body};
    let ks;
    KsiazkaRepository.getKsiazkaById(Id_Ksiazka)
        .then(k => {
            ks = k;
            return KsiazkaRepository.updateKsiazka(Id_Ksiazka, ksData);
        })
        .then( () => {
            res.redirect('/ksiazka');
        })
        .catch(err => {
            ksData.stanyWMagazynach = ks.stanyWMagazynach;
            res.render('pages/ksiazka/form', {
                ks: ksData,
                pageTitle: 'Edycja książki',
                formMode: 'editErrors',
                btnLabel: 'Edytuj książkę',
                formAction: '/ksiazka/edit',
                navLocation: 'ksiazka',
                validationErrors: err.errors
            });
        });
};

exports.deleteKsiazka = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.deleteKsiazka(Id_Ksiazka)
        .then( () => {
            res.redirect('/ksiazka');
        });
};