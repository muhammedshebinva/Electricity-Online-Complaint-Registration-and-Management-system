const User = require('../models/User');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'   
//  });
// };

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '30d'   
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
    const token = generateToken(newUser._id, newUser.email);

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
    const token  = generateToken(user._id,user.email);

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
    // 1. Verify JWT presence in the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
    }

    // 2. Extract JWT token from header
    const token = authHeader.split(' ')[1];
    //console.log(token)
    // 3. Choose appropriate JWT library based on your project:
    // - Option A: Using jsonwebtoken (for Node.js backend)
    if (JWT_SECRET) { // Ensure secret is defined in environment variable
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        //console.log(decoded)
        const userId = decoded.id;  // Assuming 'userId' is the claim for user ID

        // Proceed with user retrieval using the extracted userId
        const user = await User.findById(userId).select('-password');

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); 

      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid JWT token' });
        } else {
          console.error(error);
          return res.status(500).json({ message: 'Server Error' });
        }
      }
    } else {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

    // - Option B: Using a frontend library (if applicable)
    //   Refer to the specific library's documentation for token extraction methods.

    // 4. Handle other potential errors gracefully (optional)
    //   - Include error handling for invalid user IDs or database issues.

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const updateUserProfile = async (req, res) => {

  try{
    const authHeader = req.headers.authorization;
    const { name, email, password} = req.body;
    //console.log(req.body)
    if(!authHeader|| !authHeader.startsWith('Bearer')){
      res.status(401).json({message: "Un Autherized, Missing JWT token"})
    }
    const token = authHeader.split(' ')[1];

    if(JWT_SECRET){
      try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.findByIdAndUpdate(
          userId,
          { name,
            email,
            password:hashedPassword
          },
          { new: true }
        );
        

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
      }catch(error){
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid JWT token' });
        } else {
          console.error(error);
          return res.status(500).json({ message: 'Server Error' });
        }
      }
    }else {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }

  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

};



const createComplaint = async (req, res) => {
  try {
    // 1. Verify JWT presence in the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
    }

  

    // 2. Extract JWT token from header
    const token = authHeader.split(' ')[1];

    // 3. Choose appropriate JWT library based on your project:
    // - Option A: Using jsonwebtoken (for Node.js backend)
    if (JWT_SECRET) { // Ensure secret is defined in environment variable
      try {
        const decoded = jwt.verify(token,JWT_SECRET);
        const userId = decoded.id;  // Assuming 'userId' is the claim for user ID

        // 2. Extract complaint data from request body
         const { title, description,department, location, images } = req.body;
        
        // 4. Create new complaint document
        const newComplaint = new Complaint({
          title,
          description,
          department,
          location, // Assuming location data is already in GeoJSON format
          images,
          status: 'pending', // Set default status as before
          user: userId, // Use the extracted user ID from JWT verification
          createdAt: Date.now(),
        });

           // 5. Save the complaint document
        await newComplaint.save();

        res.status(201).json(newComplaint);

      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid JWT token' });
        } else {
          console.error(error);
          return res.status(500).json({ message: 'Server Error' });
        }
      }
    } else {
      return res.status(500).json({ message: 'JWT secret not configured' });
    }


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

