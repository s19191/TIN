const express = require('express');
const router = express.Router();

const stanWMagazynieApiController = require('../../api/StanWMagazynieAPI');

router.get('/', stanWMagazynieApiController.getStanyWMagazynach);
router.get('/:Id_Ksiazka,Id_Magazyn', stanWMagazynieApiController.getStanWMagazynieById);
router.post('/', stanWMagazynieApiController.createStanWMagazynie);
router.put('/:Id_Ksiazka/:Id_Magazyn', stanWMagazynieApiController.updateStanWMagazynie);
router.delete('/:Id_Magazyn', stanWMagazynieApiController.deleteMagazyn);

module.exports = router;