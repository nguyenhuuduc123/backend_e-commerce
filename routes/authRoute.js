const express = require('express')
const router = express.Router();
const {createUser, loginUserController, getAllUser, getAUser, deleteAUser, updateAUser, blockUser, unBlockUser, handleRefreshToken, logout} = require('../controller/userController');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');

router.post('/register',createUser);
router.post('/login',loginUserController);
router.get('/all-users',getAllUser);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);
router.get('/:id',authMiddleware,isAdmin,getAUser);
router.delete('/:id',deleteAUser);
router.put('/edit-user',authMiddleware,updateAUser);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin,unBlockUser);

module.exports = router;