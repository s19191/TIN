const express = require('express');
const router = express.Router();

const stanWMagazynieController = require("../controllers/stanWMagazynieControllers");

router.get('/', stanWMagazynieController.showStanWMagazynieList);
router.get('/add', stanWMagazynieController.showAddStanWMagazynieForm);
router.get('/details/:empId', stanWMagazynieController.showStanWMagazynieDetails);
router.get('/edit/:empId', stanWMagazynieController.showEditStanWMagazynieForm);

module.exports = router;