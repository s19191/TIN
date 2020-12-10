exports.showKsiazkaList = (req, res, next) => {
    res.render('pages/ksiazka/list', {});
}

exports.showAddKsiazkaForm = (req, res, next) => {
    res.render('pages/ksiazka/form', {});
}

exports.showKsiazkaDetails = (req, res, next) => {
    res.render('pages/ksiazka/details', {});
}