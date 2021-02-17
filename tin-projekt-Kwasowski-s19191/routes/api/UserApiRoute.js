const express = require('express');
const router = express.Router();

const userApiController = require('../../api/UserAPI');

router.post('/', userApiController.createUser);

module.exports = router;