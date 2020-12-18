const express = require('express');
const router = express.Router();

const ksiazkaController = require("../controllers/ksiazkaController");

router.get('/', ksiazkaController.showKsiazkaList);
router.get('/add', ksiazkaController.showAddKsiazkaForm);
router.get('/details/:Id_Ksiazka', ksiazkaController.showKsiazkaDetails);
router.get('/edit/:Id_Ksiazka', ksiazkaController.showEditKsiazkaForm);

module.exports = router;