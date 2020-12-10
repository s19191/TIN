exports.showMagazynList = (req, res, next) => {
    res.render('pages/magazyn/list', { navLocation: 'magazyn' });
}

exports.showAddMagazynForm = (req, res, next) => {
    res.render('pages/magazyn/form', { navLocation: 'magazyn' });
}

exports.showMagazynDetails = (req, res, next) => {
    res.render('pages/magazyn/details', { navLocation: 'magazyn' });
}

exports.showEditMagazynForm = (req, res, next) => {
    res.render('pages/magazyn/edit', { navLocation: 'magazyn' });
}