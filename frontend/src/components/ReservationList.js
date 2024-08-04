// src/components/ReservationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import UpdateReservationForm from './UpdateReservationForm';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    axios.get('http://localhost:3001/reservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/reservations/${id}`)
      .then(() => {
        fetchReservations(); // Refresh the reservation list
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleUpdateClick = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleUpdateClose = () => {
    setSelectedReservation(null);
  };

  const handleUpdate = () => {
    fetchReservations(); // Refresh the reservation list
    handleUpdateClose();
  };

  return (
    <div>
      <h2>Reservations</h2>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Guest ID</th>
            <th>Room Number</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.ReservationID}>
              <td>{reservation.ReservationID}</td>
              <td>{reservation.GuestID}</td>
              <td>{reservation.RoomNumber}</td>
              <td>{new Date(reservation.CheckInDate).toLocaleDateString()}</td>
              <td>{new Date(reservation.CheckOutDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleUpdateClick(reservation)}>Update</button>
                <button onClick={() => handleDelete(reservation.ReservationID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReservation && (
        <UpdateReservationForm
          reservation={selectedReservation}
          onClose={handleUpdateClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ReservationList;
