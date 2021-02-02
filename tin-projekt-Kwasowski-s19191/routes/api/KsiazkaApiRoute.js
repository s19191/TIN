const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');

const ksiazkaApiController = require('../../api/KsiazkaAPI');

router.get('/', ksiazkaApiController.getKsiazki);
router.get('/:Id_Ksiazka', ksiazkaApiController.getKsiazkaById);
router.post('/', ksiazkaApiController.createKsiazka);
router.put('/:Id_Ksiazka', ksiazkaApiController.updateKsiazka);
router.delete('/:Id_Ksiazka', ksiazkaApiController.deleteKsiazka);

module.exports = router;