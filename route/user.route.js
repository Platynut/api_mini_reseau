const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller');
const auth = require('./../middleware/auth');

router.get('/',auth, userController.getAll);

router.get('/:id',auth, userController.getById);

router.post('/auth/register',userController.signin);
router.post('/auth/login',userController.login);

router.put('/:id',auth, userController.update);

router.delete('/:id',auth, userController.delete);

module.exports = router;
