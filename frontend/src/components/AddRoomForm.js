import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomCat, setRoomCat] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState('available');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create room object
    const newRoom = {
      RoomNumber: roomNumber,
      RoomCat: roomCat,
      Capacity: capacity,
      Status: status,
      Price: parseFloat(price),
    };

    // Send POST request to backend
    axios.post('http://localhost:3001/rooms', newRoom)
      .then(response => {
        setSuccess('Room added successfully!');
        setError(null);
        // Clear form
        setRoomNumber('');
        setRoomCat('');
        setCapacity('');
        setStatus('available');
        setPrice('');
      })
      .catch(error => {
        setError('Error adding room: ' + error.message);
        setSuccess(null);
      });
  };

  return (
    <div>
      <h1>Add New Room</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="number"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomCat">Room Category:</label>
          <input
            type="number"
            id="roomCat"
            value={roomCat}
            onChange={(e) => setRoomCat(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;
