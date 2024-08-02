const Officer = require('../models/Officer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Complaint =  require('../models/Complaint')
const dotenv = require('dotenv');
dotenv.config();


const generateToken = (id,email) => {
  return jwt.sign({ id, email}, process.env.JWT_SECRET, { expiresIn: '30d'   
 });
};

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
    const token = generateToken(officer._id, officer.email);

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
  try{
    const authHeader  = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
      return res.status(401).json({ message: 'Unauthorized: Missing JWT token' });
    }

    const token = authHeader.split(' ')[1];
    if(process.env.JWT_SECRET){
      try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded)
        const userId = decoded.id;  // Assuming 'userId' is the claim for user ID

        // Proceed with user retrieval using the extracted userId
        const user = await Officer.findById(userId);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        const UserDepartment = user.department;

        const assignedComplaints = await Complaint.find({department:UserDepartment});
        res.status(200).json(assignedComplaints);
        
      }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });   
      }
    }

  }catch(error){
     console.error(error);
     res.status(500).json({ message: 'Server Error' });
  }
    // try {
    //   // Assuming the officer ID is available in the request (e.g., from JWT)
    //   const officerdepartment = req.officerId; // Replace with actual logic to get officer ID
  
    //   const complaints = await Complaint.find({ department: officerdepartment });
  
    //   res.status(200).json(complaints);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Server Error' });
    // }
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
