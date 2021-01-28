const express = require('express');
const router = express.Router();
const authUtil = require('../util/authUtils');

const magazynController = require("../controllers/magazynControllers");

router.get('/', magazynController.showMagazynList);
router.get('/add', authUtil.permitAuthenticatedUser, magazynController.showAddMagazynForm);
router.get('/details/:Id_Magazyn', magazynController.showMagazynDetails);
router.get('/edit/:Id_Magazyn', authUtil.permitAuthenticatedUser, magazynController.showEditMagazynForm);
router.post('/add', authUtil.permitAuthenticatedUser, magazynController.addMagazyn);
router.post('/edit', authUtil.permitAuthenticatedUser, magazynController.updateMagazyn);
router.get('/delete/:Id_Magazyn', authUtil.permitAuthenticatedUser, magazynController.deleteMagazyn);

module.exports = router;