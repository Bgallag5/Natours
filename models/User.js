const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
//built in node module for encryption
const crypto = require('crypto');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isEmail, 'Must be a valid email'],
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'guide', 'lead-guide'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      // dont select when returning data
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        // match password and confirm - ONLY WORKS ON CREATE and SAVE
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords do not match!!',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    photo: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id',
});

//hash password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salt = 12;
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
  }
  next();
});

userSchema.pre('save', function (next) {
  //if password has not been changed or if this is a new document, continue middleware
  if (!this.isModified('password') || this.isNew) return next();
  //else set new passwordChangedAt property
  // set to 1 second in the past: ensures changedAt iat is less than token iat
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//before every 'find' filter out inactive users
// deleted user are still in DB but never return in a 'find'
userSchema.pre(/^find/, function (next) {
  //active not equal to false
  this.find({ active: { $ne: false } });
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  // console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

// check if user's password has been changed since the token was issued
userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    //convert time to like units for comparison (base 10)
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTtimestamp);
    //return true if changedTimestamp is greater (more recent) than JWTtimestamp
    return JWTtimestamp < changedTimestamp;
  }
  //default to false - password has not been changed since token issued
  return false;
};

//password reset
userSchema.methods.createPasswordResetToken = function () {
  //generate reset token as hex string
  const resetToken = crypto.randomBytes(32).toString('hex');
  //encrypt resetToken
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  //set expiration
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = model('User', userSchema);

module.exports = User;
