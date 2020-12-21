const KsiazkaRepository = require('../repository/sequelize/KsiazkaRepository');

exports.showKsiazkaList = (req, res, next) => {
    KsiazkaRepository.getKsiazki()
        .then(ksiazki => {
            res.render('pages/ksiazka/list', {
                ksiazki: ksiazki,
                navLocation: 'ksiazka',
                validation: ''
            });
        });
}

exports.showAddKsiazkaForm = (req, res, next) => {
    res.render('pages/ksiazka/form', {
        ks: {},
        pageTitle: 'Nowa ksiazka',
        formMode: 'createNew',
        btnLabel: 'Dodaj książkę',
        formAction: '/ksiazka/add',
        navLocation: 'ksiazka',
        validation: 'ksiazka'
    });
}

exports.showKsiazkaDetails = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.getKsiazkaById(Id_Ksiazka)
        .then(ks => {
            res.render('pages/ksiazka/form', {
                ks: ks,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły książki',
                formAction: '',
                navLocation: 'ksiazka',
                validation: ''
            });
        });
}

exports.showEditKsiazkaForm = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.getKsiazkaById(Id_Ksiazka)
        .then(ks => {
            res.render('pages/ksiazka/form', {
                ks: ks,
                formMode: 'edit',
                pageTitle: 'Edycja książki',
                btnLabel: 'Edytuj książkę',
                formAction: '/ksiazka/edit',
                navLocation: 'ksiazka',
                validation: 'ksiazka'
            });
        });
}

exports.addKsiazka = (req, res, next) => {
    const ksData = { ...req.body };
    KsiazkaRepository.createKsiazka(ksData)
        .then( result => {
            res.redirect('/ksiazka');
        });
};

exports.updateKsiazka = (req, res, next) => {
    const Id_Ksiazka = req.body.Id_Ksiazka;
    const ksData = { ...req.body };
    KsiazkaRepository.updateKsiazka(Id_Ksiazka, ksData)
        .then( result => {
            res.redirect('/ksiazka');
        });
};

exports.deleteKsiazka = (req, res, next) => {
    const Id_Ksiazka = req.params.Id_Ksiazka;
    KsiazkaRepository.deleteKsiazka(Id_Ksiazka)
        .then( () => {
            res.redirect('/ksiazka');
        });
};