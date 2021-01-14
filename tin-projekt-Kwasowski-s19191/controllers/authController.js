const UserRepository = require('../repository/sequelize/UserRepository');
const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.Password;
    UserRepository.findByEmail(email)
        .then(us => {
            console.log()
            if(!us) {
                res.render('index', {
                    navLocation: 'main',
                    formMode: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if(authUtil.comparePasswords(password, us.Password) === true) {
                req.session.loggedUser = us;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: 'main',
                    formMode: '',
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