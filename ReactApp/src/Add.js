import React, { useState } from 'react';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Date: "",
    Director: "",
    Image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically update the correct property
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== "");

    if (!allFieldsFilled) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try
    {
      const response = dataSource.post("/movies", formData);
      navigate('/home');
    }
    catch (error)
    {
      console.log(error);
    }
  };

  return (
    <div className='add-container'>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit} className='add-form'>
        {/* Name Input */}
        <label>Name</label>
        <input
          type='text'
          name='Name'
          value={formData.Name}
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          type='text'
          name='Description'
          value={formData.Description}
          onChange={handleChange}
        />

        <label>Year</label>
        <input
          type='text'
          name='Date'
          value={formData.Date}
          onChange={handleChange}
        />

        <label>Director</label>
        <input
          type='text'
          name='Director'
          value={formData.Director}
          onChange={handleChange}
        />

        {/* Image Input */}
        <label>Image</label>
        <input
          type='text'
          name='Image'
          value={formData.Image}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="modal-actions">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
