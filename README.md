# Pizza-slice-server

## Project Overview

Welcome to the Real World Backend for the Pizza-App – a robust and RESTful API designed to power your mobile or web pizza shop application. This backend covers a wide range of features to enhance the user experience, from choosing and evaluating pizzas to managing orders and handling authentication.

## Features

- **Password Management:** Includes features like password forgot/reset and confirmation emails on signup.

- **Pizza Selection:** Users can choose from a variety of pizza options.

- **Size Options:** Select pizza size – small, medium, or large.

- **User Interaction:** Users can evaluate pizzas, write comments, and leave reviews for each pizza type.

- **Favorites:** Users can specify favorite types for quick future purchases.

- **Discounts and Offers:** The application provides discount coupons and special offers to users.

- **Payment Methods:** Users can pay either through cash on delivery or via Visa.

- **Advanced Features:** Advanced searching, sorting, pagination, and filtering options for a seamless user experience.

- **Shopping Cart:** Allows users to add items to the cart for convenient ordering.

- **Favorites List:** Users can add their favorite pizzas to a list for quick access.

- **Middleware:** Utilizes Express Mongoose Middleware for enhanced functionality.

- **Authentication and Authorization:** Implements JWT authentication for secure login and user authorization.

## Technologies Used

- **Node.js:** A runtime environment for executing JavaScript code on the server side.

- **Express:** A web application framework for Node.js that simplifies the development of robust APIs.

- **MongoDB:** A NoSQL database for storing and retrieving data efficiently.

- **Socket.io:** Enables real-time communication between clients and the server.

- **JWT (JSON Web Tokens):** Used for secure authentication and authorization.

- **Stripe:** A popular payment processing platform for handling electronic transactions.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=9000
   MONGODB_URI=[your-mongodb-uri]
   JWT_SECRET=[your-jwt-secret]
   STRIPE_SECRET_KEY=[your-stripe-secret-key]
   ```

4. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

### Product Management

- **[GET] /api/products:** Retrieve a list of available products.
- **[GET] /api/products/:id:** Retrieve details of a specific product.
- **[POST] /api/products:** Create a new product.
- **[PUT] /api/products/:id:** Update details of a specific product.
- **[DELETE] /api/products/:id:** Delete a specific product.


### User Management

- **[POST] /api/v1/users:** Create a new user.
- **[GET] /api/v1/users:** Retrieve a list of all users.
- **[GET] /api/v1/users/:userId:** Retrieve details of a specific user.
- **[PUT] /api/v1/users/:userId:** Update details of a specific user.
- **[DELETE] /api/v1/users/:userId:** Delete a specific user.



### Authentication

- **[POST] /api/v1/auth/signup:** Create a new user account.
- **[POST] /api/v1/auth/login:** Authenticate and log in a user.
- **[GET] /api/v1/auth/forgotPasswords:** Initiate the process of resetting the user's password by sending a reset email.
- **[GET] /api/v1/auth/verifyResetCode:** Verify the reset code sent to the user's email.
- **[PUT] /api/v1/auth/resetPassword:** Reset the user's password after successful verification.


### User Profile and Password Management
- **[PUT] /api/v1/users/changeMyPassword:** Change the password of the logged-in user.
- **[PUT] /api/v1/users/updateMe:** Update details of the logged-in user's profile.
- **[GET] /api/v1/users/getMe:** Retrieve details of the logged-in user.
- **[DELETE] /api/v1/users/deleteMe:** Delete the profile of the logged-in user.

### Review Management
- **[POST] /api/v1/reviews:** Create a new review.
- **[GET] /api/v1/reviews:** Retrieve all reviews.
- **[GET] /api/v1/reviews/:reviewId:** Retrieve details of a specific review.
- **[PUT] /api/v1/reviews/:reviewId:** Update details of a specific review.
- **[DELETE] /api/v1/reviews/:reviewId:** Delete a specific review.

### Wishlist Management
- **[POST] /api/v1/wishlist:** Add a product to the user's wishlist.
- **[DELETE] /api/v1/wishlist/:ProductId:** Remove a specific product from the user's wishlist.
- **[GET] /api/v1/wishlist:** Retrieve all products in the user's wishlist.

### Coupon Management
- **[POST] /api/v1/coupons:** Create a new coupon.
- **[GET] /api/v1/coupons:** Retrieve all coupons.
- **[GET] /api/v1/coupons/:couponId:** Retrieve details of a specific coupon.
- **[PUT] /api/v1/coupons/:couponId:** Update details of a specific coupon.
- **[DELETE] /api/v1/coupons/:couponId:** Delete a specific coupon.


### Cart

- **[POST] /api/v1/cart:** Add a product to the user's shopping cart.
- **[GET] /api/v1/cart:** Retrieve the content of the logged-in user's shopping cart.
- **[PUT] /api/v1/cart/applyCoupon:** Apply a coupon to the user's shopping cart.

### Order Management

- **[GET] /api/v1/orders:** Retrieve all orders for the logged-in user.
- **[POST] /api/v1/orders/:cartId:** Create an order based on the contents of the user's shopping cart.
- **[GET] /api/v1/orders/:orderId:** Retrieve details of a specific order.
- **[GET] /api/v1/orders/checkout-session/:orderId:** Retrieve the checkout session for a specific order.


Thank you for using the Pizza-App backend! If you encounter issues or have suggestions for improvements, feel free to open an issue or submit a pull request. Happy pizza ordering! 🍕
