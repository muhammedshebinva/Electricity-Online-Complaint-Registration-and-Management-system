const User = require('../models/User');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()


// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'   
//  });
// };

const generateToken = (id) => {
  return jwt.sign({ id }, 'fhgdvxjcsvdcj', { expiresIn: '30d'   
 });
};
// const JWT= process.env.JWT_SECRET;
// console.log("hello", JWT)

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken(newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token  = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Assuming the user ID is available in the request (e.g., from JWT)
    const userId = req.user.id; // Replace with actual logic to get user ID

    const user = await User.findById(userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error'});
  }
};

const updateUserProfile = async (req, res) => {
  try {
    // Assuming the user ID is available in the request (e.g., from JWT)
    const userId = req.user.id; // Replace with actual logic to get user ID

    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createComplaint = async (req, res) => {
  try {
    // Assuming the user ID is available in the request (e.g., from JWT)
    const userId = req.user.id; // Replace with actual logic to get user ID

    const { location, landmark, complaint, images } = req.body;

    const newComplaint = await Complaint.create({
      user: userId,
      location,
      landmark,
      complaint,
      images,
    });

    res.status(201).json(newComplaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createComplaint
};

