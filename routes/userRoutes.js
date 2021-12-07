const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
.route('/signup')
.post(authController.signup);

router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);

router.route('/updateMe').patch(authController.auth, userController.updateMe);

router.route('/deleteMe').delete(authController.auth, userController.deleteMe);

router
  .route('/updatePassword')
  .patch(authController.auth, authController.updatePassword);

router.route('/resetPassword/:token').patch(authController.resetPassword);

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
