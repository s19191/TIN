const express = require('express');
const router = express.Router();

const magazynController = require("../controllers/magazynControllers");

router.get('/', magazynController.showMagazynList);
router.get('/add', magazynController.showAddMagazynForm);
router.get('/details/:Id_Magazyn', magazynController.showMagazynDetails);
router.get('/edit/:Id_Magazyn', magazynController.showEditMagazynForm);

module.exports = router;