const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any other relevant fields like contact, address, etc.
});

module.exports = mongoose.model('Admin', adminSchema);
