const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Officer = require('../models/Officer');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');
dotenv.config();


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user, officer, or admin based on the token data
    let user;
    if (decoded.role === 'user') {
      user = await User.findById(decoded.id);
    } else if (decoded.role === 'officer') {
      user = await Officer.findById(decoded.id);
    } else if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// const officerAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
//     }

//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user || user.role !== 'officer') {
//       return res.status(403).json({ message: 'Forbidden: Access denied' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


module.exports =  {
  authMiddleware,
  adminAuth

}

