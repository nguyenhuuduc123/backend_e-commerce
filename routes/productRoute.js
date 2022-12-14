const express = require('express');
const { createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, uploadImages } = require('../controller/productController');
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middleware/uploadImages');
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createProduct)
router.put('/upload/:id',authMiddleware,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages)
router.get('/:id',getAProduct)
router.put('/wishlist',authMiddleware,addToWishList)
router.put('/rating',authMiddleware,rating)
router.get('/',getAllProduct)
router.put('/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)
module.exports = router;