const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// picks
// -price
// -user
// -contest
const PickSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  contest: {
    type: Schema.Types.ObjectId,
    ref: 'contest',
    required: true
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
