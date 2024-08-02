const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  department: { 
    type: String,
    required: true,
    enum: ['KSEB', 'WATER'], 
    default: 'KSEB'},

  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  images: [String], // Array of image URLs
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'resolved'],
    default: 'pending'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
