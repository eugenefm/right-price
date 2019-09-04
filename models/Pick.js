const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// picks
// -price
// -user
// -contest
const PickSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  contest: {
    type: Schema.Types.ObjectId,
    ref: 'contests'
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Pick = mongoose.model('pick', PickSchema);
