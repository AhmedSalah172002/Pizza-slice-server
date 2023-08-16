const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createProductValidator= [
    check('name')
    .notEmpty()
    .withMessage('المنتج مطلوب')
    .isLength({ min: 3 })
    .withMessage('يجب أن لا يقل عن 3 احرف')
    .isLength({ max: 32 })
    .withMessage('يجب أن لا يزيد عن 32 حرف')
    .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
      check('description')
      .notEmpty()
      .withMessage('وصف المنتج مطلوب')
      .isLength({ max: 2000 })
      .withMessage('الوصف كبير جدا'),
      check('image')
      .notEmpty()
      .withMessage('الصورة مطلوبة'),
      check('sold')
    .optional()
    .isNumeric()
    .withMessage('يجب ان تدخل رقما للكمية المباعة'),
    check('smallPrice')
    .notEmpty()
    .withMessage('السعر مطلوب')
    .isNumeric()
    .withMessage('يجب ان تدخل رقما للسعر المباعة')
    .custom((value , {req})=>{
      //Number for test 
      if(Number(value) >= Number(req.body.mediumPrice) || Number(value) >= Number(req.body.largePrice)){
        throw new Error('يجب أن يكون سعر الحجم الصغير أقل من المتوسط و الكبير');
      }
      return true;
    })
    .isLength({ max: 32 })
    .withMessage('السعر كبير جدا'),
    check('mediumPrice').notEmpty()
    .withMessage('السعر مطلوب')
    .isNumeric()
    .withMessage('يجب ان تدخل رقما للسعر المباعة')
    .custom((value , {req})=>{
      if(Number(value) <= Number(req.body.smallPrice) || Number(value) >= Number(req.body.largePrice)){
        throw new Error(' يجب أن يكون سعر الحجم المتوسط أقل من الكبير و أكبر من الصغير');
      }
      return true;
    })
    .isLength({ max: 32 })
    .withMessage('السعر كبير جدا'),
    check('largePrice').notEmpty()
    .withMessage('السعر مطلوب')
    .isNumeric()
    .withMessage('يجب ان تدخل رقما للسعر المباعة')
    .custom((value , {req})=>{
      if(Number(value) <= Number(req.body.mediumPrice) || Number(value) <= Number(req.body.smallPrice)){
        throw new Error('يجب أن يكون سعر الحجم الكبير أكبر من المتوسط و الصغير');
      }
      return true;
    })
    .isLength({ max: 32 })
    .withMessage('السعر كبير جدا'),
    validatorMiddleware,
];

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    validatorMiddleware,
  ];
  
  exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    body('name')
      .optional()
      .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
    validatorMiddleware,
  ];
  
  exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID formate'),
    validatorMiddleware,
  ];