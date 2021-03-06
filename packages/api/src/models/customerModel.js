const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('customers', CustomerSchema);
