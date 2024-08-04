import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const RegisterNewClient = () => {
  const [newClient, setNewClient] = useState({
    FirstName: '',
    LastName: '',
    ContactNumber: '',
    Email: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/guests', newClient)
      .then(response => {
        setNewClient({
          FirstName: '',
          LastName: '',
          ContactNumber: '',
          Email: ''
        });
        setError(null);
        alert('Customer registered successfully!');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h2>Register New Client</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="FirstName">First Name:</label>
          <input
            type="text"
            id="FirstName"
            name="FirstName"
            value={newClient.FirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            name="LastName"
            value={newClient.LastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ContactNumber">Contact Number:</label>
          <input
            type="text"
            id="ContactNumber"
            name="ContactNumber"
            value={newClient.ContactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={newClient.Email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterNewClient;
