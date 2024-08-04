import React, { useState } from 'react';
import axios from 'axios';

const HiringForm = () => {
  const [staffName, setStaffName] = useState('');
  const [position, setPosition] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStaff = {
      StaffName: staffName,
      Position: position,
      ContactInfo: contactInfo,
    };

    axios.post('http://localhost:3001/staff', newStaff)
      .then(response => {
        setSuccess('Staff hired successfully!');
        setError(null);
        // Clear the form fields
        setStaffName('');
        setPosition('');
        setContactInfo('');
      })
      .catch(error => {
        setError(error.message);
        setSuccess(null);
      });
  };

  return (
    <div>
      <h2>Hire New Staff</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="staffName">Staff Name:</label>
          <input
            type="text"
            id="staffName"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Info:</label>
          <input
            type="text"
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Hire</button>
        {error && <p className="error">Error: {error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default HiringForm;
