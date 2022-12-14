const express = require('express')
const router = express.Router();
const {createUser, loginUserController, getAllUser, getAUser, deleteAUser, updateAUser, blockUser, unBlockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishlist, saveAddress, userCart, getUserCart, emptyCart, applyCoupon} = require('../controller/userController');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');

router.post('/register',createUser);
router.post('/forgot-password-token',forgotPasswordToken);
router.put('/reset-password/:token',resetPassword);
router.put('/password',authMiddleware,updatePassword)
router.post('/admin-login',loginAdmin);
router.post('/cart',authMiddleware,userCart);
router.post('/cart/applycoupon',authMiddleware,applyCoupon)
router.post('/login',loginUserController);
router.get('/all-users',getAllUser);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);
router.get('/wishlist',authMiddleware,getWishlist);
router.get('/cart-user',authMiddleware,getUserCart);
router.get('/:id',authMiddleware,isAdmin,getAUser);
router.delete('/empty-cart',authMiddleware,emptyCart);
router.delete('/:id',deleteAUser);
router.put('/edit-user',authMiddleware,updateAUser);
router.put('/save-address',authMiddleware,saveAddress);
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser);
router.put('/unblock-user/:id',authMiddleware,isAdmin,unBlockUser);

module.exports = router;