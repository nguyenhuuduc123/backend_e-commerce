const express = require('express')
const router = express.Router();
const {createUser, loginUserController, getAllUser, getAUser, deleteAUser, updateAUser} = require('../controller/userController');


router.post('/register',createUser);
router.post('/login',loginUserController);
router.get('/all-users',getAllUser);
router.get('/:id',getAUser);
router.delete('/:id',deleteAUser);
router.put('/:id',updateAUser);
module.exports = router;