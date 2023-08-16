const express = require('express');

const {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} = require('../services/couponService');


const authService = require('../services/authService');
const { createCouponValidator, getCouponValidator, updateCouponValidator, deleteCouponValidator } = require('../utils/validators/couponValidator');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('admin'));

router.route('/').get(getCoupons).post(createCouponValidator,createCoupon);
router.route('/:id')
.get(getCouponValidator,getCoupon)
.put(updateCouponValidator,updateCoupon)
.delete(deleteCouponValidator,deleteCoupon);

module.exports = router;
