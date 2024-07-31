const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String }, // Optional field for department or division
  contactNumber: { type: String }, // Optional field for contact number
  // Add more fields as needed (e.g., address, designation, etc.)
});

module.exports = mongoose.model('Officer', officerSchema);
