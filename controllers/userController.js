const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const handlerFactory = require('./handlerFactory');

exports.getOneUser = handlerFactory.getOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.getAllUsers = handlerFactory.getAll(User);

//filter req.body - takes user and the specified fields we allow to be updated
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  //Object.keys(obj) returns array of the field names on obj
  //loop through obj and for each field that matches our allowedFields, set that field on newObj
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log('USER', req.user);
  //1 THORW ERROR IF USER TRIES TO UPDATE PASSWORD DATA
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError('You cannot update password information this way', 400)
    );
  }
  //2 Update User with new data
  // specify fields we are allowing to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet set up.',
  });
};
