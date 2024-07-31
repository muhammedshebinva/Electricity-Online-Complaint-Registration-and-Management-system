const Admin = require('../models/Admin');
const User = require('../models/User');
const Officer = require('../models/Officer');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcryptjs');

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const admin = await Admin.create({ name, email, password });
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch   
   (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const createUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({   
   message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message:   
   'Server Error' });
    }
  };


  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
  
      // Find the user to update
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user   
   fields
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  
  const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Find the user to delete
        const user = await User.findByIdAndDelete(id);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
  };


  const getAllOfficers = async (req, res) => {
    try {
      const officers = await Officer.find();
      res.status(200).json(officers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };



  const createOfficer = async (req, res) => {
    try {
      const { name, email, password, department, contactNumber } = req.body;
  
      // Check if officer already exists
      const existingOfficer = await Officer.findOne({ email });
      if (existingOfficer) {
        return res.status(400).json({ message: 'Officer already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new officer
      const newOfficer = await Officer.create({
        name,
        email,
        password: hashedPassword,
        department,
        contactNumber,
      });
  
      res.status(201).json(newOfficer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const updateOfficer = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, department, contactNumber } = req.body;
  
      // Find the officer to update
      const officer = await Officer.findById(id);
      if (!officer) {
        return res.status(404).json({ message: 'Officer not found' });
      }
  
      // Update officer fields
      officer.name = name || officer.name;
      officer.email = email || officer.email;
      officer.department = department || officer.department;
      officer.contactNumber = contactNumber || officer.contactNumber;
  
      // Save the updated officer
      const updatedOfficer = await officer.save();
  
      res.status(200).json(updatedOfficer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const deleteOfficer = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the officer
      const officer = await Officer.findByIdAndDelete(id);
  
      if (!officer) {
        return res.status(404).json({ message: 'Officer not found' });
      }
  
      res.status(200).json({ message: 'Officer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  const getAllComplaints = async (req, res) => {
    try {
      const complaints = await Complaint.find().populate('user'); // Populate user information
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
  
      const complaint = await Complaint.findById(id);
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      complaint.status   
   = status;
      const updatedComplaint = await complaint.save();
  
      res.status(200).json(updatedComplaint);
    } catch (error)   
   {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  module.exports = {
  createAdmin,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllOfficers,
  createOfficer,
  updateOfficer,
  deleteOfficer,
  getAllComplaints,
  updateComplaintStatus
};
