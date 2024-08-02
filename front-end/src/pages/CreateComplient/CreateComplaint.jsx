import React, { useState } from 'react';
import { createComplaint } from '../../utils/api';

const CreateComplaint = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: 'KSEB',
    images: [],
    latitude: 12.9716,
    longitude: 77.5946
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createComplaint(formData);
      console.log('Complaint created:', response);
      // Handle success, e.g., show success message or redirect
    } catch (error) {
      console.error('Create complaint error:', error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div>
      <h2>Create Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* Add more fields as needed --disabled={!token}*/}
        <button type="submit" >Submit Complaint</button>
      </form>
    </div>
  );
};

export default CreateComplaint;
