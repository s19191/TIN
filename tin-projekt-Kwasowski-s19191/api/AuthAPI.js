const UserRepository = require('../repository/sequelize/UserRepository');
const config = require("../config/auth/key");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    UserRepository.findByEmail(email)
        .then(user => {
            if (!user) {
                return res.status(401).send({ message: "Nieprawidłowy email lub hasło!" })
            }

            bcrypt.compare(password, user.Password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({ message: "Nieprawidłowy email lub hasło!" })
                    }
                    const token = jwt.sign(
                        {
                            Email: user.Email,
                            userId: user.Id_User,
                        },
                        config.secret,
                        { expiresIn: '1h' }
                    )
                    res.status(200).json({ token: token, userId: user.Id_User })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
};