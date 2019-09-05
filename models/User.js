// users
//   -email
//   -password
//   -tokens
//   -avatar
//   -contest membership
//   -contest admin
//   -picks

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual('firstName').get(() => {
  const split = this.name.split(' ');
  return split[0];
});

module.exports = User = mongoose.model('user', UserSchema);
