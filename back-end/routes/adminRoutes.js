const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {adminAuth} = require('../middleware/authMiddleware'); // Assuming JWT authentication

// Protect all admin routes
//router.use(authMiddleware);

// User routes
router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Officer routes
router.get('/officers', adminController.getAllOfficers);
router.post('/officers',adminAuth, adminController.createOfficer);
router.put('/officers/:id', adminController.updateOfficer);
router.delete('/officers/:id', adminController.deleteOfficer);

// Complaint routes
router.get('/complaints', adminController.getAllComplaints);
router.put('/complaints/:id', adminController.updateComplaintStatus); // Example

//create admin
router.post('/admin', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;
