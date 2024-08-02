// src/components/UpdateReservationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const UpdateReservationForm = ({ reservation, onClose, onUpdate }) => {
  const [guestID, setGuestID] = useState(reservation.GuestID || '');
  const [roomNumber, setRoomNumber] = useState(reservation.RoomNumber || '');
  const [checkInDate, setCheckInDate] = useState(reservation.CheckInDate || '');
  const [checkOutDate, setCheckOutDate] = useState(reservation.CheckOutDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3001/reservations/${reservation.ReservationID}`, {
      GuestID: guestID,
      RoomNumber: roomNumber,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutDate,
    })
      .then(() => {
        onUpdate(); // Refresh the reservation list
        onClose(); // Close the form
      })
      .catch(error => {
        console.error('Error updating reservation:', error);
      });
  };

  return (
    <div className="update-form">
      <h3>Update Reservation</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Guest ID:
          <input type="number" value={guestID} onChange={(e) => setGuestID(e.target.value)} required />
        </label>
        <label>
          Room Number:
          <input type="number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} required />
        </label>
        <label>
          Check-In Date:
          <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
        </label>
        <label>
          Check-Out Date:
          <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
        </label>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateReservationForm;
