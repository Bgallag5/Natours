const express = require('express');
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');

const router = express.Router();

//full access to anyone
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

//middleware runs in order; must pass this auth check to access any routes written after this line; will only call next() if auth passes
//AUTH PROTECT all routes below this line
router.use(authController.auth);

//must be logged in to use these routes
router.route('/me').get(userController.getMe, userController.getOneUser);
router.route('/updateMe').patch(userController.updateMe)
router.route('/uploadPhoto').post(userController.uploadUserPhoto, userController.resizeUserPhoto);
router.route('/deleteMe').delete(userController.deleteMe);
router.route('/updatePassword').patch(authController.updatePassword);


//RESTRICT TO ADMIN all routes below this line
// router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  // DO NOT use this patch to update a user's password
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
