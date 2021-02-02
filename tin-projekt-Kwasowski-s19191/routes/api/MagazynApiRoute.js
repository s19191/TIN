const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');

const magazynApiController = require('../../api/MagazynAPI');

router.get('/', magazynApiController.getMagazyny);
router.get('/:Id_Magazyn', magazynApiController.getMagazynById);
router.post('/', isAuth, magazynApiController.createMagazyn);
router.put('/:Id_Magazyn', isAuth, magazynApiController.updateMagazyn);
router.delete('/:Id_Magazyn', isAuth, magazynApiController.deleteMagazyn);

module.exports = router;