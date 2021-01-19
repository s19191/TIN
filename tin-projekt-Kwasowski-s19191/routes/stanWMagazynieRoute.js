const express = require('express');
const router = express.Router();

const stanWMagazynieController = require("../controllers/stanWMagazynieControllers");

router.get('/', stanWMagazynieController.showStanWMagazynieList);
router.get('/add', stanWMagazynieController.showAddStanWMagazynieForm);
router.get('/details/:Id_StanWMagazynie', stanWMagazynieController.showStanWMagazynieDetails);
router.get('/edit/:Id_StanWMagazynie', stanWMagazynieController.showEditStanWMagazynieForm);
router.post('/add', stanWMagazynieController.addStanWMagazynie);
router.post('/edit', stanWMagazynieController.updateStanWMagazynie);
router.get('/delete/:Id_StanWMagazynie', stanWMagazynieController.deleteStanWMagazynie);

module.exports = router;