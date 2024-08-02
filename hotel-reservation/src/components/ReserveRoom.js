import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ReserveRoom = () => {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [reservation, setReservation] = useState({
    GuestID: '',
    RoomNumber: '',
    CheckInDate: '',
    CheckOutDate: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  useEffect(() => {
    if (reservation.CheckInDate && reservation.CheckOutDate) {
      fetchAvailableRooms();
    }
  }, [reservation.CheckInDate, reservation.CheckOutDate]);

  const fetchGuests = () => {
    axios.get('http://localhost:3001/customers')
      .then(response => {
        setGuests(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const fetchAvailableRooms = () => {
    axios.get('http://localhost:3001/available-rooms', {
      params: {
        checkInDate: reservation.CheckInDate,
        checkOutDate: reservation.CheckOutDate
      }
    })
      .then(response => {
        setAvailableRooms(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/reservations', reservation)
      .then(response => {
        setReservation({
          GuestID: '',
          RoomNumber: '',
          CheckInDate: '',
          CheckOutDate: ''
        });
        setError(null);
        alert('Reservation made successfully!');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="form-container">
      <h2>Reserve Room</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-group">
          <label htmlFor="GuestID">Guest:</label>
          <select
            id="GuestID"
            name="GuestID"
            value={reservation.GuestID}
            onChange={handleChange}
            required
          >
            <option value="">Select a guest</option>
            {guests.map(guest => (
              <option key={guest.GuestID} value={guest.GuestID}>
                {guest.FirstName} {guest.LastName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="CheckInDate">Check-In Date:</label>
          <input
            type="date"
            id="CheckInDate"
            name="CheckInDate"
            value={reservation.CheckInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="CheckOutDate">Check-Out Date:</label>
          <input
            type="date"
            id="CheckOutDate"
            name="CheckOutDate"
            value={reservation.CheckOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="RoomNumber">Room Number:</label>
          <select
            id="RoomNumber"
            name="RoomNumber"
            value={reservation.RoomNumber}
            onChange={handleChange}
            disabled={!reservation.CheckInDate || !reservation.CheckOutDate}
          >
            <option value="">Select a room</option>
            {availableRooms.map(room => (
              <option key={room.RoomNumber} value={room.RoomNumber}>
                Room {room.RoomNumber} - {room.Status}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Reserve</button>
      </form>
    </div>
  );
};

export default ReserveRoom;
