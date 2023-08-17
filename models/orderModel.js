const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Order must be belong to user'],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        size: String,
        price: Number,
      },
    ],

    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: ['card', 'cash'],
      default: 'cash',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    qrCode:String,
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name profileImg email phone',
  }).populate({
    path: 'cartItems.product',
    select: 'name image ',
  });

  next();
});






const setImageURL = (doc) => {
  if (doc.qrCode) {
    const imageUrl = `${process.env.BASE_URL}/qrCodes/${doc.qrCode}`;
    doc.qrCode = imageUrl;
  }
};
// findOne, findAll and update
orderSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
orderSchema.post('save', (doc) => {
  setImageURL(doc);
});


module.exports = mongoose.model('Order', orderSchema);


