const jwt = require('jsonwebtoken');
const config = require("../config/auth/key");

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    };
    jwt.verify(token, config.secret, (err, user) => {
        const loggedUser = jwt.decode(token);
        if (err) {
            return res.sendStatus(403);
        } else if (loggedUser.Role !== 1 && loggedUser.userId !== req.body.User_Id_User) {
            return res.sendStatus(403);
        } else {
            req.user = user;
        }
    });
    next();
};