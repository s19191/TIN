const express = require('express');
const router = express.Router();

const magazynController = require("../controllers/magazynControllers");

router.get('/', magazynController.showMagazynList);
router.get('/add', magazynController.showAddMagazynForm);
router.get('/details/:empId', magazynController.showMagazynDetails);
router.get('/edit/:empId', magazynController.showEditMagazynForm);

module.exports = router;