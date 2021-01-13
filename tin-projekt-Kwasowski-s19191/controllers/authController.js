const UserRepository = require('../repository/sequelize/UserRepository');

exports.login = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.Password;
    UserRepository.findByEmail(email)
        .then(us => {
            if(!us) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(us.password === password) {
                req.session.loggedUser = us;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}