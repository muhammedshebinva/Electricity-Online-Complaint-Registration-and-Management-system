const express = require('express');

const connectDB = require('./config/db');
//const errorHandler = require('./middleware/error');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const userRoutes = require('./routes/userRoutes');   

const officerRoutes = require('./routes/officerRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { adminAuth } = require('./middleware/authMiddleware');

connectDB();
const app = express();



// Middleware
app.use(cors());
app.use(express.json());  

// Routes
//app.use('/api/users', require('./routes/userRoutes'));
// ... other routes
app.get('/', adminAuth, (req,res)=>{
    res.send("hello")
})

// Routes
app.use('/api/users', userRoutes);
app.use('/api/officers', officerRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

//app.use(errorHandler);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
