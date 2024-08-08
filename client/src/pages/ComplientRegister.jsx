import React, { useState, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'leaflet'; // Import Leaflet components
import '../App.css';
import AuthContext from '../provider/authContext';
import { Navigate, useNavigate } from 'react-router-dom'
import { createComplaint } from '../utils/userApi'
const ComplientRegister = () => {

  const {token, setLastRoute} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'KSEB', // Set default department
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716], // Example coordinates
    },
    images: [],
  });
 
  

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'images' ? files : value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement form submission logic here
    // For example, send data to an API using fetch or Axios
    try{
        const response = await createComplaint(formData, token);
        alert("Complient Submitted")
        navigate('/')

    }catch(error){
        console.log('register complient Error', error)
        alert('Complient Registration failed. Please try again.');
    }
  };

  if(!token){
    setLastRoute('/complient')
    return <Navigate to='/login'/>

  }
  return (
    <div className='register-form'>

    <form onSubmit={handleSubmit} >
      {/* Title */}
      <label htmlFor="title">Complient registration Form</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      {/* Description */}
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* Department (dropdown or static select) */}
      <label htmlFor="department">Department:</label>

      <select id="department" name="department" value={formData.department} onChange={handleChange}>
        <option value="KSEB">KSEB</option>
        <option value="WATER">WATER</option>
      </select>


          {/* Location (hidden or read-only input) - Consider user interaction */}
          <label htmlFor="location">Location (Latitude, Longitude):</label>
          <input
            type="text"
            id="location"
            name="location"
            value={`${formData.location.coordinates[0]}, ${formData.location.coordinates[1]}`}
            readOnly // Or hidden based on use case
          />

      {/* You might want to provide a map selection or user input for location */}

      {/* Images (multiple file input) */}
      <label htmlFor="images">Images:</label>
      <input
        type="file"
        id="images"
        name="images"
        multiple
        onChange={handleChange}
      />
      <p>Note: Only image files (.jpg, .jpeg, .png) are allowed.</p>

      <button type="submit">Submit</button>
    </form>




</div>
    
  );
};

export default ComplientRegister;
