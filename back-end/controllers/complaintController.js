const Complaint = require('../models/Complaint');

const createComplaint = async (req, res) => {
  try {
    const { user, location, landmark, complaint, images } = req.body;

    const newComplaint = await Complaint.create({
      user,
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

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user'); // Populate user information
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('user');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error'   
 });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, landmark, complaint, images, status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      {
        location,
        landmark,
        complaint,
        images,
        status,
      },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json(updatedComplaint);
  } catch (error)   
 {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComplaint = await Complaint.findByIdAndDelete(id);

    if (!deletedComplaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
};
