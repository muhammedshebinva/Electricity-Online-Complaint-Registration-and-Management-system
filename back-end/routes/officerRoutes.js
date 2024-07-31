const express = require('express');
const router = express.Router();
const officerController = require('../controllers/officerController');

// Officer login
router.post('/login', officerController.officerLogin);

// Get complaints assigned to officer
router.get('/complaints', officerController.getOfficerComplaints);

// Update complaint status
router.put('/complaints/:id', officerController.updateComplaintStatus);

module.exports = router;
