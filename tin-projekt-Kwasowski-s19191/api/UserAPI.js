const UserRepository = require('../repository/sequelize/UserRepository');

exports.createUser = (req, res, next) => {
    UserRepository.createUser(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};