const MagazynRepository = require('../repository/sequelize/MagazynRepository');

exports.showMagazynList = (req, res, next) => {
    MagazynRepository.getMagazyny()
        .then(magazyny => {
            res.render('pages/magazyn/list', {
                magazyny: magazyny,
                navLocation: 'magazyn',
                formMode: ''
            });
        });
}

exports.showAddMagazynForm = (req, res, next) => {
    res.render('pages/magazyn/form', {
        mag: {},
        pageTitle: 'Dodawanie magazynu',
        formMode: 'createNew',
        btnLabel: 'Dodaj magazyn',
        formAction: '/magazyn/add',
        navLocation: 'magazyn',
        validationErrors: []
    });
}

exports.showMagazynDetails = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            res.render('pages/magazyn/form', {
                mag: mag,
                pageTitle: 'Szczegóły magazynu',
                formMode: 'showDetails',
                btnLabel: '',
                formAction: '',
                navLocation: 'magazyn',
                validationErrors: []
            });
        });
}

exports.showEditMagazynForm = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            res.render('pages/magazyn/form', {
                mag: mag,
                pageTitle: 'Edycja magazynu',
                formMode: 'edit',
                btnLabel: 'Edytuj magazyn',
                formAction: '/magazyn/edit',
                navLocation: 'magazyn',
                validationErrors: []
            });
        });
}

exports.addMagazyn = (req, res, next) => {
    const magData = { ...req.body };
    MagazynRepository.createMagazyn(magData)
        .then( result => {
            res.redirect('/magazyn');
        })
        .catch(err => {
            res.render('pages/magazyn/form', {
                mag: magData,
                pageTitle: 'Dodawanie magazynu',
                formMode: 'createNew',
                btnLabel: 'Dodaj magazyn',
                formAction: '/magazyn/add',
                navLocation: 'magazyn',
                validationErrors: err.errors
            });
        });
};

exports.updateMagazyn = (req, res, next) => {
    const Id_Magazyn = req.body.Id_Magazyn;
    const magData = { ...req.body };
    MagazynRepository.updateMagazyn(Id_Magazyn, magData)
        .then( result => {
            res.redirect('/magazyn');
        })
        .catch(err => {
            res.render('pages/magazyn/form', {
                mag: magData,
                pageTitle: 'Edycja magazynu',
                formMode: 'edit',
                btnLabel: 'Edytuj magazyn',
                formAction: '/magazyn/edit',
                navLocation: 'magazyn',
                validationErrors: err.errors
            });
        });
};

exports.deleteMagazyn = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.deleteMagazyn(Id_Magazyn)
        .then( () => {
            res.redirect('/magazyn');
        });
};