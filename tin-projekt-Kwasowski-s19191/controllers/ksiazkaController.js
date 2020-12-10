exports.showKsiazkaList = (req, res, next) => {
    res.render('pages/ksiazka/list', { navLocation: 'ksiazka', validation: '' });
}

exports.showAddKsiazkaForm = (req, res, next) => {
    res.render('pages/ksiazka/form', { navLocation: 'ksiazka', validation: 'ksiazka' });
}

exports.showKsiazkaDetails = (req, res, next) => {
    res.render('pages/ksiazka/details', { navLocation: 'ksiazka', validation: '' });
}

exports.showEditKsiazkaForm = (req, res, next) => {
    res.render('pages/ksiazka/edit', { navLocation: 'ksiazka', validation: 'ksiazka' });
}