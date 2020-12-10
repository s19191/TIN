exports.showStanWMagazynieList = (req, res, next) => {
    res.render('pages/stanWMagazynie/list', { navLocation: 'stanWMagazynie' });
}

exports.showAddStanWMagazynieForm = (req, res, next) => {
    res.render('pages/stanWMagazynie/form', { navLocation: 'stanWMagazynie' });
}

exports.showStanWMagazynieDetails = (req, res, next) => {
    res.render('pages/stanWMagazynie/details', { navLocation: 'stanWMagazynie' });
}

exports.showEditStanWMagazynieForm = (req, res, next) => {
    res.render('pages/stanWMagazynie/edit', { navLocation: 'stanWMagazynie' });
}