const express = require('express');
const router = express.Router();

const magazynApiController = require('../../api/MagazynAPI');

router.get('/', magazynApiController.getMagazyny);
router.get('/:Id_Magazyn', magazynApiController.getMagazynById);
router.post('/', magazynApiController.createMagazyn);
router.put('/:Id_Magazyn', magazynApiController.updateMagazyn);
router.delete('/:Id_Magazyn', magazynApiController.deleteMagazyn);

module.exports = router;