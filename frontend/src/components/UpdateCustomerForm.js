import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; // Make sure to import your CSS file

const UpdateCustomerForm = ({ customer, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(customer);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3001/customers/${formData.GuestID}`, formData)
      .then(response => {
        onUpdate(); // Notify parent component to refresh list
        onClose(); // Close the form
      })
      .catch(error => {
        console.error('Error updating customer:', error);
      });
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="slide-in-form open">
        <div className="slide-in-form-content">
          <h3>Update Customer</h3>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Contact Number:
              <input
                type="text"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCustomerForm;
