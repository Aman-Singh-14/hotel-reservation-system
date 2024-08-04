import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddReservationForm = () => {
  const [reservationID, setReservationID] = useState('');
  const [guestID, setGuestID] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReservation = {
      ReservationID: reservationID,
      GuestID: guestID,
      RoomNumber: roomNumber,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutDate
    };

    axios.post('http://localhost:3001/reservations', newReservation)
      .then(response => {
        setSuccess('Reservation added successfully!');
        setError(null);
        // Clear the form fields
        setReservationID('');
        setGuestID('');
        setRoomNumber('');
        setCheckInDate('');
        setCheckOutDate('');
      })
      .catch(error => {
        setError(error.message);
        setSuccess(null);
      });
  };

  return (
    <div>
      <h2>Add New Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reservationID">Reservation ID:</label>
          <input
            type="number"
            id="reservationID"
            value={reservationID}
            onChange={(e) => setReservationID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="guestID">Guest ID:</label>
          <input
            type="number"
            id="guestID"
            value={guestID}
            onChange={(e) => setGuestID(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="checkInDate">Check-In Date:</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOutDate">Check-Out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Reservation</button>
        {error && <p className="error">Error: {error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default AddReservationForm;
