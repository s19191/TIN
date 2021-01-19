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
};

exports.showAddMagazynForm = (req, res, next) => {
    res.render('pages/magazyn/form', {
        mag: {},
        pageTitle: req.__('ks.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('ks.form.add.btnLabel'),
        formAction: '/magazyn/add',
        navLocation: 'magazyn',
        validationErrors: []
    });
};

exports.showMagazynDetails = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            res.render('pages/magazyn/form', {
                mag: mag,
                pageTitle: req.__('ks.form.details.pageTitle'),
                formMode: 'showDetails',
                btnLabel: '',
                formAction: '',
                navLocation: 'magazyn',
                validationErrors: []
            });
        });
};

exports.showEditMagazynForm = (req, res, next) => {
    const Id_Magazyn = req.params.Id_Magazyn;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(mag => {
            res.render('pages/magazyn/form', {
                mag: mag,
                pageTitle: req.__('ks.form.edit.pageTitle'),
                formMode: 'edit',
                pageTitle: req.__('ks.form.edit.btnLabel'),
                formAction: '/magazyn/edit',
                navLocation: 'magazyn',
                validationErrors: []
            });
        });
};

exports.addMagazyn = (req, res, next) => {
    const magData = { ...req.body };
    MagazynRepository.createMagazyn(magData)
        .then( () => {
            res.redirect('/magazyn');
        })
        .catch(err => {
            res.render('pages/magazyn/form', {
                mag: magData,
                pageTitle: req.__('ks.form.add.pageTitle'),
                formMode: 'createNewErrors',
                btnLabel: req.__('ks.form.add.btnLabel'),
                formAction: '/magazyn/add',
                navLocation: 'magazyn',
                validationErrors: err.errors
            });
        });
};

exports.updateMagazyn = (req, res, next) => {
    const Id_Magazyn = req.body.Id_Magazyn;
    const magData = {...req.body};
    let mag;
    MagazynRepository.getMagazynById(Id_Magazyn)
        .then(m => {
            mag = m;
            return MagazynRepository.updateMagazyn(Id_Magazyn, magData);
        })
        .then(() => {
            res.redirect('/magazyn');
        })
        .catch(err => {
            magData.stanyWMagazynach = mag.stanyWMagazynach;
            res.render('pages/magazyn/form', {
                mag: magData,
                pageTitle: req.__('ks.form.edit.pageTitle'),
                formMode: 'editErrors',
                pageTitle: req.__('ks.form.edit.btnLabel'),
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