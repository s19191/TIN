exports.showMagazynList = (req, res, next) => {
    res.render('pages/magazyn/list', { navLocation: 'magazyn', validation: '' });
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