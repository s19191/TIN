const express = require('express');
const router = express.Router();
const authUtil = require('../util/authUtils');

const ksiazkaController = require("../controllers/ksiazkaController");

router.get('/', ksiazkaController.showKsiazkaList);
router.get('/add', authUtil.permitAuthenticatedUser, ksiazkaController.showAddKsiazkaForm);
router.get('/details/:Id_Ksiazka', ksiazkaController.showKsiazkaDetails);
router.get('/edit/:Id_Ksiazka', authUtil.permitAuthenticatedUser, ksiazkaController.showEditKsiazkaForm);
router.post('/add', authUtil.permitAuthenticatedUser, ksiazkaController.addKsiazka);
router.post('/edit', authUtil.permitAuthenticatedUser, ksiazkaController.updateKsiazka);
router.get('/delete/:Id_Ksiazka', authUtil.permitAuthenticatedUser, ksiazkaController.deleteKsiazka);

module.exports = router;