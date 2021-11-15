const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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
    enum: ['user', 'admin', 'guide', 'lead-guide' ],
    default: 'user'
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // dont select when returning data
    select: false
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
    type: Date
  },
  photo: {
    type: String,
  },
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function(password){
  // console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.changedPasswordAfter = function (JWTtimestamp){
  if (this.passwordChangedAt){
    //convert time to like units for comparison (base 10)
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10 );
    console.log(changedTimestamp, JWTtimestamp);
    //return true if changedTimestamp is greater (more recent) than JWTtimestamp
    return JWTtimestamp < changedTimestamp;
  }

  //default to false - password has not been changed since token issued
  return false;
}


//hash password 
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salt = 12;
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
  }
  next();
});

const User = model('User', userSchema);

module.exports = User;
