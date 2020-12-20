const StanWMagazynieRepository = require('../repository/sequelize/StanWMagayznieRepository');

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
    res.render('pages/stanWMagazynie/form', { navLocation: 'stanWMagazynie', validation: 'stanWMagazynie' });
}

exports.showStanWMagazynieDetails = (req, res, next) => {
    res.render('pages/stanWMagazynie/details', { navLocation: 'stanWMagazynie', validation: '' });
}

exports.showEditStanWMagazynieForm = (req, res, next) => {
    res.render('pages/stanWMagazynie/edit', { navLocation: 'stanWMagazynie', validation: 'stanWMagazynie' });
}