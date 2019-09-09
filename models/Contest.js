// contests
//   -name
//   -start date
//   -end date
//   -security/stock
//     --name
//     --ticker
//     --recent price
//     --last updated
//   -public/private
//   -password
//   -admin
//   -members

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pick = require('./Pick');

const ContestSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  private: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

ContestSchema.virtual('picks', {
  ref: 'pick',
  localField: '_id',
  foreignField: 'contest'
});

ContestSchema.set('toObject', { virtuals: true });
ContestSchema.set('toJSON', { virtuals: true });

module.exports = Contest = mongoose.model('contest', ContestSchema);
