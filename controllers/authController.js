const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util')
const AppError = require('./../utils/appError');


const signToken = (id) => {
return jwt.sign({ id }, process.env.JWTSECRET, {
  expiresIn: process.env.JWTEXPIRES,
});
}

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, passwordChangedAt, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    passwordChangedAt,
    role
  });

  const token = signToken(newUser._id)

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync( async (req, res, next) => {
  const { email, password } = req.body;
  //1. Check that email and password exist
  if (!email || !password) {
    return next(new AppError('Both email and password are required', 400));
  }
  //2. Check if user exists and password correct
  // include the password 
  const user = await User.findOne({ email }).select('+password')
  const correctPassword = await user.isCorrectPassword(password);
  console.log(user);
  console.log(correctPassword);
  if (!user ) return next(new AppError('Invalid Credentials', 401));
  if (!correctPassword) return next(new AppError('Invalid Credentials', 401));
  

  //3 Send Request
  const token = signToken(user._id)
  //send token on successful login 
  res.status(200).json({
    status: 'success',
    token
  });
});


// AUTH Middleware - check the user is logged in 
exports.auth = catchAsync( async (req, res, next) => {
  //const and let are block scoped - must let token outside of conditional
  let token
  // CHECK FOR TOKEN
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];  
  }
  if (!token) return next( new AppError('User is not authorized', 401));
console.log('TOKEN', token);
  //VERIFY TOKEN
  // npm promisify makes a promise 
 const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET, { maxAge: process.env.JWTEXPIRES});
 console.log('DECODED', decoded);

 // CHECK USER STILL EXISTS
 const currentUser = await User.findById(decoded.id);
 if (!currentUser) return next(new AppError('This User does not exist', 401))
 console.log('User', currentUser);

 //Check if the password has been changed since token was issued 
 // pass in time the token was issued at 
 if(currentUser.changedPasswordAfter(decoded.iat)){
   return next(new AppError('Session Expired, Please Login Again', 401))
 }

 // GRANT ACCESS TO PROTECTED ROUTES
 // set req.user to current user 
 req.user = currentUser
 next()
});


// for middleware to accept arguments: wrap the middleware function inside another function that takes in params
// check if a route allows access to user via role 
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)){
      return next(new AppError('You do not have permission for this action', 403))
    }
    next();
  };
};