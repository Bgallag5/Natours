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
  password: {
    type: String,
    required: true,
    minlength: 8,
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
  photo: {
    type: String,
  },
});

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
