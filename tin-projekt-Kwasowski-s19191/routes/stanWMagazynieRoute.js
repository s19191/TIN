const express = require('express');
const router = express.Router();
const authUtil = require('../util/authUtils');

const stanWMagazynieController = require("../controllers/stanWMagazynieControllers");

router.get('/', stanWMagazynieController.showStanWMagazynieList);
router.get('/add', authUtil.permitAuthenticatedUser, stanWMagazynieController.showAddStanWMagazynieForm);
router.get('/details/:Id_StanWMagazynie', stanWMagazynieController.showStanWMagazynieDetails);
router.get('/edit/:Id_StanWMagazynie', authUtil.permitAuthenticatedUser, stanWMagazynieController.showEditStanWMagazynieForm);
router.post('/add', authUtil.permitAuthenticatedUser, stanWMagazynieController.addStanWMagazynie);
router.post('/edit', authUtil.permitAuthenticatedUser, stanWMagazynieController.updateStanWMagazynie);
router.get('/delete/:Id_StanWMagazynie', authUtil.permitAuthenticatedUser, stanWMagazynieController.deleteStanWMagazynie);

module.exports = router;