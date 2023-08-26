const mongoose = require('mongoose');

// 1- Create Schema
const productSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Product required'],
        unique: [true, 'Product must be unique'],
        minlength: [3, 'Too short Product name'],
        maxlength: [32, 'Too long Product name'],
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
      },
      image:{
        type: String,
        require:[true, 'Product image is required'],
      },
      description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Too short product description'],
      },
  sold: {
        type: Number,
        default: 0,
      },
  smallPrice: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
      },
  mediumPrice: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
      },
  largePrice: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
      },
  ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above or equal 1.0'],
        max: [5, 'Rating must be below or equal 5.0'],
      },
      ratingsQuantity: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
  
  productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
  });


  const setImageURL = (doc) => {
    if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.image}`;
      doc.image = imageUrl;
    }
  };
  // findOne, findAll and update
  productSchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  productSchema.post('save', (doc) => {
    setImageURL(doc);
  });
  
  // 2- Create model
  module.exports = mongoose.model('Product', productSchema);