var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main', validation: 'no'});
});
router.get('/logout', AuthController.logout);
router.post('/login',AuthController.login);

module.exports = router;
