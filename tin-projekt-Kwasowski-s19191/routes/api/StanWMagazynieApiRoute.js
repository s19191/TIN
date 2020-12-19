const express = require('express');
const router = express.Router();

const stanWMagazynieApiController = require('../../api/StanWMagazynieAPI');

router.get('/', stanWMagazynieApiController.getStanyWMagazynach);
router.get('/:Id_StanWMagazynie', stanWMagazynieApiController.getStanWMagazynieById);
router.post('/', stanWMagazynieApiController.createStanWMagazynie);
router.put('/:Id_StanWMagazynie', stanWMagazynieApiController.updateStanWMagazynie);
router.delete('/:Id_StanWMagazynie', stanWMagazynieApiController.deleteStanWMagazynie);
// router.delete('/:Id_StanWMagazynie', stanWMagazynieApiController.deleteStanWMagazynie);


module.exports = router;