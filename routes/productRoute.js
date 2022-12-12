const express = require('express');
const { createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createProduct)
router.get('/:id',getAProduct)
router.get('/',getAllProduct)
router.put('/:id',authMiddleware,isAdmin,updateProduct)
router.delete('/:id',authMiddleware,isAdmin,deleteProduct)
module.exports = router;