const express = require('express');
const router = express.Router();

const ksiazkaController = require("../controllers/ksiazkaController");

router.get('/', ksiazkaController.showKsiazkaList);
router.get('/add', ksiazkaController.showAddKsiazkaForm);
router.get('/details/:empId', ksiazkaController.showKsiazkaDetails);
router.get('/edit/:empId', ksiazkaController.showEditKsiazkaForm);

module.exports = router;