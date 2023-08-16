const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createCouponValidator = [
  check('name').notEmpty()
  .withMessage('اسم الكوبون مطلوب'),
  check('expire')
    .notEmpty()
    .withMessage('تاريخ الانتهاء مطلوب')
    .custom((val)=>{
      const today = new Date();
      const couponExp=new Date(val)
      if(couponExp <= today){
        throw new Error('يجب أن يكون تاريخ الكوبون صالح للاستخدام');
      }
      return true;
    }),
    check('discount')
    .notEmpty()
    .withMessage('نسبة الخصم مطلوبة')
    .isNumeric().withMessage("يجب أن تكون نسبة الخصم رقما")
    .custom((val)=>{
      if(val < 1 || val > 100){
        throw new Error('يجب أن تكون نسبة الخصم من 1 الي 100');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.getCouponValidator = [
  check('id').isMongoId().withMessage('Invalid Coupon id format'),
  validatorMiddleware,
];

exports.updateCouponValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Coupon id format'),
    check('name').optional(),
    check('expire').optional().custom((val)=>{
      const today = new Date();
      const couponExp=new Date(val)
      if(couponExp <= today){
        throw new Error('يجب أن يكون تاريخ الكوبون صالح للاستخدام');
      }
      return true;
    }),
    check('discount').optional().custom((val)=>{
      if(val < 1 || val > 100){
        throw new Error('يجب أن تكون نسبة الخصم من 1 الي 100');
      }
      return
    }),
  validatorMiddleware,
];

exports.deleteCouponValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Coupon id format'),
  validatorMiddleware,
];
