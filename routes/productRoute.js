const { protect, allowedTo } = require('../services/authService')
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct, uploadImage, resizeImage } = require('../services/productService')
const { createProductValidator, getProductValidator, updateProductValidator, deleteProductValidator } = require('../utils/validators/productValidator')

const express=require('express')
const reviewsRoute = require('./reviewRoute');

const router=express.Router()



router.use('/:productId/reviews', reviewsRoute);


router.route('/')
.get(getProducts)
.post(protect,allowedTo("admin"),uploadImage,resizeImage,createProductValidator,createProduct)

router.route('/:id')
.get(getProductValidator,getProduct)
.put(protect,allowedTo("admin"),uploadImage,resizeImage,updateProductValidator,updateProduct)
.delete(protect,allowedTo("admin"),deleteProductValidator,deleteProduct)


module.exports = router;
