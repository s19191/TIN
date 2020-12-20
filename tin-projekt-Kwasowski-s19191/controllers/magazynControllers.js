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
    res.render('pages/magazyn/form', { navLocation: 'magazyn', validation: 'magazyn' });
}

exports.showMagazynDetails = (req, res, next) => {
    res.render('pages/magazyn/details', { navLocation: 'magazyn', validation: '' });
}

exports.showEditMagazynForm = (req, res, next) => {
    res.render('pages/magazyn/edit', { navLocation: 'magazyn', validation: 'magazyn' });
}