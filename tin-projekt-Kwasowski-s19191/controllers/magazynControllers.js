const MagazynRepository = require('../repository/sequelize/MagazynRepository');

exports.showMagazynList = (req, res, next) => {
    MagazynRepository.getMagazyny()
        .then(magazyny => {
            res.render('pages/magazyn/list', {
                magazyny: magazyny,
                navLocation: 'magazyn',
                validation: ''
            });
        });
}

exports.showAddMagazynForm = (req, res, next) => {
    res.render('pages/magazyn/form', {
        mag: {},
        pageTitle: 'Nowy magazyn',
        formMode: 'createNew',
        btnLabel: 'Dodaj magazyn',
        formAction: '/magazyn/add',
        navLocation: 'magazyn',
        validation: 'magazyn'
    });
}

exports.showMagazynDetails = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            res.render('pages/magazyn/form', {
                mag: mag,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły magazynu',
                formAction: '',
                navLocation: 'magazyn',
                validation: ''
            });
        });
}

exports.showEditMagazynForm = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            res.render('pages/magazyn/form', {
                mag: mag,
                formMode: 'edit',
                pageTitle: 'Edycja magazynu',
                btnLabel: 'Edytuj magazyn',
                formAction: '/magazyn/edit',
                navLocation: 'magazyn',
                validation: 'magazyn'
            });
        });
}

exports.addMagazyn = (req, res, next) => {
    const magData = { ...req.body };
    MagazynRepository.createMagazyn(magData)
        .then( result => {
            res.redirect('/magazyn');
        });
};

exports.updateMagazyn = (req, res, next) => {
    const Id_Magazyn = req.body.Id_Magazyn;
    const magData = { ...req.body };
    MagazynRepository.updateMagazyn(Id_Magazyn, magData)
        .then( result => {
            res.redirect('/magazyn');
        });
};

exports.deleteMagazyn = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.deleteMagazyn(Id_Magazyn)
        .then( () => {
            res.redirect('/magazyn');
        });
};