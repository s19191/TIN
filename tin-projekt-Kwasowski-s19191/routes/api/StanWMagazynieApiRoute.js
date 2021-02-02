const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const isAdminOrCreator = require('../../middleware/isAdminOrCreator');

const stanWMagazynieApiController = require('../../api/StanWMagazynieAPI');

router.get('/', stanWMagazynieApiController.getStanyWMagazynach);
router.get('/:Id_StanWMagazynie', stanWMagazynieApiController.getStanWMagazynieById);
router.post('/', isAuth, stanWMagazynieApiController.createStanWMagazynie);
router.put('/:Id_StanWMagazynie', isAdminOrCreator, stanWMagazynieApiController.updateStanWMagazynie);
router.delete('/:Id_StanWMagazynie', isAuth, stanWMagazynieApiController.deleteStanWMagazynie);

module.exports = router;