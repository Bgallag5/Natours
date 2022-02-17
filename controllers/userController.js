const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multer = require('multer');
const sharp = require('sharp');

const handlerFactory = require('./handlerFactory');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/img/users')
  },
  filename: (req, file, cb) => {
    cb(null, `user${file.originalname}`)
  }
});

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

const upload = multer({
  storage: fileStorageEngine,
  // fileFilter: multerFilter
});

exports.uploadUserPhoto = async (req, res, next) => {
  upload.single('photo');

  next();
} 

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});
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

exports.getOneUser = handlerFactory.getOne(User, 'reviews');
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.getAllUsers = handlerFactory.getAll(User);

//getOne handlerFactory searches for User by req.params.id
//getMe middleware sets req.params.id = req.user.id, then can call the getOne endpoint  
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
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
