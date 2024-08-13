const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {adminAuth} = require('../middleware/authMiddleware'); // Assuming JWT authentication

// Protect all admin routes
//router.use(authMiddleware);

// User routes
router.get('/users',adminAuth, adminController.getAllUsers);
router.post('/users',adminAuth, adminController.createUser);
router.put('/users/:id',adminAuth, adminController.updateUser);
router.delete('/users/:id',adminAuth, adminController.deleteUser);

// Officer routes
router.get('/officers',adminAuth, adminController.getAllOfficers);
router.post('/officers',adminAuth, adminController.createOfficer);
router.put('/officers/:id',adminAuth, adminController.updateOfficer);
router.delete('/officers/:id',adminAuth, adminController.deleteOfficer);

// Complaint routes
router.get('/complaints',adminAuth, adminController.getAllComplaints);
router.put('/complaints/:id',adminAuth, adminController.updateComplaintStatus); // Example

//create admin
router.post('/admin', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;
