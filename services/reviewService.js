const factory = require('./handlersFactory');
const Review = require('../models/reviewModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const Product = require('../models/productModel');


// Nested route
// GET /api/v1/products/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};



// @desc    Get list of reviews
// @route   GET /api/v1/reviews
// @access  Public
exports.getReviews = factory.getAll(Review);

// @desc    Get specific review by id
// @route   GET /api/v1/reviews/:id
// @access  Public
exports.getReview = factory.getOne(Review);

// Nested route (Create)
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
// @desc    Create review
// @route   POST  /api/v1/reviews
// @access  Private/Protect/User
exports.createReview = asyncHandler(async(req,res,next)=>{
  const data = await Review.create(req.body);
  const reviews= await Review.find({product:req.body.product});
  if(reviews){
    let count=reviews.length;
    let sum=0
    let result= count > 1 ? reviews.map((e)=> sum+=e.ratings) :reviews[0].ratings;
    const product=await Product.findByIdAndUpdate(req.body.product,{
      ratingsAverage: (result[result.length-1]/count).toFixed(2),
      ratingsQuantity: count,
    },{new:true})
    
  }
  res.status(201).json({ data: data });
})

// @desc    Update specific review
// @route   PUT /api/v1/reviews/:id
// @access  Private/Protect/User
exports.updateReview = asyncHandler(async(req,res,next)=>{
  const { id } = req.params;
  const data = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  if(!data){
    return next(new  ApiError(`No document for this id ${id}`,404))
  }
  const review= await Review.findById(req.params.id);
  let productId=review.product
  const reviews= await Review.find({product:productId});
  if(reviews){
    let count=reviews.length;
    let sum=0
    let result= count > 1 ? reviews.map((e)=> sum+=e.ratings) :reviews[0].ratings;
    const product=await Product.findByIdAndUpdate(req.body.product,{
      ratingsAverage: (result[result.length-1]/count).toFixed(2),
      ratingsQuantity: count,
    },{new:true})
    
  }


  res.status(200).json({ data: data });
})

// @desc    Delete specific review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/Protect/User-Admin
exports.deleteReview =   asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  

 

  const review= await Review.findById(req.params.id);
  
  if (!review) {
    return next(new ApiError(`No document for this id ${id}`, 404));
  }
  let productId=review.product
  const data = await Review.findByIdAndDelete(id);
  const reviews= await Review.find({product:productId});
 

  if(reviews){
    let result
    let count=reviews.length;
    let sum=0
    result= count > 1 ? reviews.map((e)=> sum+=e.ratings) :reviews[0].ratings;
    const product=await Product.findByIdAndUpdate(req.body.product,{
      ratingsAverage: (result[result.length-1]/count).toFixed(2),
      ratingsQuantity: count,
    },{new:true})
    
  }

  res.status(204).send();
});
 