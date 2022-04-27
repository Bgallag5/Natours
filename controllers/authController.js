const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

//create a sign token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRES,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  };
  //when in production set 'secure' cookie header to true
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  //send cookie in response to be stored in broswer (in milliseconds)
  res.cookie('jwt', token, cookieOptions);
  //Remove password from response
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } =
    req.body;
    console.log(name);

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  console.log(newUser);
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1. Check that email and password exist
  if (!email || !password) {
    return next(new AppError('Both email and password are required', 400));
  }
  //2. Check if user exists and password correct
  // include the password
  const user = await User.findOne({ email }).select('+password');
  const correctPassword = await user.isCorrectPassword(password);
  if (!user) return next(new AppError('Invalid Credentials', 401));
  if (!correctPassword) return next(new AppError('Invalid Credentials', 401));

  //3 Send Request
  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  // clear jwt and send response with old expiration
  res.cookie("jwt", "null", {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true
  });
  //set user to null?
  res.status(200).json({status: 'success'})
}) 

// AUTH Middleware - check the user is logged in
exports.auth = catchAsync(async (req, res, next) => {
  let token;
  // CHECK FOR TOKEN
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(token);
  if (!token) return next(new AppError('User is not authorized', 401));
  //VERIFY TOKEN
  // npm promisify makes a promise
  const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET, {
    maxAge: process.env.JWTEXPIRES,
  });

  // CHECK USER STILL EXISTS
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError('This User does not exist', 401));

  //Check if the password has been changed since token was issued
  // pass in time the token was issued at
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('Session Expired, Please Login Again', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTES
  // set req.user to current user
  req.user = currentUser;
  next();
});

//front end Logged in check
exports.isLoggedIn = catchAsync(async (req, res, next) => {

  // CHECK FOR COOKIE
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWTSECRET
    );

    // CHECK USER STILL EXISTS
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next();

    //Check if the password has been changed since token was issued
    // pass in time the token was issued at
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    // There is a logged in user
    // res.locals.user = currentUser;
    res.user = currentUser;
    return next();
  }

 return next(new AppError('MUST BE LOGGED IN', 404));
});

// for middleware to accept arguments: wrap the middleware function inside another function that takes in params
// check if a route allows access to user via role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission for this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1- Get the User based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No User with that Email address', 404));

  //2- Generate random password token
  // calls function on User model - generates and saves passwordResetToken + Expiration on User
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3- Send user an email with the token
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to: ${resetURL}.\n If you did not request a reset, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password Reset token (only valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email, try again later', 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1- Get User based on the token
  // hash the token passed in via params to compare to the DB token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  // Get user and check if passwordResetExpires is greater than Date.now()
  // if passwordResetToken has expired, no user will be returned
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2-compare user token to encrypted DBtoken - if tokens match and have not expired: set new passwords, and clear resetToken
  if (!user)
    return next(new AppError('Reset Token is invalid or has expired', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3- update the changedPasswordAt property on user
  //4-redirect to login/ Log the user in with JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  console.log('UPDATING PASSWORD');
  //1 GET USER
  // get current authenticated user by id and include password
  const user = await User.findById(req.user._id).select('+password');
  if (!user) return next(new AppError('No User found with this email', 404));
  //2 CHECK PASSWORD IS CORRECT
  // check if currentPassword matches password in DB
  const correctPassword = await user.isCorrectPassword(
    req.body.currentPassword
  );
  // if passwords do not match throw error
  if (!correctPassword) return next(new AppError('Incorrect password', 401));

  //3 UPDATE PASSWORD
  // set new passwords on user model and await save
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.confirmNewPassword;
  await user.save();

  //4 LOG USER IN, send JWT
  // generate token and log user in
  createSendToken(user, 200, req, res);
});
