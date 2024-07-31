const Officer = require('../models/Officer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const officerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find officer by email
    const officer = await Officer.findOne({ email });
    if (!officer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, officer.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(officer._id);

    res.status(200).json({
      _id: officer._id,
      name: officer.name,
      email: officer.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getOfficerComplaints = async (req, res) => {
    try {
      // Assuming the officer ID is available in the request (e.g., from JWT)
      const officerId = req.officerId; // Replace with actual logic to get officer ID
  
      const complaints = await Complaint.find({ assignedOfficer: officerId });
  
      res.status(200).json(complaints);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const updateComplaintStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const complaint = await Complaint.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      res.status(200).json(complaint);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = {
  officerLogin,
  getOfficerComplaints,
  updateComplaintStatus
};
