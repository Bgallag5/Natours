//AUTHENTICATION

const catchAsync = require("../utils/catchAsync");

//JSON Web Tokens

//payload - the data you want stored in your web token
// const token = jwt.sign(payload, secret, callback)
const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET, {
  expiresIn: process.env.JWTEXPIRES,
});


//AUTH MIDDLEWARE - check tokens 
exports.auth = catchAsync(async (req, res, next) => {
  //const and let are block scoped - must let token outside of conditional
  let token;
  // CHECK FOR TOKEN
  // split token from 'Bearer' 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
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

// turn off validators (used in development for ease of testing)
await user.save({validateBeforeSave: false})

//USE SAVE, NOT UPDATE, FOR PATCHING USER PASSWORDS
// SAVE AND CREATE are new complete instances of our model; UPDATE only replaces certain info


// NoSQL QUERY INJECTIONS
// this request can log into accounts without knowing their emails by using a query as the email string and guessing the password
// {
// 	"email": {"$gt": ""},
// 	"password": "password"
// }