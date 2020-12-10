exports.showStanWMagazynieList = (req, res, next) => {
    res.render('pages/stanWMagazynie/list', { navLocation: 'stanWMagazynie', validation: '' });
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